import { BottonMenu } from '@/components/bottom-menu'
import Footer from '@/components/footer'
import Header from '@/components/header'

export default function ApplicationLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="overflow-auto h-full">
      <div className="flex flex-col h-full">
        <Header />
        {children}
        <BottonMenu />
        <Footer />
      </div>
    </main>
  )
}
