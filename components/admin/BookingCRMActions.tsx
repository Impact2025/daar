'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { UserPlus, Building2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui'

interface BookingCRMActionsProps {
  bookingId: string
  customerId: string | null
  customerName: string | null
}

export function BookingCRMActions({ bookingId, customerId, customerName }: BookingCRMActionsProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCreateCustomer = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/crm/customers/from-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Er ging iets mis')
        return
      }

      // Redirect to customer page
      router.push(`/admin/crm/klanten/${data.customer.id}`)
    } catch {
      setError('Er ging iets mis')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-end gap-2">
      {customerId ? (
        <Link
          href={`/admin/crm/klanten/${customerId}`}
          className="inline-flex items-center gap-1 text-sm text-brandGreen hover:underline"
        >
          <Building2 className="w-4 h-4" />
          {customerName || 'Klant'}
        </Link>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={handleCreateCustomer}
          disabled={isLoading}
          className="gap-1 text-xs"
        >
          {isLoading ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <UserPlus className="w-3 h-3" />
          )}
          Naar CRM
        </Button>
      )}

      {error && (
        <span className="text-xs text-red-500">{error}</span>
      )}
    </div>
  )
}
