'use server'
import { get, post, put } from '@/lib/api'
import { LeaguesEndpoint } from '@/lib/endpoints'
import { League } from '@/types/League'

export async function getLeagues(enabled?: boolean) {
  try {
    const endpoint = enabled
      ? `${LeaguesEndpoint}?enabled=${enabled}`
      : LeaguesEndpoint
    console.log(endpoint)
    const response = await get(endpoint, { cache: 'no-cache' }, false)
    const leagues: League[] = await response.json()

    return leagues || []
  } catch {
    return [] as League[]
  }
}

export async function updateLeague(league: League) {
  try {
    const response = await put(
      `${LeaguesEndpoint}/${league.id}`,
      {
        body: JSON.stringify(league),
        method: 'PUT',
      },
      true,
    )

    return response.ok
  } catch {
    return false
  }
}

export async function updateDatabase(season: number) {
  try {
    const response = await post(
      `${LeaguesEndpoint}/update-database?season=${season}`,
      {},
      true,
    )

    return response.ok
  } catch {
    return false
  }
}
