import MyPointsPage from '@/components/mypoints'
import Title from '@/components/title'
import { getLeagues } from '@/http/league'
import { getMyPoints } from '@/http/points'

export default async function ForgotPasswordPage() {
  const leagues = await getLeagues(true)
  const points = await getMyPoints()

  return (
    <div className="mx-auto h-full w-full bg-[#00141C]">
      <section className="my-12">
        <Title title="Meus pontos" />
      </section>
      <MyPointsPage leagues={leagues} points={points} />
    </div>
  )
}
