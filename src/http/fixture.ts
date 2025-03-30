'use server'
import { LEAGUE_CATEGORY, MATCH_STATUS } from '@/constants'
import { get } from '@/lib/api'
import {
  FixturesEndpoint,
  FixturesFeaturedEndpoint,
  FixturesInLiveEndpoint,
} from '@/lib/endpoints'
import { FixtureResponse } from '@/types/api/responses/FixtureResponse'
import { FixtureByLeagueCategory } from '@/types/Fixture'

export async function getFixture(date?: string) {
  try {
    const response = await get(
      date ? `${FixturesEndpoint}?date=${date}` : FixturesEndpoint,
      {
        cache: 'no-cache',
      },
      false,
    )

    const fixture: FixtureResponse = await response.json()
    if (!fixture) {
      return {} as FixtureByLeagueCategory
    }

    // Ordenar os fixtures por status e data
    const sortedFixtures = fixture.sort((a, b) => {
      const statusOrder = [
        ...MATCH_STATUS.IN_PLAY,
        ...MATCH_STATUS.SCHEDULED,
        ...MATCH_STATUS.FINISHED,
      ]

      const statusA =
        statusOrder.indexOf(a.status) !== -1
          ? statusOrder.indexOf(a.status)
          : statusOrder.length
      const statusB =
        statusOrder.indexOf(b.status) !== -1
          ? statusOrder.indexOf(b.status)
          : statusOrder.length

      if (statusA !== statusB) {
        return statusA - statusB
      }

      // Ordenar por data (ascendente) se os status forem iguais
      return new Date(a.start).getTime() - new Date(b.start).getTime()
    })

    const groupedFixtures = sortedFixtures.reduce((acc, fixture) => {
      const category = fixture.league.category
        .type as unknown as LEAGUE_CATEGORY
      const leagueId = fixture.league.id

      // Initialize category if it doesn't exist
      if (!acc[category]) {
        acc[category] = {
          leagueDescription: fixture.league.category.description,
          leagues: {},
        }
      }

      // Initialize league within category if it doesn't exist
      if (!acc[category].leagues[leagueId]) {
        acc[category].leagues[leagueId] = {
          leagueName: fixture.league.name,
          fixtures: [],
        }
      }

      // Add fixture to the appropriate league
      acc[category].leagues[leagueId].fixtures.push(fixture)
      return acc
    }, {} as FixtureByLeagueCategory)

    return groupedFixtures
  } catch {
    return null
  }
}

export async function getFixtureFeatured() {
  try {
    const response = await get(
      FixturesFeaturedEndpoint,
      {
        cache: 'no-cache',
      },
      false,
    )

    const fixture: FixtureResponse = await response.json()
    if (!fixture) {
      return [] as FixtureResponse
    }

    return fixture
  } catch {
    return null
  }
}

export async function getInLiveFixtures() {
  try {
    const response = await get(
      FixturesInLiveEndpoint,
      {
        cache: 'no-cache',
      },
      false,
    )

    const fixture: FixtureResponse = await response.json()
    if (!fixture) {
      return [] as FixtureResponse
    }

    return fixture
  } catch {
    return null
  }
}
