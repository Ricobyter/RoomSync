import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Workspace packages export TypeScript source directly.
  transpilePackages: [
    "@roomsync/api-client",
    "@roomsync/contracts",
    "@roomsync/design-tokens",
    "@roomsync/shared-utils",
  ],
};

export default nextConfig;
