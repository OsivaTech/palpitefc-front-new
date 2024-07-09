'use client'

import { ForgotPasswordCodeStep } from '@/components/forgot-password-steps/components/forgot-password-code-step'
import { ForgotPasswordEmailStep } from '@/components/forgot-password-steps/components/forgot-password-email-step'
import { ForgotPasswordResetStep } from '@/components/forgot-password-steps/components/forgot-password-reset-step'
import {
  useForgotPassword,
  ForgotPasswordSteps,
} from '@/components/forgot-password-steps/context/forgot-password-context'

export const ForgotPassword = () => {
  const { step } = useForgotPassword()

  return (
    <>
      {step === ForgotPasswordSteps.EMAIL && <ForgotPasswordEmailStep />}
      {step === ForgotPasswordSteps.CODE && <ForgotPasswordCodeStep />}
      {step === ForgotPasswordSteps.RESET && <ForgotPasswordResetStep />}
    </>
  )
}
