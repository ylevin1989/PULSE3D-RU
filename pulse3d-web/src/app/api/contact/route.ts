import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import pool from '@/lib/db';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const name = formData.get('name') as string;
        const phone = formData.get('phone') as string;
        const description = formData.get('description') as string;
        const tariff = formData.get('tariff') as string;
        const price = formData.get('price') as string;
        const file = formData.get('file') as File | null;

        // 1. Save to MySQL
        let fileName = null;
        if (file && file.size > 0) {
            fileName = `${Date.now()}_${file.name}`;
            // Здесь можно добавить сохранение файла на диск, если нужно
        }

        try {
            const [result] = await pool.execute(
                'INSERT INTO leads (name, phone, description, tariff, price, file_url) VALUES (?, ?, ?, ?, ?, ?)',
                [name, phone, description, tariff || null, price || null, fileName]
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
