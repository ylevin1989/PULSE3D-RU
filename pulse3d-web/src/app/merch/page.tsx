import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import styles from './merch.module.css';
import ModalTrigger from '@/components/ui/ModalTrigger';
import { getContent } from '../admin/actions';

export const metadata: Metadata = {
    title: 'Мерч и Сувениры | PULSE 3D',
    description: 'Брендированная сувенирная продукция и мерч с использованием 3D-печати в Санкт-Петербурге.',
};

export default async function MerchPage() {
    const content = await getContent();
    const { merch } = content;

    return (
        <main className={styles.main}>
            <section className={styles.intro}>
                <h1 className={styles.title}>{merch.introTitle}</h1>
                <p className={styles.desc}>{merch.introText}</p>
            </section>

            <section className={styles.categoriesGrid}>
                {merch.categories.map((category: any, idx: number) => (
                    <div key={idx} className={styles.categoryCard}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src={category.image}
                                alt={category.title}
                                fill
                                className={styles.categoryImage}
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className={styles.cardContent}>
                            <h2 className={styles.categoryTitle}>{category.title}</h2>
                            <p className={styles.categoryDesc}>{category.desc}</p>
                        </div>
                    </div>
                ))}
            </section>

            <section className={styles.ctaBanner}>
                <div className={styles.ctaContent}>
                    <h2>Готовы создать свой мерч?</h2>
                    <p>Напишите нам для обсуждения вашего проекта</p>
                </div>
                <ModalTrigger className="primary-button primary-button--outline" style={{ borderColor: '#fff', color: '#fff' }}>
                    Связаться с нами
                </ModalTrigger>
            </section>
        </main>
    );
}