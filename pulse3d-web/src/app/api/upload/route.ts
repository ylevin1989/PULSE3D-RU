import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const folder = (formData.get('folder') as string) || 'uploads';

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;

        // Путь сохранения: public/uploads/... или public/cases/...
        const relativePath = `/${folder}/${fileName}`;
        const absolutePath = path.join(process.cwd(), 'public', folder, fileName);

        // Создаем папку, если ее нет
        await fs.mkdir(path.dirname(absolutePath), { recursive: true });

        // Пишем файл
        await fs.writeFile(absolutePath, buffer);

        return NextResponse.json({ url: relativePath });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
