/** @type {import('next').NextConfig} */
const nextConfig = { 
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Cache-Control', value: 's-maxage=86400, stale-while-revalidate' }
        ]
      }
    ]
  }
}
module.exports = nextConfig
