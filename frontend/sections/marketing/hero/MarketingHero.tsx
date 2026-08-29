"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import TextRotator from "@/components/common/TextRotator";

// Add your carousel images here
const carouselImages = [
  { src: "/images/camera-man-2.jpg", alt: "A Kenyan creative at work" },
  { src: "/images/camera-man-1.jpg", alt: "A Kenyan creative at work" },
  { src: "/images/accontant.jpg", alt: "A Kenyan creative at work" },
  { src: "/images/singer.jpg", alt: "A Kenyan creative at work" },
];

export default function MarketingHero() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % carouselImages.length);
        setFading(false);
      }, 400);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => {
    if (index === current) return;
    setFading(true);
    setTimeout(() => {
      setCurrent(index);
      setFading(false);
    }, 400);
  };

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 md:gap-10 min-h-[calc(100vh-160px)] md:min-h-0">
      {/* ── Text content ─────────────────────────── */}
      <div className="relative z-10 flex flex-col gap-6 w-full md:w-1/2 text-left items-start justify-center">
        <TextRotator />

        <h3
          className="text-xl md:text-2xl"
          style={{ color: "var(--color-kolekta-green)" }}
        >
          Tax ndio inakushinda?
        </h3>

        <h3 className="text-xl md:text-2xl">
          Until <span className="italic">Now</span>
        </h3>

        <h4
          className="text-lg md:text-xl font-semibold max-w-[380px]"
          style={{ color: "var(--color-kolekta-charcoal)" }}
        >
          We&apos;re building something cool...stay tuned!
        </h4>
      </div>

      {/* ── Mobile scrollable image strip ────────── */}
      <div
        className="md:hidden w-full -mx-5 px-5 flex gap-3 overflow-x-auto overscroll-x-contain snap-x snap-mandatory scroll-px-5"
        role="list"
        aria-label="Kenyan creatives at work"
        style={{ paddingBottom: "0.25rem" }}
      >
        {carouselImages.map((img) => (
          <div
            key={img.src}
            role="listitem"
            className="snap-center shrink-0 relative overflow-hidden rounded-xl"
            style={{ width: "16rem", height: "12rem" }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="256px"
            />
          </div>
        ))}
      </div>

      {/* ── Carousel ─────────────────────────────── */}
      <div className="hidden md:flex flex-col items-center gap-4 relative z-10 w-[45%] lg:w-[38%]">
        {/* Image container — smaller, controlled height */}
        <div
          className="relative w-full overflow-hidden rounded-2xl"
          style={{ height: "500px", maxWidth: "360px" }}
        >
          <Image
            src={carouselImages[current].src}
            alt={carouselImages[current].alt}
            fill
            className="object-cover transition-opacity duration-400"
            style={{ opacity: fading ? 0 : 1, transition: "opacity 0.4s ease" }}
            sizes="(max-width: 1024px) 45vw, 3600px"
            priority
          />
        </div>

        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {carouselImages.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === current ? "24px" : "8px",
                height: "8px",
                backgroundColor:
                  i === current
                    ? "var(--color-kolekta-green)"
                    : "var(--color-kolekta-pale-muted)",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
