import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        const filePath = path.join(process.cwd(), 'src/data/content.json');
        const content = JSON.parse(await fs.readFile(filePath, 'utf8'));
        const { adminUsername, adminPassword, jwtSecret } = content.settings;

        // Внимание: в content.json у нас хранятся хеши
        const isUsernameValid = await bcrypt.compare(username, adminUsername);
        const isPasswordValid = await bcrypt.compare(password, adminPassword);

        if (isUsernameValid && isPasswordValid) {
            const token = jwt.sign({ username }, jwtSecret, { expiresIn: '7d' });

            const response = NextResponse.json({ success: true });

            // Устанавливаем куку
            response.cookies.set('admin_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 7, // 1 неделя
                path: '/',
            });

            return response;
        }

        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
