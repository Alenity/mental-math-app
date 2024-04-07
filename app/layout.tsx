import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { jetbrains } from "../lib/fonts";

import "./globals.css";


export const metadata: Metadata = {
  title: "SailMath",
  description: "Accelerate your mental math",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Analytics/>
      <body className={`${jetbrains.className}`}>
        {children}
      </body>
    </html>
  );
}
