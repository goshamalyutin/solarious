import { ArrowRight } from "@/components/icons";

interface IndexRowProps {
  index: string;
  title: string;
  tag: string;
  description: string;
}

/**
 * Hairline-ruled list row with a monospace index marker, borrowed structurally
 * from layerzero.network. No cards, no shadows, no icons. The description sits
 * quiet by default and the row warms on hover. This replaces repeated
 * icon+heading+text card grids, the single biggest AI-slop tell on the page.
 *
 * Grid columns: [index] [title] [tag] [arrow]. On mobile it stacks.
 */
export function IndexRow({ index, title, tag, description }: IndexRowProps) {
  return (
    <a
      href="#"
      className="group block border-t border-[var(--hairline)] py-7 transition-colors last:border-b hover:bg-[color-mix(in_srgb,var(--orange)_4%,transparent)]"
    >
      <div className="grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-5 gap-y-2 sm:grid-cols-[3rem_minmax(0,1fr)_9rem_2rem] sm:items-center">
        <span className="mono text-[12px] tabular-nums text-ink-faint">
          {index}
        </span>

        <div className="min-w-0">
          <h3 className="text-[clamp(20px,2vw,26px)] tracking-[-0.02em] transition-colors group-hover:text-orange">
            {title}
          </h3>
          <p className="body mt-2 max-w-xl text-[14.5px] sm:mt-1">
            {description}
          </p>
        </div>

        <span className="mono col-start-2 row-start-1 justify-self-end text-[10.5px] uppercase tracking-[0.16em] text-ink-faint sm:col-start-3 sm:row-start-1 sm:justify-self-start">
          {tag}
        </span>

        <span className="col-span-3 hidden text-ink-faint transition-all group-hover:translate-x-1 group-hover:text-orange sm:col-span-1 sm:block sm:justify-self-end">
          <ArrowRight />
        </span>
      </div>
    </a>
  );
}
