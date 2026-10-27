/* =========================================================
   Plotline — 마케팅 회사 홈페이지 시안
   사례·서비스 데이터는 아래 SERVICES, CASES 배열에서 고치면 됩니다.
   ========================================================= */
(() => {
  'use strict';

  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));
  const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrollBehavior = () => (reducedMotion() ? 'auto' : 'smooth');

  /* ---------------------------------------------------------
     Icons (24px grid, stroke)
     --------------------------------------------------------- */
  const ICON = {
    heart: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.4a4.3 4.3 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20z"/>',
    comment: '<path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3.5 20l1.2-4A8.5 8.5 0 1 1 20.5 11.5z"/>',
    send: '<path d="M21 3 3 10.5l7.2 2.6zM21 3l-7.6 18-3.2-7.9"/>',
    bookmark: '<path d="M6.5 3.5h11v17l-5.5-3.8-5.5 3.8z"/>',
    back: '<path d="M15 5l-7 7 7 7"/>',
    bag: '<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>',
    chevron: '<path d="M9 6l6 6-6 6"/>'
  };
  const icon = (name, cls = '') =>
    `<svg${cls ? ` class="${cls}"` : ''} viewBox="0 0 24 24" aria-hidden="true">${ICON[name]}</svg>`;

  /* ---------------------------------------------------------
     Brands (가상 고객사) & ad creatives drawn as SVG
     motif() draws inside a 100 x 100 box
     --------------------------------------------------------- */
  const SANS = "'SUIT Variable', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif";
  const SERIF = "Georgia, 'Times New Roman', serif";
  let uidSeq = 0;

  const solid = color => (w, h) => `<rect width="${w}" height="${h}" fill="${color}"/>`;
  const vgrad = (top, bottom) => (w, h, u) =>
    `<defs><linearGradient id="${u}bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#${u}bg)"/>`;

  const BRANDS = {
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
        let lines = '';
        for (let x = 40; x < w; x += 40) lines += `<line x1="${x}" y1="0" x2="${x}" y2="${h}"/>`;
        for (let y = 40; y < h; y += 40) lines += `<line x1="0" y1="${y}" x2="${w}" y2="${y}"/>`;
        return `<rect width="${w}" height="${h}" fill="#1E4A38"/><g stroke="#FFFFFF" stroke-opacity=".06" stroke-width="1">${lines}</g>`;
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

  function creative(id, format, decorative = false) {
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

  /* ---------------------------------------------------------
     Services
     --------------------------------------------------------- */
  const SERVICES = [
    {
      name: '퍼포먼스 광고',
      desc: '메타, 구글, 카카오 광고를 매출 기준으로 운영합니다.',
      channels: '메타, 구글, 카카오모먼트, 틱톡',
      work: '계정 구조 설계, 소재 테스트, 전환 추적 설정, 매일 입찰 조정',
      kpi: 'ROAS, 구매 단가, 신규 구매자 수'
    },
    {
      name: '검색광고',
      desc: '네이버와 구글에서 브랜드를 찾는 사람을 놓치지 않도록 키워드와 랜딩을 관리합니다.',
      channels: '네이버 파워링크, 쇼핑검색, 브랜드검색, 구글 검색',
      work: '키워드 발굴, 입찰 관리, 광고 문구 테스트, 랜딩 페이지 개선 제안',
      kpi: '클릭률, 전환율, 키워드별 매출'
    },
    {
      name: 'SNS 운영',
      desc: '인스타그램과 틱톡 계정을 기획부터 촬영, 댓글 관리까지 맡습니다.',
      channels: '인스타그램, 틱톡, 카카오톡 채널',
      work: '월간 콘텐츠 캘린더, 촬영과 편집, 댓글과 메시지 관리',
      kpi: '도달, 저장, 팔로워 증가, 재구매'
    },
    {
      name: '브랜드 콘텐츠',
      desc: '브랜드를 설명하는 영상과 사진을 만들어 광고와 SNS에 함께 씁니다.',
      channels: '유튜브, 쇼츠, 릴스',
      work: '브랜드 필름, 숏폼 시리즈, 제품 촬영',
      kpi: '조회수, 시청 지속률, 브랜드 검색량'
    },
    {
      name: '인플루언서',
      desc: '제품과 맞는 크리에이터를 찾고 계약부터 성과 집계까지 진행합니다.',
      channels: '인스타그램, 유튜브, 커뮤니티',
      work: '크리에이터 선정, 계약과 가이드, 콘텐츠 검수, 광고 소재로 재사용',
      kpi: '참여율, 유입 수, 할인 코드 사용 수'
    },
    {
      name: '데이터 리포트',
      desc: '광고, 매출, 사이트 데이터를 한 화면에 모아 매주 무엇을 바꿀지 정합니다.',
      channels: 'GA4, 광고 관리자, 자사몰 데이터',
      work: '대시보드 구축, 주간과 월간 리포트, 전환 추적 점검',
      kpi: '채널별 기여 매출, 고객 생애 가치'
    }
  ];

  /* ---------------------------------------------------------
     Cases (가상 사례)
     --------------------------------------------------------- */
  const CASES = [
    {
      id: 'daymist', brand: '데이미스트', industry: '뷰티', services: ['퍼포먼스 광고', '검색광고'],
      title: '건조한 오후를 노린 미스트 광고', card: 'ROAS 518%',
      period: '2025년 3월 ~ 8월', channels: '메타, 네이버 쇼핑검색',
      challenge: '자사몰을 연 지 6개월, 광고비는 늘었는데 매출이 따라오지 않았습니다. 소재 대부분이 제품 사진 위주라 누구에게 왜 필요한지가 보이지 않았습니다.',
      strategy: '사무실에서 오후 3시쯤 피부가 당기는 순간을 첫 장면으로 잡고, 직장인을 중심으로 소재 24종을 2주 동안 테스트했습니다. 반응이 좋은 장면만 남겨 쇼핑검색 키워드와 상세페이지 첫 문장까지 같은 이야기로 맞췄습니다.',
      result: '6개월 동안 ROAS가 190%에서 518%로 올랐고, 광고 게시물 저장이 1만 2천 회를 넘었습니다.',
      results: [{ v: '518%', l: 'ROAS, 시작 전 190%' }, { v: '3.8%', l: '광고 클릭률' }, { v: '12,400회', l: '광고 게시물 저장' }]
    },
    {
      id: 'greencrumb', brand: '그린크럼', industry: '식음료', services: ['SNS 운영'],
      title: '동네 비건 베이커리의 팬 만들기', card: '팔로워 +38,000',
      period: '2024년 9월 ~ 2025년 8월', channels: '인스타그램, 틱톡',
      challenge: '맛은 자신 있었지만, 비건이라 맛이 덜할 거라는 인식 때문에 처음 오는 손님이 적었습니다.',
      strategy: '매일 아침 빵이 나오는 시간을 릴스로 올리고, 단골 손님이 고른 이달의 빵을 소개했습니다. 비건이라는 말보다 바삭하다는 말이 먼저 보이도록 문구를 바꿨습니다.',
      result: '1년 동안 팔로워가 2,100명에서 4만 명으로 늘었고, 주말에는 오픈 1시간 안에 빵이 모두 팔리는 날이 이어졌습니다.',
      results: [{ v: '+38,000', l: '1년간 늘어난 팔로워' }, { v: '8.4만', l: '릴스 평균 조회수' }, { v: '1시간', l: '주말 오픈 후 완판까지' }]
    },
    {
      id: 'pocketledger', brand: '포켓레저', industry: '앱·서비스', services: ['퍼포먼스 광고'],
      title: '가계부 앱 설치 단가 42% 낮추기', card: '설치 단가 −42%',
      period: '2025년 5월 ~ 9월', channels: '메타, 구글 앱 캠페인, 애플 검색광고',
      challenge: '설치 수는 늘었지만 설치 단가가 높았고, 일주일 안에 앱을 지우는 사용자가 많았습니다.',
      strategy: '커피값, 배달비처럼 실제로 돈이 새는 장면을 소재로 만들고, 설치 수가 아니라 7일 차까지 앱을 쓰는 사용자를 기준으로 광고를 최적화했습니다.',
      result: '설치 단가는 42% 낮아졌고, 7일 차 유지율은 18%에서 31%로 올랐습니다.',
      results: [{ v: '−42%', l: '설치 단가' }, { v: '31%', l: '7일 차 유지율, 시작 전 18%' }, { v: '6.2만', l: '월 신규 설치' }]
    },
    {
      id: 'hearth', brand: '허스앤오크', industry: '리빙', services: ['브랜드 콘텐츠'],
      title: '의자 하나로 시작한 거실 이야기', card: '브랜드 검색량 3.2배',
      period: '2025년 1월 ~ 6월', channels: '유튜브, 인스타그램',
      challenge: '가구는 고민하는 기간이 길어서 광고 한 번으로 구매가 일어나지 않습니다. 브랜드를 기억하게 만들 이야기가 필요했습니다.',
      strategy: '한 가족이 6개월 동안 거실을 바꿔 가는 과정을 짧은 영상 6편으로 만들었습니다. 편마다 가구 하나만 등장시키고, 영상을 끝까지 본 사람에게만 다음 편 광고를 보여 줬습니다.',
      result: '시리즈 공개 후 네이버 브랜드 검색량이 3.2배로 늘었고, 쇼룸 방문 예약이 월 40건에서 150건으로 늘었습니다.',
      results: [{ v: '3.2배', l: '네이버 브랜드 검색량' }, { v: '46%', l: '영상을 끝까지 본 비율' }, { v: '월 150건', l: '쇼룸 방문 예약, 시작 전 40건' }]
    },
    {
      id: 'stridewell', brand: '스트라이드웰', industry: '패션·스포츠', services: ['인플루언서', '퍼포먼스 광고'],
      title: '러닝 크루 120곳과 함께 뛴 신발', card: '신규 구매자 11,800명',
      period: '2025년 4월 ~ 7월', channels: '인스타그램, 러닝 커뮤니티',
      challenge: '기능은 좋은데 브랜드 이름을 아는 사람이 적었습니다. 유명인 광고보다 실제로 뛰는 사람들의 말이 필요했습니다.',
      strategy: '전국 러닝 크루 120곳에 신발을 보내고, 크루가 직접 찍은 영상을 광고 소재로 다시 썼습니다. 크루마다 다른 할인 코드를 줘서 어느 크루가 판매로 이어졌는지 따로 집계했습니다.',
      result: '4개월 동안 신규 구매자가 1만 1,800명 생겼고, 크루 영상 소재는 제품 소재보다 클릭률이 2.4배 높았습니다.',
      results: [{ v: '11,800명', l: '신규 구매자' }, { v: '2.4배', l: '크루 영상 소재 클릭률, 제품 소재 대비' }, { v: '120곳', l: '함께한 러닝 크루' }]
    },
    {
      id: 'tideroom', brand: '타이드룸', industry: '숙박·여행', services: ['검색광고'],
      title: '바다 앞 객실, 비수기 예약 채우기', card: '비수기 예약률 78%',
      period: '2024년 11월 ~ 2025년 2월', channels: '네이버 검색광고, 구글 검색',
      challenge: '여름에는 예약이 넘치지만, 11월부터 2월까지는 객실 절반이 비었습니다.',
      strategy: '겨울 바다 숙소, 오션뷰 스파처럼 겨울에만 늘어나는 검색어를 따로 모아 광고했습니다. 평일 연박 패키지를 만들고, 광고 문구와 예약 페이지 첫 화면을 같은 장면으로 맞췄습니다.',
      result: '비수기 예약률이 41%에서 78%로 올랐고, 평일 연박이 전체 예약의 3분의 1이 됐습니다.',
      results: [{ v: '78%', l: '비수기 예약률, 시작 전 41%' }, { v: '6.1%', l: '검색 광고 전환율' }, { v: '34%', l: '전체 예약 중 평일 연박' }]
    },
    {
      id: 'softkiln', brand: '소프트킬른 커피', industry: '식음료', services: ['브랜드 콘텐츠'],
      title: '로스터리의 아침 6시를 영상으로', card: '누적 조회 210만',
      period: '2025년 2월 ~ 5월', channels: '유튜브 쇼츠, 인스타그램 릴스',
      challenge: '원두 구독 서비스를 시작했지만, 왜 이 원두여야 하는지 보여 줄 콘텐츠가 없었습니다.',
      strategy: '매일 아침 6시 첫 로스팅부터 출고까지를 30초 영상 시리즈로 만들었습니다. 영상 끝에는 그날 볶은 원두를 바로 구독할 수 있는 링크를 붙였습니다.',
      result: '시리즈 누적 조회수가 210만 회를 넘었고, 구독 회원이 3개월 만에 900명에서 4,300명으로 늘었습니다.',
      results: [{ v: '210만', l: '시리즈 누적 조회수' }, { v: '4,300명', l: '원두 구독 회원, 시작 전 900명' }, { v: '71%', l: '평균 시청 지속률' }]
    },
    {
      id: 'pawlette', brand: '포렛', industry: '반려동물', services: ['SNS 운영'],
      title: '고양이 집사들이 먼저 찾는 사료', card: '재구매율 64%',
      period: '2024년 10월 ~ 2025년 9월', channels: '인스타그램, 카카오톡 채널',
      challenge: '첫 구매는 꾸준했지만, 한 번 사고 다시 오지 않는 고객이 많았습니다.',
      strategy: '집사들이 직접 올린 사료 바꾼 뒤 사진을 모아 매주 소개하고, 카카오톡 채널로 사료가 떨어질 즈음 알림을 보냈습니다.',
      result: '재구매율이 29%에서 64%로 올랐고, 카카오톡 채널 친구가 2만 명을 넘었습니다.',
      results: [{ v: '64%', l: '재구매율, 시작 전 29%' }, { v: '2.1만', l: '카카오톡 채널 친구' }, { v: '3,800장', l: '모인 후기 사진' }]
    },
    {
      id: 'fairway', brand: '페어웨이나인', industry: '패션·스포츠', services: ['검색광고', '퍼포먼스 광고'],
      title: '골프웨어 시즌 오픈 첫 주 매출', card: '첫 주 매출 2.7억 원',
      period: '2025년 3월', channels: '네이버 브랜드검색, 메타',
      challenge: '신상품은 매년 3월에 나오는데, 시즌 오픈 첫 주에 관심을 모으지 못하면 재고가 남았습니다.',
      strategy: '오픈 2주 전부터 신상품 일부를 미리 보여 주며 알림 신청을 받고, 오픈 당일 브랜드검색과 메타 광고를 같은 시간에 열었습니다.',
      result: '오픈 첫 주 매출이 2억 7천만 원으로 전년보다 2.1배 늘었고, 알림 신청자의 38%가 첫 주에 구매했습니다.',
      results: [{ v: '2.7억 원', l: '오픈 첫 주 매출' }, { v: '2.1배', l: '전년 시즌 오픈 대비' }, { v: '38%', l: '알림 신청자 중 첫 주 구매' }]
    }
  ];

  const SERVICE_FILTERS = ['전체', '퍼포먼스 광고', '검색광고', 'SNS 운영', '브랜드 콘텐츠', '인플루언서'];
  const INDUSTRY_FILTERS = ['전체', '뷰티', '식음료', '리빙', '패션·스포츠', '숙박·여행', '앱·서비스', '반려동물'];

  /* ---------------------------------------------------------
     Toast
     --------------------------------------------------------- */
  const toastEl = $('.toast');
  let toastTimer = 0;
  function toast(message) {
    toastEl.textContent = message;
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-visible'), 4200);
  }

  /* ---------------------------------------------------------
     Header & mobile menu
     --------------------------------------------------------- */
  const header = $('.site-header');
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const menuToggle = $('.menu-toggle');
  const mobileMenu = $('#mobile-menu');
  function setMenu(open) {
    menuToggle.setAttribute('aria-expanded', String(open));
    $('.sr-only', menuToggle).textContent = open ? '메뉴 닫기' : '메뉴 열기';
    mobileMenu.hidden = !open;
    document.documentElement.classList.toggle('is-locked', open);
  }
  menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
  $$('a', mobileMenu).forEach(a => a.addEventListener('click', () => setMenu(false)));
  window.matchMedia('(min-width: 960px)').addEventListener('change', e => { if (e.matches) setMenu(false); });

  // highlight the nav item of the section in view
  if ('IntersectionObserver' in window) {
    const navLinks = $$('.nav a');
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(a => a.classList.toggle('is-current', a.getAttribute('href') === `#${entry.target.id}`));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['about', 'services', 'work', 'process', 'insights', 'contact'].forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
  }

  /* ---------------------------------------------------------
     Storyboard (hero)
     --------------------------------------------------------- */
  function postHTML(id) {
    const b = BRANDS[id];
    const isAd = id === 'daymist';
    return `<div class="post">
      <div class="post-head">
        <span class="avatar" style="background:${b.avatar[0]};color:${b.avatar[1]}">${b.word.text.charAt(0).toUpperCase()}</span>
        <span class="post-name">${b.handle}${isAd ? '<span class="post-sub">광고</span>' : ''}</span>
        <span class="post-more"></span>
      </div>
      <div class="post-media">${creative(id, 'square', true)}</div>
      ${isAd ? `<div class="post-cta"><span>더 알아보기</span>${icon('chevron')}</div>` : ''}
      <div class="post-actions">${icon('heart')}${icon('comment')}${icon('send')}${icon('bookmark', 'bm')}</div>
      <p class="post-text"><b>${b.handle}</b>${b.post}</p>
    </div>`;
  }
  $$('[data-feed]').forEach(el => { el.innerHTML = el.dataset.feed.split(' ').map(postHTML).join(''); });
  $$('[data-icons]').forEach(el => { el.innerHTML = el.dataset.icons.split(' ').map(n => icon(n)).join(''); });
  $$('[data-creative]').forEach(el => { const [id, fmt] = el.dataset.creative.split(' '); el.innerHTML = creative(id, fmt, true); });

  const story = $('.storyboard');
  const STEPS = [
    { t: 350, scene: 1, add: 's1-scroll' },
    { t: 2250, scene: 1, add: 's1-thumb' },
    { t: 2650, scene: 1, add: 's1-cap' },
    { t: 2950, scene: 1, add: 'a1' },
    { t: 3150, scene: 2, active: 2 },
    { t: 3600, scene: 2, add: 's2-save' },
    { t: 4050, scene: 2, add: 's2-toast' },
    { t: 4900, scene: 2, add: 's2-comment' },
    { t: 5300, scene: 2, add: 's2-cap' },
    { t: 5600, scene: 2, add: 'a2' },
    { t: 5800, scene: 3, active: 3 },
    { t: 6250, scene: 3, add: 's3-press' },
    { t: 6600, scene: 3, add: 's3-sheet' },
    { t: 7000, scene: 3, add: 's3-check' },
    { t: 7400, scene: 3, add: 's3-cap' }
  ];
  const STORY_CLASSES = STEPS.filter(s => s.add).map(s => s.add);
  const singlePhone = () => window.matchMedia('(max-width: 759px)').matches;
  let storyTimers = [];

  function setActiveScene(n) {
    story.dataset.active = String(n);
    $$('.scene-dots button', story).forEach(btn => btn.setAttribute('aria-pressed', String(btn.dataset.scene === String(n))));
  }
  function jumpStory(classes, active) {
    storyTimers.forEach(clearTimeout);
    storyTimers = [];
    story.classList.add('no-motion');
    story.classList.remove(...STORY_CLASSES, 'is-done');
    if (classes.length) story.classList.add(...classes);
    setActiveScene(active);
    void story.offsetWidth; // apply without transitions
    requestAnimationFrame(() => requestAnimationFrame(() => story.classList.remove('no-motion')));
  }
  function showStoryEnd(active) {
    jumpStory([...STORY_CLASSES, 'is-done'], active);
  }
  function playStory() {
    jumpStory([], 1);
    if (reducedMotion()) { showStoryEnd(singlePhone() ? 1 : 3); return; }
    const hold = singlePhone() ? 1400 : 0; // more reading time when scenes replace each other
    STEPS.forEach(step => {
      const delay = step.t + hold * (step.scene - 1);
      storyTimers.push(setTimeout(() => {
        if (step.active) setActiveScene(step.active);
        if (step.add) story.classList.add(step.add);
      }, delay));
    });
    storyTimers.push(setTimeout(() => story.classList.add('is-done'), 7900 + hold * 2));
  }

  $('.replay-button', story).addEventListener('click', playStory);
  $$('.scene-dots button', story).forEach(btn => btn.addEventListener('click', () => showStoryEnd(Number(btn.dataset.scene))));

  if ('IntersectionObserver' in window) {
    const storyIO = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { storyIO.disconnect(); playStory(); }
    }, { threshold: 0.35 });
    storyIO.observe(story);
  } else {
    playStory();
  }

  /* ---------------------------------------------------------
     Clients
     --------------------------------------------------------- */
  $('.client-list').innerHTML = Object.values(BRANDS).map(b => {
    const w = b.word;
    const style = `font-family:${w.family};font-weight:${w.weight};letter-spacing:${w.spacing}em;${w.italic ? 'font-style:italic;' : ''}`;
    return `<li style="${style}" title="${b.ko}">${w.text}</li>`;
  }).join('');

  /* ---------------------------------------------------------
     Services (accordion)
     --------------------------------------------------------- */
  $('.service-list').innerHTML = SERVICES.map((s, i) => {
    const hasCases = SERVICE_FILTERS.includes(s.name);
    return `<li class="service">
      <button type="button" class="service-row" aria-expanded="false" aria-controls="service-panel-${i}">
        <span class="service-name">${s.name}</span>
        <span class="service-desc">${s.desc}</span>
        <span class="service-channels">${s.channels}</span>
        <span class="service-icon" aria-hidden="true"></span>
      </button>
      <div class="service-panel" id="service-panel-${i}">
        <div class="service-panel-inner">
          <div class="service-detail">
            <dl>
              <div><dt>맡는 일</dt><dd>${s.work}</dd></div>
              <div><dt>같이 보는 숫자</dt><dd>${s.kpi}</dd></div>
            </dl>
            ${hasCases ? `<button type="button" class="text-button service-cases" data-show-service="${s.name}">${s.name} 사례 보기</button>` : ''}
          </div>
        </div>
      </div>
    </li>`;
  }).join('');

  $$('.service-row').forEach(row => {
    row.addEventListener('click', () => {
      const open = row.getAttribute('aria-expanded') !== 'true';
      row.setAttribute('aria-expanded', String(open));
      document.getElementById(row.getAttribute('aria-controls')).classList.toggle('is-open', open);
    });
  });

  /* ---------------------------------------------------------
     Work (filters + grid)
     --------------------------------------------------------- */
  const filterState = { service: '전체', industry: '전체' };
  const grid = $('.work-grid');
  const countEl = $('.result-count');
  const emptyEl = $('.work-empty');

  const visibleCases = () => CASES.filter(c =>
    (filterState.service === '전체' || c.services.includes(filterState.service)) &&
    (filterState.industry === '전체' || c.industry === filterState.industry));

  function renderChips() {
    [['service', SERVICE_FILTERS], ['industry', INDUSTRY_FILTERS]].forEach(([key, list]) => {
      $(`.chips[data-filter="${key}"]`).innerHTML = list.map(name =>
        `<button type="button" class="chip" data-value="${name}" aria-pressed="${filterState[key] === name}">${name}</button>`).join('');
    });
  }

  function cardHTML(c, i) {
    return `<li class="case-card is-entering" style="--i:${i}">
      <div class="case-thumb">${creative(c.id, 'feed', true)}</div>
      <p class="case-meta"><span class="case-brand">${c.brand}</span><span>${c.industry}</span></p>
      <h3 class="case-title"><button type="button" class="case-open" data-case="${c.id}">${c.title}</button></h3>
      <p class="case-result"><span class="hl">${c.card}</span></p>
    </li>`;
  }

  function renderGrid() {
    const list = visibleCases();
    grid.innerHTML = list.map(cardHTML).join('');
    countEl.innerHTML = `사례 <strong>${list.length}</strong>개`;
    emptyEl.hidden = list.length > 0;
  }

  $$('.chips[data-filter]').forEach(group => {
    group.addEventListener('click', e => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      filterState[group.dataset.filter] = chip.dataset.value;
      $$('.chip', group).forEach(c => c.setAttribute('aria-pressed', String(c === chip)));
      renderGrid();
    });
  });
  $('[data-reset-filters]').addEventListener('click', () => {
    filterState.service = '전체';
    filterState.industry = '전체';
    renderChips();
    renderGrid();
  });
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-show-service]');
    if (!btn) return;
    filterState.service = btn.dataset.showService;
    filterState.industry = '전체';
    renderChips();
    renderGrid();
    document.getElementById('work').scrollIntoView({ behavior: scrollBehavior() });
  });

  renderChips();
  renderGrid();

  /* ---------------------------------------------------------
     Case dialog
     --------------------------------------------------------- */
  const dialog = $('.case-dialog');
  const panel = $('.case-panel', dialog);
  const caseBody = $('.case-body', dialog);
  const caseCount = $('.case-count', dialog);
  const pageRegions = [$('.site-header'), $('#main'), $('.site-footer')];
  let caseList = CASES;
  let caseIndex = 0;
  let lastTrigger = null;
  let closeTimer = 0;

  function caseHTML(c) {
    return `<p class="case-kicker">${c.brand}</p>
      <h2 id="case-title">${c.title}</h2>
      <dl class="case-facts">
        <div><dt>업종</dt><dd>${c.industry}</dd></div>
        <div><dt>맡은 서비스</dt><dd>${c.services.join(', ')}</dd></div>
        <div><dt>기간</dt><dd>${c.period}</dd></div>
        <div><dt>채널</dt><dd>${c.channels}</dd></div>
      </dl>
      <div class="case-creatives">
        <figure class="c-feed">${creative(c.id, 'feed')}</figure>
        <figure class="c-story">${creative(c.id, 'story')}</figure>
        <figure class="c-banner">${creative(c.id, 'banner')}</figure>
      </div>
      <p class="case-creatives-note">피드(4:5), 스토리(9:16), 배너(1.91:1) 소재를 함께 만들었습니다.</p>
      <div class="case-results">
        ${c.results.map(r => `<div><strong><span class="hl">${r.v}</span></strong><span>${r.l}</span></div>`).join('')}
      </div>
      <div class="case-story">
        <section><h3>과제</h3><p>${c.challenge}</p></section>
        <section><h3>전략</h3><p>${c.strategy}</p></section>
        <section><h3>결과</h3><p>${c.result}</p></section>
      </div>
      <div class="case-cta">
        <p>비슷한 고민이 있다면 이야기해 주세요.</p>
        <button type="button" class="btn btn-primary" data-case-inquiry="${c.id}">이 사례로 문의하기</button>
      </div>`;
  }

  function renderCase() {
    const c = caseList[caseIndex];
    caseBody.innerHTML = caseHTML(c);
    caseCount.textContent = `${caseIndex + 1} / ${caseList.length}`;
    panel.scrollTop = 0;
  }

  function openCase(id, trigger, list) {
    caseList = list && list.some(c => c.id === id) ? list : CASES;
    caseIndex = caseList.findIndex(c => c.id === id);
    lastTrigger = trigger || document.activeElement;
    clearTimeout(closeTimer);
    renderCase();
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = scrollbar > 0 ? `${scrollbar}px` : '';
    document.documentElement.classList.add('is-locked');
    pageRegions.forEach(el => { el.inert = true; });
    dialog.hidden = false;
    requestAnimationFrame(() => requestAnimationFrame(() => dialog.classList.add('is-open')));
    $('.case-close', dialog).focus({ preventScroll: true });
  }

  function closeCase({ restoreFocus = true } = {}) {
    if (dialog.hidden) return;
    dialog.classList.remove('is-open');
    pageRegions.forEach(el => { el.inert = false; });
    document.documentElement.classList.remove('is-locked');
    document.body.style.paddingRight = '';
    closeTimer = setTimeout(() => { dialog.hidden = true; }, reducedMotion() ? 0 : 320);
    if (restoreFocus && lastTrigger && document.contains(lastTrigger)) lastTrigger.focus({ preventScroll: true });
  }

  grid.addEventListener('click', e => {
    const btn = e.target.closest('.case-open');
    if (btn) openCase(btn.dataset.case, btn, visibleCases());
  });
  $$('[data-open-case]').forEach(btn => btn.addEventListener('click', () => openCase(btn.dataset.openCase, btn, CASES)));
  $$('[data-close-case]', dialog).forEach(el => el.addEventListener('click', () => closeCase()));
  $$('[data-case-step]', dialog).forEach(btn => btn.addEventListener('click', () => {
    caseIndex = (caseIndex + Number(btn.dataset.caseStep) + caseList.length) % caseList.length;
    renderCase();
  }));

  // keep focus inside the dialog
  dialog.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const focusables = $$('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])', panel)
      .filter(el => !el.disabled && el.offsetParent !== null);
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (!dialog.hidden) closeCase();
    else if (menuToggle.getAttribute('aria-expanded') === 'true') { setMenu(false); menuToggle.focus(); }
  });

  /* ---------------------------------------------------------
     Insights (시안: 목록만)
     --------------------------------------------------------- */
  $$('[data-demo-post]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    toast('시안에는 글 목록까지만 들어 있어요. 실제 사이트에서는 글 상세 페이지로 이동합니다.');
  }));

  /* ---------------------------------------------------------
     Contact form
     --------------------------------------------------------- */
  const form = $('.contact-form');
  $('[data-service-checks]', form).innerHTML = SERVICES.map(s =>
    `<label class="check-chip"><input type="checkbox" name="services" value="${s.name}"><span>${s.name}</span></label>`).join('');

  const RULES = {
    company: v => (v.trim() ? '' : '회사명을 입력해 주세요.'),
    name: v => (v.trim() ? '' : '담당자 이름을 입력해 주세요.'),
    phone: v => {
      if (!v.trim()) return '연락처를 입력해 주세요.';
      return /^0\d{1,2}-?\d{3,4}-?\d{4}$/.test(v.trim()) ? '' : '연락처를 010-0000-0000 형식으로 입력해 주세요.';
    },
    email: v => (!v.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : '이메일 주소 형식을 확인해 주세요.'),
    message: v => (v.trim().length >= 5 ? '' : '문의 내용을 5자 이상 적어 주세요.')
  };
  const PRIVACY_MSG = '개인정보 수집과 이용에 동의해 주세요.';

  function setFieldError(name, message) {
    const input = form.elements[name];
    $(`#e-${name}`, form).textContent = message;
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    let firstInvalid = null;
    Object.entries(RULES).forEach(([name, rule]) => {
      const message = rule(form.elements[name].value);
      setFieldError(name, message);
      if (message && !firstInvalid) firstInvalid = form.elements[name];
    });
    const privacy = form.elements.privacy;
    setFieldError('privacy', privacy.checked ? '' : PRIVACY_MSG);
    if (!privacy.checked && !firstInvalid) firstInvalid = privacy;

    if (firstInvalid) { firstInvalid.focus(); return; }

    form.reset();
    $$('[aria-invalid]', form).forEach(el => el.removeAttribute('aria-invalid'));
    toast('문의 내용을 확인했어요. 시안이라 실제로 전송되지는 않고, 실제 사이트에서는 담당자 메일로 바로 전달됩니다.');
  });

  form.addEventListener('input', e => {
    const { name } = e.target;
    if (e.target.getAttribute('aria-invalid') !== 'true') return;
    if (RULES[name]) setFieldError(name, RULES[name](e.target.value));
    if (name === 'privacy') setFieldError('privacy', e.target.checked ? '' : PRIVACY_MSG);
  });

  // "이 사례로 문의하기": close the case and prefill the form
  dialog.addEventListener('click', e => {
    const btn = e.target.closest('[data-case-inquiry]');
    if (!btn) return;
    const c = CASES.find(x => x.id === btn.dataset.caseInquiry);
    closeCase({ restoreFocus: false });
    $$('input[name="services"]', form).forEach(box => { box.checked = c.services.includes(box.value); });
    const message = form.elements.message;
    if (!message.value.trim()) message.value = `${c.brand} 사례처럼 ${c.services.join(', ')} 상담을 받고 싶어요.\n`;
    document.getElementById('contact').scrollIntoView({ behavior: scrollBehavior() });
    setTimeout(() => form.elements.company.focus({ preventScroll: true }), reducedMotion() ? 0 : 600);
    toast('관심 서비스와 문의 내용을 미리 채워 뒀어요. 회사 정보만 입력해 주세요.');
  });
})();
