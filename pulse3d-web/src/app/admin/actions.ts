'use server';

import pool from '../../lib/db';

export async function getContent() {
    const fs = await import('fs/promises');
    const path = await import('path');
    const filePath = path.join(process.cwd(), 'src/data/content.json');
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
}

export async function saveContent(newData: any) {
    const fs = await import('fs/promises');
    const path = await import('path');
    const filePath = path.join(process.cwd(), 'src/data/content.json');
    await fs.writeFile(filePath, JSON.stringify(newData, null, 4), 'utf8');
    return { success: true };
}

export async function getLeads() {
    try {
        const result = await pool.query('SELECT * FROM leads ORDER BY created_at DESC');
        return result.rows;
    } catch (error) {
        console.error('Error fetching leads:', error);
        return [];
    }
}

export async function deleteLead(id: number) {
    try {
        await pool.query('DELETE FROM leads WHERE id = $1', [id]);
        return { success: true };
    } catch (error) {
        console.error('Error deleting lead:', error);
        return { success: false };
    }
}
