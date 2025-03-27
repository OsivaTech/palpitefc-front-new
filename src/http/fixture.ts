'use server'
import { get } from '@/lib/api'
import { FixturesEndpoint, FixturesFeaturedEndpoint } from '@/lib/endpoints'
import { FixtureResponse } from '@/types/api/responses/FixtureResponse'
import { FixturesByLeague } from '@/types/Fixture'

export async function getFixture() {
  try {
    const response = await get(
      FixturesEndpoint,
      {
        cache: 'no-cache',
      },
      false,
    )

    const fixture: FixtureResponse = await response.json()
    if (!fixture) {
      return [] as FixturesByLeague
    }

    const groupedFixtures = fixture.reduce((acc, fixture) => {
      const leagueId = fixture.league.id
      if (!acc[leagueId]) {
        acc[leagueId] = {
          leagueName: fixture.league.name,
          fixtures: [],
        }
      }
      acc[leagueId].fixtures.push(fixture)
      return acc
    }, {} as FixturesByLeague)

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
