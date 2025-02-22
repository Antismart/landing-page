/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // This ensures static export
  images: {
    unoptimized: true
  },
  // Add this to ensure styles are properly bundled
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  }
}


export default nextConfig;
