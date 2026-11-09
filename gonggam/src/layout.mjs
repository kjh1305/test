/* 공통 레이아웃: <head>, 헤더, 모바일 메뉴, 푸터, 고정 상담 바 */
import { BASE_URL, OFFICE, NAV, HOME } from './content.mjs';
import { icon, seal } from './art.mjs';

export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const lines = arr => (Array.isArray(arr) ? arr : [arr]).map(s => `<span class="ln-t">${s}</span>`).join(' ');

export function ctx(slug) {
  const depth = slug.split('/').length - 1;
  const root = depth ? '../'.repeat(depth) : './';
  return { slug, root, url: (s = '') => root + s, asset: p => root + 'assets/' + p, abs: (s = slug) => BASE_URL + s };
}

export const btn = (href, label, { variant = 'primary', ic = 'arrow', ext = false, cls = '' } = {}) =>
  `<a class="btn btn-${variant} ${cls}" href="${esc(href)}"${ext ? ' target="_blank" rel="noopener"' : ''}><span>${label}</span>${ic ? icon(ext ? 'external' : ic) : ''}</a>`;

export const phoneBtn = (variant = 'seal', cls = '') =>
  `<a class="btn btn-${variant} btn-phone ${cls}" href="${OFFICE.phoneHref}">${icon('phone')}<span><small>전화 상담</small>${OFFICE.phone}</span></a>`;

export const eyebrow = (txt, cls = '') => `<p class="eyebrow ${cls}">${txt}</p>`;

export function secHead({ eb, title, sub, cls = '' }) {
  return `<div class="sec-head ${cls}">
    ${eb ? eyebrow(eb) : ''}
    <h2 class="sec-title" data-reveal>${lines(title)}</h2>
    ${sub ? `<p class="sec-sub" data-reveal style="--d:.08s">${sub}</p>` : ''}
  </div>`;
}

function logo(c, cls = '') {
  return `<a class="logo ${cls}" href="${c.url('')}" aria-label="${OFFICE.name} 홈">${seal('seal logo-seal')}<span class="logo-text"><b>${OFFICE.name}</b><small>${OFFICE.repTitle} ${OFFICE.rep}</small></span></a>`;
}

function header(c) {
  const nav = NAV.map(([s, label]) => `<li><a href="${c.url(s)}"${c.slug === s ? ' aria-current="page"' : ''}>${label}</a></li>`).join('');
  return `<a class="skip" href="#main">본문으로 건너뛰기</a>
<header class="site-header on-dark" data-header>
  <div class="wrap header-in">
    ${logo(c)}
    <nav class="gnav" aria-label="주 메뉴"><ul>${nav}</ul></nav>
    <div class="header-tools">
      <a class="header-phone" href="${OFFICE.phoneHref}">${icon('phone')}<span>${OFFICE.phone}</span></a>
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mnav" aria-label="메뉴 열기" data-menu-btn><span></span></button>
    </div>
  </div>
</header>
<div class="mnav" id="mnav" data-mnav hidden>
  <div class="mnav-in">
    <nav aria-label="주 메뉴"><ul class="mnav-links">
      <li><a href="${c.url('')}"${c.slug === '' ? ' aria-current="page"' : ''}>홈</a></li>
      ${NAV.map(([s, label]) => `<li><a href="${c.url(s)}"${c.slug === s ? ' aria-current="page"' : ''}>${label}</a></li>`).join('')}
    </ul></nav>
    ${phoneBtn('seal', 'btn-block')}
    <a class="mnav-blog" href="${OFFICE.blog}" target="_blank" rel="noopener">${icon('blog')}${OFFICE.blogName}${icon('external')}</a>
  </div>
</div>`;
}

