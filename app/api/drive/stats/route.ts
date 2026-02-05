import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

// GET /api/drive/stats - Get drive statistics
export async function GET() {
  try {
    const session = await auth()
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const [totalFiles, totalFolders, totalSizeResult, recentFiles, filesByType] = await Promise.all([
      prisma.driveFile.count(),
      prisma.driveFolder.count(),
      prisma.driveFile.aggregate({
        _sum: { size: true },
      }),
      prisma.driveFile.findMany({
        include: {
          uploadedBy: { select: { id: true, name: true, avatar: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 10,
      }),
      prisma.driveFile.groupBy({
        by: ['mimeType'],
        _count: true,
        _sum: { size: true },
      }),
    ])

    // Group files by category
    const fileCategories = filesByType.reduce(
      (acc, file) => {
        let category = 'Overig'
        if (file.mimeType.startsWith('image/')) category = 'Afbeeldingen'
        else if (file.mimeType.startsWith('video/')) category = 'Video'
        else if (file.mimeType.startsWith('audio/')) category = 'Audio'
        else if (file.mimeType.includes('pdf')) category = 'PDF'
        else if (file.mimeType.includes('document') || file.mimeType.includes('word')) category = 'Documenten'
        else if (file.mimeType.includes('sheet') || file.mimeType.includes('excel')) category = 'Spreadsheets'
        else if (file.mimeType.includes('presentation') || file.mimeType.includes('powerpoint')) category = 'Presentaties'

        if (!acc[category]) {
          acc[category] = { count: 0, size: 0 }
        }
        acc[category].count += file._count
        acc[category].size += file._sum.size || 0
        return acc
      },
      {} as Record<string, { count: number; size: number }>
    )

    return NextResponse.json({
      totalFiles,
      totalFolders,
      totalSize: totalSizeResult._sum.size || 0,
      recentFiles,
      fileCategories,
    })
  } catch (error) {
    console.error('Error fetching drive stats:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
