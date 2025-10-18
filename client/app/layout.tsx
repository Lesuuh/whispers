import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/home/Navbar";
import ReactQueryProvider from "./providers/ReactQueryProviders";
import { Analytics } from "@vercel/analytics/next";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Whispers — Anonymous Voices, Shared Stories",
    template: "%s | Whispers",
  },
  description:
    "Whispers is an anonymous blog where voices are heard without faces. Share your thoughts, secrets, and experiences freely — no judgment, just honesty.",
  keywords: [
    "anonymous blog",
    "secrets",
    "confessions",
    "stories",
    "thoughts",
    "mental health",
    "anonymous writing",
    "Whispers",
  ],
  authors: [{ name: "Whispers Team" }],
  creator: "Whispers",
  publisher: "Whispers",
  metadataBase: new URL("https://whispers.app"), // replace with your domain
  openGraph: {
    title: "Whispers — Anonymous Voices, Shared Stories",
    description:
      "Read and share anonymous confessions, stories, and experiences. A safe place for your truest thoughts.",
    url: "https://whispers.app",
    siteName: "Whispers",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-whispers.png", // add in /public
        width: 1200,
        height: 630,
        alt: "Whispers — Anonymous Voices, Shared Stories",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Whispers — Anonymous Voices, Shared Stories",
    description:
      "Read and share anonymous confessions and thoughts without judgment.",
    creator: "@whispers_app", // replace or remove if you don’t have X/Twitter
    images: ["/og-whispers.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export const viewPort = {
  width: "device-width",
  initialScale: 1,
  // themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${syne.variable} ${inter.variable} antialiased bg-neutral-50 text-gray-900`}
      >
        <ReactQueryProvider>
          <Navbar />
          <main className="min-h-screen">
            {children} <Analytics />
          </main>
          <footer className="py-8 text-center text-sm text-gray-500 border-t border-gray-200">
            <p>
              © {new Date().getFullYear()} Whispers — Speak Freely, Stay
              Anonymous.
            </p>
          </footer>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
