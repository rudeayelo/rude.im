// Homepage shaders: chrome lettermark + satin background (shaders.com, WebGPU).
//
// The page is fully usable without this script. The flat lettermark stays
// visible until a rendered frame actually contains the chrome mark, comes back
// at once while the GPU recovers from a device loss, and stays for good (with
// the background stopped and hidden) whenever the logo can't be drawn.

import type { ShaderInstance } from "shaders/js";

const LOGO_ID = "chrome";
const SATIN_ID = "satin";
const ZOOM_BLUR_ID = "zoom-blur";

const LOGO_SPEED = 0.5;
const SATIN_SPEED = 1.13;

const SDF_URL = "/brand/logo_sdf.bin";
const SDF_TIMEOUT_MS = 10_000;
// Rendering time (only counted while the page is visible) the chrome canvas
// gets to show the mark before we settle for the flat one.
const MARK_TIMEOUT_MS = 5_000;
// Share of a 64 × 64 readback that must be opaque to count as "the mark is
// drawn". The lettermark covers about 14 % of its canvas.
const MARK_MIN_COVERAGE = 0.03;

// Reasons `onError` reports when a shader will never draw again. Anything else
// is a recoverable device loss the library rebuilds from on its own.
const TERMINAL_REASONS = new Set([
  "unsupported",
  "no-adapter",
  "no-device",
  "init-failed",
  "device-lost",
  "out-of-memory",
  "gpu-error",
  "render-failed",
  "limit-exceeded",
  "unrecoverable",
  "rebuild_failed",
]);

type LayerState = "pending" | "ready" | "failed";

type Layer = {
  canvas: HTMLCanvasElement;
  /** Root data attribute: absent while pending, then "ready" or "failed". */
  stateKey: "logoShader" | "backgroundShader";
  state: LayerState;
  shader?: ShaderInstance;
  speeds: Record<string, number>;
  /** Bumped to cancel a running mark check. */
  watch: number;
};

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const isStill = () => reducedMotion.matches;

const createLayer = (
  selector: string,
  stateKey: Layer["stateKey"],
  speeds: Layer["speeds"],
): Layer | undefined => {
  const canvas = document.querySelector<HTMLCanvasElement>(selector);
  return canvas && { canvas, stateKey, state: "pending", speeds, watch: 0 };
};

const logo = createLayer("[data-logo-canvas]", "logoShader", { [LOGO_ID]: LOGO_SPEED });
const background = createLayer("[data-background-canvas]", "backgroundShader", {
  [SATIN_ID]: SATIN_SPEED,
});
const layers = [logo, background].filter((layer): layer is Layer => !!layer);

const setState = (layer: Layer, state: LayerState) => {
  layer.state = state;
  const { dataset } = document.documentElement;
  if (state === "pending") delete dataset[layer.stateKey];
  else dataset[layer.stateKey] = state;
};

const fail = (layer: Layer, reason: string) => {
  if (layer.state === "failed") return;
  layer.watch++;
  setState(layer, "failed");
  layer.shader?.destroy();
  console.info(`[home] ${layer.stateKey} unavailable (${reason}); showing the static fallback.`);

  // One fallback state: no chrome logo means no animated cloth either, just
  // the flat mark over the plain page colour.
  if (layer === logo && background) fail(background, `logo ${reason}`);
};

const failAll = (reason: string) => layers.forEach((layer) => fail(layer, reason));

const applyMotion = (layer: Layer) => {
  const { shader } = layer;
  if (!shader || layer.state === "failed") return;

  for (const [id, speed] of Object.entries(layer.speeds)) {
    shader.update(id, { speed: isStill() ? 0 : speed });
  }

  // Stopping the loop is what stops the GPU work; a paused shader still
  // redraws on resize. Under reduced motion we only stop once the layer is
  // ready: the logo check below needs live frames, and a loop paused before
  // the SDF upload would keep an empty frame.
  if (document.hidden || (isStill() && layer.state === "ready")) shader.pause();
  else shader.resume();
};

const setReady = (layer: Layer) => {
  if (layer.state === "failed") return;
  setState(layer, "ready");
  applyMotion(layer);
};

// A WebGPU canvas can only be read back while frames are being presented,
// which is why the logo keeps animating (at speed 0 under reduced motion)
// until this succeeds.
const probe = document.createElement("canvas");
probe.width = probe.height = 64;
const probeContext = probe.getContext("2d", { willReadFrequently: true });

const showsMark = (canvas: HTMLCanvasElement) => {
  if (!probeContext || canvas.width === 0 || canvas.height === 0) return false;
  probeContext.clearRect(0, 0, 64, 64);
  probeContext.drawImage(canvas, 0, 0, 64, 64);
  const { data } = probeContext.getImageData(0, 0, 64, 64);
  let opaque = 0;
  for (let i = 3; i < data.length; i += 4) if (data[i] > 128) opaque++;
  return opaque / 4096 >= MARK_MIN_COVERAGE;
};

