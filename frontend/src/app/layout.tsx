import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pixgallery",
  description: "Photo galleries, bookings, and events powered by Google Drive.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-[#f9f9f7] text-[#1a1c1b]"
        suppressHydrationWarning
      >
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
