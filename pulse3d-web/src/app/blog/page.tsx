import type { Metadata } from 'next';
import { getArticles } from '../admin/actions';
import BlogClient from './BlogClient';
import { absoluteUrl, DEFAULT_OG_IMAGE } from '@/lib/seo';

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
    const articles = await getArticles();

    return <BlogClient initialArticles={articles} />;
}
