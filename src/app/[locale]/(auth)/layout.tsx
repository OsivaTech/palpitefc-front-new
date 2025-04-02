import Header from '@/components/header'
import { isAuthenticated } from '@/lib/session'
import { redirect } from 'next/navigation'

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const authenticated = await isAuthenticated()

  if (authenticated) {
    redirect('/')
  }

  return (
    <html>
      <body>
        <Header hideActions />
        <main className="mx-auto w-full overflow-auto">{children}</main>
      </body>
    </html>
  )
}
