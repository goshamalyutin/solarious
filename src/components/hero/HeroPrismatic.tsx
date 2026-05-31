"use client";

import { useEffect, useState } from "react";
import PrismaticBurst from "@/components/PrismaticBurst";
import { HeroContent } from "@/components/hero/HeroContent";
import {
  type ShaderConfig,
  DEFAULT_SHADER_CONFIG,
  RAMPS,
  maskFor,
} from "@/components/hero/shaderConfig";

/**
 * HeroPrismatic — Option B, hardened and config-driven.
 *
 * Same warm-pearl light base as Option C, used as the SSR default and as the
 * reduced-motion / no-WebGL fallback. The PrismaticBurst shader only mounts
 * client-side when (a) a WebGL context exists and (b) the user has NOT asked
 * for reduced motion, so the render loop never starts in those cases.
 *
 * The exact look is supplied by a ShaderConfig (see shaderConfig.ts). The
 * hero-lab tuner writes one live; the winning config is passed here on the
 * real landing page, so tuning and production never drift.
 */
export function HeroPrismatic({
  config = DEFAULT_SHADER_CONFIG,
}: {
  config?: ShaderConfig;
}) {
  const [showShader, setShowShader] = useState(false);
  const [small, setSmall] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mq = window.matchMedia("(max-width: 720px)");

    const hasWebGL = (() => {
      try {
        const c = document.createElement("canvas");
        return !!(c.getContext("webgl2") || c.getContext("webgl"));
      } catch {
        return false;
      }
    })();

    const decide = () => {
      setShowShader(hasWebGL && !reduce.matches);
      setSmall(mq.matches);
    };

    decide();
    reduce.addEventListener("change", decide);
    mq.addEventListener("change", decide);
    return () => {
      reduce.removeEventListener("change", decide);
      mq.removeEventListener("change", decide);
    };
  }, []);

  // Lower fill-rate on phones: fewer angular rays.
  const rayCount = small ? Math.min(config.rayCount, 18) : config.rayCount;

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] w-full items-center justify-center overflow-hidden pt-[120px]"
      aria-label="Solarious hero"
    >
      {/* Light base = SSR default AND the reduced-motion / no-WebGL fallback. */}
      <div className="hl-stage -z-20" aria-hidden>
        <div className="hl-base" />
        <div className="hl-halo" />
        <div className="hl-grain" />
      </div>

      {/*
        Shader layer. PrismaticBurst outputs PREMULTIPLIED alpha (alpha =
        luminance), so dark ray-march regions are transparent. mixBlendMode
        "multiply" + the radial mask are REQUIRED for light mode: they let the
        warm pearl page show through the dark regions and keep only the amber
        rays. Do not remove the mask or change the blend mode without
        re-verifying in light mode (see git history e6c379d / 540686c).
      */}
      {showShader && (
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            maskImage: maskFor(config),
            WebkitMaskImage: maskFor(config),
          }}
        >
          <PrismaticBurst
            animationType={config.animationType}
            intensity={config.intensity}
            speed={config.speed}
            distort={config.distort}
            rayCount={rayCount}
            offset={{ x: 0, y: config.offsetY }}
            mixBlendMode="multiply"
            colors={RAMPS[config.ramp]}
          />
        </div>
      )}

      <HeroContent />
    </section>
  );
}
