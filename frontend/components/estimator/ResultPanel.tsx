// components/estimator/LiveResultPanel.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  TaxResult,
  BandResult,
  formatKES,
  formatPercent,
} from "@/lib/tax-utils";

interface LiveResultPanelProps {
  result: TaxResult;
  hasResult: boolean;
  onEmailToggle: () => void;
  showEmailCapture: boolean;
}

export default function LiveResultPanel({
  result,
  hasResult,
  onEmailToggle,
  showEmailCapture,
}: LiveResultPanelProps) {
  const isRefund = hasResult && result.refundDue > 0;
  const isZero = hasResult && result.netTax === 0 && !isRefund;

  // Empty state
  if (!hasResult) {
    return (
      <div
        className="rounded-2xl p-8 flex flex-col items-center justify-center text-center"
        style={{
          backgroundColor: "#E8E8D0",
          border: "2px dashed #DDDDC8",
          minHeight: "320px",
        }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
          style={{ backgroundColor: "#DDDDC8" }}
        >
          <span style={{ fontSize: "1.75rem" }}>🧮</span>
        </div>
        <p
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "1rem",
            fontWeight: 600,
            color: "#616150",
            marginBottom: "6px",
          }}
        >
          Your estimate appears here
        </p>
        <p
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "0.875rem",
            color: "#8A8A72",
            lineHeight: 1.5,
            maxWidth: "200px",
          }}
        >
          Enter your annual income to see your tax instantly
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* ── Main result card ─────────────────────────────────── */}
      <div
        className="rounded-2xl p-6 relative overflow-hidden"
        style={{ backgroundColor: "#003020" }}
      >
        {/* Decorative circle */}
        <div
          className="absolute top-0 right-0 pointer-events-none"
          style={{
            width: 160,
            height: 160,
            borderRadius: "50%",
            backgroundColor: "#20A160",
            opacity: 0.08,
            transform: "translate(30%, -30%)",
          }}
        />

        <div className="relative z-10">
          {/* Label */}
          <p className="label-tag mb-2" style={{ color: "#8A8A72" }}>
            {isRefund
              ? "KRA refund due 🎉"
              : isZero
                ? "No tax owed 🎉"
                : "Estimated tax due"}
          </p>

          {/* Big number */}
          <p
            style={{
              fontFamily: "var(--font-code)",
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 700,
              color: isRefund ? "#E0A020" : isZero ? "#20A160" : "#E0A020",
              letterSpacing: "-0.03em",
              lineHeight: 1,
              marginBottom: "8px",
            }}
          >
            {isRefund ? formatKES(result.refundDue) : formatKES(result.netTax)}
          </p>

          {/* Contextual message */}
          {isRefund ? (
            <p
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "0.875rem",
                color: "#8A8A72",
                lineHeight: 1.6,
                marginBottom: "16px",
              }}
            >
              Your withholding tax exceeded your liability.{" "}
              <span style={{ color: "#F0F0E0" }}>
                File your returns to claim this back from KRA.
              </span>{" "}
              We&apos;ll help you do that when we launch.
            </p>
          ) : isZero ? (
            <p
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "0.875rem",
                color: "#8A8A72",
                lineHeight: 1.6,
                marginBottom: "16px",
              }}
            >
              Your income falls below the effective tax threshold after personal
              relief.{" "}
              <span style={{ color: "#F0F0E0" }}>
                You still need to file a nil return with KRA by 30 June.
              </span>
            </p>
          ) : (
            <p
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "0.9rem",
                color: "#8A8A72",
                marginBottom: "20px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-code)",
                  color: "#F0F0E0",
                  fontWeight: 600,
                }}
              >
                {formatKES(result.monthlyEquivalent)}
              </span>{" "}
              per month ·{" "}
              <span style={{ color: "#F0F0E0" }}>
                {formatPercent(result.effectiveRate)} effective rate
              </span>
            </p>
          )}

          {/* Stats grid */}
          <div
            className="grid grid-cols-2 gap-3 pt-4"
            style={{ borderTop: "1px solid rgba(240,240,224,0.08)" }}
          >
            {[
              { label: "Gross income", value: formatKES(result.grossIncome) },
              {
                label: "Taxable income",
                value: formatKES(result.taxableIncome),
              },
              {
                label: "Total deductions",
                value: formatKES(result.totalExpenses),
              },
              {
                label: "Personal relief",
                value: formatKES(result.personalRelief),
              },
              ...(result.withholdingTaxPaid > 0
                ? [{ label: "WHT credit", value: formatKES(result.whtCredit) }]
                : []),
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  className="label-tag mb-1"
                  style={{ color: "#616150", fontSize: "0.6875rem" }}
                >
                  {stat.label}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-code)",
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    color: "#F0F0E0",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Savings banner ───────────────────────────────────── */}
      {result.taxSavedByExpenses > 0 && (
        <div
          className="rounded-xl px-4 py-3 flex items-center gap-3"
          style={{ backgroundColor: "#D4EDDF", border: "1.5px solid #20A160" }}
        >
          <span style={{ fontSize: "1.25rem", flexShrink: 0 }}>🎉</span>
          <p
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "0.875rem",
              color: "#003020",
              lineHeight: 1.4,
            }}
          >
            Your deductions saved you{" "}
            <strong
              style={{ fontFamily: "var(--font-code)", color: "#20A160" }}
            >
              {formatKES(result.taxSavedByExpenses)}
            </strong>{" "}
            in tax
          </p>
        </div>
      )}

      {/* ── WHT refund banner ────────────────────────────────── */}
      {isRefund && (
        <div
          className="rounded-xl px-4 py-4 flex gap-3"
          style={{
            backgroundColor: "#FDF3D6",
            border: "1.5px solid #E0A020",
          }}
        >
          <span style={{ fontSize: "1.25rem", flexShrink: 0 }}>💰</span>
          <div>
            <p
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "0.9rem",
                fontWeight: 700,
                color: "#003020",
                marginBottom: "4px",
              }}
            >
              You may be owed{" "}
              <span
                style={{ fontFamily: "var(--font-code)", color: "#E0A020" }}
              >
                {formatKES(result.refundDue)}
              </span>{" "}
              back from KRA
            </p>
            <p
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "0.8125rem",
                color: "#616150",
                lineHeight: 1.5,
              }}
            >
              Your clients withheld more tax than you owe. File your annual
              return to claim this refund. Kolekta will help you do that when we
              launch — join the waitlist.
            </p>
            <a
              href="/waitlist"
              className="inline-block mt-2 text-sm font-semibold no-underline"
              style={{ color: "#20A160" }}
            >
              Join waitlist →
            </a>
          </div>
        </div>
      )}

      {/* ── TOT indicator ────────────────────────────────────── */}
      {result.totComparison.qualifies && result.totComparison.saving > 0 && (
        <div
          className="rounded-xl px-4 py-4 flex gap-3"
          style={{
            backgroundColor: "#E8E8D0",
            border: "1.5px solid #DDDDC8",
          }}
        >
          <span style={{ fontSize: "1.25rem", flexShrink: 0 }}>💡</span>
          <div>
            <p
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "0.9rem",
                fontWeight: 700,
                color: "#003020",
                marginBottom: "4px",
              }}
            >
              You may qualify for Turnover Tax
            </p>
            <p
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "0.8125rem",
                color: "#616150",
                lineHeight: 1.6,
              }}
            >
              TOT at 3% of gross revenue ={" "}
              <strong
                style={{
                  fontFamily: "var(--font-code)",
                  color: "#003020",
                }}
              >
                {formatKES(result.totComparison.totTax)}
              </strong>{" "}
              vs your current estimate of{" "}
              <strong
                style={{
                  fontFamily: "var(--font-code)",
                  color: "#003020",
                }}
              >
                {formatKES(result.totComparison.normalTax)}
              </strong>
              . Talk to an accountant — you could save{" "}
              <strong
                style={{
                  fontFamily: "var(--font-code)",
                  color: "#20A160",
                }}
              >
                {formatKES(result.totComparison.saving)}
              </strong>
              .
            </p>
          </div>
        </div>
      )}

      {/* ── Installment schedule ─────────────────────────────── */}
      {result.installments && (
        <InstallmentSchedulePanel installments={result.installments} />
      )}

      {/* ── Band breakdown ───────────────────────────────────── */}
      <BandBreakdownPanel
        bands={result.bandBreakdown}
        personalRelief={result.personalRelief}
        whtCredit={result.whtCredit}
        netTax={result.netTax}
      />

      {/* ── Email CTA ────────────────────────────────────────── */}
      <button
        onClick={onEmailToggle}
        className="w-full btn btn-primary"
        style={{ justifyContent: "center" }}
      >
        {showEmailCapture
          ? "Hide email form"
          : "📩 Get this breakdown by email"}
      </button>
    </div>
  );
}

