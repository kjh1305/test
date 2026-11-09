/* =========================================================
   공통 레이아웃: <head>, 헤더(언어 전환 포함), 모바일 메뉴, 푸터
   ========================================================= */
import { LANGS, BASE_URL, CO, UI, HOME, SUGGEST, t } from './content.mjs';
import { logoMark, icon, dieline } from './art.mjs';

export const SLUGS = ['', 'about/', 'products/', 'quality/', 'contact/'];
const NAV = [['about/', 'about'], ['products/', 'products'], ['quality/', 'quality'], ['contact/', 'contact']];
const OG_LOCALE = { ko: 'ko_KR', en: 'en_US', ja: 'ja_JP', vi: 'vi_VN', th: 'th_TH' };
const CODE = { ko: 'KO', en: 'EN', ja: 'JA', vi: 'VI', th: 'TH' };

export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function ctx(lang, slug) {
  const L = LANGS.find(l => l.code === lang);
  const path = L.prefix + slug;
  const depth = path.split('/').length - 1;
  const root = depth ? '../'.repeat(depth) : './';
  const pre = code => LANGS.find(l => l.code === code).prefix;
  return {
    lang, slug, path, root,
    tr: v => t(v, lang),
    url: (s = '', code = lang) => root + pre(code) + s,
    asset: p => root + 'assets/' + p,
    abs: (s = slug, code = lang) => BASE_URL + pre(code) + s
  };
}

/* ---------- 작은 조각 ---------- */
export const btn = (href, label, { variant = 'primary', ic = 'arrow', ext = false, cls = '', attrs = '' } = {}) =>
  `<a class="btn btn-${variant} ${cls}" href="${esc(href)}"${ext ? ' target="_blank" rel="noopener"' : ''} ${attrs}><span>${label}</span>${ic ? icon(ext ? 'external' : ic) : ''}</a>`;

export const lines = arr => (Array.isArray(arr) ? arr : [arr]).map(s => `<span class="ln">${s}</span>`).join(' ');

export const eyebrow = (txt, cls = '') => `<p class="eyebrow ${cls}"><span class="eb-fold" aria-hidden="true"></span>${txt}</p>`;

export function secHead({ eb, title, sub, cls = '' }) {
  return `<div class="sec-head ${cls}">
    ${eb ? eyebrow(eb) : ''}
    <h2 class="sec-title" data-reveal>${lines(title)}</h2>
    ${sub ? `<p class="sec-sub" data-reveal style="--d:.08s">${sub}</p>` : ''}
  </div>`;
}

function langList(c, cls) {
  return `<ul class="${cls}">${LANGS.map(l => `<li><a href="${c.url(c.slug, l.code)}" hreflang="${l.html}" lang="${l.html}" data-lang-link="${l.code}"${l.code === c.lang ? ' aria-current="true"' : ''}><span>${l.name}</span><small>${CODE[l.code]}</small></a></li>`).join('')}</ul>`;
}

function logo(c, cls = '') {
  const main = c.tr(CO.brand);
  const sub = c.lang === 'ko' ? 'GLOBAL KOREA TRAY' : '글로벌 코리아트레이';
  return `<a class="logo ${cls}" href="${c.url('')}" aria-label="${esc(main)} ${esc(c.tr(UI.home))}">${logoMark()}<span class="logo-text"><b>${main}</b><small lang="${c.lang === 'ko' ? 'en' : 'ko'}">${sub}</small></span></a>`;
}

/* ---------- 헤더 ---------- */
function header(c) {
  const nav = NAV.map(([s, key]) => `<li><a href="${c.url(s)}"${c.slug === s ? ' aria-current="page"' : ''}>${c.tr(UI.nav[key])}</a></li>`).join('');
  const cur = LANGS.find(l => l.code === c.lang);
  return `<a class="skip" href="#main">${c.tr(UI.skip)}</a>
<header class="site-header on-dark" data-header>
  <div class="wrap header-in">
    ${logo(c)}
    <nav class="gnav" aria-label="${esc(c.tr(UI.nav.about))}, ${esc(c.tr(UI.nav.products))}"><ul>${nav}</ul></nav>
    <div class="header-tools">
      <details class="lang" data-lang-menu>
        <summary aria-label="${esc(c.tr(UI.language))}: ${cur.name}">${icon('globe')}<span>${CODE[c.lang]}</span>${icon('chevron', 'ic chev')}</summary>
        <div class="lang-pop">${langList(c, 'lang-list')}</div>
      </details>
      <a class="btn btn-primary btn-sm header-cta" href="${c.url('contact/')}"><span>${c.tr(UI.quote)}</span></a>
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mnav" data-menu-btn data-open="${esc(c.tr(UI.menuOpen))}" data-close="${esc(c.tr(UI.menuClose))}" aria-label="${esc(c.tr(UI.menuOpen))}"><span></span></button>
    </div>
  </div>
</header>
<div class="mnav" id="mnav" data-mnav hidden>
  <div class="mnav-in">
    <nav aria-label="${esc(c.tr(UI.nav.about))}"><ul class="mnav-links">
      <li><a href="${c.url('')}"${c.slug === '' ? ' aria-current="page"' : ''}>${c.tr(UI.home)}</a></li>
      ${NAV.map(([s, key]) => `<li><a href="${c.url(s)}"${c.slug === s ? ' aria-current="page"' : ''}>${c.tr(UI.nav[key])}</a></li>`).join('')}
    </ul></nav>
    <a class="btn btn-primary btn-block" href="${c.url('contact/')}"><span>${c.tr(UI.quote)}</span>${icon('arrow')}</a>
    <div class="mnav-langs"><p>${icon('globe')}${c.tr(UI.language)}</p>${langList(c, 'mnav-lang-list')}</div>
    <div class="mnav-contact">
      <a href="${CO.telHref}">${icon('phone')}${c.tr(CO.tel)}</a>
      <a href="mailto:${CO.email}">${icon('mail')}${CO.email}</a>
    </div>
  </div>
</div>`;
}

