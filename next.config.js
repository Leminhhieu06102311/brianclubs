/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'api.qrserver.com',
            port: '',
          },
          {
            protocol: 'https',
            hostname: 'flagsapi.com',
            port: '',
          }
        ],
        
      },
}

module.exports = nextConfig
