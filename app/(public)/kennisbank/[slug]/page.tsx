import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ArticleContent } from '@/components/kennisbank/ArticleContent'
import { ArticleCard } from '@/components/kennisbank/ArticleCard'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getArticle(slug: string) {
  const article = await prisma.article.findUnique({
    where: { slug, status: 'PUBLISHED' },
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

  if (article) {
    // Increment view count
    await prisma.article.update({
      where: { id: article.id },
      data: { viewCount: { increment: 1 } },
    })
  }

  return article
}

async function getRelatedArticles(articleId: string, categoryId: string | null) {
  return prisma.article.findMany({
    where: {
      status: 'PUBLISHED',
      id: { not: articleId },
      ...(categoryId ? { categoryId } : {}),
    },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      featuredImage: true,
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
    where: { slug, status: 'PUBLISHED' },
    select: {
      title: true,
      excerpt: true,
      metaTitle: true,
      metaDescription: true,
      featuredImage: true,
      publishedAt: true,
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

  return {
    title: article.metaTitle || `${article.title} | DAAR Kennisbank`,
    description: article.metaDescription || article.excerpt || undefined,
    openGraph: {
      title: article.title,
      description: article.excerpt || undefined,
      type: 'article',
      publishedTime: article.publishedAt?.toISOString(),
      authors: article.author?.name ? [article.author.name] : undefined,
      images: article.featuredImage ? [article.featuredImage] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt || undefined,
      images: article.featuredImage ? [article.featuredImage] : undefined,
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

  return (
    <div className="bg-offWhite min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Article */}
        <ArticleContent article={article as any} />

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-16 pt-12 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-navy mb-8 text-center">
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
  )
}
