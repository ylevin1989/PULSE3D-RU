import type { Metadata } from 'next';
import Image from 'next/image';
import styles from './tech.module.css';
import content from '../../data/content.json';
import JsonLd from '../../components/seo/JsonLd';

export const metadata: Metadata = {
    title: 'Оборудование и парк 3D-принтеров | PULSE 3D',
    description: 'Наш парк оборудования для промышленной 3D-печати. Современные скоростные 3D-принтеры Bambu Lab для серийного производства деталей.',
};

const TechPage = () => {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Парк 3D принтеров PULSE 3D',
        itemListElement: content.tech.equipment.map((printer, index) => ({
            '@type': 'Product',
            position: index + 1,
            name: printer.name,
            description: printer.desc,
            image: printer.image
        }))
    };

    return (
        <div className={styles.container}>
            <JsonLd data={jsonLd} />
            <section className={styles.intro}>
                <h1 className="section-title">ПАРК ОБОРУДОВАНИЯ / <span style={{ color: '#94a3b8' }}>PRODUCTION PARK</span></h1>
                <p className={styles.introText}>
                    {content.tech.introText}
                </p>
            </section>

            <div className={styles.equipmentGrid}>
                {content.tech.equipment.map((printer, idx) => (
                    <div key={printer.name} className={styles.printerCard}>
                        <div className={styles.imageArea}>
                            <div className={styles.qtyTag}>{printer.qty}</div>
                            <Image
                                src={printer.image || '/printer_placeholder.png'}
                                alt={printer.name}
                                width={500}
                                height={625}
                                className={styles.printerImage}
                            />
                        </div>
                        <div className={styles.content}>
                            <h2 className={styles.modelName}>{printer.name}</h2>
                            <p className={styles.desc}>{printer.desc}</p>

                            <div className={styles.specs}>
                                <div className={styles.specItem}>
                                    <span className={styles.specLabel}>НАЗНАЧЕНИЕ</span>
                                    <span className={styles.specValue}>{printer.usage}</span>
                                </div>
                                <div className={styles.specItem}>
                                    <span className={styles.specLabel}>ТЕХНОЛОГИЯ</span>
                                    <span className={styles.specValue}>FDM HIGH-SPEED</span>
                                </div>
                                <div className={styles.specItem}>
                                    <span className={styles.specLabel}>МАТЕРИАЛЫ</span>
                                    <span className={styles.specValue}>ИНЖЕНЕРНЫЕ</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TechPage;
