import TeamsManagement from '@/components/admin/teams'
import { getTeams } from '@/http/team'

export default async function LeaguesManagementPage() {
  const teams = await getTeams()

  return (
    <div className="mx-auto h-full w-full bg-[#2D3745]">
      <TeamsManagement teams={teams} />
    </div>
  )
}
