'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function YandexMetrica({ counterId }: { counterId: string }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const parsedCounterId = Number(counterId);

    useEffect(() => {
        if (!parsedCounterId) return;

        if (typeof window.ym !== 'undefined') {
            window.ym(parsedCounterId, 'hit', pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : ''));
        }
    }, [pathname, searchParams, parsedCounterId]);

    if (!parsedCounterId) return null;

    return null;
}

// Typing for window.ym
declare global {
    interface Window {
        ym: any;
    }
}
