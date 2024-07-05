import { get } from '@/lib/api'
import { AdvertisamentEndpoint } from '@/lib/endpoints'
import { Advertisament } from '@/types/Advertisament'

export const getAdvertisament = async () => {
  try {
    const response = await get(AdvertisamentEndpoint, {}, false)
    const advertisament: Advertisament[] = await response.json()
    return advertisament
  } catch (error) {
    return []
  }
}
