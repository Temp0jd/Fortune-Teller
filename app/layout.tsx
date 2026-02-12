import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "F-Teller - AI智能命理占卜",
  description: "融合古老命理智慧与现代AI技术，提供星座、塔罗、八字、奇门、六爻、合盘等全方位预测解读",
  keywords: ["AI占卜", "F-Teller", "星座", "塔罗", "八字", "奇门遁甲", "六爻", "合盘"],
  authors: [{ name: "F-Teller" }],
  openGraph: {
    title: "F-Teller - AI智能命理占卜",
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
      <body className="min-h-screen clean-bg text-foreground antialiased overflow-x-hidden">
        <TooltipProvider>
          <Navbar />
          <main className="relative z-10 pt-16 sm:pt-20 pb-8 sm:pb-12 px-4 sm:px-6">
            <div className="w-full max-w-lg mx-auto">
              {children}
            </div>
          </main>
        </TooltipProvider>
      </body>
    </html>
  );
}
