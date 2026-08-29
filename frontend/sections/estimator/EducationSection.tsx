// sections/estimator/EducationSection.tsx
import Link from "next/link";

const articles = [
  {
    question: "What is PAYE and how does it apply to freelancers?",
    answer:
      "PAYE stands for Pay As You Earn. For employees it is deducted by their employer. As a freelancer or self-employed person you are responsible for calculating and remitting it yourself through KRA's iTax portal — typically as installment tax paid quarterly.",
    link: "/blog/paye-guide-2026",
  },
  {
    question: "What counts as an allowable business expense?",
    answer:
      "An allowable expense is any cost that was incurred wholly and exclusively for the purpose of earning your income. This includes equipment, software, transport to jobs, home office costs, and professional fees. Personal expenses do not qualify.",
    link: "/blog/allowable-expenses-creatives",
  },
  {
    question: "What is personal relief?",
    answer:
      "Personal relief is an automatic deduction of KES 28,800 per year (KES 2,400 per month) that KRA gives every taxpayer in Kenya. It is deducted from your gross tax before you pay — not from your income. You do not need to apply for it.",
    link: "/blog/paye-guide-2026",
  },
  {
    question: "When do I need to file my returns?",
    answer:
      "Individual income tax returns are due by 30 June each year for the previous year's income. If you had any income in 2025 your returns are due by 30 June 2026. Late filing attracts a penalty of KES 2,000 per month or 5% of the tax due — whichever is higher.",
    link: "/blog/kra-itax-guide",
  },
  {
    question: "What is the difference between gross income and taxable income?",
    answer:
      "Gross income is everything you earned before any deductions. Taxable income is what remains after you subtract your allowable business expenses. Tax is calculated on your taxable income — not your gross income — which is why claiming expenses correctly matters.",
    link: "/blog/paye-guide-2026",
  },
];

export default function EducationSection() {
  return (
    <section className="padding-y border-t" style={{ borderColor: "#DDDDC8" }}>
      <div className="max-w-[720px]">
        <span className="label-tag">Understanding Your Result</span>
        <h2
          className="mt-3 mb-8"
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            fontWeight: 800,
            color: "#003020",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
          }}
        >
          How Kenya&apos;s tax system works
        </h2>

        {/* FAQ accordion style */}
        <div className="space-y-4">
          {articles.map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-5"
              style={{
                backgroundColor: "#E8E8D0",
                border: "1px solid #DDDDC8",
              }}
            >
              <h3
                className="mb-3"
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "0.9375rem",
                  fontWeight: 700,
                  color: "#003020",
                  lineHeight: 1.4,
                }}
              >
                {item.question}
              </h3>
              <p
                className="mb-3"
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "0.875rem",
                  color: "#616150",
                  lineHeight: 1.7,
                }}
              >
                {item.answer}
              </p>
              <Link
                href={item.link}
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: "#20A160",
                  textDecoration: "none",
                }}
              >
                Read full guide →
              </Link>
            </div>
          ))}
        </div>

        {/* CTA to knowledge base */}
        <div
          className="mt-8 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{
            backgroundColor: "#003020",
            border: "none",
          }}
        >
          <div>
            <p
              className="font-bold mb-1"
              style={{
                fontFamily: "var(--font-primary)",
                color: "#F0F0E0",
                fontSize: "0.9375rem",
              }}
            >
              Want to understand more?
            </p>
            <p
              style={{
                fontFamily: "var(--font-primary)",
                color: "#8A8A72",
                fontSize: "0.8125rem",
              }}
            >
              Our knowledge base covers every aspect of Kenya&apos;s tax system in
              plain English.
            </p>
          </div>
          <Link
            href="/blog"
            className="btn btn-primary btn-sm no-underline whitespace-nowrap"
          >
            Browse Guides →
          </Link>
        </div>
      </div>
    </section>
  );
}
