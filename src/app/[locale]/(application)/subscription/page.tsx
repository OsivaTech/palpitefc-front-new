import PendingPayment from '@/components/pendingPayment'
import Subscription from '@/components/subscription'

import SubscriptionInfo from '@/components/subscriptionInfo'

import { getPendingPayment, getSubscription } from '@/http/subscription'

export default async function SubscriptionPage() {
  const result = await getSubscription()
  const pendingPayment = await getPendingPayment()

  if (pendingPayment) {
    return (
      <div className="mx-auto bg-app-secondary w-full h-full">
        <PendingPayment pendingPayment={pendingPayment} />
      </div>
    )
  }

  return (
    <div className="mx-auto bg-app-secondary w-full h-full">
      {result ? <SubscriptionInfo infoCard={result} /> : <Subscription />}
    </div>
  )
}
