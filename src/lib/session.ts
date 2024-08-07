'use server'
import { env } from '@/env'
import { JWTPayload, SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secretKey = env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: { token: string; expiresAt: Date }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify<JWTPayload & { token: string }>(
      session,
      encodedKey,
      {
        algorithms: ['HS256'],
      },
    )
    return payload
  } catch (error) {
    console.log('Failed to verify session')
  }
}

export async function createSession(token: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encrypt({ token, expiresAt })

  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession() {
  cookies().delete('session')
}

export async function logout() {
  deleteSession()
}

export async function isAuthenticated() {
  const session = cookies().get('session')
  return !!session
}
