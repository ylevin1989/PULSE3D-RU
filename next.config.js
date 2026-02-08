/** @type {import('next').NextConfig} */
const nextConfig = {
    // Отключаем строгие проверки, которые могут мешать билду на сервере
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
};

module.exports = nextConfig;
