/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Configuraciones para mejorar el hot reload
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Configuración para desarrollo
  webpack: (config, { dev, isServer }) => {
    // Configuración para SVG
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // Mejorar hot reload en desarrollo
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 500,
        aggregateTimeout: 200,
        ignored: ['**/node_modules', '**/.git', '**/.next'],
      };
    }

    return config;
  },
  // Configuración para mejorar el rendimiento en desarrollo
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Configuración para mejorar el hot reload
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
}

export default nextConfig
