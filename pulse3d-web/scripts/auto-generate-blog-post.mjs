#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const BLOG_PATH = path.join(ROOT, 'src/data/blog.json');
const QUEUE_PATH = path.join(ROOT, 'src/data/blog-topic-queue.json');

async function readJson(filePath) {
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw);
}

async function writeJson(filePath, data) {
  await fs.writeFile(filePath, `${JSON.stringify(data, null, 4)}\n`, 'utf8');
}

function parseJsonFromText(text) {
  const clean = (text || '').trim();
  if (!clean) throw new Error('LLM returned empty text');

  try {
    return JSON.parse(clean);
  } catch {
    const start = clean.indexOf('{');
    const end = clean.lastIndexOf('}');
    if (start !== -1 && end !== -1 && end > start) {
      return JSON.parse(clean.slice(start, end + 1));
    }
    throw new Error('Could not parse JSON from LLM response');
  }
}

function normalizeInternalPath(url) {
  if (!url) return null;
  const clean = String(url).trim();
  if (!clean || clean.startsWith('#')) return null;

  if (clean.startsWith('/')) {
    const path = clean.split('#')[0].split('?')[0];
    return path === '/' ? path : path.replace(/\/+$/, '');
  }

  if (/^https?:\/\//i.test(clean)) {
    try {
      const parsed = new URL(clean);
      const host = parsed.hostname.replace(/^www\./, '');
      if (host !== 'pulse3d.ru') return null;
      const path = (parsed.pathname || '/').split('#')[0].split('?')[0];
      return path === '/' ? path : path.replace(/\/+$/, '');
    } catch {
      return null;
    }
  }

  return null;
}

function buildAllowedInternalLinks(blog) {
  const staticPaths = [
    '/',
    '/pricing',
    '/tech',
    '/portfolio',
    '/blog',
    '/merch',
    '/about',
    '/contacts',
    '/privacy',
  ];
  const blogPaths = blog.map((item) => `/blog/${item.slug}`);
  const all = [...new Set([...staticPaths, ...blogPaths])];
  return all.sort();
}

function sanitizeInternalLinks(content, allowedInternalSet) {
  if (!content) return content;

  const aliases = new Map([
    ['/blog/sebestoimost-partii', '/blog/stoimost-3d-pechati-v-2026'],
    ['/blog/zagruzka-parka', '/tech'],
  ]);

  return content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (full, text, href) => {
    const internalPath = normalizeInternalPath(href);
    if (!internalPath) return full;

    const mapped = aliases.get(internalPath) || internalPath;
    if (allowedInternalSet.has(mapped)) {
      return `[${text}](${mapped})`;
    }

    // If target does not exist on the site, keep text but drop link.
    return text;
  });
}

function countValidInternalLinks(content, allowedInternalSet) {
  const matches = [...String(content || '').matchAll(/\[[^\]]+\]\(([^)]+)\)/g)];
  let count = 0;
  for (const m of matches) {
    const path = normalizeInternalPath(m[1]);
    if (path && allowedInternalSet.has(path)) count += 1;
  }
  return count;
}

function makePrompt(topic, allowedInternalLinks) {
  const linksBlock = allowedInternalLinks.map((link) => `- ${link}`).join('\n');

  return `Ты пишешь экспертную статью для сайта PULSE3D (B2B, промышленная 3D-печать).

Тема: ${topic.title}
Slug: ${topic.slug}
Категория: ${topic.category}
Описание темы: ${topic.description}
Ключевые запросы: ${(topic.keywords || []).join(', ')}

Требования к статье:
1) Русский язык, экспертный стиль, понятно для владельца бизнеса и инженера.
2) Объем от 1700 до 2600 слов.
3) Только Markdown.
4) Структура:
- "## Кратко (TL;DR)"
- минимум 4 раздела H2
- внутренние ссылки минимум 2 только из разрешенного списка ниже:
${linksBlock}
- "## FAQ" с минимум 3 вопросами формата "#### Вопрос?"
- "## Вывод"
- "## Экспертные источники" минимум 3 ссылки в Markdown: [Название](https://...)
5) Никакой воды и фейковых фактов. Если есть ограничение данных — явно указать.
6) Ссылки только на авторитетные источники.

Верни JSON строго такого формата без пояснений:
{
  "title": "...",
  "excerpt": "... (140-170 символов)",
  "content": "... markdown ..."
}`;
}

