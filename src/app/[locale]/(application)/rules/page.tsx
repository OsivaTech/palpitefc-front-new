import PrizeRulesPage from '@/components/prizerules'
import Title from '@/components/title'

import { getPrizes } from '@/http/prizes'
import { getRules } from '@/http/rules'

export default async function ForgotPasswordPage() {
  const rules = await getRules()
  const prize = await getPrizes()

  return (
    <div className="mx-auto h-full w-full bg-[#00141C]">
      <section className="my-12">
        <Title title="Prêmios e regras" />
      </section>
      <PrizeRulesPage rules={rules} prize={prize} />
    </div>
  )
}
