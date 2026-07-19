// 한국관광공사_관광지 집중률 방문자 추이 예측 정보 API
// 공공데이터포털 서비스ID: 15128555
//
// 모든 호출은 /api/tats 서버리스 프록시를 경유한다.
// serviceKey는 서버(Vercel 환경변수 TOUR_API_KEY)에서 주입되므로
// 이 파일에는 인증키가 존재하지 않는다.

// 경상북도(47), 영주시(47210)
const AREA_CD = '47'
const SIGNGU_CD = '47210'

// API에서 반환하는 실제 관광지명 → 대시보드 표시명
export const SPOT_MAP = {
  '소수서원 [유네스코 세계유산]': '소수서원',
  '부석사 [유네스코 세계유산]': '부석사',
  '영주 무섬마을': '무섬마을',
} as const

export type ApiSpotName = keyof typeof SPOT_MAP
export type DisplayName = (typeof SPOT_MAP)[ApiSpotName]

export interface ForecastItem {
  baseYmd: string // YYYYMMDD
  tAtsNm: string // 관광지명(API 원본)
  cnctrRate: number // 집중률 0~100
  areaNm: string
  signguNm: string
}

export interface ForecastBySpot {
  [displayName: string]: ForecastItem[]
}

export class ForecastError extends Error {
  constructor(message: string, readonly status?: number) {
    super(message)
    this.name = 'ForecastError'
  }
}

export async function fetchForecast(): Promise<ForecastBySpot> {
  const params = new URLSearchParams({
    service: 'TatsCnctrRateService',
    operation: 'tatsCnctrRatedList',
    pageNo: '1',
    numOfRows: '1110', // 영주시 전체 관광지 × 30일
    areaCd: AREA_CD,
    signguCd: SIGNGU_CD,
  })

  let res: Response
  try {
    res = await fetch(`/api/tats?${params}`, { headers: { Accept: 'application/json' } })
  } catch (e) {
    throw new ForecastError(
      e instanceof Error ? e.message : '네트워크 오류가 발생했습니다.'
    )
  }

  if (!res.ok) {
    throw new ForecastError(`관광공사 API 응답 오류 (HTTP ${res.status})`, res.status)
  }

  const json = await res.json()
  const raw: Record<string, string>[] = json?.response?.body?.items?.item ?? []

  // 대상 3개 관광지만 필터 & 표시명으로 그룹핑
  const result: ForecastBySpot = {
    소수서원: [],
    부석사: [],
    무섬마을: [],
  }

  for (const row of raw) {
    const apiName = row.tAtsNm as ApiSpotName
    const displayName = SPOT_MAP[apiName]
    if (!displayName) continue

    result[displayName].push({
      baseYmd: row.baseYmd,
      tAtsNm: row.tAtsNm,
      cnctrRate: parseFloat(row.cnctrRate),
      areaNm: row.areaNm,
      signguNm: row.signguNm,
    })
  }

  for (const key of Object.keys(result)) {
    result[key].sort((a, b) => a.baseYmd.localeCompare(b.baseYmd))
  }

  return result
}
