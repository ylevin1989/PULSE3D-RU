'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Filter, Calendar, ArrowRight, Tag } from 'lucide-react';
import styles from './Blog.module.css';

export default function BlogClient({ initialArticles }: { initialArticles: any[] }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('Все');

    const categories = useMemo(() => {
        const cats = new Set(initialArticles.map(a => a.category || 'Статья'));
        return ['Все', ...Array.from(cats)];
    }, [initialArticles]);

    const filteredArticles = useMemo(() => {
        return initialArticles.filter(article => {
            const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === 'Все' || (article.category || 'Статья') === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [initialArticles, searchQuery, activeCategory]);

    return (
        <div className={styles.blogPage}>
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <div className={styles.heroBadge}>Блок материалов</div>
                    <h1 className={styles.title}>Блог и База знаний</h1>
                    <p className={styles.subtitle}>
                        Всё о 3D-печати: от основ для новичков до технических мануалов для профессионалов.
                    </p>
                </div>
            </section>

            <section className={styles.controlsSection}>
                <div className={styles.controlsContainer}>
                    <div className={styles.toolbar}>
                        <div className={styles.searchBox}>
                            <Search className={styles.searchIcon} size={20} />
                            <input
                                type="text"
                                placeholder="Поиск статей..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={styles.searchInput}
                            />
                        </div>
                        <div className={styles.categories}>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`${styles.categoryBtn} ${activeCategory === cat ? styles.activeCategory : ''}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.articlesSection}>
                <div className={styles.articlesContainer}>
                    {filteredArticles.length > 0 ? (
                        <div className={styles.bentoGrid}>
                            {filteredArticles.map((article: any, index: number) => (
                                <Link
                                    key={article.id}
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
                                                {article.category || 'Статья'}
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
                                                    year: 'numeric'
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
                    ) : (
                        <div className={styles.empty}>
                            <div className={styles.emptyIcon}>🔍</div>
                            <h3>Ничего не найдено</h3>
                            <p>Попробуйте изменить параметры поиска или фильтрации</p>
                            <button onClick={() => { setSearchQuery(''); setActiveCategory('Все'); }} className={styles.resetBtn}>
                                Сбросить все фильтры
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
