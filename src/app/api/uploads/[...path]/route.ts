import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ path: string[] }> }
) {
    try {
        const { path: pathSegments } = await params;
        const filePath = pathSegments.join('/');
        // Security check: prevent path traversal
        const safePath = filePath.replace(/\.\./g, '');
        const fullPath = path.join(process.cwd(), 'public/uploads', safePath);

        try {
            const fileBuffer = await fs.readFile(fullPath);
            const extension = path.extname(fullPath).toLowerCase();

            let contentType = 'application/octet-stream';
            if (extension === '.jpg' || extension === '.jpeg') contentType = 'image/jpeg';
            else if (extension === '.png') contentType = 'image/png';
            else if (extension === '.gif') contentType = 'image/gif';
            else if (extension === '.webp') contentType = 'image/webp';
            else if (extension === '.svg') contentType = 'image/svg+xml';

            return new NextResponse(fileBuffer, {
                headers: {
                    'Content-Type': contentType,
                    'Cache-Control': 'public, max-age=31536000, immutable',
                },
            });
        } catch (error) {
            return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
