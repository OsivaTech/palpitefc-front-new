import { RankingsPage } from '@/components/rankings'
import { getRank } from '@/http/ranking'
import { getTeams } from '@/http/team'

export default async function RankingsView() {
  const rankings = await getRank()
  const teams = await getTeams()

  return (
    <div className="mx-auto bg-[#00141C] w-full h-full">
      <RankingsPage data={rankings || []} teams={teams} />
    </div>
  )
}
