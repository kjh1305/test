/* =========================================================
   공통 레이아웃과 컴포넌트 (HTML 문자열)
   ========================================================= */
import { SITE, BASE_URL } from './data.mjs';
import { BRANDS, creative, icon } from './creatives.mjs';

export const depthOf = path => path.split('/').filter(Boolean).length;
export const rootFor = path => '../'.repeat(depthOf(path));
export const homeHref = R => R || './';

const FAVICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%2314172B'/%3E%3Cg fill='none' stroke='%23fff' stroke-width='1.6'%3E%3Crect x='4.5' y='12' width='6' height='8' rx='1.2'/%3E%3Crect x='13' y='12' width='6' height='8' rx='1.2'/%3E%3Crect x='21.5' y='12' width='6' height='8' rx='1.2'/%3E%3C/g%3E%3Cpath d='M5 23.5 16 18l11-7' fill='none' stroke='%23FFE45C' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E";

export const NAV = [
  { key: 'about', href: 'about/', label: '회사소개' },
  { key: 'services', href: 'services/', label: '서비스' },
  { key: 'work', href: 'work/', label: '포트폴리오' },
  { key: 'insights', href: 'insights/', label: '인사이트' }
];

export const dotDate = iso => iso.replaceAll('-', '.');

/* 큰 제목: 줄마다 아래에서 올라오도록 감쌉니다. */
export const lines = arr =>
  arr.map((t, i) => `<span class="line"><span style="--i:${i}">${t}</span></span>`).join('');

export const brandMark = () => `<svg class="brand-mark" viewBox="0 0 34 22" aria-hidden="true" focusable="false">
  <g fill="none" stroke="currentColor" stroke-width="1.6">
    <rect x="1" y="6" width="8" height="10" rx="1.6"/><rect x="13" y="6" width="8" height="10" rx="1.6"/><rect x="25" y="6" width="8" height="10" rx="1.6"/>
  </g>
  <path class="brand-line" d="M2 20.5 17 14 32 3" fill="none" stroke-width="2.2" stroke-linecap="round"/>
</svg>`;

/* 브랜드 모티프: 장면(프레임) 세 개를 지나며 올라가는 선 */
export function plotLine(cls = '') {
  const P = [[600, 640], [900, 600], [1120, 300], [1480, 40]];
  const at = t => {
    const m = 1 - t;
    const k = [m * m * m, 3 * m * m * t, 3 * m * t * t, t * t * t];
    return [0, 1].map(d => k.reduce((s, kk, i) => s + kk * P[i][d], 0));
  };
  const frames = [0.36, 0.6, 0.82].map((t, i) => {
    const [x, y] = at(t);
    return `<rect class="plot-frame" style="--i:${i}" x="${(x - 32).toFixed(1)}" y="${(y - 24).toFixed(1)}" width="64" height="48" rx="8"/>`;
  }).join('');
  const d = `M${P[0].join(' ')} C${P[1].join(' ')} ${P[2].join(' ')} ${P[3].join(' ')}`;
  return `<svg class="plot ${cls}" viewBox="0 0 1440 560" preserveAspectRatio="xMaxYMax slice" aria-hidden="true" focusable="false"><path class="plot-path" pathLength="1" d="${d}"/>${frames}</svg>`;
}

function header(R, current) {
  const links = NAV.map(n =>
    `<li><a href="${R}${n.href}"${n.key === current ? ' aria-current="page"' : ''}>${n.label}</a></li>`).join('');
  return `<header class="site-header">
  <div class="wrap header-inner">
    <a class="brand" href="${homeHref(R)}" aria-label="플롯라인 홈">${brandMark()}<span class="brand-name">Plotline</span></a>
    <nav class="nav" aria-label="주요 메뉴"><ul>${links}</ul></nav>
    <a class="btn btn-primary header-cta" href="${R}contact/"${current === 'contact' ? ' aria-current="page"' : ''}>문의하기</a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu">
      <span class="sr-only">메뉴 열기</span><span class="menu-bars" aria-hidden="true"></span>
    </button>
  </div>
</header>
<div class="mobile-menu" id="mobile-menu" hidden>
  <nav aria-label="모바일 메뉴">
    <ul>
      <li style="--i:0"><a href="${homeHref(R)}">홈</a></li>
      ${NAV.map((n, i) => `<li style="--i:${i + 1}"><a href="${R}${n.href}"${n.key === current ? ' aria-current="page"' : ''}>${n.label}</a></li>`).join('')}
      <li style="--i:5"><a href="${R}contact/"${current === 'contact' ? ' aria-current="page"' : ''}>문의하기</a></li>
    </ul>
  </nav>
  <dl class="mobile-contact">
    <div><dt>전화</dt><dd>${SITE.phone}</dd></div>
    <div><dt>이메일</dt><dd>${SITE.email}</dd></div>
  </dl>
</div>`;
}

