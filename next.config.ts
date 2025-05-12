import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["mui-chips-input"],
  /* config options here */
};

export default nextConfig;
