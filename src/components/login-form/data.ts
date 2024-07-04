'use server'

import { LoginFormData } from '@/components/login-form/type'
import { post } from '@/lib/api'
import { LoginEndpoint } from '@/lib/endpoints'
import { createSession } from '@/lib/session'
import { LoginResponse } from '@/types/api/responses/LoginResponse'

export async function login({ email, password }: LoginFormData) {
  const response = await post(
    LoginEndpoint,
    {
      body: JSON.stringify({ email, password }),
    },
    false,
  )

  const { accessToken, user }: LoginResponse = await response.json()

  if (!accessToken || !user) {
    return false
  }

  createSession(accessToken)

  return { accessToken, user }
}
