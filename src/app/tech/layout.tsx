import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Оборудование и парк 3D-принтеров',
    description: 'Наш парк оборудования для промышленной 3D-печати. Современные скоростные 3D-принтеры Bambu Lab для серийного производства деталей.',
};

export default function TechLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
