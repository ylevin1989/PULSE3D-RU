import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;
        let folder = formData.get('folder') as string || '';

        // Security check: Sanitize folder name to prevent path traversal
        folder = folder.replace(/[^a-zA-Z0-9_\-]/g, '');

        if (!file || !file.name) {
            return NextResponse.json({ error: 'No file metadata found' }, { status: 400 });
        }

        if (file.size === 0) {
            return NextResponse.json({ error: 'File is empty' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        // Sanitize filename: remove path characters and limit to safe chars
        const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
        const fileName = `${Date.now()}_${safeName}`;

        // Define upload directory - defaults to public/uploads, can have subfolders
        const uploadDir = path.join(process.cwd(), 'public/uploads', folder);

        // Ensure directory exists
        try {
            await fs.access(uploadDir);
        } catch {
            await fs.mkdir(uploadDir, { recursive: true });
        }

        await fs.writeFile(path.join(uploadDir, fileName), buffer);

        // Construct URL - folder is part of path
        // Use /api/uploads prefix to ensure dynamic serving
        const relativeUrl = `/api/uploads/${folder ? folder + '/' : ''}${fileName}`;

        return NextResponse.json({
            success: true,
            url: relativeUrl
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed: ' + (error as Error).message }, { status: 500 });
    }
}
