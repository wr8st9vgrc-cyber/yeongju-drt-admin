import { regionHeatmapData } from '../../data/mockData'

function getColor(value: number): string {
  if (value < 15) return '#EDF7BE'
  if (value < 35) return '#C2F2E4'
  if (value < 55) return '#A4CF4A'
  if (value < 75) return '#35C8B4'
  return '#2aaa99'
}

function getTextColor(value: number): string {
  return value >= 55 ? '#ffffff' : '#374151'
}

const regionLabels: Record<string, string> = {
  '북부권': '북부권\n(소수서원·부석사)',
  '시내권': '시내권\n(영주·풍기)',
  '남부권': '남부권\n(무섬마을)',
}

export default function RegionHeatmap() {
  const { regions, hours, values } = regionHeatmapData

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
      <div className="mb-4">
        <h3 className="text-sm font-bold text-gray-800">권역 × 시간대 수요 히트맵</h3>
        <p className="text-xs text-gray-400 mt-0.5">색이 짙을수록 수요 집중</p>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-max">
          {/* Hour labels */}
          <div className="flex mb-1 ml-28">
            {hours.map((h) => (
              <div key={h} className="w-9 text-center text-xs text-gray-400">{h}</div>
            ))}
          </div>

          {/* Rows */}
          {regions.map((region, ri) => (
            <div key={region} className="flex items-center mb-1">
              <div className="w-28 text-xs text-gray-600 font-medium pr-2 leading-tight whitespace-pre-line">
                {regionLabels[region] ?? region}
              </div>
              {hours.map((h, hi) => {
                const val = values[ri][hi]
                return (
                  <div
                    key={h}
                    className="w-9 h-8 rounded flex items-center justify-center text-xs font-semibold mx-px transition-all duration-150 hover:scale-110 cursor-default"
                    style={{
                      backgroundColor: getColor(val),
                      color: getTextColor(val),
                    }}
                    title={`${region} ${h}시: ${val}명`}
                  >
                    {val}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-4">
        <span className="text-xs text-gray-400">낮음</span>
        {['#EDF7BE', '#C2F2E4', '#A4CF4A', '#35C8B4', '#2aaa99'].map((c) => (
          <div key={c} className="w-6 h-3 rounded" style={{ backgroundColor: c }} />
        ))}
        <span className="text-xs text-gray-400">높음</span>
      </div>
    </div>
  )
}
