import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { ModalProvider } from "../context/ModalContext";
import ClientWrapper from "../components/layout/ClientWrapper";
import YandexMetrica from "../components/analytics/YandexMetrica";
import { getPublicSettings } from "./admin/actions";
import JsonLd from "../components/seo/JsonLd";
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "../lib/seo";

export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "PULSE 3D | Промышленная 3D печать Санкт-Петербург",
    template: "%s | PULSE 3D",
  },
  description:
    "3D печать в Санкт-Петербурге. Серийное производство деталей из пластика и нейлона. Парк из 10 скоростных 3D-принтеров Bambu Lab.",
  applicationName: SITE_NAME,
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [{ url: "/rss.xml", title: "PULSE 3D Blog RSS" }],
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "PULSE 3D | Промышленная 3D печать Санкт-Петербург",
    description:
      "Серийное производство деталей из пластика и нейлона в Санкт-Петербурге. Быстрый расчет и запуск в производство.",
    images: [
      {
        url: absoluteUrl(DEFAULT_OG_IMAGE),
        width: 1200,
        height: 630,
        alt: "PULSE 3D — промышленная 3D-печать",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PULSE 3D | Промышленная 3D печать Санкт-Петербург",
    description:
      "Серийное производство деталей из пластика и нейлона. Парк из 10 принтеров Bambu Lab.",
    images: [absoluteUrl(DEFAULT_OG_IMAGE)],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getPublicSettings();
  const yandexMetricaId = content.yandexMetricaId;
  const parsedYandexMetricaId = Number(yandexMetricaId);
  const settings = content.settings;

  return (
    <html lang="ru">
      <head>
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "PULSE 3D",
          "url": SITE_URL,
          "logo": absoluteUrl("/icon.png"),
          "telephone": settings.contactPhone,
          "email": settings.contactEmail,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": settings.address
          }
        }} />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE_NAME,
            url: SITE_URL,
            potentialAction: {
              "@type": "SearchAction",
              target: `${SITE_URL}/blog?query={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }}
        />
        {parsedYandexMetricaId ? (
          <script
            id="yandex-metrika"
            dangerouslySetInnerHTML={{
              __html: `
                (function(m,e,t,r,i,k,a){
                    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                    m[i].l=1*new Date();
                    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a);
                })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${parsedYandexMetricaId}', 'ym');

                ym(${parsedYandexMetricaId}, 'init', {
                    ssr:true,
                    webvisor:true,
                    clickmap:true,
                    ecommerce:"dataLayer",
                    referrer: document.referrer,
                    url: location.href,
                    accurateTrackBounce:true,
                    trackLinks:true
                });
              `,
            }}
          />
        ) : null}
      </head>
      <body className={inter.className}>
        {parsedYandexMetricaId ? (
          <noscript>
            <div>
              <img
                src={`https://mc.yandex.ru/watch/${parsedYandexMetricaId}`}
                style={{ position: 'absolute', left: '-9999px' }}
                alt=""
              />
            </div>
          </noscript>
        ) : null}
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
