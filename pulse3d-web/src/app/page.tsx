import type { Metadata } from 'next';
import HomeClient from './HomeClient';
import JsonLd from '@/components/seo/JsonLd';
import content from '../data/content.json';

export const metadata: Metadata = {
    title: 'PULSE 3D | Промышленная 3D печать Санкт-Петербург',
    description: 'Серийное производство деталей из пластика и нейлона в Санкт-Петербурге. Парк из 10 скоростных 3D-принтеров Bambu Lab. Высокая точность 0.1 мм.',
};

export default function Home() {
    const { settings } = content as any;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'PULSE 3D',
        image: 'https://pulse3d.ru/og-image.png',
        '@id': 'https://pulse3d.ru',
        url: 'https://pulse3d.ru',
        telephone: settings.contactPhone,
        address: {
            '@type': 'PostalAddress',
            streetAddress: '18-я линия В.О., д. 3В',
            addressLocality: 'Санкт-Петербург',
            postalCode: '199178',
            addressCountry: 'RU',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 59.9324,
            longitude: 30.2711,
        },
        openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
                'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
            ],
            opens: '10:00',
            closes: '20:00',
        },
        sameAs: [
            settings.youtubeLink,
            settings.telegramLink,
            settings.whatsappLink,
        ],
    };

    return (
        <>
            <JsonLd data={jsonLd} />
            <HomeClient />
        </>
    );
}
