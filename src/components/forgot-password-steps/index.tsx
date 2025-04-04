'use client'

import { ForgotPassword } from '@/components/forgot-password-steps/components'
import { ForgotPasswordProvider } from '@/components/forgot-password-steps/context/forgot-password-context'
import { useTranslations } from 'next-intl'

export const ForgotPasswordSteps = () => {
  const t = useTranslations()

  return (
    <div className="max-w-[500px] mx-auto pt-10 px-3">
      <h1 className="text-center mb-6 font-bold text-xl text-app-secondary">
        {t('components.forgotPasswordForm.title')}
      </h1>
      <ForgotPasswordProvider>
        <ForgotPassword />
      </ForgotPasswordProvider>
    </div>
  )
}
