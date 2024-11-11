'use client'
import { ModalPageHeader } from '@/components/modal-page-header'
import { Separator } from '@/components/ui/separator'
import { APP_LINKS, APP_LINKS_ADMIN } from '@/constants'
import { usePageModal } from '@/context/usePageModal'
import { logout } from '@/lib/session'
import { User } from '@/types/User'
import { LogOut, Settings, UserRound } from 'lucide-react'
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

  // const handleChangeEmailAndPassword = () => {
  //   // render(<ChangePasswordForm />)
  // }

  return (
    <>
      <ModalPageHeader user={user} />
      <Separator className="my-6 border border-white/50" />
      <ol className="flex flex-col gap-3">
        {/* <li
          onClick={handleChangeEmailAndPassword}
          className="flex justify-start items-center gap-2 cursor-pointer font-medium text-xs"
        >
          <LockKeyhole size={20} />
          Alterar senha ou e-mail
        </li> */}

        <li
          onClick={() => {
            router.push(`/${locale}/${APP_LINKS.PROFILE()}`)
            closePageModal()
          }}
          className="flex justify-start items-center gap-2 cursor-pointer font-medium text-xs"
        >
          <UserRound size={20} />
          Minha conta
        </li>
        {/* {
          <li
            onClick={() => {
              router.push(`/${locale}/${APP_LINKS.SUBSCRIPTION()}`)
              closePageModal()
            }}
            className="flex justify-start items-center gap-2 cursor-pointer font-medium text-xs"
          >
            <Handshake size={20} />
            Assinatura
          </li>
        } */}
        {user?.role === 'admin' && (
          <li
            onClick={() => {
              router.push(`/${locale}/${APP_LINKS_ADMIN.ADMIN_PANEL()}`)
              closePageModal()
            }}
            className="flex justify-start items-center gap-2 cursor-pointer font-medium text-xs"
          >
            <Settings size={20} />
            Painel de Gestão
          </li>
        )}
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
