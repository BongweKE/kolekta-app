import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Kolekta team. We welcome your feedback and are here to support Kenya's independent workers, creatives, and businesses.",
};

const WA_NUMBER = "254748244308";
const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
  "Hi Kolekta team!",
)}`;

export default function ContactPage() {
  return (
    <div className="relative">
      {/* Top accent line */}
      <div className="w-full h-[3px]" style={{ backgroundColor: "#20A160" }} />

      <div className="max-container padding-x">
        {/* Page header */}
        <div className="pt-10 pb-8 md:pt-14 md:pb-10">
          <span className="label-tag">Contact</span>
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
            We&apos;re here for you.
          </h1>
          <p
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "1rem",
              color: "#616150",
              lineHeight: 1.7,
              maxWidth: "500px",
            }}
          >
            We welcome your feedback and are ready to support our community
            24/7. Whether you have a question about your tax estimate, an idea
            for the platform, or just want to say hello — reach out any time.
          </p>
        </div>

        {/* Contact channels */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          style={{ paddingBottom: "7rem" }}
        >
          {/* WhatsApp */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-4 rounded-2xl p-7 no-underline transition-all duration-200 group-hover:shadow-lg"
            style={{
              backgroundColor: "#D4EDDF",
              border: "1px solid #20A160",
            }}
          >
            <div
              className="w-12 h-12 flex items-center justify-center rounded-xl"
              style={{
                backgroundColor: "#20A160",
                color: "#F0F0E0",
              }}
            >
              {/* WhatsApp icon */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.83 9.83 0 0 0 12.04 2Zm0 18.15a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
              </svg>
            </div>
            <div>
              <p
                className="font-semibold mb-1"
                style={{
                  fontFamily: "var(--font-primary)",
                  color: "#003020",
                  fontSize: "1.0625rem",
                }}
              >
                Chat on WhatsApp
              </p>
              <p
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "0.875rem",
                  color: "#616150",
                  lineHeight: 1.6,
                }}
              >
                Fastest way to reach us — typically replies within minutes.
                Available 24/7.
              </p>
              <p
                className="mt-3"
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: "#20A160",
                }}
              >
                +254 748 244 308 →
              </p>
            </div>
          </a>

          {/* Email */}
          <a
            href="mailto:support@kolekta.co"
            className="group flex flex-col gap-4 rounded-2xl p-7 no-underline transition-all duration-200 group-hover:shadow-lg"
            style={{
              backgroundColor: "#FDF3D6",
              border: "1px solid #E0A020",
            }}
          >
            <div
              className="w-12 h-12 flex items-center justify-center rounded-xl"
              style={{
                backgroundColor: "#E0A020",
                color: "#003020",
              }}
            >
              {/* Envelope icon */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <div>
              <p
                className="font-semibold mb-1"
                style={{
                  fontFamily: "var(--font-primary)",
                  color: "#003020",
                  fontSize: "1.0625rem",
                }}
              >
                Email us
              </p>
              <p
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "0.875rem",
                  color: "#616150",
                  lineHeight: 1.6,
                }}
              >
                For detailed questions, feedback, or partnership enquiries. We
                respond within 21 days, usually much sooner.
              </p>
              <p
                className="mt-3"
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: "#20A160",
                }}
              >
                support@kolekta.co →
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
