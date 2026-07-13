import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { SiteContentProvider } from "@/components/providers/SiteContentProvider";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chocolates & Cereals",
  description: "Udaipur-only delivery • Fresh batches • Small-batch goodness",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${inter.variable} font-sans`}>
        <SiteContentProvider>{children}</SiteContentProvider>
      </body>
    </html>
  );
}
