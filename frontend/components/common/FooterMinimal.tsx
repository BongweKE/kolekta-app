import Link from "next/link";

const footerLinks = [
  { label: "Tax Estimator", href: "/estimator" },
  { label: "Blog", href: "/blog" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Contact", href: "/contact" },
];

export default function FooterMinimal() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="fixed bottom-0 left-0 right-0 z-[150] w-full"
      style={{
        backgroundColor: "transparent",
        // borderTop: "1px solid #DDD0B8",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left — copyright */}
        <p
          className="text-xs"
          style={{
            color: "#B8A48A",
            fontFamily: "DM Sans, sans-serif",
          }}
        >
          © {year} Kolekta. All rights reserved.
        </p>

        {/* Center — links */}
        <ul className="flex items-center flex-wrap justify-center gap-x-5 gap-y-2 list-none m-0 p-0">
          {footerLinks.map((link, i) => (
            <li key={link.href} className="flex items-center gap-5">
              <Link
                href={link.href}
                className="no-underline text-xs transition-colors duration-150 hover:text-[#C65F2E]"
                style={{
                  color: "#7A6645",
                  fontFamily: "DM Sans, sans-serif",
                }}
              >
                {link.label}
              </Link>

              {/* Dot separator — not after last item */}
              {i < footerLinks.length - 1 && (
                <span
                  className="text-xs select-none"
                  style={{ color: "#DDD0B8" }}
                  aria-hidden="true"
                >
                  ·
                </span>
              )}
            </li>
          ))}
        </ul>

        {/* Right — built for Kenya */}
        <p
          className="text-xs"
          style={{
            color: "#B8A48A",
            fontFamily: "DM Sans, sans-serif",
          }}
        >
          Built for Kenya
        </p>
      </div>
    </footer>
  );
}
