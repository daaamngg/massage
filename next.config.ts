import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root so Turbopack doesn't get confused by parent lockfiles.
  turbopack: {
    root: path.resolve(),
  },
};

export default nextConfig;