function footer(c) {
  return `<footer class="site-footer">
  <div class="wrap">
    <div class="f-top">
      <div class="f-brand">${logo(c, 'logo-footer')}<p>${OFFICE.creds.map(x => x.title).join('<br>')}</p></div>
      <nav class="f-nav" aria-label="바닥 메뉴"><ul><li><a href="${c.url('')}">홈</a></li>${NAV.map(([s, l]) => `<li><a href="${c.url(s)}">${l}</a></li>`).join('')}</ul></nav>
      <div class="f-contact">
        <a class="f-phone" href="${OFFICE.phoneHref}"><small>전화 상담</small>${OFFICE.phone}</a>
        <a href="${OFFICE.blog}" target="_blank" rel="noopener">${icon('blog')}${OFFICE.blogName}</a>
      </div>
    </div>
    <div class="f-info">
      <p><b>${OFFICE.name}</b><span>${OFFICE.repTitle} ${OFFICE.rep}</span><span>전화 ${OFFICE.phone}</span></p>
      <p><span>주소: <em class="ph-inline">${OFFICE.placeholder}</em></span><span>사업자등록번호: <em class="ph-inline">${OFFICE.placeholder}</em></span></p>
    </div>
    <div class="f-bottom">
      <p class="f-note">이 사이트는 홈페이지 제작 시안입니다. 실제 사무소 사이트가 아니며, 표시한 자리와 일부 문구는 실제 자료로 바꿀 예정입니다.</p>
      <p class="f-copy">© 2026 ${OFFICE.name}</p>
    </div>
  </div>
</footer>`;
}

function quickbar(c) {
  return `<div class="quickbar" data-quickbar>
  <a class="qb-phone" href="${OFFICE.phoneHref}">${icon('phone')}<span>${OFFICE.phone}</span></a>
  <a class="qb-form" href="${c.url('contact/')}">${icon('pen')}<span>상담 신청</span></a>
</div>`;
}

export function page(c, { title, desc, body, bodyClass = '' }) {
  const full = title ? `${title} · ${OFFICE.name}` : `${OFFICE.name} · ${HOME.title}`;
  return `<!doctype html>
<html lang="ko" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(full)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="noindex, nofollow">
<link rel="canonical" href="${c.abs()}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(OFFICE.name)}">
<meta property="og:title" content="${esc(full)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${c.abs()}">
<meta property="og:image" content="${BASE_URL}assets/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="ko_KR">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#14243A">
<link rel="icon" href="${c.asset('favicon.svg')}" type="image/svg+xml">
<link rel="stylesheet" href="${c.asset('fonts/pretendard/pretendardvariable-dynamic-subset.css')}">
<link rel="stylesheet" href="${c.asset('fonts/noto-serif-kr/noto-serif-kr.css')}">
<link rel="stylesheet" href="${c.asset('css/site.css')}">
<script>document.documentElement.classList.replace('no-js','js');setTimeout(function(){if(!window.__gg)document.documentElement.classList.add('no-motion-fallback')},2500)</script>
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

export function pageHero(c, { eb, title, lede, crumb }) {
  return `<section class="page-hero" data-dark>
  <div class="hero-paper" aria-hidden="true"></div>
  <div class="wrap page-hero-in">
    <nav class="crumbs" aria-label="현재 위치"><a href="${c.url('')}">홈</a><span aria-hidden="true">/</span><span aria-current="page">${crumb}</span></nav>
    ${eyebrow(eb, 'on-dark')}
    <h1 class="page-title" data-reveal>${lines(title)}</h1>
    ${lede ? `<p class="page-lede" data-reveal style="--d:.1s">${lede}</p>` : ''}
  </div>
  ${seal('seal hero-seal')}
</section>`;
}

export function urgentBand(c) {
  return `<section class="urgent" data-dark>
  <div class="wrap urgent-in">
    <div>
      ${eyebrow('빠른 상담', 'on-dark')}
      <h2 class="urgent-title" data-reveal>${lines(HOME.urgentTitle)}</h2>
      <p class="urgent-text" data-reveal style="--d:.08s">${HOME.urgentText}</p>
    </div>
    <div class="urgent-cta" data-reveal style="--d:.14s">
      ${phoneBtn('seal', 'btn-xl')}
      ${btn(c.url('contact/'), '상담 신청서 남기기', { variant: 'ghost-light' })}
    </div>
  </div>
</section>`;
}
