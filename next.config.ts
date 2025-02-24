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
    },
    experimental: {
        scrollRestoration: false,
    },
};

export default nextConfig;
