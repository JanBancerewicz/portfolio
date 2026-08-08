import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../../lib/motion";

/**
 * Section backdrop: a slowly drifting loss surface drawn as contour isolines.
 *
 * The brief is applied machine learning, so the atmosphere is the thing the
 * work is made of rather than decoration borrowed from elsewhere — and
 * deliberately not a particle constellation, which is the one background every
 * developer portfolio already has.
 *
 * Three rules keep it a backdrop rather than a distraction:
 *
 * - **It belongs to a section, not the viewport.** The canvas is absolutely
 *   positioned inside its section and scrolls with it. A fixed full-page canvas
 *   slides under moving text, which reads as a glitch rather than as depth.
 * - **It never reacts to the pointer.** Ambient motion that chases the cursor
 *   pulls attention to itself.
 * - **It is masked and very low contrast.** The field fades out at the section
 *   edges so sections blend, and the lines sit far below text contrast.
 *
 * ## Why this is a shader and not a 2D canvas
 *
 * The first version ran marching squares on the CPU: for every isoline, every
 * grid cell allocated four point objects and a closure. Sixteen levels over a
 * hero-sized grid is ~110k allocations per frame, three sections deep — the
 * frame budget went entirely to garbage collection and the page stuttered.
 *
 * A fragment shader computes the same surface per pixel with no allocation at
 * all, and gets the isolines for free: `fract(f * density)` banded through
 * `fwidth` gives analytically antialiased lines of constant screen width, which
 * the marching-squares version could not do at any price. Cost is seven
 * `exp()` per pixel — nothing, on any GPU made this decade.
 *
 * The loop is stopped entirely while the section is off-screen or the tab is
 * hidden, and `prefers-reduced-motion` gets a single static frame.
 */

const BASINS = 7;

/** Cap the backing-store scale: the lines are analytically antialiased, so
 *  rendering above 1.5x buys nothing and costs fill rate on retina laptops. */
const MAX_DPR = 1.5;

/**
 * `fwidth` is core in GLSL ES 3.00 but an extension in 1.00 — and a WebGL2
 * context refuses to enable that extension for a 1.00 shader, so the two paths
 * need genuinely different sources rather than one source with a prologue.
 */
