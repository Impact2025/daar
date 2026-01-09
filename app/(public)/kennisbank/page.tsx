import { Metadata } from 'next'
import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'
import { ArticleCard } from '@/components/kennisbank/ArticleCard'
import { SearchBar } from '@/components/kennisbank/SearchBar'
import { CategoryFilter } from '@/components/kennisbank/CategoryFilter'
import { BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Kennisbank | DAAR',
  description: 'Ontdek praktische artikelen over vrijwilligersbeheer, impact meten en welzijn. Geschreven door experts uit de praktijk.',
  openGraph: {
    title: 'Kennisbank | DAAR',
    description: 'Praktische kennis over vrijwilligersbeheer',
    type: 'website',
  },
}

interface PageProps {
  searchParams: Promise<{ q?: string; page?: string }>
}

async function getArticles(query?: string, page: number = 1) {
  const pageSize = 12

  const where: any = {
    status: 'PUBLISHED',
  }

  if (query) {
    where.OR = [
      { title: { contains: query, mode: 'insensitive' } },
      { contentPlain: { contains: query, mode: 'insensitive' } },
      { excerpt: { contains: query, mode: 'insensitive' } },
    ]
  }

  const [articles, total] = await Promise.all([
    prisma.article.findMany({
      where,
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
      orderBy: { publishedAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.article.count({ where }),
  ])

  return {
    articles,
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
  }
}

async function getCategories() {
  return prisma.category.findMany({
    where: { parentId: null },
    include: {
      _count: {
        select: {
          articles: { where: { status: 'PUBLISHED' } },
        },
      },
    },
    orderBy: { sortOrder: 'asc' },
  })
}

export default async function KennisbankPage({ searchParams }: PageProps) {
  const params = await searchParams
  const query = params.q
  const page = parseInt(params.page || '1')

  const [{ articles, pagination }, categories] = await Promise.all([
    getArticles(query, page),
    getCategories(),
  ])

  return (
    <div className="bg-offWhite min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-lightGreen to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brandGreen/10 rounded-full mb-6">
            <BookOpen className="w-8 h-8 text-brandGreen" />
          </div>
          <h1 className="text-4xl font-bold text-navy mb-4">
            Kennisbank
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Praktische artikelen over vrijwilligersbeheer, impact meten en welzijn.
            Geschreven door experts uit de praktijk.
          </p>

          {/* Search */}
          <Suspense fallback={<div className="h-12 bg-gray-200 rounded-xl animate-pulse max-w-xl mx-auto" />}>
            <SearchBar className="max-w-xl mx-auto" />
          </Suspense>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          {categories.length > 0 && (
            <div className="mb-8">
              <Suspense fallback={<div className="h-10 bg-gray-200 rounded-full animate-pulse w-96" />}>
                <CategoryFilter categories={categories} />
              </Suspense>
            </div>
          )}

          {/* Search Results Header */}
          {query && (
            <div className="mb-6">
              <p className="text-gray-600">
                {pagination.total} resultaten voor &ldquo;{query}&rdquo;
              </p>
            </div>
          )}

          {/* Articles Grid */}
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article as any} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <BookOpen className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Geen artikelen gevonden
              </h3>
              <p className="text-gray-600">
                {query
                  ? 'Probeer een andere zoekterm of bekijk alle artikelen.'
                  : 'Er zijn nog geen artikelen gepubliceerd.'}
              </p>
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="mt-12 flex justify-center gap-2">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                <a
                  key={p}
                  href={`/kennisbank?${query ? `q=${query}&` : ''}page=${p}`}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    p === pagination.page
                      ? 'bg-brandGreen text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {p}
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
