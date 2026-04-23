import type { Metadata } from 'next';
import { getArticles } from '../admin/actions';
import BlogClient from './BlogClient';
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import type { BlogArticle } from '@/lib/blog';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Блог о 3D-печати',
    description: 'Полезные статьи, инструкции и новости из мира 3D-печати. Узнайте всё о технологиях, материалах и оборудовании.',
    alternates: {
        canonical: '/blog',
    },
    openGraph: {
        type: 'website',
        title: 'Блог о 3D-печати',
        description: 'Полезные статьи, инструкции и новости из мира 3D-печати.',
        url: '/blog',
        images: [absoluteUrl(DEFAULT_OG_IMAGE)],
    },
};

export default async function BlogPage() {
    const articles = (await getArticles()) as BlogArticle[];
    const itemListData = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Блог PULSE 3D',
        description: 'База знаний и статьи о промышленной 3D-печати.',
        mainEntity: {
            '@type': 'ItemList',
            itemListElement: articles.map((article, index: number) => ({
                '@type': 'ListItem',
                position: index + 1,
                url: absoluteUrl(`/blog/${article.slug}`),
                name: article.title,
            })),
        },
    };

    const breadcrumbData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Главная',
                item: SITE_URL,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Блог',
                item: absoluteUrl('/blog'),
            },
        ],
    };

    return (
        <>
            <JsonLd data={itemListData} />
            <JsonLd data={breadcrumbData} />
            <BlogClient initialArticles={articles} />
        </>
    );
}
