'use client'
import Link from 'next/link'
import Image from 'next/image'
import UserProfile from '@/components/user-profile'
import HeaderActionsMenu from '@/components/header-actions-menu'
import { useAuth } from '@/context/useAuth'

const Header = () => {
  const { isAuthenticated, user } = useAuth()

  return (
    <header className="flex items-center justify-between xl:py-[50px] xl:px-[80px] py-[20px] px-[20px] bg-[#001D29] ">
      <div className="flex items-center gap-[60px] ">
        <Link href={'/'}>
          <Image
            src="/assets/logo_topo.svg"
            alt=""
            width={150}
            height={30}
            className="xl:w-[150px] xl:h-[30px] lg:w-[120px] lg:h-[30px] w-[100px] h-[30px]"
          />
        </Link>
        <div className="hidden xl:block lg:block  ">
          <ul className="flex items-center gap-[60px] lg:gap-[30px] xl:text-lg text-sm">
            <li>Início</li>
            <li>Pontos</li>
            <li>Notícias</li>
            <li>Enquetes</li>
            <li>Classificação</li>
          </ul>
        </div>
      </div>

      {isAuthenticated ? <UserProfile user={user!} /> : <HeaderActionsMenu />}
    </header>
  )
}

export default Header
