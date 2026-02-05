'use client'

import { Folder, MoreVertical, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'

interface FolderCardProps {
  id: string
  name: string
  color?: string | null
  filesCount: number
  foldersCount: number
  onClick: () => void
  onRename?: (id: string, newName: string) => void
  onDelete?: (id: string) => void
}

export function FolderCard({
  id,
  name,
  color,
  filesCount,
  foldersCount,
  onClick,
  onRename,
  onDelete,
}: FolderCardProps) {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 p-4 hover:border-brandGreen hover:shadow-sm cursor-pointer transition-all group relative"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Folder
            className="w-10 h-10"
            style={{ color: color || '#3BA273' }}
            fill={color || '#3BA273'}
            fillOpacity={0.2}
          />
          <div>
            <h4 className="font-medium text-gray-900 group-hover:text-brandGreen transition-colors">
              {name}
            </h4>
            <p className="text-xs text-gray-400">
              {foldersCount > 0 && `${foldersCount} mappen`}
              {foldersCount > 0 && filesCount > 0 && ', '}
              {filesCount > 0 && `${filesCount} bestanden`}
              {foldersCount === 0 && filesCount === 0 && 'Leeg'}
            </p>
          </div>
        </div>

        {(onRename || onDelete) && (
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowMenu(!showMenu)
              }}
              className="p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {showMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowMenu(false)
                  }}
                />
                <div className="absolute right-0 top-6 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20 min-w-32">
                  {onRename && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        const newName = prompt('Nieuwe mapnaam:', name)
                        if (newName && newName !== name) {
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
                      onClick={(e) => {
                        e.stopPropagation()
                        if (confirm(`Map "${name}" en alle inhoud verwijderen?`)) {
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
        )}
      </div>
    </div>
  )
}
