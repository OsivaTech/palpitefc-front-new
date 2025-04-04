import { RankingsPage } from '@/components/rankings'
import Title from '@/components/title'
import { getRank } from '@/http/ranking'
import { getTeams } from '@/http/team'

export default async function RankingsView() {
  const rankings = await getRank()
  const teams = await getTeams()

  return (
    <div className="mx-auto h-full w-full bg-[#00141C]">
      <section className="my-12">
        <Title title="Classificação" />
      </section>
      <RankingsPage data={rankings || []} teams={teams} />
    </div>
  )
}
