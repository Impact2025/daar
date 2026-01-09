import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, Badge, Button } from '@/components/ui'
import { Plus, Edit, Eye, Trash2 } from 'lucide-react'
import { formatDate } from '@/lib/utils'

async function getArticles() {
  return prisma.article.findMany({
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

export default async function ArticlesPage() {
  const articles = await getArticles()

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

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy">Artikelen</h1>
          <p className="text-gray-500">Beheer je kennisbank artikelen</p>
        </div>
        <Link href="/admin/artikelen/nieuw">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Nieuw artikel
          </Button>
        </Link>
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
                            href={`/kennisbank/${article.slug}`}
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
