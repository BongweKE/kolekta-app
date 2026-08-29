// lib/tax-utils.ts
// Pure functions — no side effects, fully testable

import { ACTIVE_TAX_CONFIG, TaxConfig } from "./tax-bands-config";

export interface BandResult {
  label: string;
  rate: number;
  taxableInBand: number;
  taxInBand: number;
}

export interface InstallmentSchedule {
  quarter: string;
  dueDate: string;
  amount: number;
}

export interface TotComparison {
  qualifies: boolean;
  totTax: number;
  normalTax: number;
  saving: number;
  message: string;
}

export interface TaxResult {
  // Inputs
  grossIncome: number;
  totalExpenses: number;
  withholdingTaxPaid: number;

  // Calculated
  taxableIncome: number;
  grossTax: number;
  personalRelief: number;
  taxAfterRelief: number;

  // WHT
  whtCredit: number;
  netTax: number; // final amount due to KRA
  refundDue: number; // > 0 means KRA owes the user

  // Rates & equivalents
  effectiveRate: number;
  monthlyEquivalent: number;

  // Savings
  taxSavedByExpenses: number;

  // Breakdown
  bandBreakdown: BandResult[];

  // Additional insights
  installments: InstallmentSchedule[] | null; // null if below threshold
  totComparison: TotComparison; // TOT vs normal tax
}

// ── Main calculation ───────────────────────────────────────────

export function calculateTax(
  grossIncome: number,
  totalExpenses: number,
  withholdingTaxPaid: number = 0,
): TaxResult {
  const config = ACTIVE_TAX_CONFIG;

  // Core income calculation
  const taxableIncome = Math.max(0, grossIncome - totalExpenses);
  const bandBreakdown = applyBands(taxableIncome, config);
  const grossTax = bandBreakdown.reduce((sum, b) => sum + b.taxInBand, 0);
  const personalRelief = Math.min(grossTax, config.personalRelief);
  const taxAfterRelief = Math.max(0, grossTax - personalRelief);

  // WHT credit — cannot exceed tax after relief
  const whtCredit = Math.min(withholdingTaxPaid, taxAfterRelief);
  const netTax = Math.max(0, taxAfterRelief - whtCredit);

  // Refund — when WHT paid exceeds what was owed
  const refundDue = Math.max(0, withholdingTaxPaid - taxAfterRelief);

  // Effective rate over gross income
  const effectiveRate = grossIncome > 0 ? (netTax / grossIncome) * 100 : 0;

  // Tax saved by claiming expenses
  const netTaxWithNoExpenses = getNetTax(grossIncome, config);
  const netTaxWithExpenses = getNetTax(taxableIncome, config);
  const taxSavedByExpenses = Math.max(
    0,
    netTaxWithNoExpenses - netTaxWithExpenses,
  );

  // Installment schedule
  const installments =
    netTax >= config.installmentTaxThreshold
      ? buildInstallmentSchedule(netTax)
      : null;

  // TOT comparison
  const totComparison = buildTotComparison(grossIncome, netTax, config);

  return {
    grossIncome,
    totalExpenses,
    withholdingTaxPaid,
    taxableIncome,
    grossTax,
    personalRelief,
    taxAfterRelief,
    whtCredit,
    netTax,
    refundDue,
    effectiveRate,
    monthlyEquivalent: netTax / 12,
    taxSavedByExpenses,
    bandBreakdown,
    installments,
    totComparison,
  };
}

// ── Band application — half-open intervals ─────────────────────

function applyBands(taxableIncome: number, config: TaxConfig): BandResult[] {
  const results: BandResult[] = [];

  for (const band of config.bands) {
    const lower = band.min;
    const upper = band.max ?? Number.POSITIVE_INFINITY;
    const inBand = Math.max(0, Math.min(taxableIncome, upper) - lower);
    if (inBand <= 0) continue;
    results.push({
      label: band.label,
      rate: band.rate,
      taxableInBand: inBand,
      taxInBand: inBand * band.rate,
    });
  }

  return results;
}

// ── Net tax helper ─────────────────────────────────────────────

function getNetTax(income: number, config: TaxConfig): number {
  const gross = applyBands(Math.max(0, income), config).reduce(
    (sum, b) => sum + b.taxInBand,
    0,
  );
  return Math.max(0, gross - config.personalRelief);
}

// ── Installment schedule ───────────────────────────────────────

function buildInstallmentSchedule(annualTax: number): InstallmentSchedule[] {
  const quarterly = annualTax / 4;
  return [
    { quarter: "Q1", dueDate: "20 April 2026", amount: quarterly },
    { quarter: "Q2", dueDate: "20 June 2026", amount: quarterly },
    { quarter: "Q3", dueDate: "20 September 2026", amount: quarterly },
    { quarter: "Q4", dueDate: "20 December 2026", amount: quarterly },
  ];
}

// ── TOT comparison ─────────────────────────────────────────────

function buildTotComparison(
  grossIncome: number,
  normalNetTax: number,
  config: TaxConfig,
): TotComparison {
  const { totMinThreshold, totMaxThreshold, totRate } = config;
  const qualifies =
    grossIncome >= totMinThreshold && grossIncome <= totMaxThreshold;

  const totTax = qualifies ? grossIncome * totRate : 0;
  const saving = qualifies ? Math.max(0, normalNetTax - totTax) : 0;

  let message = "";
  if (qualifies && saving > 0) {
    message = `At your income level, Turnover Tax (TOT) at 3% = ${formatKES(totTax)} vs your current estimate of ${formatKES(normalNetTax)}. Talk to an accountant — you could save ${formatKES(saving)}.`;
  } else if (qualifies && saving <= 0) {
    message = `You qualify for TOT but normal income tax works out lower in your case.`;
  }

  return { qualifies, totTax, normalTax: normalNetTax, saving, message };
}

// ── Per-category savings nudge ─────────────────────────────────

export function getTaxSavingForExpense(
  expenseAmount: number,
  grossIncome: number,
): number {
  if (expenseAmount <= 0 || grossIncome <= 0) return 0;
  const config = ACTIVE_TAX_CONFIG;
  const taxBefore = getNetTax(grossIncome, config);
  const taxAfter = getNetTax(grossIncome - expenseAmount, config);
  return Math.max(0, taxBefore - taxAfter);
}

// ── WHT auto-calculation helper ────────────────────────────────
// Given income sources and their WHT rates, calculates total WHT

export interface IncomeSource {
  id: string;
  amount: number;
  whtRate: number;
}

export function calculateTotalWHT(sources: IncomeSource[]): number {
  return sources.reduce((sum, s) => sum + s.amount * s.whtRate, 0);
}

// ── Formatting helpers ─────────────────────────────────────────

export function formatKES(amount: number): string {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

export function formatPercent(rate: number): string {
  return `${rate.toFixed(1)}%`;
}

// ── Input validation ───────────────────────────────────────────

export const INCOME_LIMITS = { min: 1, max: 500_000_000 };
export const EXPENSE_LIMITS = { min: 0, max: 50_000_000 };
export const WHT_LIMITS = { min: 0, max: 50_000_000 };

export function parseAmount(raw: string): number {
  const cleaned = raw.replace(/[,\s]/g, "");
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : Math.max(0, parsed);
}
