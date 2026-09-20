'use client';

import React from 'react';
import { HelpCircle } from 'lucide-react';

interface NavbarProps {
  isStoreOpen?: boolean;
}

export const Navbar: React.FC<NavbarProps> = () => {
  return (
    <header className="bg-white/85 backdrop-blur-md border-b border-white/80 sticky top-0 z-40 shadow-xs">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 sm:gap-3 shrink-0 group">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white border border-slate-200/90 p-0.5 flex items-center justify-center shadow-xs overflow-hidden shrink-0">
            <img
              src="/images/pojokdl.png"
              alt="PojokDL"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900">
                Pojok<span className="text-blue-600">DL</span>
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80">
                Resmi
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-500 font-normal hidden sm:block">Jual DL &amp; BGL Growtopia</p>
          </div>
        </a>

        <div className="flex items-center gap-2">
          <a
            className="p-2 sm:px-3.5 sm:py-2 rounded-xl border border-sky-100/90 bg-white/90 hover:bg-white hover:border-sky-300 text-slate-700 hover:text-sky-600 text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 shadow-xs shrink-0"
            href="#panduan"
            title="Bantuan & Kontak"
          >
            <HelpCircle className="w-4 h-4 text-sky-600 shrink-0" />
            <span className="hidden sm:inline">Bantuan &amp; Kontak</span>
          </a>
        </div>
      </nav>
    </header>
  );
};
