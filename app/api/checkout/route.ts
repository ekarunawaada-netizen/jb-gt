import { NextRequest, NextResponse } from 'next/server';
import { generateWhatsappUrl } from '@/lib/whatsapp';
import { DEFAULT_STORE_SETTINGS } from '@/lib/constants';
import { ProductType } from '@/types';

export const dynamic = 'force-dynamic';

/**
 * Endpoint Server-Side Checkout
 * Nomor WhatsApp admin (ADMIN_WHATSAPP) diambil langsung dari Environment Variables server Vercel.
 * Tidak ada kebocoran nomor WhatsApp di client-side JS bundle saat browser melakukan inspect element.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const product = (searchParams.get('product') || 'DL') as ProductType;
  const qty = parseInt(searchParams.get('qty') || '10', 10);
  const growId = searchParams.get('growId') || '';
  const world = searchParams.get('world') || '';
  const notes = searchParams.get('notes') || undefined;
  const payment = searchParams.get('payment') || 'QRIS';
  const invoiceNumber = searchParams.get('invoiceNumber') || undefined;

  // Baca nomor admin WhatsApp dari Environment Variable server Vercel
  const adminPhone = process.env.ADMIN_WHATSAPP || process.env.NEXT_PUBLIC_ADMIN_WHATSAPP;

  if (!adminPhone) {
    return new NextResponse(
      'ADMIN_WHATSAPP is not configured in Vercel Environment Variables.',
      { status: 500 }
    );
  }

  const rate =
    product === 'DL' ? DEFAULT_STORE_SETTINGS.price_dl : DEFAULT_STORE_SETTINGS.price_bgl;
  const total = qty * rate;

  const { whatsappUrl } = generateWhatsappUrl({
    phone: adminPhone,
    product,
    qty,
    rate,
    total,
    growId,
    world,
    notes,
    payment,
    invoiceNumber,
  });

  return NextResponse.redirect(whatsappUrl, 307);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const product = (body.product || 'DL') as ProductType;
    const qty = parseInt(body.qty || '10', 10);
    const growId = body.growId || '';
    const world = body.world || '';
    const notes = body.notes || undefined;
    const payment = body.payment || 'QRIS';
    const invoiceNumber = body.invoiceNumber || undefined;

    const adminPhone = process.env.ADMIN_WHATSAPP || process.env.NEXT_PUBLIC_ADMIN_WHATSAPP;

    if (!adminPhone) {
      return NextResponse.json(
        { error: 'ADMIN_WHATSAPP is not configured in environment variables.' },
        { status: 500 }
      );
    }

    const rate =
      product === 'DL' ? DEFAULT_STORE_SETTINGS.price_dl : DEFAULT_STORE_SETTINGS.price_bgl;
    const total = qty * rate;

    const { whatsappUrl, message } = generateWhatsappUrl({
      phone: adminPhone,
      product,
      qty,
      rate,
      total,
      growId,
      world,
      notes,
      payment,
      invoiceNumber,
    });

    return NextResponse.json({
      success: true,
      whatsappUrl,
      message,
    });
  } catch {
    return NextResponse.json(
      { error: 'Gagal memproses pesanan checkout.' },
      { status: 400 }
    );
  }
}
