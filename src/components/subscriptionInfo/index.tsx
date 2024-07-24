'use client'

import { Separator } from '@radix-ui/react-separator'
import { useLocale, useTranslations } from 'next-intl'

import { CustomInput } from '../custom-input'
import { CustomButton } from '../custom-button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { APP_LINKS } from '@/constants'
import { useEffect } from 'react'
import { useAuth } from '@/context/useAuth'

const SubscriptionInfo = () => {
  const t = useTranslations()
  const router = useRouter()
  const locale = useLocale()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/${locale}/${APP_LINKS.SIGNIN()}`)
    }
  }, [isAuthenticated, locale, router])

  const icon = () => {
    return (
      <Image
        className="self-center mb-2"
        src={'/assets/cardIcon.svg'}
        height={20}
        width={20}
        alt=""
      />
    )
  }

  return (
    <div className="max-w-[500px] mx-auto pt-10 px-3 bg-app-secondary h-full">
      <h1 className="mb-4 text-center text-[15px] font-medium">
        {t('components.subscriptionInfo.title')}
      </h1>
      <Separator className="mb-6 border border-white/50" />
      <h1 className="text-[14px] font-medium mb-2">Seu Plano/Assinatura</h1>
      <CustomInput
        icon={icon()}
        className="mb-4 rounded-md"
        value={'**** **** **** 54545'}
      />
      <div className="flex items-center justify-center w-full ">
        <CustomButton
          type="submit"
          className="w-[247px] text-[#A90000] border-[#A90000] bg-transparent hover:bg-secondary/80"
          onClick={() =>
            router.push(`/${locale}/${APP_LINKS.SUBSCRIPTIONCANCEL()}`)
          }
        >
          {t('components.subscriptionInfo.button')}
        </CustomButton>
      </div>
      <Separator className="mt-[84px]  border border-white/50" />
    </div>
  )
}

export default SubscriptionInfo
