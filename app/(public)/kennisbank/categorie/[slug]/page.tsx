import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'
import { ArticleCard } from '@/components/kennisbank/ArticleCard'
import { SearchBar } from '@/components/kennisbank/SearchBar'
import { CategoryFilter } from '@/components/kennisbank/CategoryFilter'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ q?: string; page?: string }>
}

async function getCategory(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    include: {
      _count: {
        select: {
          articles: { where: { status: 'PUBLISHED' } },
        },
      },
    },
  })
}

async function getArticles(categoryId: string, query?: string, page: number = 1) {
  const pageSize = 12

  const where: any = {
    status: 'PUBLISHED',
    categoryId,
  }

  if (query) {
    where.OR = [
      { title: { contains: query, mode: 'insensitive' } },
      { contentPlain: { contains: query, mode: 'insensitive' } },
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    return { title: 'Categorie niet gevonden | DAAR' }
  }

  return {
    title: `${category.name} | DAAR Kennisbank`,
    description: category.description || `Artikelen over ${category.name.toLowerCase()}`,
  }
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const sp = await searchParams
  const query = sp.q
  const page = parseInt(sp.page || '1')

  const category = await getCategory(slug)

  if (!category) {
    notFound()
  }

  const [{ articles, pagination }, categories] = await Promise.all([
    getArticles(category.id, query, page),
    getCategories(),
  ])

  return (
    <div className="bg-offWhite min-h-screen">
      {/* Hero */}
      <section
        className="py-16"
        style={{
          background: category.color
            ? `linear-gradient(135deg, ${category.color}15, white)`
            : 'linear-gradient(135deg, #EBF7F215, white)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/kennisbank"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-brandGreen transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Alle artikelen
          </Link>

          <h1 className="text-4xl font-bold text-navy mb-4">
            {category.name}
          </h1>

          {category.description && (
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              {category.description}
            </p>
          )}

          <p className="text-gray-500">
            {category._count.articles} artikel{category._count.articles !== 1 ? 'en' : ''}
          </p>

          {/* Search */}
          <Suspense fallback={<div className="h-12 bg-gray-200 rounded-xl animate-pulse max-w-xl mt-8" />}>
            <SearchBar className="max-w-xl mt-8" />
          </Suspense>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories */}
          <div className="mb-8">
            <Suspense fallback={<div className="h-10 bg-gray-200 rounded-full animate-pulse w-96" />}>
              <CategoryFilter categories={categories} activeCategory={slug} />
            </Suspense>
          </div>

          {/* Articles Grid */}
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article as any} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Geen artikelen gevonden
              </h3>
              <p className="text-gray-600">
                Er zijn nog geen artikelen in deze categorie.
              </p>
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="mt-12 flex justify-center gap-2">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                <a
                  key={p}
                  href={`/kennisbank/categorie/${slug}?${query ? `q=${query}&` : ''}page=${p}`}
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
