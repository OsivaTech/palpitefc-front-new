export default function ApplicationLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="h-full overflow-auto bg-app-secondary">{children}</main>
  )
}
