# Автопилот публикации статей 2 раза в неделю

## Что уже реализовано в проекте
- `src/data/blog-topic-queue.json` — очередь тем для автогенерации.
- `scripts/auto-generate-blog-post.mjs` — генератор/публикатор следующей статьи из очереди.
- `scripts/install-blog-cron.sh` — установка cron-задачи на сервере (вт/чт 10:00 MSK).

## Режимы работы
1. С `OPENROUTER_API_KEY` (рекомендуется) или `OPENAI_API_KEY`:
- скрипт генерирует полноценную экспертную статью через API,
- сохраняет в `src/data/blog.json`,
- после этого пересобирается приложение.

2. Без `OPENAI_API_KEY`:
- по умолчанию публикация останавливается (fail-safe, чтобы не публиковать слабый текст),
- можно включить fallback-черновики через `ALLOW_FALLBACK_DRAFT=1`.

## Настройка ключа на VPS
1. В директории проекта создать файл `.env.blog` на основе `.env.blog.example`.
2. Заполнить `OPENROUTER_API_KEY` (или `OPENAI_API_KEY` как альтернативу).
3. Переустановить cron: `npm run blog:cron:install`.

Пример `.env.blog`:\n
```bash
OPENROUTER_API_KEY=sk-or-v1-...
OPENROUTER_MODEL=openai/gpt-4o-mini
ALLOW_FALLBACK_DRAFT=0
```

## Команды
- Разовый запуск: `npm run blog:auto`
- Установка расписания: `npm run blog:cron:install`

## Проверка
- `crontab -l`
- лог: `/var/log/pulse3d-blog-cron.log`

## Как добавить новые темы
Добавляйте объекты в `src/data/blog-topic-queue.json`:
```json
{
  "title": "...",
  "slug": "...",
  "category": "Статья",
  "description": "...",
  "keywords": ["...", "..."]
}
```
