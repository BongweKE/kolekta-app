"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "For Creatives", href: "/creatives" },
  { label: "For Businesses", href: "/businesses" },
  { label: "For Accountants", href: "/accountants" },
  { label: "Knowledge Base", href: "/knowledge-base" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className="sticky top-0 z-[200] transition-all duration-300"
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
        {/* Terracotta accent line — top of navbar */}
        <div
          className="h-[2.5px] w-full transition-all duration-300"
          style={{ backgroundColor: "#C65F2E", opacity: scrolled ? 1 : 0 }}
        />

        <nav className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 no-underline group"
            onClick={() => setMenuOpen(false)}
          >
            {/* Wordmark */}
            <span
              className="text-[2.125rem] tracking-[-0.04em] leading-none"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                color: "#1A1207",
              }}
            >
              Kolekta
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="no-underline px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 hover:bg-[#EDE3CC]"
                  style={{
                    color: "#3D2E18",
                    fontFamily: "DM Sans, sans-serif",
                    letterSpacing: "0",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="no-underline text-sm font-semibold px-4 py-2 rounded transition-colors duration-150 hover:bg-[#EDE3CC]"
              style={{
                color: "#1A1207",
                fontFamily: "DM Sans, sans-serif",
                letterSpacing: "0.02em",
              }}
            >
              Sign in
            </Link>

            <Link
              href="/waitlist"
              className="no-underline btn btn-primary btn-sm"
            >
              Join Waitlist
            </Link>
          </div>

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

      {/* Mobile menu overlay */}
      <div
        className="fixed inset-0 z-[199] md:hidden transition-all duration-300"
        style={{
          backgroundColor: "rgba(26, 18, 7, 0.4)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
        }}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile menu drawer */}
      <div
        className="fixed top-0 right-0 h-full w-[280px] z-[210] md:hidden flex flex-col transition-transform duration-300 ease-in-out"
        style={{
          backgroundColor: "#FBF5E8",
          borderLeft: "1px solid #DDD0B8",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          paddingTop: "5rem",
        }}
      >
        {/* Mobile nav links */}
        <nav className="flex flex-col px-6 gap-1">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="no-underline py-3 text-base font-medium border-b transition-colors duration-150 hover:text-[#C65F2E]"
              style={{
                color: "#1A1207",
                borderColor: "#EDE3CC",
                fontFamily: "DM Sans, sans-serif",
                animationDelay: `${i * 50}ms`,
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile CTA buttons */}
        <div className="flex flex-col gap-3 px-6 mt-8">
          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="btn btn-outline btn-block no-underline"
          >
            Sign in
          </Link>
          <Link
            href="/waitlist"
            onClick={() => setMenuOpen(false)}
            className="btn btn-primary btn-block no-underline"
          >
            Join Waitlist
          </Link>
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
