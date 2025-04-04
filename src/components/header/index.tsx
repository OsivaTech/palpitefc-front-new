'use client'
import Link from 'next/link'
import Image from 'next/image'
import UserProfile from '@/components/user-profile'
import HeaderActionsMenu from '@/components/header-actions-menu'
import { useAuth } from '@/context/useAuth'
import { APP_LINKS } from '@/constants'
import { useLocale } from 'next-intl'

const Header = ({ hideActions }: { hideActions?: boolean }) => {
  const { isAuthenticated, user } = useAuth()
  const locale = useLocale()

  return (
    <header className="flex items-center justify-between xl:py-[30px] xl:px-[80px] py-[20px] px-[20px] bg-[#001D29] ">
      <div className="flex items-center gap-[60px] ">
        <Link href={`/${locale}`}>
          <Image
            src="/assets/logo_topo.svg"
            alt=""
            width={150}
            height={30}
            className="xl:w-[150px] xl:h-[30px] lg:w-[120px] lg:h-[30px] w-[100px] h-[30px]"
          />
        </Link>
        {!hideActions && (
          <div className="hidden xl:block lg:block  ">
            <ul className="flex items-center gap-[60px] lg:gap-[30px] xl:text-lg text-sm">
              <li>
                <Link href={`/${locale}/${APP_LINKS.HOMEPAGE()}`}>Início</Link>
              </li>
              <li>
                <Link href={`/${locale}/${APP_LINKS.MYPOINTS()}`}>Pontos</Link>
              </li>
              <li>
                <Link href={`/${locale}/${APP_LINKS.NEWS()}`}>Notícias</Link>
              </li>
              <li>
                <Link href={`/${locale}/${APP_LINKS.POLLS()}`}>Enquetes</Link>
              </li>
              <li>
                <Link href={`/${locale}/${APP_LINKS.RANKING()}`}>
                  Classificação
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>

      {!hideActions ? (
        isAuthenticated ? (
          <UserProfile user={user!} />
        ) : (
          <HeaderActionsMenu />
        )
      ) : null}
    </header>
  )
}

export default Header
