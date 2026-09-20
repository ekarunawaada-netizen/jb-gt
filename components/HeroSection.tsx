'use client';

import React from 'react';
import {
  ShoppingBag,
  TrendingUp,
  Star,
  ShieldCheck,
} from 'lucide-react';
import { StoreSettings, ProductType } from '@/types';

interface HeroSectionProps {
  settings?: StoreSettings;
  onSelectProduct?: (product: ProductType) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectProduct }) => {
  const scrollToOrder = (product?: ProductType) => {
    if (product && onSelectProduct) {
      onSelectProduct(product);
    }
    const element = document.getElementById('order-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative z-10 pt-6 pb-4 sm:pt-10 sm:pb-10 lg:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Headlines & CTA (Full width on mobile / Desktop: Left col-span-7) */}
        <div className="w-full lg:col-span-7 space-y-3.5 sm:space-y-6 text-center lg:text-left max-w-sm sm:max-w-xl lg:max-w-none mx-auto lg:mx-0 px-2 sm:px-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-sky-100/90 text-sky-700 text-xs font-semibold border border-sky-200/60 shadow-xs backdrop-blur-sm">
            <span className="text-sky-600">⚡</span> Fast Delivery &amp; 100% Amanah
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.2] sm:leading-[1.2] lg:leading-[1.22]">
            Menjadi Platform Jual Beli DL &amp; BGL Paling Terpercaya{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-cyan-500 block sm:inline mt-1 sm:mt-0">
              yang Menyatukan Transparansi, Legalitas, dan Harga Terbaik.
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xs sm:max-w-md mx-auto lg:mx-0 mt-2.5 sm:mt-3 font-normal">
            Top up Diamond Lock (DL) &amp; Blue Gem Lock (BGL) terpercaya. Proses cepat via WhatsApp, lock langsung di-drop ke World kamu.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-1 sm:pt-2">
            <button
              onClick={() => scrollToOrder()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-5 text-sm font-semibold rounded-xl bg-sky-500 hover:bg-sky-600 text-white shadow-lg shadow-sky-400/20 active:scale-95 transition-all min-h-[44px]"
            >
              <ShoppingBag className="w-4 h-4" /> Mulai Beli Lock Sekarang
            </button>

            <button
              onClick={() => scrollToOrder()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 sm:px-5 text-xs sm:text-sm font-semibold rounded-xl border border-sky-200/80 bg-white/70 hover:bg-white text-slate-700 hover:text-sky-600 active:scale-95 transition-all shadow-xs min-h-[44px]"
            >
              <TrendingUp className="w-4 h-4 text-sky-500" /> Lihat Rate Hari Ini
            </button>
          </div>

          {/* Single-line Compact Social Proof */}
          <div className="flex items-center justify-center lg:justify-start gap-2 text-[11px] text-slate-500 pt-3 border-t border-sky-200/60 flex-nowrap whitespace-nowrap overflow-hidden">
            <div className="flex items-center text-amber-400 shrink-0">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <span className="font-bold text-slate-900 shrink-0">4.9/5</span>
            <span className="text-slate-300 shrink-0">•</span>
            <span className="shrink-0">10k+ Order</span>
            <span className="text-slate-300 shrink-0">•</span>
            <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Legal &amp; Aman
            </span>
          </div>
        </div>

        {/* Visual Showcase (Desktop only ≥ 1024px: Right col-span-5) */}
        <div className="hidden lg:flex lg:col-span-5 w-full self-center select-none justify-center">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 mx-auto flex items-center justify-center overflow-visible">
            {/* Ambient Glow Background */}
            <div className="absolute inset-0 m-auto w-64 h-64 bg-gradient-to-tr from-cyan-300/30 to-sky-400/30 rounded-full blur-3xl pointer-events-none -z-10" />

            {/* Floating Locks Composition */}
            <div className="relative w-full h-full flex items-center justify-center overflow-visible">
              {/* Diamond Lock (DL) - Main Anchor */}
              <div className="relative z-10 -translate-x-4 translate-y-3 animate-float-dl">
                <img
                  src="/images/dl.png"
                  alt="Diamond Lock Growtopia"
                  className="w-52 md:w-56 object-contain drop-shadow-[0_15px_30px_rgba(6,182,212,0.35)] select-none pointer-events-none"
                />
              </div>

              {/* Blue Gem Lock (BGL) - Floating Far Upper Right (Spaced out, no overlap) */}
              <div className="absolute z-20 -top-6 -right-6 lg:-top-6 lg:-right-8 animate-float-bgl">
                <img
                  src="/images/bgl.png"
                  alt="Blue Gem Lock Growtopia"
                  className="w-24 md:w-28 object-contain drop-shadow-[0_12px_24px_rgba(37,99,235,0.4)] rotate-12 select-none pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
