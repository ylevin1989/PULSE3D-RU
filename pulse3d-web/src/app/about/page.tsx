import type { Metadata } from 'next';
import Image from 'next/image';
import styles from './about.module.css';

export const metadata: Metadata = {
    title: 'О компании | PULSE 3D',
    description: 'Узнайте больше о PULSE 3D — эксперте в области промышленной 3D-печати в Санкт-Петербурге. Наша миссия, ценности и юридическая информация.',
};

const AboutPage = () => {
    const requisites = [
        { label: 'Наименование', value: 'ООО "УНО"' },
        { label: 'ИНН', value: '7801648290' },
        { label: 'КПП', value: '783801001' },
        { label: 'ОГРН', value: '1187847230471' },
        { label: 'ОКПО', value: '32490543' },
        { label: 'ОКАТО', value: '40262000000' },
        { label: 'ОКТМО', value: '40303000000' },
        { label: 'Расчетный счет', value: '40702810300000902252' },
        { label: 'Банк', value: 'АО Банк «ПСКБ» г. САНКТ-ПЕТЕРБУРГ' },
        { label: 'БИК', value: '044030852' },
        { label: 'Корр. счет', value: '30101810000000000852' },
        { label: 'Юридический адрес', value: '190021, Санкт-Петербург, улица Галерная, дом 73, литер А, помещение 1-Н, Ч.П. 502' },
        { label: 'Телефон', value: '+ 7 812 248-08-99' },
        { label: 'Генеральный директор', value: 'Янковская Илона Борисовна' },
    ];

    return (
        <div className={styles.container}>
            <section className={styles.hero}>
                <h1 className={styles.title}>О КОМПАНИИ / <span style={{ color: '#94a3b8' }}>ABOUT US</span></h1>
            </section>

            <div className={styles.intro}>
                <div className={styles.textBlock}>
                    <p className={styles.mainText}>
                        PULSE 3D — это производственная компания нового поколения, специализирующаяся на серийной 3D-печати и быстром прототипировании для бизнеса.
                    </p>
                    <p className={styles.secondaryText}>
                        Мы помогаем компаниям оптимизировать производство, сокращать сроки разработки продуктов и выпускать малые и средние партии деталей без огромных вложений в литьевые формы.
                        Наш парк из 10 скоростных принтеров Bambu Lab обеспечивает высочайшую точность (до 0.1 мм) и стабильное качество каждой детали.
                    </p>
                    <p className={styles.secondaryText}>
                        Мы верим, что будущее производства — в гибкости и цифровых технологиях. Каждый наш проект — это сочетание инженерного подхода, современного ПО и страсти к инновациям.
                    </p>
                </div>
                <div className={styles.imageWrapper}>
                    <Image
                        src="/about_hero.png"
                        alt="PULSE 3D Production"
                        width={600}
                        height={400}
                        className={styles.aboutImage}
                        priority
                    />
                </div>
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <span className={styles.statValue}>10+</span>
                    <span className={styles.statLabel}>Принтеров в парке</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statValue}>500+</span>
                    <span className={styles.statLabel}>Успешных кейсов</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statValue}>0.1мм</span>
                    <span className={styles.statLabel}>Точность печати</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statValue}>24/7</span>
                    <span className={styles.statLabel}>Работа производства</span>
                </div>
            </div>

            <section className={styles.requisitesSection}>
                <h2 className={styles.requisitesTitle}>Юридическая информация / <span style={{ color: '#94a3b8', fontSize: '18px' }}>REQUISITES</span></h2>
                <div className={styles.requisitesGrid}>
                    <div className={styles.requisiteGroup}>
                        {requisites.slice(0, 7).map((req) => (
                            <div key={req.label} className={styles.requisiteItem}>
                                <span className={styles.reqLabel}>{req.label}</span>
                                <span className={styles.reqValue}>{req.value}</span>
                            </div>
                        ))}
                    </div>
                    <div className={styles.requisiteGroup}>
                        {requisites.slice(7).map((req) => (
                            <div key={req.label} className={styles.requisiteItem}>
                                <span className={styles.reqLabel}>{req.label}</span>
                                <span className={styles.reqValue}>{req.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
