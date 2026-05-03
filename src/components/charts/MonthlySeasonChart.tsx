import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { monthlyDemandData } from '../../data/mockData'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  const isPeak = ['5월', '9월', '10월', '11월'].includes(label)
  return (
    <div className="bg-white rounded-xl shadow-lg p-3 border border-gray-100 text-xs">
      <p className="font-semibold text-gray-700 mb-2">
        {label} {isPeak && <span className="text-menthe">🌿 성수기</span>}
      </p>
      {payload.map((entry: any, i: number) => (
        <p key={i} style={{ color: entry.color }} className="mb-0.5">
          {entry.name}: <span className="font-bold">{entry.value.toLocaleString()}명</span>
        </p>
      ))}
    </div>
  )
}

export default function MonthlySeasonChart() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
      <div className="mb-4">
        <h3 className="text-sm font-bold text-gray-800">월별 시즌 수요</h3>
        <p className="text-xs text-gray-400 mt-0.5">성수기: 5월 / 9~11월 집중</p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={monthlyDemandData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="gradReal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#35C8B4" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#35C8B4" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradPred" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#A4CF4A" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#A4CF4A" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
          <Area
            type="monotone"
            dataKey="실측"
            name="실측 수요"
            stroke="#35C8B4"
            strokeWidth={2.5}
            fill="url(#gradReal)"
          />
          <Area
            type="monotone"
            dataKey="예측"
            name="예측 수요"
            stroke="#A4CF4A"
            strokeWidth={2}
            strokeDasharray="5 3"
            fill="url(#gradPred)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
