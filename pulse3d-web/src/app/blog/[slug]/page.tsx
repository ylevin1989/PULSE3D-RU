import { getArticleBySlug, getArticles } from '../../admin/actions';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Script from 'next/script';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './Article.module.css';
import content from '../../../data/content.json';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);
    if (!article) return { title: 'Статья не найдена' };

    return {
        title: `${article.title} | Блог PULSE 3D`,
        description: article.excerpt,
        openGraph: {
            title: article.title,
            description: article.excerpt,
            images: [article.image_url],
        }
    };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);
    if (!article) notFound();

    const { settings } = content as any;

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "description": article.excerpt,
        "image": article.image_url,
        "datePublished": article.created_at,
        "dateModified": article.updated_at,
        "author": {
            "@type": "Organization",
            "name": "PULSE 3D",
            "url": "https://pulse3d.ru"
        },
        "publisher": {
            "@type": "Organization",
            "name": "PULSE 3D",
            "logo": {
                "@type": "ImageObject",
                "url": "https://pulse3d.ru/logo.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://pulse3d.ru/blog/${article.slug}`
        }
    };

    return (
        <article className={styles.articlePage}>
            <header className={styles.header}>
                <div className={styles.articleContainer}>
                    <div className={styles.meta}>
                        <span className={styles.category}>{article.category || 'Статья'}</span>
                        <span className={styles.dot}>•</span>
                        <time className={styles.date}>
                            {new Date(article.created_at || Date.now()).toLocaleDateString('ru-RU', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </time>
                    </div>
                    <h1 className={styles.title}>{article.title}</h1>
                    <p className={styles.description}>{article.excerpt}</p>
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
                            />
                        </div>
                    </div>
                </div>
            )}

            <div className={styles.contentSection}>
                <div className={styles.articleContainer}>
                    <div className={styles.layout}>
                        <div className={styles.content}>
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
