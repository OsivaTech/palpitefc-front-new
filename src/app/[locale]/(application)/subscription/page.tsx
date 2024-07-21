import Subscription from '@/components/subscription'
import SubscriptionCancel from '@/components/subscriptionCancel'
import { getSubscription } from '@/http/subscription'

export default async function SubscriptionPage() {
  const result = await getSubscription()
  console.log('getSubscription', result)
  return (
    <div className="max-w-[500px] mx-auto pt-10 px-3 pb-12 bg-app-secondary">
      <Subscription />
    </div>
  )
}
