import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ArticleContent } from '@/components/kennisbank/ArticleContent'
import { ArticleCard } from '@/components/kennisbank/ArticleCard'
import { ArticleSchema, BreadcrumbSchema } from '@/components/seo/JsonLd'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getBlogPost(slug: string) {
  const article = await prisma.article.findUnique({
    where: { slug, status: 'PUBLISHED', type: 'BLOG' },
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

async function getRelatedPosts(articleId: string, categoryId: string | null) {
  return prisma.article.findMany({
    where: {
      status: 'PUBLISHED',
      type: 'BLOG',
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
    where: { slug, status: 'PUBLISHED', type: 'BLOG' },
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
      title: 'Blogpost niet gevonden | DAAR',
    }
  }

  const baseUrl = 'https://daar.nl'

  return {
    title: article.metaTitle || article.title,
    description: article.metaDescription || article.excerpt || undefined,
    openGraph: {
      title: article.title,
      description: article.excerpt || undefined,
      type: 'article',
      url: `${baseUrl}/blog/${slug}`,
      siteName: 'Daar',
      locale: 'nl_NL',
      publishedTime: article.publishedAt?.toISOString(),
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
      canonical: `${baseUrl}/blog/${slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const article = await getBlogPost(slug)

  if (!article) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(article.id, article.categoryId)

  const baseUrl = 'https://daar.nl'

  return (
    <>
      <ArticleSchema
        headline={article.title}
        description={article.excerpt || ''}
        image={article.featuredImage || undefined}
        datePublished={article.publishedAt?.toISOString() || article.createdAt.toISOString()}
        dateModified={article.updatedAt.toISOString()}
        author={{
          name: article.author?.name || 'Daar Team',
        }}
        url={`${baseUrl}/blog/${article.slug}`}
        keywords={article.tags?.map(t => t.tag.name)}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: baseUrl },
          { name: 'Blog', url: `${baseUrl}/blog` },
          ...(article.category ? [{ name: article.category.name, url: `${baseUrl}/blog/categorie/${article.category.slug}` }] : []),
          { name: article.title, url: `${baseUrl}/blog/${article.slug}` },
        ]}
      />
      <div className="bg-offWhite min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Article */}
          <ArticleContent article={article as any} />

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-16 pt-12 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-daar-blue mb-8 text-center">
                Gerelateerde blogposts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((post) => (
                  <ArticleCard key={post.id} article={post as any} basePath="/blog" />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  )
}
