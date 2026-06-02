import { promises as fs } from "fs";
import path from "path";

/**
 * Lead capture endpoint for both site forms:
 *   - the whitelist email block (hero / final CTA)
 *   - the richer strategic-contact form (§2.13)
 *
 * Per the build brief's guardrail, the form must hit a *real* backend with no
 * fake success state. This handler validates server-side and only returns 200
 * once a lead has actually been persisted:
 *
 *   1. If LEADS_WEBHOOK_URL is set, the lead is forwarded there (Slack / Discord
 *      / Zapier / Formspree-style JSON webhook) — the durable path in production.
 *   2. The lead is always appended to a newline-delimited JSON log on disk
 *      (LEADS_FILE, default ./.data/leads.jsonl) — the path used in local dev.
 *
 * If neither sink succeeds, the client receives a real error and shows it; it
 * never silently reports success.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const INTEREST_TYPES = [
  "Investor",
  "Validator",
  "Energy producer",
  "Strategic partner",
  "Community",
] as const;

type InterestType = (typeof INTEREST_TYPES)[number];

interface LeadRecord {
  type: "whitelist" | "contact";
  email: string;
  name?: string;
  organization?: string;
  interest?: InterestType;
  message?: string;
  receivedAt: string;
  userAgent: string | null;
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function isNonEmptyString(value: unknown, max = 2000): value is string {
  return (
    typeof value === "string" && value.trim().length > 0 && value.length <= max
  );
}

function badRequest(message: string): Response {
  return Response.json({ ok: false, error: message }, { status: 400 });
}

async function persist(record: LeadRecord): Promise<void> {
  const sinks: Promise<void>[] = [];

  const webhook = process.env.LEADS_WEBHOOK_URL;
  if (webhook) {
    sinks.push(
      fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(record),
      }).then((res) => {
        if (!res.ok) throw new Error(`webhook responded ${res.status}`);
      }),
    );
  }

  const file =
    process.env.LEADS_FILE ?? path.join(process.cwd(), ".data", "leads.jsonl");
  sinks.push(
    (async () => {
      await fs.mkdir(path.dirname(file), { recursive: true });
      await fs.appendFile(file, JSON.stringify(record) + "\n", "utf8");
    })(),
  );

  // Succeed if at least one sink accepted the lead.
  const results = await Promise.allSettled(sinks);
  if (!results.some((r) => r.status === "fulfilled")) {
    const reason = results
      .map((r) => (r.status === "rejected" ? String(r.reason) : ""))
      .filter(Boolean)
      .join("; ");
    throw new Error(reason || "no lead sink succeeded");
  }
}

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return badRequest("Invalid JSON body.");
  }

  if (typeof body !== "object" || body === null) {
    return badRequest("Expected an object body.");
  }

  const data = body as Record<string, unknown>;
  const type = data.type === "contact" ? "contact" : "whitelist";

  const email = typeof data.email === "string" ? data.email.trim() : "";
  if (!EMAIL_RE.test(email)) {
    return badRequest("A valid email address is required.");
  }

  if (data.consent !== true) {
    return badRequest("Consent is required.");
  }

  const record: LeadRecord = {
    type,
    email,
    receivedAt: new Date().toISOString(),
    userAgent: request.headers.get("user-agent"),
  };

  if (type === "contact") {
    if (!isNonEmptyString(data.name, 200)) {
      return badRequest("Name is required.");
    }
    if (!isNonEmptyString(data.organization, 200)) {
      return badRequest("Organization is required.");
    }
    if (
      typeof data.interest !== "string" ||
      !INTEREST_TYPES.includes(data.interest as InterestType)
    ) {
      return badRequest("A valid interest type is required.");
    }
    if (!isNonEmptyString(data.message, 4000)) {
      return badRequest("A message is required.");
    }
    record.name = data.name.trim();
    record.organization = data.organization.trim();
    record.interest = data.interest as InterestType;
    record.message = data.message.trim();
  }

  try {
    await persist(record);
  } catch {
    return Response.json(
      { ok: false, error: "We couldn't save your request. Please try again." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
