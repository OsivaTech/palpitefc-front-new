import { ApplicationHeader } from "@/components/Header";
import { getSelf } from "@/data/getSelf";
import { APP_LINKS } from "@/shared/constants";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const self = await getSelf()

  // if (self){
  //   redirect(APP_LINKS.HOMEPAGE())
  // }

  return (
    <div>
      <ApplicationHeader hideMenu />
      {children}
    </div>
  );
}
