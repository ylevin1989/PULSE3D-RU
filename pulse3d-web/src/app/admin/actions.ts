'use server';

import fs from 'fs/promises';
import path from 'path';

export async function getContent() {
    const filePath = path.join(process.cwd(), 'src/data/content.json');
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
}

export async function saveContent(newData: any) {
    const filePath = path.join(process.cwd(), 'src/data/content.json');
    await fs.writeFile(filePath, JSON.stringify(newData, null, 4), 'utf8');
    return { success: true };
}
