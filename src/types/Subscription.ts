export type Subscription = {
  card?: {
    encrypted: string
    securityCode: string
  }
  paymentMethod?: string
  planRef?: string
}
