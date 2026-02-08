import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Цены на 3D печать в СПб',
    description: 'Стоимость серийной 3D-печати и прототипирования. Прозрачное ценообразование и расчет стоимости проекта в течение 10 минут.',
};

export default function PricingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
