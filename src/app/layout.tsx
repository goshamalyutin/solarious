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

export const metadata: Metadata = {
  title: "Solarius — The energy-backed blockchain",
  description:
    "Solar production is measured, verified, and written on-chain. Every $SOLAR traces back to a real kilowatt.",
  metadataBase: new URL("https://solarius.vercel.app"),
  openGraph: {
    title: "Solarius — The energy-backed blockchain",
    description: "A Layer-1 anchored to real energy. TGE June 2026.",
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
      className={`${geist.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-pearl font-sans text-ink">
        {children}
      </body>
    </html>
  );
}
