// 관광공사 TourAPI에서 관광지 확정 좌표를 조회해 출력한다.
// 앱/대시보드 하드코딩 좌표(폴백)를 갱신할 때 1회 실행.
//
//   TOUR_API_KEY=xxxx node scripts/fetch-coords.mjs

const KEY = process.env.TOUR_API_KEY;
if (!KEY) {
  console.error('TOUR_API_KEY 환경변수가 필요합니다.');
  process.exit(1);
}

const SPOTS = {
  sosu: '소수서원',
  buseok: '부석사',
  museom: '무섬마을',
  seonbi: '선비세상',
};

for (const [id, keyword] of Object.entries(SPOTS)) {
  const params = new URLSearchParams({
    serviceKey: KEY,
    numOfRows: '5',
    pageNo: '1',
    MobileOS: 'ETC',
    MobileApp: 'YeongjuDRT',
    _type: 'json',
    keyword,
    areaCode: '37',
    sigunguCode: '7', // 영주시 (응답이 비면 이 줄을 지우고 재실행)
  });

  try {
    const res = await fetch(
      `https://apis.data.go.kr/B551011/KorService2/searchKeyword2?${params}`
    );
    const json = await res.json();
    const items = json?.response?.body?.items?.item ?? [];
    const list = Array.isArray(items) ? items : [items];

    console.log(`\n── ${id} (${keyword}) ─────────────────`);
    if (!list.length) {
      console.log('  결과 없음');
      continue;
    }
    for (const it of list) {
      console.log(
        `  ${it.title}\n    addr: ${it.addr1 ?? '-'}\n    lat: ${it.mapy}, lng: ${it.mapx}\n    contentid: ${it.contentid}`
      );
    }
  } catch (e) {
    console.log(`── ${id}: 실패 — ${e.message}`);
  }
}
