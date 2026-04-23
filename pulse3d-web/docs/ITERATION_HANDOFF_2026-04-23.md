# PULSE3D — фиксация итерации (2026-04-23)

Документ фиксирует текущее состояние проекта, инфраструктуры и внедренных изменений.

## 1) Где находится проект

### Локально (рабочая машина)
- Корневая папка рабочего дерева: `/Users/workspace/scratch/PULSE3D-RU/pulse3d-web`
- Актуальное Next.js-приложение: `/Users/workspace/scratch/PULSE3D-RU/pulse3d-web/pulse3d-web`
- Внешняя папка содержит исторические/служебные файлы и не используется как основной app-root.

### На VPS
- Сервер: `root@37.233.83.172`
- Деплой-папка: `/root/pulse3d-deploy`
- Папка приложения: `/root/pulse3d-deploy/pulse3d-web`
- Продовый docker-compose для сайта PULSE3D: `/root/pulse3d-deploy/docker-compose.yml`

## 2) Docker и сервисы

### PULSE3D контейнеры
- `pulse3d-app` — Next.js приложение (image: `pulse3d-deploy-app`)
- `pulse3d-db` — PostgreSQL 15 (image: `postgres:15-alpine`)

### Сеть/роутинг
- Публичная маршрутизация через Traefik (external network: `traefik_network`)
- Внутренняя сеть compose: `internal`

### Volume для БД
- Основной том: `pulse3d-deploy_postgres_data`

## 3) База данных

### Подключение
- Внутри app используется `DATABASE_URL` из compose:
  - `postgresql://pulse_user:pulse_password@pulse3d-db:5432/pulse_db`
- Файл подключения: `src/lib/db.ts`

### Таблицы
- `articles`
- `leads`

### Важная логика синхронизации контента
- Чтение/запись статей реализовано в `src/app/admin/actions.ts`.
- При рабочей БД статьи берутся из БД (`articles`), JSON используется как источник синхронизации/фолбэк.
- Это критично: прямые правки только `src/data/blog.json` могут не сразу отражаться в рендере, если запись в БД отличается.

## 4) Что сделано в этой и соседних итерациях

### Контент и SEO
- Подготовлен план на 50 статей: `docs/SEO_CONTENT_PLAN_50.md`
- Добавлены материалы по автопилоту контента:
  - `docs/ARTICLE_PROMPT_TEMPLATE.md`
  - `docs/CONTENT_CALENDAR_3_MONTHS.md`
  - `docs/CONTENT_AUTOPILOT_SETUP.md`
- Включены технические SEO-страницы:
  - `src/app/sitemap.ts`
  - `src/app/robots.ts`
  - `src/app/rss.xml/route.ts`
  - `src/app/llms.txt/route.ts`
  - `src/app/ai.txt/route.ts`
- В sitemap есть `lastModified` на основе timestamp данных (blog/content), чтобы обновления отражались корректно.

### Блог-автогенерация
- Скрипт автогенерации: `scripts/auto-generate-blog-post.mjs`
- Установка cron: `scripts/install-blog-cron.sh`
- Пример env: `.env.blog.example`
- Поддержан OpenRouter + fallback OpenAI:
  - переменные: `OPENROUTER_API_KEY`, `OPENROUTER_MODEL`
  - альтернатива: `OPENAI_API_KEY`, `OPENAI_MODEL`

### Cron на VPS
- Задача установлена в crontab root:
  - вторник/четверг 10:00 (Europe/Moscow)
- Команда:
  - генерирует статью через `node scripts/auto-generate-blog-post.mjs`
  - затем пересобирает app через root-compose (`/root/pulse3d-deploy/docker-compose.yml`)
- Лог: `/var/log/pulse3d-blog-cron.log`

### Аналитика (Яндекс.Метрика)
- Счетчик подключен в `src/app/layout.tsx`
- ID хранится в `src/data/content.json` (`settings.yandexMetricaId`)
- Клиентский hit по роутам: `src/components/analytics/YandexMetrica.tsx`
- События лид-форм:
  - `lead_form_start`
  - `lead_form_submit`
  - код: `src/lib/analytics.ts`

### Мессенджер MAX вместо Telegram-виджета
- Floating widget теперь ведет на MAX: `src/components/ui/TelegramWidget.tsx`
- MAX в футере и контактах:
  - `src/components/layout/Footer.tsx`
  - `src/app/contacts/ContactsClient.tsx`
- Ссылка MAX хранится в `src/data/content.json` (`settings.maxLink`)

### Исправления внутренней перелинковки блога
- Исправлена битая перелинковка в статье `minimalnyy-tiraz-v-3d-pechati`.
- Добавлена защита:
  - внутренние ссылки рендерятся только если путь существует
  - в блок "Экспертные источники" попадают только внешние ссылки
- Файлы:
  - `src/app/blog/[slug]/page.tsx`
  - `scripts/auto-generate-blog-post.mjs`

### Коммерческая правка
- На странице цен отражен минимум заказа: `от 5 000 ₽`
- Файл: `src/app/pricing/page.tsx`

## 5) Где лежат основные данные

- Контент сайта: `src/data/content.json`
- Блог (JSON-слой): `src/data/blog.json`
- Очередь тем для автогенерации: `src/data/blog-topic-queue.json`
- Медиа-файлы: `public/uploads` (и volume bind на VPS)

## 6) Быстрые команды обслуживания

### Локально
- dev: `npm run dev`
- build: `npm run build`
- ручная генерация статьи: `npm run blog:auto`

### На VPS
- статус контейнеров:
  - `cd /root/pulse3d-deploy && docker compose ps`
- пересборка приложения:
  - `cd /root/pulse3d-deploy && docker compose up -d --build app`
- проверка cron:
  - `crontab -l`
- лог автогенерации:
  - `tail -n 200 /var/log/pulse3d-blog-cron.log`

## 7) Важные примечания

- На VPS присутствуют лишние `._*` файлы (служебные артефакты macOS), они не участвуют в runtime, но засоряют дерево.
- При правках статей вручную учитывать, что финальный источник при рабочей БД — таблица `articles`.
- Секреты (ключи OpenRouter/OpenAI, токены) в git не коммитить; хранить только в env на сервере.

## 8) Точка завершения итерации

На момент фиксации:
- Сайт работает на `pulse3d-app`.
- БД `pulse3d-db` доступна.
- Cron автогенерации активен.
- Критичные битые внутренние ссылки в блоге исправлены и защищены на уровне кода.

