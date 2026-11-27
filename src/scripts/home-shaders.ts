// Homepage shaders: chrome lettermark + satin background (shaders.com, WebGPU).
// The page works without this script. The flat lettermark stays visible until a
// rendered frame contains the chrome mark, returns at once during a device loss,
// and stays for good (background stopped and hidden) if the logo can't be drawn.

import type { ShaderInstance } from "shaders/js";

const LOGO_ID = "chrome";
const SATIN_ID = "satin";
const LOGO_SPEED = 0.5;
const SATIN_SPEED = 1.13;

const SDF_URL = "/brand/logo_sdf.bin";
const SDF_TIMEOUT_MS = 10_000;
// Visible rendering time the chrome canvas gets to show the mark.
const MARK_TIMEOUT_MS = 5_000;
// Opaque share of a 64 × 64 readback that counts as the mark (it covers ~14 %).
const MARK_MIN_COVERAGE = 0.03;

// `onError` reasons after which a shader never draws again. Any other reason is
// a recoverable device loss that the library rebuilds from on its own.
const TERMINAL_REASONS = new Set([
  "unsupported", "no-adapter", "no-device", "init-failed", "device-lost", "out-of-memory",
  "gpu-error", "render-failed", "limit-exceeded", "unrecoverable", "rebuild_failed",
]);

type LayerState = "pending" | "ready" | "failed";

type Layer = {
  canvas: HTMLCanvasElement;
  /** Root data attribute: absent while pending, then "ready" or "failed". */
  stateKey: "logoShader" | "backgroundShader";
  state: LayerState;
  shader?: ShaderInstance;
  speeds: Record<string, number>;
  /** The queued mark check, if any. */
  frame?: number;
};

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const isStill = () => reducedMotion.matches;

const createLayer = (selector: string, stateKey: Layer["stateKey"], speeds: Layer["speeds"]) => {
  const canvas = document.querySelector<HTMLCanvasElement>(selector);
  return canvas ? ({ canvas, stateKey, state: "pending", speeds } satisfies Layer) : undefined;
};

const logo: Layer | undefined = createLayer("[data-logo-canvas]", "logoShader", {
  [LOGO_ID]: LOGO_SPEED,
});
const background: Layer | undefined = createLayer("[data-background-canvas]", "backgroundShader", {
  [SATIN_ID]: SATIN_SPEED,
});
const layers = [logo, background].filter((layer): layer is Layer => !!layer);

// Shaders fetches the SDF blob URL again whenever it rebuilds after a device
// loss, so the URL is only revoked once nothing can draw any more.
const sdfRequest = new AbortController();
let sdfTimer: number | undefined;
let sdfUrl: string | undefined;

const setState = (layer: Layer, state: LayerState) => {
  layer.state = state;
  const { dataset } = document.documentElement;
  if (state === "pending") delete dataset[layer.stateKey];
  else dataset[layer.stateKey] = state;
};

const fail = (layer: Layer, reason: string) => {
  if (layer.state === "failed") return;
  if (layer.frame !== undefined) cancelAnimationFrame(layer.frame);
  setState(layer, "failed");
  layer.shader?.destroy();
  console.info(`[home] ${layer.stateKey} unavailable (${reason}); showing the static fallback.`);

  // One fallback state: no chrome logo, no animated cloth either.
  if (layer === logo && background && background.state !== "failed") {
    fail(background, `logo ${reason}`);
  } else if (layers.every((each) => each.state === "failed")) {
    teardown();
  }
};

const failAll = (reason: string) => layers.forEach((layer) => fail(layer, reason));

const applyMotion = (layer: Layer) => {
  const { shader } = layer;
  if (!shader || layer.state === "failed") return;

  for (const [id, speed] of Object.entries(layer.speeds)) {
    shader.update(id, { speed: isStill() ? 0 : speed });
  }
  // Stopping the loop is what stops the GPU work (a paused shader still
  // redraws on resize). Reduced motion waits for "ready": the mark check needs
  // live frames, and a loop paused before the SDF upload keeps an empty frame.
  if (document.hidden || (isStill() && layer.state === "ready")) shader.pause();
  else shader.resume();
};

const applyMotionToAll = () => layers.forEach(applyMotion);
reducedMotion.addEventListener("change", applyMotionToAll);
document.addEventListener("visibilitychange", applyMotionToAll);

