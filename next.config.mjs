import createNextIntlPlugin from 'next-intl/plugin'
/** @type {import('next').NextConfig} */

const withNextIntl = createNextIntlPlugin()

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.palpitefutebolclube.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'palpitefutebolclube.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'media.api-sports.io',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'mrvnoesporte.com.br',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'media.api-sports.io',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'mrvnoesporte.com.br',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'assets.palpitefutebolclube.com',
        port: '',
      },
    ],
  },
}

export default withNextIntl(nextConfig)
