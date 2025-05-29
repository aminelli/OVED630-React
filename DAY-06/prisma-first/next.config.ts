import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone", // fondamentale per docker
  reactStrictMode: true,
};

export default nextConfig;
