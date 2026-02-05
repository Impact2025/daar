'use client'

import { useState, useCallback } from 'react'
import { Upload, X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { FileIcon, formatFileSize } from './FileIcon'

interface UploadFile {
  file: File
  status: 'pending' | 'uploading' | 'complete' | 'error'
  progress: number
  error?: string
}

interface UploadDropzoneProps {
  onUpload: (files: File[]) => Promise<void>
  folderId?: string | null
  accept?: string
  maxSize?: number // in bytes
}

export function UploadDropzone({
  onUpload,
  folderId,
  accept,
  maxSize = 50 * 1024 * 1024, // 50MB default
}: UploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState<UploadFile[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const processFiles = useCallback((fileList: FileList | File[]) => {
    const newFiles: UploadFile[] = Array.from(fileList).map((file) => ({
      file,
      status: file.size > maxSize ? 'error' : 'pending',
      progress: 0,
      error: file.size > maxSize ? `Bestand te groot (max ${formatFileSize(maxSize)})` : undefined,
    }))
    setFiles((prev) => [...prev, ...newFiles])
  }, [maxSize])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    processFiles(e.dataTransfer.files)
  }, [processFiles])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files)
    }
  }, [processFiles])

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const uploadFiles = useCallback(async () => {
    const pendingFiles = files.filter((f) => f.status === 'pending')
    if (pendingFiles.length === 0) return

    setIsUploading(true)

    // Update status to uploading
    setFiles((prev) =>
      prev.map((f) => (f.status === 'pending' ? { ...f, status: 'uploading' as const, progress: 0 } : f))
    )

    try {
      await onUpload(pendingFiles.map((f) => f.file))
      // Mark all as complete
      setFiles((prev) =>
        prev.map((f) => (f.status === 'uploading' ? { ...f, status: 'complete' as const, progress: 100 } : f))
      )
    } catch (error) {
      // Mark as error
      setFiles((prev) =>
        prev.map((f) =>
          f.status === 'uploading'
            ? { ...f, status: 'error' as const, error: 'Upload mislukt' }
            : f
        )
      )
    } finally {
      setIsUploading(false)
    }
  }, [files, onUpload])

  const clearCompleted = useCallback(() => {
    setFiles((prev) => prev.filter((f) => f.status !== 'complete'))
  }, [])

  const pendingCount = files.filter((f) => f.status === 'pending').length
  const completedCount = files.filter((f) => f.status === 'complete').length

  return (
    <div className="space-y-4">
      {/* Dropzone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          isDragging
            ? 'border-brandGreen bg-brandGreen/5'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <Upload className={`w-10 h-10 mx-auto mb-3 ${isDragging ? 'text-brandGreen' : 'text-gray-400'}`} />
        <p className="text-gray-600 mb-2">
          Sleep bestanden hierheen of{' '}
          <label className="text-brandGreen hover:underline cursor-pointer">
            kies bestanden
            <input
              type="file"
              multiple
              accept={accept}
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
        </p>
        <p className="text-xs text-gray-400">Max {formatFileSize(maxSize)} per bestand</p>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-700">
              {files.length} bestand{files.length !== 1 ? 'en' : ''}
            </h4>
            {completedCount > 0 && (
              <button
                onClick={clearCompleted}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Voltooide verwijderen
              </button>
            )}
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white rounded-lg p-2 border border-gray-200"
              >
                <FileIcon mimeType={file.file.type} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 truncate">{file.file.name}</p>
                  <p className="text-xs text-gray-400">{formatFileSize(file.file.size)}</p>
                </div>
                {file.status === 'pending' && (
                  <button
                    onClick={() => removeFile(index)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                {file.status === 'uploading' && (
                  <Loader2 className="w-4 h-4 text-brandGreen animate-spin" />
                )}
                {file.status === 'complete' && (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                )}
                {file.status === 'error' && (
                  <div className="flex items-center gap-1">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span className="text-xs text-red-500">{file.error}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {pendingCount > 0 && (
            <button
              onClick={uploadFiles}
              disabled={isUploading}
              className="w-full py-2 bg-brandGreen text-white rounded-lg hover:bg-brandGreen/90 disabled:opacity-50 transition-colors"
            >
              {isUploading ? 'Uploaden...' : `${pendingCount} bestand${pendingCount !== 1 ? 'en' : ''} uploaden`}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