/* ---------- 푸터 ---------- */
function footer(c) {
  const L = UI.labels;
  const nav = [['', UI.home], ...NAV.map(([s, k]) => [s, UI.nav[k]])].map(([s, v]) => `<li><a href="${c.url(s)}">${c.tr(v)}</a></li>`).join('');
  return `<footer class="site-footer">
  <div class="wrap">
    <div class="f-top">
      <div class="f-brand">
        ${logo(c, 'logo-footer')}
        <p class="f-tag">${c.tr(HOME.eyebrow)}</p>
      </div>
      <nav class="f-nav" aria-label="${esc(c.tr(UI.nav.about))}"><ul>${nav}</ul></nav>
      <div class="f-contact">
        <a href="${CO.telHref}">${icon('phone')}<span><small>${c.tr(L.tel)}</small>${c.tr(CO.tel)}</span></a>
        <a href="${CO.mobileHref}">${icon('phone')}<span><small>${c.tr(L.mobile)}</small>${c.tr(CO.mobile)}</span></a>
        <a href="mailto:${CO.email}">${icon('mail')}<span><small>${c.tr(L.email)}</small>${CO.email}</span></a>
        <a href="${CO.blog}" target="_blank" rel="noopener">${icon('blog')}<span><small>${c.tr(L.blog)}</small>${c.tr(CO.blogName)}</span></a>
      </div>
    </div>
    <div class="f-info">
      <p><b>${c.tr(CO.legal)}</b><span>${c.tr(L.ceo)} ${c.tr(CO.ceo)}</span></p>
      <p><span>${c.tr(L.factory)} ${c.tr(CO.factory)}</span></p>
      <p><span>${c.tr(L.seoul)} ${c.tr(CO.seoul)}</span></p>
    </div>
    <div class="f-bottom">
      <p class="f-note">${c.tr(UI.footerNote)}</p>
      <div class="f-langs">${icon('globe')}${langList(c, 'f-lang-list')}</div>
      <p class="f-copy">© 2026 ${c.tr(CO.legal)}</p>
    </div>
  </div>
</footer>`;
}

/* ---------- 문서 전체 ---------- */
export function page(c, { title, desc, body, bodyClass = '' }) {
  const brand = c.tr(CO.brand);
  const fullTitle = title ? `${title} · ${brand}` : `${brand} · ${c.tr(HOME.title)}`;
  const alt = LANGS.map(l => `<link rel="alternate" hreflang="${l.html}" href="${c.abs(c.slug, l.code)}">`).join('\n') + `\n<link rel="alternate" hreflang="x-default" href="${c.abs(c.slug, 'ko')}">`;
  const jpFonts = c.lang === 'ja' || c.lang === 'vi';
  const suggest = {};
  LANGS.forEach(l => { suggest[l.code] = { text: SUGGEST[l.code], go: SUGGEST.go[l.code], href: c.url(c.slug, l.code), close: t(SUGGEST.close, l.code) }; });
  return `<!doctype html>
<html lang="${c.lang}" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="noindex, nofollow">
<link rel="canonical" href="${c.abs()}">
${alt}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(brand)}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${c.abs()}">
<meta property="og:image" content="${BASE_URL}assets/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="${OG_LOCALE[c.lang]}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0F3327">
<link rel="icon" href="${c.asset('favicon.svg')}" type="image/svg+xml">
<link rel="stylesheet" href="${c.asset('fonts/pretendard/pretendardvariable-dynamic-subset.css')}">
${jpFonts ? `<link rel="stylesheet" href="${c.asset('fonts/pretendard-jp/pretendardvariable-jp-dynamic-subset.css')}">\n` : ''}<link rel="stylesheet" href="${c.asset('css/site.css')}">
<script>document.documentElement.classList.replace('no-js','js');setTimeout(function(){if(!window.__kt)document.documentElement.classList.add('no-motion-fallback')},2500)</script>
<script src="${c.asset('js/site.js')}" defer></script>
</head>
<body class="${bodyClass}" data-lang="${c.lang}" data-slug="${c.slug}">
${header(c)}
<main id="main">
${body}
</main>
${footer(c)}
<div class="toast" role="status" aria-live="polite" data-toast></div>
<script type="application/json" id="kt-suggest">${JSON.stringify(suggest).replace(/</g, '\\u003c')}</script>
</body>
</html>
`;
}