// Marks the logo ready on the first frame that contains the lettermark, or
// gives up after MARK_TIMEOUT_MS of visible rendering.
const watchForMark = (layer: Layer) => {
  const token = ++layer.watch;
  let elapsed = 0;
  let last = performance.now();

  const tick = (now: number) => {
    if (token !== layer.watch || layer.state === "failed") return;
    // rAF doesn't run in a hidden tab, and the gap is capped so the time
    // away doesn't count against the timeout.
    elapsed += Math.min(now - last, 100);
    last = now;

    if (showsMark(layer.canvas)) setReady(layer);
    else if (elapsed > MARK_TIMEOUT_MS) fail(layer, "no-mark");
    else requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

// Shaders only logs a failed SDF request and then draws nothing, so the page
// fetches it first and hands the shader the bytes as a blob URL (which any
// rebuild after a device loss reads again, without another network request).
const loadSdf = async (): Promise<string> => {
  const response = await fetch(SDF_URL, { signal: AbortSignal.timeout(SDF_TIMEOUT_MS) });
  if (!response.ok) throw new Error(`sdf-http-${response.status}`);
  return URL.createObjectURL(await response.blob());
};

type Callbacks = { onReady: () => void; onError: (reason: string) => void };

const mount = async (
  layer: Layer,
  create: (callbacks: Callbacks) => Promise<ShaderInstance>,
  onFrame: () => void,
) => {
  let shader: ShaderInstance;
  try {
    shader = await create({
      onReady: () => {
        if (layer.state === "pending") onFrame();
      },
      onError: (reason) => {
        if (TERMINAL_REASONS.has(reason)) {
          fail(layer, reason);
        } else if (layer.state !== "failed") {
          // Recoverable device loss: the library rebuilds and calls onReady
          // again. Show the fallback right away and wait for that.
          layer.watch++;
          setState(layer, "pending");
        }
      },
    });
  } catch (error) {
    fail(layer, error instanceof Error ? error.message : "init-failed");
    return;
  }

  // A terminal error can arrive before createShader resolves; nothing else
  // holds this instance then.
  if (layer.state === "failed") {
    shader.destroy();
    return;
  }
  layer.shader = shader;

  // createShader pins the canvas to its current size with inline px styles;
  // drop them so the CSS sizes (viewport, clamp) keep applying on resize. The
  // library's own ResizeObserver then follows the canvas.
  layer.canvas.style.removeProperty("width");
  layer.canvas.style.removeProperty("height");

  const reason = shader.getFailureReason();
  if (reason) {
    fail(layer, reason);
    return;
  }

  // Motion or visibility may have changed while the shader was being created.
  applyMotion(layer);
};

const start = async () => {
  if (!logo || !background) return;

  // Without WebGPU, or without a usable adapter, don't download the runtime.
  if (!("gpu" in navigator) || !navigator.gpu) return failAll("unsupported");
  const adapter = await navigator.gpu.requestAdapter().catch(() => null);
  if (!adapter) return failAll("no-adapter");

  const [{ createShader }, sdfUrl] = await Promise.all([import("shaders/js"), loadSdf()]);

  const still = isStill();
  const shared = { disableTelemetry: true };

  await Promise.all([
    mount(
      logo,
      (callbacks) =>
        createShader(
          logo.canvas,
          {
            components: [
              {
                type: "Chrome",
                id: LOGO_ID,
                props: {
                  shapeType: "svg",
                  shape: JSON.stringify({ type: "svg", svgUrl: "/brand/logo.svg" }),
                  shapeSdfUrl: sdfUrl,
                  tint: "#D6F1FF",
                  warmColor: "#FFA94D",
                  coolColor: "#0B96E0",
                  scale: 0.55,
                  rotation: 353,
                  bevelWidth: 0.025,
                  curvature: 0.6,
                  softness: 0.61,
                  environment: 0.27,
                  spectral: 0.99,
                  dispersion: 0.22,
                  speed: still ? 0 : LOGO_SPEED,
                },
              },
            ],
          },
          { ...shared, ...callbacks, toneMapping: "aces" },
        ),
      // The first frames can come before the SDF is on the GPU.
      () => watchForMark(logo),
    ),
    mount(
      background,
      (callbacks) =>
        createShader(
          background.canvas,
          {
            components: [
              {
                type: "Satin",
                id: SATIN_ID,
                props: {
                  color: "#181A1B",
                  highlightColor: "#67696B",
                  anisotropy: 0.21,
                  bloom: 0.28,
                  breeze: 0.53,
                  fiberAngle: 145,
                  fill: 0.74,
                  foldCount: 5,
                  foldDepth: 0.48,
                  foldDirection: 198,
                  foldWidth: 0.3,
                  gloss: 0.6,
                  lightAngle: 226,
                  pinning: 0,
                  sheen: 0.32,
                  weave: 0.28,
                  speed: still ? 0 : SATIN_SPEED,
                },
              },
              {
                type: "ZoomBlur",
                id: ZOOM_BLUR_ID,
                props: {
                  dispersion: 0.5,
                  focus: 0.7,
                  intensity: 42,
                },
              },
            ],
          },
          { ...shared, ...callbacks, toneMapping: "neutral" },
        ),
      () => setReady(background),
    ),
  ]);
};

reducedMotion.addEventListener("change", () => layers.forEach(applyMotion));
document.addEventListener("visibilitychange", () => layers.forEach(applyMotion));

start().catch((error) => {
  failAll(error instanceof Error ? error.message : "start-failed");
});
