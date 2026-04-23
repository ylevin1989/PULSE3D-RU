import { MetadataRoute } from 'next';
import content from '../data/content.json';
import blog from '../data/blog.json';
import { SITE_URL } from '../lib/seo';
import { buildBlogCategories, getArticleCategory, type BlogArticle } from '../lib/blog';
import { stat } from 'node:fs/promises';
import path from 'node:path';

type PortfolioWork = {
    slug: string;
};

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
        '/rss.xml',
        '/llms.txt',
        '/ai.txt',
    ].map((route) => ({
        url: `${SITE_URL}${route}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    const portfolioRoutes = (content.portfolio.works as PortfolioWork[]).map((work) => ({
        url: `${SITE_URL}/portfolio/${work.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    const blogArticles = blog as BlogArticle[];

    const blogRoutes = blogArticles.map((article) => ({
        url: `${SITE_URL}/blog/${article.slug}`,
        lastModified: new Date(article.updated_at || article.created_at || dataTimestamp),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    const categoryRoutes = buildBlogCategories(blogArticles).map((category) => {
        const latestInCategory = blogArticles
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
