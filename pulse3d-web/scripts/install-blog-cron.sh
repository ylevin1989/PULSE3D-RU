#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="/root/pulse3d-deploy/pulse3d-web"
LOG_FILE="/var/log/pulse3d-blog-cron.log"
CRON_MARK="# pulse3d_blog_autogen"

TMP_CRON=$(mktemp)
crontab -l 2>/dev/null | grep -v "$CRON_MARK" > "$TMP_CRON" || true

cat <<CRON >> "$TMP_CRON"
CRON_TZ=Europe/Moscow
0 10 * * 2,4 cd $PROJECT_DIR && /bin/bash -lc 'set -a; [ -f ./.env.blog ] && source ./.env.blog; set +a; /usr/bin/node scripts/auto-generate-blog-post.mjs' >> $LOG_FILE 2>&1 && /usr/bin/docker compose -f docker-compose.yml up -d --build app >> $LOG_FILE 2>&1 $CRON_MARK
CRON

crontab "$TMP_CRON"
rm -f "$TMP_CRON"

echo "Cron installed: Tue/Thu 10:00 Europe/Moscow"
echo "Log file: $LOG_FILE"