/* ---------- 하위 페이지 첫 화면 ---------- */
export function pageHero(c, { eb, title, lede, crumb }) {
  return `<section class="page-hero mat" data-dark>
  <div class="mat-grid" aria-hidden="true"></div>
  <div class="wrap page-hero-in">
    <div class="page-hero-text">
      <nav class="crumbs" aria-label="breadcrumb"><a href="${c.url('')}">${c.tr(UI.home)}</a><span aria-hidden="true">/</span><span aria-current="page">${crumb}</span></nav>
      ${eyebrow(eb, 'on-dark')}
      <h1 class="page-title" data-reveal>${lines(title)}</h1>
      ${lede ? `<p class="page-lede" data-reveal style="--d:.1s">${lede}</p>` : ''}
    </div>
    <div class="page-hero-art" aria-hidden="true">${dieline({ W: 200, D: 140, H: 50, theme: 'dark', dims: true, marks: true, draw: true, fill: true, cls: 'hero-dl' })}</div>
  </div>
  <div class="ruler" aria-hidden="true"></div>
</section>`;
}

/* ---------- 문의 띠 ---------- */
export function ctaBand(c) {
  return `<section class="cta-band mat" data-dark>
  <div class="mat-grid" aria-hidden="true"></div>
  <div class="wrap cta-in">
    <div>
      ${eyebrow(c.tr(UI.quote), 'on-dark')}
      <h2 class="cta-title" data-reveal>${lines(c.tr(HOME.ctaTitle))}</h2>
      <p class="cta-text" data-reveal style="--d:.08s">${c.tr(HOME.ctaText)}</p>
    </div>
    <div class="cta-side" data-reveal style="--d:.14s">
      <div class="cta-btns">
        ${btn(c.url('contact/'), c.tr(UI.quote), { variant: 'kraft' })}
        ${btn(c.url('contact/') + '?type=sample', c.tr(UI.sample), { variant: 'ghost-light' })}
      </div>
      <ul class="cta-lines">
        <li><a href="${CO.telHref}">${icon('phone')}<span><small>${c.tr(UI.labels.tel)}</small>${c.tr(CO.tel)}</span></a></li>
        <li><a href="${CO.mobileHref}">${icon('phone')}<span><small>${c.tr(UI.labels.mobile)}</small>${c.tr(CO.mobile)}</span></a></li>
        <li><a href="mailto:${CO.email}">${icon('mail')}<span><small>${c.tr(UI.labels.email)}</small>${CO.email}</span></a></li>
      </ul>
    </div>
  </div>
</section>`;
}

/* ---------- 메인 첫 화면의 접히는 트레이 (CSS 3D) ---------- */
export function foldTray(c) {
  const W = 240, D = 168, H = 60, pad = 34;
  const x0 = -H - pad, y0 = -H - pad, w = W + 2 * H + 2 * pad, h = D + 2 * H + 2 * pad;
  const u = n => `calc(var(--u) * ${n})`;
  const dl = dieline({ W, D, H, theme: 'dark', dims: true, marks: true, draw: true, fill: false, cls: 'dl' })
    .replace('<svg class="dl"', `<svg class="dl" style="left:${u(x0)};top:${u(y0)};width:${u(w)};height:${u(h)}"`);
  const wall = (k, extra = '') => `<div class="w ${k}"><i class="f in"></i><i class="f out">${extra}</i>${k === 'n' || k === 's' ? '<i class="tab l"></i><i class="tab r"></i>' : ''}</div>`;
  return `<div class="fold" data-fold>
  <div class="fold-stage" aria-hidden="true">
    <div class="fold-scene">
      <div class="fold-shadow"></div>
      <div class="fold-lift">
        <div class="tray3d">
          <div class="f base"><span class="print">${logoMark('print-mark')}<b>KOREA TRAY</b></span></div>
          ${wall('n')}${wall('s', '<b class="wall-print">KOREA TRAY</b>')}${wall('wl')}${wall('e')}
          ${dl}
        </div>
      </div>
    </div>
  </div>
  <div class="fold-ui">
    <ul class="fold-legend">
      <li><span class="lg lg-fold" aria-hidden="true"></span>${c.tr(HOME.fold)}</li>
      <li><span class="lg lg-cut" aria-hidden="true"></span>${c.tr(HOME.cut)}</li>
    </ul>
    <button type="button" class="fold-replay" data-fold-replay>${icon('replay')}<span>${c.tr(HOME.replay)}</span></button>
  </div>
</div>`;
}
