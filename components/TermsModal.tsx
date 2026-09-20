'use client';

import React, { useEffect } from 'react';
import {
  X,
  ShieldCheck,
  CreditCard,
  AlertTriangle,
  RotateCcw,
  Info,
  Check,
} from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  // Lock body scroll and listen to Esc key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const terms = [
    {
      num: 1,
      title: 'Kebijakan Privasi',
      icon: ShieldCheck,
      color: 'text-emerald-600 bg-emerald-100/70 border-emerald-200/80',
      text: 'Kami menjamin 100% kerahasiaan nomor WhatsApp, GrowID, dan riwayat transaksi kamu. Kami tidak pernah meminta data sensitif (password/email).',
    },
    {
      num: 2,
      title: 'Pembayaran & Mutasi',
      icon: CreditCard,
      color: 'text-sky-600 bg-sky-100/70 border-sky-200/80',
      text: 'Pesanan hanya diproses jika mutasi bank/e-wallet telah terkonfirmasi masuk ke rekening Admin.',
    },
    {
      num: 3,
      title: 'Tanggung Jawab Data',
      icon: AlertTriangle,
      color: 'text-amber-600 bg-amber-100/70 border-amber-200/80',
      text: 'Pembeli wajib memastikan World dan Donation/Display box dapat diakses. Kerugian akibat salah input World bukan tanggung jawab toko jika sudah terlanjur dikirim.',
    },
    {
      num: 4,
      title: 'Kebijakan Refund',
      icon: RotateCcw,
      color: 'text-indigo-600 bg-indigo-100/70 border-indigo-200/80',
      text: 'Pengembalian dana 100% diberikan jika stok habis atau kendala dari pihak toko. Tidak melayani pembatalan sepihak setelah lock terkirim.',
    },
    {
      num: 5,
      title: 'Disclaimer',
      icon: Info,
      color: 'text-slate-600 bg-slate-100 border-slate-200',
      text: 'Toko ini adalah penyedia jasa pihak ketiga independen dan tidak terafiliasi secara resmi dengan Ubisoft/Growtopia.',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-slate-900/60 backdrop-blur-sm transition-all duration-200 animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-modal-title"
    >
      <div
        className="relative w-full max-w-xl bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/80 shadow-2xl shadow-sky-950/20 max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-sky-100/80 bg-gradient-to-r from-sky-50/60 via-white to-sky-50/30 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-md shadow-sky-200 shrink-0">
              <ShieldCheck className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
            </div>
            <div>
              <h3 id="terms-modal-title" className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                Syarat &amp; Kebijakan Privasi
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                Transparansi &amp; komitmen kenyamanan transaksi PojokDL
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition flex items-center justify-center shrink-0 shadow-xs"
            aria-label="Tutup modal"
          >
            <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 sm:space-y-3.5 divide-y divide-sky-100/50">
          {terms.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.num} className="pt-3 sm:pt-3.5 first:pt-0 flex items-start gap-3">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${item.color}`}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-0.5">
                    {item.num}. {item.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-5 border-t border-sky-100/80 bg-slate-50/80 shrink-0 flex items-center justify-between gap-3">
          <p className="text-[10px] sm:text-[11px] text-slate-500 hidden sm:block">
            Terakhir diperbarui: September 2026
          </p>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-bold transition shadow-md shadow-sky-200 active:scale-95 flex items-center justify-center gap-1.5 ml-auto"
          >
            <Check className="w-4 h-4" />
            <span>Saya Mengerti &amp; Setuju</span>
          </button>
        </div>
      </div>
    </div>
  );
};
