import LeaguesManagement from '@/components/admin/leagues'
import { getLeagues } from '@/http/league'

export default async function LeaguesManagementPage() {
  const leagues = await getLeagues()

  return (
    <div className="mx-auto h-full w-full bg-[#2D3745]">
      <LeaguesManagement leagues={leagues} />
    </div>
  )
}
