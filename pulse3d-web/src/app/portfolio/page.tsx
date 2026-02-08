import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from './portfolio.module.css';
import content from '../../data/content.json';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
    title: 'Портфолио и примеры работ | PULSE 3D',
    description: 'Кейсы и примеры выполненных работ по 3D-печати. Изготовление корпусов, прототипов и серийных деталей из различных пластиков.',
};

const PortfolioPage = () => {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: content.portfolio.works.map((work, index) => ({
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

            <div className={styles.grid}>
                {content.portfolio.works.map((work) => (
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
                                    <span className={styles.statLabel}>ФИНИШ</span>
                                    <span className={styles.statValue}>MATTE</span>
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
