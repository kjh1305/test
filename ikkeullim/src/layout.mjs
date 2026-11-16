/* 공통 레이아웃: <head>, 헤더, 모바일 메뉴, 푸터, 모바일 하단 바, 공통 조각 */
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { BASE_URL, PH, CO, NAV, CHAT } from './content.mjs';

const hashOf = f => createHash('md5').update(readFileSync(new URL('../assets/' + f, import.meta.url))).digest('hex').slice(0, 8);
const VER = { css: hashOf('css/site.css'), js: hashOf('js/site.js'), ico: hashOf('favicon.png') };

export const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
export const br = a => (Array.isArray(a) ? a : [a]).map(l => `<span class="ln">${l}</span>`).join('');
export const ph = (label = PH) => `<em class="ph">${label}</em>`;
export const val = (v, f = x => esc(x)) => (v ? f(v) : ph());
export const telHref = p => 'tel:' + String(p).replace(/[^0-9+]/g, '');
export const pad = n => String(n).padStart(2, '0');

/* 페이지마다 상대 경로를 맞춰 줌 */
export function ctx(slug) {
  const depth = slug === '' || slug === '404.html' ? 0 : slug.split('/').filter(Boolean).length;
  const up = slug === '404.html' ? '/test/ikkeullim/' : '../'.repeat(depth) || './';
  return { slug, url: p => up + p, asset: p => up + 'assets/' + p };
}

const I = {
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowUpRight: '<path d="M7 17 17 7M8 7h9v9"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  check: '<path d="m5 12 5 5L20 7"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-9 9"/>',
  star: '<path d="M12 3.5 14.4 9l5.9.5-4.5 3.9 1.4 5.8L12 16.1 6.8 19.2l1.4-5.8L3.7 9.5 9.6 9z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/>',
  chevron: '<path d="m9 6 6 6-6 6"/>',
  up: '<path d="m6 15 6-6 6 6"/>',
  chat: '<path d="M12 4C7 4 3 7.1 3 11c0 2.5 1.6 4.6 4 5.9L6.2 20l3.7-2.3c.7.1 1.4.2 2.1.2 5 0 9-3.1 9-7s-4-7-9-7z"/>'
};
export const icon = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${I[n]}</svg>`;

/* 로고 마크: 업체 로고(실버 A + 하늘색 화살표 + 별)를 같은 모양으로 다시 그린 것. 원본 파일을 받으면 바꿈 */
let markN = 0;
export const mark = (cls = '') => {
  const k = 'm' + (markN++);
  return `<svg class="mark ${cls}" viewBox="0 0 132 112" aria-hidden="true" focusable="false"><defs><linearGradient id="${k}a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F4F6F8"/><stop offset=".55" stop-color="#B9C0C8"/><stop offset="1" stop-color="#7E8792"/></linearGradient><linearGradient id="${k}s" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#5E97D6"/><stop offset=".6" stop-color="#9CC8F2"/><stop offset="1" stop-color="#CFE6FF"/></linearGradient></defs><path d="M12 104 52 8h8l38 96H80L56 44 33 92Z" fill="url(#${k}a)"/><path d="M6 106c30-8 54-32 94-46l-3-8 24-5-14 21-3-5c-37 14-59 37-79 43Z" fill="url(#${k}s)"/><path d="m118 6 2.5 9 8.5 2.5-8.5 2.5-2.5 9-2.5-9-8.5-2.5 8.5-2.5Z" fill="#A9D2FA"/></svg>`;
};

export const btn = (href, label, { variant = 'primary', cls = '', ext = false, ic = 'arrow' } = {}) =>
  `<a class="btn btn-${variant} ${cls}" href="${href}"${ext ? ' target="_blank" rel="noopener"' : ''}><span>${label}</span>${ic ? icon(ic) : ''}</a>`;

/* 상담 버튼: 카카오톡 주소가 있으면 새 창으로 채팅, 없으면 상담 안내 페이지 */
export const kakaoHref = c => CO.kakao || c.url('contact/');
export const kakaoBtn = (c, label = '카카오톡 상담', { variant = 'primary', cls = '' } = {}) =>
  `<a class="btn btn-${variant} ${cls}" href="${kakaoHref(c)}"${CO.kakao ? ' target="_blank" rel="noopener"' : ''} data-chat-open>${icon('chat', 'ic-chat')}<span>${label}</span></a>`;

export function secHead({ no, title, sub, cls = '', id = '' }) {
  return `<div class="sec-head ${cls}" data-reveal>
    ${no ? `<p class="sec-no"><span>${pad(no)}</span></p>` : ''}
    <h2 class="sec-title"${id ? ` id="${id}"` : ''}>${br(title)}</h2>
    ${sub ? `<p class="sec-sub">${sub}</p>` : ''}
  </div>`;
}

const logo = (c, cls = '') => `<a class="logo ${cls}" href="${c.url('')}" aria-label="${CO.name} 홈">${mark()}<span class="logo-word">${CO.name}</span></a>`;

function header(c) {
  const item = ([href, label]) => `<li><a href="${c.url(href)}"${c.slug === href ? ' aria-current="page"' : ''}>${label}</a></li>`;
  return `<a class="skip" href="#main">본문 바로가기</a>
<header class="site-header" data-header>
  <div class="wrap header-in">
    ${logo(c)}
    <nav class="gnav" aria-label="주 메뉴"><ul>${NAV.filter(n => n[0] !== 'contact/').map(item).join('')}</ul></nav>
    <div class="header-tools">
      ${kakaoBtn(c, '카카오톡 상담', { cls: 'btn-sm header-cta' })}
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mnav" data-menu-btn><span></span><b class="sr">메뉴 열기</b></button>
    </div>
  </div>
</header>
<div class="mnav" id="mnav" data-mnav hidden>
  <div class="wrap mnav-in">
    <ul class="mnav-links">${[['', '홈'], ...NAV].map(item).join('')}</ul>
    <div class="mnav-foot">${kakaoBtn(c, '카카오톡으로 상담하기', { cls: 'btn-block' })}</div>
  </div>
</div>`;
}

