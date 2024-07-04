export default function ApplicationLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="h-[calc(100vh-50px)] bg-app-background ">{children}</main>
  )
}
// max-w-[1600px]
