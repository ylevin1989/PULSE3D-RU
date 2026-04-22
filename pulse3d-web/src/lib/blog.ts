export type BlogArticle = {
  id?: number;
  slug: string;
  title: string;
  excerpt?: string;
  image_url?: string;
  category?: string;
  content?: string;
  created_at?: string;
  updated_at?: string;
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'Статья': 'Практические руководства и базовые материалы по 3D-печати для старта и роста компетенции.',
  'Обзор': 'Обзоры оборудования, ПО и решений для промышленной и серийной 3D-печати.',
  'Аналитика': 'Аналитические материалы о рынке, трендах и экономике применения 3D-печати.',
  'Технологии': 'Технологические разборы процессов, материалов и инженерных подходов в аддитивном производстве.',
};

const RU_TO_LATIN: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i',
  й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't',
  у: 'u', ф: 'f', х: 'h', ц: 'c', ч: 'ch', ш: 'sh', щ: 'sch', ъ: '', ы: 'y', ь: '',
  э: 'e', ю: 'yu', я: 'ya',
};

function transliterate(value: string): string {
  return value
    .toLowerCase()
    .split('')
    .map((ch) => RU_TO_LATIN[ch] ?? ch)
    .join('');
}

export function getArticleCategory(article: BlogArticle): string {
  return (article.category || 'Статья').trim();
}

export function getCategorySlug(category: string): string {
  return transliterate(category)
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function buildBlogCategories(articles: BlogArticle[]): Array<{
  name: string;
  slug: string;
  count: number;
  description: string;
}> {
  const map = new Map<string, number>();

  for (const article of articles) {
    const category = getArticleCategory(article);
    map.set(category, (map.get(category) || 0) + 1);
  }

  return [...map.entries()]
    .map(([name, count]) => ({
      name,
      slug: getCategorySlug(name),
      count,
      description: CATEGORY_DESCRIPTIONS[name] || 'Материалы по 3D-печати от PULSE 3D.',
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'ru'));
}

export function findCategoryBySlug(articles: BlogArticle[], slug: string) {
  return buildBlogCategories(articles).find((item) => item.slug === slug);
}

export function getRelatedArticles(articles: BlogArticle[], currentSlug: string, limit = 3): BlogArticle[] {
  const current = articles.find((article) => article.slug === currentSlug);
  if (!current) return [];

  const currentCategory = getArticleCategory(current);

  const sameCategory = articles
    .filter((article) => article.slug !== currentSlug && getArticleCategory(article) === currentCategory)
    .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const fallback = articles
    .filter((article) => article.slug !== currentSlug && getArticleCategory(article) !== currentCategory)
    .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());

  return [...sameCategory, ...fallback].slice(0, limit);
}
