/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.myanimelist.net', port: '', pathname: '/**' }
    ]
  }
  // experimental: {servi}
}
export default nextConfig