function vertexSource(es3: boolean) {
  return `${es3 ? "#version 300 es\n" : ""}
${es3 ? "in" : "attribute"} vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;
}

function fragmentSource(es3: boolean) {
  return `${
    es3 ? "#version 300 es\n" : "#extension GL_OES_standard_derivatives : enable\n"
  }
// High precision is only guaranteed in fragment shaders under GLSL ES 3.00.
// Plenty of mobile GPUs on the WebGL1 path reject it outright, and a shader
// that fails to compile leaves the canvas blank.
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
${es3 ? "out vec4 fragColor;" : "#define fragColor gl_FragColor"}

uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uInk;
uniform float uIntensity;
uniform float uDensity;
// amplitude, sigma, driftX, driftY
uniform vec4 uBasinShape[${BASINS}];
// freqX, freqY, phaseX, phaseY
uniform vec4 uBasinMotion[${BASINS}];

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  uv.y = 1.0 - uv.y;
  float aspect = uResolution.x / uResolution.y;

  float height = 0.0;
  for (int i = 0; i < ${BASINS}; i++) {
    vec4 shape = uBasinShape[i];
    vec4 motion = uBasinMotion[i];
    vec2 centre = vec2(
      0.5 + shape.z * sin(motion.x * uTime + motion.z),
      0.5 + shape.w * cos(motion.y * uTime + motion.w)
    );
    vec2 delta = (uv - centre) * vec2(aspect, 1.0);
    height += shape.x * exp(-dot(delta, delta) / (2.0 * shape.y * shape.y));
  }

  // Isolines as bands of a sawtooth, widened to a constant screen width by the
  // local rate of change. This is what makes the lines crisp at every zoom.
  float banded = height * uDensity;
  float slope = fwidth(banded);
  float distance = abs(fract(banded - 0.5) - 0.5) / max(slope, 1e-5);
  float line = 1.0 - smoothstep(0.35, 1.15, distance);

  // Where the surface is steep the lines pack tighter than a pixel and would
  // alias into a solid patch. Fade them out instead.
  line *= 1.0 - smoothstep(0.45, 1.4, slope);

  // Premultiplied: the colour is scaled by its own alpha here rather than by
  // the compositor. See the context-attribute note in createContext.
  float alpha = line * uIntensity;
  fragColor = vec4(uInk * alpha, alpha);
}
`;
}

/**
 * Basins are generated from a seed so each section gets a different surface
 * while sharing one visual language.
 */
function makeBasins(seed: number) {
  let state = seed * 9301 + 49297;
  const rand = () => {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };

  const shape = new Float32Array(BASINS * 4);
  const motion = new Float32Array(BASINS * 4);

  for (let i = 0; i < BASINS; i += 1) {
    shape[i * 4 + 0] = (i % 3 === 2 ? 0.45 : -0.9) * (0.55 + rand() * 0.6);
    shape[i * 4 + 1] = 0.07 + rand() * 0.15;
    shape[i * 4 + 2] = 0.12 + rand() * 0.22;
    shape[i * 4 + 3] = 0.09 + rand() * 0.18;

    motion[i * 4 + 0] = 0.012 + rand() * 0.03;
    motion[i * 4 + 1] = 0.012 + rand() * 0.03;
    motion[i * 4 + 2] = rand() * 6.3;
    motion[i * 4 + 3] = rand() * 6.3;
  }

  return { shape, motion };
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    // Without this the backdrop just silently disappears, which is exactly how
    // a missing `fwidth` extension went unnoticed once already.
    if (import.meta.env.DEV) {
      console.warn("ContourField shader failed:", gl.getShaderInfoLog(shader));
    }
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createContext(canvas: HTMLCanvasElement) {
  const options: WebGLContextAttributes = {
    alpha: true,
    /**
     * Premultiplied — the default, and the path every compositor is actually
     * exercised on. The unpremultiplied mode is correct per spec but has a bad
     * record on mobile compositors, and the failure is not subtle: a buffer
     * written as `vec4(ink, a)` but composited as premultiplied puts
     * full-strength ink on every pixel whatever its alpha, which is a white
     * wash over the section in dark mode and an invisible one in light mode.
     * Multiplying the colour by its own alpha in the shader reads the same
     * under either interpretation, so nothing rests on the flag being honoured.
     */
    premultipliedAlpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "low-power",
  };

  const gl2 = canvas.getContext("webgl2", options);
  if (gl2) return { gl: gl2 as unknown as WebGLRenderingContext, es3: true };

  // WebGL1 needs the extension for `fwidth`, and without it the shader cannot
  // compile — so bail rather than draw noise.
  const gl1 = canvas.getContext("webgl", options) as WebGLRenderingContext | null;
  if (gl1 && gl1.getExtension("OES_standard_derivatives")) {
    return { gl: gl1, es3: false };
  }
  return null;
}

type ContourFieldProps = {
  /** Changes the surface. Same seed always draws the same terrain. */
  seed?: number;
  /** Roughly how many isolines fall across the surface's range. */
  levels?: number;
  /** Peak line opacity. Keep it low — this sits behind body copy. */
  intensity?: number;
  className?: string;
};

export function ContourField({
  seed = 1,
  levels = 16,
  intensity = 0.07,
  className = "",
}: ContourFieldProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  /**
   * Phones drop WebGL contexts routinely — backgrounding the tab or memory
   * pressure is enough. Without this the backdrop went blank for the rest of
   * the session; bumping the epoch on restore rebuilds the program and
   * buffers on the context the browser hands back.
   */
  const [epoch, setEpoch] = useState(0);

  useEffect(() => {
    if (!hostRef.current || !canvasRef.current) return;

    // Re-bound as non-null constants: the helpers below are hoisted function
    // declarations, which do not see the narrowing from the guard above.
    const host: HTMLDivElement = hostRef.current;
    const canvas: HTMLCanvasElement = canvasRef.current;

    const created = createContext(canvas);
    if (!created) return;
    const { gl, es3 } = created;

    const vertex = compile(gl, gl.VERTEX_SHADER, vertexSource(es3));
    const fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentSource(es3));
    if (!vertex || !fragment) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    // One oversized triangle covers the viewport with no clipped diagonal seam.
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const attribute = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(attribute);
    gl.vertexAttribPointer(attribute, 2, gl.FLOAT, false, 0, 0);

    // No blending: the triangle covers every pixel and writes the final
    // premultiplied colour, which the page compositor then blends. Blending
    // here would fold the buffer's previous frame back in — there is nothing
    // underneath to blend against inside the canvas itself.
    gl.disable(gl.BLEND);

    const uniform = (name: string) => gl.getUniformLocation(program, name);
    const uResolution = uniform("uResolution");
    const uTime = uniform("uTime");
    const uInk = uniform("uInk");
    const uIntensity = uniform("uIntensity");
    const uDensity = uniform("uDensity");

    const { shape, motion } = makeBasins(seed);
    gl.uniform4fv(uniform("uBasinShape"), shape);
    gl.uniform4fv(uniform("uBasinMotion"), motion);
    gl.uniform1f(uIntensity, intensity);
    // `levels` counts lines across the surface's usable range, which sits
    // around 2.5 units for this basin mix.
    gl.uniform1f(uDensity, levels / 2.5);

    let frame = 0;
    let clock = 0;
    let last = 0;
    let onScreen = false;
    let pageVisible = true;
    let width = 0;
    let height = 0;

    function readInk() {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--ink")
        .trim()
        .replace("#", "");
      if (raw.length !== 6) return;
      gl.uniform3f(
        uInk,
        parseInt(raw.slice(0, 2), 16) / 255,
        parseInt(raw.slice(2, 4), 16) / 255,
        parseInt(raw.slice(4, 6), 16) / 255,
      );
    }

    function draw() {
      if (!width || !height) return;
      gl.uniform1f(uTime, clock);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    function resize() {
      const rect = host.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      width = Math.round(rect.width * dpr);
      height = Math.round(rect.height * dpr);

      // Only the backing-store assignment is conditional — it reallocates and
      // clears the drawing buffer. The uniform must be written unconditionally:
      // a second mount onto an already-correctly-sized canvas (StrictMode does
      // exactly this) would otherwise leave the new program's resolution at
      // zero, and every pixel divides by it.
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, width, height);
      gl.uniform2f(uResolution, width, height);
      draw();
    }

    function step(now: number) {
      frame = requestAnimationFrame(step);
      if (!onScreen || !pageVisible) {
        last = now;
        return;
      }
      // Clamped so a backgrounded tab or a stalled frame cannot jump the
      // surface forward by seconds when it resumes.
      clock += Math.min(now - last, 50) / 1000;
      last = now;
      draw();
    }

    readInk();
    resize();
    // Only now, with something actually drawn, is the canvas allowed to paint.
    // See the note on the element itself.
    canvas.style.visibility = "visible";

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
      },
      { rootMargin: "120px" },
    );
    observer.observe(host);

    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(host);

    const onVisibility = () => {
      pageVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);

    const themeWatcher = new MutationObserver(() => {
      readInk();
      draw();
    });
    themeWatcher.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // `preventDefault` is what makes the loss recoverable at all; the restore
    // then re-runs this effect against the same canvas.
    const onContextLost = (event: Event) => {
      event.preventDefault();
      cancelAnimationFrame(frame);
      // A canvas whose context is gone does not composite as transparent — it
      // paints its drawing buffer as an opaque white plate, which is the white
      // block that appeared over the dark theme. Hide it until it can draw.
      canvas.style.visibility = "hidden";
    };
    const onContextRestored = () => setEpoch((value) => value + 1);
    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);

    if (!prefersReducedMotion()) {
      last = performance.now();
      frame = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      sizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      themeWatcher.disconnect();
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      gl.deleteBuffer(buffer);
      // Deliberately no `WEBGL_lose_context`: a canvas hands back the same
      // context object forever, so losing it here would leave a dead context
      // for the next mount — which StrictMode guarantees there will be.
    };
  }, [seed, levels, intensity, epoch]);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className={`contour-field pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      {/*
        Hidden until the effect has a working context and a drawn frame. A
        canvas that never got one — no WebGL, a rejected shader, a context the
        phone dropped — paints as an opaque plate rather than as nothing, and
        over the dark theme that reads as a white hole in the page. Failing to
        an absent backdrop is the correct degradation; it is decoration.
      */}
      <canvas ref={canvasRef} className="size-full" style={{ visibility: "hidden" }} />
    </div>
  );
}
