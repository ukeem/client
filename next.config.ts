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
        dangerouslyAllowSVG: true,
    },
    // eslint: {
    //     // Warning: This allows production builds to successfully complete even if
    //     // your project has ESLint errors.
    //     ignoreDuringBuilds: true,
    // },
    // typescript: {
    //     // !! WARN !!
    //     // Dangerously allow production builds to successfully complete even if
    //     // your project has type errors.
    //     // !! WARN !!
    //     ignoreBuildErrors: true,
    // },
};

export default nextConfig;
