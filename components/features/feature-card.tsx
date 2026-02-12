'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  gradient?: string;
  iconColor?: string;
  glowColor?: string;
  index?: number;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  href,
  gradient = 'from-purple-500/20 to-indigo-500/20',
  iconColor = 'text-purple-400',
  glowColor = 'group-hover:shadow-purple-500/20',
  index = 0,
}: FeatureCardProps) {
  return (
    <Link href={href} className="group block touch-manipulation">
      <div
        className={`
          relative overflow-hidden
          glass-card glass-card-hover
          rounded-2xl p-5 sm:p-6 h-full
          cursor-pointer
          ${glowColor}
        `}
        style={{
          animationDelay: `${index * 100}ms`,
        }}
      >
        {/* Gradient Background on Hover */}
        <div
          className={`
            absolute inset-0 bg-gradient-to-br ${gradient}
            opacity-0 group-hover:opacity-100
            transition-opacity duration-500
          `}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <div
            className={`
              relative mb-4 inline-flex p-3 rounded-xl
              bg-gradient-to-br ${gradient}
              border border-white/10
              group-hover:scale-110 group-hover:border-white/20
              transition-all duration-300
            `}
          >
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-slate-200 mb-2 group-hover:text-white transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
            {description}
          </p>
        </div>

        {/* Arrow */}
        <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <ArrowRight className="w-4 h-4 text-purple-400" />
          </div>
        </div>

        {/* Corner Glow */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-purple-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </Link>
  );
}

interface FeatureGridProps {
  children: React.ReactNode;
}

export function FeatureGrid({ children }: FeatureGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
      {children}
    </div>
  );
}
