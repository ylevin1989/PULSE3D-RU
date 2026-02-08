'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './home.module.css';
import content from '../data/content.json';
import { useModal } from '../context/ModalContext';

export default function HomeClient() {
    const { openModal } = useModal();
    const { home } = content as any;

    return (
        <div className={styles.main}>
            <div className="bg-grid"></div>

            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <div className={styles.heroTags}>
                        <span className={styles.tag}>INDUSTRIAL 3D PRINTING</span>
                        <span className={styles.tag}>SAINT-PETERSBURG</span>
                    </div>
                    <h1 className={styles.heroTitle}>{home.heroTitle}</h1>
                    <p className={styles.heroDesc}>{home.heroDesc}</p>

                    <div className={styles.heroActions}>
                        <button onClick={() => openModal()} className="primary-button primary-button--filled">
                            Рассчитать проект
                        </button>
                        <Link href="/portfolio" className="primary-button primary-button--outline">
                            Наши кейсы
                        </Link>
                    </div>
                </div>

                <div className={styles.heroVisual}>
                    <div className={styles.imageCard}>
                        <Image
                            src="/printer_business.png"
                            alt="3D Printing Production"
                            width={800}
                            height={600}
                            className={styles.heroImage}
                            priority
                        />
                        <div className={styles.imageOverlay}>
                            <div className={styles.statLine}>
                                <span>CAPACITY:</span>
                                <strong>10 UNITS</strong>
                            </div>
                            <div className={styles.statLine}>
                                <span>ACCURACY:</span>
                                <strong>0.1 MM</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.uspSection}>
                <div className={styles.uspGrid}>
                    {home.usp.map((item: any, idx: number) => (
                        <div key={idx} className={styles.uspCard}>
                            <span className={styles.uspIdx}>0{idx + 1}</span>
                            <h3 className={styles.uspTitle}>{item.title}</h3>
                            <p className={styles.uspText}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className={styles.industriesSection}>
                <h2 className="section-title">ОТРАСЛИ / <span style={{ color: '#94a3b8' }}>SECTORS</span></h2>
                <div className={styles.industryGrid}>
                    {home.industries.map((ind: any, idx: number) => (
                        <div key={idx} className={styles.industryCard}>
                            <h4 className={styles.industryTitle}>{ind.title}</h4>
                            <p className={styles.industryDesc}>{ind.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className={styles.ctaBanner}>
                <div className={styles.ctaContent}>
                    <h2>ГОТОВЫ НАЧАТЬ ПРОИЗВОДСТВО?</h2>
                    <p>Загрузите STL или STEP файл для мгновенной консультации.</p>
                </div>
                <button onClick={() => openModal()} className="primary-button primary-button--filled" style={{ background: '#fff', color: 'var(--color-brand-primary)' }}>
                    ОТПРАВИТЬ ФАЙЛ
                </button>
            </section>
        </div>
    );
}
