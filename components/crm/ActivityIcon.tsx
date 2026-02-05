'use client'

import {
  Phone,
  Mail,
  MailOpen,
  Video,
  Users,
  FileText,
  Send,
  RefreshCw,
  TrendingUp,
  MessageSquare,
  Linkedin,
  Clock,
} from 'lucide-react'
import { ActivityType } from '@prisma/client'

const activityConfig: Record<ActivityType, { icon: typeof Phone; color: string; label: string }> = {
  CALL: { icon: Phone, color: 'text-green-600 bg-green-100', label: 'Gesprek' },
  EMAIL_SENT: { icon: Send, color: 'text-blue-600 bg-blue-100', label: 'Email verstuurd' },
  EMAIL_RECEIVED: { icon: MailOpen, color: 'text-blue-600 bg-blue-100', label: 'Email ontvangen' },
  MEETING: { icon: Users, color: 'text-purple-600 bg-purple-100', label: 'Meeting' },
  VIDEO_CALL: { icon: Video, color: 'text-indigo-600 bg-indigo-100', label: 'Video call' },
  NOTE: { icon: FileText, color: 'text-gray-600 bg-gray-100', label: 'Notitie' },
  DEMO: { icon: Clock, color: 'text-orange-600 bg-orange-100', label: 'Demo' },
  PROPOSAL: { icon: Mail, color: 'text-yellow-600 bg-yellow-100', label: 'Offerte' },
  FOLLOW_UP: { icon: RefreshCw, color: 'text-teal-600 bg-teal-100', label: 'Follow-up' },
  STATUS_CHANGE: { icon: TrendingUp, color: 'text-pink-600 bg-pink-100', label: 'Status' },
  DEAL_UPDATE: { icon: TrendingUp, color: 'text-emerald-600 bg-emerald-100', label: 'Deal' },
  LINKEDIN: { icon: Linkedin, color: 'text-blue-700 bg-blue-100', label: 'LinkedIn' },
  WHATSAPP: { icon: MessageSquare, color: 'text-green-500 bg-green-100', label: 'WhatsApp' },
}

interface ActivityIconProps {
  type: ActivityType
  size?: 'sm' | 'md' | 'lg'
}

export function ActivityIcon({ type, size = 'md' }: ActivityIconProps) {
  const config = activityConfig[type]
  const Icon = config.icon

  const sizeClasses = {
    sm: 'w-6 h-6 p-1',
    md: 'w-8 h-8 p-1.5',
    lg: 'w-10 h-10 p-2',
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  return (
    <div className={`${sizeClasses[size]} rounded-full ${config.color} flex items-center justify-center`}>
      <Icon className={iconSizes[size]} />
    </div>
  )
}

export function getActivityLabel(type: ActivityType): string {
  return activityConfig[type].label
}
