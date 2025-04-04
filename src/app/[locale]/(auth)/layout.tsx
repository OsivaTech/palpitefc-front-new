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
    <main className="mx-auto w-full overflow-auto h-full">
      <Header hideActions />
      {children}
    </main>
  )
}
