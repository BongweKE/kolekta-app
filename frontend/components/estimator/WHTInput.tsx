// components/estimator/WHTInput.tsx
"use client";

import { useState } from "react";
import { parseAmount, formatKES, WHT_LIMITS } from "@/lib/tax-utils";

interface WHTInputProps {
  value: number;
  grossIncome: number;
  onChange: (value: number) => void;
  disabled: boolean;
}

const WHT_RATE_EXAMPLES = [
  {
    label: "Photography / Design / Writing",
    rate: "5%",
    description: "Professional & consultancy fees",
  },
  {
    label: "YouTube / Upwork / Fiverr",
    rate: "5%",
    description: "Digital platform income",
  },
  {
    label: "Royalties",
    rate: "5%",
    description: "Publishers, streaming platforms",
  },
  {
    label: "Rental income",
    rate: "10%",
    description: "Paid by registered tenants",
  },
];

export default function WHTInput({
  value,
  grossIncome,
  onChange,
  disabled,
}: WHTInputProps) {
  const [raw, setRaw] = useState(value > 0 ? value.toString() : "");
  const [focused, setFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-suggest 5% of income
  const suggested5Pct = Math.round(grossIncome * 0.05);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/[^0-9]/g, "");
    setRaw(input);
    setError(null);
    const parsed = parseAmount(input);
    if (parsed > WHT_LIMITS.max) {
      setError("Amount seems too high — please double check");
      return;
    }
    if (parsed > grossIncome) {
      setError("WHT cannot exceed your gross income");
      return;
    }
    onChange(parsed);
  };

  const displayValue = focused
    ? raw
    : value > 0
      ? value.toLocaleString("en-KE")
      : "";

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <p
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "1.0625rem",
              fontWeight: 700,
              color: disabled ? "#8A8A72" : "#003020",
              transition: "color 0.2s ease",
            }}
          >
            Withholding tax already paid
          </p>
          <p
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "0.875rem",
              color: "#8A8A72",
              marginTop: "2px",
            }}
          >
            {disabled
              ? "Enter your income above to unlock"
              : "From client certificates or platform statements"}
          </p>
        </div>

        {/* WHT badge */}
        {value > 0 && (
          <div
            className="px-3 py-1.5 rounded-full flex-shrink-0"
            style={{
              backgroundColor: "#D4EDDF",
              border: "1px solid #20A160",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-code)",
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "#003020",
                whiteSpace: "nowrap",
              }}
            >
              − {formatKES(value)}
            </p>
          </div>
        )}
      </div>

      <div
        style={{
          opacity: disabled ? 0.5 : 1,
          pointerEvents: disabled ? "none" : "auto",
          transition: "opacity 0.2s ease",
        }}
      >
        {/* Input */}
        <div
          className="flex items-center rounded-xl overflow-hidden mb-3"
          style={{
            border: error
              ? "2px solid #C0392B"
              : focused
                ? "2px solid #20A160"
                : "2px solid #DDDDC8",
            backgroundColor: "#E8E8D0",
            transition: "border-color 0.15s ease",
          }}
        >
          <div
            className="px-4 py-3.5 flex-shrink-0 select-none"
            style={{
              fontFamily: "var(--font-code)",
              fontSize: "0.9375rem",
              fontWeight: 700,
              color: focused || value > 0 ? "#003020" : "#8A8A72",
              borderRight: "1.5px solid #DDDDC8",
            }}
          >
            KES
          </div>
          <input
            type="text"
            inputMode="numeric"
            value={displayValue}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="0"
            autoComplete="off"
            className="flex-1 text-right bg-transparent outline-none"
            style={{
              fontFamily: "var(--font-code)",
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "#003020",
              padding: "12px 16px",
              letterSpacing: "-0.02em",
              border: "none",
            }}
            aria-label="Total withholding tax paid"
          />
        </div>

        {/* Error */}
        {error && (
          <p
            className="mb-3 text-sm"
            role="alert"
            style={{ fontFamily: "var(--font-primary)", color: "#C0392B" }}
          >
            {error}
          </p>
        )}

        {/* Auto-suggest */}
        {grossIncome > 0 && suggested5Pct > 0 && value === 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            <p
              className="w-full text-xs"
              style={{
                fontFamily: "var(--font-primary)",
                color: "#8A8A72",
              }}
            >
              Quick fill — if all your income had 5% withheld:
            </p>
            <button
              onClick={() => {
                setRaw(suggested5Pct.toString());
                onChange(suggested5Pct);
              }}
              className="px-3 py-1.5 rounded-full text-xs font-medium"
              style={{
                fontFamily: "var(--font-primary)",
                backgroundColor: "#DDDDC8",
                color: "#616150",
                border: "none",
                cursor: "pointer",
              }}
            >
              {formatKES(suggested5Pct)} (5% of income)
            </button>
          </div>
        )}

        {/* What counts toggle */}
        <button
          onClick={() => setOpen((p) => !p)}
          className="flex items-center gap-2 text-sm font-medium mb-3"
          style={{
            fontFamily: "var(--font-primary)",
            color: "#20A160",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <span
            style={{
              display: "inline-block",
              transform: open ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
            }}
          >
            ▶
          </span>
          What is withholding tax and how do I find mine?
        </button>

        {/* Expanded explainer */}
        {open && (
          <div
            className="rounded-xl p-4 mb-3"
            style={{
              backgroundColor: "#E8E8D0",
              border: "1.5px solid #DDDDC8",
            }}
          >
            <p
              className="mb-4"
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "0.875rem",
                color: "#616150",
                lineHeight: 1.7,
              }}
            >
              When you work for a company or government, they deduct tax before
              paying you and send it to KRA on your behalf. This is called
              withholding tax (WHT). You can claim it back against your final
              tax bill — or get a refund if too much was taken.
            </p>

            {/* Rate table */}
            <p className="label-tag mb-3">Common WHT rates for creatives</p>
            <div className="space-y-2 mb-4">
              {WHT_RATE_EXAMPLES.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b"
                  style={{ borderColor: "#DDDDC8" }}
                >
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-primary)",
                        fontSize: "0.8125rem",
                        fontWeight: 600,
                        color: "#003020",
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-primary)",
                        fontSize: "0.75rem",
                        color: "#8A8A72",
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                  <span
                    className="px-2 py-1 rounded font-bold text-sm flex-shrink-0"
                    style={{
                      fontFamily: "var(--font-code)",
                      backgroundColor: "#003020",
                      color: "#E0A020",
                    }}
                  >
                    {item.rate}
                  </span>
                </div>
              ))}
            </div>

            {/* How to find it */}
            <p className="label-tag mb-3">How to find your WHT total</p>
            <div className="space-y-2">
              {[
                "Check your WHT certificates from each client — they are legally required to give you one",
                "Log into KRA iTax → select 'Withholding Tax' → view certificates submitted on your behalf",
                "Check your Upwork / Fiverr annual tax summary",
                "Ask your clients directly — they should have records",
              ].map((item, i) => (
                <div key={i} className="flex gap-2">
                  <span
                    style={{
                      fontFamily: "var(--font-code)",
                      fontSize: "0.75rem",
                      color: "#20A160",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    {i + 1}.
                  </span>
                  <p
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: "0.8125rem",
                      color: "#616150",
                      lineHeight: 1.5,
                    }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Zero WHT shortcut */}
        {value === 0 && !open && (
          <button
            onClick={() => onChange(0)}
            className="text-xs"
            style={{
              fontFamily: "var(--font-primary)",
              color: "#8A8A72",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            None withheld — skip this
          </button>
        )}
      </div>
    </div>
  );
}
