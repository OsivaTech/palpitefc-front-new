'use client'
import { Button } from '@/components/ui/button'
import { useLocale } from 'next-intl'
import { ReactNode, useState } from 'react'
import Image from 'next/image'
import { useAuth } from '@/context/useAuth'
import { useRouter } from 'next/navigation'
import { APP_LINKS } from '@/constants'
import { Home } from 'lucide-react'
import { cn } from '@/lib/utils'

export const BottonMenu = () => {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const locale = useLocale()
  const [active, setActive] = useState<string>('home')

  const handleOpenPolls = () => {
    router.push(`/${locale}/${APP_LINKS.POLLS()}`)
    setActive('polls')
  }

  const handleOpenMyPoints = () => {
    if (!isAuthenticated) {
      router.push(`/${locale}/${APP_LINKS.SIGNIN()}`)
      return
    }
    router.push(`/${locale}/${APP_LINKS.MYPOINTS()}`)
    setActive('my-points')
  }

  const handleRules = () => {
    router.push(`/${locale}/${APP_LINKS.RULES()}`)
    setActive('rules')
  }

  const handleOpenGuesses = () => {
    router.push(`/${locale}/`)
    setActive('home')
  }

  return (
    <div className="flex xl:hidden lg:hidden md:hidden sm:hidden items-center justify-center gap-3 mx-auto py-1 w-full bg-gradient-to-r from-[#00FF55] to-[#00AE3A] rounded-full  px-4">
      <BottomMenuItem
        icon={<Home size={30} />}
        label="Início"
        onClick={handleOpenGuesses}
        active={active === 'home'}
      />
      <BottomMenuItem
        icon={
          <Image
            className="self-center"
            src={'/assets/survey.svg'}
            height={20}
            width={20}
            alt=""
          />
        }
        label="Pontos"
        onClick={handleOpenPolls}
        active={active === 'polls'}
      />
      <BottomMenuItem
        icon={
          <Image
            className="self-center"
            src={'/assets/trophy.svg'}
            height={20}
            width={20}
            alt=""
          />
        }
        label="Noticias"
        onClick={handleRules}
        active={active === 'rules'}
      />
      <BottomMenuItem
        icon={
          <Image
            className="self-center"
            src={'/assets/points.svg'}
            height={20}
            width={20}
            alt=""
          />
        }
        label="Enquetes"
        onClick={handleOpenMyPoints}
        active={active === 'quiz'}
      />
      <BottomMenuItem
        icon={
          <Image
            className="self-center"
            src={'/assets/points.svg'}
            height={20}
            width={20}
            alt=""
          />
        }
        label="Classificação"
        onClick={handleOpenMyPoints}
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
          'flex flex-col items-center justify-center w-full stroke-red-500 fill-red-500',
          active && 'text-white',
          !active && 'text-app-background',
        )}
      >
        {icon}
        <span className={cn('text-[9px] text-wrap')}>{label}</span>
      </div>
    </Button>
  )
}
