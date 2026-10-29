import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "CMF Headphone Pro | Sound, remixed. — CMF by Nothing",
  description:
    "Explore CMF Headphone Pro by Nothing. Featuring 40mm custom drivers, Hybrid Adaptive ANC, tactile Energy Slider, physical roller control, interchangeable cushions, and up to 100 hours of battery life.",
  keywords: [
    "CMF Headphone Pro",
    "CMF by Nothing",
    "Nothing",
    "Wireless Headphones",
    "Active Noise Cancellation",
    "Energy Slider",
    "Hi-Res Audio",
    "LDAC",
  ],
  openGraph: {
    title: "CMF Headphone Pro | Sound, remixed.",
    description:
      "A cinematic engineering showcase of CMF Headphone Pro. Expressive design. Powerful sound. Control that feels natural.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} bg-[#050505] text-[#F5F5F5] antialiased selection:bg-[#FF5A1F] selection:text-white`}
    >
      <body className="min-h-screen bg-[#050505] text-[#F5F5F5] overflow-x-hidden font-sans">
        {children}
      </body>
    </html>
  );
}
