/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'wsrv.nl',
      'lh3.googleusercontent.com',
      'c.saavncdn.com',
      'aac.saavncdn.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wsrv.nl',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'c.saavncdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'aac.saavncdn.com',
        pathname: '/**',
      }
    ]
  },
  experimental: {
    // your experimental configs
  }
};

export default nextConfig;