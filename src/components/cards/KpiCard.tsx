import { TrendingUp, TrendingDown } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

interface KpiCardProps {
  title: string
  value: string | number
  unit?: string
  delta?: number
  deltaLabel?: string
  icon: LucideIcon
  accentColor: string
  sub?: string
}

export default function KpiCard({
  title, value, unit, delta, deltaLabel, icon: Icon, accentColor, sub,
}: KpiCardProps) {
  const isPositive = (delta ?? 0) >= 0

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${accentColor}22` }}
        >
          <Icon size={20} style={{ color: accentColor }} />
        </div>
        {delta !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
            isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
          }`}>
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {Math.abs(delta)}%
          </div>
        )}
      </div>

      <div>
        <p className="text-xs text-gray-400 font-medium">{title}</p>
        <div className="flex items-end gap-1 mt-1">
          <span className="text-2xl font-bold text-gray-800">{value}</span>
          {unit && <span className="text-sm text-gray-400 mb-0.5">{unit}</span>}
        </div>
        {(sub || deltaLabel) && (
          <p className="text-xs text-gray-400 mt-1">{deltaLabel ?? sub}</p>
        )}
      </div>

      {/* Bottom accent bar */}
      <div className="h-1 rounded-full" style={{ backgroundColor: `${accentColor}33` }}>
        <div className="h-1 rounded-full w-3/4" style={{ backgroundColor: accentColor }} />
      </div>
    </div>
  )
}
