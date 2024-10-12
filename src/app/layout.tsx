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

export const metadata: Metadata = {
  title: 'Palpite Futebol Clube',
  description: 'Seu palpite é gol de placa!',
}

type UserToken ={
  id: string,
  name: string,
  email: string,
  role: string,
  nbf: number,
  exp: number,
  iat: number
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
  let userEmail = ''
  if (token?.value) {
    const decodedToken = jwtDecode<any>(token.value)
    const userTokenDecode = jwtDecode<UserToken>(decodedToken.value)
    userName = userTokenDecode.name
    userEmail = userTokenDecode.email
    console.log('token', userTokenDecode)
    console.log('userName', userTokenDecode.name)
    console.log('userEmail', userTokenDecode.email)
  }

  return (
    <html lang={locale} className="dark">
      <NextIntlClientProvider locale={locale} messages={messages}>
        <CookiesProvider>
          <AuthProvider token={token?.value}>
            <PageModalProvider>
              <body className="grid min-h-screen grid-rows-[min-content_max-content]">
                <Header />
                {children}
                <Toaster />
                <Script id="facebook-pixel" strategy="afterInteractive">
                  {`
                    !function (f, b, e, v, n, t, s) {
                        if (f.fbq) return; n = f.fbq = function () {
                            n.callMethod ?
                                n.callMethod.apply(n, arguments) : n.queue.push(arguments)
                        };
                        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
                        n.queue = []; t = b.createElement(e); t.async = !0;
                        t.src = v; s = b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t, s)
                    }(window, document, 'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '919791843493604');
                    fbq('track', 'PageView');
                  `}
                </Script>
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
                    hj('identify', '${userName}', { userProperty: 'value' });
                  `}
                </Script>
              </body>
              <ModalPage />
            </PageModalProvider>
          </AuthProvider>
        </CookiesProvider>
      </NextIntlClientProvider>
      <GoogleAnalytics gaId="G-XH7QPE19PE" />
    </html>
  )
}