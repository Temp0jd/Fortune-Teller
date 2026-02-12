"use client";

import { FeatureCard, FeatureGrid } from "@/components/features/feature-card";
import { Sparkles, Star, LayoutGrid, Calendar, Coins, Heart, ChevronRight, ScrollText } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: ScrollText,
    title: "老黄历",
    description: "每日宜忌查询",
    href: "/huangli",
  },
  {
    icon: Star,
    title: "星座运势",
    description: "每日运势解读",
    href: "/horoscope",
  },
  {
    icon: LayoutGrid,
    title: "塔罗牌",
    description: "AI解读牌面含义",
    href: "/tarot",
  },
  {
    icon: Calendar,
    title: "八字算命",
    description: "生成八字命盘",
    href: "/bazi",
  },
  {
    icon: Sparkles,
    title: "奇门遁甲",
    description: "九宫格吉凶解读",
    href: "/qimen",
  },
  {
    icon: Coins,
    title: "六爻预测",
    description: "起卦解卦",
    href: "/liuyao",
  },
  {
    icon: Heart,
    title: "合盘预测",
    description: "双人配对分析",
    href: "/synastry",
  },
];

export default function Home() {
  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Hero Section - Minimal */}
      <section className="text-center pt-6 pb-4">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-cyan-100 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
          <span className="text-xs font-medium text-slate-600">AI 驱动 · 智能解读</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">
          <span className="text-cyan-900">F-Teller</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base text-slate-500 mb-2">
          融合古老命理智慧与现代 AI 技术
        </p>

        {/* Description */}
        <p className="text-sm text-slate-400 mb-6">
          全方位预测解读，指引前路
        </p>

        {/* CTA Button */}
        <Link
          href="#features"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-cyan-600 text-white text-sm font-medium rounded-lg hover:bg-cyan-500 transition-colors"
        >
          开始探索
          <ChevronRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Features Section */}
      <section id="features">
        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-1">
            选择预测方式
          </h2>
          <p className="text-sm text-slate-400">
            六种古老智慧为你指引
          </p>
        </div>

        <FeatureGrid>
          {features.map((feature) => (
            <FeatureCard key={feature.href} {...feature} />
          ))}
        </FeatureGrid>
      </section>

      {/* Features Highlights - Simplified */}
      <section className="py-6">
        <div className="bg-white rounded-xl border border-cyan-100 p-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="w-10 h-10 mx-auto rounded-xl bg-cyan-50 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-600" />
              </div>
              <h3 className="text-sm font-medium text-slate-700">AI 解读</h3>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 mx-auto rounded-xl bg-cyan-50 flex items-center justify-center">
                <Star className="w-5 h-5 text-cyan-600" />
              </div>
              <h3 className="text-sm font-medium text-slate-700">多维度</h3>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 mx-auto rounded-xl bg-cyan-50 flex items-center justify-center">
                <Heart className="w-5 h-5 text-cyan-600" />
              </div>
              <h3 className="text-sm font-medium text-slate-700">私密安全</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center pt-4 pb-6">
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-200 to-transparent mb-4" />
        <p className="text-xs text-slate-400">
          © 2025 F-Teller · 仅供娱乐参考
        </p>
      </footer>
    </div>
  );
}
