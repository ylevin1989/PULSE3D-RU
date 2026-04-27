import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from './portfolio.module.css';
import content from '../../data/content.json';
import JsonLd from '@/components/seo/JsonLd';

type PortfolioWork = {
    slug: string;
    title: string;
    material: string;
    image?: string;
    desc: string;
    technology?: string;
};

type PortfolioPageProps = {
    searchParams?: Promise<{
        tech?: string;
    }>;
};

export const metadata: Metadata = {
    title: 'Портфолио и примеры работ | PULSE 3D',
    description: 'Кейсы и примеры выполненных работ по 3D-печати. Изготовление корпусов, прототипов и серийных деталей из различных пластиков.',
    alternates: {
        canonical: '/portfolio',
    },
    openGraph: {
        url: '/portfolio',
    },
};

const normalizeTech = (value: string) => value.trim().toLowerCase();

const PortfolioPage = async ({ searchParams }: PortfolioPageProps) => {
    const params = (await searchParams) || {};
    const works = content.portfolio.works as PortfolioWork[];
    const technologies = ['Все', ...Array.from(new Set(works.map((work) => work.technology || 'FDM')))];
    const selectedTech = technologies.find(
        (tech) => normalizeTech(tech) === normalizeTech(params.tech || 'Все')
    ) || 'Все';
    const filteredWorks = selectedTech === 'Все'
        ? works
        : works.filter((work) => (work.technology || 'FDM') === selectedTech);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: filteredWorks.map((work, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `https://pulse3d.ru/portfolio/${work.slug}`,
            name: work.title,
            image: work.image
        }))
    };

    return (
        <div className={styles.container}>
            <JsonLd data={jsonLd} />
            <section className={styles.intro}>
                <h1 className="section-title">ПОРТФОЛИО / <span style={{ color: '#94a3b8' }}>CASE STUDIES</span></h1>
                <p className={styles.introText}>
                    {content.portfolio.introText}
                </p>
            </section>

            <section className={styles.filtersSection}>
                <h2 className={styles.filtersTitle}>ФИЛЬТР ПО ТЕХНОЛОГИИ</h2>
                <div className={styles.filtersRow}>
                    {technologies.map((tech) => {
                        const isActive = tech === selectedTech;
                        const href = tech === 'Все'
                            ? '/portfolio'
                            : `/portfolio?tech=${encodeURIComponent(tech)}`;
                        return (
                            <Link
                                key={tech}
                                href={href}
                                className={`${styles.filterChip} ${isActive ? styles.filterChipActive : ''}`}
                            >
                                {tech}
                            </Link>
                        );
                    })}
                </div>
            </section>

            <div className={styles.grid}>
                {filteredWorks.map((work) => (
                    <Link key={work.slug} href={`/portfolio/${work.slug}`} className={styles.projectCard}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src={work.image || '/cases/placeholder.png'}
                                alt={work.title}
                                width={800}
                                height={500}
                                className={styles.image}
                            />
                        </div>
                        <div className={styles.content}>
                            <span className={styles.materialTag}>{work.material}</span>
                            <h2 className={styles.title}>{work.title}</h2>
                            <p className={styles.desc}>{work.desc}</p>

                            <div className={styles.statsGrid}>
                                <div className={styles.statItem}>
                                    <span className={styles.statLabel}>ТОЧНОСТЬ</span>
                                    <span className={styles.statValue}>±0.1 ММ</span>
                                </div>
                                <div className={styles.statItem}>
                                    <span className={styles.statLabel}>ТЕХНОЛОГИЯ</span>
                                    <span className={styles.statValue}>{work.technology || 'FDM'}</span>
                                </div>
                                <div className={styles.statItem}>
                                    <span className={styles.statLabel}>СТАТУС</span>
                                    <span className={styles.statValue}>ГОТОВО</span>
                                </div>
                            </div>

                            <div className={styles.footer}>
                                ПОДРОБНЕЕ О КЕЙСЕ
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default PortfolioPage;
