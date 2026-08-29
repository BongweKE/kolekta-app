"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Tax Estimator", href: "/estimator" },
  { label: "Blog", href: "/blog" },
];

export default function NavbarMinimal() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed top-0 z-[200] transition-all duration-500"
        style={{
          backgroundColor: scrolled
            ? "rgba(251, 245, 232, 0.92)"
            : "rgba(251, 245, 232, 0)",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled
            ? "1px solid #DDD0B8"
            : "1px solid transparent",
        }}
      >
        {/* Terracotta accent line — only visible on scroll */}
        <div
          className="h-[2.5px] w-full transition-all duration-500"
          style={{
            backgroundColor: "#C65F2E",
            opacity: scrolled ? 1 : 0,
          }}
        />

        <nav className="w-screen mx-auto padding-x h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 no-underline group"
            onClick={() => setMenuOpen(false)}
          >
            <span
              className="text-[2.125rem] tracking-[-0.04em] leading-none"
              style={{
                fontFamily: "var(--font-brand)",
                fontWeight: 700,
                color: "#003020",
              }}
            >
              Kolekta
            </span>
          </Link>

          {/* Desktop — center links */}
          <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="no-underline px-4 py-2 rounded-md text-base font-medium transition-all duration-150 hover:bg-[#EDE3CC]"
                  style={{
                    color: "#003020",
                    fontFamily: "DM Sans, sans-serif",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop — support email far right */}
          <a
            href="mailto:support@kolekta.co"
            className="hidden md:flex items-center gap-2 no-underline text-base transition-colors duration-150 hover:text-[#C65F2E]"
            style={{
              color: "#003020",
              fontFamily: "DM Sans, sans-serif",
            }}
          >
            {/* Envelope icon */}
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            support@kolekta.co
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 rounded-md transition-colors hover:bg-[#EDE3CC]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className="block w-5 h-[1.5px] transition-all duration-300 origin-center"
              style={{
                backgroundColor: "#1A1207",
                transform: menuOpen
                  ? "rotate(45deg) translate(4.5px, 4.5px)"
                  : "",
              }}
            />
            <span
              className="block w-5 h-[1.5px] transition-all duration-200"
              style={{
                backgroundColor: "#1A1207",
                opacity: menuOpen ? 0 : 1,
                transform: menuOpen ? "scaleX(0)" : "",
              }}
            />
            <span
              className="block w-5 h-[1.5px] transition-all duration-300 origin-center"
              style={{
                backgroundColor: "#1A1207",
                transform: menuOpen
                  ? "rotate(-45deg) translate(4.5px, -4.5px)"
                  : "",
              }}
            />
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        className="fixed inset-0 z-[199] md:hidden transition-all duration-300"
        style={{
          backgroundColor: "rgba(26, 18, 7, 0.4)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
        }}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile drawer */}
      <div
        className="fixed top-0 right-0 h-full w-[260px] z-[210] md:hidden flex flex-col transition-transform duration-300 ease-in-out"
        style={{
          backgroundColor: "#FBF5E8",
          borderLeft: "1px solid #DDD0B8",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          paddingTop: "5rem",
        }}
      >
        {/* Mobile nav links */}
        <nav className="flex flex-col px-6 gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="no-underline py-3 text-base font-medium border-b transition-colors duration-150 hover:text-[#C65F2E]"
              style={{
                color: "#1A1207",
                borderColor: "#EDE3CC",
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile support email */}
        <div className="px-6 mt-8">
          <p className="label-tag mb-2">Support</p>
          <a
            href="mailto:support@kolekta.co"
            className="no-underline text-sm transition-colors duration-150 hover:text-[#C65F2E]"
            style={{
              color: "#7A6645",
              fontFamily: "DM Sans, sans-serif",
            }}
            onClick={() => setMenuOpen(false)}
          >
            support@kolekta.co
          </a>
        </div>

        {/* Bottom tagline */}
        <div className="mt-auto px-6 pb-8">
          <p
            className="text-xs leading-relaxed"
            style={{ color: "#B8A48A", fontFamily: "DM Sans, sans-serif" }}
          >
            Tax compliance made simple
            <br />
            for Kenya&apos;s independent workers.
          </p>
        </div>
      </div>
    </>
  );
}
