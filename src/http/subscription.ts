'use server'
import { del, get, post } from '@/lib/api'
import { Subscription } from '@/lib/endpoints'
import { SubscriptionResponse } from '@/types/api/responses/SubscriptionReponse'

import { SubscriptionRequest } from '@/types/api/resquests/SubscriptionRequest'

export async function getSubscription() {
  try {
    const response = await get(
      Subscription,
      {
        cache: 'no-cache',
      },
      true,
    )
    const mySubscription: SubscriptionResponse = await response?.json()

    return mySubscription
  } catch (error) {
    return null
  }
}

export async function makeSubscription(subscription: SubscriptionRequest) {
  try {
    await post(
      Subscription,
      {
        body: JSON.stringify(subscription),
        method: 'POST',
      },
      true,
    )
    return true
  } catch (error) {
    console.error('Error on makeSubscription', error)
    return false
  }
}

export async function deleteSubscription() {
  try {
    await del(Subscription, {}, true)
    return true
  } catch (error) {
    console.error('Error on deleteSubscription', error)
    return false
  }
}
