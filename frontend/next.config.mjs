// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    async headers() {
      return [
        {
          source: '/api/:path*',
          headers: [
            { key: 'Access-Control-Allow-Credentials', value: 'true' },
            { key: 'Access-Control-Allow-Origin', value: '*' },
            { key: 'Access-Control-Allow-Methods', value: 'GET,POST' },
          ],
        },
      ];
    },
};

export default nextConfig;