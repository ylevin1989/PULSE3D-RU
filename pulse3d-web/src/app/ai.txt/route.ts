import { SITE_URL } from '../../lib/seo';

export async function GET() {
  const body = [
    `Website: ${SITE_URL}`,
    'Name: PULSE 3D',
    'Primary Language: ru',
    'Content Type: Industrial 3D printing services, portfolio, and educational blog.',
    'Sitemap: https://pulse3d.ru/sitemap.xml',
    'Robots: https://pulse3d.ru/robots.txt',
    'LLMS: https://pulse3d.ru/llms.txt',
    'RSS: https://pulse3d.ru/rss.xml',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
