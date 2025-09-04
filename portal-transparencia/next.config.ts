import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  experimental: {
    turbopack: true,
    serverActions: true
  }
};

export default nextConfig;
