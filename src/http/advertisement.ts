'use server'

import { get, post, put } from '@/lib/api'
import { AdvertisementEndpoint } from '@/lib/endpoints'
import { Advertisement } from '@/types/Advertisement'

export async function getAdvertisement(enabled?: boolean) {
  try {
    const endpoint = enabled
      ? `${AdvertisementEndpoint}?enabled=${enabled}`
      : AdvertisementEndpoint
    const response = await get(endpoint, {}, false)
    const advertisement: Advertisement[] = await response.json()
    return advertisement
  } catch (error) {
    return []
  }
}

export async function getEnabledAdvertisement() {
  try {
    const response = await get(`${AdvertisementEndpoint}/enabled`, {}, false)
    const advertisement: Advertisement[] = await response.json()
    return advertisement
  } catch (error) {
    return []
  }
}

export async function createAdvertisement(advertisement: Advertisement) {
  try {
    const response = await post(
      AdvertisementEndpoint,
      {
        method: 'POST',
        body: JSON.stringify(advertisement),
      },
      true,
    )
    return response.ok
  } catch (error) {
    return false
  }
}

export async function updateAdvertisement(advertisement: Advertisement) {
  try {
    console.log(JSON.stringify(advertisement))
    const response = await put(
      `${AdvertisementEndpoint}/${advertisement.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(advertisement),
      },
      true,
    )
    return response.ok
  } catch (error) {
    return false
  }
}
