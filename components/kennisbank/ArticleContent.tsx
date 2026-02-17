'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Clock, Eye, Calendar, ArrowLeft, Share2, List } from 'lucide-react'
import { Badge, Button } from '@/components/ui'
import { formatDate } from '@/lib/utils'
import type { ArticleWithRelations } from '@/types'

interface ArticleContentProps {
  article: ArticleWithRelations
  basePath?: string
}

interface TOCItem {
  id: string
  text: string
  level: number
}

const gradientColors: Record<string, string> = {
  'gradient': 'from-brandGreen to-brandGreenHover', // Backward compatibility
  'gradient-green': 'from-brandGreen to-brandGreenHover',
  'gradient-yellow': 'from-[#D4A574] to-[#C99A64]',
  'gradient-coral': 'from-[#E07856] to-[#D96B4A]',
  'gradient-blue': 'from-[#5B9BD5] to-[#4A8BC2]',
  'gradient-teal': 'from-[#4DB8A8] to-[#3FA799]',
  'gradient-navy': 'from-[#2D334A] to-[#1F2537]',
}

export function ArticleContent({ article, basePath = '/kennisbank' }: ArticleContentProps) {
  const isBlog = basePath === '/blog'
  const backLabel = isBlog ? 'Terug naar blog' : 'Terug naar kennisbank'
  const [tocItems, setTocItems] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  const headerStyle = (article as any).headerStyle || 'image'
  const gradientClass = gradientColors[headerStyle] || gradientColors['gradient-green']

  // Extract TOC items from content
  useEffect(() => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(article.content, 'text/html')
    const headings = doc.querySelectorAll('h2, h3')

    const items: TOCItem[] = []
    headings.forEach((heading) => {
      const id = heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || ''
      if (heading.textContent) {
        items.push({
          id,
          text: heading.textContent,
          level: heading.tagName === 'H2' ? 2 : 3,
        })
      }
    })
    setTocItems(items)
  }, [article.content])

  // Track active heading on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -80% 0px' }
    )

    tocItems.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [tocItems])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const top = element.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative">
      {/* Back link */}
      <Link
        href={basePath}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-brandGreen transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        {backLabel}
      </Link>

      <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
        {/* Main Article */}
        <article className="max-w-none">
          {/* Header */}
          <header className="mb-8">
            {/* Category */}
            {article.category && (
              <Link href={`${basePath}/categorie/${article.category.slug}`}>
                <Badge
                  variant="default"
                  className="mb-4"
                  style={{
                    backgroundColor: article.category.color ? `${article.category.color}15` : undefined,
                    color: article.category.color || undefined,
                  }}
                >
                  {article.category.name}
                </Badge>
              </Link>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-daar-blue mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Excerpt */}
            {article.excerpt && (
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {article.excerpt}
              </p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
              {article.publishedAt && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {formatDate(article.publishedAt)}
                </span>
              )}
              {article.readingTime && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {article.readingTime} min leestijd
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                {article.viewCount.toLocaleString()} weergaven
              </span>
            </div>

            {/* Author */}
            <div className="flex items-center justify-between py-4 border-y border-gray-200">
              <div className="flex items-center gap-3">
                {article.author.avatar ? (
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-brandGreen/10 flex items-center justify-center text-lg font-medium text-brandGreen">
                    {article.author.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-medium text-daar-blue">{article.author.name}</p>
                  {article.author.role && (
                    <p className="text-sm text-gray-500">{article.author.role}</p>
                  )}
                </div>
              </div>

              <Button variant="ghost" size="sm" className="gap-2">
                <Share2 className="w-4 h-4" />
                Delen
              </Button>
            </div>
          </header>

          {/* Featured Image or Gradient Header */}
          {article.featuredImage ? (
            <div className="relative aspect-video rounded-xl overflow-hidden mb-10 shadow-lg">
              <Image
                src={article.featuredImage}
                alt={article.featuredImageAlt || article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : headerStyle.startsWith('gradient-') ? (
            <div className={`relative rounded-xl overflow-hidden mb-10 shadow-lg bg-gradient-to-br ${gradientClass} py-16 px-8`}>
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full blur-2xl" />
                <div className="absolute bottom-4 left-4 w-48 h-48 bg-white rounded-full blur-3xl" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center relative z-10 leading-tight max-w-3xl mx-auto">
                {article.title}
              </h2>
            </div>
          ) : null}

          {/* Content */}
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map(({ tag }) => (
                  <Link
                    key={tag.id}
                    href={`${basePath}?tag=${tag.slug}`}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-brandGreen hover:text-white transition-colors"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          {article.author.bio && (
            <div className="mt-12 p-8 bg-gradient-to-br from-lightGreen to-white rounded-2xl border border-brandGreen/10">
              <div className="flex items-start gap-5">
                {article.author.avatar ? (
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-brandGreen/20 flex items-center justify-center text-2xl font-semibold text-brandGreen flex-shrink-0">
                    {article.author.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-daar-blue text-lg mb-2">Over {article.author.name}</h3>
                  <p className="text-gray-600 leading-relaxed">{article.author.bio}</p>
                </div>
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-12 p-8 bg-navy rounded-2xl text-white text-center">
            <h3 className="text-2xl font-bold mb-3">Klaar om je vrijwilligersbeheer te verbeteren?</h3>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              Ontdek waar jouw organisatie staat met de gratis VrijwilligersCheck en ontvang direct praktische verbeterpunten.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/vrijwilligerscheck"
                className="inline-flex items-center justify-center px-6 py-3 bg-brandGreen text-white rounded-lg font-medium hover:bg-brandGreenHover transition-colors"
              >
                Start de VrijwilligersCheck
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors"
              >
                Plan een gesprek
              </Link>
            </div>
          </div>
        </article>

        {/* Sticky TOC Sidebar */}
        {tocItems.length > 0 && (
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                  <List className="w-4 h-4 text-brandGreen" />
                  <h4 className="font-semibold text-daar-blue text-sm">In dit artikel</h4>
                </div>
                <nav className="space-y-1">
                  {tocItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToHeading(item.id)}
                      className={`block w-full text-left text-sm py-1.5 px-2 rounded transition-colors ${
                        item.level === 3 ? 'pl-4' : ''
                      } ${
                        activeId === item.id
                          ? 'text-brandGreen bg-lightGreen font-medium'
                          : 'text-gray-600 hover:text-brandGreen hover:bg-gray-50'
                      }`}
                    >
                      {item.text}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Quick Links */}
              <div className="mt-6 p-5 bg-lightGreen rounded-xl">
                <h4 className="font-semibold text-daar-blue text-sm mb-3">Snelle links</h4>
                <div className="space-y-2">
                  <Link
                    href="/vrijwilligerscheck"
                    className="block text-sm text-brandGreen hover:underline"
                  >
                    → VrijwilligersCheck
                  </Link>
                  <Link
                    href={basePath}
                    className="block text-sm text-brandGreen hover:underline"
                  >
                    → {isBlog ? 'Meer blogposts' : 'Meer artikelen'}
                  </Link>
                  <Link
                    href="/contact"
                    className="block text-sm text-brandGreen hover:underline"
                  >
                    → Contact opnemen
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
