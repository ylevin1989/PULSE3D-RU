import { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/seo';

export default function robots(): MetadataRoute.Robots {
    const host = new URL(SITE_URL).host;

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin', '/api/login', '/api/login/check'],
            },
            {
                userAgent: 'GPTBot',
                allow: '/',
                disallow: ['/admin', '/api/login', '/api/login/check'],
            },
            {
                userAgent: 'Google-Extended',
                allow: '/',
                disallow: ['/admin', '/api/login', '/api/login/check'],
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host,
    };
}
