import { Banner } from '@/components/matchboard/components/banenr'
import { RankingsPage } from '@/components/rankings'
import Title from '@/components/title'
import { getRank } from '@/http/ranking'
import { getTeams } from '@/http/team'

export default async function RankingsView() {
  const rankings = await getRank()
  const teams = await getTeams()

  return (
    <div className="mx-auto max-w-[1400px] h-full">
      <Banner />
      <section className="-mt-14 relative gap-2">
        <Title title="Classificação" />
      </section>
      <RankingsPage data={rankings || []} teams={teams} />
    </div>
  )
}
