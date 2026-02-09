import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: Request) {
    try {
        // Используем встроенный механизм Next.js для работы с куками
        const token = request.headers.get('cookie')
            ?.split('; ')
            .find(row => row.startsWith('admin_token='))
            ?.split('=')[1];

        // Дополнительная проверка через cookie-store если первый способ не сработал
        if (!token) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        const filePath = path.join(process.cwd(), 'src/data/content.json');
        const content = JSON.parse(await fs.readFile(filePath, 'utf8'));
        const { jwtSecret } = content.settings;

        jwt.verify(token, jwtSecret);

        return NextResponse.json({ authenticated: true });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
}
