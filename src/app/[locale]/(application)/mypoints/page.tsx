import MyPointsPage from '@/components/mypoints'
import { getLeagues } from '@/http/league'
import { getMyPoints } from '@/http/points'

export default async function ForgotPasswordPage() {
  const leagues = await getLeagues()
  const points = await getMyPoints()

  return (
    <div className="max-w-[500px] mx-auto pt-10 px-3 pb-12 bg-app-secondary">
      <MyPointsPage leagues={leagues} points={points} />
    </div>
  )
}
