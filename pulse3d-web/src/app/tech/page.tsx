import type { Metadata } from 'next';
import Image from 'next/image';
import styles from './tech.module.css';
import content from '../../data/content.json';
import JsonLd from '@/components/seo/JsonLd';

type TechDirection = {
    type: string;
    title: string;
    description: string;
    useCases: string[];
};

type TechEquipment = {
    name: string;
    qty: string;
    desc: string;
    usage: string;
    technology: string;
    materials: string;
    buildVolume?: string;
    layerThickness?: string;
    performance?: string;
    image?: string;
};

type TechScenario = {
    tag: string;
    title: string;
    description: string;
    examples: string[];
};

type TechContent = {
    introText: string;
    capabilities: string[];
    directions: TechDirection[];
    equipment: TechEquipment[];
    scenarios: TechScenario[];
};

export const metadata: Metadata = {
    title: 'Оборудование и парк 3D-принтеров | PULSE 3D',
    description: 'Полный производственный парк PULSE 3D: металлическая и полимерная 3D-печать, литейные формы, серийные и пилотные партии.',
    alternates: {
        canonical: '/tech',
    },
    openGraph: {
        url: '/tech',
    },
};

const TechPage = () => {
    const techData = content.tech as unknown as TechContent;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Производственный парк PULSE 3D',
        itemListElement: techData.equipment.map((printer, index: number) => ({
            '@type': 'Product',
            position: index + 1,
            name: printer.name,
            description: printer.desc,
            category: printer.technology,
            image: printer.image,
        })),
    };

    return (
        <div className={styles.container}>
            <JsonLd data={jsonLd} />
            <section className={styles.intro}>
                <h1 className="section-title">ПАРК ОБОРУДОВАНИЯ / <span style={{ color: '#94a3b8' }}>PRODUCTION PARK</span></h1>
                <p className={styles.introText}>
                    {techData.introText}
                </p>
                <div className={styles.introBullets}>
                    {techData.capabilities?.map((item: string, idx: number) => (
                        <span key={idx}>{item}</span>
                    ))}
                </div>
            </section>

            <section className={styles.directionsSection}>
                <h2 className={styles.sectionHeading}>ТЕХНОЛОГИЧЕСКИЕ НАПРАВЛЕНИЯ</h2>
                <div className={styles.directionsGrid}>
                    {techData.directions?.map((direction) => (
                        <article key={direction.title} className={styles.directionCard}>
                            <p className={styles.directionType}>{direction.type}</p>
                            <h3>{direction.title}</h3>
                            <p className={styles.directionDesc}>{direction.description}</p>
                            <ul>
                                {direction.useCases?.map((useCase: string) => (
                                    <li key={useCase}>{useCase}</li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </section>

            <div className={styles.equipmentGrid}>
                {techData.equipment.map((printer) => (
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
                                    <span className={styles.specValue}>{printer.technology}</span>
                                </div>
                                <div className={styles.specItem}>
                                    <span className={styles.specLabel}>МАТЕРИАЛЫ</span>
                                    <span className={styles.specValue}>{printer.materials}</span>
                                </div>
                                {printer.buildVolume ? (
                                    <div className={styles.specItem}>
                                        <span className={styles.specLabel}>ОБЛАСТЬ ПОСТРОЕНИЯ</span>
                                        <span className={styles.specValue}>{printer.buildVolume}</span>
                                    </div>
                                ) : null}
                                {printer.layerThickness ? (
                                    <div className={styles.specItem}>
                                        <span className={styles.specLabel}>ТОЛЩИНА СЛОЯ</span>
                                        <span className={styles.specValue}>{printer.layerThickness}</span>
                                    </div>
                                ) : null}
                                {printer.performance ? (
                                    <div className={styles.specItem}>
                                        <span className={styles.specLabel}>ПРОИЗВОДИТЕЛЬНОСТЬ</span>
                                        <span className={styles.specValue}>{printer.performance}</span>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <section className={styles.scenarioSection}>
                <h2 className={styles.sectionHeading}>ТИПОВЫЕ ЗАКАЗЫ И КЕЙСЫ</h2>
                <div className={styles.scenarioGrid}>
                    {techData.scenarios?.map((scenario) => (
                        <article key={scenario.title} className={styles.scenarioCard}>
                            <span className={styles.scenarioTag}>{scenario.tag}</span>
                            <h3>{scenario.title}</h3>
                            <p>{scenario.description}</p>
                            <ul>
                                {scenario.examples?.map((example: string) => (
                                    <li key={example}>{example}</li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default TechPage;
