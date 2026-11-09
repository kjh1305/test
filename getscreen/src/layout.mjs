/* 공통 레이아웃: <head>, 바로가기 줄, 헤더, 모바일 메뉴, 푸터, 상담 버튼 */
import { BASE_URL, BRAND, NAV, HOME, LINKS } from './content.mjs';
import { IMG } from './images.mjs';
import { icon } from './art.mjs';

export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const lines = arr => (Array.isArray(arr) ? arr : [arr]).map(s => `<span class="ln">${s}</span>`).join(' ');

export function ctx(slug) {
  const depth = slug.split('/').length - 1;
  const root = depth ? '../'.repeat(depth) : './';
  return { slug, root, url: (s = '') => root + s, asset: p => root + 'assets/' + p, abs: (s = slug) => BASE_URL + s };
}

export const btn = (href, label, { variant = 'primary', ic = 'arrow', ext = false, cls = '' } = {}) =>
  `<a class="btn btn-${variant} ${cls}" href="${esc(href)}"${ext ? ' target="_blank" rel="noopener"' : ''}><span>${label}</span>${ic ? icon(ext ? 'external' : ic) : ''}</a>`;

export const eyebrow = (txt, cls = '') => `<p class="eyebrow ${cls}">${txt}</p>`;

/* 잘라 낸 제품 화면: 원본보다 크게 늘리지 않도록 width/height를 원본 크기로 둡니다 */
export function shot(c, key, alt, { cls = '', lazy = true } = {}) {
  const m = IMG[key];
  return `<figure class="shot ${cls}" style="--bg:${m.bg || '#fff'}"><img src="${c.asset(`img/${key}.webp`)}" width="${m.w}" height="${m.h}" alt="${esc(alt)}"${lazy ? ' loading="lazy"' : ''} decoding="async"></figure>`;
}

export function secHead({ eb, title, sub, center = false }) {
  return `<div class="sec-head${center ? ' center' : ''}">
    ${eb ? eyebrow(eb) : ''}
    <h2 class="sec-title" data-reveal>${lines(title)}</h2>
    ${sub ? `<p class="sec-sub" data-reveal style="--d:.08s">${sub}</p>` : ''}
  </div>`;
}

/* 로고: 블로그 안내 이미지에서 잘라 낸 Getscreen.me 로고 (원본 파일을 받으면 교체) */
function logo(c, cls = '') {
  const file = cls.includes('footer') ? 'logo-white' : 'logo';
  const h = 32, w = Math.round(IMG[file].w * h / IMG[file].h);
  return `<a class="logo ${cls}" href="${c.url('')}" aria-label="${BRAND.name}(${BRAND.nameEn}) 한국총판 홈"><img src="${c.asset(`img/${file}.png`)}" width="${w}" height="${h}" alt="${BRAND.nameEn}"><span class="logo-tag">한국총판</span></a>`;
}

const ext = ' target="_blank" rel="noopener"';

function header(c) {
  const nav = NAV.map(([s, l]) => `<li><a href="${c.url(s)}"${c.slug === s ? ' aria-current="page"' : ''}>${l}</a></li>`).join('');
  const [join, agent] = LINKS;
  return `<a class="skip" href="#main">본문으로 건너뛰기</a>
<div class="util">
  <div class="wrap util-in">
    <p>${BRAND.tag} · ${BRAND.company}</p>
    <ul>
      <li><a href="${join.href}"${ext}>${icon('user')}${join.title}<small>${join.who}</small></a></li>
      <li><a href="${agent.href}"${ext}>${icon('headset')}${agent.title}</a></li>
      <li><a href="${BRAND.phoneHref}">${icon('phone')}${BRAND.phone}</a></li>
    </ul>
  </div>
</div>
<header class="site-header" data-header>
  <div class="wrap header-in">
    ${logo(c)}
    <nav class="gnav" aria-label="주 메뉴"><ul>${nav}</ul></nav>
    <div class="header-tools">
      ${btn(BRAND.free, HOME.start, { variant: 'primary', ic: '', ext: true, cls: 'btn-sm header-cta' })}
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mnav" aria-label="메뉴 열기" data-menu-btn><span></span></button>
    </div>
  </div>
</header>
<div class="mnav" id="mnav" data-mnav hidden>
  <div class="mnav-in">
    <nav aria-label="주 메뉴"><ul class="mnav-links">
      <li><a href="${c.url('')}"${c.slug === '' ? ' aria-current="page"' : ''}>홈</a></li>
      ${NAV.map(([s, l]) => `<li><a href="${c.url(s)}"${c.slug === s ? ' aria-current="page"' : ''}>${l}</a></li>`).join('')}
    </ul></nav>
    <div class="mnav-quick">${LINKS.slice(0, 2).map(l => `<a href="${l.href}"${ext}>${icon(l.icon)}<b>${l.title}</b><small>${l.who}</small></a>`).join('')}</div>
    ${btn(BRAND.free, HOME.start, { variant: 'primary', ext: true, cls: 'btn-block' })}
    <div class="mnav-contact">
      <a href="${BRAND.phoneHref}">${icon('phone')}${BRAND.phone}</a>
      <a href="${BRAND.kakao}"${ext}>${icon('chat')}카카오톡 상담</a>
      <a href="mailto:${BRAND.email}">${icon('mail')}${BRAND.email}</a>
    </div>
  </div>
</div>`;
}

