'use client'

import { Separator } from '@radix-ui/react-separator'
import { useTranslations } from 'next-intl'

import { CustomButton } from '../custom-button'
import { deleteSubscription } from '@/http/subscription'

const SubscriptionCancel = () => {
  const t = useTranslations()

  return (
    <div className="max-w-[500px] mx-auto pt-10 px-3 bg-app-secondary h-full">
      <h1 className="mb-4 text-center text-[30px] font-medium">
        {t('components.subscriptionCancel.title')}
      </h1>
      <Separator className="mb-[69px] border border-white/50" />

      <div className="flex items-center justify-center w-full ">
        <CustomButton
          type="submit"
          onClick={async () => {
            await deleteSubscription()
          }}
          className="w-[282px]  mb-5 text-[#A90000] border-[#A90000] bg-transparent hover:bg-secondary/80"
        >
          {t('components.subscriptionCancel.button1')}
        </CustomButton>
      </div>
      <div className="flex items-center justify-center w-full ">
        <CustomButton
          type="submit"
          className="w-[282px] bg-app-secondary hover:bg-secondary/80"
        >
          {t('components.subscriptionCancel.button2')}
        </CustomButton>
      </div>

      <Separator className="mt-[84px]  border border-white/50" />
    </div>
  )
}

export default SubscriptionCancel
