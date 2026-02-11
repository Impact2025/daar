'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  Calendar,
  Euro,
  Edit2,
  Trash2,
  Plus,
  ExternalLink,
  ClipboardCheck,
  Eye,
} from 'lucide-react'
import { Badge } from '@/components/ui'
import { format } from 'date-fns'
import { nl } from 'date-fns/locale'
import {
  StatusBadge,
  TeamMemberBadge,
  ActivityTimeline,
  TaskCard,
  DealCard,
  QuickActivityModal,
} from '@/components/crm'
import type { CustomerWithRelations, TeamMember, ActivityType } from '@/types'

export default function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [customer, setCustomer] = useState<CustomerWithRelations | null>(null)
  const [team, setTeam] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'activities' | 'notes' | 'deals'>('overview')
  const [showActivityModal, setShowActivityModal] = useState(false)
  const [currentTeamMember, setCurrentTeamMember] = useState<TeamMember | null>(null)

  useEffect(() => {
    fetchCustomer()
    fetchTeam()
  }, [id])

  const fetchCustomer = async () => {
    const res = await fetch(`/api/crm/customers/${id}`)
    if (res.ok) {
      const data = await res.json()
      setCustomer(data)
    }
    setIsLoading(false)
  }

  const fetchTeam = async () => {
    const res = await fetch('/api/crm/team')
    const data = await res.json()
    setTeam(data)
    if (data.length > 0) setCurrentTeamMember(data[0])
  }

  const handleLogActivity = async (data: {
    type: ActivityType
    title: string
    description?: string
    duration?: number
  }) => {
    if (!currentTeamMember) return

    await fetch('/api/crm/activities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        customerId: id,
        performedById: currentTeamMember.id,
      }),
    })
    fetchCustomer()
  }

  const handleToggleTask = async (taskId: string, completed: boolean) => {
    await fetch(`/api/crm/tasks/${taskId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: completed ? 'COMPLETED' : 'TODO' }),
    })
    fetchCustomer()
  }

  const handleDelete = async () => {
    if (!confirm('Weet je zeker dat je deze klant wilt verwijderen?')) return
    const res = await fetch(`/api/crm/customers/${id}`, { method: 'DELETE' })
    if (res.ok) {
      router.push('/admin/crm/klanten')
    }
  }

  if (isLoading) {
    return <div className="text-center py-12 text-gray-500">Laden...</div>
  }

  if (!customer) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Klant niet gevonden</h2>
        <Link href="/admin/crm/klanten" className="text-brandGreen hover:underline">
          Terug naar klanten
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <Link
            href="/admin/crm/klanten"
            className="mt-1 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-gray-900">{customer.companyName}</h1>
              <StatusBadge type="customer" value={customer.status} size="md" />
            </div>
            <p className="text-gray-500">
              {customer.kvkNumber && `KVK: ${customer.kvkNumber} • `}
              {customer.industry || 'Geen branche'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/admin/crm/klanten/${id}/bewerken`}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Edit2 className="w-4 h-4" />
            Bewerken
          </Link>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
            Verwijderen
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Info */}
        <div className="space-y-6">
          {/* Contact info */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Contactgegevens</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="font-medium">{customer.contactName}</p>
                  {customer.contactRole && (
                    <p className="text-sm text-gray-500">{customer.contactRole}</p>
                  )}
                </div>
              </div>
              <a
                href={`mailto:${customer.contactEmail}`}
                className="flex items-center gap-3 text-brandGreen hover:underline"
              >
                <Mail className="w-4 h-4 text-gray-400" />
                {customer.contactEmail}
              </a>
              {customer.contactPhone && (
                <a
                  href={`tel:${customer.contactPhone}`}
                  className="flex items-center gap-3 text-brandGreen hover:underline"
                >
                  <Phone className="w-4 h-4 text-gray-400" />
                  {customer.contactPhone}
                </a>
              )}
              {customer.website && (
                <a
                  href={customer.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-brandGreen hover:underline"
                >
                  <Globe className="w-4 h-4 text-gray-400" />
                  {customer.website.replace(/^https?:\/\//, '')}
                </a>
              )}
              {(customer.address || customer.city) && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div className="text-sm text-gray-600">
                    {customer.address && <p>{customer.address}</p>}
                    {(customer.postalCode || customer.city) && (
                      <p>{[customer.postalCode, customer.city].filter(Boolean).join(' ')}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Price agreement */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Prijsafspraken</h3>
            <div className="space-y-3 text-sm">
              {customer.hourlyRate && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Uurtarief</span>
                  <span className="font-medium">€{Number(customer.hourlyRate).toFixed(2)}</span>
                </div>
              )}
              {customer.monthlyBudget && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Maandbudget</span>
                  <span className="font-medium">€{Number(customer.monthlyBudget).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">Betalingstermijn</span>
                <span className="font-medium">{customer.paymentTerms} dagen</span>
              </div>
              {customer.priceAgreement && (
                <div className="pt-2 border-t">
                  <p className="text-gray-500 mb-1">Notities</p>
                  <p className="text-gray-700">{customer.priceAgreement}</p>
                </div>
              )}
            </div>
          </div>

          {/* Assigned */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Toewijzing</h3>
            {customer.assignedTo ? (
              <TeamMemberBadge
                name={customer.assignedTo.name}
                avatar={customer.assignedTo.avatar}
                color={customer.assignedTo.color}
              />
            ) : (
              <p className="text-sm text-gray-500">Niet toegewezen</p>
            )}
            {customer.nextFollowUp && (
              <div className="mt-4 flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-500">Follow-up:</span>
                <span className="font-medium">
                  {format(new Date(customer.nextFollowUp), 'd MMMM yyyy', { locale: nl })}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right column - Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowActivityModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-brandGreen text-white rounded-lg hover:bg-brandGreen/90"
              >
                <Plus className="w-4 h-4" />
                Log activiteit
              </button>
              <Link
                href={`/admin/crm/taken/nieuw?customerId=${id}`}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Plus className="w-4 h-4" />
                Nieuwe taak
              </Link>
              <Link
                href={`/admin/crm/deals/nieuw?customerId=${id}`}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Plus className="w-4 h-4" />
                Nieuwe deal
              </Link>
            </div>
          </div>

          {/* Deals */}
          {customer.deals.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Deals ({customer.deals.length})</h3>
              <div className="grid gap-3">
                {customer.deals.map((deal) => (
                  <DealCard key={deal.id} deal={deal} />
                ))}
              </div>
            </div>
          )}

          {/* Tasks */}
          {customer.tasks.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">
                Openstaande taken ({customer.tasks.length})
              </h3>
              <div className="space-y-3">
                {customer.tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggleComplete={handleToggleTask}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Activities */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Activiteiten</h3>
            <ActivityTimeline activities={customer.activities} />
          </div>

          {/* Quiz Results */}
          {customer.quizResults && customer.quizResults.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 text-brandGreen" />
                Quiz Resultaten ({customer.quizResults.length})
              </h3>
              <div className="space-y-3">
                {customer.quizResults.map((quiz: {
                  id: string
                  totalScore: number
                  profileId: string
                  organizationSize: string | null
                  volunteerCount: number | null
                  createdAt: Date
                }) => (
                  <div key={quiz.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-brandGreen rounded-full"
                            style={{ width: `${quiz.totalScore}%` }}
                          />
                        </div>
                        <span className="font-semibold text-navy">{quiz.totalScore}%</span>
                      </div>
                      <Badge
                        className="capitalize"
                        style={{
                          backgroundColor: quiz.profileId === 'kampioen' ? '#10B98115' :
                            quiz.profileId === 'gevorderd' ? '#3B82F615' :
                            quiz.profileId === 'groei' ? '#F59E0B15' : '#EF444415',
                          color: quiz.profileId === 'kampioen' ? '#10B981' :
                            quiz.profileId === 'gevorderd' ? '#3B82F6' :
                            quiz.profileId === 'groei' ? '#F59E0B' : '#EF4444',
                        }}
                      >
                        {quiz.profileId}
                      </Badge>
                      {quiz.volunteerCount && (
                        <span className="text-sm text-gray-500">
                          {quiz.volunteerCount} vrijwilligers
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-400">
                        {format(new Date(quiz.createdAt), 'd MMM yyyy', { locale: nl })}
                      </span>
                      <Link
                        href={`/quiz/resultaat/${quiz.id}`}
                        target="_blank"
                        className="text-brandGreen hover:underline"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bookings */}
          {customer.bookings && customer.bookings.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                Afspraken ({customer.bookings.length})
              </h3>
              <div className="space-y-3">
                {customer.bookings.map((booking: {
                  id: string
                  startTime: Date
                  endTime: Date
                  status: string
                  meetingLink: string | null
                  bookingType: { name: string; duration: number; color: string | null }
                }) => {
                  const isPast = new Date(booking.startTime) < new Date()
                  return (
                    <div
                      key={booking.id}
                      className={`flex items-center justify-between p-3 bg-gray-50 rounded-lg ${isPast ? 'opacity-60' : ''}`}
                    >
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-medium text-navy">
                            {format(new Date(booking.startTime), 'EEE d MMM yyyy', { locale: nl })}
                          </p>
                          <p className="text-sm text-gray-500">
                            {format(new Date(booking.startTime), 'HH:mm')} - {format(new Date(booking.endTime), 'HH:mm')}
                          </p>
                        </div>
                        <Badge
                          style={{
                            backgroundColor: booking.bookingType.color ? `${booking.bookingType.color}15` : undefined,
                            color: booking.bookingType.color || undefined,
                          }}
                        >
                          {booking.bookingType.name}
                        </Badge>
                        <Badge
                          variant={
                            booking.status === 'CONFIRMED' ? 'success' :
                            booking.status === 'PENDING' ? 'warning' :
                            booking.status === 'CANCELLED' ? 'danger' : 'default'
                          }
                        >
                          {booking.status === 'CONFIRMED' ? 'Bevestigd' :
                           booking.status === 'PENDING' ? 'In afwachting' :
                           booking.status === 'CANCELLED' ? 'Geannuleerd' :
                           booking.status === 'COMPLETED' ? 'Voltooid' : booking.status}
                        </Badge>
                      </div>
                      {booking.meetingLink && (
                        <a
                          href={booking.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-brandGreen hover:underline flex items-center gap-1"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Meeting
                        </a>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Notes */}
          {customer.notes.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Notities</h3>
              <div className="space-y-4">
                {customer.notes.map((note) => (
                  <div
                    key={note.id}
                    className={`p-4 rounded-lg ${note.isPinned ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'}`}
                  >
                    <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
                    <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
                      <TeamMemberBadge
                        name={note.author.name}
                        avatar={note.author.avatar}
                        size="sm"
                      />
                      <span>
                        {format(new Date(note.createdAt), 'd MMM yyyy HH:mm', { locale: nl })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Activity modal */}
      <QuickActivityModal
        isOpen={showActivityModal}
        onClose={() => setShowActivityModal(false)}
        onSubmit={handleLogActivity}
        customerId={id}
        customerName={customer.companyName}
      />
    </div>
  )
}
