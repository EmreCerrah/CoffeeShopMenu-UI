/** @type {import('next').NextConfig} */
const nextConfig = { 
  reactStrictMode: true,
  images: {
    // domains: ['example.com'], // Dış kaynaklardan resim çekecekseniz
    formats: ['image/webp', 'image/avif'], // Optimize edilmiş formatlar
  },
  env: {
    BASE_URL: process.env.BASE_URL
},
};


export default nextConfig;

