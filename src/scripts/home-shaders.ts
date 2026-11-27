// Homepage shaders: chrome lettermark + satin background (shaders.com, WebGPU).
// The page is fully usable without this script: the static lettermark is
// visible until the chrome shader has rendered its first frame, and it comes
// back if the GPU ever gives up.

import type { ShaderInstance } from "shaders/js";

const LOGO_ID = "chrome";
const SATIN_ID = "satin";
const ZOOM_BLUR_ID = "zoom-blur";

const LOGO_SPEED = 0.5;
const SATIN_SPEED = 1.13;

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

const logoCanvas = document.querySelector<HTMLCanvasElement>("[data-logo-canvas]");
const backgroundCanvas = document.querySelector<HTMLCanvasElement>(
  "[data-background-canvas]",
);
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

type Layer = {
  canvas: HTMLCanvasElement;
  /** Set on the root element: "ready" once the first frame is on screen, "failed" when it will never draw. */
  stateKey: "logoShader" | "backgroundShader";
  shader?: ShaderInstance;
  ready: boolean;
  failed: boolean;
  speeds: Record<string, number>;
  /**
   * Stop the render loop under reduced motion, not just zero the speed. Not
   * safe for the chrome logo: it loads its SDF after the first frame, so a
   * loop paused at `onReady` would keep an empty frame.
   */
  pauseWhenStill: boolean;
};

const layers: Layer[] = [];

const isStill = () => reducedMotion.matches;

const setState = (layer: Layer, state: "ready" | "failed") => {
  document.documentElement.dataset[layer.stateKey] = state;
};

const fail = (layer: Layer, reason: string) => {
  if (layer.failed) return;
  layer.failed = true;
  setState(layer, "failed");
  layer.shader?.destroy();
  console.info(`[home] ${layer.stateKey} unavailable (${reason}); showing the static fallback.`);
};

const applyMotion = (layer: Layer) => {
  const { shader } = layer;
  if (!shader || layer.failed) return;

  for (const [id, speed] of Object.entries(layer.speeds)) {
    shader.update(id, { speed: isStill() ? 0 : speed });
  }

  // A paused shader still redraws on resize (the library does that on its
  // own), and stopping the loop is what actually stops the GPU work.
  if (document.hidden || (isStill() && layer.pauseWhenStill)) {
    if (layer.ready) shader.pause();
  } else {
    shader.resume();
  }
};

const mount = async (
  layer: Layer,
  create: (options: {
    onReady: () => void;
    onError: (reason: string) => void;
  }) => Promise<ShaderInstance>,
) => {
  layers.push(layer);

  try {
    layer.shader = await create({
      onReady: () => {
        if (layer.failed) return;
        layer.ready = true;
        setState(layer, "ready");
        applyMotion(layer);
      },
      onError: (reason) => {
        if (TERMINAL_REASONS.has(reason)) fail(layer, reason);
      },
    });
  } catch (error) {
    fail(layer, error instanceof Error ? error.message : "init-failed");
    return;
  }

  // createShader pins the canvas to its current size with inline px styles;
  // drop them so the CSS sizes (viewport, clamp) keep applying on resize. The
  // library's own ResizeObserver then follows the canvas.
  layer.canvas.style.removeProperty("width");
  layer.canvas.style.removeProperty("height");

  const reason = layer.shader.getFailureReason();
  if (reason) fail(layer, reason);
};

const start = async () => {
  if (!logoCanvas || !backgroundCanvas) return;

  const logo: Layer = {
    canvas: logoCanvas,
    stateKey: "logoShader",
    ready: false,
    failed: false,
    speeds: { [LOGO_ID]: LOGO_SPEED },
    pauseWhenStill: false,
  };
  const background: Layer = {
    canvas: backgroundCanvas,
    stateKey: "backgroundShader",
    ready: false,
    failed: false,
    speeds: { [SATIN_ID]: SATIN_SPEED },
    pauseWhenStill: true,
  };

  // Without WebGPU, don't download the shader runtime at all.
  if (!("gpu" in navigator) || !navigator.gpu) {
    fail(logo, "unsupported");
    fail(background, "unsupported");
    return;
  }

  const { createShader, getWebGPUSupport } = await import("shaders/js");
  const support = await getWebGPUSupport();
  if (!support.supported) {
    fail(logo, support.reason ?? "unsupported");
    fail(background, support.reason ?? "unsupported");
    return;
  }

  const still = isStill();
  const shared = { disableTelemetry: true };

  await Promise.all([
    mount(logo, (callbacks) =>
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
                shapeSdfUrl: "/brand/logo_sdf.bin",
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
    ),
    mount(background, (callbacks) =>
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
    ),
  ]);
};

reducedMotion.addEventListener("change", () => layers.forEach(applyMotion));
document.addEventListener("visibilitychange", () => layers.forEach(applyMotion));

start().catch((error) => {
  console.info("[home] shaders unavailable; showing the static fallback.", error);
  document.documentElement.dataset.logoShader = "failed";
  document.documentElement.dataset.backgroundShader = "failed";
});
