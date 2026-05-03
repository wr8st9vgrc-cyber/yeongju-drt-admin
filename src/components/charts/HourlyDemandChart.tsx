import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { hourlyDemandData } from '../../data/mockData'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white rounded-xl shadow-lg p-3 border border-gray-100 text-xs">
      <p className="font-semibold text-gray-700 mb-2">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} style={{ color: entry.color }} className="mb-0.5">
          {entry.name}: <span className="font-bold">{entry.value}명</span>
        </p>
      ))}
    </div>
  )
}

export default function HourlyDemandChart() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
      <div className="mb-4">
        <h3 className="text-sm font-bold text-gray-800">시간대별 수요 패턴</h3>
        <p className="text-xs text-gray-400 mt-0.5">
          Inbound (역→관광지) · Outbound (관광지→역)
        </p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <ComposedChart data={hourlyDemandData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis dataKey="hour" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="영주역" name="영주역 (inbound)" fill="#35C8B4" radius={[3, 3, 0, 0]} maxBarSize={14} />
          <Bar dataKey="풍기역" name="풍기역 (inbound)" fill="#A4CF4A" radius={[3, 3, 0, 0]} maxBarSize={14} />
          <Line
            type="monotone"
            dataKey="outbound"
            name="관광지→역 (outbound)"
            stroke="#f97316"
            strokeWidth={2.5}
            dot={false}
            strokeDasharray="5 3"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
