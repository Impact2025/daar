'use client'

import { useState } from 'react'
import { MoreVertical, Download, Pencil, Trash2, ExternalLink } from 'lucide-react'
import { format } from 'date-fns'
import { nl } from 'date-fns/locale'
import { FileIcon, formatFileSize } from './FileIcon'
import { TeamMemberBadge } from '../crm/TeamMemberBadge'

interface FileCardProps {
  id: string
  name: string
  displayName?: string | null
  mimeType: string
  size: number
  url: string
  thumbnailUrl?: string | null
  createdAt: Date | string
  uploadedBy: {
    id: string
    name: string
    avatar?: string | null
  }
  onRename?: (id: string, newName: string) => void
  onDelete?: (id: string) => void
}

export function FileCard({
  id,
  name,
  displayName,
  mimeType,
  size,
  url,
  thumbnailUrl,
  createdAt,
  uploadedBy,
  onRename,
  onDelete,
}: FileCardProps) {
  const [showMenu, setShowMenu] = useState(false)
  const isImage = mimeType.startsWith('image/')

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:border-brandGreen hover:shadow-sm transition-all group">
      {/* Preview area */}
      <div className="aspect-[4/3] bg-gray-50 rounded-t-lg flex items-center justify-center overflow-hidden">
        {isImage && thumbnailUrl ? (
          <img src={thumbnailUrl || url} alt={name} className="w-full h-full object-cover" />
        ) : isImage ? (
          <img src={url} alt={name} className="w-full h-full object-cover" />
        ) : (
          <FileIcon mimeType={mimeType} size="lg" />
        )}
      </div>

      {/* Info area */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm text-gray-900 truncate" title={displayName || name}>
              {displayName || name}
            </h4>
            <p className="text-xs text-gray-400 mt-0.5">
              {formatFileSize(size)} • {format(new Date(createdAt), 'd MMM yyyy', { locale: nl })}
            </p>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {showMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
                <div className="absolute right-0 top-6 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20 min-w-36">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                    onClick={() => setShowMenu(false)}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Openen
                  </a>
                  <a
                    href={url}
                    download={name}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                    onClick={() => setShowMenu(false)}
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                  {onRename && (
                    <button
                      onClick={() => {
                        const newName = prompt('Nieuwe naam:', displayName || name)
                        if (newName) {
                          onRename(id, newName)
                        }
                        setShowMenu(false)
                      }}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Pencil className="w-4 h-4" />
                      Hernoemen
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => {
                        if (confirm(`"${displayName || name}" verwijderen?`)) {
                          onDelete(id)
                        }
                        setShowMenu(false)
                      }}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Verwijderen
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-2">
          <TeamMemberBadge
            name={uploadedBy.name}
            avatar={uploadedBy.avatar}
            size="sm"
          />
        </div>
      </div>
    </div>
  )
}
