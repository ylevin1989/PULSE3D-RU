import { MetadataRoute } from 'next';
import content from '../data/content.json';
import blog from '../data/blog.json';
import { SITE_URL } from '../lib/seo';
import { buildBlogCategories, getArticleCategory } from '../lib/blog';
import { stat } from 'node:fs/promises';
import path from 'node:path';

async function getDataTimestamp(): Promise<Date> {
    try {
        const [blogStat, contentStat] = await Promise.all([
            stat(path.join(process.cwd(), 'src/data/blog.json')),
            stat(path.join(process.cwd(), 'src/data/content.json')),
        ]);
        const latest = Math.max(blogStat.mtimeMs, contentStat.mtimeMs);
        return new Date(latest);
    } catch {
        return new Date();
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const dataTimestamp = await getDataTimestamp();

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
        lastModified: dataTimestamp,
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    const portfolioRoutes = content.portfolio.works.map((work: any) => ({
        url: `${SITE_URL}/portfolio/${work.slug}`,
        lastModified: dataTimestamp,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    const blogRoutes = blog.map((article: any) => ({
        url: `${SITE_URL}/blog/${article.slug}`,
        lastModified: new Date(article.updated_at || article.created_at || dataTimestamp),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    const categoryRoutes = buildBlogCategories(blog as any[]).map((category) => {
        const latestInCategory = (blog as any[])
            .filter((article) => getArticleCategory(article) === category.name)
            .map((article) => new Date(article.updated_at || article.created_at || dataTimestamp).getTime())
            .sort((a, b) => b - a)[0];

        return {
            url: `${SITE_URL}/blog/category/${category.slug}`,
            lastModified: new Date(latestInCategory || dataTimestamp.getTime()),
            changeFrequency: 'weekly' as const,
            priority: 0.65,
        };
    });

    return [...staticRoutes, ...portfolioRoutes, ...categoryRoutes, ...blogRoutes];
}
