/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })
    return config
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/'
      }
    ]
  }
}

module.exports = nextConfig
