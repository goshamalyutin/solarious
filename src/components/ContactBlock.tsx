"use client";

import { useState } from "react";
import { ArrowRight } from "@/components/icons";
import { GlassButton } from "@/components/ui/apple-tahoe-liquid-glass-button";

/**
 * §2.13 Final CTA — four audience cards beside a real strategic-contact form.
 *
 * The cards are buttons: selecting one sets the form's interest type, so an
 * agent or a keyboard user can drive the whole flow without a mouse. The form
 * posts to /api/leads and only shows the success panel on a real 200 — a failed
 * request surfaces an inline error and keeps the user's input (brief Part 7:
 * "Form submits to a real backend — no fake success state").
 */

const INTEREST_OPTIONS = [
  "Investor",
  "Validator",
  "Energy producer",
  "Strategic partner",
  "Community",
] as const;

type Interest = (typeof INTEREST_OPTIONS)[number];

const CARDS: { title: string; description: string; interest: Interest }[] = [
  {
    title: "Investors",
    description: "Request investor materials and dataroom access.",
    interest: "Investor",
  },
  {
    title: "Validators",
    description: "Explore infrastructure participation.",
    interest: "Validator",
  },
  {
    title: "Energy Producers",
    description: "Join the Solar Miner / producer interest list.",
    interest: "Energy producer",
  },
  {
    title: "Partners",
    description:
      "Discuss energy, RWA, market infrastructure or ecosystem distribution.",
    interest: "Strategic partner",
  },
];

type Status = "idle" | "sending" | "done" | "error";

export function ContactBlock() {
  const [interest, setInterest] = useState<Interest>("Investor");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const emailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  const canSubmit =
    name.trim() !== "" &&
    emailValid &&
    organization.trim() !== "" &&
    message.trim() !== "" &&
    consent &&
    status !== "sending";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name,
          email,
          organization,
          interest,
          message,
          consent,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        throw new Error(
          data.error || "Something went wrong. Please try again.",
        );
      }
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-2 lg:items-start">
      {/* Audience cards — selectable, drive the interest field. */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {CARDS.map((c) => {
          const active = interest === c.interest;
          return (
            <button
              key={c.title}
              type="button"
              aria-pressed={active}
              onClick={() => setInterest(c.interest)}
              className={`group rounded-[var(--r-md)] border p-5 text-left transition-colors ${
                active
                  ? "border-orange bg-[color-mix(in_srgb,var(--orange)_7%,transparent)]"
                  : "border-[var(--hairline)] bg-white/40 hover:border-[color-mix(in_srgb,var(--orange)_40%,transparent)]"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-[17px] tracking-[-0.01em]">{c.title}</h3>
                <span
                  aria-hidden
                  className={`h-2 w-2 rounded-full transition-colors ${
                    active ? "bg-orange" : "bg-[var(--ink-faint)]/30"
                  }`}
                />
              </div>
              <p className="body mt-2 text-[13.5px]">{c.description}</p>
            </button>
          );
        })}
      </div>

      {/* The form. */}
      {status === "done" ? (
        <div className="rounded-[var(--r-md)] border border-[var(--hairline)] bg-white/60 p-7">
          <p className="kicker">Request received</p>
          <p className="mt-4 text-[16px] leading-[1.6] text-ink">
            Thanks, <span className="font-medium">{name.trim()}</span>.
            We&rsquo;ll be in touch at{" "}
            <span className="font-medium">{email}</span> about your{" "}
            {interest.toLowerCase()} interest.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Name" htmlFor="lf-name">
              <input
                id="lf-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
                className={inputClass}
              />
            </Field>
            <Field label="Email" htmlFor="lf-email">
              <input
                id="lf-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className={inputClass}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Organization" htmlFor="lf-org">
              <input
                id="lf-org"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                autoComplete="organization"
                required
                className={inputClass}
              />
            </Field>
            <Field label="Interest type" htmlFor="lf-interest">
              <select
                id="lf-interest"
                value={interest}
                onChange={(e) => setInterest(e.target.value as Interest)}
                className={`${inputClass} appearance-none bg-[url('/assets/icons/chevron-down.svg')] bg-[length:16px] bg-[right_14px_center] bg-no-repeat pr-10`}
              >
                {INTEREST_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Message" htmlFor="lf-message">
            <textarea
              id="lf-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              className={`${inputClass} h-auto resize-y py-3 leading-[1.5]`}
            />
          </Field>

          <label className="mt-1 flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-[3px] h-4 w-4 shrink-0 accent-[#F07501]"
            />
            <span className="caption text-[12.5px] leading-[1.55]">
              I agree to the{" "}
              <a href="#" className="text-orange underline underline-offset-2">
                Terms
              </a>{" "}
              and{" "}
              <a href="#" className="text-orange underline underline-offset-2">
                Privacy Policy
              </a>{" "}
              and consent to receive Solarius communications related to my
              request.
            </span>
          </label>

          {status === "error" && error && (
            <p
              role="alert"
              className="text-[13px] text-[var(--flame)]"
              style={{ color: "var(--flame)" }}
            >
              {error}
            </p>
          )}

          <GlassButton
            type="submit"
            size="lg"
            glassColor="rgba(240,117,1,0.55)"
            disabled={!canSubmit}
            className="mt-2 w-full whitespace-nowrap text-ink ring-1 ring-[var(--orange)] shadow-[0_0_16px_rgba(240,117,1,0.35)] disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto sm:justify-self-start"
          >
            {status === "sending" ? "Sending…" : "Join the Whitelist"}
            {status !== "sending" && <ArrowRight />}
          </GlassButton>
        </form>
      )}
    </div>
  );
}

const inputClass =
  "h-[50px] w-full rounded-[12px] border border-[var(--hairline)] bg-white/70 px-4 text-[15px] text-ink outline-none transition placeholder:text-ink-faint focus:border-orange focus:bg-white";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mono mb-2 block text-[11px] uppercase tracking-[0.16em] text-ink-faint"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
