import { MetadataRoute } from 'next';
import content from '../data/content.json';
import blog from '../data/blog.json';
import { SITE_URL } from '../lib/seo';
import { buildBlogCategories } from '../lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    const staticRoutes = [
        '',
        '/about',
        '/blog',
        '/contacts',
        '/merch',
        '/pricing',
        '/privacy',
        '/tech',
        '/portfolio',
        '/sitemap.xml',
        '/robots.txt',
        '/rss.xml',
        '/llms.txt',
        '/ai.txt',
    ].map((route) => ({
        url: `${SITE_URL}${route}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    const portfolioRoutes = content.portfolio.works.map((work: any) => ({
        url: `${SITE_URL}/portfolio/${work.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    const blogRoutes = blog.map((article: any) => ({
        url: `${SITE_URL}/blog/${article.slug}`,
        lastModified: new Date(article.updated_at || article.created_at || now),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    const categoryRoutes = buildBlogCategories(blog as any[]).map((category) => ({
        url: `${SITE_URL}/blog/category/${category.slug}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.65,
    }));

    return [...staticRoutes, ...portfolioRoutes, ...categoryRoutes, ...blogRoutes];
}
