import { Logo } from "@/components/Logo";
import { ArrowRight } from "@/components/icons";

export function Nav() {
  return (
    <div className="nav-shell">
      <nav className="nav">
        <a href="#top" className="flex items-center gap-3">
          <Logo
            variant="gradient"
            className="h-6 w-auto"
            width={140}
            height={24}
            priority
          />
        </a>
        <div className="hidden items-center gap-9 text-[13px] text-ink-muted md:flex">
          <a href="#poe" className="transition hover:text-ink">
            Technology
          </a>
          <a href="#token" className="transition hover:text-ink">
            Token
          </a>
          <a href="#products" className="transition hover:text-ink">
            Ecosystem
          </a>
          <a href="#roadmap" className="transition hover:text-ink">
            Roadmap
          </a>
          <a href="#" className="transition hover:text-ink">
            Docs
          </a>
        </div>
        <a href="#whitelist" className="btn btn-primary btn-sm">
          Join the Whitelist
          <ArrowRight />
        </a>
      </nav>
    </div>
  );
}
