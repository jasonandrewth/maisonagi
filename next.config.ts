import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["three"],
  images: {
    remotePatterns: [
      {
        hostname: "cdn.shopify.com",
      },
    ],
  },
};

export default nextConfig;
