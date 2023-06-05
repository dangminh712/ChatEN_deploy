/** @type {import('next').NextConfig} */

module.exports = {
  async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://cdnmd.global-cache.online/:path*',
        },
      ]
    },
    reactStrictMode: true
};
