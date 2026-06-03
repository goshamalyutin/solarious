import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geist = localFont({
  variable: "--font-sans",
  src: [
    {
      path: "../../public/fonts/Geist[wght].woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../../public/fonts/Geist-Italic[wght].woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  display: "swap",
});

const geistMono = localFont({
  variable: "--font-mono",
  src: [
    {
      path: "../../public/fonts/GeistMono[wght].woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  display: "swap",
});

// Display face for headlines only (h1/h2/.h-mega). Body + UI stay on Geist;
// labels/units stay on Geist Mono. Clash Display: geometric, confident, not a
// default. Chosen over Schibsted Grotesk for stronger headline-vs-body contrast.
const clashDisplay = localFont({
  variable: "--font-display",
  src: [
    {
      path: "../../public/fonts/ClashDisplay-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/ClashDisplay-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/ClashDisplay-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/ClashDisplay-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Solarious — Proof-of-Energy Layer-1 for Verified Renewable Production",
  description:
    "Solarius builds blockchain infrastructure to verify, record and monetize renewable energy production through Proof-of-Energy, validator infrastructure and SREC / REC settlement rails.",
  metadataBase: new URL("https://solarius.vercel.app"),
  openGraph: {
    title: "Solarious — Verified Renewable Production On-Chain",
    description:
      "The Proof-of-Energy Layer-1 connecting measured solar output with network verification, wallet access and environmental-commodity settlement.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#E7DED8",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geist.variable} ${geistMono.variable} ${clashDisplay.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-pearl font-sans text-ink">
        {children}
      </body>
    </html>
  );
}
