// sections/estimator/EstimatorTool.tsx
"use client";

import { useState, useMemo } from "react";
import IncomeInput from "@/components/estimator/IncomeInput";
import ExpenseAssistant from "@/components/estimator/ExpenseAssistant";
import WHTInput from "@/components/estimator/WHTInput";
import LiveResultPanel from "@/components/estimator/ResultPanel";
import EmailCapture from "@/components/estimator/EmailCapture";
import { calculateTax, formatKES } from "@/lib/tax-utils";
import { ACTIVE_TAX_CONFIG } from "@/lib/tax-bands-config";

export default function EstimatorTool() {
  const [grossIncome, setGrossIncome] = useState(0);
  const [expenses, setExpenses] = useState<Record<string, number>>({});
  const [withholdingTax, setWithholdingTax] = useState(0);
  const [showEmailCapture, setShowEmailCapture] = useState(false);

  const totalExpenses = Object.values(expenses).reduce((s, v) => s + v, 0);
  const hasIncome = grossIncome > 0;

  const result = useMemo(
    () => calculateTax(grossIncome, totalExpenses, withholdingTax),
    [grossIncome, totalExpenses, withholdingTax],
  );

  const handleExpenseChange = (id: string, value: number) => {
    setExpenses((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-8 xl:gap-16">
        {/* ── LEFT — Input panel ───────────────────────────────── */}
        <div className="w-full lg:w-[55%] flex flex-col gap-8">
          {/* Mobile live result */}
          {hasIncome && (
            <div className="lg:hidden">
              <MobileLiveResult result={result} />
            </div>
          )}

          {/* Section 1 — Income */}
          <InputSection number={1}>
            <IncomeInput value={grossIncome} onChange={setGrossIncome} />
          </InputSection>

          {/* Divider */}
          <div style={{ borderTop: "1px solid #DDDDC8" }} />

          {/* Section 2 — Expenses */}
          <InputSection number={2}>
            <ExpenseAssistant
              expenses={expenses}
              grossIncome={grossIncome}
              onExpenseChange={handleExpenseChange}
              disabled={!hasIncome}
            />
          </InputSection>

          {/* Divider */}
          <div style={{ borderTop: "1px solid #DDDDC8" }} />

          {/* Section 3 — WHT */}
          <InputSection number={3}>
            <WHTInput
              value={withholdingTax}
              grossIncome={grossIncome}
              onChange={setWithholdingTax}
              disabled={!hasIncome}
            />
          </InputSection>

          {/* Mobile email capture */}
          {hasIncome && (
            <div className="lg:hidden">
              <EmailCapture
                result={result}
                open={showEmailCapture}
                onToggle={() => setShowEmailCapture((p) => !p)}
              />
              {!showEmailCapture && (
                <button
                  onClick={() => setShowEmailCapture(true)}
                  className="btn btn-primary w-full mt-4"
                  style={{ justifyContent: "center" }}
                >
                  📩 Get this breakdown by email
                </button>
              )}
            </div>
          )}

          {/* Rate notice */}
          <p
            className="text-xs pb-2"
            style={{
              fontFamily: "var(--font-primary)",
              color: "#8A8A72",
              lineHeight: 1.6,
            }}
          >
            Based on KRA rates effective {ACTIVE_TAX_CONFIG.effectiveFrom}.
            Figures are estimates only —{" "}
            <a href="/disclaimer" style={{ color: "#20A160" }}>
              see disclaimer
            </a>
            .
          </p>
        </div>

        {/* ── RIGHT — Sticky live result (desktop) ─────────────── */}
        <div className="hidden lg:block w-[45%]">
          <div className="sticky top-24 flex flex-col gap-4">
            <LiveResultPanel
              result={result}
              hasResult={hasIncome}
              onEmailToggle={() => setShowEmailCapture((p) => !p)}
              showEmailCapture={showEmailCapture}
            />
            {showEmailCapture && hasIncome && (
              <EmailCapture
                result={result}
                open={showEmailCapture}
                onToggle={() => setShowEmailCapture((p) => !p)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Input section wrapper ──────────────────────────────────────

function InputSection({
  number,
  children,
}: {
  number: number;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      {/* Step number */}
      <div className="flex flex-col items-center flex-shrink-0 pt-1">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
          style={{
            backgroundColor: "#003020",
            color: "#F0F0E0",
            fontFamily: "var(--font-primary)",
          }}
        >
          {number}
        </div>
        <div
          className="flex-1 w-px mt-2"
          style={{ backgroundColor: "#DDDDC8", minHeight: "24px" }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 pb-2">{children}</div>
    </div>
  );
}

// ── Mobile condensed result ────────────────────────────────────

import { TaxResult } from "@/lib/tax-utils";

function MobileLiveResult({ result }: { result: TaxResult }) {
  const isRefund = result.refundDue > 0;
  const isZero = result.netTax === 0 && !isRefund;

  return (
    <div className="rounded-2xl p-4" style={{ backgroundColor: "#003020" }}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="label-tag mb-1" style={{ color: "#8A8A72" }}>
            {isRefund
              ? "Refund due 🎉"
              : isZero
                ? "No tax owed 🎉"
                : "Estimated tax"}
          </p>
          <p
            style={{
              fontFamily: "var(--font-code)",
              fontSize: "1.75rem",
              fontWeight: 700,
              color: isRefund ? "#E0A020" : isZero ? "#20A160" : "#E0A020",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {isRefund ? formatKES(result.refundDue) : formatKES(result.netTax)}
          </p>
        </div>
        {!isZero && !isRefund && (
          <div className="text-right">
            <p className="label-tag mb-1" style={{ color: "#8A8A72" }}>
              Per month
            </p>
            <p
              style={{
                fontFamily: "var(--font-code)",
                fontSize: "1.125rem",
                fontWeight: 600,
                color: "#F0F0E0",
                letterSpacing: "-0.02em",
              }}
            >
              {formatKES(result.monthlyEquivalent)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
