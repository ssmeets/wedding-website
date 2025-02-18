// next.config.ts
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  api: {
    bodyParser: {
      sizeLimit: "5mb", // Adjust the limit as needed
    },
  },
  // Other Next.js configurations can go here
};

export default nextConfig;
