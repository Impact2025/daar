import { prisma } from '@/lib/prisma'
import { Card, CardContent, Badge, Button } from '@/components/ui'
import { Calendar, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { BookingRow } from '@/components/admin/BookingRow'

async function getBookings() {
  return prisma.booking.findMany({
    orderBy: { startTime: 'desc' },
    include: {
      bookingType: {
        select: {
          name: true,
          duration: true,
          color: true,
        },
      },
      customer: {
        select: {
          id: true,
          companyName: true,
        },
      },
    },
    take: 50,
  })
}

async function getStats() {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const [total, thisMonth, upcoming, pending, inCRM] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({
      where: { createdAt: { gte: startOfMonth } },
    }),
    prisma.booking.count({
      where: {
        startTime: { gte: now },
        status: { in: ['PENDING', 'CONFIRMED'] },
      },
    }),
    prisma.booking.count({
      where: { status: 'PENDING' },
    }),
    prisma.booking.count({
      where: { customerId: { not: null } },
    }),
  ])

  return { total, thisMonth, upcoming, pending, inCRM }
}

export default async function AfsprakenPage() {
  const [bookings, stats] = await Promise.all([getBookings(), getStats()])

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy">Afspraken</h1>
          <p className="text-gray-500">Beheer afspraken en koppel aan CRM</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/crm/afspraken/nieuw">
            <Button className="gap-2">
              <Calendar className="w-4 h-4" />
              Nieuwe afspraak
            </Button>
          </Link>
          <Link href="/afspraak" target="_blank">
            <Button variant="outline" className="gap-2">
              <ExternalLink className="w-4 h-4" />
              Booking pagina
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Totaal</p>
            <p className="text-2xl font-bold text-navy">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Deze maand</p>
            <p className="text-2xl font-bold text-navy">{stats.thisMonth}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Aankomend</p>
            <p className="text-2xl font-bold text-brandGreen">{stats.upcoming}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">In afwachting</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">In CRM</p>
            <p className="text-2xl font-bold text-brandGreen">{stats.inCRM}</p>
            <p className="text-xs text-gray-400">
              {stats.total > 0 ? Math.round((stats.inCRM / stats.total) * 100) : 0}% gekoppeld
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Bookings Table */}
      <Card>
        <CardContent className="p-0">
          {bookings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                      Datum & tijd
                    </th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                      Type
                    </th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                      Contact
                    </th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                      Status
                    </th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                      Meeting
                    </th>
                    <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">
                      CRM
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {bookings.map((booking) => (
                    <BookingRow key={booking.id} booking={booking} />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">Nog geen afspraken</p>
              <p className="text-sm text-gray-400">
                Afspraken verschijnen hier wanneer bezoekers boeken
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
