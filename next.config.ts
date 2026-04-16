import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "elasnopoder.org",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
