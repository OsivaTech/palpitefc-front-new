'use client'
import { Button } from '@/components/ui/button'
import { APP_LINKS } from '@/constants'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import React from 'react'

const HeaderActionsMenu: React.FC = () => {
  const { push } = useRouter()
  const locale = useLocale()
  const t = useTranslations()

  return (
    <section className="flex gap-2 bg-linearGradient-primary">
      <Button
        onClick={() => push(`/${locale}/${APP_LINKS.SIGNIN()}`)}
        variant="primary"
        className="lg:w-[100px] lg:h-[30px] w-[80px] h-[30px]"
      >
        {t('common.signIn')}
      </Button>
      <Button
        onClick={() => push(`/${locale}/${APP_LINKS.SIGNUP()}`)}
        variant="secondary"
        className="lg:w-[100px] lg:h-[30px] w-[80px] h-[30px]"
      >
        {t('common.signUp')}
      </Button>
    </section>
  )
}

export default HeaderActionsMenu
