/* =========================================================
   가상 고객사 광고 소재 일러스트
   build.mjs가 각 페이지에 인라인 SVG로 넣습니다.
   motif()는 100 x 100 박스 안에 그립니다.
   ========================================================= */

const SANS = "'SUIT Variable', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif";
const SERIF = "Georgia, 'Times New Roman', serif";
let uidSeq = 0;

const solid = color => (w, h) => `<rect width="${w}" height="${h}" fill="${color}"/>`;
const vgrad = (top, bottom) => (w, h, u) =>
  `<defs><linearGradient id="${u}bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#${u}bg)"/>`;

export const BRANDS = {
  daymist: {
    ko: '데이미스트', handle: 'daymist.official', avatar: ['#7B6CF0', '#fff'],
    word: { text: 'daymist', family: SANS, weight: 600, spacing: 0 },
    head: ['오후 3시,', '피부에 쉬는 시간'], cta: '지금 구매하기',
    fg: '#2D2466', ctaBg: '#2D2466', ctaFg: '#FFFFFF',
    post: '건조한 오후, 책상 위에서 한 번. 사무실에 두는 수분 미스트',
    bg: vgrad('#F1EBFF', '#D5E5FF'),
    motif: () => `
      <circle cx="50" cy="56" r="40" fill="#FFFFFF" opacity=".42"/>
      <g fill="#FFFFFF">
        <circle cx="31" cy="20" r="2.2" opacity=".9"/><circle cx="25" cy="14" r="1.6" opacity=".8"/>
        <circle cx="36" cy="12" r="1.2" opacity=".75"/><circle cx="20" cy="24" r="1.3" opacity=".7"/>
        <circle cx="27" cy="7" r="1" opacity=".6"/><circle cx="15" cy="16" r="1" opacity=".6"/>
        <circle cx="33" cy="26" r="1.5" opacity=".85"/><circle cx="22" cy="31" r=".9" opacity=".6"/>
        <circle cx="39" cy="18" r="1" opacity=".7"/>
      </g>
      <rect x="46" y="11" width="8" height="8" rx="1.6" fill="#6C5CE7"/>
      <rect x="42" y="18" width="16" height="13" rx="3" fill="#6C5CE7"/>
      <rect x="37" y="30" width="26" height="62" rx="9" fill="#FFFFFF"/>
      <rect x="41" y="50" width="18" height="26" rx="2.5" fill="#E9E2FF"/>
      <text x="50" y="65" text-anchor="middle" font-family="${SANS}" font-size="4.6" font-weight="700" fill="#4B3FB0">daymist</text>
      <rect x="58" y="36" width="2.2" height="48" rx="1.1" fill="#F3EFFF"/>`
  },
  greencrumb: {
    ko: '그린크럼', handle: 'greencrumb.bakery', avatar: ['#2E6B3F', '#FFF7E8'],
    word: { text: 'green crumb', family: SANS, weight: 800, spacing: -0.02 },
    head: ['버터 없이', '바삭한 아침'], cta: '매장 찾기',
    fg: '#FFF7E8', ctaBg: '#FFF7E8', ctaFg: '#2E6B3F',
    post: '오늘 아침 7시에 구운 크루아상, 11시 전에 다 나갔어요.',
    bg: solid('#2E6B3F'),
    motif: () => `
      <circle cx="50" cy="54" r="42" fill="#3B7F4C"/>
      <g transform="rotate(-10 50 56)">
        <path d="M12 66 C 14 42, 34 28, 50 28 C 66 28, 86 42, 88 66 C 84 60, 76 57, 70 59 C 66 50, 58 46, 50 46 C 42 46, 34 50, 30 59 C 24 57, 16 60, 12 66 Z" fill="#F2C98B"/>
        <path d="M30 59 C 28 52, 26 46, 22 41 M40 50 C 39 43, 38 37, 37 31 M50 46 V 28.5 M60 50 C 61 43, 62 37, 63 31 M70 59 C 72 52, 74 46, 78 41" fill="none" stroke="#C98A3E" stroke-width="1.6" stroke-linecap="round"/>
      </g>
      <g fill="#F2C98B"><circle cx="28" cy="82" r="1.8"/><circle cx="36" cy="86" r="1.2"/><circle cx="62" cy="85" r="1.6"/><circle cx="71" cy="80" r="1.1"/><circle cx="50" cy="89" r="1.3"/></g>
      <path d="M76 14 C 86 12, 92 18, 90 27 C 82 29, 75 23, 76 14 Z" fill="#9BD37E"/>
      <path d="M77.5 15.5 L 88 26" stroke="#2E6B3F" stroke-width="1" stroke-linecap="round"/>`
  },
  pocketledger: {
    ko: '포켓레저', handle: 'pocketledger.app', avatar: ['#2B3CFF', '#fff'],
    word: { text: 'Pocket Ledger', family: SANS, weight: 800, spacing: -0.02 },
    head: ['커피값이', '보이는 가계부'], cta: '앱 설치하기',
    fg: '#1D2A5C', ctaBg: '#2B3CFF', ctaFg: '#FFFFFF',
    post: '이번 달 커피에 얼마 썼는지, 알림으로 먼저 알려 드려요.',
    bg: solid('#E8EDFF'),
    motif: () => `
      <rect x="27" y="5" width="46" height="90" rx="8" fill="#FFFFFF" stroke="#1D2A5C" stroke-width="1.4"/>
      <rect x="44" y="9" width="12" height="2.4" rx="1.2" fill="#1D2A5C"/>
      <text x="33" y="22" font-family="${SANS}" font-size="3.8" font-weight="700" fill="#5C6178">이번 달 지출</text>
      <text x="33" y="31" font-family="${SANS}" font-size="7" font-weight="800" fill="#1D2A5C">842,300원</text>
      <g fill="#C9D2FF"><rect x="34" y="52" width="5" height="16" rx="1.2"/><rect x="41" y="46" width="5" height="22" rx="1.2"/><rect x="55" y="56" width="5" height="12" rx="1.2"/><rect x="62" y="49" width="5" height="19" rx="1.2"/></g>
      <rect x="48" y="38" width="5" height="30" rx="1.2" fill="#2B3CFF"/>
      <text x="50.5" y="35" text-anchor="middle" font-family="${SANS}" font-size="3.4" font-weight="800" fill="#2B3CFF">커피</text>
      <line x1="33" y1="68.6" x2="67" y2="68.6" stroke="#E2E7F5" stroke-width=".8"/>
      <rect x="33" y="74" width="34" height="5" rx="1.5" fill="#EEF1FB"/>
      <rect x="33" y="82" width="26" height="5" rx="1.5" fill="#EEF1FB"/>
      <circle cx="80" cy="74" r="11" fill="#FFC94A" stroke="#1D2A5C" stroke-width="1.3"/>
      <text x="80" y="77.6" text-anchor="middle" font-family="${SANS}" font-size="10" font-weight="800" fill="#1D2A5C">₩</text>`
  },
  hearth: {
    ko: '허스앤오크', handle: 'hearthandoak', avatar: ['#8B5E3C', '#fff'],
    word: { text: 'HEARTH &amp; OAK', family: SERIF, weight: 400, spacing: 0.12 },
    head: ['의자 하나로', '시작하는 거실'], cta: '컬렉션 보기',
    fg: '#3E2C1E', ctaBg: '#6B4A2F', ctaFg: '#FFFFFF',
    post: '오래 앉아도 편한 의자 하나면, 거실이 달라집니다.',
    bg: solid('#EDE3D3'),
    motif: () => `
      <path d="M22 92 V 42 A 28 28 0 0 1 78 42 V 92 Z" fill="#F8F2E8" stroke="#B58B5F" stroke-width="1.3"/>
      <circle cx="64" cy="35" r="7" fill="#EBB872"/>
      <path d="M50 14.5 V 92 M22 58 H 78" stroke="#E4D5BF" stroke-width="1"/>
      <line x1="6" y1="92" x2="94" y2="92" stroke="#6B4A2F" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M27 92 L 30 75 M56 92 L 53 75" stroke="#6B4A2F" stroke-width="2" stroke-linecap="round"/>
      <path d="M24 75.5 H 58 C 60.5 75.5, 61 73, 59.5 71 L 57 67 H 28 C 24.5 67, 23 70, 24 72.5 Z" fill="#8B5E3C"/>
      <path d="M27 67 L 22.5 46 C 22 43, 23.5 41.5, 26 41.5 H 30 C 32.5 41.5, 34 43, 34.4 45.5 L 37.5 67 Z" fill="#9C6B45"/>
      <path d="M70 92 H 84 L 82 80 H 72 Z" fill="#C9A27A"/>
      <path d="M77 80 C 72 72, 68 69, 63.5 67.5 M77 80 C 79.5 71, 84 67, 89 64 M77 80 C 77 71, 77.5 64, 76 57.5" fill="none" stroke="#6E8A4E" stroke-width="2.2" stroke-linecap="round"/>
      <g fill="#7E9B5B">
        <ellipse cx="64" cy="67.5" rx="3.6" ry="2" transform="rotate(-25 64 67.5)"/>
        <ellipse cx="88.5" cy="64" rx="3.6" ry="2" transform="rotate(30 88.5 64)"/>
        <ellipse cx="76" cy="57.5" rx="2" ry="3.6"/>
      </g>`
  },
  stridewell: {
    ko: '스트라이드웰', handle: 'stridewell.run', avatar: ['#FF5A36', '#fff'],
    word: { text: 'STRIDEWELL', family: SANS, weight: 900, spacing: 0.02, italic: true },
    head: ['같이 뛰면', '멀리 간다'], cta: '러닝 크루 신청',
    fg: '#FFFFFF', ctaBg: '#1C1C2E', ctaFg: '#FFFFFF',
    post: '이번 주 토요일, 한강 러닝 크루와 10km 같이 뛰어요.',
    bg: solid('#FF5A36'),
    motif: () => `
      <path d="M-12 96 L 44 -8 L 66 -8 L 10 96 Z" fill="#FFFFFF" opacity=".12"/>
      <g fill="#FFFFFF" opacity=".75"><rect x="-6" y="46" width="16" height="3" rx="1.5"/><rect x="-12" y="54" width="20" height="3" rx="1.5"/><rect x="-4" y="62" width="12" height="3" rx="1.5"/></g>
      <path d="M14 68 C 13 58, 16 46, 22 42 L 38 42 C 42 42, 44 46, 48 48 L 64 54 C 74 56, 86 58, 90 64 C 92 68, 90 71, 86 71 L 18 72 C 15 72, 14 70, 14 68 Z" fill="#FFFFFF"/>
      <path d="M12 70 C 12 75, 15 78, 20 78 L 86 77 C 91 77, 94 73, 92 68 C 90 71, 88 72, 85 72 L 18 73 C 15 73, 13 72, 12 70 Z" fill="#1C1C2E"/>
      <path d="M15 52 C 15 47, 18 43.5, 22 42 L 25 46 C 21 48, 19 52, 19 58 Z" fill="#2B3CFF"/>
      <path d="M46 45.5 L 51 51 M52 47.5 L 57 53 M58 50 L 62.5 54.5" stroke="#1C1C2E" stroke-width="1.5" stroke-linecap="round"/>
      <g fill="#FF5A36"><circle cx="36" cy="63" r="1.6"/><circle cx="42" cy="62.5" r="1.6"/><circle cx="48" cy="62" r="1.6"/></g>`
  },
  tideroom: {
    ko: '타이드룸', handle: 'tideroom.stay', avatar: ['#0E5D8C', '#fff'],
    word: { text: 'TIDEROOM', family: SANS, weight: 600, spacing: 0.3 },
    head: ['파도 소리로', '체크인'], cta: '예약하기',
    fg: '#FFFFFF', ctaBg: '#FFFFFF', ctaFg: '#0B4A73',
    post: '바다가 제일 조용한 계절, 겨울 평일 연박을 열었어요.',
    bg: vgrad('#0B4A73', '#13699C'),
    motif: u => `
      <defs>
        <clipPath id="${u}win"><rect x="8" y="10" width="84" height="80" rx="5"/></clipPath>
        <linearGradient id="${u}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8CCBEA"/><stop offset="1" stop-color="#FFD8A8"/></linearGradient>
      </defs>
      <g clip-path="url(#${u}win)">
        <rect x="8" y="10" width="84" height="49" fill="url(#${u}sky)"/>
        <circle cx="50" cy="60" r="15" fill="#FFB65C"/>
        <rect x="8" y="58" width="84" height="32" fill="#0E5D8C"/>
        <path d="M38 61 H 62" stroke="#FFE2B0" stroke-width="1.4" stroke-linecap="round"/>
        <path d="M8 67 q 7 -3 14 0 t 14 0 t 14 0 t 14 0 t 14 0 t 14 0 t 14 0" fill="none" stroke="#FFFFFF" stroke-opacity=".75" stroke-width="1.4"/>
        <path d="M8 75 q 7 -3 14 0 t 14 0 t 14 0 t 14 0 t 14 0 t 14 0 t 14 0" fill="none" stroke="#FFFFFF" stroke-opacity=".5" stroke-width="1.2"/>
        <path d="M8 83 q 7 -3 14 0 t 14 0 t 14 0 t 14 0 t 14 0 t 14 0 t 14 0" fill="none" stroke="#FFFFFF" stroke-opacity=".3" stroke-width="1.1"/>
      </g>
      <rect x="8" y="10" width="84" height="80" rx="5" fill="none" stroke="#FFFFFF" stroke-width="2"/>`
  },
  softkiln: {
    ko: '소프트킬른 커피', handle: 'softkiln.coffee', avatar: ['#3A2A21', '#F5EBDD'],
    word: { text: 'Soft Kiln', family: SERIF, weight: 400, spacing: 0, italic: true },
    head: ['아침 6시,', '첫 로스팅'], cta: '원두 구독하기',
    fg: '#F5EBDD', ctaBg: '#D9A066', ctaFg: '#3A2A21',
    post: '오늘 볶은 에티오피아, 내일 아침 문 앞에 도착해요.',
    bg: solid('#3A2A21'),
    motif: () => `
      <circle cx="50" cy="57" r="38" fill="#4A372C"/>
      <rect x="76" y="53" width="17" height="8" rx="4" fill="#F5EBDD"/>
      <circle cx="50" cy="57" r="29" fill="#F5EBDD"/>
      <circle cx="50" cy="57" r="24" fill="#7A4A2E"/>
      <path d="M50 70 C 41 63, 37 56, 41.5 51.5 C 45 48, 49 49.5, 50 53.5 C 51 49.5, 55 48, 58.5 51.5 C 63 56, 59 63, 50 70 Z" fill="#F5EBDD" opacity=".92"/>
      <path d="M38 22 c -4 -4.5, 4 -7.5, 0 -12.5 M50 20 c -4 -4.5, 4 -7.5, 0 -12.5 M62 22 c -4 -4.5, 4 -7.5, 0 -12.5" fill="none" stroke="#F5EBDD" stroke-opacity=".55" stroke-width="1.6" stroke-linecap="round"/>
      <g transform="rotate(-28 14 90)"><ellipse cx="14" cy="90" rx="5.5" ry="3.8" fill="#9A6440"/><path d="M9.5 90 C 12 88.5, 16 91.5, 18.5 90" fill="none" stroke="#3A2A21" stroke-width=".9"/></g>
      <g transform="rotate(18 26 95)"><ellipse cx="26" cy="95" rx="5" ry="3.4" fill="#9A6440"/><path d="M22 95 C 24.5 93.6, 27.5 96.4, 30 95" fill="none" stroke="#3A2A21" stroke-width=".9"/></g>`
  },
  pawlette: {
    ko: '포렛', handle: 'pawlette.cat', avatar: ['#FFD84D', '#2B2015'],
    word: { text: 'pawlette', family: SANS, weight: 900, spacing: -0.01 },
    head: ['집사가 먼저', '찾는 사료'], cta: '첫 구매 할인',
    fg: '#2B2015', ctaBg: '#2B2015', ctaFg: '#FFD84D',
    post: '사료 바꾸고 털이 달라졌다는 후기, 이번 주에도 도착했어요.',
    bg: solid('#FFD84D'),
    motif: () => `
      <g fill="#2B2015" opacity=".14">
        <ellipse cx="82" cy="18" rx="4" ry="3.4"/><circle cx="77.5" cy="12.6" r="1.5"/><circle cx="81.4" cy="10.6" r="1.5"/><circle cx="85.6" cy="11.6" r="1.5"/><circle cx="88" cy="15.6" r="1.4"/>
        <ellipse cx="13" cy="34" rx="3.4" ry="2.9"/><circle cx="9.2" cy="29.6" r="1.3"/><circle cx="12.6" cy="27.9" r="1.3"/><circle cx="16.2" cy="28.8" r="1.3"/><circle cx="18.2" cy="32.2" r="1.2"/>
      </g>
      <path d="M29 46 L 31 22 L 45 34 Z" fill="#FFFFFF" stroke="#2B2015" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M71 46 L 69 22 L 55 34 Z" fill="#FFFFFF" stroke="#2B2015" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M33 40 L 34 28 L 41 34 Z M67 40 L 66 28 L 59 34 Z" fill="#FFB4A8"/>
      <circle cx="50" cy="56" r="26" fill="#FFFFFF" stroke="#2B2015" stroke-width="1.6"/>
      <ellipse cx="41" cy="55" rx="2.8" ry="3.8" fill="#2B2015"/>
      <ellipse cx="59" cy="55" rx="2.8" ry="3.8" fill="#2B2015"/>
      <path d="M47.8 62.5 h4.4 l-2.2 2.6 z" fill="#FF8A7A"/>
      <path d="M50 65 c -1 2, -3.5 2.4, -5 1.2 M50 65 c 1 2, 3.5 2.4, 5 1.2" fill="none" stroke="#2B2015" stroke-width="1.2" stroke-linecap="round"/>
      <path d="M30 60 H 20 M30 64 L 21 67 M70 60 H 80 M70 64 L 79 67" stroke="#2B2015" stroke-width="1" stroke-linecap="round"/>
      <path d="M18 74 H 82 L 75 94 H 25 Z" fill="#2B2015"/>
      <g fill="#C77B30"><circle cx="30" cy="73" r="3"/><circle cx="37" cy="71.5" r="3"/><circle cx="44" cy="72.5" r="3"/><circle cx="51" cy="71" r="3"/><circle cx="58" cy="72.5" r="3"/><circle cx="65" cy="71.6" r="3"/><circle cx="71" cy="73" r="3"/></g>
      <text x="50" y="87" text-anchor="middle" font-family="${SANS}" font-size="5" font-weight="900" fill="#FFD84D">pawlette</text>`
  },
  fairway: {
    ko: '페어웨이나인', handle: 'fairwaynine', avatar: ['#1E4A38', '#F3F7EE'],
    word: { text: 'FAIRWAY NINE', family: SANS, weight: 700, spacing: 0.2 },
    head: ['시즌 오픈,', '첫 티샷'], cta: '신상품 보기',
    fg: '#F3F7EE', ctaBg: '#F3F7EE', ctaFg: '#1E4A38',
    post: '2026 봄 컬렉션, 3월 첫 주에 공개합니다.',
    bg: (w, h) => {
      let grid = '';
      for (let x = 40; x < w; x += 40) grid += `<line x1="${x}" y1="0" x2="${x}" y2="${h}"/>`;
      for (let y = 40; y < h; y += 40) grid += `<line x1="0" y1="${y}" x2="${w}" y2="${y}"/>`;
      return `<rect width="${w}" height="${h}" fill="#1E4A38"/><g stroke="#FFFFFF" stroke-opacity=".06" stroke-width="1">${grid}</g>`;
    },
    motif: () => `
      <path d="M6 70 C 6 48, 30 28, 56 27 C 82 26, 96 44, 93 62 C 90 82, 64 93, 40 91 C 20 89, 6 84, 6 70 Z" fill="#2B6248"/>
      <path d="M20 69 C 20 55, 37 43, 55 42 C 73 41, 82 51, 80 63 C 78 77, 60 83, 44 83 C 30 83, 20 78, 20 69 Z" fill="#3A8360"/>
      <path d="M28 68 C 28 59, 40 51, 54 50 C 67 49, 73 56, 72 64 C 71 74, 58 77, 46 77 C 36 77, 28 75, 28 68 Z" fill="none" stroke="#F3F7EE" stroke-opacity=".28" stroke-width=".8" stroke-dasharray="2 2"/>
      <ellipse cx="58" cy="64" rx="4" ry="2" fill="#10261C"/>
      <line x1="58" y1="64" x2="58" y2="18" stroke="#F3F7EE" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M58.6 18.5 L 77 24.5 L 58.6 30.5 Z" fill="#FF6B4A"/>
      <circle cx="33" cy="73" r="4.6" fill="#FFFFFF"/>
      <g fill="#C9D3CC"><circle cx="31.6" cy="71.8" r=".55"/><circle cx="33.8" cy="71.4" r=".55"/><circle cx="34.6" cy="73.6" r=".55"/><circle cx="32.2" cy="74.4" r=".55"/></g>`
  }
};

