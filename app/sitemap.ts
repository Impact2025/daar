import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

const BASE_URL = 'https://www.daar.nl';

// Ververs de sitemap elk uur, zodat nieuw gepubliceerde artikelen verschijnen
// zonder dat er een nieuwe deploy nodig is.
export const revalidate = 3600;

// Stabiele datum voor statische marketingpagina's. Gebruik hier bewust GEEN
// `new Date()`: dat zou bij elke crawl "gewijzigd zojuist" signaleren (valse
// versheid) en het vertrouwen in <lastmod> ondermijnen. Bump deze datum
// handmatig wanneer je de statische content daadwerkelijk herziet.
const STATIC_LAST_MODIFIED = new Date('2026-07-24');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages with their priorities and change frequencies
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/platform`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/kennisbank`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/prijzen`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/vrijwilligers-werven`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/vrijwilligers-retentie`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/impact-meten`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/generatie-z-vrijwilligers`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/avgr-vrijwilligers`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/quiz`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/over-ons`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/afspraak`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/voorwaarden`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/cookies`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Dynamic article pages from database — blog en kennisbank hebben elk hun eigen pad
  let articlePages: MetadataRoute.Sitemap = [];
  try {
    const articles = await prisma.article.findMany({
      where: { status: 'PUBLISHED' },
      select: {
        slug: true,
        type: true,
        updatedAt: true,
      },
      orderBy: { publishedAt: 'desc' },
    });

    articlePages = articles.map((article) => ({
      url: `${BASE_URL}/${article.type === 'BLOG' ? 'blog' : 'kennisbank'}/${article.slug}`,
      lastModified: article.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Error fetching articles for sitemap:', error);
  }

  // Dynamic category pages — alleen categorieën met gepubliceerde artikelen van dat type
  let categoryPages: MetadataRoute.Sitemap = [];
  try {
    const categories = await prisma.category.findMany({
      select: {
        slug: true,
        updatedAt: true,
        articles: {
          where: { status: 'PUBLISHED' },
          select: { type: true },
        },
      },
    });

    categoryPages = categories.flatMap((category) => {
      const pages: MetadataRoute.Sitemap = [];
      if (category.articles.some((a) => a.type === 'KENNISBANK')) {
        pages.push({
          url: `${BASE_URL}/kennisbank/categorie/${category.slug}`,
          lastModified: category.updatedAt,
          changeFrequency: 'weekly' as const,
          priority: 0.6,
        });
      }
      if (category.articles.some((a) => a.type === 'BLOG')) {
        pages.push({
          url: `${BASE_URL}/blog/categorie/${category.slug}`,
          lastModified: category.updatedAt,
          changeFrequency: 'weekly' as const,
          priority: 0.6,
        });
      }
      return pages;
    });
  } catch (error) {
    console.error('Error fetching categories for sitemap:', error);
  }

  return [...staticPages, ...articlePages, ...categoryPages];
}
