import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
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
        const uploadDir = join(process.cwd(), 'public/uploads', folder);

        // Ensure directory exists
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (e) {
            console.error('Error creating directory:', e);
        }

        const path = join(uploadDir, fileName);

        await writeFile(path, buffer);
        console.log(`File saved to ${path}`);

        // Construct URL - folder is part of path
        const relativeUrl = `/uploads/${folder ? folder + '/' : ''}${fileName}`;

        return NextResponse.json({
            success: true,
            url: relativeUrl
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed: ' + (error as Error).message }, { status: 500 });
    }
}
