import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell,
} from 'recharts'
import { weeklyDemandData } from '../../data/mockData'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  const isWeekend = label === '토' || label === '일'
  return (
    <div className="bg-white rounded-xl shadow-lg p-3 border border-gray-100 text-xs">
      <p className="font-semibold text-gray-700 mb-2">
        {label}요일 {isWeekend && <span className="text-orange-400">(주말)</span>}
      </p>
      {payload.map((entry: any, i: number) => (
        <p key={i} style={{ color: entry.color }} className="mb-0.5">
          {entry.name}: <span className="font-bold">{entry.value}명</span>
        </p>
      ))}
    </div>
  )
}

export default function WeeklyPatternChart() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
      <div className="mb-4">
        <h3 className="text-sm font-bold text-gray-800">요일별 수요 패턴</h3>
        <p className="text-xs text-gray-400 mt-0.5">주말 급증: 영주역 +39% / 풍기역 +18%</p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={weeklyDemandData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="영주역" name="영주역" fill="#35C8B4" radius={[4, 4, 0, 0]} maxBarSize={20}>
            {weeklyDemandData.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.day === '토' || entry.day === '일' ? '#2aaa99' : '#35C8B4'}
              />
            ))}
          </Bar>
          <Bar dataKey="풍기역" name="풍기역" fill="#A4CF4A" radius={[4, 4, 0, 0]} maxBarSize={20}>
            {weeklyDemandData.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.day === '토' || entry.day === '일' ? '#8ab83a' : '#A4CF4A'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
