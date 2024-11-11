'use client'
import { Button } from '@/components/ui/button'
import { useLocale } from 'next-intl'
import { ReactNode } from 'react'
import Image from 'next/image'
import { usePageModal } from '@/context/usePageModal'
import { ModalPageQuiz } from '@/components/modal-page-quiz'
import { useAuth } from '@/context/useAuth'
import { User } from '@/types/User'
import { useRouter } from 'next/navigation'
import { APP_LINKS } from '@/constants'

export const BottonMenu = () => {
  const { render, openPageModal } = usePageModal()
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const locale = useLocale()

  const handleOpenQuiz = () => {
    render(<ModalPageQuiz user={user ?? ({} as User)} />)
    openPageModal()
  }

  const handleOpenMyPoints = () => {
    if (!isAuthenticated) {
      router.push(`${locale}/${APP_LINKS.SIGNIN()}`)
      return
    }
    router.push(`${locale}/${APP_LINKS.MYPOINTS()}`)
  }

  const handleRules = () => {
    router.push(`${locale}/${APP_LINKS.RULES()}`)
  }

  return (
    <div className="mx-auto py-2  w-full flex justify-between items-center bg-[#2D3745] sticky bottom-0 ">
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
        label="Enquete"
        onClick={handleOpenQuiz}
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
      variant="ghost"
      onClick={onClick}
      disabled={disabled}
    >
      <div className="flex flex-col justify-center items-ceter w-full">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
    </Button>
  )
}
