/* 공통 레이아웃: <head>, 헤더, 모바일 메뉴, 푸터, 고정 상담 바 */
import { BASE_URL, CO, NAV, HOME } from './content.mjs';
import { icon, logoMark } from './art.mjs';

export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const lines = arr => (Array.isArray(arr) ? arr : [arr]).map(s => `<span class="ln-t">${s}</span>`).join(' ');

export function ctx(slug) {
  const depth = slug.split('/').length - 1;
  const root = depth ? '../'.repeat(depth) : './';
  return { slug, root, url: (s = '') => root + s, asset: p => root + 'assets/' + p, abs: (s = slug) => BASE_URL + s };
}

export const btn = (href, label, { variant = 'primary', ic = 'arrow', ext = false, cls = '' } = {}) =>
  `<a class="btn btn-${variant} ${cls}" href="${esc(href)}"${ext ? ' target="_blank" rel="noopener"' : ''}><span>${label}</span>${ic ? icon(ext ? 'external' : ic) : ''}</a>`;
export const phoneBtn = (variant = 'orange', cls = '') => `<a class="btn btn-${variant} btn-phone ${cls}" href="${CO.phoneHref}">${icon('phone')}<span><small>전화 상담</small>${CO.phone}</span></a>`;
export const eyebrow = (txt, cls = '') => `<p class="eyebrow ${cls}">${txt}</p>`;
export function secHead({ eb, en, title, sub, cls = '' }) {
  return `<div class="sec-head ${cls}">
    ${en ? `<p class="sec-en" aria-hidden="true">${en}</p>` : ''}
    ${eb ? eyebrow(eb) : ''}
    <h2 class="sec-title" data-reveal>${lines(title)}</h2>
    ${sub ? `<p class="sec-sub" data-reveal style="--d:.08s">${sub}</p>` : ''}
  </div>`;
}

function logo(c, cls = '') {
  return `<a class="logo ${cls}" href="${c.url('')}" aria-label="${CO.name} 홈">${logoMark()}<span class="logo-text"><b>${CO.name}</b><small>${CO.field}</small></span></a>`;
}

function header(c) {
  const item = ([s, label]) => `<li><a href="${c.url(s)}"${c.slug === s ? ' aria-current="page"' : ''}>${label}</a></li>`;
  return `<a class="skip" href="#main">본문으로 건너뛰기</a>
<header class="site-header on-dark" data-header>
  <div class="wrap header-in">
    ${logo(c)}
    <nav class="gnav" aria-label="주 메뉴"><ul>${NAV.map(item).join('')}</ul></nav>
    <div class="header-tools">
      <a class="header-phone" href="${CO.phoneHref}">${icon('phone')}<span>${CO.phone}</span></a>
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mnav" aria-label="메뉴 열기" data-menu-btn><span></span></button>
    </div>
  </div>
</header>
<div class="mnav" id="mnav" data-mnav hidden>
  <div class="mnav-in">
    <nav aria-label="주 메뉴"><ul class="mnav-links">${item(['', '홈'])}${NAV.map(item).join('')}</ul></nav>
    ${phoneBtn('orange', 'btn-block')}
    <a class="mnav-mail" href="mailto:${CO.email}">${icon('mail')}${CO.email}</a>
  </div>
</div>`;
}

function footer(c) {
  return `<footer class="site-footer">
  <div class="wrap">
    <div class="f-top">
      <div class="f-brand">${logo(c, 'logo-footer')}<p>${CO.tagline}</p></div>
      <nav class="f-nav" aria-label="바닥 메뉴"><ul><li><a href="${c.url('')}">홈</a></li>${NAV.map(([s, l]) => `<li><a href="${c.url(s)}">${l}</a></li>`).join('')}</ul></nav>
      <div class="f-contact">
        <a class="f-phone" href="${CO.phoneHref}"><small>전화 상담</small>${CO.phone}</a>
        <a href="mailto:${CO.email}">${icon('mail')}${CO.email}</a>
        <a href="${CO.blog}" target="_blank" rel="noopener">${icon('blog')}${CO.blogName}</a>
      </div>
    </div>
    <div class="f-info">
      <p><b>${CO.legal}</b><span>대표: <em class="ph-inline">${CO.ph}</em></span><span>전화 ${CO.phone}</span><span>${CO.email}</span></p>
      <p><span>주소: <em class="ph-inline">${CO.ph}</em></span><span>사업자등록번호: <em class="ph-inline">${CO.ph}</em></span></p>
    </div>
    <div class="f-bottom">
      <p class="f-note">이 사이트는 홈페이지 제작 시안입니다. 표시한 자리와 일부 문구는 실제 자료로 바꿀 예정입니다.</p>
      <p class="f-copy">© 2026 ${CO.legal}</p>
    </div>
  </div>
</footer>`;
}

function quickbar(c) {
  return `<div class="quickbar" data-quickbar>
  <a class="qb-phone" href="${CO.phoneHref}">${icon('phone')}<span>${CO.phone}</span></a>
  <a class="qb-form" href="${c.url('contact/')}">${icon('doc')}<span>견적문의</span></a>
</div>`;
}

export function page(c, { title, desc, body, bodyClass = '' }) {
  const full = title ? `${title} · ${CO.name}` : `${CO.name} · ${HOME.title}`;
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
<meta property="og:site_name" content="${esc(CO.name)}">
<meta property="og:title" content="${esc(full)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${c.abs()}">
<meta property="og:image" content="${BASE_URL}assets/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="ko_KR">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#15181B">
<link rel="icon" href="${c.asset('favicon.svg')}" type="image/svg+xml">
<link rel="stylesheet" href="${c.asset('fonts/pretendard/pretendardvariable-dynamic-subset.css')}">
<link rel="stylesheet" href="${c.asset('css/site.css')}">
<script>document.documentElement.classList.replace('no-js','js');setTimeout(function(){if(!window.__ire)document.documentElement.classList.add('no-motion-fallback')},2500)</script>
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

export function pageHero(c, { en, eb, title, lede, crumb }) {
  return `<section class="page-hero" data-dark>
  <div class="grid-bg" aria-hidden="true"></div>
  <p class="page-en" aria-hidden="true">${en}</p>
  <div class="wrap page-hero-in">
    <nav class="crumbs" aria-label="현재 위치"><a href="${c.url('')}">홈</a><span aria-hidden="true">/</span><span aria-current="page">${crumb}</span></nav>
    ${eyebrow(eb, 'on-dark')}
    <h1 class="page-title" data-reveal>${lines(title)}</h1>
    ${lede ? `<p class="page-lede" data-reveal style="--d:.1s">${lede}</p>` : ''}
  </div>
</section>`;
}

export function ctaBand(c) {
  return `<section class="cta" data-dark>
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap cta-in">
    <div>
      <p class="cta-en" aria-hidden="true">LET'S BUILD</p>
      <h2 class="cta-title" data-reveal>${lines(HOME.ctaTitle)}</h2>
      <p class="cta-text" data-reveal style="--d:.08s">${HOME.ctaText}</p>
    </div>
    <div class="cta-side" data-reveal style="--d:.14s">
      ${phoneBtn('orange', 'btn-xl')}
      ${btn(c.url('contact/'), '견적문의 남기기', { variant: 'ghost-light' })}
      <a class="cta-mail" href="mailto:${CO.email}">${icon('mail')}${CO.email}</a>
    </div>
  </div>
</section>`;
}
