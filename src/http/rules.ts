'use server'
import { get } from '@/lib/api'
import { RulesEndPoint } from '@/lib/endpoints'
import { Rules } from '@/types/Rules'

export async function getRules() {
  try {
    const response = await get(RulesEndPoint, { cache: 'no-cache' }, false)
    const rules: Rules[] = await response.json()

    return rules || []
  } catch {
    return [] as Rules[]
  }
}
