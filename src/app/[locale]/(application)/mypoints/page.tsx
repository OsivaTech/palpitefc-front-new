import MyPointsPage from '@/components/mypoints'
import { getMyGuesses } from '@/http/gesses'
import { getLeagues } from '@/http/league'
import { getMyPoints } from '@/http/points'

export default async function ForgotPasswordPage() {
  const leagues = await getLeagues()
  const guess = await getMyGuesses()
  const points = await getMyPoints()

  return (
    <div className="max-w-[500px] mx-auto pt-10 px-3 bg-app-secondary">
      <MyPointsPage leagues={leagues} guess={guess} points={points} />
    </div>
  )
}
