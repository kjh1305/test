/* 공통 레이아웃: <head>, 헤더, 모바일 메뉴, 푸터, 고정 전화·문의 바, 사진 자리 */
import { BASE_URL, PH, CO, NAV, HOME } from './content.mjs';
import { icon } from './art.mjs';

export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const br = arr => (Array.isArray(arr) ? arr : [arr]).map(s => `<span class="ln">${s}</span>`).join(' ');

/* slug: 'about/'처럼 이 페이지의 위치. 깊이에 맞춰 상대 주소를 만듭니다. */
export function ctx(slug) {
  const depth = slug.split('/').length - 1;
  const root = depth ? '../'.repeat(depth) : './';
  return { slug, root, url: (s = '') => root + s, asset: p => root + 'assets/' + p, abs: (s = slug) => BASE_URL + s };
}

/* 채울 자리 */
export const ph = (t = PH) => `<span class="ph">${t}</span>`;
/* 값이 있으면 값, 없으면 채울 자리 */
export const val = (v, fmt = x => esc(x)) => (v ? fmt(v) : ph());
export const telHref = p => 'tel:' + String(p).replace(/[^0-9+]/g, '');

/* 사진 자리: slot.img가 있으면 사진, 없으면 점선 상자 */
export function photo(c, slot, { cls = '', label = '사진', ratio = '4 / 3', eager = false } = {}) {
  if (slot && slot.img) {
    return `<figure class="photo ${cls}" style="--ratio:${ratio}"><img src="${c.asset('img/' + slot.img)}" width="${slot.w || ''}" height="${slot.h || ''}" alt="${esc(slot.alt || '')}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async"></figure>`;
  }
  return `<figure class="photo photo-ph ${cls}" style="--ratio:${ratio}" aria-label="${esc(label)}: ${PH}">${icon('camera')}<b>${label}</b><span>${PH}</span></figure>`;
}

export const btn = (href, label, { variant = 'primary', cls = '', ext = false } = {}) =>
  `<a class="btn btn-${variant} ${cls}" href="${esc(href)}"${ext ? ' target="_blank" rel="noopener"' : ''}>${label}${ext ? icon('external') : ''}</a>`;

/* 전화 버튼: 번호가 없으면 채울 자리 */
export const phoneBtn = (cls = '') => CO.phone
  ? `<a class="btn btn-line btn-phone ${cls}" href="${telHref(CO.phone)}">${icon('phone')}${esc(CO.phone)}</a>`
  : `<span class="btn btn-line btn-phone is-ph ${cls}">${icon('phone')}<span>전화번호<small>${PH}</small></span></span>`;

export function secHead({ title, sub, cls = '' }) {
  return `<div class="sec-head ${cls}" data-reveal>
    <h2 class="sec-title">${br(title)}</h2>
    ${sub ? `<p class="sec-sub">${sub}</p>` : ''}
  </div>`;
}

const logo = (c, cls = '') => `<a class="logo ${cls}" href="${c.url('')}" aria-label="${CO.name} 홈">${CO.name}</a>`;

function header(c) {
  const item = ([s, label]) => `<li><a href="${c.url(s)}"${c.slug === s ? ' aria-current="page"' : ''}>${label}</a></li>`;
  return `<a class="skip" href="#main">본문으로 건너뛰기</a>
<header class="site-header" data-header>
  <div class="wrap header-in">
    ${logo(c)}
    <nav class="gnav" aria-label="주 메뉴"><ul>${NAV.filter(n => n[0] !== 'contact/').map(item).join('')}</ul></nav>
    <div class="header-tools">
      ${CO.phone ? `<a class="header-phone" href="${telHref(CO.phone)}">${icon('phone')}<span>${esc(CO.phone)}</span></a>` : ''}
      <a class="btn btn-primary btn-sm header-cta" href="${c.url('contact/')}"${c.slug === 'contact/' ? ' aria-current="page"' : ''}>견적문의</a>
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mnav" aria-label="메뉴 열기" data-menu-btn><span></span></button>
    </div>
  </div>
</header>
<div class="mnav" id="mnav" data-mnav hidden>
  <div class="wrap mnav-in">
    <nav aria-label="모바일 메뉴"><ul class="mnav-links">${item(['', '홈'])}${NAV.map(item).join('')}</ul></nav>
    <div class="mnav-contact">${phoneBtn('btn-block')}${btn(CO.blog, CO.blogName, { variant: 'line', cls: 'btn-block', ext: true })}</div>
  </div>
</div>`;
}

