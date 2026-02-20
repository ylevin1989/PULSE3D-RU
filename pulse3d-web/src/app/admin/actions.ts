import { revalidatePath } from "next/cache";
import path from "path";
import fs from "fs/promises";

export async function getContent() {
    const filePath = path.join(process.cwd(), 'src/data/content.json');
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
}

export async function getPublicSettings() {
    const content = await getContent();
    const { 
        adminUsername, adminPassword, jwtSecret, 
        yandexMetricaId, ...publicSettings 
    } = content.settings;
    
    return {
        ...content,
        settings: publicSettings,
        yandexMetricaId
    };
}

export async function saveContentAction(newData: any) {
    const filePath = path.join(process.cwd(), 'src/data/content.json');
    await fs.writeFile(filePath, JSON.stringify(newData, null, 4), 'utf8');
    revalidatePath('/', 'layout');
    return { success: true };
}