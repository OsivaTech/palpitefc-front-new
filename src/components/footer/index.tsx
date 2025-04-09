'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  RiThreadsLine,
  RiInstagramLine,
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiFacebookFill,
} from 'react-icons/ri'
import Image from 'next/image'
import { APP_LINKS } from '@/constants'
import { useLocale } from 'next-intl'

export default function Footer() {
  const [openSections, setOpenSections] = useState<number | null>(null)
  const router = useRouter() // Hook para navegação
  const locale = useLocale()

  const toggleSection = (index: number) => {
    setOpenSections(openSections === index ? null : index)
  }

  // Dados dos links
  const links = [
    {
      title: 'Regras',
      items: [
        { label: 'Como jogar', href: `/${locale}/${APP_LINKS.RULES()}` },
        { label: 'Premiação', href: `/${locale}/${APP_LINKS.RULES()}` },
        { label: 'Classificação', href: `/${locale}/${APP_LINKS.RANKING()}` },
      ],
    },
    {
      title: 'Suporte',
      items: [
        {
          label: 'Email',
          href: 'mailto:administrativo@palpitefutebolclube.com',
        },
        { label: 'Fale conosco', href: 'https://ig.me/m/palpitefutebolclube' },
      ],
    },
    {
      title: 'Links Úteis',
      items: [
        { label: 'Termos de uso', href: `/${locale}/${APP_LINKS.TERMS()}` },
        {
          label: 'Política de privacidade',
          href: `/${locale}/${APP_LINKS.PRIVACYPOLICY()}`,
        },
      ],
    },
  ]

  return (
    <footer
      className="bg-transparent text-white"
      style={{
        background: 'linear-gradient(to bottom, #001D29, #000000)',
      }}
    >
      <div className="px-6 py-10 mt-12 md:px-14 md:py-12">
        <div className="flex flex-col md:flex-row md:justify-between gap-10">
          {/* Logo */}
          <div className="flex justify-center items-center">
            <Image
              src="/assets/logo_topo.svg"
              alt="Palpite Futebol Clube"
              width={160}
              height={40}
              className="h-10"
            />
          </div>

          {/* Links - Desktop */}
          <div className="hidden md:flex gap-20">
            {links.map((section, idx) => (
              <div key={idx}>
                <h4 className="text-app-secondary text-2xl font-bold mb-2">
                  {section.title}
                </h4>
                <ul className="space-y-1">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      {item.href.startsWith('http') ||
                      item.href.startsWith('mailto') ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-app-secondary"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <button
                          onClick={() => router.push(item.href)}
                          className="hover:text-app-secondary"
                        >
                          {item.label}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Links - Mobile Accordion */}
          <div className="md:hidden space-y-4 text-sm mb-20">
            {links.map((section, idx) => (
              <div
                key={idx}
                className="border-b border-gray-700 pb-2 transition-all duration-300"
              >
                <button
                  className="text-app-secondary font-medium cursor-pointer flex justify-between items-center w-full"
                  onClick={() => toggleSection(idx)}
                >
                  <span className="text-lg">{section.title}</span>
                  {openSections === idx ? (
                    <RiArrowUpSLine className="w-4 h-4" />
                  ) : (
                    <RiArrowDownSLine className="w-4 h-4" />
                  )}
                </button>
                <ul
                  className={`mt-2 ml-4 space-y-2 transition-all duration-300 ${
                    openSections === idx
                      ? 'max-h-screen opacity-100'
                      : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      {item.href.startsWith('http') ||
                      item.href.startsWith('mailto') ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-app-secondary"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <button
                          onClick={() => router.push(item.href)}
                          className="hover:text-app-secondary"
                        >
                          {item.label}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Social Icons - Mobile */}
            <div className="flex justify-center gap-6 pt-6 md:hidden">
              <a
                href="https://www.instagram.com/palpitefutebolclube"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#00AE3A] transition"
              >
                <RiInstagramLine size={24} />
              </a>
              <a
                href="https://www.threads.net/@palpitefutebolclube"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#00AE3A] transition"
              >
                <RiThreadsLine size={24} />
              </a>
              <a
                href="https://www.facebook.com/palpitefutebolclube"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#00AE3A] transition"
              >
                <RiFacebookFill size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Linha inferior - apenas desktop */}
      <div className="hidden md:flex justify-between items-center bg-[#D9D9D9] text-[#00AE3A] text-sm px-16 py-3">
        <span> © {new Date().getFullYear()} Todos os direitos reservados</span>
        <div className="flex gap-6">
          <a
            href="https://www.instagram.com/palpitefutebolclube"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-[#00AE3A] transition"
          >
            <RiInstagramLine size={24} />
          </a>
          <a
            href="https://www.threads.net/@palpitefutebolclube"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-[#00AE3A] transition"
          >
            <RiThreadsLine size={24} />
          </a>
          <a
            href="https://www.facebook.com/palpitefutebolclube"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-[#00AE3A] transition"
          >
            <RiFacebookFill size={24} />
          </a>
        </div>
      </div>
    </footer>
  )
}
