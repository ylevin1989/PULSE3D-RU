import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../portfolio.module.css';
import content from '../../../data/content.json';

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const work = content.portfolio.works.find((w: any) => w.slug === slug);

    if (!work) return { title: 'Проект не найден' };

    return {
        title: `${work.title} | Кейс PULSE 3D`,
        description: work.desc,
        openGraph: {
            title: work.title,
            description: work.desc,
            images: [{ url: work.image }],
        }
    };
}

export async function generateStaticParams() {
    return content.portfolio.works.map((work: any) => ({
        slug: work.slug,
    }));
}

const CaseDetailPage = async (props: Props) => {
    const params = await props.params;
    const { slug } = params;
    const work = content.portfolio.works.find((w: any) => w.slug === slug);

    if (!work) {
        notFound();
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: work.title,
        description: work.desc,
        image: work.image,
        author: {
            '@type': 'Organization',
            name: 'PULSE 3D'
        }
    };

    // Helper to parse the structured details
    const parseDetail = (text: string) => {
        if (text.startsWith('Вызов:')) return { label: 'ВЫЗОВ', value: text.replace('Вызов:', '').trim(), type: 'primary' };
        if (text.startsWith('Задача:')) return { label: 'ЗАДАЧА', value: text.replace('Задача:', '').trim(), type: 'primary' };
        if (text.startsWith('Проблема:')) return { label: 'ПРОБЛЕМА', value: text.replace('Проблема:', '').trim(), type: 'primary' };

        if (text.startsWith('Решение:')) return { label: 'РЕШЕНИЕ', value: text.replace('Решение:', '').trim(), type: 'accent' };
        if (text.startsWith('Реализация:')) return { label: 'РЕАЛИЗАЦИЯ', value: text.replace('Реализация:', '').trim(), type: 'accent' };

        if (text.startsWith('Результат:')) return { label: 'РЕЗУЛЬТАТ', value: text.replace('Результат:', '').trim(), type: 'success' };

        return { label: null, value: text, type: 'default' };
    };

    return (
        <div className={styles.container}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <header className={styles.detailHeader}>
                <Link href="/portfolio" className={styles.backLink}>
                    <svg viewBox="0 0 24 24" fill="none" width="20" height="20" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                    Вернуться в портфолио
                </Link>
                <div className={styles.titleWrapper}>
                    <h1 className={styles.detailTitle}>{work.title}</h1>
                    <div className={styles.titleLine}></div>
                </div>
            </header>

            <div className={styles.detailGrid}>
                <div className={styles.detailLeft}>
                    <div className={styles.mainImageWrapper}>
                        <Image
                            src={work.image}
                            alt={work.title}
                            width={1200}
                            height={800}
                            className={styles.detailImage}
                            priority
                        />
                    </div>

                    <div className={styles.storySection}>
                        <h2 className={styles.storyTitle}>О ПРОЕКТЕ</h2>
                        <p className={styles.storyDesc}>{work.desc}</p>

                        <div className={styles.structuredDetails}>
                            {work.details && work.details.map((detail: string, i: number) => {
                                const parsed = parseDetail(detail);
                                return (
                                    <div key={i} className={`${styles.detailCard} ${parsed.label ? styles[`card_${parsed.type}`] : ''}`}>
                                        {parsed.label && <span className={styles.detailLabel}>{parsed.label}</span>}
                                        <p className={styles.detailText}>{parsed.value}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <aside className={styles.detailSidebar}>
                    <div className={styles.specsBox}>
                        <h3 className={styles.specsTitle}>ТЕХНИЧЕСКИЕ ДАННЫЕ</h3>

                        <div className={styles.specItem}>
                            <span className={styles.specLabel}>МАТЕРИАЛ</span>
                            <span className={styles.specValue}>{work.material}</span>
                        </div>

                        <div className={styles.specItem}>
                            <span className={styles.specLabel}>ТЕХНОЛОГИЯ</span>
                            <span className={styles.specValue}>FDM Industrial</span>
                        </div>

                        <div className={styles.specItem}>
                            <span className={styles.specLabel}>ОБОРУДОВАНИЕ</span>
                            <span className={styles.specValue}>Bambu Lab H2S / P1S</span>
                        </div>

                        <div className={styles.specItem}>
                            <span className={styles.specLabel}>КОНТРОЛЬ КАЧЕСТВА</span>
                            <span className={styles.specValue}>ОТК Пройден</span>
                        </div>

                        <div className={styles.ctaWrapper}>
                            <Link href="/contacts" className="primary-button primary-button--filled" style={{ width: '100%', justifyContent: 'center' }}>
                                Рассчитать аналогичный проект
                            </Link>
                        </div>
                    </div>

                    <div className={styles.guaranteeBox}>
                        <div className={styles.guaranteeItem}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                            <span>Гарантия прочности по NDA</span>
                        </div>
                        <div className={styles.guaranteeItem}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>Срок от 48 часов</span>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default CaseDetailPage;

