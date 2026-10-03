"use client";

import { useState } from "react";

type Props = { postSlug: string };

export function CommentForm({ postSlug }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, body, postSlug }),
      });
      const json = (await res.json()) as { ok: boolean; error?: string; message?: string };

      if (res.ok && json.ok) {
        setStatus("sent");
        setName("");
        setEmail("");
        setBody("");
      } else {
        setStatus("error");
        setError(json.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  if (status === "sent") {
    return (
      <div
        className="rounded-xl px-4 py-3 text-sm"
        style={{
          backgroundColor: "#D4EDDF",
          color: "#003020",
          fontFamily: "var(--font-primary)",
        }}
      >
        Asante! Your comment has been received and is awaiting moderation.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          required
          minLength={2}
          maxLength={80}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="flex-1 rounded-lg px-4 py-3 text-sm outline-none"
          style={{
            border: "1px solid #DDDDC8",
            fontFamily: "var(--font-primary)",
            color: "#003020",
          }}
        />
        <input
          required
          type="email"
          maxLength={254}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email (private, never published)"
          className="flex-1 rounded-lg px-4 py-3 text-sm outline-none"
          style={{
            border: "1px solid #DDDDC8",
            fontFamily: "var(--font-primary)",
            color: "#003020",
          }}
        />
      </div>
      <textarea
        required
        minLength={2}
        maxLength={2000}
        rows={4}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Share your thoughts…"
        className="rounded-lg px-4 py-3 text-sm outline-none resize-y"
        style={{
          border: "1px solid #DDDDC8",
          fontFamily: "var(--font-primary)",
          color: "#003020",
        }}
      />
      {status === "error" && (
        <p className="text-sm" style={{ color: "#C0392B", fontFamily: "var(--font-primary)" }}>
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="self-start rounded-lg px-6 py-3 text-sm font-semibold cursor-pointer disabled:opacity-60"
        style={{
          backgroundColor: "#20A160",
          color: "#F0F0E0",
          fontFamily: "var(--font-primary)",
        }}
      >
        {status === "submitting" ? "Posting…" : "Post comment"}
      </button>
    </form>
  );
}
