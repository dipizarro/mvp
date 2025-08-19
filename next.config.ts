import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    allowedDevOrigins: ['192.168.1.88', 'localhost', '127.0.0.1', '0.0.0.0']
  }
};

export default nextConfig;
