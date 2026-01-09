import { prisma } from '@/lib/prisma'
import { Card, CardContent, Badge, Button } from '@/components/ui'
import { Calendar, Clock, User, Building2, Mail, Phone, ExternalLink } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

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
    },
    take: 50,
  })
}

async function getStats() {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const [total, thisMonth, upcoming, pending] = await Promise.all([
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
  ])

  return { total, thisMonth, upcoming, pending }
}

export default async function AfsprakenPage() {
  const [bookings, stats] = await Promise.all([getBookings(), getStats()])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return <Badge variant="success">Bevestigd</Badge>
      case 'PENDING':
        return <Badge variant="warning">In afwachting</Badge>
      case 'CANCELLED':
        return <Badge variant="danger">Geannuleerd</Badge>
      case 'COMPLETED':
        return <Badge variant="info">Voltooid</Badge>
      case 'NO_SHOW':
        return <Badge variant="danger">No-show</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('nl-NL', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatBookingDate = (date: Date) => {
    return new Date(date).toLocaleDateString('nl-NL', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy">Afspraken</h1>
          <p className="text-gray-500">Beheer en bekijk alle afspraken</p>
        </div>
        <Link href="/afspraak" target="_blank">
          <Button variant="outline" className="gap-2">
            <ExternalLink className="w-4 h-4" />
            Booking pagina
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
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
      </div>

      {/* Bookings Table */}
      <Card>
        <CardContent className="p-0">
          {bookings.length > 0 ? (
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
                  <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">
                    Acties
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.map((booking) => {
                  const isPast = new Date(booking.startTime) < new Date()

                  return (
                    <tr
                      key={booking.id}
                      className={`hover:bg-gray-50 ${isPast ? 'opacity-60' : ''}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="font-medium text-navy">
                              {formatBookingDate(booking.startTime)}
                            </p>
                            <p className="text-sm text-gray-500">
                              {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          style={{
                            backgroundColor: booking.bookingType.color
                              ? `${booking.bookingType.color}15`
                              : undefined,
                            color: booking.bookingType.color || undefined,
                          }}
                        >
                          {booking.bookingType.name}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          {booking.bookingType.duration} min
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-navy flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {booking.name}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {booking.email}
                          </p>
                          {booking.organization && (
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <Building2 className="w-3 h-3" />
                              {booking.organization}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(booking.status)}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {booking.meetingLink && (
                            <a
                              href={booking.meetingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-brandGreen hover:underline"
                            >
                              Meeting link
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
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