// ── Installment schedule panel ─────────────────────────────────

import { InstallmentSchedule } from "@/lib/tax-utils";

function InstallmentSchedulePanel({
  installments,
}: {
  installments: InstallmentSchedule[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: "1.5px solid #C0392B" }}
    >
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-4 py-3"
        style={{
          backgroundColor: "#FADBD8",
          border: "none",
          cursor: "pointer",
        }}
      >
        <div className="flex items-center gap-2">
          <span style={{ fontSize: "0.875rem" }}>⚠️</span>
          <p className="label-tag" style={{ color: "#C0392B" }}>
            Installment tax required
          </p>
        </div>
        <span
          style={{
            color: "#C0392B",
            fontSize: "0.75rem",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
            display: "inline-block",
          }}
        >
          ▼
        </span>
      </button>

      {open && (
        <div style={{ backgroundColor: "#FEF5F5" }}>
          <p
            className="px-4 pt-3 pb-2 text-sm"
            style={{
              fontFamily: "var(--font-primary)",
              color: "#616150",
              lineHeight: 1.6,
            }}
          >
            Your tax liability exceeds KES 40,000. KRA requires you to pay in
            quarterly installments. Missing these attracts penalties.
          </p>
          {installments.map((inst, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-4 py-2.5 border-t"
              style={{ borderColor: "#FADBD8" }}
            >
              <div>
                <span
                  className="px-2 py-0.5 rounded text-xs font-bold mr-2"
                  style={{
                    fontFamily: "var(--font-code)",
                    backgroundColor: "#C0392B",
                    color: "#F0F0E0",
                  }}
                >
                  {inst.quarter}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "0.8125rem",
                    color: "#616150",
                  }}
                >
                  {inst.dueDate}
                </span>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-code)",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  color: "#C0392B",
                }}
              >
                {formatKES(inst.amount)}
              </span>
            </div>
          ))}
          <div className="px-4 pb-3 pt-2">
            <Link
              href="/blog/installment-tax"
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "0.8125rem",
                color: "#20A160",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              Learn about installment tax →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Band breakdown panel ───────────────────────────────────────

