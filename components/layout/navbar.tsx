'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Stars, Menu, X } from 'lucide-react';

const navItems = [
  { href: '/horoscope', label: '星座' },
  { href: '/tarot', label: '塔罗' },
  { href: '/bazi', label: '八字' },
  { href: '/qimen', label: '奇门' },
  { href: '/liuyao', label: '六爻' },
  { href: '/synastry', label: '合盘' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="glass-navbar">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Stars className="w-7 h-7 text-purple-400 group-hover:text-purple-300 transition-colors" />
              <div className="absolute inset-0 blur-lg bg-purple-500/30 group-hover:bg-purple-500/50 transition-all" />
            </div>
            <span className="font-serif text-2xl font-bold gradient-text tracking-tight">
              F-Teller
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            aria-label={isOpen ? '关闭菜单' : '打开菜单'}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/10">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <MobileNavLink
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </MobileNavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="
        px-4 py-2 text-sm font-medium text-slate-400
        hover:text-white rounded-xl
        hover:bg-white/5
        transition-all duration-300
        relative group
      "
    >
      {children}
      <span className="absolute bottom-1 left-4 right-4 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="
        px-4 py-3 text-base font-medium text-slate-400
        hover:text-white hover:bg-white/5
        rounded-xl transition-all duration-200
      "
    >
      {children}
    </Link>
  );
}
