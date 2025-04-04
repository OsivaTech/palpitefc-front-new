'use server'
import { get, put } from '@/lib/api'
import { TeamsEndpoint } from '@/lib/endpoints'
import { TeamResponse } from '@/types/api/responses/TeamsResponse'
import { Team } from '@/types/Team'

export async function getTeams() {
  const response = await get(
    TeamsEndpoint,
    {
      method: 'GET',
    },
    false,
  )
  const teams: TeamResponse = await response.json()

  return teams
}

export async function updateTeam(team: Team) {
  try {
    const response = await put(
      `${TeamsEndpoint}/${team.id}`,
      {
        body: JSON.stringify(team),
        method: 'PUT',
      },
      true,
    )

    return response.ok
  } catch {
    return false
  }
}
