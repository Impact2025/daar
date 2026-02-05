'use client'

import {
  File,
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  FileSpreadsheet,
  FileCode,
  FileArchive,
  Presentation,
} from 'lucide-react'

interface FileIconProps {
  mimeType: string
  size?: 'sm' | 'md' | 'lg'
}

export function FileIcon({ mimeType, size = 'md' }: FileIconProps) {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  let Icon = File
  let colorClass = 'text-gray-400'

  if (mimeType.startsWith('image/')) {
    Icon = FileImage
    colorClass = 'text-purple-500'
  } else if (mimeType.startsWith('video/')) {
    Icon = FileVideo
    colorClass = 'text-pink-500'
  } else if (mimeType.startsWith('audio/')) {
    Icon = FileAudio
    colorClass = 'text-orange-500'
  } else if (mimeType.includes('pdf')) {
    Icon = FileText
    colorClass = 'text-red-500'
  } else if (mimeType.includes('document') || mimeType.includes('word') || mimeType.includes('text')) {
    Icon = FileText
    colorClass = 'text-blue-500'
  } else if (mimeType.includes('sheet') || mimeType.includes('excel') || mimeType.includes('csv')) {
    Icon = FileSpreadsheet
    colorClass = 'text-green-500'
  } else if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) {
    Icon = Presentation
    colorClass = 'text-orange-500'
  } else if (mimeType.includes('zip') || mimeType.includes('archive') || mimeType.includes('compressed')) {
    Icon = FileArchive
    colorClass = 'text-yellow-600'
  } else if (mimeType.includes('javascript') || mimeType.includes('json') || mimeType.includes('html') || mimeType.includes('css')) {
    Icon = FileCode
    colorClass = 'text-indigo-500'
  }

  return <Icon className={`${sizeClasses[size]} ${colorClass}`} />
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}
