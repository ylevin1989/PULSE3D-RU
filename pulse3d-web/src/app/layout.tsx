import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { ModalProvider } from "../context/ModalContext";
import ClientWrapper from "../components/layout/ClientWrapper";
import YandexMetrica from "../components/analytics/YandexMetrica";
import { getPublicSettings } from "./admin/actions";
import JsonLd from "../components/seo/JsonLd";

export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "PULSE 3D | Промышленная 3D печать Санкт-Петербург",
  description: "3D печать в Санкт-Петербурге. Серийное производство деталей из пластика и нейлона. Парк из 10 скоростных 3D-принтеров Bambu Lab.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getPublicSettings();
  const yandexMetricaId = content.yandexMetricaId;
  const settings = content.settings;

  return (
    <html lang="ru">
      <head>
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "PULSE 3D",
          "telephone": settings.contactPhone,
          "email": settings.contactEmail,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": settings.address
          }
        }} />
      </head>
      <body className={inter.className}>
        <Suspense fallback={null}>
          <YandexMetrica counterId={yandexMetricaId} />
        </Suspense>
        <ModalProvider>
          <ClientWrapper settings={settings}>
            {children}
          </ClientWrapper>
        </ModalProvider>
      </body>
    </html>
  );
}