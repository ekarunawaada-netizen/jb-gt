import { ProductType, PaymentMethod } from '@/types';

export interface OrderMessageParams {
  product: ProductType;
  qty: number;
  rate?: number;
  total: number;
  growId: string;
  world: string;
  notes?: string;
  payment: PaymentMethod | string;
  invoiceNumber?: string;
  orderTime?: string;
}

export interface WhatsappUrlParams extends OrderMessageParams {
  phone?: string;
}

/**
 * Format angka ke format mata uang Rupiah (contoh: Rp 8.500)
 */
export function formatRupiah(num: number): string {
  return 'Rp ' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/**
 * Format tanggal dan waktu pemesanan (contoh: 20 Sep 2026, 10:07 WITA)
 */
export function formatOrderDateTime(date = new Date()): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const offsetHours = -date.getTimezoneOffset() / 60;
  let tz = 'WIB';
  if (offsetHours === 8) {
    tz = 'WITA';
  } else if (offsetHours === 9) {
    tz = 'WIT';
  }

  return `${day} ${month} ${year}, ${hours}:${minutes} ${tz}`;
}

/**
 * Membersihkan dan menstandardisasi nomor WhatsApp:
 * - Menghilangkan spasi, tanda minus (-), kurung, simbol '+'
 * - Mengubah awalan '0' menjadi '62'
 * - Jika diawali '8', ditambahkan '62'
 * - Memiliki fallback jika nomor kosong
 */
export function cleanPhoneNumber(
  phone?: string,
  defaultPhone = ''
): string {
  if (!phone || typeof phone !== 'string') {
    return defaultPhone;
  }

  // Hapus semua karakter non-digit
  let cleaned = phone.replace(/\D/g, '');

  if (!cleaned) {
    return defaultPhone;
  }

  // Jika berawalan '0', ganti dengan '62'
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.slice(1);
  } else if (cleaned.startsWith('8')) {
    // Jika format lokal tanpa nol (contoh: 81234567890)
    cleaned = '62' + cleaned;
  }

  return cleaned;
}

const PAYMENT_LABELS: Record<string, string> = {
  QRIS: 'QRIS (All Payment)',
  DANA: 'DANA (Transfer Sesama DANA)',
  'Bank Transfer': 'Bank Transfer (BCA / Mandiri)',
  'E-Wallet Lainnya': 'E-Wallet Lainnya (GoPay / OVO / ShopeePay)',
  BCA: 'Bank Transfer (BCA)',
  MANDIRI: 'Bank Transfer (Mandiri)',
  GOPAY: 'GoPay (Instan)',
  OVO: 'OVO (Cash Instant)',
};

export function getPaymentLabel(payment: PaymentMethod | string): string {
  return PAYMENT_LABELS[payment] || payment;
}

/**
 * Membuat pesan WhatsApp dengan format invoice resmi PojokDL
 */
export function buildOrderMessage({
  product,
  qty,
  rate,
  total,
  growId,
  world,
  notes,
  payment,
  invoiceNumber,
  orderTime,
}: OrderMessageParams): string {
  const invoiceNo = invoiceNumber ? invoiceNumber.replace('#PD-', '').replace('#GT-', '') : '98421';
  const timeString = orderTime || formatOrderDateTime();
  const productName =
    product === 'DL' ? `${qty} Diamond Lock (DL)` : `${qty} Blue Gem Lock (BGL)`;
  const unitPrice = rate || (qty > 0 ? Math.round(total / qty) : 0);
  const totalRupiah = formatRupiah(total);
  const cleanGrowId = growId.trim();
  const cleanWorld = world.trim().toUpperCase();
  const paymentLabel = getPaymentLabel(payment);

  const notesSection = notes && notes.trim() ? `\n• Catatan       : ${notes.trim()}` : '';

  return (
    `━━━━━━━━━━━━━━━━━━━━━━\n` +
    `   💎 𝗣𝗢𝗝𝗢𝗞𝗗𝗟 𝗜𝗡𝗩𝗢𝗜𝗖𝗘 💎\n` +
    `━━━━━━━━━━━━━━━━━━━━━━\n` +
    `📋 No. Invoice  : #PD-${invoiceNo}\n` +
    `⏰ Waktu Order  : ${timeString}\n\n` +
    `📦 𝗥𝗜𝗡𝗖𝗜𝗔𝗡 𝗣𝗘𝗦𝗔𝗡𝗔𝗡\n` +
    `• Produk        : ${productName}\n` +
    `• Harga Satuan  : ${formatRupiah(unitPrice)} / ${product}\n` +
    `• Total Tagihan : ${totalRupiah}\n\n` +
    `👤 𝗗𝗔𝗧𝗔 𝗔𝗞𝗨𝗡 𝗚𝗥𝗢𝗪𝗧𝗢𝗣𝗜𝗔\n` +
    `• GrowID        : ${cleanGrowId}\n` +
    `• Nama World    : ${cleanWorld}\n` +
    `• Drop Target   : Donation / Display Box (Ready)${notesSection}\n\n` +
    `💳 𝗝𝗔𝗟𝗨𝗥 𝗣𝗘𝗠𝗕𝗔𝗬𝗔𝗥𝗔𝗡\n` +
    `• Metode        : ${paymentLabel}\n` +
    `━━━━━━━━━━━━━━━━━━━━━━\n` +
    `Halo Min, saya mau selesaikan pesanan di atas. Tolong kirimkan kode QRIS / detail rekening pembayarannya ya. Terima kasih!\n` +
    `━━━━━━━━━━━━━━━━━━━━━━`
  );
}

/**
 * Helper generator WhatsApp URL lengkap dengan sanitasi nomor & encoding pesan
 */
export function generateWhatsappUrl(params: WhatsappUrlParams): {
  whatsappUrl: string;
  message: string;
  cleanPhone: string;
} {
  const cleanPhone = cleanPhoneNumber(params.phone);
  const message = buildOrderMessage(params);
  const encodedText = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedText}`;

  return {
    whatsappUrl,
    message,
    cleanPhone,
  };
}

/**
 * Helper untuk membuat URL API checkout yang aman (nomor admin diproses di server Vercel)
 */
export function getCheckoutApiUrl(params: {
  product: ProductType;
  qty: number;
  growId: string;
  world: string;
  notes?: string;
  payment: PaymentMethod | string;
  invoiceNumber?: string;
}): string {
  const query = new URLSearchParams({
    product: params.product,
    qty: params.qty.toString(),
    growId: params.growId.trim(),
    world: params.world.trim(),
    payment: params.payment,
  });
  if (params.notes && params.notes.trim()) {
    query.set('notes', params.notes.trim());
  }
  if (params.invoiceNumber) {
    query.set('invoiceNumber', params.invoiceNumber);
  }
  return `/api/checkout?${query.toString()}`;
}

