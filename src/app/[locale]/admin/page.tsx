'use client'
import { CustomButton } from '@/components/custom-button'
import { APP_LINKS_ADMIN } from '@/constants'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const router = useRouter()
  const locale = useLocale()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Painel de Gestão</h1>
      <div className="grid grid-cols-1 gap-4">
        <CustomButton
          onClick={() =>
            router.push(`/${locale}/${APP_LINKS_ADMIN.ADMIN_LEAGUES()}`)
          }
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg"
        >
          Gerenciar Campeonatos
        </CustomButton>
        <CustomButton
          onClick={() =>
            router.push(`/${locale}/${APP_LINKS_ADMIN.ADMIN_NEWS()}`)
          }
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg"
        >
          Gerenciar Notícias
        </CustomButton>
        <CustomButton
          onClick={() =>
            router.push(`/${locale}/${APP_LINKS_ADMIN.ADMIN_LEAGUES()}`)
          }
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg"
        >
          Gerenciar Enquetes
        </CustomButton>
        <CustomButton
          onClick={() =>
            router.push(`/${locale}/${APP_LINKS_ADMIN.ADMIN_TEAMS()}`)
          }
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg"
        >
          Gerenciar Times
        </CustomButton>
      </div>
    </div>
  )
}
