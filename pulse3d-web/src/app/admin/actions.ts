'use server';
import { revalidatePath } from 'next/cache';
import pool from '../../lib/db';
import fs from 'fs/promises';
import path from 'path';

const BLOG_JSON_PATH = path.join(process.cwd(), 'src/data/blog.json');

// Helper to check DB connection
async function checkDb() {
    try {
        const client = await pool.connect();
        client.release();
        return true;
    } catch (e) {
        console.warn('DB Connection failed, falling back to JSON:', (e as Error).message);
        return false;
    }
}

// Fallback JSON operations
async function getJsonArticles() {
    try {
        const data = await fs.readFile(BLOG_JSON_PATH, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
}

async function saveToJson(articles: any[]) {
    await fs.writeFile(BLOG_JSON_PATH, JSON.stringify(articles, null, 4), 'utf8');
}

export async function initBlog() {
    const isDbUp = await checkDb();
    if (isDbUp) {
        try {
            await pool.query(`
                CREATE TABLE IF NOT EXISTS articles (
                    id SERIAL PRIMARY KEY,
                    slug VARCHAR(255) UNIQUE NOT NULL,
                    title VARCHAR(255) NOT NULL,
                    content TEXT NOT NULL,
                    excerpt TEXT,
                    image_url VARCHAR(500),
                    category VARCHAR(100) DEFAULT 'Article',
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                );
            `);

            const check = await pool.query('SELECT COUNT(*) FROM articles');
            if (parseInt(check.rows[0].count) === 0) {
                const jsonArticles = await getJsonArticles();
                for (const art of jsonArticles) {
                    await pool.query(`
                        INSERT INTO articles (title, slug, content, excerpt, image_url, category) 
                        VALUES ($1, $2, $3, $4, $5, $6)
                    `, [art.title, art.slug, art.content, art.excerpt, art.image_url, art.category]);
                }
            }
            return { success: true };
        } catch (error) {
            console.error('Init blog table failed:', error);
            return { success: false, error: (error as Error).message };
        }
    }
    return { success: true, mode: 'fallback' };
}

export async function getArticles() {
    const isDbUp = await checkDb();
    const jsonArticles = await getJsonArticles();

    if (isDbUp) {
        try {
            const result = await pool.query('SELECT slug, title, content, image_url, excerpt, category FROM articles');

            // Map existing articles by slug for quick lookup
            const existingMap = new Map(result.rows.map(r => [r.slug, r]));

            let needsSync = false;
            if (result.rows.length !== jsonArticles.length) {
                needsSync = true;
            } else {
                // Also check if any content has changed
                for (const art of jsonArticles) {
                    const existing = existingMap.get(art.slug);
                    if (!existing ||
                        existing.title !== art.title ||
                        existing.content !== art.content ||
                        existing.image_url !== art.image_url ||
                        existing.excerpt !== art.excerpt ||
                        existing.category !== art.category) {
                        needsSync = true;
                        break;
                    }
                }
            }

            if (needsSync) {
                console.log('Syncing articles from JSON to DB (content changed)...');
                for (const art of jsonArticles) {
                    await pool.query(`
                        INSERT INTO articles (title, slug, content, excerpt, image_url, category, created_at) 
                        VALUES ($1, $2, $3, $4, $5, $6, $7)
                        ON CONFLICT (slug) DO UPDATE SET
                        title = EXCLUDED.title, content = EXCLUDED.content, excerpt = EXCLUDED.excerpt, 
                        image_url = EXCLUDED.image_url, category = EXCLUDED.category, updated_at = NOW()
                    `, [art.title, art.slug, art.content, art.excerpt, art.image_url, art.category, art.created_at || new Date()]);
                }
            }
            const finalResult = await pool.query('SELECT * FROM articles ORDER BY created_at DESC');
            return finalResult.rows;
        } catch (error) {
            console.error('Error fetching/syncing articles:', error);
            return jsonArticles;
        }
    }
    return jsonArticles;
}

export async function getArticleBySlug(slug: string) {
    const isDbUp = await checkDb();
    if (isDbUp) {
        try {
            const result = await pool.query('SELECT * FROM articles WHERE slug = $1', [slug]);
            if (result.rows[0]) return result.rows[0];
            return (await getJsonArticles()).find((a: any) => a.slug === slug);
        } catch (error) {
            return (await getJsonArticles()).find((a: any) => a.slug === slug);
        }
    }
    return (await getJsonArticles()).find((a: any) => a.slug === slug);
}

export async function saveArticle(article: any) {
    const isDbUp = await checkDb();
    if (isDbUp) {
        try {
            if (article.id) {
                await pool.query(
                    'UPDATE articles SET title = $1, slug = $2, content = $3, excerpt = $4, image_url = $5, category = $6, updated_at = NOW() WHERE id = $7',
                    [article.title, article.slug, article.content, article.excerpt, article.image_url, article.category, article.id]
                );
            } else {
                await pool.query(
                    'INSERT INTO articles (title, slug, content, excerpt, image_url, category) VALUES ($1, $2, $3, $4, $5, $6)',
                    [article.title, article.slug, article.content, article.excerpt, article.image_url, article.category]
                );
            }
        } catch (e) {
            console.error('Save to DB failed, syncing only to JSON');
        }
    }

    // Always sync to JSON for safety
    const articles = await getJsonArticles();
    if (article.id) {
        const index = articles.findIndex((a: any) => a.id === article.id);
        if (index !== -1) articles[index] = { ...articles[index], ...article, updated_at: new Date().toISOString() };
    } else {
        const newArt = { ...article, id: Date.now(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        articles.unshift(newArt);
    }
    await saveToJson(articles);

    revalidatePath('/blog');
    revalidatePath(`/blog/${article.slug}`);
    return { success: true };
}

export async function deleteArticle(id: number) {
    const isDbUp = await checkDb();
    if (isDbUp) {
        try {
            await pool.query('DELETE FROM articles WHERE id = $1', [id]);
        } catch (e) { }
    }

    const articles = await getJsonArticles();
    const filtered = articles.filter((a: any) => a.id !== id);
    await saveToJson(filtered);

    revalidatePath('/blog');
    return { success: true };
}

// Leads and global content
export async function getLeads() {
    const isDbUp = await checkDb();
    if (isDbUp) {
        try {
            const result = await pool.query('SELECT * FROM leads ORDER BY created_at DESC');
            return result.rows;
        } catch (error) {
            return [];
        }
    }
    return [];
}

export async function deleteLead(id: number) {
    const isDbUp = await checkDb();
    if (isDbUp) {
        try {
            await pool.query('DELETE FROM leads WHERE id = $1', [id]);
            return { success: true };
        } catch (error) {
            return { success: false };
        }
    }
    return { success: false };
}

export async function getContent() {
    const filePath = path.join(process.cwd(), 'src/data/content.json');
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
}

export async function saveContentAction(newData: any) {
    const filePath = path.join(process.cwd(), 'src/data/content.json');
    await fs.writeFile(filePath, JSON.stringify(newData, null, 4), 'utf8');
    revalidatePath('/');
    return { success: true };
}
