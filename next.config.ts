import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Turbopack에서는 typedRoutes가 지원되지 않으므로 조건부로 설정
    ...(process.env.NODE_ENV === 'development' && !process.env.TURBOPACK ? { typedRoutes: true } : {}),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
