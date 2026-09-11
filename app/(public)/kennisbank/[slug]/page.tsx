import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ArticleContent } from '@/components/kennisbank/ArticleContent'
import { ArticleCard } from '@/components/kennisbank/ArticleCard'
import { ArticleSchema, BreadcrumbSchema } from '@/components/seo/JsonLd'
import { ViewTracker } from '@/components/kennisbank/ViewTracker'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Statisch genereren + elk uur op de achtergrond verversen (ISR). Hierdoor is
// de pagina kant-en-klare HTML: supersnel, goedkoop te crawlen en immuun voor
// transient Neon-fouten (Google blijft de laatste goede versie serveren).
export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  try {
    const articles = await prisma.article.findMany({
      where: { status: 'PUBLISHED', type: 'KENNISBANK' },
      select: { slug: true },
    })
    return articles.map((a) => ({ slug: a.slug }))
  } catch {
    // Bij een build-time DB-hik: geen pre-render, pagina's renderen on-demand.
    return []
  }
}

async function getArticle(slug: string) {
  // Geen viewCount-write meer hier: dat gebeurt client-side via <ViewTracker>,
  // zodat deze render puur read-only en dus cachebaar blijft.
  return prisma.article.findUnique({
    where: { slug, status: 'PUBLISHED', type: 'KENNISBANK' },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          bio: true,
          avatar: true,
          role: true,
        },
      },
      category: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
  })
}

async function getRelatedArticles(articleId: string, categoryId: string | null) {
  return prisma.article.findMany({
    where: {
      status: 'PUBLISHED',
      type: 'KENNISBANK',
      id: { not: articleId },
      ...(categoryId ? { categoryId } : {}),
    },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      featuredImage: true,
      headerStyle: true,
      publishedAt: true,
      readingTime: true,
      viewCount: true,
      author: {
        select: {
          name: true,
          avatar: true,
        },
      },
      category: {
        select: {
          name: true,
          slug: true,
          color: true,
        },
      },
    },
    orderBy: { viewCount: 'desc' },
    take: 3,
  })
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await prisma.article.findUnique({
    where: { slug, status: 'PUBLISHED', type: 'KENNISBANK' },
    select: {
      title: true,
      excerpt: true,
      metaTitle: true,
      metaDescription: true,
      featuredImage: true,
      headerStyle: true,
      publishedAt: true,
      updatedAt: true,
      author: {
        select: { name: true },
      },
    },
  })

  if (!article) {
    return {
      title: 'Artikel niet gevonden | DAAR',
    }
  }

  const baseUrl = 'https://www.daar.nl';

  return {
    title: article.metaTitle || article.title,
    description: article.metaDescription || article.excerpt || undefined,
    openGraph: {
      title: article.title,
      description: article.excerpt || undefined,
      type: 'article',
      url: `${baseUrl}/kennisbank/${slug}`,
      siteName: 'Daar',
      locale: 'nl_NL',
      publishedTime: article.publishedAt?.toISOString(),
      modifiedTime: article.updatedAt.toISOString(),
      authors: article.author?.name ? [article.author.name] : ['Daar Team'],
      images: article.featuredImage ? [
        {
          url: article.featuredImage,
          width: 1200,
          height: 630,
          alt: article.title,
        }
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt || undefined,
      images: article.featuredImage ? [article.featuredImage] : undefined,
    },
    alternates: {
      canonical: `${baseUrl}/kennisbank/${slug}`,
    },
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = await getRelatedArticles(article.id, article.categoryId)

  const baseUrl = 'https://www.daar.nl';

  return (
    <>
      <ViewTracker articleId={article.id} />
      <ArticleSchema
        headline={article.title}
        description={article.excerpt || ''}
        image={article.featuredImage || undefined}
        datePublished={article.publishedAt?.toISOString() || article.createdAt.toISOString()}
        dateModified={article.updatedAt.toISOString()}
        author={{
          name: article.author?.name || 'Daar Team',
        }}
        url={`${baseUrl}/kennisbank/${article.slug}`}
        keywords={article.tags?.map(t => t.tag.name)}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: baseUrl },
          { name: 'Kennisbank', url: `${baseUrl}/kennisbank` },
          ...(article.category ? [{ name: article.category.name, url: `${baseUrl}/kennisbank/categorie/${article.category.slug}` }] : []),
          { name: article.title, url: `${baseUrl}/kennisbank/${article.slug}` },
        ]}
      />
      <div className="bg-offWhite min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Article */}
          <ArticleContent article={article as any} />

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-16 pt-12 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-daar-blue mb-8 text-center">
              Gerelateerde artikelen
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((article) => (
                <ArticleCard key={article.id} article={article as any} />
              ))}
            </div>
          </section>
        )}
        </div>
      </div>
    </>
  )
}
