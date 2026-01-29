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
      <section className="relative bg-offWhite py-20 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brandGreen/10 rounded-full mb-6 shadow-sm">
            <BookOpen className="w-8 h-8 text-brandGreen" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-daar-blue mb-6 leading-tight" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Kennisbank
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Praktische artikelen over vrijwilligersbeheer, impact meten en welzijn.
            Geschreven door experts uit de praktijk.
          </p>

          {/* Search */}
          <Suspense fallback={<div className="h-12 bg-gray-200 rounded-xl animate-pulse max-w-xl mx-auto" />}>
            <SearchBar className="max-w-xl mx-auto" />
          </Suspense>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-brandGreen/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-daar-geel/10 rounded-full blur-3xl"></div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          {categories.length > 0 && (
            <div className="mb-10">
              <Suspense fallback={<div className="h-10 bg-white rounded-full animate-pulse w-96 shadow-sm" />}>
                <CategoryFilter categories={categories} />
              </Suspense>
            </div>
          )}

          {/* Search Results Header */}
          {query && (
            <div className="mb-8">
              <p className="text-gray-600 font-medium text-lg">
                {pagination.total} resultaten voor &ldquo;{query}&rdquo;
              </p>
            </div>
          )}

          {/* Articles Grid */}
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article as any} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="relative inline-block">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6 shadow-lg border border-gray-100">
                  <BookOpen className="w-10 h-10 text-gray-400" />
                </div>
                <div className="absolute -z-10 -bottom-2 -right-2 w-20 h-20 bg-daar-geel/20 rounded-full"></div>
              </div>
              <h3 className="text-2xl font-bold text-daar-blue mb-3" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Geen artikelen gevonden
              </h3>
              <p className="text-lg text-gray-600 max-w-md mx-auto">
                {query
                  ? 'Probeer een andere zoekterm of bekijk alle artikelen.'
                  : 'Er zijn nog geen artikelen gepubliceerd.'}
              </p>
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="mt-16 flex justify-center gap-3">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                <a
                  key={p}
                  href={`/kennisbank?${query ? `q=${query}&` : ''}page=${p}`}
                  className={`px-5 py-3 rounded-full transition-all font-semibold ${
                    p === pagination.page
                      ? 'bg-brandGreen text-white shadow-lg shadow-green-200/50 transform -translate-y-0.5'
                      : 'bg-white text-daar-blue hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
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
