import { BottonMenu } from '@/components/bottom-menu'
import Header from '@/components/header'

export default function ApplicationLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="overflow-auto h-full mb-28">
      <div className="flex flex-col h-full">
        <Header />
        {children}
        <BottonMenu />
      </div>
    </main>
  )
}
