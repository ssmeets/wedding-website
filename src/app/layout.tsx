import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"


import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
