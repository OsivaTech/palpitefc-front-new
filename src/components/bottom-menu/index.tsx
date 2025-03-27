'use client'
import { Button } from '@/components/ui/button'
import { useLocale } from 'next-intl'
import { ReactNode } from 'react'
import Image from 'next/image'
import { useAuth } from '@/context/useAuth'
import { useRouter } from 'next/navigation'
import { APP_LINKS } from '@/constants'

export const BottonMenu = () => {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const locale = useLocale()

  const handleOpenPolls = () => {
    router.push(`/${locale}/${APP_LINKS.POLLS()}`)
  }

  const handleOpenMyPoints = () => {
    if (!isAuthenticated) {
      router.push(`/${locale}/${APP_LINKS.SIGNIN()}`)
      return
    }
    router.push(`/${locale}/${APP_LINKS.MYPOINTS()}`)
  }

  const handleRules = () => {
    router.push(`/${locale}/${APP_LINKS.RULES()}`)
  }

  const handleOpenGuesses = () => {
    router.push(`/${locale}/`)
  }

  return (
    <div className="flex xl:hidden lg:hidden md:hidden sm:hidden items-center justify-between mx-auto py-1 w-full bg-app-background">
      <BottomMenuItem
        icon={
          <Image
            className="self-center"
            src={'/assets/trophy-ball.svg'}
            height={20}
            width={20}
            alt=""
          />
        }
        label="Palpites"
        onClick={handleOpenGuesses}
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
        label="Enquetes"
        onClick={handleOpenPolls}
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
        label="Prêmios e Regras"
        onClick={handleRules}
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
        label="Meus pontos"
        onClick={handleOpenMyPoints}
      />
    </div>
  )
}

type BottomMenuItemProps = {
  icon: ReactNode
  label: string
  onClick: () => void
  disabled?: boolean
}

export const BottomMenuItem = ({
  icon,
  label,
  onClick,
  disabled = false,
}: BottomMenuItemProps) => {
  return (
    <Button
      className="rounded-nonde w-full h-full"
      onClick={onClick}
      disabled={disabled}
    >
      <div className="flex flex-col w-full">
        {icon}
        <span className="text-xs text-wrap">{label}</span>
      </div>
    </Button>
  )
}
