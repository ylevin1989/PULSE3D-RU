import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const folder = formData.get('folder') as string || 'uploads';

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Standardize filename to avoid issues
        const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-').toLowerCase()}`;
        const path = join(process.cwd(), 'public', folder, filename);

        await writeFile(path, buffer);
        console.log(`File saved to ${path}`);

        return NextResponse.json({
            success: true,
            url: `/${folder}/${filename}`
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
    }
}
