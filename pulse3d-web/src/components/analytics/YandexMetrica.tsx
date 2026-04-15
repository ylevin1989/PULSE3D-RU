'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';

export default function YandexMetrica({ counterId }: { counterId: string }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!counterId) return;

        if (typeof window.ym !== 'undefined') {
            window.ym(counterId, 'hit', pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : ''));
        }
    }, [pathname, searchParams, counterId]);

    if (!counterId) return null;

    return (
        <>
            <Script id="yandex-metrika" strategy="afterInteractive">
                {`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(${counterId}, "init", {
               ssr:true,
               webvisor:true,
               clickmap:true,
               ecommerce:"dataLayer",
               referrer: document.referrer,
               url: location.href,
               accurateTrackBounce:true,
               trackLinks:true
          });
        `}
            </Script>
            <noscript>
                <div>
                    <img
                        src={`https://mc.yandex.ru/watch/${counterId}`}
                        style={{ position: 'absolute', left: '-9999px' }}
                        alt=""
                    />
                </div>
            </noscript>
        </>
    );
}

// Typing for window.ym
declare global {
    interface Window {
        ym: any;
    }
}
