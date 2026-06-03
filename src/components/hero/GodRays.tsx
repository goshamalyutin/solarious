"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle, Texture } from "ogl";

/**
 * GodRays — a clean, purpose-built WebGL god-ray shader for the hero.
 *
 * Unlike the PrismaticBurst ray-march (whose grain and sin×sin interference are
 * coupled, so it can't be cleaned without breaking), this computes the rays
 * DIRECTLY: even angular ray-combs + a soft radial falloff + a warm gradient,
 * with slow rotation/breathing for life and a whisper of smooth value-noise
 * purely to kill gradient banding. No per-pixel grain, no blotches.
 *
 * Output is premultiplied alpha (alpha = luminance) and the canvas uses
 * mix-blend-mode "multiply", so dark regions are transparent and the warm rays
 * tint the pearl page — identical light-mode integration to the old shader.
 */

const vertexShader = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const fragmentShader = `#version 300 es
precision highp float;

out vec4 fragColor;

uniform vec2  uResolution;
uniform float uTime;
uniform float uIntensity;
uniform sampler2D uGradient;

float hash21(vec2 p){
  p = floor(p);
  float f = 52.9829189 * fract(dot(p, vec2(0.065, 0.005)));
  return fract(f);
}

// Smooth value noise (bilinear-interpolated hash) — used ONLY as a tiny static
// dither so the warm gradient doesn't band. Never visible as texture.
float vnoise(vec2 x){
  vec2 i = floor(x);
  vec2 f = fract(x);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),
             mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}

vec3 grad(float t){ return texture(uGradient, vec2(clamp(t, 0.0, 1.0), 0.5)).rgb; }

void main(){
  vec2 frag = gl_FragCoord.xy;

  // Ray origin: just above the top-centre (gl_FragCoord is bottom-up, so the
  // top edge is uResolution.y).
  vec2 origin = vec2(uResolution.x * 0.5, uResolution.y * 1.04);
  vec2 d = frag - origin;
  float dist = length(d) / uResolution.y;   // 0 at the sun, ~1 a viewport down
  float ang = atan(d.x, -d.y);              // 0 = straight down

  float t = uTime;

  // Even, regular rays — two sets at different counts, slowly counter-rotating
  // so the light feels alive without any flicker.
  float a1 = 0.5 + 0.5 * cos(ang * 42.0 + t * 0.011);
  float a2 = 0.5 + 0.5 * cos(ang * 21.0 - t * 0.007 + 0.7);
  float rays = pow(a1, 5.0) * 0.55 + pow(a2, 3.0) * 0.65;

  // Soft radial falloff: bright at the sun, faded out well before the headline.
  float fall = smoothstep(0.92, 0.06, dist);
  fall *= smoothstep(0.0, 0.16, dist);   // soften the hot core (no hard disc)

  float l = rays * fall;
  l *= 0.93 + 0.07 * sin(t * 0.12);      // very gentle breathing

  // Imperceptible static dither — anti-banding only.
  l += (vnoise(frag * 0.4) - 0.5) * 0.012;
  l = max(l, 0.0);

  // Warm colour: pale/hot near the sun, amber out along the rays.
  vec3 col = grad(0.08 + dist * 0.92) * l * uIntensity;
  col = clamp(col, 0.0, 1.0);

  // Premultiplied alpha (alpha = luminance) for the multiply blend.
  float a = max(col.r, max(col.g, col.b));
  fragColor = vec4(col * a, a);
}
`;

const RAY_COLORS = ["#FFF3DA", "#FFE0A0", "#F8BE63", "#EF982F", "#E07016"];

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const v = parseInt(h, 16);
  return [((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255];
}

export function GodRays({ intensity = 1 }: { intensity?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let renderer: Renderer;
    try {
      renderer = new Renderer({
        dpr,
        alpha: true,
        antialias: false,
        premultipliedAlpha: true,
      });
    } catch {
      return; // no WebGL — the CSS halo/base still carry the hero
    }

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.position = "absolute";
    gl.canvas.style.inset = "0";
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.mixBlendMode = "multiply";
    container.appendChild(gl.canvas);

    // Warm gradient ramp as a 1D texture.
    const data = new Uint8Array(RAY_COLORS.length * 4);
    RAY_COLORS.forEach((hex, i) => {
      const [r, g, b] = hexToRgb(hex);
      data[i * 4] = Math.round(r * 255);
      data[i * 4 + 1] = Math.round(g * 255);
      data[i * 4 + 2] = Math.round(b * 255);
      data[i * 4 + 3] = 255;
    });
    const gradient = new Texture(gl, {
      image: data,
      width: RAY_COLORS.length,
      height: 1,
      generateMipmaps: false,
      flipY: false,
    });
    gradient.minFilter = gl.LINEAR;
    gradient.magFilter = gl.LINEAR;
    gradient.wrapS = gl.CLAMP_TO_EDGE;
    gradient.wrapT = gl.CLAMP_TO_EDGE;

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uResolution: { value: [1, 1] as [number, number] },
        uTime: { value: 0 },
        uIntensity: { value: intensity },
        uGradient: { value: gradient },
      },
    });

    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const resize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(w, h);
      program.uniforms.uResolution.value = [
        gl.drawingBufferWidth,
        gl.drawingBufferHeight,
      ];
    };
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    let visible = true;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e) visible = e.isIntersecting;
      },
      { threshold: 0.01 },
    );
    io.observe(container);

    let raf = 0;
    let last = performance.now();
    let accum = 0;
    const tick = (now: number) => {
      const dt = Math.max(0, now - last) * 0.001;
      last = now;
      if (visible && !document.hidden) {
        accum += dt;
        program.uniforms.uTime.value = accum;
        renderer.render({ scene: mesh });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      try {
        container.removeChild(gl.canvas);
      } catch {
        /* already detached */
      }
    };
  }, [intensity]);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden"
    />
  );
}
