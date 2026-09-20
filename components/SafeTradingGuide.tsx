'use client';

import React from 'react';
import { HelpCircle } from 'lucide-react';

export const SafeTradingGuide: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Tentukan Item & Data',
      desc: 'Pilih nominal DL/BGL yang diinginkan, isi GrowID dan nama World tujuan. Pastikan Donation/Display Box aktif.',
    },
    {
      num: '02',
      title: 'Bayar via WhatsApp',
      desc: 'Klik checkout untuk terhubung ke WhatsApp Admin. Selesaikan transfer (QRIS/E-Wallet/Bank) dan kirimkan bukti transfer.',
    },
    {
      num: '03',
      title: 'Lock Masuk ke World',
      desc: 'Admin memverifikasi pembayaran dan langsung mendrop lock ke World kamu dalam 1–5 menit. Transaksi selesai!',
    },
  ];

  const faqs = [
    {
      q: 'Berapa lama proses pengiriman Lock?',
      a: 'Pengiriman rata-rata memakan waktu 1–5 menit setelah pembayaran terverifikasi oleh Admin di chat WhatsApp.',
    },
    {
      q: 'Apakah toko ini pernah meminta password?',
      a: 'Sama sekali TIDAK PERNAH. Kami hanya memerlukan GrowID dan Nama World. Jangan pernah berikan password atau data login kamu kepada siapa pun.',
    },
    {
      q: 'Bagaimana jika World belum ada Donation Box?',
      a: 'Kamu bisa menggunakan Display Box. Bila belum punya keduanya, kamu bisa meminta Trade Langsung (Face to Face in-game) saat koordinasi di WhatsApp.',
    },
    {
      q: 'Bagaimana jika saya salah mengisi nama World?',
      a: 'Segera beri tahu Admin di chat WhatsApp sebelum lock di-drop. Jika lock sudah terlanjur di-drop sesuai World yang kamu ketik, pesanan dianggap selesai.',
    },
  ];

  return (
    <section className="mt-12 sm:mt-16 lg:mt-20 pt-8 sm:pt-10 border-t border-sky-200/50" id="panduan">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
        <span className="text-xs font-semibold text-sky-700 uppercase tracking-wider bg-sky-100/80 border border-sky-200/70 px-3 py-1 rounded-full">
          Cara Transaksi
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2.5">
          3 Langkah Mudah Beli Lock
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-md mx-auto">
          Alur transaksi ringkas, amanah, dan diproses cepat langsung oleh Admin ke World kamu.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {steps.map((step) => (
          <div
            key={step.num}
            className="bg-white/85 backdrop-blur-md border border-white/80 shadow-xl shadow-sky-950/5 rounded-2xl p-4 sm:p-6 hover:-translate-y-0.5 transition duration-200"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sky-100 text-sky-600 font-bold text-xs sm:text-sm flex items-center justify-center mb-3 sm:mb-4 border border-sky-200/80">
              {step.num}
            </div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5 sm:mb-2">{step.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>

      {/* FAQ Grid */}
      <div className="mt-8 sm:mt-12 bg-white/85 backdrop-blur-md border border-white/80 shadow-xl shadow-sky-950/5 rounded-2xl p-4 sm:p-6 lg:p-8">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-sky-600 shrink-0" /> Pertanyaan yang Sering Diajukan (FAQ)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-3.5 sm:p-4 rounded-xl bg-sky-50/50 border border-sky-100/70">
              <h4 className="font-semibold text-slate-900 mb-1">{faq.q}</h4>
              <p className="text-slate-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
