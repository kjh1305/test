/* 공통 레이아웃: <head>, 헤더, 모바일 메뉴, 오른쪽 퀵메뉴, 푸터, 모바일 고정 상담 바, 공통 조각 */
import { BASE_URL, CO, NAV, PH } from './content.mjs';
import { icon } from './art.mjs';

export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const lines = arr => (Array.isArray(arr) ? arr : [arr]).map(s => `<span class="ln">${s}</span>`).join(' ');

/* slug: '' (홈), 'about/', 'services/' ... '404.html' — 상대 주소를 만들어 GitHub Pages 하위 폴더에서도 그대로 동작 */
export function ctx(slug) {
  const depth = slug.split('/').length - 1;
  const root = depth ? '../'.repeat(depth) : './';
  return { slug, root, url: (s = '') => root + s, asset: p => root + 'assets/' + p, abs: (s = slug) => BASE_URL + (s === '404.html' ? '' : s) };
}

/* ---------- 채울 자리 ---------- */
export const ph = (t = PH, cls = '') => `<span class="ph ${cls}">${t}</span>`;
export const val = v => (v ? v : ph());

/* 대표 전화는 CO.phone 하나로 관리. 비어 있으면 '채울 자리'를 보여 주고, 버튼은 상담문의 페이지로 보냄 */
const digits = s => s.replace(/[^0-9+]/g, '');
export const telHref = c => (CO.phone ? 'tel:' + digits(CO.phone) : c.url('contact/'));
export const officeHref = () => 'tel:' + digits(CO.office);
export const phoneText = (cls = '') => (CO.phone ? `<span class="tel-num ${cls}">${CO.phone}</span>` : ph(PH, 'ph-tel ' + cls));
export const callBtn = (c, { cls = '', label = '휴대폰 바로 전화' } = {}) =>
  `<a class="btn btn-call ${cls}" href="${telHref(c)}">${icon('phone')}<span class="call-txt"><small>${label}</small>${phoneText()}</span></a>`;

export const btn = (href, label, { variant = 'navy', ic = '', ext = false, cls = '' } = {}) =>
  `<a class="btn btn-${variant} ${cls}" href="${esc(href)}"${ext ? ' target="_blank" rel="noopener"' : ''}><span>${label}</span>${ext ? icon('external') : ic ? icon(ic) : ''}</a>`;

/* 섹션 제목: center 면 가운데 정렬 (제조업체 사이트 형식) */
export function secHead({ title, sub, center = false, cls = '' }) {
  return `<div class="sec-head${center ? ' is-center' : ''} ${cls}">
    <h2 class="sec-title">${lines(title)}</h2>
    ${sub ? `<p class="sec-sub">${sub}</p>` : ''}
  </div>`;
}

/* ---------- 사진 자리 ----------
   o = { img: null }                     → 점선 줄무늬 상자 ('사진 자리' + 채울 자리)
   o = { img: 'x.webp', w, h, alt }      → assets/img/x.webp */
export function imgSlot(c, o, { label = '사진 자리', cls = '', alt = '', eager = false } = {}) {
  if (o && o.img) {
    return `<div class="slot has-img ${cls}" style="--ar:${o.w} / ${o.h}"><img src="${c.asset('img/' + o.img)}" width="${o.w}" height="${o.h}" alt="${esc(o.alt || alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async"></div>`;
  }
  return `<div class="slot is-empty ${cls}" role="img" aria-label="${esc(label)}: ${PH}">${icon('camera')}<b>${label}</b><span>${PH}</span></div>`;
}
/* 사진 + 설명 */
export const photo = (c, o, cls = '') => `<figure class="photo ${cls}">${imgSlot(c, o)}${o.cap ? `<figcaption>${o.cap}</figcaption>` : ''}</figure>`;