async function generateWithOpenAI(topic, allowedInternalLinks) {
  const openRouterKey = process.env.OPENROUTER_API_KEY;
  const openAiKey = process.env.OPENAI_API_KEY;
  const usingOpenRouter = Boolean(openRouterKey);
  const apiKey = openRouterKey || openAiKey;

  if (!apiKey) {
    throw new Error('Neither OPENROUTER_API_KEY nor OPENAI_API_KEY is set');
  }

  const endpoint = usingOpenRouter
    ? 'https://openrouter.ai/api/v1/chat/completions'
    : 'https://api.openai.com/v1/chat/completions';

  const model = usingOpenRouter
    ? (process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini')
    : (process.env.OPENAI_MODEL || 'gpt-4o-mini');

  const body = {
    model,
    messages: [
      { role: 'system', content: 'Ты экспертный технический редактор. Возвращай только валидный JSON, без Markdown-оберток.' },
      { role: 'user', content: makePrompt(topic, allowedInternalLinks) },
    ],
    temperature: 0.4,
    response_format: { type: 'json_object' },
  };

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  };

  if (usingOpenRouter) {
    headers['HTTP-Referer'] = 'https://pulse3d.ru';
    headers['X-Title'] = 'PULSE3D Blog Autogen';
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`LLM API error: ${response.status} ${text}`);
  }

  const data = await response.json();
  const outputText = data?.choices?.[0]?.message?.content || '';
  const parsed = parseJsonFromText(outputText);
  return {
    title: parsed.title?.trim() || topic.title,
    excerpt: (parsed.excerpt || topic.description || '').trim().slice(0, 170),
    content: (parsed.content || '').trim(),
  };
}

function fallbackDraft(topic) {
  return {
    title: topic.title,
    excerpt: (topic.description || '').slice(0, 170),
    content: `## Кратко (TL;DR)\nЧерновик статьи по теме: ${topic.title}.\n\n## Контекст\nРаскройте задачу бизнеса и технические ограничения.\n\n## Основной разбор\nДобавьте детальный технический разбор с цифрами и сравнениями.\n\n## Практический чеклист\n- Критерий 1\n- Критерий 2\n- Критерий 3\n\n## FAQ\n#### Какой первый шаг?\nОпределить цель проекта и требования к детали.\n\n#### Как снизить риск ошибок?\nСогласовать материал, допуски и критерии приемки до запуска.\n\n#### Когда пересматривать технологию?\nКогда меняются тиражи, сроки или функциональные требования.\n\n## Вывод\nСформулируйте управленческое решение по теме статьи.\n\n## Экспертные источники\n- [All3DP](https://all3dp.com/)\n- [Prusa Knowledge Base](https://help.prusa3d.com/)\n- [Bambu Lab Wiki](https://wiki.bambulab.com/)\n`,
  };
}

function validateArticle(article) {
  if (!article.title || !article.content || !article.excerpt) return false;
  if (article.excerpt.length < 120) return false;
  const h2Count = (article.content.match(/^##\s+/gm) || []).length;
  const faqCount = (article.content.match(/^####\s+.+\?$/gm) || []).length;
  const sourceCount = (article.content.match(/\[[^\]]+\]\(https?:\/\/[^)]+\)/g) || []).length;
  return h2Count >= 4 && faqCount >= 2 && sourceCount >= 2;
}

async function main() {
  const blog = await readJson(BLOG_PATH);
  const queue = await readJson(QUEUE_PATH);
  const allowedInternalLinks = buildAllowedInternalLinks(blog);
  const allowedInternalSet = new Set(allowedInternalLinks);

  const existing = new Set(blog.map((item) => item.slug));
  const nextTopic = queue.find((item) => !existing.has(item.slug));

  if (!nextTopic) {
    console.log('No topics left in queue');
    return;
  }

  const allowFallbackDraft = process.env.ALLOW_FALLBACK_DRAFT === '1';
  let generated;
  try {
    generated = await generateWithOpenAI(nextTopic, allowedInternalLinks);
  } catch (err) {
    if (!allowFallbackDraft) {
      throw new Error(`Auto-generation stopped: ${err.message}. Set OPENROUTER_API_KEY/OPENAI_API_KEY or enable ALLOW_FALLBACK_DRAFT=1`);
    }
    console.warn(`OpenAI generation failed, using fallback draft: ${err.message}`);
    generated = fallbackDraft(nextTopic);
  }

  if (!validateArticle(generated)) {
    console.warn('Generated article did not pass strict validation, applying fallback draft template');
    generated = fallbackDraft(nextTopic);
  }

  generated.content = sanitizeInternalLinks(generated.content, allowedInternalSet);
  const internalLinksCount = countValidInternalLinks(generated.content, allowedInternalSet);
  if (internalLinksCount < 2) {
    console.warn(`Generated article contains only ${internalLinksCount} valid internal links, adding safe defaults`);
    generated.content += '\n\n## Полезные материалы\n'
      + '- [Цены на 3D-печать](/pricing)\n'
      + '- [Блог PULSE3D](/blog)\n';
  }

  const now = new Date().toISOString();
  const article = {
    id: Date.now(),
    title: generated.title,
    slug: nextTopic.slug,
    excerpt: generated.excerpt,
    image_url: '/uploads/blog_intro.png',
    category: nextTopic.category,
    content: generated.content,
    created_at: now,
    updated_at: now,
  };

  blog.unshift(article);
  await writeJson(BLOG_PATH, blog);

  console.log(`Article published: ${article.slug}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
