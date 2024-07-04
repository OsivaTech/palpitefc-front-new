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

  const hadnleOpenProfile = () => {
    if (!isAuthenticated) {
      router.push(`${locale}/${APP_LINKS.SIGNIN()}`)
      return
    }
    router.push(`${locale}/profile`)
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
        label="Premios e Regras"
        onClick={openPageModal}
      />
      <BottomMenuItem
        icon={
          <Image
            className="self-center"
            src={'/assets/user.svg'}
            height={20}
            width={20}
            alt=""
          />
        }
        label="Minha conta"
        onClick={hadnleOpenProfile}
      />
    </div>
  )
}

type BottomMenuItemProps = {
  icon: ReactNode
  label: string
  onClick: () => void
}
export const BottomMenuItem = ({
  icon,
  label,
  onClick,
}: BottomMenuItemProps) => {
  return (
    <Button
      className="rounded-nonde w-full h-full"
      variant="ghost"
      onClick={onClick}
    >
      <div className="flex flex-col justify-center items-ceter w-full">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
    </Button>
  )
}
