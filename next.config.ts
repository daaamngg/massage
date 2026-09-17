import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root so Turbopack doesn't get confused by parent lockfiles.
  turbopack: {
    root: path.resolve(),
  },
  // Next пишет в <link> type="image/x-icon", а Vercel отдаёт .ico как
  // image/vnd.microsoft.icon. Яндекс не показывает значок, если тип в теге
  // не совпадает с реальным, поэтому выравниваем заголовок.
  async headers() {
    return [
      {
        source: "/favicon.ico",
        headers: [{ key: "Content-Type", value: "image/x-icon" }],
      },
    ];
  },
};

export default nextConfig;
