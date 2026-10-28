import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export as fully static site — works great on Netlify without SSR plugin issues.
  output: "export",
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
