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
            // {
            //     protocol: "http",
            //     hostname: "localhost",
            //     port: "5000",
            //     pathname: "/uploads/**",
            // },
        ],
    },
    experimental: {
        scrollRestoration: false,
    },
};

export default nextConfig;
