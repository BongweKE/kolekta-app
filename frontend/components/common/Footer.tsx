import Link from "next/link";

const footerLinks = {
  Product: [
    { label: "For Creatives", href: "/creatives" },
    { label: "For Businesses", href: "/businesses" },
    { label: "For Accountants", href: "/accountants" },
    { label: "Tax Estimator", href: "/estimator" },
    { label: "Pricing", href: "/pricing" },
  ],
  "Knowledge Base": [
    { label: "PAYE Guide", href: "/knowledge-base/paye" },
    { label: "VAT Explained", href: "/knowledge-base/vat" },
    { label: "Filing Deadlines", href: "/knowledge-base/deadlines" },
    { label: "Tax for Freelancers", href: "/knowledge-base/freelancers" },
    { label: "KRA iTax Guide", href: "/knowledge-base/itax" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Waitlist", href: "/waitlist" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative z-10 mt-auto"
      style={{
        backgroundColor: "#F5EDD6",
        borderTop: "1px solid #DDD0B8",
      }}
    >
      {/* Top section */}
      <div className="max-w-[1200px] mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand column — takes 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 no-underline w-fit group"
            >
              <div
                className="w-8 h-8 flex items-center justify-center rounded-sm text-sm font-black transition-transform duration-200 group-hover:scale-105"
                style={{
                  backgroundColor: "#C65F2E",
                  color: "#FBF5E8",
                  fontFamily: "Inter, sans-serif",
                  letterSpacing: "-0.04em",
                }}
              >
                K
              </div>
              <span
                className="text-[1.125rem] tracking-[-0.04em] leading-none"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  color: "#1A1207",
                }}
              >
                kolekta
              </span>
            </Link>

            {/* Tagline */}
            <p
              className="text-sm leading-relaxed max-w-[240px]"
              style={{ color: "#7A6645", fontFamily: "DM Sans, sans-serif" }}
            >
              Tax compliance made simple for Kenya&apos;s independent workers,
              creatives, and businesses.
            </p>

            {/* Disclaimer */}
            <div
              className="text-xs leading-relaxed p-3 rounded-lg"
              style={{
                color: "#B8A48A",
                backgroundColor: "#EDE3CC",
                fontFamily: "DM Sans, sans-serif",
                maxWidth: "260px",
              }}
            >
              Kolekta provides estimates and general guidance. Always verify
              with a certified tax professional or KRA directly.
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="flex flex-col gap-4">
              <h6
                className="label-tag"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                {category}
              </h6>
              <ul className="flex flex-col gap-2 list-none m-0 p-0">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="no-underline text-sm transition-colors duration-150 hover:text-[#C65F2E]"
                      style={{
                        color: "#7A6645",
                        fontFamily: "DM Sans, sans-serif",
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div
        className="max-w-[1200px] mx-auto px-6"
        style={{ borderTop: "1px solid #DDD0B8" }}
      />

      {/* Bottom bar */}
      <div className="max-w-[1200px] mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p
          className="text-xs"
          style={{ color: "#B8A48A", fontFamily: "DM Sans, sans-serif" }}
        >
          © {year} Kolekta. All rights reserved.
        </p>

        <div className="flex items-center gap-1">
          <span
            className="text-xs"
            style={{ color: "#B8A48A", fontFamily: "DM Sans, sans-serif" }}
          >
            Built for Kenya 🇰🇪
          </span>
          <span className="mx-2 text-xs" style={{ color: "#DDD0B8" }}>
            ·
          </span>
          <span
            className="text-xs"
            style={{ color: "#B8A48A", fontFamily: "DM Sans, sans-serif" }}
          >
            Figures based on KRA {new Date().getFullYear()} rates
          </span>
        </div>
      </div>
    </footer>
  );
}
