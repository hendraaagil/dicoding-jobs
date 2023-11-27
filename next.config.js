/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/jobs',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
