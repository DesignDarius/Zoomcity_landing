/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Promo je sada početna stranica — stari linkovi na /promo idu na /
  async redirects() {
    return [{ source: '/promo', destination: '/', permanent: true }]
  },
}

export default nextConfig
