'use client'

import { TYPE_PREMIUM } from '@/constants'
import { Prizes } from '@/types/Prizes'
import { Rules } from '@/types/Rules'
import { Separator } from '@radix-ui/react-separator'
import { useTranslations } from 'next-intl'

interface PrizeRulesProps {
  prize: Prizes[]
  rules: Rules[]
}

const typePremium = (type: string, prize: string) => {
  if (type === TYPE_PREMIUM.CASH) {
    return `R$ ${prize},00`
  }
  return prize
}
const renderPrizes = (prize: Prizes) => {
  return (
    <>
      <h1 className="mb-3 text-center text-[30px] font-medium">
        {prize.title}
      </h1>
      <div className="mb-7">
        {prize.prizes.map((prize, index) => (
          <div key={index} className="flex justify-center mb-1">
            <h2 className="text-[20px] font-normal">
              {prize.placing}º Colocado: {typePremium(prize.type, prize.prize)}
            </h2>
          </div>
        ))}
      </div>
    </>
  )
}
const renderRules = (rules: Rules) => {
  return (
    <>
      <h1 className="mb-4 text-center text-[30px] font-medium">
        {rules.title}
      </h1>
      <div className="mb-6">
        {rules.rules.map((rule, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center mb-4"
          >
            <h2 className="text-[20px] font-bold text-center">{rule.name}</h2>

            <h2 className="text-[20px] font-normal text-center">
              {rule.complement}
            </h2>

            <h2 className="text-[20px] font-normal text-center">
              {rule.description}
            </h2>
          </div>
        ))}
      </div>
    </>
  )
}

const PrizeRulesPage = ({ prize, rules }: PrizeRulesProps) => {
  const t = useTranslations()
  return (
    <div className="max-w-[500px] mx-auto pt-10 px-6 bg-app-secondary">
      <h1 className="mb-4 text-center text-[16px] font-medium">
        {t('prizerules.component.title')}
      </h1>
      <Separator className="mb-6 border border-white/50" />
      {prize.map((prize) => renderPrizes(prize))}
      {rules.map((rule) => renderRules(rule))}

      <Separator className="mb-10 border border-white/50 " />
    </div>
  )
}

export default PrizeRulesPage
