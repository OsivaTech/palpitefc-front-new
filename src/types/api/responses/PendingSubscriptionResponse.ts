import { PaymentDetails } from '@/types/api/responses/SubscriptionReponse'

export type PendingSubscription = {
  id: number
  userId: number
  planId: number
  orderRef: string
  status: string
  paymentDetails: PaymentDetails
}
