import type { Metadata } from 'next';
import styles from './pricing.module.css';
import content from '../../data/content.json';
import ModalTrigger from '@/components/ui/ModalTrigger';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
    title: 'Цены на 3D печать в СПб | PULSE 3D',
    description: 'Стоимость серийной 3D-печати и прототипирования. Прозрачное ценообразование и расчет стоимости проекта в течение 10 минут.',
};

const PricingPage = () => {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: '3D Печать',
        provider: {
            '@type': 'Organization',
            name: 'PULSE 3D'
        },
        offers: content.pricing.tariffs.map((tariff: any) => ({
            '@type': 'Offer',
            name: tariff.name,
            price: tariff.price.replace(/\D/g, ''),
            priceCurrency: 'RUB'
        }))
    };

    return (
        <div className={styles.container}>
            <JsonLd data={jsonLd} />
            <section className={styles.intro}>
                <h1 className="section-title">ЦЕНЫ / <span style={{ color: '#94a3b8' }}>PRICING</span></h1>
                <p className={styles.introText}>
                    {content.pricing.introText}
                </p>
            </section>

            <section className={styles.tariffsSection}>
                <div className={styles.tariffsGrid}>
                    {content.pricing.tariffs.map((tariff: any) => (
                        <div key={tariff.name} className={styles.tariffCard}>
                            <div className={styles.tariffHeader}>
                                <span className={styles.tariffName}>{tariff.name}</span>
                                <div className={styles.tariffPrice}>
                                    {tariff.price.split(' ')[0]}
                                    <span className={styles.priceUnit}>{tariff.price.split(' ').slice(1).join(' ')}</span>
                                </div>
                            </div>

                            <div className={styles.tariffFeatures}>
                                <div className={styles.featureItem}>
                                    <span className={styles.featureLabel}>Материалы</span>
                                    <span className={styles.featureValue}>{tariff.materials}</span>
                                </div>
                                <div className={styles.featureItem}>
                                    <span className={styles.featureLabel}>Оборудование</span>
                                    <span className={styles.featureValue}>{tariff.equipment}</span>
                                </div>
                                <div className={styles.featureItem}>
                                    <span className={styles.featureLabel}>Применение</span>
                                    <span className={styles.featureValue}>{tariff.usage}</span>
                                </div>
                            </div>

                            <ModalTrigger
                                className="primary-button primary-button--outline"
                                style={{ width: '100%', height: '48px', fontSize: '12px' }}
                                data={{ tariff: tariff.name, price: tariff.price }}
                            >
                                ВЫБРАТЬ {tariff.name}
                            </ModalTrigger>
                        </div>
                    ))}
                </div>

                <div className={styles.extraInfo}>
                    <div className={styles.extraCard}>
                        <span className={styles.extraLabel}>Минимальный заказ</span>
                        <span className={styles.extraValue}>350 ₽</span>
                    </div>
                    <div className={styles.extraCard}>
                        <span className={styles.extraLabel}>Запуск печати</span>
                        <span className={styles.extraValue}>200 ₽</span>
                    </div>
                    <div className={styles.extraCard}>
                        <span className={styles.extraLabel}>3D Моделирование</span>
                        <span className={styles.extraValue}>от 1000 ₽</span>
                    </div>
                </div>
            </section>

            <section className={styles.faq}>
                <h2 className={styles.faqSectionTitle}>ВОПРОСЫ / <span style={{ color: '#94a3b8' }}>FAQ</span></h2>
                <div className={styles.faqGrid}>
                    <div className={styles.faqItem}>
                        <h3>Как узнать точную цену?</h3>
                        <p>Пришлите нам 3D модель (STL/STEP). Мы загрузим её в слайсер и скажем точное время печати и стоимость.</p>
                    </div>
                    <div className={styles.faqItem}>
                        <h3>Как быстро сделаете?</h3>
                        <p>Благодаря парку из 10 машин, небольшие заказы отдаем в день обращения. Партии — от 2 дней.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PricingPage;
