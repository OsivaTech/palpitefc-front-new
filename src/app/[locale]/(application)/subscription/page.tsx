import Subscription from '@/components/subscription'

import SubscriptionInfo from '@/components/subscriptionInfo'

import { getSubscription } from '@/http/subscription'

export default async function SubscriptionPage() {
  const result = await getSubscription()

  return (
    <div className="mx-auto bg-app-secondary w-full h-full">
      {result ? <SubscriptionInfo infoCard={result} /> : <Subscription />}
    </div>
  )
}
