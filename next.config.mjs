/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { optimizeCss: true },
  // output: 'standalone', // comment this line to try build and start in local
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31622400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/komerce/**',
      },
    ],
  },
};

export default nextConfig;
