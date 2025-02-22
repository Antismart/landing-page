/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000',
  },
};

export default nextConfig; // Use ES6 export