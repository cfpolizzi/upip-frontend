/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // THIS IS THE KEY!
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
