import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "spotted-seal-342.eu-west-1.convex.cloud",
        port: "",
      },
    ],
  },
};

export default nextConfig;