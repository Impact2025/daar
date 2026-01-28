'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock, BookOpen } from 'lucide-react'

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string | null
  featuredImage: string | null
  publishedAt: string | null
  readingTime: number | null
  category: {
    name: string
    slug: string
    color: string | null
  } | null
  author: {
    name: string
    avatar: string | null
  }
}

export function LatestArticles() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch('/api/articles?pageSize=3&status=PUBLISHED')
        const data = await res.json()
        if (data.success) {
          setArticles(data.data)
        }
      } catch (error) {
        console.error('Error fetching articles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  // Don't render section if no articles
  if (!loading && articles.length === 0) {
    return null
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-daar-blue mb-4 tracking-tight">
              Laatste artikelen
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl">
              Praktische inzichten en tips voor vrijwilligersmanagement
            </p>
          </div>
          <Link
            href="/kennisbank"
            className="hidden md:flex items-center gap-2 text-brandGreen font-semibold hover:gap-3 transition-all"
          >
            Bekijk alle artikelen
            <ArrowRight size={18} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-2xl mb-4" />
                <div className="bg-gray-200 h-4 w-24 rounded mb-3" />
                <div className="bg-gray-200 h-6 w-full rounded mb-2" />
                <div className="bg-gray-200 h-4 w-3/4 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/kennisbank/${article.slug}`}
                className="group"
              >
                <article className="h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-48 rounded-2xl overflow-hidden mb-4 bg-gray-100">
                    {article.featuredImage ? (
                      <Image
                        src={article.featuredImage}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-lightGreen">
                        <BookOpen size={40} className="text-brandGreen/40" />
                      </div>
                    )}
                  </div>

                  {/* Category */}
                  {article.category && (
                    <span
                      className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 w-fit"
                      style={{
                        backgroundColor: article.category.color
                          ? `${article.category.color}15`
                          : '#3BA27315',
                        color: article.category.color || '#3BA273',
                      }}
                    >
                      {article.category.name}
                    </span>
                  )}

                  {/* Title */}
                  <h3 className="text-xl font-bold text-daar-blue mb-2 group-hover:text-brandGreen transition-colors line-clamp-2 tracking-tight">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  {article.excerpt && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                      {article.excerpt}
                    </p>
                  )}

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-auto">
                    {article.readingTime && (
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {article.readingTime} min
                      </span>
                    )}
                    {article.publishedAt && (
                      <span>
                        {new Date(article.publishedAt).toLocaleDateString('nl-NL', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    )}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {/* Mobile CTA */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/kennisbank"
            className="inline-flex items-center gap-2 text-brandGreen font-semibold"
          >
            Bekijk alle artikelen
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
