import PrizeRulesPage from '@/components/prizerules'

import { getPrizes } from '@/http/prizes'
import { getRules } from '@/http/rules'

export default async function ForgotPasswordPage() {
  const rules = await getRules()
  const prize = await getPrizes()

  return (
    <div className="mx-auto h-full">
      <PrizeRulesPage rules={rules} prize={prize} />
    </div>
  )
}
