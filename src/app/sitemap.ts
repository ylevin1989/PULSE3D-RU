import { MetadataRoute } from 'next';
import content from '../data/content.json';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://pulse3d.ru';
    const lastModified = new Date();

    const staticRoutes = [
        '',
        '/pricing',
        '/tech',
        '/portfolio',
        '/contacts',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    const portfolioRoutes = content.portfolio.works.map((work: any) => ({
        url: `${baseUrl}/portfolio/${work.slug}`,
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...staticRoutes, ...portfolioRoutes];
}
