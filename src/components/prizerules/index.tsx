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
const getMedal = (place: number) => {
  switch (place) {
    case 1:
      return '🥇'
    case 2:
      return '🥈'
    case 3:
      return '🥉'
    default:
      return '🎖️'
  }
}

const renderPrizes = (prize: Prizes) => {
  return (
    <>
      <h1 className="mb-3 text-lg font-medium">{prize.title}</h1>
      <div className="mb-7">
        {prize.prizes.map((prize, index) => (
          <div key={index} className="flex mb-1">
            <h2 className="text-sm font-normal">
              {getMedal(prize.placing)} {typePremium(prize.type, prize.prize)}{' '}
              para o {prize.placing}º lugar
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
      <h1 className="mb-4 text-center text-xl font-medium">{rules.title}</h1>
      <div className="mb-6">
        {rules.rules.map((rule, index) => (
          <div key={index} className="flex flex-col mb-4 gap-1">
            <h2 className="text-lg font-medium">{rule.name}</h2>
            <h2 className="text-sm font-normal">{rule.description}</h2>
            <h2 className="text-base font-medium">{rule.complement}</h2>
          </div>
        ))}
      </div>
    </>
  )
}

const renderHowItWorks = (howItWorks: Rules) => {
  const groupedRules = howItWorks.rules.reduce(
    (acc, rule) => {
      acc[rule.name] = acc[rule.name] || []
      acc[rule.name].push(rule.description)
      return acc
    },
    {} as Record<string, string[]>,
  )

  return (
    <>
      <h1 className="mb-4 text-center text-xl font-medium">
        {howItWorks.title}
      </h1>
      <div className="mb-7">
        {Object.entries(groupedRules).map(([name, descriptions], index) => (
          <div key={index} className="flex flex-col mb-4 gap-1">
            <h2 className="text-lg font-medium">{name}</h2>
            {descriptions.map((description, i) => (
              <h2 key={i} className="text-sm font-normal mb-1">
                {description}
              </h2>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

const PrizeRulesPage = ({ prize, rules }: PrizeRulesProps) => {
  const t = useTranslations()
  return (
    <div className="max-w-[500px] mx-auto pt-4 px-2">
      <h1 className="mb-4 text-lg font-bold text-app-secondary">
        {t('prizerules.component.title')}
      </h1>
      <Separator className="mb-6 border border-white/50" />
      {prize.map((prize) => renderPrizes(prize))}
      <Separator className="my-6 border border-white/50 " />
      {rules
        .filter((r) => r.type === 'howItWorks')
        .map((rule) => renderHowItWorks(rule))}
      <Separator className="my-6 border border-white/50 " />
      {rules
        .filter((r) => r.type !== 'howItWorks')
        .map((rule) => renderRules(rule))}
      <Separator className="my-6 border border-white/50 " />
    </div>
  )
}

export default PrizeRulesPage
