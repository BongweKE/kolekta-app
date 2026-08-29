import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/NavbarMinimal";
import Footer from "@/components/common/FooterMinimal";
import { SanityLive } from "@/lib/sanity/live";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Kolekta — Tax Compliance for Kenya's Creatives",
    template: "%s | Kolekta",
  },
  description:
    "Kolekta helps Kenya's independent workers, creatives, and businesses understand and file their taxes with confidence. PAYE calculators, KRA guides, and expert support.",
  keywords: [
    "Kenya tax",
    "KRA returns",
    "PAYE calculator",
    "tax compliance Kenya",
    "freelancer tax Kenya",
    "creative tax Kenya",
  ],
  authors: [{ name: "Kolekta" }],
  openGraph: {
    title: "Kolekta — Tax Compliance for Kenya's Creatives",
    description:
      "Understand and file your taxes with confidence. Built for Kenya's independent workers.",
    type: "website",
    locale: "en_KE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-theme="kolekta"
      style={{ margin: 0, padding: 0 }}
    >
      <body
        className="min-h-screen flex flex-col antialiased"
        style={{ margin: 0, padding: 0 }}
      >
        <Navbar />
        <main className="flex-1 relative z-10 pb-36 md:pb-14">{children}</main>
        <Footer />
        <SanityLive />
      </body>
    </html>
  );
}
