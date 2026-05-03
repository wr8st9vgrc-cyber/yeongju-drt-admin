// 시간대별 수요 (inbound: 역→관광지, outbound: 관광지→역)
export const hourlyDemandData = [
  { hour: '06시', 영주역: 5,  풍기역: 3,  outbound: 2  },
  { hour: '07시', 영주역: 18, 풍기역: 10, outbound: 5  },
  { hour: '08시', 영주역: 35, 풍기역: 20, outbound: 8  },
  { hour: '09시', 영주역: 52, 풍기역: 35, outbound: 12 },
  { hour: '10시', 영주역: 68, 풍기역: 48, outbound: 18 },
  { hour: '11시', 영주역: 75, 풍기역: 55, outbound: 22 },
  { hour: '12시', 영주역: 62, 풍기역: 45, outbound: 35 },
  { hour: '13시', 영주역: 48, 풍기역: 38, outbound: 52 },
  { hour: '14시', 영주역: 32, 풍기역: 25, outbound: 68 },
  { hour: '15시', 영주역: 22, 풍기역: 16, outbound: 82 },
  { hour: '16시', 영주역: 15, 풍기역: 10, outbound: 78 },
  { hour: '17시', 영주역: 10, 풍기역: 6,  outbound: 65 },
  { hour: '18시', 영주역: 8,  풍기역: 4,  outbound: 48 },
  { hour: '19시', 영주역: 5,  풍기역: 3,  outbound: 30 },
  { hour: '20시', 영주역: 3,  풍기역: 2,  outbound: 18 },
  { hour: '21시', 영주역: 2,  풍기역: 1,  outbound: 10 },
]

// 요일별 수요
export const weeklyDemandData = [
  { day: '월', 영주역: 85,  풍기역: 42 },
  { day: '화', 영주역: 82,  풍기역: 40 },
  { day: '수', 영주역: 88,  풍기역: 43 },
  { day: '목', 영주역: 86,  풍기역: 41 },
  { day: '금', 영주역: 92,  풍기역: 48 },
  { day: '토', 영주역: 128, 풍기역: 58 },
  { day: '일', 영주역: 118, 풍기역: 55 },
]

// 월별 수요 (실측 vs 예측)
export const monthlyDemandData = [
  { month: '1월',  실측: 820,  예측: 850  },
  { month: '2월',  실측: 960,  예측: 940  },
  { month: '3월',  실측: 1250, 예측: 1200 },
  { month: '4월',  실측: 1680, 예측: 1700 },
  { month: '5월',  실측: 2350, 예측: 2300 },
  { month: '6월',  실측: 1890, 예측: 1850 },
  { month: '7월',  실측: 1650, 예측: 1680 },
  { month: '8월',  실측: 1720, 예측: 1750 },
  { month: '9월',  실측: 2180, 예측: 2200 },
  { month: '10월', 실측: 2520, 예측: 2480 },
  { month: '11월', 실측: 2200, 예측: 2250 },
  { month: '12월', 실측: 980,  예측: 1000 },
]

// 권역 × 시간대 히트맵 (수요 강도 0~100)
export const regionHeatmapData = {
  regions: ['북부권', '시내권', '남부권'],
  hours: ['06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21'],
  values: [
    // 북부권 (소수서원 / 부석사): 전체 수요의 50~60%
    [8, 22, 45, 72, 88, 95, 78, 62, 42, 32, 25, 18, 12, 8, 5, 3],
    // 시내권 (영주 시내): 중간 허브 역할
    [5, 15, 30, 48, 58, 62, 55, 50, 48, 45, 42, 38, 35, 28, 18, 10],
    // 남부권 (무섬마을): 보조 수요
    [3, 8, 18, 28, 35, 38, 32, 28, 22, 18, 14, 10, 8, 5, 3, 2],
  ],
}

// 예약 현황
export type ReservationStatus = '완료' | '운행중' | '예약' | '대기' | '취소'

export interface Reservation {
  id: string
  date: string
  time: string
  departure: string
  destination: string
  passengers: number
  status: ReservationStatus
}

export const reservationData: Reservation[] = [
  { id: 'R240001', date: '2024-05-03', time: '09:20', departure: '영주역', destination: '소수서원', passengers: 3, status: '완료' },
  { id: 'R240002', date: '2024-05-03', time: '10:05', departure: '영주역', destination: '부석사',   passengers: 2, status: '완료' },
  { id: 'R240003', date: '2024-05-03', time: '10:30', departure: '풍기역', destination: '소수서원', passengers: 4, status: '완료' },
  { id: 'R240004', date: '2024-05-03', time: '11:15', departure: '영주역', destination: '무섬마을', passengers: 2, status: '운행중' },
  { id: 'R240005', date: '2024-05-03', time: '11:40', departure: '풍기역', destination: '부석사',   passengers: 3, status: '운행중' },
  { id: 'R240006', date: '2024-05-03', time: '13:00', departure: '영주역', destination: '소수서원', passengers: 2, status: '예약' },
  { id: 'R240007', date: '2024-05-03', time: '13:30', departure: '풍기역', destination: '무섬마을', passengers: 1, status: '예약' },
  { id: 'R240008', date: '2024-05-03', time: '14:00', departure: '영주역', destination: '부석사',   passengers: 4, status: '예약' },
  { id: 'R240009', date: '2024-05-03', time: '14:30', departure: '풍기역', destination: '소수서원', passengers: 2, status: '대기' },
  { id: 'R240010', date: '2024-05-03', time: '15:00', departure: '영주역', destination: '무섬마을', passengers: 3, status: '대기' },
  { id: 'R240011', date: '2024-05-02', time: '08:45', departure: '영주역', destination: '소수서원', passengers: 2, status: '완료' },
  { id: 'R240012', date: '2024-05-02', time: '09:10', departure: '풍기역', destination: '부석사',   passengers: 4, status: '완료' },
  { id: 'R240013', date: '2024-05-02', time: '10:20', departure: '영주역', destination: '부석사',   passengers: 3, status: '완료' },
  { id: 'R240014', date: '2024-05-02', time: '11:00', departure: '풍기역', destination: '무섬마을', passengers: 2, status: '완료' },
  { id: 'R240015', date: '2024-05-02', time: '15:30', departure: '영주역', destination: '소수서원', passengers: 2, status: '취소' },
  { id: 'R240016', date: '2024-05-01', time: '09:00', departure: '영주역', destination: '부석사',   passengers: 5, status: '완료' },
  { id: 'R240017', date: '2024-05-01', time: '10:15', departure: '풍기역', destination: '소수서원', passengers: 3, status: '완료' },
  { id: 'R240018', date: '2024-05-01', time: '11:30', departure: '영주역', destination: '무섬마을', passengers: 2, status: '완료' },
  { id: 'R240019', date: '2024-05-01', time: '14:00', departure: '풍기역', destination: '부석사',   passengers: 4, status: '완료' },
  { id: 'R240020', date: '2024-05-01', time: '16:00', departure: '영주역', destination: '소수서원', passengers: 1, status: '취소' },
]

// KPI 요약
export const kpiData = {
  todayRides: 247,
  todayRidesDelta: 12.5,
  occupancyRate: 82.3,
  occupancyDelta: 3.2,
  activeVehicles: 8,
  totalVehicles: 12,
  monthlyTotal: 2350,
  monthlyDelta: 8.7,
}
