'use client'
import { Button } from '@/components/ui/button'
import { useLocale } from 'next-intl'
import { ReactNode, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { APP_LINKS } from '@/constants'
import { Home } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NewsSvg } from '@/components/assets/svg/news'
import { QuizSvg } from '@/components/assets/svg/quiz'
import { RankingSvg } from '@/components/assets/svg/ranking'
import { PointsSvg } from '@/components/assets/svg/points'

export const BottonMenu = () => {
  const router = useRouter()
  const locale = useLocale()
  const [active, setActive] = useState<string>('home')

  const handleOpenHome = () => {
    router.push(`/${locale}/`)
    setActive('home')
  }

  const handleOpenPoints = () => {
    router.push(`/${locale}/${APP_LINKS.MYPOINTS()}`)
    setActive('points')
  }

  const handleOpenNews = () => {
    router.push(`/${locale}/${APP_LINKS.NEWS()}`)
    setActive('news')
  }

  const handleOpenQuiz = () => {
    router.push(`/${locale}/${APP_LINKS.POLLS()}`)
    setActive('quiz')
  }

  const handleOpenRanking = () => {
    router.push(`/${locale}/${APP_LINKS.RANKING()}`)
    setActive('ranking')
  }
  const isRegisterPage = usePathname().includes(APP_LINKS.SIGNUP())
  return (
    <div
      className={cn(
        'fixed bottom-4 left-1/2 transform -translate-x-1/2',
        'flex md:hidden items-center justify-center text-center',
        'max-w-[425px] gap-3 mx-auto py-1 w-full bg-gradient-to-r from-[#00FF55] to-[#00AE3A] rounded-full px-4 shadow-lg', // Adiciona sombra para destacar
        isRegisterPage && 'hidden',
      )}
    >
      <BottomMenuItem
        icon={<Home size={30} />}
        label="Início"
        onClick={handleOpenHome}
        active={active === 'home'}
      />
      <BottomMenuItem
        icon={<PointsSvg color={active === 'points' ? 'white' : 'black'} />}
        label="Pontos"
        onClick={handleOpenPoints}
        active={active === 'points'}
      />
      <BottomMenuItem
        icon={<NewsSvg color={active === 'news' ? 'white' : 'black'} />}
        label="Notícias"
        onClick={handleOpenNews}
        active={active === 'news'}
      />
      <BottomMenuItem
        icon={<QuizSvg color={active === 'quiz' ? 'white' : 'black'} />}
        label="Enquetes"
        onClick={handleOpenQuiz}
        active={active === 'quiz'}
      />
      <BottomMenuItem
        icon={<RankingSvg color={active === 'ranking' ? 'white' : 'black'} />}
        label="Classificação"
        onClick={handleOpenRanking}
        active={active === 'ranking'}
      />
    </div>
  )
}

type BottomMenuItemProps = {
  icon: ReactNode
  label: string
  onClick: () => void
  disabled?: boolean
  active?: boolean
}

export const BottomMenuItem = ({
  icon,
  label,
  onClick,
  disabled = false,
  active = false,
}: BottomMenuItemProps) => {
  return (
    <Button
      className={cn(
        'rounded-full h-[60px] w-[60px] border-none bg-transparent',
        active && 'bg-app-background',
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <div
        className={cn(
          'flex flex-col items-center justify-center w-full',
          active && 'text-white',
          !active && 'text-app-background',
          'svg:fill-red-500',
        )}
      >
        {icon}
        <span className={cn('text-[9px] text-wrap')}>{label}</span>
      </div>
    </Button>
  )
}
