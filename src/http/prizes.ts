'use server'
import { get } from '@/lib/api'
import { PrizesEndPoint } from '@/lib/endpoints'
import { PrizesResponse } from '@/types/api/responses/PrizesResponse'

export async function getPrizes() {
  try {
    const response = await get(PrizesEndPoint, { cache: 'no-cache' }, false)
    const prizes: PrizesResponse[] = await response.json()

    return prizes || []
  } catch {
    return [] as PrizesResponse[]
  }
}
