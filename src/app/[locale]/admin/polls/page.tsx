import PollsManagement from '@/components/admin/polls'
import { getPolls } from '@/http/poll'

export default async function PollsManagementPage() {
  const polls = await getPolls(true)

  return (
    <div className="mx-auto h-full w-full bg-[#2D3745]">
      <PollsManagement polls={polls} />
    </div>
  )
}
