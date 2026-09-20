'use client';

import React from 'react';
import {
  Check,
  ShieldCheck,
  User,
  MapPin,
  AlertCircle,
  CreditCard,
} from 'lucide-react';
import { StoreSettings, ProductType, PaymentMethod, OrderState } from '@/types';

interface OrderSectionProps {
  settings: StoreSettings;
  orderState: OrderState;
  setOrderState: React.Dispatch<React.SetStateAction<OrderState>>;
}

const PRESETS = {
  DL: [5, 10, 25, 50, 100, 250],
  BGL: [1, 2, 5, 10, 20],
};

interface PaymentOptionItem {
  id: PaymentMethod;
  name: string;
  sub: string;
  badge?: string;
}

const PAYMENT_OPTIONS: PaymentOptionItem[] = [
  {
    id: 'QRIS',
    name: 'QRIS',
    sub: 'Semua E-Wallet & Mobile Banking',
    badge: 'Rekomendasi',
  },
  {
    id: 'DANA',
    name: 'DANA',
    sub: 'Transfer Sesama DANA',
  },
  {
    id: 'Bank Transfer',
    name: 'Bank Transfer',
    sub: 'BCA / Mandiri',
  },
  {
    id: 'E-Wallet Lainnya',
    name: 'E-Wallet Lainnya',
    sub: 'GoPay / OVO / ShopeePay',
  },
];

