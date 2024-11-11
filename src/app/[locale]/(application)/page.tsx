import { Banner } from '@/components/banner'
import { HomeContainer } from '@/components/home-container'
import { MatchBoard } from '@/components/matchboard'
import { getAdvertisament } from '@/http/advertisement'
import { getFixture } from '@/http/fixture'
import { getMyGuesses } from '@/http/gesses'
import { getLeagues } from '@/http/league'
import { getNews } from '@/http/news'
import { getRank } from '@/http/ranking'
import { getTeams } from '@/http/team'

export default async function LandingPage() {
  const fixtures = await getFixture()
  const leagues = await getLeagues(true)
  const guess = await getMyGuesses()
  const news = await getNews()
  const rank = await getRank()
  const advertisament = await getAdvertisament()
  const teams = await getTeams()

  return (
    <HomeContainer>
      {advertisament && <Banner items={advertisament} />}
      <MatchBoard
        fixtures={fixtures}
        leagues={leagues}
        guess={guess}
        news={news}
        rankings={rank}
        advertisament={advertisament}
        teams={teams}
      />
    </HomeContainer>
  )
}
