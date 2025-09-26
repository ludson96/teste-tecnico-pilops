import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
    return [
      {
        source: '/',
        destination: '/flights',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