function footer(R) {
  return `<footer class="site-footer" data-dark>
  <div class="wrap footer-grid">
    <div class="footer-brand">
      <a class="brand" href="${homeHref(R)}" aria-label="플롯라인 홈">${brandMark()}<span class="brand-name">Plotline</span></a>
      <p class="footer-note">이 사이트는 홈페이지 제작 시안입니다. 회사명, 고객사, 사례, 수치는 모두 가상입니다.</p>
    </div>
    <nav class="footer-col" aria-label="하단 메뉴">
      <h2>메뉴</h2>
      <ul>${NAV.map(n => `<li><a href="${R}${n.href}">${n.label}</a></li>`).join('')}<li><a href="${R}contact/">문의하기</a></li></ul>
    </nav>
    <div class="footer-col">
      <h2>연락처</h2>
      <dl>
        <div><dt>전화</dt><dd>${SITE.phone}</dd></div>
        <div><dt>이메일</dt><dd>${SITE.email}</dd></div>
        <div><dt>운영 시간</dt><dd>${SITE.hours}</dd></div>
      </dl>
    </div>
    <div class="footer-col">
      <h2>회사 정보</h2>
      <dl>
        <div><dt>상호</dt><dd>${SITE.legalName}</dd></div>
        <div><dt>대표</dt><dd>${SITE.ceo}</dd></div>
        <div><dt>사업자등록번호</dt><dd>${SITE.bizNo}</dd></div>
      </dl>
    </div>
  </div>
  <p class="footer-word" aria-hidden="true">Plotline</p>
  <div class="wrap footer-bottom">
    <p>© 2026 Plotline</p>
    <p>${SITE.address}</p>
  </div>
</footer>`;
}

export function page({ path, title, description, current = '', bodyClass = '', main, rootOverride }) {
  const R = rootOverride ?? rootFor(path);
  const fullTitle = title ? `${title} | 플롯라인` : '플롯라인 | 마케팅 회사';
  const desc = description || SITE.description;
  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${fullTitle}</title>
<meta name="description" content="${desc}">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#14172B">
<meta property="og:type" content="website">
<meta property="og:site_name" content="플롯라인">
<meta property="og:title" content="${fullTitle}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${BASE_URL}assets/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" content="${BASE_URL}${path}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${FAVICON}">
<link rel="preload" href="${R}assets/fonts/SUIT-Variable.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${R}assets/fonts/pen/pen.css">
<link rel="stylesheet" href="${R}assets/css/style.css">
<script>document.documentElement.classList.add('js')</script>
<script src="${R}assets/js/main.js" defer></script>
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ''}>
<a class="skip-link" href="#main">본문으로 건너뛰기</a>
${header(R, current)}
<main id="main">
${main}
</main>
${footer(R)}
<div class="cursor-bubble" aria-hidden="true"><span></span></div>
<div class="toast" role="status" aria-live="polite"></div>
</body>
</html>
`;
}

/* 서브 페이지 첫 화면 */
export function pageHero({ title, lede = '', before = '', after = '', cls = '' }) {
  return `<section class="page-hero${cls ? ` ${cls}` : ''}" data-dark>
  ${plotLine()}
  <div class="wrap page-hero-inner">
    ${before}
    <h1 class="page-title">${lines(title)}</h1>
    ${lede ? `<p class="page-lede">${lede}</p>` : ''}
    ${after}
  </div>
</section>`;
}

export function ctaBand(R, { title = ['어떤 장면부터', '바꿔 볼까요?'] } = {}) {
  return `<section class="cta-band" data-dark data-reveal="plot" aria-labelledby="cta-title">
  ${plotLine('cta-plot')}
  <div class="wrap cta-inner">
    <h2 class="cta-title" id="cta-title" data-reveal="lines">${lines(title)}</h2>
    <p class="cta-lede">광고 계정이나 매출 상황을 간단히 적어 주세요. 2영업일 안에 담당자가 연락드립니다.</p>
    <div class="cta-actions">
      <a class="btn btn-light btn-lg" href="${R}contact/">문의하기</a>
      <a class="cta-mail" href="mailto:${SITE.email}">${SITE.email}</a>
    </div>
  </div>