function BandBreakdownPanel({
  bands,
  personalRelief,
  whtCredit,
  netTax,
}: {
  bands: BandResult[];
  personalRelief: number;
  whtCredit: number;
  netTax: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: "1.5px solid #DDDDC8" }}
    >
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-4 py-3"
        style={{
          backgroundColor: "#E8E8D0",
          border: "none",
          cursor: "pointer",
        }}
      >
        <p className="label-tag" style={{ color: "#616150" }}>
          How this is calculated
        </p>
        <span
          style={{
            color: "#8A8A72",
            fontSize: "0.75rem",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
            display: "inline-block",
          }}
        >
          ▼
        </span>
      </button>

      {open && (
        <div>
          {/* Band rows */}
          {bands.map((band, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-4 py-2.5 border-t"
              style={{
                borderColor: "#DDDDC8",
                backgroundColor: i % 2 === 0 ? "#F0F0E0" : "#E8E8D0",
              }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="px-1.5 py-0.5 rounded text-xs font-bold"
                  style={{
                    fontFamily: "var(--font-code)",
                    backgroundColor: "#003020",
                    color: "#E0A020",
                  }}
                >
                  {(band.rate * 100).toFixed(0)}%
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "0.8rem",
                    color: "#616150",
                  }}
                >
                  {band.label}
                </span>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-code)",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#003020",
                }}
              >
                {formatKES(band.taxInBand)}
              </span>
            </div>
          ))}

          {/* Personal relief */}
          <div
            className="flex items-center justify-between px-4 py-2.5 border-t"
            style={{ borderColor: "#DDDDC8", backgroundColor: "#D4EDDF" }}
          >
            <span
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "0.8rem",
                color: "#003020",
              }}
            >
              ✅ Personal relief
            </span>
            <span
              style={{
                fontFamily: "var(--font-code)",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#20A160",
              }}
            >
              − {formatKES(personalRelief)}
            </span>
          </div>

          {/* WHT credit row — only if applicable */}
          {whtCredit > 0 && (
            <div
              className="flex items-center justify-between px-4 py-2.5 border-t"
              style={{ borderColor: "#DDDDC8", backgroundColor: "#D4EDDF" }}
            >
              <span
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "0.8rem",
                  color: "#003020",
                }}
              >
                ✅ WHT credit
              </span>
              <span
                style={{
                  fontFamily: "var(--font-code)",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#20A160",
                }}
              >
                − {formatKES(whtCredit)}
              </span>
            </div>
          )}

          {/* Net tax total */}
          <div
            className="flex items-center justify-between px-4 py-3 border-t"
            style={{ borderColor: "#DDDDC8", backgroundColor: "#003020" }}
          >
            <span
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "#F0F0E0",
              }}
            >
              Tax due
            </span>
            <span
              style={{
                fontFamily: "var(--font-code)",
                fontSize: "1rem",
                fontWeight: 700,
                color: "#E0A020",
              }}
            >
              {formatKES(netTax)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
