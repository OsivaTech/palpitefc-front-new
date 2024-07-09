'use client'
import { ResetPasswordRequest } from '@/types/api/resquests/ResetPasswordRequest'
import React, { createContext, ReactNode, useState } from 'react'

export enum ForgotPasswordSteps {
  EMAIL = 1,
  CODE = 2,
  RESET = 3,
}

type ForgotPasswordContextType = {
  step: ForgotPasswordSteps
  setStep: React.Dispatch<React.SetStateAction<ForgotPasswordSteps>>
  data?: ResetPasswordRequest
  setData: React.Dispatch<React.SetStateAction<ResetPasswordRequest>>
}

export const ForgotPasswordContext = createContext<ForgotPasswordContextType>({
  step: ForgotPasswordSteps.EMAIL,
  setStep: () => {},
  data: {} as ResetPasswordRequest,
  setData: () => {},
})

export const ForgotPasswordProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [step, setStep] = useState(ForgotPasswordSteps.EMAIL)
  const [data, setData] = useState<ResetPasswordRequest>(
    {} as ResetPasswordRequest,
  )

  return (
    <ForgotPasswordContext.Provider value={{ step, setStep, data, setData }}>
      {children}
    </ForgotPasswordContext.Provider>
  )
}

export const useForgotPassword = () => {
  const context = React.useContext(ForgotPasswordContext)
  if (context === undefined) {
    throw new Error(
      'useForgotPassword must be used within a ForgotPasswordProvider',
    )
  }
  return context
}
