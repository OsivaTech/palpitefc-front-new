'use client'

import { Separator } from '@radix-ui/react-separator'
import { useLocale, useTranslations } from 'next-intl'

import { CustomButton } from '../custom-button'
import { deleteSubscription } from '@/http/subscription'
import { useRouter } from 'next/navigation'
import { APP_LINKS } from '@/constants'
import { toast } from '../ui/use-toast'
import { useEffect } from 'react'
import { useAuth } from '@/context/useAuth'

const SubscriptionCancel = () => {
  const t = useTranslations()
  const router = useRouter()
  const locale = useLocale()
  const { isAuthenticated } = useAuth()

  const handleCancel = async () => {
    try {
      await deleteSubscription()

      toast({
        title: 'Sucesso',
        description: t('common.successSubscriptionCancel'),
        variant: 'default',
      })
      router.push(`/${locale}/${APP_LINKS.HOMEPAGE()}`)
    } catch {
      toast({
        title: 'Erro',
        description: t('common.subscriptionCancelError'),
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/${locale}/${APP_LINKS.SIGNIN()}`)
    }
  }, [isAuthenticated, locale, router])

  return (
    <div className="max-w-[500px] mx-auto pt-10 px-3 bg-app-secondary h-full">
      <h1 className="mb-4 text-center text-[30px] font-medium">
        {t('components.subscriptionCancel.title')}
      </h1>
      <Separator className="mb-[69px] border border-white/50" />

      <div className="flex items-center justify-center w-full ">
        <CustomButton
          type="submit"
          onClick={handleCancel}
          className="w-[282px]  mb-5 text-[#A90000] border-[#A90000] bg-transparent hover:bg-secondary/80"
        >
          {t('components.subscriptionCancel.button1')}
        </CustomButton>
      </div>
      <div className="flex items-center justify-center w-full ">
        <CustomButton
          type="submit"
          className="w-[282px] bg-app-secondary hover:bg-secondary/80"
          onClick={() => {
            router.push(`/${locale}/${APP_LINKS.SUBSCRIPTION()}`)
          }}
        >
          {t('components.subscriptionCancel.button2')}
        </CustomButton>
      </div>

      <Separator className="mt-[84px]  border border-white/50" />
    </div>
  )
}

export default SubscriptionCancel
