'use server'
import { LEAGUE_CATEGORY } from '@/constants'
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

    const groupedFixtures = fixture.reduce((acc, fixture) => {
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
