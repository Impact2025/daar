'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import * as LucideIcons from 'lucide-react'

interface Category {
  id: string
  name: string
  slug: string
  icon?: string | null
  color?: string | null
  _count: {
    articles: number
  }
}

interface CategoryFilterProps {
  categories: Category[]
  activeCategory?: string
}

export function CategoryFilter({ categories, activeCategory }: CategoryFilterProps) {
  const searchParams = useSearchParams()
  const currentQuery = searchParams.get('q')

  const getIcon = (iconName: string | null | undefined) => {
    if (!iconName) return null
    const Icon = (LucideIcons as any)[iconName]
    return Icon ? <Icon className="w-4 h-4" /> : null
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={currentQuery ? `/kennisbank?q=${currentQuery}` : '/kennisbank'}
        className={cn(
          'px-5 py-2.5 rounded-full text-sm font-semibold transition-all',
          !activeCategory
            ? 'bg-brandGreen text-white shadow-md shadow-green-200/50 hover:bg-brandGreenHover'
            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'
        )}
      >
        Alles
      </Link>

      {categories.map((category) => {
        const isActive = activeCategory === category.slug
        const queryParam = currentQuery ? `?q=${currentQuery}` : ''

        return (
          <Link
            key={category.id}
            href={`/kennisbank/categorie/${category.slug}${queryParam}`}
            className={cn(
              'px-5 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2',
              isActive
                ? 'text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'
            )}
            style={{
              backgroundColor: isActive ? (category.color || '#3BA273') : undefined,
            }}
          >
            {getIcon(category.icon)}
            {category.name}
            <span className={cn(
              'text-xs px-1.5 rounded-full',
              isActive ? 'bg-white/20' : 'bg-gray-200'
            )}>
              {category._count.articles}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
