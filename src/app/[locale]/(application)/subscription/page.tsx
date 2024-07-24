import Subscription from '@/components/subscription'

import SubscriptionInfo from '@/components/subscriptionInfo'

import { getSubscription } from '@/http/subscription'

export default async function SubscriptionPage() {
  const result = await getSubscription()

  return (
    <div className="max-w-[500px] mx-auto pt-10 px-3 pb-12 bg-app-secondary">
      {result ? <SubscriptionInfo /> : <Subscription />}
    </div>
  )
}
