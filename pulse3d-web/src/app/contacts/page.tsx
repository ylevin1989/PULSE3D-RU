import type { Metadata } from 'next';
import ContactsClient from './ContactsClient';
import JsonLd from '@/components/seo/JsonLd';
import contentData from '../../data/content.json';

export const metadata: Metadata = {
    title: 'Контакты и адрес в Санкт-Петербурге | PULSE 3D',
    description: 'Свяжитесь с PULSE 3D для заказа 3D-печати. Наш адрес в Санкт-Петербурге, телефон и форма обратной связи для расчета проекта.',
    alternates: {
        canonical: '/contacts',
    },
    openGraph: {
        url: '/contacts',
    },
};

const ContactsPage = () => {
    const settings = contentData.settings as any;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        mainEntity: {
            '@type': 'LocalBusiness',
            name: 'PULSE 3D',
            telephone: settings.contactPhone,
            email: settings.contactEmail,
            address: {
                '@type': 'PostalAddress',
                streetAddress: settings.address,
                addressLocality: 'Санкт-Петербург',
                addressCountry: 'RU'
            }
        }
    };

    return (
        <>
            <JsonLd data={jsonLd} />
            <ContactsClient />
        </>
    );
};

export default ContactsPage;