/* 사진 카드: 흰 테두리 사진 + 아래 모서리에 걸친 남색 + 버튼, 제목, 두 줄 설명 */
export const photoCard = (c, { href, title, text, o, label }) => `<li class="pcard"><a href="${href}">
  <span class="pcard-frame">${imgSlot(c, o, { label: label || `${title} 사진` })}<span class="pcard-plus" aria-hidden="true"></span></span>
  <span class="pcard-body"><b>${title}</b><span>${text}</span></span>
</a></li>`;

function logo(c, cls = '') {
  return `<a class="logo ${cls}" href="${c.url('')}" aria-label="${CO.name} 홈"><b>${CO.name}</b><small>${CO.field}</small></a>`;
}

function header(c) {
  const cur = s => c.slug === s || (s && c.slug.startsWith(s));
  const item = ([s, label]) => `<li><a href="${c.url(s)}"${cur(s) ? ' aria-current="page"' : ''}>${label}</a></li>`;
  return `<a class="skip" href="#main">본문으로 건너뛰기</a>
<header class="site-header" data-header>
  <div class="wrap header-in">
    ${logo(c)}
    <nav class="gnav" aria-label="주 메뉴"><ul>${NAV.map(item).join('')}<li><a href="${CO.blog}" target="_blank" rel="noopener">블로그</a></li></ul></nav>
    <div class="header-tools">
      <a class="header-call" href="${telHref(c)}" aria-label="휴대폰 바로 전화 ${CO.phone || ''}">${icon('phone')}<span class="hc-txt">${phoneText()}</span></a>
      <a class="header-quote" href="${c.url('contact/')}">견적문의</a>
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mnav" aria-label="메뉴 열기" data-menu-btn><span></span></button>
    </div>
  </div>
</header>
<div class="mnav" id="mnav" data-mnav hidden>
  <div class="mnav-in">
    <nav aria-label="모바일 메뉴"><ul class="mnav-links">${item(['', '홈'])}${NAV.map(item).join('')}</ul></nav>
    <div class="mnav-cta">${callBtn(c, { cls: 'btn-block' })}${btn(c.url('contact/'), '견적·상담문의', { variant: 'navy', cls: 'btn-block' })}</div>
    <div class="mnav-more">
      <a href="${officeHref()}">${icon('office')}<span>사무실 ${CO.office}</span></a>
      <a href="mailto:${CO.email}">${icon('mail')}<span>${CO.email}</span></a>
      <a href="${CO.blog}" target="_blank" rel="noopener">${icon('blog')}<span>${CO.blogName}</span></a>
    </div>
  </div>
</div>`;
}

/* 데스크톱 오른쪽 고정 퀵메뉴 */
function sideQuick(c) {
  return `<nav class="sideq" aria-label="빠른 메뉴">
  <a href="${c.url('contact/')}">${icon('doc')}<span>상담문의</span></a>
  <a class="sideq-call" href="${telHref(c)}">${icon('phone')}<span>전화</span></a>
  <a href="${CO.blog}" target="_blank" rel="noopener">${icon('blog')}<span>블로그</span></a>
  <a class="sideq-top" href="#main" data-top>${icon('up')}<span>TOP</span></a>
</nav>`;
}

function footer(c) {
  return `<footer class="site-footer">
  <div class="f-links"><div class="wrap">
    <nav aria-label="바닥 메뉴"><ul><li><a href="${c.url('about/')}">회사소개</a></li><li><a href="${c.url('contact/')}#privacy">개인정보처리방침</a></li><li><a href="#" title="${PH}">이용약관</a></li><li><a href="${c.url('about/')}#location">오시는 길</a></li></ul></nav>
  </div></div>
  <div class="wrap f-in">
    <p class="f-name">${CO.name}</p>
    <p class="f-line"><span>대표 ${val(CO.rep)}</span><span>사업자등록번호 ${val(CO.bizNo)}</span><span>주소 ${val(CO.address)}</span></p>
    <p class="f-line"><span>휴대폰 <a href="${telHref(c)}">${CO.phone || PH}</a></span><span>사무실 <a href="${officeHref()}">${CO.office}</a></span><span>이메일 <a href="mailto:${CO.email}">${CO.email}</a></span><span>홈페이지 ${CO.site}</span></p>
    <p class="f-note">이 사이트는 홈페이지 제작 시안입니다. 표시한 자리와 일부 문구는 실제 자료로 바꿀 예정입니다.</p>
    <p class="f-copy">© 2026 ${CO.name}. All rights reserved.</p>
  </div>
</footer>`;
}

