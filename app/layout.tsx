import type { Metadata } from "next";

import "./globals.css";
import { Fraunces } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: "Breadlings - Sourdough Starter Tracker",
  description:
    "Track your sourdough starter's progress and grow your little creature.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} antialiased`}>{children}</body>
    </html>
  );
}
