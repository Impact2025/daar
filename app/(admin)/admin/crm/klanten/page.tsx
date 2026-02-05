'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Filter, Plus, Building2, Download } from 'lucide-react'
import { CustomerCard, StatusBadge, TeamMemberBadge } from '@/components/crm'
import type { CustomerListItem, TeamMember, CustomerStatus } from '@/types'

export default function CustomersPage() {
  const [customers, setCustomers] = useState<CustomerListItem[]>([])
  const [team, setTeam] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<CustomerStatus | ''>('')
  const [assignedFilter, setAssignedFilter] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchTeam()
  }, [])

  useEffect(() => {
    fetchCustomers()
  }, [search, statusFilter, assignedFilter, page])

  const fetchTeam = async () => {
    const res = await fetch('/api/crm/team')
    const data = await res.json()
    setTeam(data)
  }

  const fetchCustomers = async () => {
    setIsLoading(true)
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (statusFilter) params.set('status', statusFilter)
    if (assignedFilter) params.set('assignedToId', assignedFilter)
    params.set('page', page.toString())

    const res = await fetch(`/api/crm/customers?${params}`)
    const data = await res.json()
    setCustomers(data.data)
    setTotalPages(data.pagination.totalPages)
    setIsLoading(false)
  }

  const statuses: CustomerStatus[] = ['LEAD', 'PROSPECT', 'NEGOTIATION', 'CUSTOMER', 'CHURNED', 'INACTIVE']

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Klanten</h1>
          <p className="text-gray-500">Beheer je klanten en prospects</p>
        </div>
        <Link
          href="/admin/crm/klanten/nieuw"
          className="flex items-center gap-2 px-4 py-2 bg-brandGreen text-white rounded-lg hover:bg-brandGreen/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nieuwe klant
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Zoek op naam, email, KVK..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setPage(1)
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
              />
            </div>
          </div>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as CustomerStatus | '')
              setPage(1)
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
          >
            <option value="">Alle statussen</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status === 'LEAD' && 'Lead'}
                {status === 'PROSPECT' && 'Prospect'}
                {status === 'NEGOTIATION' && 'Onderhandeling'}
                {status === 'CUSTOMER' && 'Klant'}
                {status === 'CHURNED' && 'Verloren'}
                {status === 'INACTIVE' && 'Inactief'}
              </option>
            ))}
          </select>

          {/* Team filter */}
          <select
            value={assignedFilter}
            onChange={(e) => {
              setAssignedFilter(e.target.value)
              setPage(1)
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandGreen focus:border-brandGreen"
          >
            <option value="">Alle teamleden</option>
            {team.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Customer list */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="text-center py-12 text-gray-500">Laden...</div>
        ) : customers.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Building2 className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <h3 className="font-medium text-gray-900 mb-2">Geen klanten gevonden</h3>
            <p className="text-gray-500 mb-4">
              {search || statusFilter || assignedFilter
                ? 'Probeer andere filters'
                : 'Voeg je eerste klant toe'}
            </p>
            <Link
              href="/admin/crm/klanten/nieuw"
              className="inline-flex items-center gap-2 px-4 py-2 bg-brandGreen text-white rounded-lg hover:bg-brandGreen/90"
            >
              <Plus className="w-4 h-4" />
              Nieuwe klant
            </Link>
          </div>
        ) : (
          customers.map((customer) => (
            <CustomerCard key={customer.id} customer={customer} />
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
          >
            Vorige
          </button>
          <span className="px-4 py-2 text-gray-600">
            Pagina {page} van {totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
          >
            Volgende
          </button>
        </div>
      )}
    </div>
  )
}
