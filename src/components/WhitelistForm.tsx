"use client";

import { useState } from "react";
import { ArrowRight } from "@/components/icons";

/**
 * Whitelist email capture. Client-side validation only — the submit handler is
 * a stub that shows the success state. Wire `submit()` to a real endpoint
 * (Formspree, a Route Handler, R2-backed list, etc.) when the backend exists.
 */
export function WhitelistForm() {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [done, setDone] = useState(false);

  const emailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  const canSubmit = emailValid && agreed;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    // TODO: POST { email } to the whitelist endpoint.
    setDone(true);
  };

  if (done) {
    return (
      <div className="rounded-[16px] border border-[var(--hairline)] bg-white/60 p-7">
        <p className="kicker">You&rsquo;re on the list</p>
        <p className="mt-4 text-[16px] leading-[1.6] text-ink">
          Thanks. We&rsquo;ll email <span className="font-medium">{email}</span>{" "}
          when early access opens.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <label
        htmlFor="wl-email"
        className="mono text-[11px] uppercase tracking-[0.2em] text-ink-faint"
      >
        Get in touch
      </label>

      <input
        id="wl-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        autoComplete="email"
        className="mt-3 h-[52px] w-full rounded-[14px] border border-[var(--hairline)] bg-white/70 px-5 text-[15px] text-ink outline-none transition placeholder:text-ink-faint focus:border-orange focus:bg-white"
      />

      <label className="mt-5 flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-[3px] h-4 w-4 shrink-0 accent-[#F07501]"
        />
        <span className="caption text-[12.5px] leading-[1.55]">
          By checking this box I confirm that I agree to the{" "}
          <a href="#" className="text-orange underline underline-offset-2">
            Terms &amp; Conditions
          </a>{" "}
          and{" "}
          <a href="#" className="text-orange underline underline-offset-2">
            Privacy Policy
          </a>
          , and consent to receive updates and communications from Solarious by
          email.
        </span>
      </label>

      <button
        type="submit"
        disabled={!canSubmit}
        className="btn btn-primary btn-lg mt-7 w-full disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto"
      >
        Get early access
        <ArrowRight />
      </button>
    </form>
  );
}
