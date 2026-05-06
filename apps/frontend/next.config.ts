import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  devIndicators: false,
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  transpilePackages: ["@bod/utils"],
};

export default nextConfig;
