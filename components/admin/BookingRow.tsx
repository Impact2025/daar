'use client'

import { useRouter } from 'next/navigation'
import { Calendar, User, Mail, Building2 } from 'lucide-react'
import { Badge } from '@/components/ui'
import { BookingCRMActions } from '@/components/admin/BookingCRMActions'

interface BookingRowProps {
  booking: {
    id: string
    startTime: Date
    endTime: Date
    name: string
    email: string
    organization: string | null
    status: string
    meetingLink: string | null
    bookingType: {
      name: string
      duration: number
      color: string | null
    }
    customer: {
      id: string
      companyName: string
    } | null
  }
}

export function BookingRow({ booking }: BookingRowProps) {
  const router = useRouter()
  const isPast = new Date(booking.startTime) < new Date()

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
    <tr
      className={`hover:bg-gray-50 cursor-pointer ${isPast ? 'opacity-60' : ''}`}
      onClick={() => router.push(`/admin/crm/afspraken/${booking.id}/bewerken`)}
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
      <td className="px-6 py-4">
        {booking.meetingLink && (
          <a
            href={booking.meetingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-brandGreen hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            Open link
          </a>
        )}
      </td>
      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
        <BookingCRMActions
          bookingId={booking.id}
          customerId={booking.customer?.id || null}
          customerName={booking.customer?.companyName || null}
        />
      </td>
    </tr>
  )
}
