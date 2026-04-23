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

function makePrompt(topic) {
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
- внутренние ссылки минимум 2 в формате /blog/slug
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

async function generateWithOpenAI(topic) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is not set');

  const model = process.env.OPENAI_MODEL || 'gpt-5-mini';
  const body = {
    model,
    input: makePrompt(topic),
    text: { format: { type: 'json_object' } },
  };

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenAI API error: ${response.status} ${text}`);
  }

  const data = await response.json();
  const outputText = data?.output_text;
  if (!outputText) {
    throw new Error('OpenAI response has no output_text');
  }

  const parsed = JSON.parse(outputText);
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

  const existing = new Set(blog.map((item) => item.slug));
  const nextTopic = queue.find((item) => !existing.has(item.slug));

  if (!nextTopic) {
    console.log('No topics left in queue');
    return;
  }

  let generated;
  try {
    generated = await generateWithOpenAI(nextTopic);
  } catch (err) {
    console.warn(`OpenAI generation failed, using fallback draft: ${err.message}`);
    generated = fallbackDraft(nextTopic);
  }

  if (!validateArticle(generated)) {
    console.warn('Generated article did not pass strict validation, applying fallback draft template');
    generated = fallbackDraft(nextTopic);
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
