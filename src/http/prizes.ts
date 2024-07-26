'use server'
import { get } from '@/lib/api'
import { PrizesEndPoint } from '@/lib/endpoints'
import { Prizes } from '@/types/Prizes'

export async function getPrizes() {
  try {
    const response = await get(PrizesEndPoint, { cache: 'no-cache' }, false)
    const prizes: Prizes[] = await response.json()

    return prizes || []
  } catch {
    return [] as Prizes[]
  }
}
