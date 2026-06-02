"use client";

import { useEffect, useState } from "react";
import { GodRays } from "@/components/hero/GodRays";
import { HeroContent } from "@/components/hero/HeroContent";
import {
  type ShaderConfig,
  DEFAULT_SHADER_CONFIG,
} from "@/components/hero/shaderConfig";

/**
 * HeroPrismatic — the hero light.
 *
 * SSR default + reduced-motion + no-WebGL fallback: the CSS base wash and warm
 * halo (.hl-base / .hl-halo) carry the screen. When a WebGL context exists and
 * motion is allowed, the clean GodRays shader mounts on top — even, regular
 * rays with no grain (see GodRays.tsx). The .hl-grain overlay was removed per
 * brief §2.2 (B1). The `config` prop is retained for the /hero-lab tuner.
 */
export function HeroPrismatic({
  config: _config = DEFAULT_SHADER_CONFIG,
}: {
  config?: ShaderConfig;
}) {
  const [showShader, setShowShader] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hasWebGL = (() => {
      try {
        const c = document.createElement("canvas");
        return !!(c.getContext("webgl2") || c.getContext("webgl"));
      } catch {
        return false;
      }
    })();
    const decide = () => setShowShader(hasWebGL && !reduce.matches);
    decide();
    reduce.addEventListener("change", decide);
    return () => reduce.removeEventListener("change", decide);
  }, []);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] w-full items-center justify-center overflow-hidden pt-[120px]"
      aria-label="Solarious hero"
    >
      {/* CSS light base = SSR default and the reduced-motion / no-WebGL fallback. */}
      <div className="hl-stage -z-20" aria-hidden>
        <div className="hl-base" />
        <div className="hl-halo" />
      </div>

      {/* Clean WebGL god-rays on top. */}
      {showShader && (
        <div aria-hidden className="absolute inset-0 -z-10">
          <GodRays intensity={1.0} />
        </div>
      )}

      <HeroContent />
    </section>
  );
}
