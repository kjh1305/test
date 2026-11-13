import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
/* CSS · JS 주소 뒤에 내용 해시를 붙여, 고친 뒤 휴대폰에 예전 파일이 남아 화면이 깨지는 일을 막습니다 */
const hashOf = f => createHash('md5').update(readFileSync(new URL('../assets/' + f, import.meta.url))).digest('hex').slice(0, 8);
const VER = { css: hashOf('css/site.css'), js: hashOf('js/site.js'), ico: hashOf('favicon.png') };
/* 공통 레이아웃: <head>, 헤더(사업분야 펼침 메뉴), 모바일 메뉴, 푸터, 떠 있는 견적문의 버튼, 모바일 하단 바, 사진 자리 */
import { BASE_URL, PH, CO, NAV, HOME, SERVICES } from './content.mjs';
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

export function secHead({ title, sub, cls = '', label = '' }) {
  return `<div class="sec-head ${cls}" data-reveal>
    ${label ? `<p class="sec-label">${label}</p>` : ''}
    <h2 class="sec-title">${br(title)}</h2>
    ${sub ? `<p class="sec-sub">${sub}</p>` : ''}
  </div>`;
}

/* 로고: 명함의 'Dae Kyeong DIVERSE' 로고를 같은 모양으로 다시 그린 것 (업체 원본 파일을 받으면 바꿈).
   글자 색은 currentColor라 어두운 푸터에서는 밝게 나옵니다. 옆에 한글 상호를 함께 씀 */
const LOGO_SVG = `<svg class="logo-svg" viewBox="85 20 850 400" aria-hidden="true" focusable="false">
<path d="M92 166H452V410H92Z" class="logo-sheet"/>
<path d="M132 122L442 26L524 334L462 412L222 412Z" fill="#165C96"/>
<path d="M524 334L462 412L452 332Z" fill="#0E3F6B"/>
<text x="250" y="238" font-size="96" font-weight="500" fill="#161616" letter-spacing="-1">Dae</text>
<text x="540" y="250" font-size="104" font-weight="500" fill="currentColor" letter-spacing="-1">Kyeong</text>
<text x="543" y="336" font-size="60" font-weight="500" fill="currentColor">DIVERSE</text>
</svg>`;
const logo = (c, cls = '') => `<a class="logo ${cls}" href="${c.url('')}" aria-label="${CO.name} (Dae Kyeong DIVERSE) 홈">${LOGO_SVG}<span class="logo-ko">${CO.name}</span></a>`;

function header(c) {
  const item = ([s, label]) => `<li><a href="${c.url(s)}"${c.slug === s ? ' aria-current="page"' : ''}>${label}</a></li>`;
  return `<a class="skip" href="#main">본문으로 건너뛰기</a>
<header class="site-header" data-header>
  <div class="wrap header-in">
    ${logo(c)}
    <nav class="gnav" aria-label="주 메뉴"><ul>${NAV.filter(n => n[0] !== 'contact/').map(n => n[0] === 'business/'
      ? `<li class="has-sub"><a href="${c.url(n[0])}"${c.slug === n[0] ? ' aria-current="page"' : ''}>${n[1]}</a><ul class="sub">${SERVICES.map(sv => `<li><a href="${c.url('business/')}#${sv.id}">${sv.name}</a></li>`).join('')}</ul></li>`
      : item(n)).join('')}</ul></nav>
    <div class="header-tools">
      ${CO.phone ? `<a class="header-phone" href="${telHref(CO.phone)}">${icon('phone')}<span>${esc(CO.phone)}</span></a>` : ''}
      <a class="btn btn-primary btn-sm header-cta" href="${c.url('contact/')}"${c.slug === 'contact/' ? ' aria-current="page"' : ''}>견적문의</a>
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mnav" aria-label="메뉴 열기" data-menu-btn><span></span></button>
    </div>
  </div>
</header>
<div class="mnav" id="mnav" data-mnav hidden>
  <div class="wrap mnav-in">
    <nav aria-label="모바일 메뉴"><ul class="mnav-links">${item(['', '홈'])}${NAV.map(n => n[0] === 'business/' ? item(n).replace('</li>', `<ul class="mnav-sub">${SERVICES.map(sv => `<li><a href="${c.url('business/')}#${sv.id}">${sv.name}</a></li>`).join('')}</ul></li>`) : item(n)).join('')}</ul></nav>
    <div class="mnav-contact">${btn(c.url('contact/'), '견적문의', { cls: 'btn-block' })}${phoneBtn('btn-block')}</div>
  </div>
</div>`;
}

function footer(c) {
  return `<footer class="site-footer">
  <div class="wrap">
    <div class="f-top">
      <div class="f-brand">${logo(c, 'logo-footer')}<p>${CO.field} · ${CO.area}</p></div>
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

/* 떠 있는 버튼: 블로그, 견적문의(어느 화면에서나 보임), 맨 위로. 모바일은 하단 바가 견적문의를 맡음 */
function floaters(c) {
  return `<div class="floaters" data-floaters>
  <a class="fl-blog" href="${CO.blog}" target="_blank" rel="noopener" aria-label="${CO.blogName} (새 창)"><span class="fl-dot" aria-hidden="true"></span><span>블로그</span></a>
  ${c.slug === 'contact/' ? '' : `<a class="fl-quote" href="${c.url('contact/')}"><span>견적</span><span>문의</span></a>`}
  <a class="fl-top" href="#main" data-top aria-label="맨 위로">${icon('up')}</a>
</div>`;
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
<link rel="icon" href="${c.asset('favicon.png')}?v=${VER.ico}" type="image/png">
<link rel="apple-touch-icon" href="${c.asset('apple-touch-icon.png')}?v=${VER.ico}">
<link rel="stylesheet" href="${c.asset('fonts/pretendard/pretendardvariable-dynamic-subset.css')}">
<link rel="stylesheet" href="${c.asset('css/site.css')}?v=${VER.css}">
<script>document.documentElement.classList.replace('no-js','js');setTimeout(function(){if(!window.__dk)document.documentElement.classList.add('no-motion-fallback')},2500)</script>
<script src="${c.asset('js/site.js')}?v=${VER.js}" defer></script>
</head>
<body class="${bodyClass}">
${header(c)}
<main id="main">
${body}
</main>
${footer(c)}
${quickbar(c)}
${floaters(c)}
<div class="toast" role="status" aria-live="polite" data-toast></div>
</body>
</html>
`;
}

/* 하위 페이지 머리 */
export function pageHead(c, { title, lede, crumb }) {
  return `<section class="page-head">
  <div class="wrap page-head-in">
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
    <div class="cta-btns">${btn(c.url('contact/'), '견적문의 · 방문 예약', { variant: 'white' })}${CO.phone ? `<a class="btn btn-ghost" href="${telHref(CO.phone)}">${icon('phone')}${esc(CO.phone)}</a>` : ''}</div>
  </div>
</section>`;
}