function footer(c) {
  return `<footer class="site-footer">
  <div class="wrap">
    <div class="f-top">
      <div class="f-brand">${logo(c, 'logo-footer')}<p>${HOME.title}</p></div>
      <nav class="f-nav" aria-label="바닥 메뉴"><ul><li><a href="${c.url('')}">홈</a></li>${NAV.map(([s, l]) => `<li><a href="${c.url(s)}">${l}</a></li>`).join('')}</ul></nav>
      <div class="f-quick">
        <p class="f-h">바로가기</p>
        ${LINKS.map(l => `<a href="${l.href}"${ext}>${l.title}<small>${l.host}</small></a>`).join('')}
        <a href="${BRAND.site}"${ext}>공식 사이트<small>getscreen.kr</small></a>
      </div>
      <div class="f-contact">
        <a class="f-tel" href="${BRAND.phoneHref}"><small>전화 상담</small>${BRAND.phone}</a>
        <a href="mailto:${BRAND.email}">${icon('mail')}${BRAND.email}</a>
        <a href="${BRAND.kakao}"${ext}>${icon('chat')}카카오톡 상담</a>
        <a href="${BRAND.blog}"${ext}>${icon('doc')}공식 블로그</a>
      </div>
    </div>
    <div class="f-info">
      <p><b>${BRAND.nameEn} 한국총판</b><span>상호: ${BRAND.company}</span><span>대표자: <em class="ph-inline">${BRAND.placeholder}</em></span></p>
      <p><span>주소: <em class="ph-inline">${BRAND.placeholder}</em></span><span>사업자등록번호: <em class="ph-inline">${BRAND.placeholder}</em></span></p>
    </div>
    <div class="f-bottom">
      <p class="f-note">이 사이트는 홈페이지 제작 시안입니다. 표시한 자리와 일부 문구는 실제 자료로 바꿀 예정입니다. 로고와 제품 화면은 공식 블로그 이미지에서 잘라 쓴 임시 자료입니다.</p>
      <p class="f-copy">© 2026 ${BRAND.company}</p>
    </div>
  </div>
</footer>`;
}

function floatChat() {
  return `<div class="float" data-float>
  <a class="float-kakao" href="${BRAND.kakao}"${ext} aria-label="카카오톡 상담">${icon('chat')}<span>카톡 상담</span></a>
  <a class="float-tel" href="${BRAND.phoneHref}" aria-label="전화 상담 ${BRAND.phone}">${icon('phone')}<span>${BRAND.phone}</span></a>
</div>`;
}

export function page(c, { title, desc, body, bodyClass = '' }) {
  const full = title ? `${title} · ${BRAND.name}` : `${BRAND.name} · ${HOME.title}`;
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
<meta property="og:site_name" content="${esc(BRAND.name)}">
<meta property="og:title" content="${esc(full)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${c.abs()}">
<meta property="og:image" content="${BASE_URL}assets/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="ko_KR">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#1F5EFF">
<link rel="icon" href="${c.asset('favicon.png')}" type="image/png" sizes="64x64">
<link rel="apple-touch-icon" href="${c.asset('img/touch-icon.png')}">
<link rel="stylesheet" href="${c.asset('fonts/pretendard/pretendardvariable-dynamic-subset.css')}">
<link rel="stylesheet" href="${c.asset('css/site.css')}">
<script>document.documentElement.classList.replace('no-js','js');setTimeout(function(){if(!window.__gs)document.documentElement.classList.add('no-motion-fallback')},2500)</script>
<script src="${c.asset('js/site.js')}" defer></script>
</head>
<body class="${bodyClass}">
${header(c)}
<main id="main">
${body}
</main>
${footer(c)}
${floatChat()}
<div class="toast" role="status" aria-live="polite" data-toast></div>
</body>
</html>
`;
}

export function pageHero(c, { eb, title, lede, crumb }) {
  return `<section class="page-hero">
  <div class="hero-grid" aria-hidden="true"></div>
  <div class="wrap page-hero-in">
    <nav class="crumbs" aria-label="현재 위치"><a href="${c.url('')}">홈</a><span aria-hidden="true">/</span><span aria-current="page">${crumb}</span></nav>
    ${eyebrow(eb)}
    <h1 class="page-title" data-reveal>${lines(title)}</h1>
    ${lede ? `<p class="page-lede" data-reveal style="--d:.1s">${lede}</p>` : ''}
  </div>
</section>`;
}

export function ctaBand(c) {
  return `<section class="cta-band">
  <div class="wrap">
    <div class="cta-card">
      <div class="cta-text">
        <h2 class="cta-title" data-reveal>${lines(HOME.ctaTitle)}</h2>
        <p data-reveal style="--d:.08s">${HOME.ctaText}</p>
      </div>
      <div class="cta-side" data-reveal style="--d:.14s">
        <div class="cta-btns">${btn(c.url('contact/'), HOME.demo, { variant: 'white' })}${btn(BRAND.free, HOME.start, { variant: 'ghost-light', ext: true })}</div>
        <ul class="cta-lines">
          <li><a href="${BRAND.phoneHref}">${icon('phone')}${BRAND.phone}</a></li>
          <li><a href="${BRAND.kakao}"${ext}>${icon('chat')}카카오톡 상담</a></li>
          <li><a href="mailto:${BRAND.email}">${icon('mail')}${BRAND.email}</a></li>
        </ul>
      </div>
    </div>
  </div>
</section>`;
}
