'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sparkles, Menu, X } from 'lucide-react';

const navItems = [
  { href: '/huangli', label: '黄历' },
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
    <nav className="clean-navbar">
      <div className="w-full max-w-lg mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-cyan-600" />
            </div>
            <span className="font-semibold text-lg text-cyan-900 tracking-tight">
              F-Teller
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-0.5">
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden p-2 text-slate-500 hover:text-cyan-600 transition-colors rounded-lg hover:bg-cyan-50"
            aria-label={isOpen ? '关闭菜单' : '打开菜单'}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="sm:hidden py-3 border-t border-cyan-100">
            <div className="flex flex-wrap gap-1">
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
        px-3 py-1.5 text-sm font-medium text-slate-600
        hover:text-cyan-700 rounded-md
        hover:bg-cyan-50
        transition-all duration-200
      "
    >
      {children}
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
        px-3 py-2 text-sm font-medium text-slate-600
        hover:text-cyan-700 hover:bg-cyan-50
        rounded-md transition-all duration-200
      "
    >
      {children}
    </Link>
  );
}
