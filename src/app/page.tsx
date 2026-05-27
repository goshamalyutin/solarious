import PrismaticBurst from "@/components/PrismaticBurst";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-white text-stone-900">
      {/* Hero */}
      <section className="relative isolate flex min-h-screen w-full flex-col">
        {/* Sunlight burst background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 h-full w-full">
            <PrismaticBurst
              animationType="rotate3d"
              intensity={2.4}
              speed={0.35}
              distort={1.6}
              rayCount={28}
              mixBlendMode="multiply"
              colors={[
                "#FFF6E0",
                "#FFE3A3",
                "#FFC56B",
                "#FF9A3C",
                "#FF6B1A",
                "#E94E1B",
                "#FFD27A",
                "#FFFFFF",
              ]}
            />
          </div>
          {/* soft white vignette so corners breathe */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_45%,rgba(255,255,255,0.55)_85%,rgba(255,255,255,0.95)_100%)]" />
        </div>

        {/* Nav */}
        <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 sm:py-8">
          <a
            href="#"
            className="flex items-center gap-2 font-semibold tracking-tight"
          >
            <span
              aria-hidden
              className="inline-block h-5 w-5 rounded-full bg-gradient-to-br from-amber-300 via-orange-400 to-rose-500 shadow-[0_0_24px_rgba(255,165,80,0.55)]"
            />
            <span className="text-lg">Solarius</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-stone-600 md:flex">
            <a href="#features" className="transition hover:text-stone-900">
              Features
            </a>
            <a href="#how" className="transition hover:text-stone-900">
              How it works
            </a>
            <a href="#pricing" className="transition hover:text-stone-900">
              Pricing
            </a>
            <a href="#docs" className="transition hover:text-stone-900">
              Docs
            </a>
          </nav>

          <a
            href="#start"
            className="rounded-full border border-stone-200 bg-white/70 px-4 py-2 text-sm font-medium text-stone-800 shadow-sm backdrop-blur transition hover:bg-white"
          >
            Sign in
          </a>
        </header>

        {/* Headline */}
        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 pb-24 pt-10 text-center sm:pt-16">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-200/70 bg-white/70 px-3 py-1 text-xs font-medium text-amber-700 shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            v1.0 · powered by sunlight
          </div>

          <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-stone-900 sm:text-6xl md:text-7xl lg:text-8xl">
            Energy that
            <br />
            <span className="bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">
              moves with the sun.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-stone-600 sm:text-lg">
            Solarius turns daylight into compute. A new operating layer for
            solar-aware workloads — schedule, route, and bill electricity the
            way you ship software.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <a
              id="start"
              href="#"
              className="group relative inline-flex items-center gap-2 rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition hover:bg-stone-800"
            >
              Start free
              <span
                aria-hidden
                className="transition group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/70 px-6 py-3 text-sm font-medium text-stone-800 backdrop-blur transition hover:bg-white"
            >
              See how it works
            </a>
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.18em] text-stone-400">
            <span>Helios Grid</span>
            <span className="h-1 w-1 rounded-full bg-stone-300" />
            <span>NovaWatt</span>
            <span className="h-1 w-1 rounded-full bg-stone-300" />
            <span>Photon Labs</span>
            <span className="h-1 w-1 rounded-full bg-stone-300" />
            <span>Sundial Capital</span>
          </div>
        </div>

        {/* Bottom fade into white */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-white" />
      </section>

      {/* Features */}
      <section
        id="features"
        className="relative mx-auto w-full max-w-7xl px-6 py-24 sm:py-32"
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-amber-600">
            What it does
          </p>
          <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
            Built for the brightest hours of the day.
          </h2>
          <p className="mt-4 text-pretty text-stone-600">
            Three primitives, one orbit. Everything compiles to clean kilowatts.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              title: "Forecast",
              desc: "Probabilistic irradiance models down to 10-minute resolution across 60+ markets.",
              icon: "☀️",
            },
            {
              title: "Schedule",
              desc: "Pin workloads to the sunniest watt. APIs for compute, batch jobs, and EV fleets.",
              icon: "⚡",
            },
            {
              title: "Settle",
              desc: "Programmable PPAs and on-chain settlement. Pay only for the photons you used.",
              icon: "🪙",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="group relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-8 shadow-sm transition hover:shadow-md"
            >
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-amber-200/60 to-transparent blur-2xl transition group-hover:scale-110" />
              <div className="relative">
                <div className="text-3xl">{f.icon}</div>
                <h3 className="mt-6 text-xl font-semibold tracking-tight">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        id="how"
        className="relative mx-auto w-full max-w-5xl px-6 pb-32"
      >
        <div className="relative overflow-hidden rounded-[2rem] border border-stone-200 bg-stone-900 p-10 text-white sm:p-16">
          <div className="absolute inset-0 -z-0 opacity-70">
            <PrismaticBurst
              animationType="rotate"
              intensity={1.6}
              speed={0.25}
              distort={0.6}
              rayCount={20}
              mixBlendMode="screen"
              colors={["#FFB347", "#FF7A1A", "#FFD27A", "#FFFFFF"]}
            />
          </div>
          <div className="relative z-10 max-w-xl">
            <h3 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Ship workloads on solar time.
            </h3>
            <p className="mt-3 text-stone-300">
              One API call. A clean kWh receipt. Start in under a minute.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-stone-900 transition hover:bg-amber-100"
              >
                Get an API key →
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white/10"
              >
                Read the docs
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-4 px-6 py-10 text-sm text-stone-500 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block h-4 w-4 rounded-full bg-gradient-to-br from-amber-300 via-orange-400 to-rose-500"
            />
            <span className="font-medium text-stone-700">Solarius</span>
            <span className="text-stone-400">
              · © {new Date().getFullYear()}
            </span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-stone-900">
              Privacy
            </a>
            <a href="#" className="hover:text-stone-900">
              Terms
            </a>
            <a href="#" className="hover:text-stone-900">
              Status
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
