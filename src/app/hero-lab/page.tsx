"use client";

import { useEffect, useState } from "react";
import { Nav } from "@/components/Nav";
import { HeroPrismatic } from "@/components/hero/HeroPrismatic";
import { HeroCss } from "@/components/hero/HeroCss";
import {
  type ShaderConfig,
  type RampName,
  PRESETS,
  RAMPS,
  RAMP_BRAND_SAFE,
  DEFAULT_SHADER_CONFIG,
  matchPreset,
} from "@/components/hero/shaderConfig";

type Option = "B" | "C";

export default function HeroLab() {
  const [option, setOption] = useState<Option>("B");
  const [cfg, setCfg] = useState<ShaderConfig>(DEFAULT_SHADER_CONFIG);
  const [panelOpen, setPanelOpen] = useState(true);
  const [webglOk, setWebglOk] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      setWebglOk(!!(c.getContext("webgl2") || c.getContext("webgl")));
    } catch {
      setWebglOk(false);
    }
  }, []);

  const preset = matchPreset(cfg);

  function set<K extends keyof ShaderConfig>(key: K, value: ShaderConfig[K]) {
    setCfg((prev) => ({ ...prev, [key]: value }));
  }

  function copyConfig() {
    const json = JSON.stringify(cfg, null, 2);
    navigator.clipboard?.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  return (
    <main className="relative w-full bg-pearl text-ink">
      <Nav />

      {/* key forces a clean shader remount whenever the config changes, so
          you always see the exact params (no stale uniforms) */}
      {option === "B" ? (
        <HeroPrismatic key={JSON.stringify(cfg)} config={cfg} />
      ) : (
        <HeroCss />
      )}

      {/* A slice of the next section so the hero -> section transition reads */}
      <section className="border-t border-[var(--hairline)] bg-pearl-alt py-24">
        <div className="mx-auto max-w-[1280px] px-6 text-center sm:px-8">
          <p className="kicker justify-center">
            Built on verifiable infrastructure
          </p>
          <p className="mx-auto mt-5 max-w-xl text-[15px] text-ink-muted">
            Renewable-energy verification · Proof-of-Energy · Solar Miner
            measurement · Validator infrastructure
          </p>
        </div>
      </section>

      {/* ── Option switch (bottom center) ───────────────────────── */}
      <div className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2">
        <div className="flex items-center gap-1 rounded-full border border-[var(--hairline)] bg-white/75 p-1.5 shadow-[var(--shadow-lift)] backdrop-blur-xl">
          <Seg
            active={option === "C"}
            onClick={() => setOption("C")}
            label="C · Light"
            sub="pure CSS"
          />
          <Seg
            active={option === "B"}
            onClick={() => setOption("B")}
            label="B · Shader"
            sub="hardened"
          />
        </div>
      </div>

      {/* ── Tuner panel (right) — only meaningful for B ──────────── */}
      {option === "B" && (
        <div className="fixed right-4 top-24 z-[100] w-[300px]">
          <div className="overflow-hidden rounded-2xl border border-[var(--hairline)] bg-white/80 shadow-[var(--shadow-lift)] backdrop-blur-xl">
            <button
              onClick={() => setPanelOpen((v) => !v)}
              className="flex w-full items-center justify-between px-4 py-3 text-left"
            >
              <span className="mono text-[11px] uppercase tracking-[0.16em] text-ink">
                Shader tuner
              </span>
              <span className="mono text-[11px] text-ink-faint">
                {panelOpen ? "hide" : "show"}
              </span>
            </button>

            {panelOpen && (
              <div className="max-h-[68vh] space-y-4 overflow-y-auto px-4 pb-4">
                {webglOk === false && (
                  <p className="rounded-lg bg-orange/10 px-3 py-2 text-[11px] leading-snug text-orange">
                    No WebGL in this browser. You are seeing the CSS fallback,
                    not the live shader.
                  </p>
                )}

                {/* Presets */}
                <div>
                  <Label>Preset</Label>
                  <div className="mt-2 grid grid-cols-2 gap-1.5">
                    {Object.keys(PRESETS).map((name) => (
                      <button
                        key={name}
                        onClick={() => setCfg(PRESETS[name])}
                        className={`rounded-lg border px-2 py-1.5 text-[12px] transition ${
                          preset === name
                            ? "border-orange/40 bg-orange/10 text-orange"
                            : "border-[var(--hairline)] bg-white/60 text-ink-muted hover:text-ink"
                        }`}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
                    {preset ? `preset: ${preset}` : "custom"}
                  </div>
                </div>

                {/* Animation */}
                <div>
                  <Label>Motion</Label>
                  <div className="mt-2 flex gap-1.5">
                    {(["rotate3d", "rotate"] as const).map((a) => (
                      <button
                        key={a}
                        onClick={() => set("animationType", a)}
                        className={`flex-1 rounded-lg border px-2 py-1.5 text-[12px] transition ${
                          cfg.animationType === a
                            ? "border-orange/40 bg-orange/10 text-orange"
                            : "border-[var(--hairline)] bg-white/60 text-ink-muted hover:text-ink"
                        }`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color ramp */}
                <div>
                  <Label>Color ramp</Label>
                  <div className="mt-2 space-y-1.5">
                    {(Object.keys(RAMPS) as RampName[]).map((r) => (
                      <button
                        key={r}
                        onClick={() => set("ramp", r)}
                        className={`flex w-full items-center gap-2 rounded-lg border px-2 py-1.5 transition ${
                          cfg.ramp === r
                            ? "border-orange/40 bg-orange/10"
                            : "border-[var(--hairline)] bg-white/60 hover:bg-white"
                        }`}
                      >
                        <span className="flex h-3.5 flex-1 overflow-hidden rounded">
                          {RAMPS[r].map((c) => (
                            <span
                              key={c}
                              className="flex-1"
                              style={{ background: c }}
                            />
                          ))}
                        </span>
                        <span className="mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
                          {r}
                        </span>
                        {!RAMP_BRAND_SAFE[r] && (
                          <span
                            className="mono text-[9px] text-orange"
                            title="2nd hue, off-brand"
                          >
                            !
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <Slider
                  label="Intensity"
                  value={cfg.intensity}
                  min={0.6}
                  max={3}
                  step={0.05}
                  onChange={(v) => set("intensity", v)}
                />
                <Slider
                  label="Speed"
                  value={cfg.speed}
                  min={0.04}
                  max={0.5}
                  step={0.01}
                  onChange={(v) => set("speed", v)}
                />
                <Slider
                  label="Distort"
                  value={cfg.distort}
                  min={0}
                  max={1.2}
                  step={0.02}
                  onChange={(v) => set("distort", v)}
                />
                <Slider
                  label="Ray count"
                  value={cfg.rayCount}
                  min={0}
                  max={60}
                  step={1}
                  onChange={(v) => set("rayCount", v)}
                />
                <Slider
                  label="Origin Y (up)"
                  value={cfg.offsetY}
                  min={-200}
                  max={400}
                  step={10}
                  onChange={(v) => set("offsetY", v)}
                />
                <Slider
                  label="Mask Y %"
                  value={cfg.maskY}
                  min={6}
                  max={50}
                  step={1}
                  onChange={(v) => set("maskY", v)}
                />

                <div className="flex gap-1.5 pt-1">
                  <button
                    onClick={() => setCfg(DEFAULT_SHADER_CONFIG)}
                    className="flex-1 rounded-lg border border-[var(--hairline)] bg-white/60 px-2 py-2 text-[12px] text-ink-muted transition hover:text-ink"
                  >
                    Reset
                  </button>
                  <button
                    onClick={copyConfig}
                    className="flex-1 rounded-lg px-2 py-2 text-[12px] font-medium text-white transition"
                    style={{ background: "var(--brand-gradient)" }}
                  >
                    {copied ? "Copied ✓" : "Copy config"}
                  </button>
                </div>

                <pre className="overflow-x-auto rounded-lg bg-ink/[0.04] p-2.5 mono text-[10px] leading-relaxed text-ink-muted">
                  {JSON.stringify(cfg, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
      {children}
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <span className="mono text-[11px] text-ink">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="mt-1.5 w-full accent-orange"
      />
    </div>
  );
}

function Seg({
  active,
  onClick,
  label,
  sub,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  sub: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center rounded-full px-6 py-2 text-[13px] transition ${
        active ? "text-white" : "text-ink-muted hover:text-ink"
      }`}
      style={active ? { background: "var(--brand-gradient)" } : undefined}
    >
      <span className="font-medium">{label}</span>
      <span className="mono text-[9px] uppercase tracking-[0.16em] opacity-70">
        {sub}
      </span>
    </button>
  );
}
