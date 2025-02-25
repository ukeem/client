/** @format */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "autokorean.ru",
                pathname: "/uploads/**",
            },
        ],
        domains: ["autokorean.ru"], // Внешние домены
        formats: ["image/avif", "image/webp"], // Оптимальные форматы
        minimumCacheTTL: 60 * 60 * 24 * 30, // Увеличил кэш до 30 дней
        dangerouslyAllowSVG: true, // Разрешить SVG, если используешь
        contentSecurityPolicy: "default-src 'self'; img-src * data: blob:;", // Для безопасности
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
