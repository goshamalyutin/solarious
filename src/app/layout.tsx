import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, Montserrat, Fraunces } from "next/font/google";
import "./globals.css";

const plex = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
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
      className={`${plex.variable} ${montserrat.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-pearl text-ink flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
