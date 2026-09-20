export type StockStatus = 'ready' | 'empty';

export interface StoreSettings {
  price_dl: number;
  price_bgl: number;
  is_store_open: boolean;
  stock_status_dl: StockStatus;
  stock_status_bgl: StockStatus;
}

export type ProductType = 'DL' | 'BGL';

export type PaymentMethod =
  | 'QRIS'
  | 'DANA'
  | 'Bank Transfer'
  | 'E-Wallet Lainnya'
  | 'GOPAY'
  | 'BCA'
  | 'MANDIRI'
  | 'OVO';

export interface OrderState {
  product: ProductType;
  qty: number;
  growId: string;
  world: string;
  notes: string;
  payment: PaymentMethod;
}

export interface OrderCalculation {
  rate: number;
  subtotal: number;
  serviceFee: number;
  total: number;
}
