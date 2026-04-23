import { getArticleBySlug, getArticles } from '../../admin/actions';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Script from 'next/script';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './Article.module.css';
import type { Metadata } from 'next';
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from '@/lib/seo';
import { getArticleCategory, getCategorySlug, getRelatedArticles } from '@/lib/blog';

export const dynamic = 'force-dynamic';

function isExternalUrl(url: string): boolean {
    return /^https?:\/\//i.test(url) && !url.includes('pulse3d.ru');
}

function extractExternalSources(markdown: string): Array<{ title: string; url: string }> {
    const pattern = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
    const unique = new Map<string, string>();

    let match;
    while ((match = pattern.exec(markdown)) !== null) {
        const [, title, url] = match;
        if (!unique.has(url)) {
            unique.set(url, title.trim());
        }
    }

    return [...unique.entries()].map(([url, title]) => ({ title, url }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);
    if (!article) return { title: 'Статья не найдена' };

    const articleUrl = `/blog/${article.slug}`;
    const image = absoluteUrl(article.image_url || DEFAULT_OG_IMAGE);

    return {
        title: article.title,
        description: article.excerpt,
        alternates: {
            canonical: articleUrl,
        },
        openGraph: {
            type: 'article',
            title: article.title,
            description: article.excerpt,
            url: articleUrl,
            images: [image],
            publishedTime: article.created_at,
            modifiedTime: article.updated_at || article.created_at,
        },
        twitter: {
            card: 'summary_large_image',
            title: article.title,
            description: article.excerpt,
            images: [image],
        },
        keywords: [
            '3D-печать',
            'промышленная 3D-печать',
            'аддитивное производство',
            'серийная печать',
            getArticleCategory(article),
            article.title,
        ],
    };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);
    if (!article) notFound();
    const allArticles = await getArticles();
    const relatedArticles = getRelatedArticles(allArticles, article.slug, 3);
    const categoryName = getArticleCategory(article);
    const categorySlug = getCategorySlug(categoryName);
    const sourceLinks = extractExternalSources(article.content || '');
    const markdownComponents: Components = {
        a: ({ href, children, ...props }) => {
            const url = href || '';
            const external = isExternalUrl(url);

            return (
                <a
                    href={url}
                    {...props}
                    className={styles.articleLink}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer nofollow' : undefined}
                >
                    {children}
                </a>
            );
        },
    };

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "description": article.excerpt,
        "image": absoluteUrl(article.image_url || DEFAULT_OG_IMAGE),
        "datePublished": article.created_at,
        "dateModified": article.updated_at,
        "author": {
            "@type": "Organization",
            "name": SITE_NAME,
            "url": SITE_URL
        },
        "publisher": {
            "@type": "Organization",
            "name": SITE_NAME,
            "logo": {
                "@type": "ImageObject",
                "url": absoluteUrl('/icon.png')
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": absoluteUrl(`/blog/${article.slug}`)
        },
        "articleSection": categoryName,
        "inLanguage": "ru-RU",
        "isAccessibleForFree": true,
        "citation": sourceLinks.map((source) => source.url),
        "keywords": [
            "3D-печать",
            "аддитивное производство",
            categoryName,
            article.title,
        ].join(', ')
    };

    const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Главная",
                item: SITE_URL,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Блог",
                item: absoluteUrl('/blog'),
            },
            {
                "@type": "ListItem",
                position: 3,
                name: article.title,
                item: absoluteUrl(`/blog/${article.slug}`),
            },
        ],
    };

    return (
        <article
            className={styles.articlePage}
            itemScope
            itemType="https://schema.org/Article"
        >
            <Script
                id={`article-ld-json-${article.slug}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <Script
                id={`breadcrumb-ld-json-${article.slug}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
            />
            <meta itemProp="author" content="PULSE 3D" />
            <meta itemProp="dateModified" content={article.updated_at || article.created_at} />
            <meta itemProp="mainEntityOfPage" content={absoluteUrl(`/blog/${article.slug}`)} />
            <header className={styles.header}>
                <div className={styles.articleContainer}>
                    <div className={styles.meta}>
                        <Link href={`/blog/category/${categorySlug}`} className={styles.category}>
                            {categoryName}
                        </Link>
                        <span className={styles.dot}>•</span>
                        <time
                            className={styles.date}
                            dateTime={article.created_at || new Date().toISOString()}
                            itemProp="datePublished"
                        >
                            {new Date(article.created_at || Date.now()).toLocaleDateString('ru-RU', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </time>
                    </div>
                    <h1 className={styles.title} itemProp="headline">{article.title}</h1>
                    <p className={styles.description} itemProp="description">{article.excerpt}</p>
                </div>
            </header>

            {article.image_url && (
                <div className={styles.heroImageSection}>
                    <div className={styles.articleContainer}>
                        <div className={styles.heroImageWrapper}>
                            <Image
                                src={article.image_url}
                                alt={article.title}
                                fill
                                priority
                                className={styles.heroImage}
                                itemProp="image"
                            />
                        </div>
                    </div>
                </div>
            )}

            <div className={styles.contentSection}>
                <div className={styles.articleContainer}>
                    <div className={styles.layout}>
                        <div className={styles.content} itemProp="articleBody">
                            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                                {article.content}
                            </ReactMarkdown>
                            {sourceLinks.length > 0 ? (
                                <section className={styles.sourcesSection}>
                                    <h2 className={styles.sourcesTitle}>Экспертные источники</h2>
                                    <ul className={styles.sourcesList}>
                                        {sourceLinks.map((source) => (
                                            <li key={source.url}>
                                                <a href={source.url} target="_blank" rel="noopener noreferrer nofollow">
                                                    {source.title}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            ) : null}
                            {relatedArticles.length > 0 ? (
                                <section className={styles.relatedSection}>
                                    <h2 className={styles.relatedTitle}>Похожие статьи</h2>
                                    <div className={styles.relatedGrid}>
                                        {relatedArticles.map((related) => (
                                            <Link key={related.slug} href={`/blog/${related.slug}`} className={styles.relatedCard}>
                                                <span className={styles.relatedCategory}>{getArticleCategory(related)}</span>
                                                <h3>{related.title}</h3>
                                                <p>{related.excerpt}</p>
                                            </Link>
                                        ))}
                                    </div>
                                </section>
                            ) : null}
                        </div>

                        <aside className={styles.sidebar}>
                            <div className={styles.cta}>
                                <h3>Нужна 3D-печать?</h3>
                                <p>Загрузите ваш файл и мы рассчитаем стоимость за 15 минут.</p>
                                <a href="/contacts" className={styles.ctaBtn}>Отправить файл</a>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </article>
    );
}
