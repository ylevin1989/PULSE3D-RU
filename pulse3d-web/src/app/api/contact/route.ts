import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import pool from '@/lib/db';

type RateLimitEntry = {
    count: number;
    resetAt: number;
};

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 3;

const getRateLimitStore = (): Map<string, RateLimitEntry> => {
    const globalWithStore = globalThis as typeof globalThis & {
        __contactRateLimitStore?: Map<string, RateLimitEntry>;
    };

    if (!globalWithStore.__contactRateLimitStore) {
        globalWithStore.__contactRateLimitStore = new Map<string, RateLimitEntry>();
    }

    return globalWithStore.__contactRateLimitStore;
};

const getClientIp = (request: Request): string => {
    const xForwardedFor = request.headers.get('x-forwarded-for');
    if (xForwardedFor) {
        return xForwardedFor.split(',')[0].trim();
    }
    return request.headers.get('x-real-ip') || 'unknown';
};

const normalize = (value: FormDataEntryValue | null): string => {
    if (typeof value !== 'string') return '';
    return value.trim();
};

const isPhoneValid = (phone: string): boolean => {
    const digits = phone.replace(/\D/g, '');
    return digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'));
};

const isRateLimited = (ip: string): boolean => {
    const now = Date.now();
    const store = getRateLimitStore();
    const current = store.get(ip);

    if (!current || current.resetAt < now) {
        store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
        return false;
    }

    if (current.count >= MAX_REQUESTS_PER_WINDOW) {
        return true;
    }

    current.count += 1;
    store.set(ip, current);
    return false;
};

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const name = normalize(formData.get('name'));
        const phone = normalize(formData.get('phone'));
        const description = normalize(formData.get('description'));
        const tariff = normalize(formData.get('tariff'));
        const price = normalize(formData.get('price'));
        const file = formData.get('file') as File | null;
        const ip = getClientIp(request);

        if (isRateLimited(ip)) {
            return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
        }

        if (name.length < 2 || !isPhoneValid(phone)) {
            return NextResponse.json({ error: 'Invalid form payload' }, { status: 400 });
        }

        // 1. Save to PostgreSQL
        let fileName = null;
        if (file && file.size > 0) {
            fileName = `${Date.now()}_${file.name}`;
            // Здесь можно добавить сохранение файла на диск, если нужно
        }

        try {
            await pool.query(
                'INSERT INTO leads (name, phone, description, tariff, price, file_url) VALUES ($1, $2, $3, $4, $5, $6)',
                [name, phone, description || null, tariff || null, price || null, fileName]
            );
        } catch (dbError) {
            console.error('Database save error:', dbError);
            // Продолжаем выполнение, даже если БД упала, чтобы ушло в ТГ
        }

        // 2. Read settings from content.json for Telegram
        const filePath = path.join(process.cwd(), 'src/data/content.json');
        const content = JSON.parse(await fs.readFile(filePath, 'utf8'));
        const { telegramToken, telegramChatId } = content.settings;

        let text = `
🚀 <b>НОВАЯ ЗАЯВКА - PULSE 3D</b>
-------------------------
👤 <b>Имя:</b> ${name}
📱 <b>Связь:</b> ${phone}
`;

        if (tariff) {
            text += `💰 <b>Тариф:</b> ${tariff} (${price})\n`;
        }

        text += `📝 <b>Задача:</b> ${description}`;

        // 3. Send text message to Telegram
        await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: telegramChatId,
                text: text,
                parse_mode: 'HTML'
            })
        });

        // 4. Send file to Telegram if exists
        if (file && file.size > 0) {
            const telegramFormData = new FormData();
            telegramFormData.append('chat_id', telegramChatId);
            telegramFormData.append('document', file);
            telegramFormData.append('caption', `Файл к заявке от ${name}`);

            await fetch(`https://api.telegram.org/bot${telegramToken}/sendDocument`, {
                method: 'POST',
                body: telegramFormData
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Submit error:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