function footer(c) {
  return `<footer class="site-footer">
  <div class="wrap">
    <div class="f-top">
      <div class="f-brand">${logo(c, 'logo-footer')}<p>${CO.field}</p></div>
      <nav class="f-nav" aria-label="바닥 메뉴"><ul><li><a href="${c.url('')}">홈</a></li>${NAV.map(([s, l]) => `<li><a href="${c.url(s)}">${l}</a></li>`).join('')}<li><a href="${CO.blog}" target="_blank" rel="noopener">${CO.blogName}</a></li></ul></nav>
    </div>
    <dl class="f-info">
      <div><dt>상호</dt><dd>${CO.name}</dd></div>
      <div><dt>대표</dt><dd>${val(CO.ceo)}</dd></div>
      <div><dt>전화</dt><dd>${val(CO.phone, p => `<a href="${telHref(p)}">${esc(p)}</a>`)}</dd></div>
      <div><dt>주소</dt><dd>${val(CO.address)}</dd></div>
      <div><dt>사업자등록번호</dt><dd>${val(CO.bizNo)}</dd></div>
    </dl>
    <div class="f-bottom">
      <p class="f-note">이 사이트는 홈페이지 제작 시안입니다. 표시한 자리와 일부 문구는 실제 자료로 바꿀 예정입니다.</p>
      <p class="f-copy">© 2026 ${CO.name}</p>
    </div>
  </div>
</footer>`;
}

function quickbar(c) {
  const call = CO.phone
    ? `<a class="qb-phone" href="${telHref(CO.phone)}">${icon('phone')}<span>${esc(CO.phone)}</span></a>`
    : `<span class="qb-phone is-ph">${icon('phone')}<span>전화번호<small>${PH}</small></span></span>`;
  return `<div class="quickbar" data-quickbar>${call}<a class="qb-form" href="${c.url('contact/')}">${icon('doc')}<span>견적문의</span></a></div>`;
}

export function page(c, { title, desc, body, bodyClass = '' }) {
  const full = title ? `${title} | ${CO.name}` : `${CO.name} | ${HOME.title}`;
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
<meta name="theme-color" content="#FFFFFF">
<link rel="icon" href="${c.asset('favicon.png')}" type="image/png">
<link rel="apple-touch-icon" href="${c.asset('apple-touch-icon.png')}">
<link rel="stylesheet" href="${c.asset('fonts/pretendard/pretendardvariable-dynamic-subset.css')}">
<link rel="stylesheet" href="${c.asset('css/site.css')}">
<script>document.documentElement.classList.replace('no-js','js');setTimeout(function(){if(!window.__dk)document.documentElement.classList.add('no-motion-fallback')},2500)</script>
<script src="${c.asset('js/site.js')}" defer></script>
</head>
<body class="${bodyClass}">
${header(c)}
<main id="main">
${body}
</main>
${footer(c)}
${quickbar(c)}
<div class="toast" role="status" aria-live="polite" data-toast></div>
</body>
</html>
`;
}

/* 하위 페이지 머리 */
export function pageHead(c, { title, lede, crumb }) {
  return `<section class="page-head">
  <div class="wrap">
    <nav class="crumbs" aria-label="현재 위치"><a href="${c.url('')}">홈</a>${icon('chevron')}<span aria-current="page">${crumb}</span></nav>
    <h1 class="page-title" data-reveal>${br(title)}</h1>
    ${lede ? `<p class="page-lede" data-reveal>${lede}</p>` : ''}
  </div>
</section>`;
}

export function ctaBand(c) {
  return `<section class="cta">
  <div class="wrap cta-in" data-reveal>
    <div>
      <h2 class="cta-title">${HOME.ctaTitle}</h2>
      <p class="cta-text">${HOME.ctaText}</p>
    </div>
    <div class="cta-btns">${btn(c.url('contact/'), '견적문의 남기기')}${phoneBtn()}</div>
  </div>
</section>`;
}
