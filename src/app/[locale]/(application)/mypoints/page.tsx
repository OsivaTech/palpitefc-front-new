import MyPointsPage from '@/components/mypoints'
import { getLeagues } from '@/http/league'
import { getMyPoints } from '@/http/points'

export default async function ForgotPasswordPage() {
  const leagues = await getLeagues(true)
  const points = await getMyPoints()

  return (
    <div className="mx-auto h-full w-full bg-app-secondary">
      <MyPointsPage leagues={leagues} points={points} />
    </div>
  )
}
