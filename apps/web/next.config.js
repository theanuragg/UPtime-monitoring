import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: false, // Matches "rsc": false
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@components": path.resolve("./app/components"),
      "@utils": path.resolve("./app/lib/utils"),
      "@ui": path.resolve("./app/components/ui"),
      "@lib": path.resolve("./app/lib"),
      "@hooks": path.resolve("./app/hooks"),
    };
    return config;
  },
};

export default nextConfig;
