'use server'
import { get } from '@/lib/api'
import { TeamsEndpoint } from '@/lib/endpoints'
import { TeamResponse } from '@/types/api/responses/TeamsResponse'

export async function getTeams() {
  const response = await get(
    TeamsEndpoint,
    {
      method: 'GET',
      cache: 'no-cache',
    },
    false,
  )
  const teams: TeamResponse = await response.json()

  return teams
}