</section>`;
}

export function caseCard(c, R) {
  return `<li class="case-card" data-services="${c.services.join('|')}" data-industry="${c.industry}">
  <a class="case-link" href="${R}work/${c.id}/" data-cursor="자세히 보기">
    <div class="case-thumb">${creative(c.id, 'feed', { decorative: true })}</div>
    <p class="case-meta"><span class="case-brand">${c.brand}</span><span>${c.industry}</span></p>
    <h3 class="case-title">${c.title}</h3>
    <p class="case-result"><span class="hl">${c.card}</span></p>
  </a>
</li>`;
}

export function postRow(p, R, { summary = false } = {}) {
  return `<li><a class="post-row${summary ? ' has-summary' : ''}" href="${R}insights/${p.slug}/">
  <time datetime="${p.date}">${dotDate(p.date)}</time>
  <span class="post-cat">${p.cat}</span>
  <span class="post-title">${p.title}</span>
  ${summary ? `<span class="post-summary">${p.summary}</span>` : ''}
  <span class="post-read">${p.read}</span>
</a></li>`;
}

/* ---------- 메인 스크롤 장면용 휴대폰 ---------- */
function feedPost(id) {
  const b = BRANDS[id];
  const isAd = id === 'daymist';
  return `<div class="post">
    <div class="post-head">
      <span class="avatar" style="background:${b.avatar[0]};color:${b.avatar[1]}">${b.word.text.charAt(0).toUpperCase()}</span>
      <span class="post-name">${b.handle}${isAd ? '<span class="post-sub">광고</span>' : ''}</span>
      <span class="post-more"></span>
    </div>
    <div class="post-media">${creative(id, 'square', { decorative: true })}</div>
    ${isAd ? `<div class="post-cta"><span>더 알아보기</span>${icon('chevron')}</div>` : ''}
    <div class="post-actions">${icon('heart')}${icon('comment')}${icon('send')}${icon('bookmark', 'bm')}</div>
    <p class="post-text"><b>${b.handle}</b>${b.post}</p>
  </div>`;
}

const statusBar = `<div class="status-bar"><span>9:41</span><span class="status-icons"><i></i><i></i><i></i><b></b></span></div>`;
const feedBar = `<div class="app-bar"><strong>피드</strong><span class="app-icons">${icon('heart')}${icon('send')}</span></div>`;

export function phone() {
  return `<div class="phone" aria-hidden="true">
  <div class="screen">
    <div class="screen-layer" data-screen="1"><div class="screen-inner">
      ${statusBar}${feedBar}
      <div class="feed-viewport">
        <div class="feed feed-1">${['greencrumb', 'tideroom', 'pawlette', 'daymist'].map(feedPost).join('')}</div>
        <span class="thumb-dot"></span>
      </div>
    </div></div>
    <div class="screen-layer" data-screen="2"><div class="screen-inner">
      ${statusBar}${feedBar}
      <div class="feed-viewport">
        <div class="feed">${feedPost('daymist')}</div>
        <p class="post-comment"><b>jisoo.k</b> <span class="tag">@minji_o</span> 이거 사무실에 하나 두자</p>
        <span class="save-toast"><svg viewBox="0 0 24 24"><path d="M6 3h12v18l-6-4-6 4z"/></svg>컬렉션에 저장했어요</span>
      </div>
    </div></div>
    <div class="screen-layer" data-screen="3"><div class="screen-inner shop">
      ${statusBar}
      <div class="app-bar shop-bar"><span class="app-icons">${icon('back')}</span><strong>데이미스트 공식몰</strong><span class="app-icons">${icon('bag')}</span></div>
      <div class="product-media">${creative('daymist', 'product', { decorative: true })}</div>
      <div class="product-info">
        <p class="p-brand">데이미스트</p>
        <p class="p-name">수분 미스트 100ml</p>
        <p class="p-price">19,800원</p>
        <p class="p-ship">내일 도착, 무료배송</p>
        <div class="p-options"><span class="is-on">100ml</span><span>200ml</span></div>
      </div>
      <span class="buy-button">구매하기</span>
      <span class="sheet-dim"></span>
      <div class="order-sheet">
        <svg class="order-check" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22"/><path d="M14 24.5 21 31.5 34.5 17"/></svg>
        <p class="order-title">주문을 완료했어요</p>
        <p class="order-sub">내일 도착 예정이에요</p>
      </div>
    </div></div>
  </div>
</div>`;
}
