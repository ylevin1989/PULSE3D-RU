import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'PULSE 3D',
        short_name: 'PULSE3D',
        description: 'Промышленная 3D-печать в Санкт-Петербурге: серийное производство и прототипирование.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0f172a',
        icons: [
            {
                src: '/icon.png',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: '/apple-touch-icon.png',
                sizes: '180x180',
                type: 'image/png',
            },
        ],
    };
}

