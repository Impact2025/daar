'use client'

interface TeamMemberBadgeProps {
  name: string
  avatar?: string | null
  color?: string | null
  size?: 'sm' | 'md' | 'lg'
  showName?: boolean
}

export function TeamMemberBadge({
  name,
  avatar,
  color = '#3BA273',
  size = 'md',
  showName = true,
}: TeamMemberBadgeProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
  }

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="flex items-center gap-2">
      {avatar ? (
        <img
          src={avatar}
          alt={name}
          className={`${sizeClasses[size]} rounded-full object-cover`}
        />
      ) : (
        <div
          className={`${sizeClasses[size]} rounded-full flex items-center justify-center text-white font-medium`}
          style={{ backgroundColor: color || '#3BA273' }}
        >
          {initials}
        </div>
      )}
      {showName && <span className="text-sm text-gray-700">{name}</span>}
    </div>
  )
}
