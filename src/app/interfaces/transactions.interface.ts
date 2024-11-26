export interface Transaction {
  movieId: string;
  price: number;
  email: string;
  transactionType: TransactionType;
  paymentMethod: PaymentMethod;
}

export enum TransactionType {
  RENTAL = 'RENTAL',
  PURCHASE = 'PURCHASE',
}

export enum PaymentMethod {
  PAYPAL = 'PAYPAL',
  AMAZON = 'AMAZON',
  GOOGLE_WALLET = 'GOOGLE_WALLET',
  APPLE_PAY = 'APPLE_PAY',
}
