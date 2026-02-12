"use client";

import { FeatureCard, FeatureGrid } from "@/components/features/feature-card";
import { Sparkles, Star, LayoutGrid, Calendar, Coins, Heart, ChevronRight } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Star,
    title: "星座运势",
    description: "查看每日、每周、每月星座运势，AI解读爱情、事业、财富、健康",
    href: "/horoscope",
    gradient: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-400",
    glowColor: "group-hover:shadow-amber-500/20",
  },
  {
    icon: LayoutGrid,
    title: "塔罗牌",
    description: "多种牌阵选择，洗牌抽牌动画，AI解读牌面含义与建议",
    href: "/tarot",
    gradient: "from-indigo-500/20 to-purple-500/20",
    iconColor: "text-indigo-400",
    glowColor: "group-hover:shadow-indigo-500/20",
  },
  {
    icon: Calendar,
    title: "八字算命",
    description: "输入出生时间生成八字命盘，AI分析性格、事业、财运",
    href: "/bazi",
    gradient: "from-rose-500/20 to-pink-500/20",
    iconColor: "text-rose-400",
    glowColor: "group-hover:shadow-rose-500/20",
  },
  {
    icon: Sparkles,
    title: "奇门遁甲",
    description: "自动起局排盘，九宫格展示，AI解读吉凶格局",
    href: "/qimen",
    gradient: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-cyan-400",
    glowColor: "group-hover:shadow-cyan-500/20",
  },
  {
    icon: Coins,
    title: "六爻预测",
    description: "数字/时间/手动起卦，本卦变卦展示，AI解卦",
    href: "/liuyao",
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400",
    glowColor: "group-hover:shadow-emerald-500/20",
  },
  {
    icon: Heart,
    title: "合盘预测",
    description: "双人星座/八字合盘，AI分析配对指数与关系建议",
    href: "/synastry",
    gradient: "from-pink-500/20 to-rose-500/20",
    iconColor: "text-pink-400",
    glowColor: "group-hover:shadow-pink-500/20",
  },
];

export default function Home() {
  return (
    <div className="relative space-y-20 sm:space-y-28">
      {/* Hero Section */}
      <section className="relative text-center py-16 md:py-24 lg:py-32">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/15 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />

        {/* Badge */}
        <div className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-float">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-medium text-slate-300">AI 驱动 · 智能解读</span>
        </div>

        {/* Main Title */}
        <h1 className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
          <span className="font-serif gradient-text glow-text">Ftelling</span>
        </h1>

        {/* Subtitle */}
        <p className="relative text-xl sm:text-2xl md:text-3xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-serif mb-8">
          探索命运的
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
            神秘之旅
          </span>
        </p>

        {/* Description */}
        <p className="relative text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
          融合古老命理智慧与现代 AI 技术，为你提供星座、塔罗、八字、奇门、六爻、合盘等全方位预测解读
        </p>

        {/* CTA Button */}
        <Link
          href="#features"
          className="relative inline-flex items-center gap-2 btn-mystical text-base sm:text-lg"
        >
          开始探索
          <ChevronRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Features Section */}
      <section id="features" className="relative">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-200 mb-3">
            选择预测方式
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            六种古老智慧，AI为你指引前路
          </p>
        </div>

        <FeatureGrid>
          {features.map((feature, index) => (
            <FeatureCard key={feature.href} {...feature} index={index} />
          ))}
        </FeatureGrid>
      </section>

      {/* Features Highlights */}
      <section className="relative py-12">
        <div className="glass-card rounded-3xl p-8 sm:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-purple-500/30 to-indigo-500/30 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-200">AI 智能解读</h3>
              <p className="text-sm text-slate-400">基于大语言模型的深度命理分析</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500/30 to-blue-500/30 flex items-center justify-center">
                <Star className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-200">多维度分析</h3>
              <p className="text-sm text-slate-400">覆盖爱情、事业、财富、健康全方位</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center">
                <Heart className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-200">私密安全</h3>
              <p className="text-sm text-slate-400">您的个人信息仅用于本次预测</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative text-center pt-8">
        <div className="section-divider mb-8" />
        <div className="space-y-2">
          <p className="text-slate-500 text-sm">
            © 2025 Ftelling. 仅供娱乐参考，请理性看待。
          </p>
          <p className="text-slate-600 text-xs">
            命运掌握在自己手中
          </p>
        </div>
      </footer>
    </div>
  );
}
