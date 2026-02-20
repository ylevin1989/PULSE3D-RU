import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';

export function middleware(request: NextRequest) {
    const url = request.nextUrl;

    // Rewrite /uploads/... requests to /api/uploads/...
    // This ensures that even legacy image paths and runtime uploads are served dynamically
    if (url.pathname.startsWith('/uploads/') && !url.pathname.startsWith('/api/')) {
        const newUrl = new URL(url.toString());
        newUrl.pathname = `/api${url.pathname}`;
        return NextResponse.rewrite(newUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/uploads/:path*'],
};
