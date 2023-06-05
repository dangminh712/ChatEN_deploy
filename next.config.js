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
    env: {
      OPENAI_API_KEY : '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',
      URL_APP : 'http://dangminh-001-site1.ctempurl.com/api/',
      DIC_API_KEY : 'WBBcwnwQpV89',
    },
    reactStrictMode: true
};
