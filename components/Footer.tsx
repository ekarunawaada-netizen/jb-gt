'use client';

import React from 'react';

interface FooterProps {
  onOpenTerms?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerms }) => {
  return (
    <footer className="bg-white/80 backdrop-blur-md border-t border-sky-100 py-8 sm:py-10 pb-28 sm:pb-10 mt-12 sm:mt-16 text-slate-500 text-xs relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <div className="flex items-center justify-center md:justify-start gap-2.5">
            <img
              src="/images/pojokdl.png"
              alt="PojokDL"
              className="w-6 h-6 object-contain rounded-md"
            />
            <span className="font-extrabold text-slate-900 text-sm">
              Pojok<span className="text-blue-600">DL</span>
            </span>
            <span className="text-slate-400">•</span>
            <span>© {new Date().getFullYear()} Semua Hak Cipta Dilindungi</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1.5 max-w-lg">
            Disclaimer: Layanan ini merupakan platform independen dan tidak terafiliasi dengan
            Ubisoft Entertainment atau pengembang game Growtopia.
          </p>
        </div>

        <div className="flex items-center justify-center flex-wrap gap-4 sm:gap-5 text-xs font-medium">
          <a className="hover:text-slate-900 transition py-1" href="#panduan">
            Panduan
          </a>
          <a className="hover:text-slate-900 transition py-1" href="#panduan">
            FAQ
          </a>
          <button
            type="button"
            onClick={onOpenTerms}
            className="hover:text-slate-900 transition py-1 text-slate-500 hover:underline"
          >
            Syarat &amp; Privasi
          </button>
          <a
            className="text-sky-600 hover:text-sky-700 transition font-semibold py-1"
            href="#order-section"
          >
            Beli Lock
          </a>
        </div>
      </div>
    </footer>
  );
};
