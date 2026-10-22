import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RequestLocationModal from "@/components/locations/RequestLocationModal";

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
    default: "KivoKey | Mobile Car Key Service",
    template: "%s | KivoKey",
  },
  description: "Fast, mobile car key replacement, spare keys, and all-keys-lost service in Columbus, OH and nearby areas. We come to you.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Site pages get the Navbar/Footer from app/(site)/layout.tsx; the booking flow has its own header */}
        {children}
        {/* "Request a location" popup, opened from any page */}
        <RequestLocationModal />
      </body>
    </html>
  );
}