function footer(c) {
  const info = [['상호', CO.full], ['대표', val(CO.ceo)], ['사업자등록번호', val(CO.bizNo)], ['주소', val(CO.address)], ['전화', val(CO.phone, p => `<a href="${telHref(p)}">${esc(p)}</a>`)], ['이메일', val(CO.email)], ['운영시간', val(CO.hours)]];
  return `<footer class="site-footer">
  <div class="wrap">
    <div class="f-top">
      <div class="f-brand">${logo(c, 'logo-footer')}<p class="f-slogan">${CO.slogan}</p></div>
      <nav class="f-nav" aria-label="하단 메뉴"><ul>${NAV.map(([h, l]) => `<li><a href="${c.url(h)}">${l}</a></li>`).join('')}</ul></nav>
    </div>
    <dl class="f-info">${info.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
    <div class="f-bottom"><p>© 2026 ${CO.full}. All rights reserved.</p><p>홈페이지 제작 시안입니다.</p></div>
  </div>
</footer>`;
}

/* 모바일 하단 바와 PC 오른쪽 아래 떠 있는 버튼: 누르면 채팅 모양 상담 창이 열림.
   상담 창은 대화를 시작하는 곳이고, 실제 상담은 '카카오톡으로 이어서 상담하기'로 카카오톡에서 진행.
   JS가 꺼져 있으면 버튼은 그냥 카카오톡(또는 상담 안내 페이지)으로 감 */
function quickbar(c) {
  const ext = CO.kakao ? ' target="_blank" rel="noopener"' : '';
  const data = JSON.stringify({ hello: CHAT.hello, options: CHAT.options, next: CHAT.next, copyTpl: CHAT.copyTpl, kakao: kakaoHref(c), ext: !!CO.kakao, hasKakao: !!CO.kakao }).replace(/</g, '\\u003c');
  return `<a class="quickbar" href="${kakaoHref(c)}"${ext} data-chat-open>${icon('chat')}카카오톡으로 상담하기</a>
<a class="fl-kakao" href="${kakaoHref(c)}"${ext} aria-label="상담 창 열기" data-chat-open data-chat-fab>${icon('chat')}<span>상담</span></a>
<section class="chat" id="chat" role="dialog" aria-modal="false" aria-labelledby="chat-name" data-chat hidden>
  <header class="chat-hd">
    <span class="chat-av">${mark()}</span>
    <div><p class="chat-name" id="chat-name">${CO.name}</p><p class="chat-status"><span class="chat-dot" aria-hidden="true"></span>${CHAT.status}</p></div>
    <button type="button" class="chat-x" data-chat-close aria-label="상담 창 닫기">${icon('close')}</button>
  </header>
  <div class="chat-log" data-chat-log aria-live="polite"></div>
  <div class="chat-ft" data-chat-ft></div>
  <script type="application/json" data-chat-data>${data}</script>
</section>`;
}

export function page(c, { title, desc, body, bodyClass = '' }) {
  const full = title ? `${title} | ${CO.full}` : `${CO.full} | ${CO.slogan}`;
  const canonical = BASE_URL + (c.slug === '404.html' ? '' : c.slug);
  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(full)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(full)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${BASE_URL}assets/og.png">
<meta name="theme-color" content="#060709">
<link rel="icon" href="${c.asset('favicon.png')}?v=${VER.ico}" type="image/png">
<link rel="apple-touch-icon" href="${c.asset('apple-touch-icon.png')}?v=${VER.ico}">
<link rel="stylesheet" href="${c.asset('fonts/pretendard/pretendardvariable-dynamic-subset.css')}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap">
<link rel="stylesheet" href="${c.asset('css/site.css')}?v=${VER.css}">
<script>document.documentElement.classList.add('js')</script>
<script src="${c.asset('js/site.js')}?v=${VER.js}" defer></script>
</head>
<body class="${bodyClass}">
${header(c)}
<main id="main" tabindex="-1">
${body}
</main>
${footer(c)}
${quickbar(c)}
<div class="toast" role="status" aria-live="polite" data-toast></div>
</body>
</html>
`;
}

export function pageHead(c, { kicker, title, lede }) {
  return `<section class="page-head">
  <div class="page-glow" aria-hidden="true"></div>
  <div class="wrap">
    <p class="page-kicker">${kicker}</p>
    <h1 class="page-title">${br(title)}</h1>
    ${lede ? `<p class="page-lede">${lede}</p>` : ''}
  </div>
</section>`;
}

export function ctaBand(c) {
  return `<section class="cta" aria-labelledby="cta-title">
  <div class="cta-glow" aria-hidden="true"></div>
  <div class="wrap cta-in" data-reveal>
    ${mark('cta-mark')}
    <h2 class="cta-title" id="cta-title">${br(['끌리는 브랜드는', '검색에서 시작됩니다'])}</h2>
    <p class="cta-text">카카오톡으로 블로그나 홈페이지 주소를 보내 주세요. 지금 상태를 무료로 진단하고, 업종에 맞는 시작점을 안내해 드립니다.</p>
    <div class="cta-btns">${kakaoBtn(c, '카카오톡으로 무료 상담')}${btn(c.url('pricing/'), '상품 보기', { variant: 'ghost' })}</div>
  </div>
</section>`;
}
