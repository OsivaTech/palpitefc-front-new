'use server'
import { get, post, put } from '@/lib/api'
import {
  RegisterEndpoint,
  ResetPassword,
  SelfEndpoint,
  SendForgotPasswordEmail,
  UpdateUser,
  VerifyResetCode,
} from '@/lib/endpoints'
import { User } from '@/types/User'
import { ResetPasswordRequest } from '@/types/api/resquests/ResetPasswordRequest'
import { SignupRequest } from '@/types/api/resquests/SignupRequest'
import { cookies } from 'next/headers'

export const getSelf = async () => {
  try {
    const response = await get(SelfEndpoint, {}, true)
    const user: User = await response.json()
    return user
  } catch {
    return null
  }
}

export async function createUser(user: SignupRequest) {
  try {
    await post(
      RegisterEndpoint,
      {
        method: 'POST',
        body: JSON.stringify({
          ...user,
          utm_source: cookies().get('utm_source'),
        }),
      },
      false,
    )
    cookies().delete('utm_source')
    return true
  } catch {
    return false
  }
}

export async function updateUser(user: Omit<SignupRequest, 'password'>) {
  try {
    const response = await put(
      UpdateUser,
      {
        body: JSON.stringify(user),
      },
      true,
    )
    console.log(response)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export async function sendForgotPasswordEmail(email: string) {
  try {
    await post(
      SendForgotPasswordEmail,
      {
        body: JSON.stringify({ email }),
      },
      true,
    )
    return true
  } catch {
    return false
  }
}

export async function updatePassword({
  code,
  email,
  password,
}: ResetPasswordRequest) {
  try {
    await post(
      ResetPassword,
      {
        body: JSON.stringify({
          email,
          password,
          code,
        }),
      },
      true,
    )
    return true
  } catch {
    return false
  }
}

export async function verifyCode(email: string, code: string) {
  try {
    const res = await post(
      VerifyResetCode,
      {
        body: JSON.stringify({
          email,
          code,
        }),
      },
      true,
    )
    if (res.status !== 204) return false
    return true
  } catch {
    return false
  }
}
