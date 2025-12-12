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
    formats: ['image/webp', 'image/avif'],
  },
  // Configuraciones para mejorar el rendimiento
  experimental: {
    optimizePackageImports: ['lucide-react'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
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
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ['**/node_modules', '**/.git', '**/.next', '**/dist'],
      };
    }

    // Optimizaciones para mejorar el rendimiento
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    };

    return config;
  },
  // Configuración para mejorar el rendimiento en desarrollo
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Configuración para mejorar el hot reload
  onDemandEntries: {
    maxInactiveAge: 30 * 1000,
    pagesBufferLength: 3,
  },
}

export default nextConfig
