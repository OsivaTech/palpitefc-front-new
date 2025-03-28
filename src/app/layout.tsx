import type { Metadata } from 'next'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import Header from '@/components/header'
import { PageModalProvider } from '@/context/usePageModal'
import { CookiesProvider } from 'next-client-cookies/server'
import './globals.css'
import { ModalPage } from '@/components/modal-page'
import { Toaster } from '@/components/ui/toaster'
import { AuthProvider } from '@/context/useAuth'
import { cookies } from 'next/headers'
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'
import { jwtDecode } from 'jwt-decode'
import { UserToken } from '@/types/UserToken'
import { BottonMenu } from '@/components/bottom-menu'
import { CookieConsentComponent } from '@/components/cookie-consent'

export const metadata: Metadata = {
  title: 'Palpite Futebol Clube',
  description: 'Seu palpite é gol de placa!',
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  const messages = useMessages()

  const token = cookies().get('session')
  let userName = ''
  let userId = ''
  if (token?.value) {
    const decodedToken = jwtDecode<{ token: string }>(token.value)
    const userTokenDecode = jwtDecode<UserToken>(decodedToken.token)
    userName = userTokenDecode.name
    userId = userTokenDecode.id
  }

  return (
    <html lang={locale} className="dark">
      <CookieConsentComponent />
      <NextIntlClientProvider locale={locale} messages={messages}>
        <CookiesProvider>
          <AuthProvider token={token?.value}>
            <PageModalProvider>
              <body className="flex flex-col h-dvh bg-app-background">
                <noscript>
                  <iframe
                    src="https://www.googletagmanager.com/ns.html?id=GTM-NVRQSJLV"
                    height="0"
                    width="0"
                    style={{ display: 'none', visibility: 'hidden' }}
                  ></iframe>
                </noscript>
                <Script id="gtm" strategy="afterInteractive"></Script>
                <Header />
                {children}
                <BottonMenu />
                <Toaster />
                <Script id="hotjar" strategy="afterInteractive">
                  {`
                    (function(h,o,t,j,a,r){
                        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                        h._hjSettings={hjid:5168377,hjsv:6};
                        a=o.getElementsByTagName('head')[0];
                        r=o.createElement('script');r.async=1;
                        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                        a.appendChild(r);
                    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
                    window.hj('identify', '${userId}', { userName: '${userName}' });
                  `}
                </Script>
              </body>
              <ModalPage />
            </PageModalProvider>
          </AuthProvider>
        </CookiesProvider>
      </NextIntlClientProvider>
      <GoogleAnalytics gaId="G-XH7QPE19PE" />
      <Script id="gtm-script" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NVRQSJLV');
        `}
      </Script>
    </html>
  )
}
