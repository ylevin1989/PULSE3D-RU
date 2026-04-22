import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight, Tag } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getArticles } from '../../../admin/actions';
import JsonLd from '@/components/seo/JsonLd';
import styles from '../../Blog.module.css';
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_NAME } from '@/lib/seo';
import { buildBlogCategories, findCategoryBySlug, getArticleCategory } from '@/lib/blog';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const articles = await getArticles();
  const category = findCategoryBySlug(articles, slug);

  if (!category) {
    return {
      title: 'Категория блога не найдена',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${category.name}: статьи и материалы`,
    description: `${category.description} В категории ${category.count} ${category.count === 1 ? 'материал' : 'материалов'}.`,
    alternates: {
      canonical: `/blog/category/${category.slug}`,
    },
    openGraph: {
      type: 'website',
      url: `/blog/category/${category.slug}`,
      title: `Блог: ${category.name}`,
      description: category.description,
      images: [absoluteUrl(DEFAULT_OG_IMAGE)],
    },
  };
}

export default async function BlogCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const articles = await getArticles();
  const category = findCategoryBySlug(articles, slug);

  if (!category) {
    notFound();
  }

  const filteredArticles = articles.filter((article: any) => getArticleCategory(article) === category.name);
  const categories = buildBlogCategories(articles);

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name} — блог ${SITE_NAME}`,
    description: category.description,
    isPartOf: absoluteUrl('/blog'),
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: filteredArticles.map((article: any, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: absoluteUrl(`/blog/${article.slug}`),
        name: article.title,
      })),
    },
  };

  return (
    <div className={styles.blogPage}>
      <JsonLd data={itemListJsonLd} />

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>Категория блога</div>
          <h1 className={styles.title}>{category.name}</h1>
          <p className={styles.subtitle}>{category.description}</p>
        </div>
      </section>

      <section className={styles.controlsSection}>
        <div className={styles.controlsContainer}>
          <div className={styles.toolbar}>
            <div className={styles.clusterLinks}>
              <Link href="/blog" className={styles.clusterLink}>Все статьи</Link>
              {categories.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/category/${item.slug}`}
                  className={`${styles.clusterLink} ${item.slug === category.slug ? styles.clusterLinkActive : ''}`}
                >
                  {item.name} ({item.count})
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.articlesSection}>
        <div className={styles.articlesContainer}>
          <div className={styles.bentoGrid}>
            {filteredArticles.map((article: any, index: number) => (
              <Link
                key={article.id || article.slug}
                href={`/blog/${article.slug}`}
                className={`${styles.card} ${index === 0 ? styles.featuredCard : ''}`}
              >
                <div className={styles.imageWrapper}>
                  {article.image_url ? (
                    <Image
                      src={article.image_url}
                      alt={article.title}
                      fill
                      priority={index === 0}
                      className={styles.image}
                    />
                  ) : (
                    <div className={styles.placeholder}>PULSE 3D</div>
                  )}
                  <div className={styles.cardBadges}>
                    <span className={styles.categoryBadge}>
                      <Tag size={12} />
                      {getArticleCategory(article)}
                    </span>
                  </div>
                </div>
                <div className={styles.content}>
                  <div className={styles.meta}>
                    <span className={styles.date}>
                      <Calendar size={14} />
                      {new Date(article.created_at || Date.now()).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <h2 className={styles.articleTitle}>{article.title}</h2>
                  <p className={styles.excerpt}>{article.excerpt}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.readMore}>
                      Читать статью <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
