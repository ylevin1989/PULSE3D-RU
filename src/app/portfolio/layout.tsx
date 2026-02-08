import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Портфолио и примеры работ',
    description: 'Кейсы и примеры выполненных работ по 3D-печати. Изготовление корпусов, прототипов и серийных деталей из различных пластиков.',
};

export default function PortfolioLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
