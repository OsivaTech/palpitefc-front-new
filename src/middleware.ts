import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { getSelf } from './http/user'

async function isAdminAuthenticated(): Promise<boolean> {
  const user = await getSelf()

  return !user ? false : user.role === 'admin'
}

const existingMiddleware = createMiddleware({
  locales: ['pt'],
  defaultLocale: 'pt',
})

export default async function middleware(req: NextRequest) {
  const response = existingMiddleware(req)

  const url = req.nextUrl
  if (url.pathname.includes('/admin')) {
    const isAdmin = await isAdminAuthenticated()
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/', url))
    }
  }
  return response
}

export const config = {
  matcher: ['/', '/(pt)/:path*', '/admin/:path*'],
}
