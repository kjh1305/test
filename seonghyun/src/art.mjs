/* 그림: 선 아이콘(24×24), 제품 선 아이콘(64×64), 첫 화면·패널 바탕 그림(SVG), 물결 선 */

/* ---------- 선 아이콘 ---------- */
const I = {
  phone: '<path d="M5.5 3.5h3.3l1.7 4.6-2.2 1.4a11.5 11.5 0 006.2 6.2l1.4-2.2 4.6 1.7v3.3a2 2 0 01-2.1 2A16.5 16.5 0 013.5 5.6a2 2 0 012-2.1z"/>',
  sms: '<path d="M4 5h16a1 1 0 011 1v10a1 1 0 01-1 1h-9l-4.5 3.5V17H4a1 1 0 01-1-1V6a1 1 0 011-1z"/><path d="M7.5 11h.01M12 11h.01M16.5 11h.01" stroke-width="2.4"/>',
  talk: '<path d="M12 4.5c-4.7 0-8.5 2.9-8.5 6.6 0 2.4 1.6 4.4 4 5.6l-.9 3.3 3.8-2.5c.5.1 1 .1 1.6.1 4.7 0 8.5-2.9 8.5-6.5S16.7 4.5 12 4.5z"/>',
  doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 15.5h6"/>',
  file: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path d="M9 14l2 2 4-4"/>',
  tag: '<path d="M3.5 12.2V4.5a1 1 0 011-1h7.7l8.3 8.3a1 1 0 010 1.4l-7.1 7.1a1 1 0 01-1.4 0z"/><circle cx="8" cy="8" r="1.4"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
  chevron: '<path d="M9 6l6 6-6 6"/>',
  prev: '<path d="M15 6l-6 6 6 6"/>',
  next: '<path d="M9 6l6 6-6 6"/>',
  pause: '<path d="M9 6v12M15 6v12"/>',
  play: '<path d="M8 5.5v13l10.5-6.5z"/>',
  up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
  external: '<path d="M8 16L17 7M9 7h8v8"/>',
  camera: '<path d="M4 7.5h3.5L9 5h6l1.5 2.5H20a1 1 0 011 1V19a1 1 0 01-1 1H4a1 1 0 01-1-1V8.5a1 1 0 011-1z"/><circle cx="12" cy="13.5" r="3.8"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  shield: '<path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.2-7.5 9.5-4.3-1.3-7.5-4.9-7.5-9.5V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  slash: '<circle cx="12" cy="12" r="8.5"/><path d="M6 18L18 6"/>',
  truck: '<path d="M2.5 6.5h11v9h-11zM13.5 9.5h4l3 3v3h-7"/><circle cx="6.5" cy="17" r="1.8"/><circle cx="17" cy="17" r="1.8"/>',
  users: '<circle cx="9" cy="8.5" r="3.2"/><path d="M3 19.5a6 6 0 0112 0"/><circle cx="17" cy="9.5" r="2.5"/><path d="M15.5 14.2a5 5 0 016 5.3"/>',
  wrench: '<path d="M14.5 4a4.5 4.5 0 00-4.2 6.1L4 16.4 7.6 20l6.3-6.3A4.5 4.5 0 0020 9.5l-2.8 2.8-3-.7-.7-3L16.3 5.8A4.5 4.5 0 0014.5 4z"/>',
  factory: '<path d="M3 20V10l5 3V10l5 3V6h4l1 4v10z"/><path d="M3 20h18M7 16h2M12 16h2M16.5 16h2"/>',
  info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8h.01"/>',
  home: '<path d="M4 11l8-6.5 8 6.5M6.5 9.5V19h11V9.5"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  blog: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 9h8M8 12.5h8M8 16h5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>'
};
export const icon = (name, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${I[name]}</svg>`;

/* ---------- 제품 선 아이콘 (64×64): 사진이 없을 때 사진 자리 안에 흐리게 ---------- */
const box = '<rect x="7" y="7" width="50" height="8" rx="1.5"/>';
const rails = '<path d="M10 15v41M54 15v41"/>';
const bar = '<rect x="11" y="49" width="42" height="4" rx="1"/>';
const P = {
  steel: box + rails + '<path d="M12 21h40M12 27h40M12 33h40M12 39h40M12 45h40"/>' + bar,
  steel90: box + rails + '<path d="M12 21h40M12 27h40M12 33h40M12 39h40M12 45h40"/>' + bar + '<circle cx="46" cy="33" r="7" fill="var(--pi-bg, #fff)"/><path d="M46 29.5V33l2.4 1.6"/>',
  screen: box + '<path d="M12 15v34M52 15v34"/><path d="M20 17c-1.2 10 1.2 22 0 32M32 17c1.2 10-1.2 22 0 32M44 17c-1.2 10 1.2 22 0 32"/>' + bar,
  jumbo: '<rect x="3" y="9" width="58" height="6" rx="1.5"/><path d="M5 15v40M59 15v40"/><path d="M14 17c-1 12 1 24 0 34M26 17c1 12-1 24 0 34M38 17c-1 12 1 24 0 34"/><path d="M7 51h50"/><circle cx="50" cy="40" r="2"/><path d="M50 42.5v5M47.5 51l2.5-3.5 2.5 3.5M47.5 44.5h5"/>',
  al: box + rails + '<path d="M12 21h40M12 27h40M12 33h40"/>' + '<path d="M14 41h22a3.5 3.5 0 10-3.5-3.5M14 47h30a3.5 3.5 0 11-3.5 3.5"/>',
  security: box + rails + '<path d="M19 17v34M28 17v34M37 17v34M46 17v34M12 26h40M12 42h40"/>' + bar,
  parts: '<ellipse cx="14" cy="19" rx="5" ry="8"/><path d="M14 11h34M14 27h34"/><path d="M48 11a5 8 0 010 16"/><path d="M8 43c5-6 10-6 15 0s10 6 15 0 10-6 15 0"/><path d="M8 53h48M8 53v-3M56 53v-3"/>',
  etc: '<path d="M7 56V16L32 7l25 9v40"/><rect x="16" y="24" width="32" height="32"/><path d="M16 32h32M16 40h32M16 48h32"/>',
  composite: '<rect x="5" y="7" width="54" height="7" rx="1.5"/><path d="M8 14v42M56 14v42"/><path d="M10 20h44M10 26h44M10 32h44"/><rect x="24" y="36" width="16" height="20"/><circle cx="36.5" cy="46" r="1"/>'
};
export const productIcon = (name, cls = 'pic') => `<svg class="${cls}" viewBox="0 0 64 64" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">${P[name] || P.steel}</svg>`;

/* ---------- 바탕 그림 (사진 대신) ----------
   1600×900 기준으로 그리고 preserveAspectRatio="xMidYMid slice"로 화면을 채웁니다.
   uid: 한 페이지에 여러 장이 들어가므로 그라디언트 id 가 겹치지 않게 붙이는 값 */
const svgOpen = (cls, extra = '') => `<svg class="${cls}" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"${extra}>`;

/* 슬랫 한 칸의 굴곡: 위쪽 빛 → 둥근 면 → 아래 홈 */
function slatGrad(id, t) {
  return `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${t[0]}"/><stop offset=".1" stop-color="${t[1]}"/><stop offset=".42" stop-color="${t[2]}"/>
    <stop offset=".78" stop-color="${t[3]}"/><stop offset=".9" stop-color="${t[4]}"/><stop offset="1" stop-color="${t[5]}"/>
  </linearGradient>`;
}
function slatPattern(id, gid, h = 56) {
  return `<pattern id="${id}" width="1600" height="${h}" patternUnits="userSpaceOnUse">
    <rect width="1600" height="${h}" fill="url(#${gid})"/>
    <rect y="1" width="1600" height="1.2" fill="#fff" opacity=".32"/>
    <rect y="${h - 3}" width="1600" height="3" fill="#24201C" opacity=".55"/>
  </pattern>`;
}

const TONES = {
  steel: ['#7E8791', '#C9CED4', '#A4ACB5', '#7D8690', '#5A626C', '#3C434C'],
  dark: ['#332D27', '#5E554C', '#463E36', '#352F29', '#28231F', '#181512'],
  warm: ['#8A8279', '#CFC8BE', '#ACA49A', '#878076', '#655E56', '#463F39']
};

/* 1) 철재 슬랫을 가까이 본 모습 (부드러운 빛) */
function slats(uid, tone = 'steel') {
  const t = TONES[tone];
  const dark = tone === 'dark';
  return `${svgOpen('art art-slats')}
  <defs>
    ${slatGrad(`g${uid}`, t)}${slatPattern(`p${uid}`, `g${uid}`)}
    <radialGradient id="l${uid}" cx="72%" cy="22%" r="62%"><stop offset="0" stop-color="#fff" stop-opacity="${dark ? '.16' : '.42'}"/><stop offset=".55" stop-color="#fff" stop-opacity="${dark ? '.04' : '.1'}"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    <linearGradient id="s${uid}" x1="0" y1="0" x2="1" y2="0"><stop offset=".35" stop-color="#fff" stop-opacity="0"/><stop offset=".62" stop-color="#fff" stop-opacity="${dark ? '.05' : '.16'}"/><stop offset=".8" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <radialGradient id="v${uid}" cx="50%" cy="50%" r="75%"><stop offset=".55" stop-color="#1A1714" stop-opacity="0"/><stop offset="1" stop-color="#1A1714" stop-opacity=".55"/></radialGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#p${uid})"/>
  <rect width="1600" height="900" fill="url(#s${uid})"/>
  <rect width="1600" height="900" fill="url(#l${uid})"/>
  ${dark ? '' : '<rect x="1270" width="10" height="900" fill="#221E1A" opacity=".18"/><rect x="1280" width="3" height="900" fill="#fff" opacity=".18"/>'}
  <rect width="1600" height="900" fill="url(#v${uid})"/>
</svg>`;
}

/* 2) 실리카 직물 스크린: 셔터박스 아래로 늘어진 천과 부드러운 주름 */
function screen(uid) {
  return `${svgOpen('art art-screen')}
  <defs>
    <linearGradient id="f${uid}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#A69E92"/><stop offset=".25" stop-color="#CFC7BA"/><stop offset=".5" stop-color="#B3AA9D"/><stop offset=".75" stop-color="#D6CEC2"/><stop offset="1" stop-color="#A69E92"/>
    </linearGradient>
    <pattern id="fold${uid}" width="260" height="900" patternUnits="userSpaceOnUse"><rect width="260" height="900" fill="url(#f${uid})"/></pattern>
    <pattern id="w${uid}" width="7" height="7" patternUnits="userSpaceOnUse"><path d="M0 3.5h7M3.5 0v7" stroke="#5E564C" stroke-width=".6" opacity=".22"/></pattern>
    <linearGradient id="b${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5E6670"/><stop offset=".5" stop-color="#8C949D"/><stop offset="1" stop-color="#454C55"/></linearGradient>
    <linearGradient id="sh${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#221E1A" stop-opacity=".45"/><stop offset="1" stop-color="#221E1A" stop-opacity="0"/></linearGradient>
    <radialGradient id="l${uid}" cx="70%" cy="35%" r="60%"><stop offset="0" stop-color="#FFF6E8" stop-opacity=".5"/><stop offset="1" stop-color="#FFF6E8" stop-opacity="0"/></radialGradient>
    <radialGradient id="v${uid}" cx="50%" cy="50%" r="75%"><stop offset=".5" stop-color="#1A1714" stop-opacity="0"/><stop offset="1" stop-color="#1A1714" stop-opacity=".5"/></radialGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#fold${uid})"/>
  <rect width="1600" height="900" fill="url(#w${uid})"/>
  <path d="M0 330h1600M0 610h1600" stroke="#6E665B" stroke-width="2" opacity=".28"/>
  <path d="M0 333h1600M0 613h1600" stroke="#fff" stroke-width="1" opacity=".22"/>
  <rect width="1600" height="900" fill="url(#l${uid})"/>
  <rect width="1600" height="96" fill="url(#b${uid})"/>
  <rect y="96" width="1600" height="60" fill="url(#sh${uid})"/>
  <rect y="94" width="1600" height="3" fill="#fff" opacity=".25"/>
  <rect width="1600" height="900" fill="url(#v${uid})"/>
</svg>`;
}

/* 3) 반쯤 내린 셔터: 가이드레일, 하장바, 아래로 스며드는 따뜻한 빛 */
function opening(uid) {
  return `${svgOpen('art art-opening')}
  <defs>
    ${slatGrad(`g${uid}`, ['#5F6873', '#A9B0B8', '#87909A', '#646D77', '#474E57', '#2F353D'])}${slatPattern(`p${uid}`, `g${uid}`, 48)}
    <linearGradient id="fl${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3A2A1A"/><stop offset="1" stop-color="#16120E"/></linearGradient>
    <radialGradient id="glow${uid}" cx="58%" cy="0%" r="70%"><stop offset="0" stop-color="#F6B25A" stop-opacity=".95"/><stop offset=".35" stop-color="#E8892A" stop-opacity=".45"/><stop offset="1" stop-color="#E8892A" stop-opacity="0"/></radialGradient>
    <linearGradient id="bar${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D5DAE0"/><stop offset=".45" stop-color="#9AA2AB"/><stop offset="1" stop-color="#4C535C"/></linearGradient>
    <linearGradient id="rail${uid}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2B3139"/><stop offset=".5" stop-color="#6B737C"/><stop offset="1" stop-color="#2B3139"/></linearGradient>
    <radialGradient id="l${uid}" cx="68%" cy="20%" r="60%"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    <linearGradient id="d${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1A1714" stop-opacity=".35"/><stop offset=".4" stop-color="#1A1714" stop-opacity="0"/></linearGradient>
  </defs>
  <rect width="1600" height="900" fill="#1B1F26"/>
  <rect y="660" width="1600" height="240" fill="url(#fl${uid})"/>
  <rect y="660" width="1600" height="240" fill="url(#glow${uid})"/>
  <path d="M640 900L760 668M980 900L900 668M1320 900L1060 668" stroke="#F6B25A" stroke-width="2" opacity=".14"/>
  <rect width="1600" height="636" fill="url(#p${uid})"/>
  <rect width="1600" height="636" fill="url(#l${uid})"/>
  <rect width="1600" height="636" fill="url(#d${uid})"/>
  <rect y="630" width="1600" height="30" fill="url(#bar${uid})"/>
  <rect y="660" width="1600" height="4" fill="#0E1116" opacity=".7"/>
  <rect x="1440" width="44" height="900" fill="url(#rail${uid})"/>
  <rect x="1484" width="116" height="900" fill="#14181E"/>
</svg>`;
}

const ART = { slats: uid => slats(uid), slatsDark: uid => slats(uid, 'dark'), slatsWarm: uid => slats(uid, 'warm'), screen, opening };
export const heroArt = (name, uid) => (ART[name] || ART.slats)(uid);

/* ---------- 물결 선 (제품 영역 바탕) ---------- */
export function waves(cls = 'waves') {
  const lines = [];
  for (let i = 0; i < 9; i++) {
    const y = 120 + i * 26;
    lines.push(`<path d="M-20 ${y} C 260 ${y - 70}, 520 ${y + 80}, 800 ${y} S 1340 ${y - 80}, 1620 ${y + 10}"/>`);
  }
  return `<svg class="${cls}" viewBox="0 0 1600 420" preserveAspectRatio="none" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1">${lines.join('')}</svg>`;
}
