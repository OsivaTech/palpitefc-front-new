import type { Metadata } from "next";
import { Rubik} from "next/font/google";
import { BottonMenu } from "@/components/BottomMenu";
import { cn } from "@/lib/utils";
import { ApplicationHeader } from "@/components/Header";

export const metadata: Metadata = {
  title: "Palpite.com",
};

const fontSans = Rubik({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <div className={cn(
          "min-h-screen bg-background font-sans antialiased text-white bg-app-background",
          fontSans.variable
        )}>
        <ApplicationHeader />
          {children}
        <BottonMenu />
    </div>
  )
}
