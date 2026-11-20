"use client";

import { useId, useState } from "react";

// Replays CovertGift's real responses for one route. Sources (CovertGift repo, 2026-11-20):
// backend/internal/middleware/group_access.go (the 403 and its message), controllers/response.go
// (the JSON envelope), cmd/seed/main.go (the three ideas a member sees).
type Labels = { as: string; member: string; recipient: string; translation: string };
type Role = "member" | "recipient";
type Line = { text: string; tone?: "muted" | "ok" | "err" | "prompt" };

const ROUTE = "/api/v1/groups/:id/ideas";

const script: Record<Role, Line[]> = {
  member: [
    { text: "$ curl -H 'Authorization: Bearer $MEMBER' " + ROUTE, tone: "prompt" },
    { text: "  GroupAccess: member ✓ → GetIdeas", tone: "muted" },
    { text: "HTTP/1.1 200 OK", tone: "ok" },
    { text: '{ "success": true, "data": [' },
    { text: '    { "title": "Stanley Klasik Vakumlu Termos 1 L", "estimated_price": "1450" },' },
    { text: '    { "title": "Hario V60 Demleme Seti", "estimated_price": "1100" },' },
    { text: '    { "title": "Katlanır Trekking Batonu (çift)", "estimated_price": "850" }' },
    { text: "] }" },
  ],
  recipient: [
    { text: "$ curl -H 'Authorization: Bearer $RECIPIENT' " + ROUTE, tone: "prompt" },
    { text: "  GroupAccess: group.target_user_id == user_id → abort", tone: "muted" },
    { text: "HTTP/1.1 403 Forbidden", tone: "err" },
    { text: '{ "success": false,' },
    { text: '  "error": "Erişim engellendi: Bu hediye grubu senin için oluşturulmuş bir sürprizdir." }' },
  ],
};

const toneClass: Record<NonNullable<Line["tone"]>, string> = {
  prompt: "text-term-ink",
  muted: "text-term-muted",
  ok: "text-ok",
  err: "text-err",
};

/** Same route, same middleware, two users: switch who asks and read what the server answers. */
export function SpoilerDemo({ labels }: { labels: Labels }) {
  const [role, setRole] = useState<Role>("member");
  const name = useId();
  const lines = script[role];

  return (
    <div className="grid min-w-0 gap-4">
      <fieldset className="m-0 flex flex-wrap items-center gap-x-4 border-0 p-0 text-label">
        <legend className="float-left mr-2 flex min-h-11 items-center text-muted">{labels.as}</legend>
        {(["member", "recipient"] as const).map((r) => (
          <label key={r} className="navlink cursor-pointer has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-accent">
            <input type="radio" name={name} value={r} checked={role === r} onChange={() => setRole(r)} className="sr-only" />
            <kbd aria-hidden="true" className={role === r ? "!text-accent-ink" : ""}>
              {role === r ? "(•)" : "( )"}
            </kbd>
            <span>{labels[r]}</span>
          </label>
        ))}
      </fieldset>

      <div className="term" translate="no">
        <div className="term-bar">
          <i />
          <i />
          <i />
          <b className="ml-1.5 font-normal">GET {ROUTE}</b>
        </div>
        {/* key: the response wipes in again on every switch */}
        <pre key={role} aria-live="polite" className="m-0 overflow-x-auto px-4 py-3.5 font-mono text-[12.5px] leading-[1.7]">
          {lines.map((l, i) => (
            <span key={i} className={`spoiler-line block ${l.tone ? toneClass[l.tone] : ""}`} style={{ animationDelay: `${i * 60}ms` }}>
              {l.text}
            </span>
          ))}
          {role === "recipient" && labels.translation && (
            <span className="spoiler-line block text-term-muted" style={{ animationDelay: `${lines.length * 60}ms` }}>
              {"// "}
              {labels.translation}
            </span>
          )}
        </pre>
      </div>
    </div>
  );
}
