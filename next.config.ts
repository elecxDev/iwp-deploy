import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'christuniversity.in',
      },
      {
        protocol: 'https',
        hostname: 'farm66.staticflickr.com',
      },
    ],
    domains: ['christuniversity.in', 'farm66.staticflickr.com'],
  },
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
