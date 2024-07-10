'use client'
import { ModalPageHeader } from '@/components/modal-page-header'
import { Separator } from '@/components/ui/separator'
import { APP_LINKS } from '@/constants'
import { usePageModal } from '@/context/usePageModal'
import { logout } from '@/lib/session'
import { User } from '@/types/User'
import { LockKeyhole, LogOut, UserRound } from 'lucide-react'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'

export const ModalPageProfile = ({ user }: { user: User }) => {
  const { closePageModal } = usePageModal()
  const router = useRouter()
  const locale = useLocale()

  const handleLogout = async () => {
    logout()
    closePageModal()
  }

  const handleChangeEmailAndPassword = () => {
    // render(<ChangePasswordForm />)
  }

  return (
    <>
      <ModalPageHeader user={user} />
      <Separator className="my-6 border border-white/50" />
      <ol className="flex flex-col gap-3">
        <li
          onClick={handleChangeEmailAndPassword}
          className="flex justify-start items-center gap-2 cursor-pointer font-medium text-xs"
        >
          <LockKeyhole size={20} />
          Alterar senha ou e-mail
        </li>

        <li
          onClick={() => {
            router.push(`/${locale}/${APP_LINKS.MYPOINTS()}`)
            closePageModal()
          }}
          className="flex justify-start items-center gap-2 cursor-pointer font-medium text-xs"
        >
          <UserRound size={20} />
          Meus pontos
        </li>
        <li
          onClick={handleLogout}
          className="flex justify-start items-center gap-2 cursor-pointer font-medium text-xs"
        >
          <LogOut size={20} />
          Sair
        </li>
      </ol>
    </>
  )
}
