// components/estimator/EmailCapture.tsx
"use client";

import { useState } from "react";
import { TaxResult, formatKES } from "@/lib/tax-utils";

interface EmailCaptureProps {
  result: TaxResult;
  open: boolean;
  onToggle: () => void;
}

type SubmitState = "idle" | "loading" | "success" | "error";

export default function EmailCapture({
  result,
  open,
  onToggle,
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");

  if (!open) return null;

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = async () => {
    if (honeypot) {
      setSubmitState("success");
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }
    if (!consent) {
      setErrorMessage("Please confirm you agree to receive this email");
      return;
    }

    setSubmitState("loading");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/estimator/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          grossIncome: result.grossIncome,
          totalExpenses: result.totalExpenses,
          taxableIncome: result.taxableIncome,
          netTax: result.netTax,
          monthlyEquivalent: result.monthlyEquivalent,
          effectiveRate: result.effectiveRate,
          taxSavedByExpenses: result.taxSavedByExpenses,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Something went wrong");
      }
      setSubmitState("success");
    } catch (err: unknown) {
      setSubmitState("error");
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setErrorMessage(
        message.includes("Too many")
          ? "You have already requested this recently. Please try again later."
          : "We could not send your email. Please try again.",
      );
    }
  };

  if (submitState === "success") {
    return (
      <div
        className="rounded-2xl p-6 text-center"
        style={{ backgroundColor: "#D4EDDF", border: "1.5px solid #20A160" }}
      >
        <span style={{ fontSize: "2rem" }}>📬</span>
        <p
          className="mt-3 font-bold"
          style={{
            fontFamily: "var(--font-primary)",
            color: "#003020",
            fontSize: "1rem",
          }}
        >
          On its way!
        </p>
        <p
          className="mt-1"
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "0.875rem",
            color: "#616150",
            lineHeight: 1.6,
          }}
        >
          Your breakdown is heading to{" "}
          <strong style={{ color: "#003020" }}>{email}</strong>. Check your
          inbox — and spam just in case.
        </p>
        <p
          className="mt-3"
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "0.75rem",
            color: "#8A8A72",
          }}
        >
          Your figures were not stored anywhere.
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl p-5"
      style={{ backgroundColor: "#E8E8D0", border: "1.5px solid #DDDDC8" }}
    >
      <div className="flex items-center justify-between mb-4">
        <p
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "0.9375rem",
            fontWeight: 700,
            color: "#003020",
          }}
        >
          Get this breakdown by email
        </p>
        <button
          onClick={onToggle}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#8A8A72",
            fontSize: "1rem",
            lineHeight: 1,
          }}
          aria-label="Close email form"
        >
          ✕
        </button>
      </div>

      <p
        className="mb-4"
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "0.875rem",
          color: "#616150",
          lineHeight: 1.5,
        }}
      >
        We&apos;ll send a personalised summary of your{" "}
        <strong style={{ fontFamily: "var(--font-code)", color: "#003020" }}>
          {formatKES(result.netTax)}
        </strong>{" "}
        estimate with next steps. One email. No spam.
      </p>

      {/* Honeypot */}
      <div
        style={{ position: "absolute", left: "-9999px", opacity: 0 }}
        aria-hidden="true"
      >
        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Email input */}
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setErrorMessage(null);
        }}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="your@email.com"
        className="w-full rounded-lg px-4 py-3 mb-3"
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "0.9375rem",
          color: "#003020",
          backgroundColor: "#F0F0E0",
          border: errorMessage ? "1.5px solid #C0392B" : "1.5px solid #DDDDC8",
          outline: "none",
        }}
        aria-label="Email address"
      />

      {/* Consent */}
      <label
        className="flex items-start gap-3 mb-4 cursor-pointer"
        style={{ userSelect: "none" }}
      >
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => {
            setConsent(e.target.checked);
            setErrorMessage(null);
          }}
          style={{
            width: "16px",
            height: "16px",
            accentColor: "#20A160",
            cursor: "pointer",
            marginTop: "2px",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "0.8125rem",
            color: "#616150",
            lineHeight: 1.5,
          }}
        >
          I agree to receive this one-time email from Kolekta. I have read the{" "}
          <a
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#20A160" }}
          >
            Privacy Policy
          </a>
          .
        </span>
      </label>

      {/* Error */}
      {errorMessage && (
        <p
          className="mb-3 text-sm"
          role="alert"
          style={{ fontFamily: "var(--font-primary)", color: "#C0392B" }}
        >
          {errorMessage}
        </p>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={submitState === "loading"}
        className="btn btn-primary w-full"
        style={{
          opacity: submitState === "loading" ? 0.7 : 1,
          justifyContent: "center",
        }}
      >
        {submitState === "loading" ? "Sending..." : "Send Me This →"}
      </button>

      <p
        className="mt-3 text-xs text-center"
        style={{ fontFamily: "var(--font-primary)", color: "#8A8A72" }}
      >
        Your figures are not stored. Unsubscribe anytime.
      </p>
    </div>
  );
}
