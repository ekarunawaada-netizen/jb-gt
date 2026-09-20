'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, Copy, Check, ShieldCheck } from 'lucide-react';
import { StoreSettings, OrderState } from '@/types';
import {
  getCheckoutApiUrl,
  buildOrderMessage,
  formatRupiah,
} from '@/lib/whatsapp';

interface OrderSummaryProps {
  settings: StoreSettings;
  orderState: OrderState;
  onToast: (message: string, type?: 'success' | 'warning' | 'error') => void;
  onOpenTerms?: () => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  settings,
  orderState,
  onToast,
  onOpenTerms,
}) => {
  const [invoiceNumber, setInvoiceNumber] = useState('98421');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Generate invoice random 5-digit saat client mount
    setInvoiceNumber(Math.floor(10000 + Math.random() * 90000).toString());
  }, []);

  const currentRate =
    orderState.product === 'DL' ? settings.price_dl : settings.price_bgl;
  const subtotal = orderState.qty * currentRate;
  const serviceFee = 0;
  const total = subtotal + serviceFee;

  const handleCheckoutWA = (e: React.MouseEvent) => {
    e.preventDefault();

    // 1. Validasi: GrowID wajib diisi
    if (!orderState.growId.trim()) {
      onToast('Silakan isi GrowID (Username) kamu terlebih dahulu!', 'error');
      const growIdEl = document.getElementById('input-growid') as HTMLInputElement | null;
      if (growIdEl) {
        growIdEl.focus();
        growIdEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // 2. Validasi: World tujuan wajib diisi
    if (!orderState.world.trim()) {
      onToast('Silakan isi Nama World tujuan lock kamu!', 'error');
      const worldEl = document.getElementById('input-world') as HTMLInputElement | null;
      if (worldEl) {
        worldEl.focus();
        worldEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // 3. Generate link checkout aman ke server endpoint (nomor admin aman di server Vercel)
    const checkoutUrl = getCheckoutApiUrl({
      product: orderState.product,
      qty: orderState.qty,
      growId: orderState.growId,
      world: orderState.world,
      notes: orderState.notes,
      payment: orderState.payment,
      invoiceNumber,
    });

    // 4. Buka tab baru ke API checkout (langsung redirect ke WhatsApp admin di tab baru)
    window.open(checkoutUrl, '_blank');

    // 5. Salin format pesan secara otomatis ke clipboard sebagai cadangan
    const message = buildOrderMessage({
      product: orderState.product,
      qty: orderState.qty,
      rate: currentRate,
      total,
      growId: orderState.growId,
      world: orderState.world,
      notes: orderState.notes,
      payment: orderState.payment,
      invoiceNumber,
    });

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(message)
        .then(() => {
          setCopied(true);
          onToast('Format pesanan dibuat & disalin! Membuka WhatsApp...', 'success');
          setTimeout(() => setCopied(false), 2500);
        })
        .catch(() => {
          onToast('Membuka WhatsApp Admin...', 'success');
        });
    } else {
      onToast('Membuka WhatsApp Admin...', 'success');
    }
  };

  const handleCopyFormat = () => {
    if (!orderState.growId.trim()) {
      onToast('GrowID belum diisi. Isi form agar data pesanan lengkap.', 'error');
      document.getElementById('input-growid')?.focus();
      return;
    }

    if (!orderState.world.trim()) {
      onToast('Nama World belum diisi. Isi form agar data pesanan lengkap.', 'error');
      document.getElementById('input-world')?.focus();
      return;
    }

    const message = buildOrderMessage({
      product: orderState.product,
      qty: orderState.qty,
      rate: currentRate,
      total,
      growId: orderState.growId,
      world: orderState.world,
      notes: orderState.notes,
      payment: orderState.payment,
      invoiceNumber,
    });

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(message)
        .then(() => {
          setCopied(true);
          onToast('Format pesanan berhasil dibuat & disalin!', 'success');
          setTimeout(() => setCopied(false), 2500);
        })
        .catch(() => {
          onToast('Gagal menyalin ke clipboard', 'error');
        });
    }
  };

  return (
    <div className="bg-white/85 backdrop-blur-md border border-white/80 shadow-xl shadow-sky-950/5 rounded-2xl p-4 sm:p-6 lg:sticky lg:top-24">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-sky-100/70">
        <div>
          <h2 className="text-base font-bold text-slate-900">Ringkasan Pembayaran</h2>
          <p className="text-xs text-slate-500 mt-0.5">Invoice #PD-{invoiceNumber}</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-100 text-sky-700 border border-sky-200/70">
          Checkout Cepat
        </span>
      </div>

      {/* Rincian Produk & Buyer */}
      <div className="py-3.5 sm:py-4 border-b border-sky-100/70 space-y-3 text-sm">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 p-1 flex items-center justify-center shrink-0 shadow-xs">
              <img
                src={orderState.product === 'DL' ? '/images/dl.png' : '/images/bgl.png'}
                alt={orderState.product}
                className="w-8 h-8 object-contain drop-shadow-xs"
              />
            </div>
            <div className="min-w-0">
              <span className="font-semibold text-slate-900 block text-sm sm:text-base truncate">
                {orderState.product === 'DL' ? 'Diamond Lock (DL)' : 'Blue Gem Lock (BGL)'}
              </span>
              <span className="text-xs text-slate-500 block">
                {orderState.qty} unit × {formatRupiah(currentRate)}
              </span>
            </div>
          </div>
          <span className="font-extrabold text-slate-900 text-sm sm:text-base shrink-0">{formatRupiah(subtotal)}</span>
        </div>

        {/* Buyer Details Preview Box */}
        <div className="p-3 rounded-xl bg-sky-50/50 border border-sky-100/80 text-xs space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Target GrowID:</span>
            {orderState.growId.trim() ? (
              <span className="font-semibold text-slate-900 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                {orderState.growId}
              </span>
            ) : (
              <span className="font-semibold text-slate-400 bg-white/80 px-2 py-0.5 rounded border border-sky-100">
                [Belum diisi]
              </span>
            )}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">World Tujuan:</span>
            {orderState.world.trim() ? (
              <span className="font-semibold text-slate-900 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                {orderState.world.toUpperCase()}
              </span>
            ) : (
              <span className="font-semibold text-slate-400 bg-white/80 px-2 py-0.5 rounded border border-sky-100">
                [Belum diisi]
              </span>
            )}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Metode Bayar:</span>
            <span className="font-semibold text-sky-700">{orderState.payment}</span>
          </div>
          {orderState.notes.trim() && (
            <div className="pt-1.5 border-t border-sky-100 text-slate-600">
              <span className="text-slate-400 block text-[10px]">Catatan:</span>
              <span className="italic font-medium">{orderState.notes}</span>
            </div>
          )}
        </div>
      </div>

      {/* Fee & Total */}
      <div className="py-3.5 sm:py-4 space-y-2 text-xs">
        <div className="flex justify-between text-slate-500">
          <span>Subtotal Item:</span>
          <span className="font-semibold text-slate-800">{formatRupiah(subtotal)}</span>
        </div>
        <div className="flex justify-between text-emerald-600 font-medium">
          <span>Biaya Layanan &amp; Admin:</span>
          <span>GRATIS (Rp 0)</span>
        </div>
        <div className="flex justify-between text-slate-500">
          <span>Garansi Pengiriman:</span>
          <span className="text-sky-600 font-semibold">100% Tercover</span>
        </div>
        <div className="pt-3 border-t border-sky-100/70 flex justify-between items-baseline">
          <span className="text-sm font-semibold text-slate-900">Total Tagihan:</span>
          <span className="text-xl sm:text-2xl font-extrabold text-sky-600 tracking-tight">
            {formatRupiah(total)}
          </span>
        </div>
      </div>

      {/* Safety Guarantee Banner */}
      <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/60 flex items-start gap-2 text-xs text-emerald-900 mb-4 sm:mb-5">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <span className="leading-relaxed text-[11px] sm:text-xs">
          Garansi stok legal 100% hasil farming &amp; trade resmi, bukan hasil dupe/cheat. Akun dijamin aman.
        </span>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5">
        <button
          onClick={handleCheckoutWA}
          id="checkout-wa-btn"
          className="w-full min-h-[48px] py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-sm sm:text-base transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <MessageCircle className="w-5 h-5 shrink-0" />
          <span>Beli Sekarang via WhatsApp</span>
        </button>

        <button
          onClick={handleCopyFormat}
          type="button"
          className="w-full min-h-[44px] py-2.5 px-4 rounded-xl border border-sky-200 bg-white/80 hover:bg-white text-slate-700 font-medium text-xs transition shadow-xs flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="text-emerald-700 font-semibold">Format Berhasil Disalin!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span>Salin Format Pesanan</span>
            </>
          )}
        </button>

        <p className="text-center text-[11px] text-slate-500 pt-1.5 leading-relaxed">
          Dengan checkout, Anda menyetujui{' '}
          <button
            type="button"
            onClick={onOpenTerms}
            className="font-semibold text-sky-600 hover:text-sky-700 underline underline-offset-2 transition"
          >
            Syarat &amp; Ketentuan Layanan
          </button>
        </p>
      </div>
    </div>
  );
};
