import { StoreSettings } from '@/types';

/**
 * Konfigurasi statis toko (Frontend-Only)
 * Ubah nilai di sini untuk memperbarui harga, status toko, dan nomor WhatsApp admin.
 */
export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  price_dl: 850,
  price_bgl: 84000,
  is_store_open: true,
  stock_status_dl: 'ready',
  stock_status_bgl: 'ready',
};
