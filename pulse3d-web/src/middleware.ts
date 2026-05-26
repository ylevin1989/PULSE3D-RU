import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl;

    // Rewrite /uploads/... requests to /api/uploads/...
    // This ensures that even legacy image paths and runtime uploads are served dynamically
    if (url.pathname.startsWith('/uploads/') && !url.pathname.startsWith('/api/')) {
        const newUrl = new URL(url.toString());
        newUrl.pathname = `/api${url.pathname}`;
        return NextResponse.rewrite(newUrl);
    }

    // Normalize Yandex tracking noise: drop `etext` parameter via permanent redirect.
    // This removes duplicate URLs in webmaster reports and consolidates signals.
    if (url.searchParams.has('etext')) {
        const newUrl = new URL(url.toString());
        newUrl.searchParams.delete('etext');
        return NextResponse.redirect(newUrl, 301);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/:path*'],
};
