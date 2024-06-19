import { isAuthenticated } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
  params: {locale}
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  const authenticated = await isAuthenticated();
  
  if(authenticated) {
    redirect('/')
  }

  return (
      <main className="mx-auto w-full">
        {children}
      </main>
  );
}

