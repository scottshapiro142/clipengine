import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // yt-dlp-exec and fluent-ffmpeg are Node.js-only; exclude from browser bundle
  serverExternalPackages: ["fluent-ffmpeg", "yt-dlp-exec"],
};

export default nextConfig;
