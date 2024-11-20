'use client'

import { APP_LINKS } from '@/constants'
import { Facebook, Instagram, Twitter } from 'lucide-react'
import { useLocale } from 'next-intl'
import Link from 'next/link'

export const Footer = () => {
  const locale = useLocale()

  return (
    <footer className="flex flex-col gap-2 py-2 bg-app-background border-t border-white/10 items-center justify-center">
      <div className="flex flex-row gap-16 items-center">
        <div className="flex flex-col gap-2 justify-between">
          <p className="text-lg font-bold">Sobre nós</p>
          <div className="flex flex-col gap-1">
            <Link
              className="text-sm"
              href={`/${locale}/${APP_LINKS.PRIVACYPOLICY()}`}
            >
              Política de privacidade
            </Link>
            <Link className="text-sm" href={`/${locale}/${APP_LINKS.TERMS()}`}>
              Termos e condições
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-between">
          <p className="text-lg font-bold">Nossas redes</p>
          <div className="flex flex-row gap-4">
            <Link
              href="https://instagram.com/palpitefutebolclube"
              target="_blank"
            >
              <Instagram size={24} />
            </Link>
            <Link
              href="https://facebook.com/palpitefutebolclube"
              target="_blank"
            >
              <Facebook size={24} />
            </Link>
            <Link href="https://twitter.com/palpitefutclube" target="_blank">
              <Twitter size={24} />
            </Link>
          </div>
        </div>
      </div>
      <div>
        <p className="text-sm">
          © {new Date().getFullYear()} Palpite Futebol Clube
        </p>
      </div>
    </footer>
  )
}

export default Footer
