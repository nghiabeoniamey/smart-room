import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: [
            'lh3.googleusercontent.com',
            'avatars.githubusercontent.com',
            's.gravatar.com',
        ],
        minimumCacheTTL: 60,
    },
};

export default nextConfig;