/* Layout per creative format (SVG units). */
const FORMATS = {
  feed:    { w: 400, h: 500, word: { x: 34, y: 54, size: 18 }, head: { x: 34, y: 106, size: 30 }, motif: { x: 80, y: 160, s: 240 }, cta: { x: 34, y: 426, w: 332, h: 44, size: 15 } },
  square:  { w: 500, h: 500, word: { x: 40, y: 60, size: 21 }, head: { x: 40, y: 118, size: 34 }, motif: { x: 135, y: 180, s: 230 }, cta: { x: 40, y: 428, w: 420, h: 46, size: 16 } },
  story:   { w: 450, h: 800, word: { x: 40, y: 98, size: 24 }, head: { x: 40, y: 170, size: 42 }, motif: { x: 45, y: 262, s: 360 }, cta: { x: 40, y: 690, w: 370, h: 58, size: 19 } },
  banner:  { w: 955, h: 500, word: { x: 64, y: 98, size: 24 }, head: { x: 64, y: 200, size: 54 }, motif: { x: 545, y: 50, s: 400 }, cta: { x: 64, y: 330, w: 190, h: 56, size: 18 } },
  product: { w: 500, h: 428, motif: { x: 60, y: 24, s: 380 } }
};

export function creative(id, format, { decorative = false } = {}) {
  const b = BRANDS[id];
  const f = FORMATS[format];
  const u = `cr${++uidSeq}`;
  const a11y = decorative ? 'aria-hidden="true" focusable="false"' : `role="img" aria-label="${b.ko} 광고 소재"`;
  let s = `<svg viewBox="0 0 ${f.w} ${f.h}" preserveAspectRatio="xMidYMid slice" ${a11y}>`;
  s += b.bg(f.w, f.h, u);
  s += `<g transform="translate(${f.motif.x} ${f.motif.y}) scale(${f.motif.s / 100})">${b.motif(u)}</g>`;
  if (f.head) {
    const w = b.word;
    s += `<text x="${f.word.x}" y="${f.word.y}" font-family="${w.family}" font-size="${f.word.size}" font-weight="${w.weight}" letter-spacing="${(w.spacing * f.word.size).toFixed(2)}"${w.italic ? ' font-style="italic"' : ''} fill="${b.fg}">${w.text}</text>`;
    const lh = f.head.size * 1.25;
    s += b.head.map((line, i) =>
      `<text x="${f.head.x}" y="${(f.head.y + i * lh).toFixed(1)}" font-family="${SANS}" font-size="${f.head.size}" font-weight="800" letter-spacing="${(-0.03 * f.head.size).toFixed(2)}" fill="${b.fg}">${line}</text>`).join('');
    const c = f.cta;
    s += `<rect x="${c.x}" y="${c.y}" width="${c.w}" height="${c.h}" rx="${c.h / 2}" fill="${b.ctaBg}"/>`;
    s += `<text x="${c.x + c.w / 2}" y="${(c.y + c.h / 2 + c.size * 0.36).toFixed(1)}" text-anchor="middle" font-family="${SANS}" font-size="${c.size}" font-weight="700" fill="${b.ctaFg}">${b.cta}</text>`;
  }
  return `${s}</svg>`;
}

/* Icons (24px grid, stroke) */
export const ICON = {
  heart: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.4a4.3 4.3 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20z"/>',
  comment: '<path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3.5 20l1.2-4A8.5 8.5 0 1 1 20.5 11.5z"/>',
  send: '<path d="M21 3 3 10.5l7.2 2.6zM21 3l-7.6 18-3.2-7.9"/>',
  bookmark: '<path d="M6.5 3.5h11v17l-5.5-3.8-5.5 3.8z"/>',
  back: '<path d="M15 5l-7 7 7 7"/>',
  bag: '<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>',
  chevron: '<path d="M9 6l6 6-6 6"/>',
  arrow: '<path d="M4.5 12h15M13 5.5l6.5 6.5-6.5 6.5"/>',
  arrowLeft: '<path d="M19.5 12h-15M11 5.5 4.5 12l6.5 6.5"/>',
  plus: '<path d="M12 4.5v15M4.5 12h15"/>'
};
export const icon = (name, cls = '') =>
  `<svg${cls ? ` class="${cls}"` : ''} viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICON[name]}</svg>`;
