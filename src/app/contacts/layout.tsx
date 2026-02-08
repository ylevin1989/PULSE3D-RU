import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Контакты и адрес в Санкт-Петербурге',
    description: 'Свяжитесь с PULSE 3D для заказа 3D-печати. Наш адрес в Санкт-Петербурге, телефон и форма обратной связи для расчета проекта.',
};

export default function ContactsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
