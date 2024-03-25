import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import { jetbrains } from "./fonts";
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
        <main className="w-screen h-screen bg-main-bg-color flex flex-col p-5">
          <div className="w-full h-full flex justify-between flex-1">
            <div>
              <p className={`text-hover-color`}>Sail Math</p>
            </div>
            <div>
              <p className={`text-text-color`}>Account Stuff</p>
            </div>
          </div>
          <div className="w-full h-full flex flex-col justify-around items-center flex-2">
            {children}
          </div>
          <div className="w-full h-full flex justify-between flex-1">
            <div className="flex items-end">
              <p className={`text-text-color`}>v1.2.1</p>
            </div>
            <div className="flex items-end">
              <p className={`text-text-color`}>Social Stuff</p>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
