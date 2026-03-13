import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Allow online-3d-viewer WASM files to be loaded
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'asset/resource',
    });
    return config;
  },
}

export default nextConfig
