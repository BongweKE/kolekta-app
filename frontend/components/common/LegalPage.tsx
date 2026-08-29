import type { ReactNode } from "react";

type LegalPageProps = {
  accent?: string;
  label: string;
  title: string;
  meta: ReactNode;
  notice?: ReactNode;
  children: ReactNode;
};

export default function LegalPage({
  accent = "#20A160",
  label,
  title,
  meta,
  notice,
  children,
}: LegalPageProps) {
  return (
    <div className="relative">
      {/* Top accent line */}
      <div className="w-full h-[3px]" style={{ backgroundColor: accent }} />

      <div className="max-container padding-x">
        {/* Page header */}
        <div className="pt-10 pb-8 md:pt-14 md:pb-10">
          <span className="label-tag">{label}</span>
          <h1
            className="mt-3 mb-3"
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#003020",
              lineHeight: 1.1,
            }}
          >
            {title}
          </h1>
          <div
            className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm"
            style={{
              color: "#8A8A72",
              fontFamily: "var(--font-primary)",
            }}
          >
            {meta}
          </div>
        </div>

        {/* Pre-launch / read-first notice */}
        {notice && (
          <div
            className="rounded-xl p-5 mb-10"
            style={{
              backgroundColor: "#FDF3D6",
              border: "1.5px solid #E0A020",
            }}
          >
            <div className="legal-prose">{notice}</div>
          </div>
        )}

        {/* Body */}
        <div className="legal-prose" style={{ paddingBottom: "7rem" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
