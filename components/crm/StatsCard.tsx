'use client'

import {
  Building2,
  TrendingUp,
  CheckSquare,
  Euro,
  Calendar,
  Users,
  Activity,
  Target,
  Clock,
  AlertTriangle,
} from 'lucide-react'

const icons = {
  Building2,
  TrendingUp,
  CheckSquare,
  Euro,
  Calendar,
  Users,
  Activity,
  Target,
  Clock,
  AlertTriangle,
}

type IconName = keyof typeof icons

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: IconName
  trend?: {
    value: number
    isPositive: boolean
  }
  color?: 'green' | 'blue' | 'purple' | 'yellow' | 'red'
}

const colorClasses = {
  green: 'bg-green-100 text-green-600',
  blue: 'bg-blue-100 text-blue-600',
  purple: 'bg-purple-100 text-purple-600',
  yellow: 'bg-yellow-100 text-yellow-600',
  red: 'bg-red-100 text-red-600',
}

export function StatsCard({ title, value, subtitle, icon, trend, color = 'green' }: StatsCardProps) {
  const Icon = icons[icon]

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
          {trend && (
            <p className={`text-xs mt-1 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? '+' : ''}{trend.value}% vs vorige maand
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  )
}
