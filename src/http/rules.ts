'use server'
import { get } from '@/lib/api'
import { RulesEndPoint } from '@/lib/endpoints'
import { RulesResponse } from '@/types/api/responses/RulesResponse'

export async function getRules() {
  try {
    const response = await get(RulesEndPoint, { cache: 'no-cache' }, false)
    const rules: RulesResponse[] = await response.json()

    return rules || []
  } catch {
    return [] as RulesResponse[]
  }
}
