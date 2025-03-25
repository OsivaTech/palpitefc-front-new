export default function ApplicationLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="h-[calc(100vh-50px)] overflow-auto">
      <div className="flex flex-col">{children}</div>
    </main>
  )
}
