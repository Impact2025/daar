import Link from 'next/link'
import Image from 'next/image'
import { Clock, Eye } from 'lucide-react'
import { Badge } from '@/components/ui'
import { formatDate } from '@/lib/utils'
import type { ArticleListItem } from '@/types'

interface ArticleCardProps {
  article: ArticleListItem & { headerStyle?: string }
}

export function ArticleCard({ article }: ArticleCardProps) {
  const hasGradientHeader = !article.featuredImage && article.headerStyle === 'gradient'

  return (
    <Link href={`/kennisbank/${article.slug}`}>
      <article className="group bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-gray-300">
        {/* Featured Image */}
        {article.featuredImage ? (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {article.category && (
              <div className="absolute top-3 left-3">
                <Badge
                  variant="default"
                  className="bg-white/90 backdrop-blur-sm"
                  style={{ color: article.category.color || undefined }}
                >
                  {article.category.name}
                </Badge>
              </div>
            )}
          </div>
        ) : hasGradientHeader ? (
          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-brandGreen to-brandGreenHover flex items-center justify-center p-6">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-2 right-2 w-20 h-20 bg-white rounded-full blur-xl" />
              <div className="absolute bottom-2 left-2 w-28 h-28 bg-white rounded-full blur-2xl" />
            </div>
            <h3 className="text-lg font-bold text-white text-center relative z-10 line-clamp-3 group-hover:scale-105 transition-transform">
              {article.title}
            </h3>
            {article.category && (
              <div className="absolute top-3 left-3">
                <Badge
                  variant="default"
                  className="bg-white/90 backdrop-blur-sm"
                  style={{ color: article.category.color || undefined }}
                >
                  {article.category.name}
                </Badge>
              </div>
            )}
          </div>
        ) : null}

        <div className="p-5">
          {/* Category (if no image) */}
          {!article.featuredImage && article.category && (
            <div className="mb-2">
              <Badge
                variant="default"
                style={{
                  backgroundColor: article.category.color ? `${article.category.color}15` : undefined,
                  color: article.category.color || undefined
                }}
              >
                {article.category.name}
              </Badge>
            </div>
          )}

          {/* Title */}
          <h3 className="text-lg font-semibold text-navy mb-2 line-clamp-2 group-hover:text-brandGreen transition-colors">
            {article.title}
          </h3>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {article.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-3">
              {article.readingTime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {article.readingTime} min
                </span>
              )}
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {article.viewCount}
              </span>
            </div>

            {article.publishedAt && (
              <time dateTime={new Date(article.publishedAt).toISOString()}>
                {formatDate(article.publishedAt)}
              </time>
            )}
          </div>

          {/* Author */}
          {article.author && (
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
              {article.author.avatar ? (
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-brandGreen/10 flex items-center justify-center text-xs font-medium text-brandGreen">
                  {article.author.name.charAt(0)}
                </div>
              )}
              <span className="text-sm text-gray-600">{article.author.name}</span>
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}
