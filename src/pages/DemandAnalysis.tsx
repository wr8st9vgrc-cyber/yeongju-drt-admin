import HourlyDemandChart from '../components/charts/HourlyDemandChart'
import WeeklyPatternChart from '../components/charts/WeeklyPatternChart'
import MonthlySeasonChart from '../components/charts/MonthlySeasonChart'
import RegionHeatmap from '../components/charts/RegionHeatmap'

const insights = [
  {
    label: '오전 피크',
    desc: '09~11시 역→관광지 수요 집중 (inbound peak)',
    color: '#35C8B4',
  },
  {
    label: '오후 피크',
    desc: '14~17시 관광지→역 귀환 수요 (outbound peak)',
    color: '#A4CF4A',
  },
  {
    label: '주말 급증',
    desc: '영주역 +39%, 풍기역 +18% — 평일/주말 전략 분리 필요',
    color: '#f97316',
  },
  {
    label: '성수기',
    desc: '5월 · 9~11월 피크 — 집중 운영 전략 가능',
    color: '#2aaa99',
  },
]

export default function DemandAnalysis() {
  return (
    <div className="p-6 space-y-5">
      {/* Insight chips */}
      <div className="grid grid-cols-4 gap-3">
        {insights.map(({ label, desc, color }) => (
          <div key={label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-xs font-bold text-gray-700">{label}</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* Hourly full width */}
      <HourlyDemandChart />

      {/* Heatmap full width */}
      <RegionHeatmap />

      {/* Weekly + Monthly side by side */}
      <div className="grid grid-cols-2 gap-4">
        <WeeklyPatternChart />
        <MonthlySeasonChart />
      </div>

      {/* DRT Model info */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
        <h3 className="text-sm font-bold text-gray-800 mb-3">수요 예측 모델 개요</h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: '수요 예측 공식', value: 'V × (1−C) × K × R', sub: '모달 쉐어 기반' },
            { label: '연간 잠재 수요', value: '3,950,059명', sub: '전체 관광 수요' },
            { label: 'DRT 점유율',     value: '30 ~ 50%',    sub: '시나리오별 추정' },
            { label: '권역 집중도',    value: '북부권 1위',   sub: '소수서원·부석사' },
          ].map(({ label, value, sub }) => (
            <div key={label} className="text-center p-3 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-400 mb-1">{label}</p>
              <p className="text-base font-bold text-gray-800">{value}</p>
              <p className="text-xs text-gray-400">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
