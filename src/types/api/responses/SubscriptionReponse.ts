type Pix = {
  expirationDate: string
  copyAndPaste: string
  qrCode: {
    imagePng: string
  }
}
type Card = {
  cardBrand: string
  lastDigits: string
}
export type PaymentDetails = {
  method: string
  pix: Pix
  card: Card
}
export type SubscriptionResponse = {
  referenceId: string
  status: string
  nextInvoice: string
  paymentDetails: PaymentDetails
}

export type MakeSubscriptionResponse = {
  referenceId: string
  pixDetails: Pix
  cardDetails: Card
}
