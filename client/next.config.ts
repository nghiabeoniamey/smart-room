import type {NextConfig} from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
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

export default withNextIntl(nextConfig);
