'use server'
import { del, get, post } from '@/lib/api'
import { Subscription } from '@/lib/endpoints'
import { SubscriptionResponse } from '@/types/api/responses/SubscriptionReponse'

import { SubscriptionRequest } from '@/types/api/resquests/SubscriptionRequest'

export async function getSubscription() {
  const response = await get(
    Subscription,
    {
      cache: 'no-cache',
    },
    true,
  )
  if (response.status < 200 || response.status > 299) {
    return false
  }
  const mySubscription: SubscriptionResponse = await response?.json()
  return mySubscription
}

export async function makeSubscription(subscription: SubscriptionRequest) {
  const response = await post(
    Subscription,
    {
      body: JSON.stringify(subscription),
      method: 'POST',
    },
    true,
  )
  if (response.status < 200 || response.status > 299) {
    return false
  }
  return true
}

export async function deleteSubscription() {
  const response = await del(Subscription, {}, true)

  if (response.status < 200 || response.status > 299) {
    return false
  }
  return true
}
