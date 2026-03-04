import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import React from "react";

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
    template: "%s | Mintuix",
    default: "Mintuix - Build Stunning UIs with Precision",
  },
  description:
    "The modern React component library for Next.js. Production-ready, beautiful animations, and highly customizable to match your brand.",
  keywords: ["React", "Tailwind CSS", "Next.js", "UI Library", "Components", "GSAP"],
  authors: [
    {
      name: "Mintuix",
      url: "https://mintuix.com",
    },
  ],
  creator: "Mintuix",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mintuix.com",
    title: "Mintuix - Modern UI Components",
    description: "Production-ready, beautiful animations, and highly customizable UI library.",
    siteName: "Mintuix",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mintuix - Build Stunning UIs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mintuix - Modern UI Components",
    description: "Production-ready, beautiful animations, and highly customizable UI library.",
    images: ["/og-image.png"],
    creator: "@mintuix",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