export const OrderSection: React.FC<OrderSectionProps> = ({
  settings,
  orderState,
  setOrderState,
}) => {
  const currentRate =
    orderState.product === 'DL' ? settings.price_dl : settings.price_bgl;
  const total = orderState.qty * currentRate;

  const formatRupiah = (num: number) => {
    return 'Rp ' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleProductChange = (product: ProductType) => {
    setOrderState((prev) => ({
      ...prev,
      product,
      // Sesuaikan default qty saat berganti item
      qty: product === 'DL' ? (prev.qty < 5 ? 10 : prev.qty) : prev.qty > 50 ? 2 : prev.qty || 1,
    }));
  };

  const adjustQty = (delta: number) => {
    setOrderState((prev) => {
      let next = prev.qty + delta;
      if (next < 1) next = 1;
      if (next > 9999) next = 9999;
      return { ...prev, qty: next };
    });
  };

  const handleQtyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setOrderState((prev) => ({
      ...prev,
      qty: isNaN(val) || val < 1 ? 1 : val > 9999 ? 9999 : val,
    }));
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* STEP 1: PILIH ITEM & KUANTITAS */}
      <section className="bg-white/85 backdrop-blur-md border border-white/80 shadow-xl shadow-sky-950/5 rounded-2xl p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-sky-600 text-white text-xs font-bold flex items-center justify-center shadow-xs">
              1
            </span>
            <h2 className="text-base font-bold text-slate-900">Pilih Jenis Lock</h2>
          </div>
          <span className="text-[11px] sm:text-xs font-medium text-emerald-700 bg-emerald-50 px-2 sm:px-2.5 py-0.5 rounded-full border border-emerald-200/60 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="hidden xs:inline sm:inline">100% Legal &amp; Aman</span>
            <span className="xs:hidden sm:hidden">Legal</span>
          </span>
        </div>

        {/* Product Cards Grid: 2 Columns on Mobile & Desktop */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {/* Diamond Lock Card */}
          <div
            onClick={() => handleProductChange('DL')}
            className={`cursor-pointer rounded-2xl p-3 sm:p-4 transition-all relative group shadow-xs min-h-[140px] flex flex-col justify-between ${
              orderState.product === 'DL'
                ? 'ring-2 ring-sky-500 border-transparent bg-gradient-to-b from-sky-50/90 to-white shadow-md shadow-sky-200/50'
                : 'border border-slate-200 bg-white/90 hover:border-sky-300'
            }`}
          >
            <div>
              <div className="flex items-start justify-between mb-2">
                <div className="bg-sky-100/80 p-1.5 sm:p-2 rounded-xl flex items-center justify-center shrink-0 shadow-xs">
                  <img
                    src="/images/dl.png"
                    alt="Diamond Lock"
                    className="w-7 h-7 sm:w-9 sm:h-9 object-contain drop-shadow-xs group-hover:scale-105 transition-transform"
                  />
                </div>
                {orderState.product === 'DL' && (
                  <div className="flex items-center gap-1 bg-sky-600 text-white text-[10px] sm:text-[11px] font-semibold px-1.5 sm:px-2 py-0.5 rounded-full shadow-xs">
                    <Check className="w-3 h-3" />
                    <span>Dipilih</span>
                  </div>
                )}
              </div>
              <span className="inline-block text-[10px] sm:text-[11px] font-semibold text-sky-700 bg-sky-100/70 px-1.5 sm:px-2 py-0.5 rounded-md border border-sky-200/60 mb-1">
                {settings.stock_status_dl === 'ready' ? 'Ready' : 'Menipis'}
              </span>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Diamond Lock</h3>
              <p className="text-[11px] text-slate-500 hidden sm:block">Mata uang utama Growtopia (DL)</p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-sky-100/80 flex items-baseline justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Harga satuan:</span>
                <span className="text-base sm:text-lg font-extrabold text-slate-900">
                  {formatRupiah(settings.price_dl)}
                </span>
              </div>
              <span className="text-[10px] sm:text-xs text-slate-500 font-medium">Min: 1</span>
            </div>
          </div>

          {/* Blue Gem Lock Card */}
          <div
            onClick={() => handleProductChange('BGL')}
            className={`cursor-pointer rounded-2xl p-3 sm:p-4 transition-all relative group shadow-xs min-h-[140px] flex flex-col justify-between ${
              orderState.product === 'BGL'
                ? 'ring-2 ring-indigo-500 border-transparent bg-gradient-to-b from-indigo-50/90 to-white shadow-md shadow-indigo-200/50'
                : 'border border-slate-200 bg-white/90 hover:border-sky-300'
            }`}
          >
            <div>
              <div className="flex items-start justify-between mb-2">
                <div className="bg-indigo-100/80 p-1.5 sm:p-2 rounded-xl flex items-center justify-center shrink-0 shadow-xs">
                  <img
                    src="/images/bgl.png"
                    alt="Blue Gem Lock"
                    className="w-7 h-7 sm:w-9 sm:h-9 object-contain drop-shadow-xs group-hover:scale-105 transition-transform"
                  />
                </div>
                {orderState.product === 'BGL' && (
                  <div className="flex items-center gap-1 bg-indigo-600 text-white text-[10px] sm:text-[11px] font-semibold px-1.5 sm:px-2 py-0.5 rounded-full shadow-xs">
                    <Check className="w-3 h-3" />
                    <span>Dipilih</span>
                  </div>
                )}
              </div>
              <span className="inline-block text-[10px] sm:text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-1.5 sm:px-2 py-0.5 rounded-md border border-indigo-100 mb-1">
                {settings.stock_status_bgl === 'ready' ? 'Ready (Best)' : 'Menipis'}
              </span>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Blue Gem Lock</h3>
              <p className="text-[11px] text-slate-500 hidden sm:block">1 BGL = 100 DL (Nominal Besar)</p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-baseline justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Harga satuan:</span>
                <span className="text-base sm:text-lg font-extrabold text-slate-900">
                  {formatRupiah(settings.price_bgl)}
                </span>
              </div>
              <span className="text-[10px] sm:text-xs text-slate-500 font-medium">Min: 1</span>
            </div>
          </div>
        </div>

        {/* STEPPER & PRESETS */}
        <div className="mt-5 pt-4 border-t border-sky-100/70">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide block mb-2.5">
            Tentukan Jumlah Kuantitas
          </label>

          {/* Stepper Form Capsule (>= 44px touch targets) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              className="h-11 sm:h-12 px-2.5 sm:px-3.5 rounded-xl sm:rounded-full border border-sky-200/80 bg-white/80 hover:bg-white text-slate-700 font-semibold text-xs transition active:scale-95 shadow-xs shrink-0 flex items-center justify-center min-w-[44px]"
              onClick={() => adjustQty(-10)}
              title="Kurang 10"
              type="button"
            >
              -10
            </button>
            <button
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-full border border-sky-200/80 bg-white/80 hover:bg-white text-slate-700 font-bold text-lg flex items-center justify-center transition active:scale-95 shadow-xs shrink-0"
              onClick={() => adjustQty(-1)}
              title="Kurang 1"
              type="button"
            >
              −
            </button>
            <div className="relative flex-1 min-w-0">
              <input
                className="w-full h-11 sm:h-12 rounded-xl sm:rounded-full border border-sky-200/80 bg-white/95 text-center font-bold text-base sm:text-lg text-slate-900 focus:ring-2 focus:ring-sky-300 focus:border-sky-400 focus:bg-white transition px-3 sm:px-4 shadow-xs"
                max="9999"
                min="1"
                onChange={handleQtyInput}
                type="number"
                value={orderState.qty}
              />
              <span
                className={`absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 text-xs font-bold pointer-events-none flex items-center gap-1 ${
                  orderState.product === 'DL' ? 'text-sky-600' : 'text-indigo-600'
                }`}
              >
                <img
                  src={orderState.product === 'DL' ? '/images/dl.png' : '/images/bgl.png'}
                  alt={orderState.product}
                  className="w-4 h-4 object-contain inline-block"
                />
                <span>{orderState.product}</span>
              </span>
            </div>
            <button
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-full border border-sky-200/80 bg-white/80 hover:bg-white text-slate-700 font-bold text-lg flex items-center justify-center transition active:scale-95 shadow-xs shrink-0"
              onClick={() => adjustQty(1)}
              title="Tambah 1"
              type="button"
            >
              +
            </button>
            <button
              className="h-11 sm:h-12 px-2.5 sm:px-3.5 rounded-xl sm:rounded-full border border-sky-200/80 bg-white/80 hover:bg-white text-slate-700 font-semibold text-xs transition active:scale-95 shadow-xs shrink-0 flex items-center justify-center min-w-[44px]"
              onClick={() => adjustQty(10)}
              title="Tambah 10"
              type="button"
            >
              +10
            </button>
          </div>

          {/* Quick Preset Buttons */}
          <div className="mt-3.5 flex items-center flex-wrap gap-2">
            <span className="text-xs text-slate-400 mr-1 font-medium shrink-0">Preset Cepat:</span>
            <div className="flex flex-wrap gap-1.5">
              {PRESETS[orderState.product].map((amount) => {
                const isActive = orderState.qty === amount;
                return (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => setOrderState((prev) => ({ ...prev, qty: amount }))}
                    className={`min-h-[38px] sm:min-h-[36px] px-3 py-1.5 rounded-full text-xs font-semibold transition active:scale-95 flex items-center justify-center ${
                      isActive
                        ? orderState.product === 'DL'
                          ? 'bg-sky-500 text-white shadow-xs shadow-sky-200'
                          : 'bg-indigo-600 text-white shadow-xs shadow-indigo-200'
                        : 'bg-white/80 hover:bg-white text-slate-700 border border-sky-100 shadow-xs'
                    }`}
                  >
                    +{amount} {orderState.product}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subtotal Preview Bar */}
          <div className="mt-4 p-3 rounded-xl bg-sky-50/70 border border-sky-100/90 flex items-center justify-between text-xs backdrop-blur-xs">
            <span className="text-slate-600 text-[11px] sm:text-xs">
              Estimasi: <strong className="text-slate-900">{orderState.qty} {orderState.product}</strong>
            </span>
            <span className="font-extrabold text-sky-600 text-sm sm:text-base">{formatRupiah(total)}</span>
          </div>
        </div>
      </section>

      {/* STEP 2: DATA PENERIMA & WORLD */}
      <section className="bg-white/85 backdrop-blur-md border border-white/80 shadow-xl shadow-sky-950/5 rounded-2xl p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-sky-600 text-white text-xs font-bold flex items-center justify-center shadow-xs">
              2
            </span>
            <h2 className="text-base font-bold text-slate-900">Data Penerima &amp; World</h2>
          </div>
          <span className="text-[11px] sm:text-xs text-slate-500 font-medium">Pengiriman Otomatis</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* GrowID */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="input-growid">
              GrowID (Username) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                id="input-growid"
                className="w-full h-11 sm:h-12 px-3.5 rounded-xl bg-white/90 border border-sky-100/90 focus:border-sky-400 focus:ring-2 focus:ring-sky-200 focus:bg-white text-slate-800 transition-all shadow-xs text-base sm:text-sm font-semibold placeholder:text-slate-400 placeholder:font-normal"
                placeholder="Contoh: SteveGT"
                type="text"
                value={orderState.growId}
                onChange={(e) =>
                  setOrderState((prev) => ({ ...prev, growId: e.target.value }))
                }
              />
              <User className="w-4 h-4 text-sky-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Pastikan ejaan huruf sesuai akun.</p>
          </div>

          {/* World Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="input-world">
              Nama World Tujuan <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                id="input-world"
                className="w-full h-11 sm:h-12 px-3.5 rounded-xl bg-white/90 border border-sky-100/90 focus:border-sky-400 focus:ring-2 focus:ring-sky-200 focus:bg-white text-slate-800 transition-all shadow-xs text-base sm:text-sm font-semibold uppercase placeholder:text-slate-400 placeholder:font-normal placeholder:capitalize"
                placeholder="Contoh: TOKOLOCK99"
                type="text"
                value={orderState.world}
                onChange={(e) =>
                  setOrderState((prev) => ({ ...prev, world: e.target.value.toUpperCase() }))
                }
              />
              <MapPin className="w-4 h-4 text-sky-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <p className="text-[11px] text-amber-700 mt-1 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" /> Harus ada Donation Box / Display Box
            </p>
          </div>
        </div>

        {/* Notes Field */}
        <div className="mt-4">
          <label className="text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
            <span>Catatan Tambahan untuk Admin</span>
            <span className="text-[11px] text-slate-400 font-normal">Opsional</span>
          </label>
          <input
            className="w-full h-11 px-3.5 rounded-xl bg-white/90 border border-sky-100/90 focus:border-sky-400 focus:ring-2 focus:ring-sky-200 focus:bg-white text-slate-800 transition-all shadow-xs text-base sm:text-xs placeholder:text-slate-400"
            placeholder="Contoh: Drop di Display Box dekat White Door"
            type="text"
            value={orderState.notes}
            onChange={(e) => setOrderState((prev) => ({ ...prev, notes: e.target.value }))}
          />
        </div>
      </section>

      {/* STEP 3: PILIH METODE PEMBAYARAN */}
      <section className="bg-white/85 backdrop-blur-md border border-white/80 shadow-xl shadow-sky-950/5 rounded-2xl p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-6 h-6 rounded-lg bg-sky-600 text-white text-xs font-bold flex items-center justify-center shadow-xs">
            3
          </span>
          <h2 className="text-base font-bold text-slate-900">Pilih Metode Pembayaran</h2>
        </div>

        {/* Payment Grid: 4 Essential Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          {PAYMENT_OPTIONS.map((method) => {
            const isSelected = orderState.payment === method.id;
            return (
              <button
                key={method.id}
                type="button"
                onClick={() =>
                  setOrderState((prev) => ({ ...prev, payment: method.id }))
                }
                className={`min-h-[64px] sm:min-h-[68px] p-3 sm:p-3.5 rounded-xl text-left transition relative flex flex-col justify-center active:scale-[0.98] ${
                  isSelected
                    ? 'border-2 border-sky-500 bg-sky-50/90 shadow-sm ring-2 ring-sky-200/50'
                    : 'border border-slate-200/90 bg-white/90 hover:border-sky-300 hover:bg-sky-50/30 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-xs sm:text-sm font-bold text-slate-900">{method.name}</span>
                    {method.badge && (
                      <span className="text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-200/80 shadow-2xs">
                        {method.badge}
                      </span>
                    )}
                  </div>
                  {isSelected ? (
                    <div className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full bg-sky-600 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </div>
                  ) : (
                    <div className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full border border-slate-300 shrink-0" />
                  )}
                </div>
                <span
                  className={`text-[10px] sm:text-[11px] block leading-tight ${
                    isSelected ? 'text-sky-700 font-semibold' : 'text-slate-500 font-medium'
                  }`}
                >
                  {method.sub}
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
