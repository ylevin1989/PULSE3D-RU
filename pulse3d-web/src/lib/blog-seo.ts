import type { BlogArticle } from './blog';
import { buildBlogCategories, getCategorySlug } from './blog';

export type BlogCluster = {
  category: string;
  slug: string;
  intent: string;
  primaryQueries: string[];
  supportingQueries: string[];
  hubDescription: string;
};

const DEFAULT_CLUSTER_INTENT =
  'Практический и коммерческий запрос о применении 3D-печати в производстве.';

const DEFAULT_PRIMARY_QUERIES = [
  '3d печать на заказ',
  'промышленная 3d печать',
  'серийная 3d печать',
];

const DEFAULT_SUPPORTING_QUERIES = [
  'как выбрать технологию 3d печати',
  'расчет стоимости 3d печати',
  'материалы для 3d печати',
];

const CLUSTER_BY_CATEGORY: Record<string, Omit<BlogCluster, 'category' | 'slug'>> = {
  Статья: {
    intent: 'Информационный интент: как сделать правильно, без брака и переплат.',
    primaryQueries: [
      'как подготовить тз на 3d печать',
      'какие файлы нужны для 3d печати',
      'как начать 3d печать',
    ],
    supportingQueries: [
      'требования к модели для печати',
      'допуски в 3d печати',
      'чеклист перед запуском печати',
    ],
    hubDescription:
      'Пошаговые материалы и методички для подготовки заказа, проверки файлов и запуска печати.',
  },
  Обзор: {
    intent: 'Сравнительный интент: выбрать оборудование, подрядчика и технологию под задачу.',
    primaryQueries: [
      '3d печать или литье под давлением',
      'какой слайсер выбрать',
      'как выбрать подрядчика по 3d печати',
    ],
    supportingQueries: [
      'сравнение технологий производства',
      'обзор 3d принтеров для бизнеса',
      'критерии выбора подрядчика',
    ],
    hubDescription:
      'Сравнения решений, оборудования и подходов, чтобы быстрее выбрать оптимальную стратегию.',
  },
  Аналитика: {
    intent: 'Коммерческий интент: оценить экономику, стоимость и риски внедрения.',
    primaryQueries: [
      'сколько стоит 3d печать',
      'цена 3d печати в 2026',
      'экономика серийной 3d печати',
    ],
    supportingQueries: [
      'из чего складывается стоимость 3d печати',
      'как снизить себестоимость печати',
      'когда выгодна 3d печать',
    ],
    hubDescription:
      'Материалы по экономике 3D-печати: стоимость, окупаемость, пороги перехода между технологиями.',
  },
  Технологии: {
    intent: 'Технический интент: понять новые процессы, материалы и ограничения технологии.',
    primaryQueries: [
      'технологии 3d печати 2026',
      'материалы для промышленной 3d печати',
      'аддитивные технологии в производстве',
    ],
    supportingQueries: [
      'какие технологии 3d печати бывают',
      'прочность материалов для 3d печати',
      'новые решения в 3d печати',
    ],
    hubDescription:
      'Технологические разборы оборудования и процессов для инженеров и производственных команд.',
  },
};

export function getClusterForCategory(category: string): BlogCluster {
  const normalized = category.trim();
  const preset = CLUSTER_BY_CATEGORY[normalized];

  if (preset) {
    return {
      category: normalized,
      slug: getCategorySlug(normalized),
      ...preset,
    };
  }

  return {
    category: normalized,
    slug: getCategorySlug(normalized),
    intent: DEFAULT_CLUSTER_INTENT,
    primaryQueries: DEFAULT_PRIMARY_QUERIES,
    supportingQueries: DEFAULT_SUPPORTING_QUERIES,
    hubDescription: 'Структурированная подборка материалов PULSE 3D по теме 3D-печати.',
  };
}

export function buildClustersFromArticles(articles: BlogArticle[]): BlogCluster[] {
  return buildBlogCategories(articles).map((category) => getClusterForCategory(category.name));
}

export function getCrossClusterLinks(
  articles: BlogArticle[],
  currentCategory: string,
  limit = 3
): BlogCluster[] {
  return buildClustersFromArticles(articles)
    .filter((cluster) => cluster.category !== currentCategory)
    .slice(0, limit);
}
