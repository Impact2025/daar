'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import {
  FolderPlus,
  Upload,
  ChevronRight,
  Home,
  Grid3X3,
  List,
  Search,
  HardDrive,
} from 'lucide-react'
import { FolderCard, FileCard, UploadDropzone, formatFileSize } from '@/components/drive'
import type { DriveFolderWithRelations, DriveFileListItem, TeamMember } from '@/types'

export default function DrivePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const folderId = searchParams.get('folder')

  const [currentFolder, setCurrentFolder] = useState<DriveFolderWithRelations | null>(null)
  const [rootFolders, setRootFolders] = useState<DriveFolderWithRelations[]>([])
  const [rootFiles, setRootFiles] = useState<DriveFileListItem[]>([])
  const [team, setTeam] = useState<TeamMember[]>([])
  const [currentTeamMember, setCurrentTeamMember] = useState<TeamMember | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showUpload, setShowUpload] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [search, setSearch] = useState('')
  const [stats, setStats] = useState<{
    totalFiles: number
    totalFolders: number
    totalSize: number
  } | null>(null)

  useEffect(() => {
    fetchTeam()
    fetchStats()
  }, [])

  useEffect(() => {
    if (folderId) {
      fetchFolder(folderId)
    } else {
      fetchRootContents()
    }
  }, [folderId])

  const fetchTeam = async () => {
    const res = await fetch('/api/crm/team')
    const data = await res.json()
    setTeam(data)
    if (data.length > 0) setCurrentTeamMember(data[0])
  }

  const fetchStats = async () => {
    const res = await fetch('/api/drive/stats')
    const data = await res.json()
    setStats(data)
  }

  const fetchFolder = async (id: string) => {
    setIsLoading(true)
    const res = await fetch(`/api/drive/folders/${id}`)
    if (res.ok) {
      const data = await res.json()
      setCurrentFolder(data)
    }
    setIsLoading(false)
  }

  const fetchRootContents = async () => {
    setIsLoading(true)
    setCurrentFolder(null)

    const [foldersRes, filesRes] = await Promise.all([
      fetch('/api/drive/folders'),
      fetch('/api/drive/files?folderId='),
    ])

    const folders = await foldersRes.json()
    const files = await filesRes.json()

    setRootFolders(folders)
    setRootFiles(files.data || [])
    setIsLoading(false)
  }

  const handleCreateFolder = async () => {
    const name = prompt('Mapnaam:')
    if (!name || !currentTeamMember) return

    await fetch('/api/drive/folders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        parentId: folderId || null,
        createdById: currentTeamMember.id,
      }),
    })

    if (folderId) {
      fetchFolder(folderId)
    } else {
      fetchRootContents()
    }
  }

  const handleRenameFolder = async (id: string, newName: string) => {
    await fetch(`/api/drive/folders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName }),
    })

    if (folderId) {
      fetchFolder(folderId)
    } else {
      fetchRootContents()
    }
  }

  const handleDeleteFolder = async (id: string) => {
    await fetch(`/api/drive/folders/${id}`, { method: 'DELETE' })

    if (folderId) {
      fetchFolder(folderId)
    } else {
      fetchRootContents()
    }
  }

  const handleRenameFile = async (id: string, newName: string) => {
    await fetch(`/api/drive/files/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ displayName: newName }),
    })

    if (folderId) {
      fetchFolder(folderId)
    } else {
      fetchRootContents()
    }
  }

  const handleDeleteFile = async (id: string) => {
    await fetch(`/api/drive/files/${id}`, { method: 'DELETE' })

    if (folderId) {
      fetchFolder(folderId)
    } else {
      fetchRootContents()
    }
    fetchStats()
  }

  const handleUpload = async (files: File[]) => {
    if (!currentTeamMember) return

    for (const file of files) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('uploadedById', currentTeamMember.id)
      if (folderId) formData.append('folderId', folderId)

      await fetch('/api/drive/files', {
        method: 'POST',
        body: formData,
      })
    }

    if (folderId) {
      fetchFolder(folderId)
    } else {
      fetchRootContents()
    }
    fetchStats()
    setShowUpload(false)
  }

  const navigateToFolder = (id: string | null) => {
    if (id) {
      router.push(`/admin/drive?folder=${id}`)
    } else {
      router.push('/admin/drive')
    }
  }

  const folders = currentFolder?.children || rootFolders
  const files = currentFolder?.files || rootFiles
  const breadcrumbs = currentFolder?.breadcrumbs || []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Drive</h1>
          {stats && (
            <p className="text-gray-500">
              {stats.totalFiles} bestanden • {stats.totalFolders} mappen • {formatFileSize(stats.totalSize)}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleCreateFolder}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <FolderPlus className="w-4 h-4" />
            Nieuwe map
          </button>
          <button
            onClick={() => setShowUpload(!showUpload)}
            className="flex items-center gap-2 px-4 py-2 bg-brandGreen text-white rounded-lg hover:bg-brandGreen/90"
          >
            <Upload className="w-4 h-4" />
            Uploaden
          </button>
        </div>
      </div>

      {/* Upload dropzone */}
      {showUpload && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <UploadDropzone onUpload={handleUpload} folderId={folderId} />
        </div>
      )}

      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm">
        <button
          onClick={() => navigateToFolder(null)}
          className="flex items-center gap-1 text-gray-500 hover:text-brandGreen"
        >
          <Home className="w-4 h-4" />
          Drive
        </button>
        {breadcrumbs.map((crumb: { id: string; name: string }) => (
          <div key={crumb.id} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-gray-300" />
            <button
              onClick={() => navigateToFolder(crumb.id)}
              className="text-gray-500 hover:text-brandGreen"
            >
              {crumb.name}
            </button>
          </div>
        ))}
        {currentFolder && (
          <>
            <ChevronRight className="w-4 h-4 text-gray-300" />
            <span className="font-medium text-gray-900">{currentFolder.name}</span>
          </>
        )}
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Zoeken..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="text-center py-12 text-gray-500">Laden...</div>
      ) : folders.length === 0 && files.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <HardDrive className="w-12 h-12 mx-auto text-gray-300 mb-4" />
          <h3 className="font-medium text-gray-900 mb-2">
            {currentFolder ? 'Deze map is leeg' : 'Drive is leeg'}
          </h3>
          <p className="text-gray-500 mb-4">Upload bestanden of maak een nieuwe map aan</p>
          <div className="flex justify-center gap-3">
            <button
              onClick={handleCreateFolder}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <FolderPlus className="w-4 h-4" />
              Nieuwe map
            </button>
            <button
              onClick={() => setShowUpload(true)}
              className="flex items-center gap-2 px-4 py-2 bg-brandGreen text-white rounded-lg hover:bg-brandGreen/90"
            >
              <Upload className="w-4 h-4" />
              Uploaden
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Folders */}
          {folders.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">Mappen</h3>
              <div className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' : 'space-y-2'}>
                {folders
                  .filter((f) => !search || f.name.toLowerCase().includes(search.toLowerCase()))
                  .map((folder) => (
                    <FolderCard
                      key={folder.id}
                      id={folder.id}
                      name={folder.name}
                      color={folder.color}
                      filesCount={'_count' in folder ? (folder._count as { files?: number })?.files || 0 : 0}
                      foldersCount={'_count' in folder ? (folder._count as { children?: number })?.children || 0 : 0}
                      onClick={() => navigateToFolder(folder.id)}
                      onRename={handleRenameFolder}
                      onDelete={handleDeleteFolder}
                    />
                  ))}
              </div>
            </div>
          )}

          {/* Files */}
          {files.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">Bestanden</h3>
              <div className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4' : 'space-y-2'}>
                {files
                  .filter((f: { name: string; displayName?: string | null }) =>
                    !search || (f.displayName || f.name).toLowerCase().includes(search.toLowerCase())
                  )
                  .map((file: DriveFileListItem) => (
                    <FileCard
                      key={file.id}
                      {...file}
                      onRename={handleRenameFile}
                      onDelete={handleDeleteFile}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
