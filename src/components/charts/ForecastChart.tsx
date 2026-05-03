import { useEffect, useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine,
} from 'recharts'
import { fetchForecast, ForecastBySpot } from '../../services/tatsCnctrRate'

// ─── 색상 ──────────────────────────────────────────────
const SPOT_COLORS: Record<string, string> = {
  소수서원: '#35C8B4',
  부석사:   '#A4CF4A',
  무섬마을: '#f97316',
}

// ─── 유틸 ──────────────────────────────────────────────
function formatDate(ymd: string): string {
  // YYYYMMDD → M/D
  const m = ymd.slice(4, 6).replace(/^0/, '')
  const d = ymd.slice(6, 8).replace(/^0/, '')
  return `${m}/${d}`
}

// ─── Tooltip ───────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white rounded-xl shadow-lg p-3 border border-gray-100 text-xs min-w-[140px]">
      <p className="font-semibold text-gray-700 mb-2">{label}</p>
      {payload.map((entry: any) => (
        <div key={entry.dataKey} className="flex items-center justify-between gap-4 mb-0.5">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-gray-600">{entry.dataKey}</span>
          </div>
          <span className="font-bold" style={{ color: entry.color }}>
            {entry.value != null ? `${Number(entry.value).toFixed(1)}` : '-'}
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── 요약 카드 ─────────────────────────────────────────
function SpotSummaryCard({
  name, data, color,
}: {
  name: string
  data: { cnctrRate: number }[]
  color: string
}) {
  if (!data.length) return null
  const today    = data[0].cnctrRate
  const peak     = Math.max(...data.map((d) => d.cnctrRate))
  const peakIdx  = data.findIndex((d) => d.cnctrRate === peak)

  return (
    <div className="bg-gray-50 rounded-xl p-3 flex-1">
      <div className="flex items-center gap-1.5 mb-2">
        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
        <span className="text-xs font-bold text-gray-700">{name}</span>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">오늘 집중률</span>
          <span className="font-semibold" style={{ color }}>{today.toFixed(1)}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">30일 최대</span>
          <span className="font-semibold text-gray-700">{peak.toFixed(1)}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">피크 시점</span>
          <span className="font-semibold text-gray-700">+{peakIdx + 1}일 후</span>
        </div>
      </div>
      {/* 미니 바 */}
      <div className="mt-2 h-1.5 bg-gray-200 rounded-full">
        <div
          className="h-1.5 rounded-full"
          style={{ width: `${today}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

// ─── 로딩/대기 상태 ────────────────────────────────────
function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-3">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full animate-bounce"
            style={{
              backgroundColor: '#35C8B4',
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
      <p className="text-sm text-gray-400">데이터를 불러오는 중입니다</p>
    </div>
  )
}

// ─── 메인 컴포넌트 ─────────────────────────────────────
export default function ForecastChart() {
  const [data,   setData]   = useState<ForecastBySpot | null>(null)
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

  useEffect(() => {
    let cancelled = false

    fetchForecast()
      .then((result) => {
        if (!cancelled) {
          setData(result)
          setStatus('success')
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => { cancelled = true }
  }, [])

  // 로딩 중이거나 에러: "데이터를 불러오는 중입니다"
  if (status !== 'success' || !data) {
    return (
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-sm font-bold text-gray-800">향후 30일 관광 수요 예측</h3>
            <p className="text-xs text-gray-400 mt-0.5">한국관광공사 관광지 집중률 · 경상북도 영주시</p>
          </div>
        </div>
        <LoadingState />
      </div>
    )
  }

  // 차트용 데이터 병합 (날짜 기준 join)
  const allDates = [
    ...new Set(
      Object.values(data)
        .flat()
        .map((d) => d.baseYmd),
    ),
  ].sort()

  const chartData = allDates.map((ymd) => {
    const row: Record<string, string | number | null> = { date: formatDate(ymd) }
    for (const [name, items] of Object.entries(data)) {
      const found = items.find((i) => i.baseYmd === ymd)
      row[name] = found ? found.cnctrRate : null
    }
    return row
  })

  // 집중률 70 이상: 혼잡 경고선
  const maxRate = Math.max(
    ...Object.values(data).flat().map((d) => d.cnctrRate),
  )

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
      {/* 헤더 */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-gray-800">향후 30일 관광 수요 예측</h3>
          <p className="text-xs text-gray-400 mt-0.5">
            한국관광공사 관광지 집중률 · 경상북도 영주시 · 기준일:{' '}
            {allDates[0]
              ? `${allDates[0].slice(0, 4)}.${allDates[0].slice(4, 6)}.${allDates[0].slice(6, 8)}`
              : '-'}
          </p>
        </div>
        <span className="text-xs bg-menthe/10 text-menthe font-semibold px-2.5 py-1 rounded-full">
          실시간 API
        </span>
      </div>

      {/* 요약 카드 */}
      <div className="flex gap-3 mb-4">
        {Object.entries(data).map(([name, items]) => (
          <SpotSummaryCard
            key={name}
            name={name}
            data={items}
            color={SPOT_COLORS[name]}
          />
        ))}
      </div>

      {/* 라인 차트 */}
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={chartData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
            interval={4}
          />
          <YAxis
            domain={[0, Math.max(100, Math.ceil(maxRate / 10) * 10)]}
            tick={{ fontSize: 10, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />

          {/* 혼잡 경고선 (집중률 70 기준) */}
          <ReferenceLine
            y={70}
            stroke="#f97316"
            strokeDasharray="4 3"
            strokeWidth={1.5}
            label={{ value: '혼잡', position: 'right', fontSize: 10, fill: '#f97316' }}
          />

          {Object.keys(data).map((name) => (
            <Line
              key={name}
              type="monotone"
              dataKey={name}
              stroke={SPOT_COLORS[name]}
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4 }}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      {/* 범례 설명 */}
      <p className="text-xs text-gray-300 mt-2 text-right">
        집중률: 가장 붐비는 시기=100 기준 상대 수치 · 출처: 한국관광공사 데이터랩
      </p>
    </div>
  )
}
