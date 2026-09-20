'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { OrderSection } from '@/components/OrderSection';
import { OrderSummary } from '@/components/OrderSummary';
import { SafeTradingGuide } from '@/components/SafeTradingGuide';
import { Footer } from '@/components/Footer';
import { Toast } from '@/components/Toast';
import { TermsModal } from '@/components/TermsModal';
import { StoreSettings, OrderState, ProductType } from '@/types';
import { DEFAULT_STORE_SETTINGS } from '@/lib/constants';
import { getCheckoutApiUrl, formatRupiah } from '@/lib/whatsapp';

export default function HomePage() {
  const [settings] = useState<StoreSettings>(DEFAULT_STORE_SETTINGS);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const [orderState, setOrderState] = useState<OrderState>({
    product: 'DL',
    qty: 10,
    growId: '',
    world: '',
    notes: '',
    payment: 'QRIS',
  });

  const [toast, setToast] = useState<{
    visible: boolean;
    message: string;
    type: 'success' | 'warning' | 'error';
  }>({
    visible: false,
    message: '',
    type: 'success',
  });

  const [showFloatingBar, setShowFloatingBar] = useState(false);

  // Monitor scroll position: only reveal floating checkout bar when scrolled past 380px
  useEffect(() => {
    const handleScroll = () => {
      // Hanya muncul jika user sudah benar-benar scroll ke bawah sejauh lebih dari 380px
      if (window.scrollY > 380) {
        setShowFloatingBar(true);
      } else {
        setShowFloatingBar(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Jalankan sekali saat mount untuk memastikan state awal sinkron
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerToast = (
    message: string,
    type: 'success' | 'warning' | 'error' = 'success'
  ) => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3500);
  };

  const handleSelectProductFromHero = (product: ProductType) => {
    setOrderState((prev) => ({
      ...prev,
      product,
      qty: product === 'DL' ? (prev.qty < 5 ? 10 : prev.qty) : prev.qty > 50 ? 2 : prev.qty || 1,
    }));
    triggerToast(`Item dipilih: ${product === 'DL' ? 'Diamond Lock' : 'Blue Gem Lock'}`);
  };

  const currentRate =
    orderState.product === 'DL' ? settings.price_dl : settings.price_bgl;
  const total = orderState.qty * currentRate;

  const handleMobileCheckout = () => {
    if (!orderState.growId.trim()) {
      triggerToast('Silakan isi GrowID kamu terlebih dahulu!', 'error');
      const growIdEl = document.getElementById('input-growid') as HTMLInputElement | null;
      if (growIdEl) {
        growIdEl.focus();
        growIdEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    if (!orderState.world.trim()) {
      triggerToast('Silakan isi Nama World tujuan lock kamu!', 'error');
      const worldEl = document.getElementById('input-world') as HTMLInputElement | null;
      if (worldEl) {
        worldEl.focus();
        worldEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const checkoutUrl = getCheckoutApiUrl({
      product: orderState.product,
      qty: orderState.qty,
      growId: orderState.growId,
      world: orderState.world,
      notes: orderState.notes,
      payment: orderState.payment,
    });

    window.open(checkoutUrl, '_blank');
    triggerToast('Membuka WhatsApp Admin...', 'success');
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* 1. Navbar with Dynamic Operational Status */}
      <Navbar isStoreOpen={settings.is_store_open} />

      {/* 2. Hero Section with Glowing Floating Showcase */}
      <HeroSection
        settings={settings}
        onSelectProduct={handleSelectProductFromHero}
      />

      {/* 3. Main Workspace / Order Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 lg:pb-8 flex-1 w-full relative z-10">
        {/* Headline Section */}
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8 scroll-mt-24" id="order-section">
          <span className="text-xs font-semibold text-sky-700 uppercase tracking-wider bg-sky-100/80 border border-sky-200/70 px-3 py-1 rounded-full inline-block mb-2">
            Katalog &amp; Kalkulator Pemesanan
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Formulir Pemesanan Lock
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
            Pilih nominal, masukkan GrowID &amp; World, dan selesaikan via WhatsApp.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Product Selection & Inputs (lg:col-span-7) */}
          <div className="lg:col-span-7 w-full">
            <OrderSection
              settings={settings}
              orderState={orderState}
              setOrderState={setOrderState}
            />
          </div>

          {/* Right Column: Order Summary & WhatsApp Checkout (lg:col-span-5) */}
          <div className="lg:col-span-5 w-full mt-2 lg:mt-0">
            <OrderSummary
              settings={settings}
              orderState={orderState}
              onToast={triggerToast}
              onOpenTerms={() => setIsTermsOpen(true)}
            />
          </div>
        </div>

        {/* 4. Safe Trading Guide & FAQ */}
        <SafeTradingGuide />
      </main>

      {/* 5. Modern Footer */}
      <Footer onOpenTerms={() => setIsTermsOpen(true)} />

      {/* 6. Mobile Floating Bottom Bar (Visible on mobile screens < 1024px when scrolled past 380px) */}
      <div
        className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-sky-200/80 px-4 py-2.5 shadow-[0_-4px_25px_rgba(0,0,0,0.08)] flex items-center justify-between gap-3 transition-all duration-300 ease-in-out ${
          showFloatingBar
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-100 p-1 flex items-center justify-center shrink-0 shadow-xs">
            <img
              src={orderState.product === 'DL' ? '/images/dl.png' : '/images/bgl.png'}
              alt={orderState.product}
              className="w-7 h-7 object-contain drop-shadow-xs"
            />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] text-slate-500 font-medium truncate">
              {orderState.qty} {orderState.product} • {orderState.payment}
            </div>
            <div className="text-base font-extrabold text-sky-600 tracking-tight leading-tight">
              {formatRupiah(total)}
            </div>
          </div>
        </div>

        <button
          onClick={handleMobileCheckout}
          className="min-h-[44px] px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-500/25 flex items-center gap-1.5 active:scale-95 shrink-0"
        >
          <MessageCircle className="w-4 h-4 shrink-0" />
          <span>Beli via WhatsApp</span>
        </button>
      </div>

      {/* 7. Terms of Service & Privacy Modal */}
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />

      {/* Toast Notification */}
      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
    </div>
  );
}
