import { getArticleBySlug } from '../../admin/actions';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Script from 'next/script';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './Article.module.css';
import type { Metadata } from 'next';
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from '@/lib/seo';

export const dynamic = 'force-dynamic';

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
    };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);
    if (!article) notFound();

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
        }
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
                        <span className={styles.category}>{article.category || 'Статья'}</span>
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
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {article.content}
                            </ReactMarkdown>
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
