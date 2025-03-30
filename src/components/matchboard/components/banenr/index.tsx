'use client'
import { APP_LINKS } from '@/constants'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export const Banner = () => {
  const router = useRouter()
  const locale = useLocale()
  return (
    <div
      className="relative w-screen max-w-full h-auto cursor-pointer"
      onClick={() => router.push(`${locale}/${APP_LINKS.SIGNUP()}`)}
    >
      <Image
        src="/assets/capa-medium.png"
        alt="Descrição da imagem"
        layout="responsive"
        width={1920}
        height={1080}
        className="object-cover max-w-full max-h-full hidden sm:block"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      <Image
        src="/assets/capa-small.png"
        alt="Descrição da imagem"
        layout="responsive"
        width={1920}
        height={1080}
        className="object-cover max-w-full max-h-full block sm:hidden"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  )
}
