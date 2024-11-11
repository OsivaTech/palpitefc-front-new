import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from './lib/session'

async function isAdminAuthenticated(req: NextRequest): Promise<boolean> {
  const session = req.cookies.get('session')?.value

  if (!session) return false

  const jwt = (await decrypt(session))?.token

  if (!jwt) return false

  const user = JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString())

  return user?.role === 'admin'
}

const localeHandlingMiddleware = createMiddleware({
  locales: ['pt'],
  defaultLocale: 'pt',
})

export default async function middleware(req: NextRequest) {
  const response = localeHandlingMiddleware(req)

  const url = req.nextUrl
  if (url.pathname.includes('/admin')) {
    const isAdmin = await isAdminAuthenticated(req)
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/', url))
    }
  }
  return response
}

export const config = {
  matcher: ['/', '/(pt)/:path*', '/admin/:path*'],
}
