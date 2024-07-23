import Subscription from '@/components/subscription'

import SubscriptionInfo from '@/components/subscriptionInfo'
import { getSubscription } from '@/http/subscription'

export default async function SubscriptionPage() {
  const result = await getSubscription()
  console.log('getSubscription', result)
  const assinado = true
  return (
    <div className="max-w-[500px] mx-auto pt-10 px-3 pb-12 bg-app-secondary">
      {assinado ? <SubscriptionInfo /> : <Subscription />}
    </div>
  )
}
