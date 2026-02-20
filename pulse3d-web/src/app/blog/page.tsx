import { getArticles } from '../admin/actions';
import BlogClient from './BlogClient';

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Блог о 3D-печати | PULSE 3D',
    description: 'Полезные статьи, инструкции и новости из мира 3D-печати. Узнайте всё о технологиях, материалах и оборудовании.',
};

export default async function BlogPage() {
    const articles = await getArticles();

    return <BlogClient initialArticles={articles} />;
}
