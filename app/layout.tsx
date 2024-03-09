import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ subsets: ["latin"]});

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
      <body className={jetbrains.className}>
        <main className="w-screen h-screen bg-main-bg-color flex flex-col p-5">
          <div className="w-full h-full flex justify-between flex-1">
            <div>
              <p className={`text-hover-color`}>Sail Math</p>
            </div>
            <div>
              <p className={`text-text-color`}>Account Stuff</p>
            </div>
          </div>
          <div className="w-full h-full flex flex-col justify-around items-center flex-4">
            {children}
          </div>
          <div className="w-full h-full flex justify-between flex-1">
            <div className="flex items-end">
              <p className={`text-text-color`}>v1.1.1</p>
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
