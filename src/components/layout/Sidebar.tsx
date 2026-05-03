import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  BarChart2,
  ClipboardList,
  Settings,
  Bus,
} from 'lucide-react'

const navItems = [
  { to: '/',             icon: LayoutDashboard, label: '개요' },
  { to: '/demand',       icon: BarChart2,       label: '수요 분석' },
  { to: '/reservations', icon: ClipboardList,   label: '예약 현황' },
  { to: '/settings',     icon: Settings,        label: '운영 설정' },
]

export default function Sidebar() {
  return (
    <aside className="w-60 flex-shrink-0 flex flex-col h-full"
      style={{ background: 'linear-gradient(160deg, #35C8B4 0%, #2aaa99 100%)' }}>

      {/* Brand */}
      <div className="px-6 py-6 border-b border-white/20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <Bus size={18} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">영주 관광 DRT</p>
            <p className="text-white/60 text-xs">관리자 대시보드</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className="text-white/40 text-xs font-medium px-3 mb-2 tracking-wider uppercase">Menu</p>
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-white text-menthe shadow-sm'
                  : 'text-white/80 hover:bg-white/15 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={18} className={isActive ? 'text-menthe' : 'text-white/70'} />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom info */}
      <div className="px-5 py-5 border-t border-white/20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">
            관
          </div>
          <div>
            <p className="text-white text-xs font-semibold">관리자</p>
            <p className="text-white/50 text-xs">영주시청 교통과</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
