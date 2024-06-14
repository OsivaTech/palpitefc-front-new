export default function ApplicationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
        <main className="h-[calc(100vh-50px)] overflow-auto ">
            {children}
        </main>
    );
}
//max-w-[1600px]

