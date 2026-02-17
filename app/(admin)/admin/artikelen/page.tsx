import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, Badge, Button } from '@/components/ui'
import { Plus, Edit, Eye } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface PageProps {
  searchParams: Promise<{ type?: string }>
}

async function getArticles(type?: string) {
  return prisma.article.findMany({
    where: type === 'blog' ? { type: 'BLOG' } : type === 'kennisbank' ? { type: 'KENNISBANK' } : {},
    orderBy: { updatedAt: 'desc' },
    include: {
      author: {
        select: { name: true },
      },
      category: {
        select: { name: true, color: true },
      },
    },
  })
}

export default async function ArticlesPage({ searchParams }: PageProps) {
  const params = await searchParams
  const activeType = params.type || 'alle'
  const articles = await getArticles(activeType === 'alle' ? undefined : activeType)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return <Badge variant="success">Gepubliceerd</Badge>
      case 'DRAFT':
        return <Badge variant="default">Concept</Badge>
      case 'REVIEW':
        return <Badge variant="warning">Review</Badge>
      case 'ARCHIVED':
        return <Badge variant="danger">Gearchiveerd</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getPreviewUrl = (article: { slug: string; type: string }) => {
    return article.type === 'BLOG' ? `/blog/${article.slug}` : `/kennisbank/${article.slug}`
  }

  const tabs = [
    { key: 'alle', label: 'Alle' },
    { key: 'kennisbank', label: 'Kennisbank' },
    { key: 'blog', label: 'Blog' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy">Artikelen</h1>
          <p className="text-gray-500">Beheer kennisbank artikelen en blogposts</p>
        </div>
        <Link href="/admin/artikelen/nieuw">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Nieuw artikel
          </Button>
        </Link>
      </div>

      {/* Type tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
        {tabs.map((tab) => (
          <Link
            key={tab.key}
            href={tab.key === 'alle' ? '/admin/artikelen' : `/admin/artikelen?type=${tab.key}`}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeType === tab.key
                ? 'bg-white text-navy shadow-sm'
                : 'text-gray-600 hover:text-navy'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          {articles.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                    Titel
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                    Type
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                    Categorie
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                    Status
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                    Views
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                    Bijgewerkt
                  </th>
                  <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">
                    Acties
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {articles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-navy">{article.title}</p>
                        <p className="text-sm text-gray-500">{article.author.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={article.type === 'BLOG' ? 'warning' : 'default'}>
                        {article.type === 'BLOG' ? 'Blog' : 'Kennisbank'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      {article.category ? (
                        <Badge
                          style={{
                            backgroundColor: article.category.color
                              ? `${article.category.color}15`
                              : undefined,
                            color: article.category.color || undefined,
                          }}
                        >
                          {article.category.name}
                        </Badge>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(article.status)}</td>
                    <td className="px-6 py-4 text-gray-600">{article.viewCount}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(article.updatedAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {article.status === 'PUBLISHED' && (
                          <Link
                            href={getPreviewUrl(article)}
                            target="_blank"
                            className="p-2 text-gray-400 hover:text-brandGreen transition-colors"
                            title="Bekijken"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        )}
                        <Link
                          href={`/admin/artikelen/${article.slug}/bewerken`}
                          className="p-2 text-gray-400 hover:text-brandGreen transition-colors"
                          title="Bewerken"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Nog geen artikelen</p>
              <Link href="/admin/artikelen/nieuw">
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Maak je eerste artikel
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
