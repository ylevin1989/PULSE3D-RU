import content from '../../data/content.json';
import blog from '../../data/blog.json';
import { SITE_URL } from '../../lib/seo';
import { buildBlogCategories } from '../../lib/blog';

export async function GET() {
    const settings = (content as any).settings;

    const lines = [
        '# PULSE 3D',
        '',
        'Описание: Промышленная 3D-печать в Санкт-Петербурге. Серийное производство деталей, прототипирование, инженерные материалы.',
        `Сайт: ${SITE_URL}`,
        `Контакты: ${settings.contactPhone}, ${settings.contactEmail}`,
        '',
        '## Основные разделы',
        `${SITE_URL}/`,
        `${SITE_URL}/pricing`,
        `${SITE_URL}/tech`,
        `${SITE_URL}/portfolio`,
        `${SITE_URL}/merch`,
        `${SITE_URL}/blog`,
        `${SITE_URL}/about`,
        `${SITE_URL}/contacts`,
        `${SITE_URL}/privacy`,
        '',
        '## XML и фиды',
        `${SITE_URL}/sitemap.xml`,
        `${SITE_URL}/robots.txt`,
        `${SITE_URL}/rss.xml`,
        '',
        '## Последние статьи',
        ...blog.slice(0, 20).map((article: any) => `${SITE_URL}/blog/${article.slug}`),
        '',
        '## Категории блога',
        ...buildBlogCategories(blog as any[]).map((category) => `${SITE_URL}/blog/category/${category.slug}`),
        '',
        '## Условия использования ИИ',
        '- Разрешено цитирование с обязательной ссылкой на первоисточник.',
        '- Не искажать технические характеристики, цены и сроки.',
        '- Для коммерческого использования сверять актуальность данных на сайте.',
    ];

    return new Response(lines.join('\n'), {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
    });
}
