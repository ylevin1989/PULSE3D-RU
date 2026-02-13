import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
import { ModalProvider } from "../context/ModalContext";
import ClientWrapper from "../components/layout/ClientWrapper";
import YandexMetrica from "../components/analytics/YandexMetrica";
import { getContent } from "./admin/actions";

export const metadata: Metadata = {
  metadataBase: new URL('https://pulse3d.ru'), // Change to actual domain when ready
  title: {
    default: "PULSE 3D | Промышленная 3D печать Санкт-Петербург",
    template: "%s | PULSE 3D"
  },
  description: "Серийное производство деталей из пластика и нейлона в Санкт-Петербурге. Парк из 10 скоростных 3D-принтеров Bambu Lab. Высокая точность 0.1 мм.",
  keywords: ["3D печать Санкт-Петербург", "серийная 3D печать", "печать пластиком", "Bambu Lab печать", "производство деталей", "3D печать цена", "PULSE 3D"],
  authors: [{ name: "PULSE 3D" }],
  creator: "PULSE 3D",
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://pulse3d.ru',
    siteName: 'PULSE 3D',
    title: 'PULSE 3D | Промышленная 3D печать Санкт-Петербург',
    description: 'Серийное производство деталей из пластика и нейлона. Парк из 10 скоростных 3D-принтеров Bambu Lab.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PULSE 3D Production',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PULSE 3D | Промышленная 3D печать',
    description: 'Серийное производство деталей из пластика и нейлона.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/logo_original.png',
    shortcut: '/logo_original.png',
    apple: '/logo_original.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getContent();
  const yandexMetricaId = content.settings.yandexMetricaId;

  return (
    <html lang="ru">
      <body>
        <Suspense fallback={null}>
          <YandexMetrica counterId={yandexMetricaId} />
        </Suspense>
        <ModalProvider>
          <ClientWrapper>
            {children}
          </ClientWrapper>
        </ModalProvider>
      </body>
    </html>
  );
}
