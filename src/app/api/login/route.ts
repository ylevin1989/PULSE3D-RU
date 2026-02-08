import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        // Read settings
        const filePath = path.join(process.cwd(), 'src/data/content.json');
        const content = JSON.parse(await fs.readFile(filePath, 'utf8'));
        const { adminUsername, adminPassword, jwtSecret } = content.settings;

        // Verify username
        const isUsernameMatch = await bcrypt.compare(username, adminUsername);
        if (!isUsernameMatch) {
            return NextResponse.json({ error: 'Неверный логин или пароль' }, { status: 401 });
        }

        // Verify password
        const isPasswordMatch = await bcrypt.compare(password, adminPassword);
        if (!isPasswordMatch) {
            return NextResponse.json({ error: 'Неверный логин или пароль' }, { status: 401 });
        }

        // Create JWT
        const token = jwt.sign({ username }, jwtSecret, { expiresIn: '24h' });

        const response = NextResponse.json({ success: true });

        // Set cookie
        response.cookies.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 86400 // 24 hours
        });

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
    }
}
