import createNextIntlPlugin from 'next-intl/plugin';
/** @type {import('next').NextConfig} */

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
    images: {
        remotePatterns: [
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
        ],
      },
};

export default withNextIntl(nextConfig);
