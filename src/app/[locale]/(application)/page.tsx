import { HomeContainer } from '@/components/home-container'
import { MatchBoard } from '@/components/matchboard'
import { getFixture } from '@/http/fixture'
import { getMyGuesses } from '@/http/gesses'
import { getLeagues } from '@/http/league'

export default async function LandingPage() {
  const fixtures = await getFixture()
  const leagues = await getLeagues(true)
  const guess = await getMyGuesses()

  return (
    <HomeContainer>
      <MatchBoard fixtures={fixtures} leagues={leagues} guess={guess} />
    </HomeContainer>
  )
}
