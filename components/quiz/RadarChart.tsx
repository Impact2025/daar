'use client'

import { useEffect, useState } from 'react'
import { QUIZ_DIMENSIONS, DimensionId } from '@/constants/quiz'

interface RadarChartProps {
  scores: Record<DimensionId, number> // Percentages 0-100
  benchmarks?: Record<DimensionId, number>
  size?: number
  showLabels?: boolean
  showBenchmarks?: boolean
  animate?: boolean
  className?: string
}

export function RadarChart({
  scores,
  benchmarks,
  size = 300,
  showLabels = true,
  showBenchmarks = true,
  animate = true,
  className = '',
}: RadarChartProps) {
  const [animatedScores, setAnimatedScores] = useState<Record<DimensionId, number>>(
    Object.keys(scores).reduce((acc, key) => ({ ...acc, [key]: 0 }), {} as Record<DimensionId, number>)
  )

  const dimensions = Object.keys(QUIZ_DIMENSIONS) as DimensionId[]
  const center = size / 2
  const radius = size * 0.35
  const labelRadius = size * 0.48

  // Animate scores on mount
  useEffect(() => {
    if (!animate) {
      setAnimatedScores(scores)
      return
    }

    const duration = 1000
    const startTime = Date.now()
    const startScores = { ...animatedScores }

    const animateFrame = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Easing function (ease-out)
      const eased = 1 - Math.pow(1 - progress, 3)

      const newScores = {} as Record<DimensionId, number>
      dimensions.forEach((dim) => {
        newScores[dim] = startScores[dim] + (scores[dim] - startScores[dim]) * eased
      })

      setAnimatedScores(newScores)

      if (progress < 1) {
        requestAnimationFrame(animateFrame)
      }
    }

    requestAnimationFrame(animateFrame)
  }, [scores, animate])

  // Calculate point position on radar
  const getPoint = (index: number, value: number): { x: number; y: number } => {
    const angle = (Math.PI * 2 * index) / dimensions.length - Math.PI / 2
    const distance = (value / 100) * radius
    return {
      x: center + Math.cos(angle) * distance,
      y: center + Math.sin(angle) * distance,
    }
  }

  // Generate polygon path
  const getPolygonPath = (values: Record<DimensionId, number>): string => {
    return dimensions
      .map((dim, i) => {
        const point = getPoint(i, values[dim])
        return `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
      })
      .join(' ') + ' Z'
  }

  // Generate grid circles
  const gridLevels = [25, 50, 75, 100]

  return (
    <div className={`relative ${className}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Grid circles */}
        {gridLevels.map((level) => (
          <circle
            key={level}
            cx={center}
            cy={center}
            r={(level / 100) * radius}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="1"
            strokeDasharray={level === 100 ? 'none' : '4 4'}
          />
        ))}

        {/* Grid lines (spokes) */}
        {dimensions.map((_, i) => {
          const point = getPoint(i, 100)
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={point.x}
              y2={point.y}
              stroke="#E5E7EB"
              strokeWidth="1"
            />
          )
        })}

        {/* Benchmark polygon (if provided) */}
        {showBenchmarks && benchmarks && (
          <path
            d={getPolygonPath(benchmarks)}
            fill="none"
            stroke="#9CA3AF"
            strokeWidth="2"
            strokeDasharray="6 4"
            opacity="0.6"
          />
        )}

        {/* Score polygon */}
        <path
          d={getPolygonPath(animatedScores)}
          fill="#3BA273"
          fillOpacity="0.2"
          stroke="#3BA273"
          strokeWidth="2.5"
        />

        {/* Score points */}
        {dimensions.map((dim, i) => {
          const point = getPoint(i, animatedScores[dim])
          return (
            <circle
              key={dim}
              cx={point.x}
              cy={point.y}
              r="5"
              fill="#3BA273"
              stroke="white"
              strokeWidth="2"
            />
          )
        })}

        {/* Labels */}
        {showLabels &&
          dimensions.map((dim, i) => {
            const angle = (Math.PI * 2 * i) / dimensions.length - Math.PI / 2
            const x = center + Math.cos(angle) * labelRadius
            const y = center + Math.sin(angle) * labelRadius
            const dimension = QUIZ_DIMENSIONS[dim]

            // Adjust text anchor based on position
            let textAnchor = 'middle'
            if (x < center - 10) textAnchor = 'end'
            else if (x > center + 10) textAnchor = 'start'

            return (
              <g key={dim}>
                <text
                  x={x}
                  y={y - 8}
                  textAnchor={textAnchor}
                  className="fill-navy text-xs font-medium"
                  style={{ fontSize: '11px' }}
                >
                  {dimension.name.split(' ')[0]}
                </text>
                <text
                  x={x}
                  y={y + 6}
                  textAnchor={textAnchor}
                  className="fill-brandGreen text-xs font-semibold"
                  style={{ fontSize: '12px' }}
                >
                  {Math.round(animatedScores[dim])}%
                </text>
              </g>
            )
          })}
      </svg>

      {/* Legend */}
      {showBenchmarks && benchmarks && (
        <div className="flex items-center justify-center gap-6 mt-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-brandGreen rounded" />
            <span className="text-gray-600">Jouw score</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-gray-400 rounded" style={{ opacity: 0.6 }} />
            <span className="text-gray-600">Benchmark</span>
          </div>
        </div>
      )}
    </div>
  )
}
