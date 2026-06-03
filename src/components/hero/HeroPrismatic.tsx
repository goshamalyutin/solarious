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
 * Hero light source. Flip this to switch the hero atmosphere:
 *   "prismatic" — the dynamic WebGL PrismaticBurst shader (animated god-rays).
 *   "aurora"    — the flowing CSS aurora (.hl-aurora), dynamic + grain-free.
 * Both sit over the CSS base wash + warm halo; the .hl-grain overlay was
 * removed per brief §2.2 (B1).
 */
const HERO_LIGHT: "prismatic" | "aurora" = "prismatic";

export function HeroPrismatic({
  config = DEFAULT_SHADER_CONFIG,
}: {
  config?: ShaderConfig;
}) {
  const [showShader, setShowShader] = useState(false);
  const [small, setSmall] = useState(false);

  useEffect(() => {
    if (HERO_LIGHT !== "prismatic") return;
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

  const rayCount = small ? Math.min(config.rayCount, 18) : config.rayCount;

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] w-full items-center justify-center overflow-hidden pt-[120px]"
      aria-label="Solarious hero"
    >
      <div className="hl-stage -z-20" aria-hidden>
        <div className="hl-base" />
        {HERO_LIGHT === "aurora" && <div className="hl-aurora" />}
        <div className="hl-halo" />
      </div>

      {HERO_LIGHT === "prismatic" && showShader && (
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