function quickbar(c) {
  return `<div class="quickbar" data-quickbar>
  <a class="qb-call" href="${telHref(c)}">${icon('phone')}<span><small>휴대폰 바로 전화</small>${phoneText()}</span></a>
  <a class="qb-form" href="${c.url('contact/')}">${icon('doc')}<span>견적문의</span></a>
</div>`;
}

export function page(c, { title, desc, body, bodyClass = '' }) {
  const full = title ? `${title} · ${CO.name}` : `${CO.name} · 산업용 보일러 세관 전문`;
  return `<!doctype html>
<html lang="ko" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(full)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${c.abs()}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(CO.name)}">
<meta property="og:title" content="${esc(full)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${c.abs()}">
<meta property="og:image" content="${BASE_URL}assets/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="ko_KR">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#14305C">
<link rel="icon" href="${c.asset('favicon.png')}" type="image/png">
<link rel="apple-touch-icon" href="${c.asset('apple-touch-icon.png')}">
<link rel="stylesheet" href="${c.asset('fonts/pretendard/pretendardvariable-dynamic-subset.css')}">
<link rel="stylesheet" href="${c.asset('css/site.css')}">
<script>document.documentElement.classList.replace('no-js','js')</script>
<script src="${c.asset('js/site.js')}" defer></script>
</head>
<body class="${bodyClass}">
${header(c)}
<main id="main" tabindex="-1">
${body}
</main>
${footer(c)}
${sideQuick(c)}
${quickbar(c)}
<div class="toast" role="status" aria-live="polite" data-toast></div>
</body>
</html>
`;
}

/* 서브 페이지 첫 화면: 어두운 현장 사진 띠 + 제목 + 현재 위치 */
export function pageHero(c, { title, lede, crumb, banner }) {
  return `<section class="sub-hero">
  ${banner ? `<img class="sub-hero-bg" src="${c.asset('img/' + banner.img)}" width="${banner.w}" height="${banner.h}" alt="" style="object-position:${banner.pos || '50% 50%'}" decoding="async">` : ''}
  <div class="wrap sub-hero-in">
    <h1 class="page-title">${lines(title)}</h1>
    ${lede ? `<p class="page-lede">${lede}</p>` : ''}
  </div>
  <div class="crumb-bar"><div class="wrap"><nav class="crumbs" aria-label="현재 위치"><a href="${c.url('')}">${icon('home')}<span class="sr">홈</span></a><span aria-hidden="true">›</span><span aria-current="page">${crumb}</span></nav></div></div>
</section>`;
}

/* 상담 띠 (서브 페이지 아래): 남색 바탕, 작은 중앙이 */
export function ctaBand(c) {
  return `<section class="cta">
  <div class="wrap cta-in">
    <img class="cta-mascot" src="${c.asset('img/mascot-run.webp')}" width="440" height="404" alt="" loading="lazy" decoding="async">
    <div class="cta-copy">
      <h2 class="cta-title">보일러 세관과 법정검사, 언제든지 연락 주세요</h2>
      <p class="cta-text">설비 종류와 용량, 원하는 일정을 알려 주시면 작업 범위와 방법을 함께 정하겠습니다.</p>
    </div>
    <div class="cta-side">
      ${callBtn(c)}
      ${btn(c.url('contact/'), '견적·상담문의', { variant: 'ghost', ic: 'doc' })}
    </div>
  </div>
</section>`;
}
