import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "Ftelling - AI智能命理占卜",
  description: "融合古老命理智慧与现代AI技术，提供星座、塔罗、八字、奇门、六爻、合盘等全方位预测解读",
  keywords: ["AI占卜", "Ftelling", "星座", "塔罗", "八字", "奇门遁甲", "六爻", "合盘"],
  authors: [{ name: "Ftelling" }],
  openGraph: {
    title: "Ftelling - AI智能命理占卜",
    description: "融合古老命理智慧与现代AI技术，提供星座、塔罗、八字、奇门、六爻、合盘等全方位预测解读",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen mystical-bg text-foreground antialiased overflow-x-hidden">
        <div className="stars-bg fixed inset-0 pointer-events-none z-0" />
        <TooltipProvider>
          <Navbar />
          <main className="relative z-10 pt-24 sm:pt-28 pb-8 sm:pb-12 px-3 sm:px-4">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </TooltipProvider>
      </body>
    </html>
  );
}
