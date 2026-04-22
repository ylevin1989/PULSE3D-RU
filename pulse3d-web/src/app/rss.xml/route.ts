import { SITE_NAME, SITE_URL } from '../../lib/seo';
import blog from '../../data/blog.json';

export async function GET() {
    const sorted = [...blog].sort((a: any, b: any) => {
        const aDate = new Date(a.updated_at || a.created_at || 0).getTime();
        const bDate = new Date(b.updated_at || b.created_at || 0).getTime();
        return bDate - aDate;
    });

    const items = sorted.map((article: any) => {
        const pubDate = new Date(article.created_at || Date.now()).toUTCString();
        const updatedDate = new Date(article.updated_at || article.created_at || Date.now()).toUTCString();
        const url = `${SITE_URL}/blog/${article.slug}`;

        return `
            <item>
                <title><![CDATA[${article.title}]]></title>
                <link>${url}</link>
                <guid>${url}</guid>
                <description><![CDATA[${article.excerpt || ''}]]></description>
                <pubDate>${pubDate}</pubDate>
                <atom:updated>${updatedDate}</atom:updated>
                <category><![CDATA[${article.category || 'Статья'}]]></category>
            </item>
        `;
    }).join('');

    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>${SITE_NAME} — Блог о 3D-печати</title>
        <link>${SITE_URL}/blog</link>
        <description>Статьи, обзоры и аналитика по промышленной 3D-печати от PULSE 3D.</description>
        <language>ru-RU</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
        ${items}
    </channel>
</rss>`;

    return new Response(rss, {
        headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
    });
}

