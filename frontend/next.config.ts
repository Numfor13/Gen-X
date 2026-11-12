import type { NextConfig } from "next";

// Static export: the app is a client-side SPA served from S3/CloudFront, the API is FastAPI.
// Routes use query strings (/p/?a=100100) because dynamic segments need build-time ids.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