// Once nothing can draw: stop the SDF request, free its blob, stop listening.
const teardown = () => {
  clearTimeout(sdfTimer);
  sdfRequest.abort();
  if (sdfUrl) URL.revokeObjectURL(sdfUrl);
  reducedMotion.removeEventListener("change", applyMotionToAll);
  document.removeEventListener("visibilitychange", applyMotionToAll);
};

const setReady = (layer: Layer) => {
  if (layer.state === "failed") return;
  setState(layer, "ready");
  applyMotion(layer);
};

// A WebGPU canvas only reads back while frames are being presented, which is
// why the logo keeps animating (at speed 0 under reduced motion) until then.
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

// Ready on the first frame that contains the mark; fails after
// MARK_TIMEOUT_MS of rendering. rAF stops in a hidden tab, and the capped gap
// keeps time away from counting.
const watchForMark = (layer: Layer) => {
  if (layer.frame !== undefined) cancelAnimationFrame(layer.frame);
  let elapsed = 0;
  let last = performance.now();

  const tick = (now: number) => {
    layer.frame = undefined;
    elapsed += Math.min(now - last, 100);
    last = now;
    if (showsMark(layer.canvas)) setReady(layer);
    else if (elapsed > MARK_TIMEOUT_MS) fail(layer, "no-mark");
    else layer.frame = requestAnimationFrame(tick);
  };
  layer.frame = requestAnimationFrame(tick);
};

// Shaders only logs a failed SDF request and then draws nothing, so the page
// fetches it first and hands the shader the bytes as a blob URL.
const loadSdf = async () => {
  sdfTimer = window.setTimeout(() => sdfRequest.abort(new Error("sdf-timeout")), SDF_TIMEOUT_MS);
  try {
    const response = await fetch(SDF_URL, { signal: sdfRequest.signal });
    if (!response.ok) throw new Error(`sdf-http-${response.status}`);
    sdfUrl = URL.createObjectURL(await response.blob());
    return sdfUrl;
  } finally {
    clearTimeout(sdfTimer);
  }
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
        if (layer.state !== "pending") return;
        // Also the first frame after a device-loss rebuild, which starts from
        // the speeds the shader was created with.
        applyMotion(layer);
        onFrame();
      },
      onError: (reason) => {
        if (TERMINAL_REASONS.has(reason)) return fail(layer, reason);
        if (layer.state === "failed") return;
        // Recoverable loss: show the fallback now; the rebuild calls onReady.
        if (layer.frame !== undefined) cancelAnimationFrame(layer.frame);
        setState(layer, "pending");
      },
    });
  } catch (error) {
    return fail(layer, error instanceof Error ? error.message : "init-failed");
  }

  // A terminal onError can arrive before createShader resolves (Shaders always
  // reports a failure there); nothing else holds this instance then.
  if (layer.state === "failed") return shader.destroy();
  layer.shader = shader;

  // createShader pins the canvas with inline px sizes; drop them so the CSS
  // sizes keep applying (the library's ResizeObserver follows the canvas).
  layer.canvas.style.removeProperty("width");
  layer.canvas.style.removeProperty("height");

  // Motion or visibility may have changed while the shader was being created.
  applyMotion(layer);
};

const start = async () => {
  if (!logo || !background) return;

  // Without WebGPU, or without a usable adapter, don't download the runtime.
  if (!("gpu" in navigator) || !navigator.gpu) return failAll("unsupported");
  const adapter = await navigator.gpu.requestAdapter().catch(() => null);
  if (!adapter) return failAll("no-adapter");

  const [{ createShader }, sdf] = await Promise.all([import("shaders/js"), loadSdf()]);
  const still = isStill();

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
                  shapeSdfUrl: sdf,
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
          { ...callbacks, disableTelemetry: true, toneMapping: "aces" },
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
                id: "zoom-blur",
                props: { dispersion: 0.5, focus: 0.7, intensity: 42 },
              },
            ],
          },
          { ...callbacks, disableTelemetry: true, toneMapping: "neutral" },
        ),
      () => setReady(background),
    ),
  ]);
};

start().catch((error) => failAll(error instanceof Error ? error.message : "start-failed"));
