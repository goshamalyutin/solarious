import { Reveal } from "@/components/Reveal";

interface SectionHeadProps {
  kicker: string;
  /** The heading. Wrap the single accent word in <span className="orange-word">. */
  children: React.ReactNode;
  lead?: string;
  /** Optional right-aligned index marker, LayerZero style, e.g. "03". */
  index?: string;
}

/**
 * Left-aligned section header: kicker with a thin rule, then a big heading,
 * optional lead. Replaces the centered, uniform heads that read as templated.
 * An optional monospace index marker sits top-right like layerzero.network.
 */
export function SectionHead({
  kicker,
  children,
  lead,
  index,
}: SectionHeadProps) {
  return (
    <Reveal>
      <div className="relative max-w-3xl">
        {index && (
          <span className="mono absolute right-0 top-1 hidden text-[11px] uppercase tracking-[0.2em] text-ink-faint md:block">
            [{index}]
          </span>
        )}
        <p className="kicker">{kicker}</p>
        <h2 className="mt-5 text-balance">{children}</h2>
        {lead && <p className="lead mt-6">{lead}</p>}
      </div>
    </Reveal>
  );
}
