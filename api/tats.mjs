// Vercel Serverless Function — 한국관광공사 OpenAPI 프록시 (관리자 대시보드)
//  - CORS 회피
//  - serviceKey를 서버에서 주입 (브라우저 번들에 키가 남지 않음)
//  - 응답 CDN 캐싱으로 쿼터 절약
//
// 호출 예: /api/tats?service=TatsCnctrRateService&operation=tatsCnctrRatedList&areaCd=47&signguCd=47210

const ALLOWED = {
  TatsCnctrRateService: ['tatsCnctrRatedList'],
  KorService2: ['searchKeyword2', 'detailCommon2'],
};

export default async function handler(req, res) {
  const { service, operation, ...rest } = req.query;

  if (!ALLOWED[service] || !ALLOWED[service].includes(operation)) {
    return res.status(400).json({ error: `invalid service/operation: ${service}/${operation}` });
  }

  const serviceKey = process.env.TOUR_API_KEY;
  if (!serviceKey) {
    return res.status(500).json({ error: 'TOUR_API_KEY is not configured' });
  }

  const params = new URLSearchParams({
    ...rest,
    serviceKey,
    MobileOS: 'ETC',
    MobileApp: 'DRTAdmin',
    _type: 'json',
  });

  const url = `https://apis.data.go.kr/B551011/${service}/${operation}?${params}`;

  try {
    const upstream = await fetch(url, { headers: { Accept: 'application/json' } });
    const text = await upstream.text();

    if (!upstream.ok) {
      return res
        .status(upstream.status)
        .json({ error: `upstream ${upstream.status}`, body: text.slice(0, 500) });
    }

    let json;
    try {
      json = JSON.parse(text);
    } catch {
      return res
        .status(502)
        .json({ error: 'upstream returned non-JSON', body: text.slice(0, 500) });
    }

    // 집중률 예측은 일 단위 갱신 → 6시간 캐시
    res.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate=86400');
    return res.status(200).json(json);
  } catch (e) {
    return res.status(502).json({ error: e.message });
  }
}
