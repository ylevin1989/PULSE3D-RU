# Автопилот публикации статей 2 раза в неделю

## Что уже реализовано в проекте
- `src/data/blog-topic-queue.json` — очередь тем для автогенерации.
- `scripts/auto-generate-blog-post.mjs` — генератор/публикатор следующей статьи из очереди.
- `scripts/install-blog-cron.sh` — установка cron-задачи на сервере (вт/чт 10:00 MSK).

## Режимы работы
1. С `OPENAI_API_KEY`:
- скрипт генерирует полноценную экспертную статью через API,
- сохраняет в `src/data/blog.json`,
- после этого пересобирается приложение.

2. Без `OPENAI_API_KEY`:
- по умолчанию публикация останавливается (fail-safe, чтобы не публиковать слабый текст),
- можно включить fallback-черновики через `ALLOW_FALLBACK_DRAFT=1`.

## Настройка ключа на VPS
1. В директории проекта создать файл `.env.blog` на основе `.env.blog.example`.
2. Заполнить `OPENAI_API_KEY`.
3. Переустановить cron: `npm run blog:cron:install`.

Пример `.env.blog`:\n
```bash
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-5-mini
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
