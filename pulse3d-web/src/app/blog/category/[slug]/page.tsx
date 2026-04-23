import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight, Tag } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getArticles } from '../../../admin/actions';
import JsonLd from '@/components/seo/JsonLd';
import styles from '../../Blog.module.css';
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from '@/lib/seo';
import { buildBlogCategories, findCategoryBySlug, getArticleCategory, type BlogArticle } from '@/lib/blog';
import { getClusterForCategory, getCrossClusterLinks } from '@/lib/blog-seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const articles = (await getArticles()) as BlogArticle[];
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
  const articles = (await getArticles()) as BlogArticle[];
  const category = findCategoryBySlug(articles, slug);

  if (!category) {
    notFound();
  }

  const filteredArticles = articles.filter((article) => getArticleCategory(article) === category.name);
  const categories = buildBlogCategories(articles);
  const cluster = getClusterForCategory(category.name);
  const crossClusterLinks = getCrossClusterLinks(articles, category.name, 3);

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name} — блог ${SITE_NAME}`,
    description: category.description,
    isPartOf: absoluteUrl('/blog'),
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: filteredArticles.map((article, index: number) => ({
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
      {
        '@type': 'ListItem',
        position: 3,
        name: category.name,
        item: absoluteUrl(`/blog/category/${category.slug}`),
      },
    ],
  };

  return (
    <div className={styles.blogPage}>
      <JsonLd data={itemListJsonLd} />
      <JsonLd data={breadcrumbData} />

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
            <Link href="/">Главная</Link>
            <span>/</span>
            <Link href="/blog">Блог</Link>
            <span>/</span>
            <span>{category.name}</span>
          </nav>
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

      <section className={styles.clusterSection}>
        <div className={styles.articlesContainer}>
          <h2 className={styles.clusterHeading}>Кластер запросов: {cluster.category}</h2>
          <div className={styles.clusterGrid}>
            <article className={styles.clusterCard}>
              <p className={styles.clusterIntent}>{cluster.intent}</p>
              <p className={styles.clusterDescription}>{cluster.hubDescription}</p>
              <ul className={styles.clusterQueryList}>
                {cluster.primaryQueries.map((query) => (
                  <li key={query}>{query}</li>
                ))}
              </ul>
            </article>
            <article className={styles.clusterCard}>
              <h3 className={styles.clusterCardTitle}>Смежные кластеры</h3>
              <p className={styles.clusterDescription}>
                Усиливаем перелинковку между тематическими хабами, чтобы робот видел структуру тем.
              </p>
              <ul className={styles.clusterLinksList}>
                {crossClusterLinks.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/blog/category/${item.slug}`}>{item.category}</Link>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.articlesSection}>
        <div className={styles.articlesContainer}>
          <div className={styles.bentoGrid}>
            {filteredArticles.map((article, index: number) => (
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
                      {new Date(article.created_at || '1970-01-01T00:00:00.000Z').toLocaleDateString('ru-RU', {
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
