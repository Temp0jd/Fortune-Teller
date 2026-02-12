'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  href,
}: FeatureCardProps) {
  return (
    <Link href={href} className="group block touch-manipulation">
      <div className="
        relative overflow-hidden
        bg-white rounded-xl border border-cyan-100
        p-4 h-full
        cursor-pointer
        transition-all duration-200
        hover:border-cyan-200 hover:shadow-md
        hover:-translate-y-0.5
      ">
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className="
            flex-shrink-0 w-10 h-10 rounded-lg
            bg-cyan-50 flex items-center justify-center
            group-hover:bg-cyan-100 transition-colors
          ">
            <Icon className="w-5 h-5 text-cyan-600" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-800 text-sm group-hover:text-cyan-700 transition-colors">
                {title}
              </h3>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-cyan-500 transition-colors" />
            </div>
            <p className="text-slate-400 text-xs mt-0.5 truncate">
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

interface FeatureGridProps {
  children: React.ReactNode;
}

export function FeatureGrid({ children }: FeatureGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {children}
    </div>
  );
}
