/* 공통 레이아웃: <head>, 헤더, 모바일 메뉴, 푸터, 모바일 하단 상담 바, TOP 버튼, 사진 자리, 상태 배지 */
import { BASE_URL, PH, CO, NAV, STATUS } from './content.mjs';
import { icon, productIcon, heroArt } from './art.mjs';

export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const lines = arr => (Array.isArray(arr) ? arr : [arr]).map(s => `<span class="ln">${s}</span>`).join(' ');

/* slug: '' (홈), 'about/', 'products/' … '404.html'. 깊이에 맞춰 상대 주소를 만들어 GitHub Pages 하위 폴더에서도 그대로 동작 */
export function ctx(slug) {
  const depth = slug.split('/').length - 1;
  const root = depth ? '../'.repeat(depth) : './';
  return { slug, root, url: (s = '') => root + s, asset: p => root + 'assets/' + p, abs: (s = slug) => BASE_URL + (s === '404.html' ? '' : s) };
}

/* ---------- 채울 자리 ---------- */
export const ph = (t = PH, cls = '') => `<span class="ph ${cls}">${t}</span>`;
export const val = (v, fmt = x => x) => (v ? fmt(v) : ph());

const digits = s => String(s).replace(/[^0-9+]/g, '');
export const tel = (p = CO.phone) => 'tel:' + digits(p);
export const sms = (p = CO.sms) => 'sms:' + digits(p);

/* ---------- 버튼 ---------- */
export const btn = (href, label, { variant = 'amber', ic = 'chevron', ext = false, cls = '' } = {}) =>
  `<a class="btn btn-${variant} ${cls}" href="${esc(href)}"${ext ? ' target="_blank" rel="noopener"' : ''}><span>${label}</span>${ext ? icon('external') : ic ? icon(ic) : ''}</a>`;

/* 연락 버튼 3종: 전화, 문자·사진, 카카오톡(주소가 없으면 채울 자리) */
export const callBtn = (cls = '') => `<a class="btn btn-call ${cls}" href="${tel()}">${icon('phone')}<span class="bt"><small>대표전화</small>${CO.phone}</span></a>`;
export const smsBtn = (cls = '') => `<a class="btn btn-sms ${cls}" href="${sms()}">${icon('sms')}<span class="bt"><small>문자 · 사진 상담</small>${CO.sms}</span></a>`;
export const kakaoBtn = (cls = '') => CO.kakao.url
  ? `<a class="btn btn-kakao ${cls}" href="${esc(CO.kakao.url)}" target="_blank" rel="noopener">${icon('talk')}<span class="bt"><small>카카오톡 채널</small>${CO.kakao.name}</span></a>`
  : `<span class="btn btn-kakao is-ph ${cls}" role="link" aria-disabled="true" title="카카오톡 채널 주소: ${PH}">${icon('talk')}<span class="bt"><small>카카오톡 채널 · 주소 자리</small>${CO.kakao.name}</span></span>`;

/* 링크 주소를 모르는 자리 (href 없는 a = 자리만 잡아 둔 링크) */
export const phLink = (label, cls = 'more') => `<a class="${cls} is-ph-link" role="link" aria-disabled="true" title="링크 주소: ${PH}">${label}<span class="ph-tag">링크 자리</span></a>`;

/* ---------- 사진 자리 ----------
   slot = { img: null }               → 사진 대신 제품 선 그림 카드 (pic 이름, 없으면 'steel'). 점선 '채울 자리'는 쓰지 않습니다.
   slot = { img: 'x.webp', w, h, alt } → assets/img/x.webp */
export function photo(c, slot, { label = '사진', ratio = '4 / 3', cls = '', pic = '', eager = false, mark = '', sizes = '(max-width: 760px) 100vw, 560px' } = {}) {
  if (slot && slot.img) {
    /* 블로그 사진(log-*)은 640px 작은 판이 있어 화면에 맞는 크기를 받습니다 */
    const set = /^log-/.test(slot.img) ? ` srcset="${c.asset('img/' + slot.img.replace('.webp', '-640.webp'))} 640w, ${c.asset('img/' + slot.img)} ${slot.w}w" sizes="${sizes}"` : '';
    return `<div class="slot has-img ${cls}" style="--ar:${ratio}"><img src="${c.asset('img/' + slot.img)}"${set} width="${slot.w}" height="${slot.h}" alt="${esc(slot.alt || '')}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async"></div>`;
  }
  return `<div class="slot is-art ${cls}" style="--ar:${ratio}" role="img" aria-label="${esc(label)} 그림">
    <span class="art-grid" aria-hidden="true"></span>
    ${productIcon(pic || 'steel', 'pic slot-pic')}${mark ? `<span class="art-mark" aria-hidden="true">${mark}</span>` : ''}
  </div>`;
}

/* 바탕 그림 자리: 사진이 있으면 사진, 없으면 SVG 그림 (첫 화면, 패널) */
export function backdrop(c, slot, art, uid, { eager = false } = {}) {
  if (slot && slot.img) return `<img class="bg-img" src="${c.asset('img/' + slot.img)}" width="${slot.w}" height="${slot.h}" alt="${esc(slot.alt || '')}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async">`;
  return heroArt(art, uid);
}

/* ---------- 상태 배지 ----------
   방화셔터: STATUS 문구 그대로 (인정서 보유 / 시험 통과 · 인정서 발급 대기 / 시험 전 · 판매 불가)
   그 밖의 제품: tag (단열 · 내풍압, 현장 맞춤 제작 …) */
const STATUS_IC = { cert: 'shield', pending: 'clock', notsale: 'slash' };
export function badge(p) {
  if (p.status) {
    const s = STATUS[p.status];
    return `<span class="badge badge-${s.tone}">${icon(STATUS_IC[s.tone])}${s.label}</span>`;
  }
  return `<span class="badge badge-tag">${p.tag}</span>`;
}

/* ---------- 섹션 제목: 영문 작은 글자 + 한글 제목 ---------- */
export function secHead({ en, title, sub, center = false, light = false, id = '' }) {
  return `<div class="sec-head${center ? ' is-center' : ''}${light ? ' is-light' : ''}" data-reveal>
    <h2 class="sec-title"${id ? ` id="${id}"` : ''}>${lines(title)}</h2>
    ${sub ? `<p class="sec-sub">${sub}</p>` : ''}
  </div>`;
}

const logo = (c, cls = '') => `<a class="logo ${cls}" href="${c.url('')}" aria-label="${CO.brand} 홈"><b>${CO.brand}</b><small>${CO.sub}</small></a>`;

function header(c) {
  const cur = s => s && c.slug.startsWith(s);
  const item = ([s, label]) => `<li><a href="${c.url(s)}"${cur(s) || c.slug === s ? ' aria-current="page"' : ''}>${label}</a></li>`;
  return `<a class="skip" href="#main">본문으로 건너뛰기</a>
<header class="site-header" data-header>
  <div class="wrap header-in">
    ${logo(c)}
    <nav class="gnav" aria-label="주 메뉴"><ul>${NAV.map(item).join('')}</ul></nav>
    <div class="header-tools">
      <a class="header-call" href="${tel()}" aria-label="대표전화 ${CO.phone}"><span class="hc-ic">${icon('phone')}</span><span class="hc-txt">${CO.phone}</span></a>
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mnav" aria-label="메뉴 열기" data-menu-btn><span></span></button>
    </div>
  </div>
</header>
<div class="mnav" id="mnav" data-mnav hidden>
  <div class="mnav-in">
    <nav aria-label="모바일 메뉴"><ul class="mnav-links">${item(['', '홈'])}${NAV.map(item).join('')}</ul></nav>
    <div class="mnav-contact">${callBtn('btn-block')}${smsBtn('btn-block')}${kakaoBtn('btn-block')}</div>
    <p class="mnav-hours">${icon('clock')}${CO.hours}</p>
  </div>
</div>`;
}

function footer(c) {
  return `<footer class="site-footer">
  <div class="wrap f-in">
    <div class="f-brand">
      ${logo(c, 'logo-footer')}
      <p>${CO.field} · ${CO.alias} · 직영 ${CO.ls}</p>
    </div>
    <div class="f-mid">
      <nav class="f-links" aria-label="바닥 메뉴"><ul>
        <li><a href="${c.url('about/')}">회사소개</a></li>
        <li><a href="${c.url('contact/')}#privacy"><b>개인정보처리방침</b></a></li>
        <li><a href="${c.url('about/')}#location">오시는 길</a></li>
        <li><a href="${CO.blog}" target="_blank" rel="noopener">블로그</a></li>
      </ul></nav>
      <p class="f-line"><span>상호 ${CO.company} (${CO.companyEn})</span><span>대표 ${CO.ceo}</span><span>사업자등록번호 ${CO.bizNo}</span></p>
      <p class="f-line"><span>공장 ${CO.factory}</span><span>설립 ${CO.founded}</span><span>직영 ${CO.ls}</span></p>
      <p class="f-line"><span>TEL <a href="${tel()}">${CO.phone}</a></span><span>문자·사진 <a href="${sms()}">${CO.sms}</a></span>${CO.fax ? `<span>FAX ${CO.fax}</span>` : ''}${CO.email ? `<span>E-mail ${CO.email}</span>` : ''}</p>
    </div>
    <div class="f-call">
      <p class="f-call-label">대표전화</p>
      <a class="f-call-num" href="${tel()}">${CO.phone}</a>
      <p class="f-call-hours">${CO.hours}</p>
    </div>
  </div>
  <div class="wrap f-bottom">
    <p class="f-note">이 사이트는 홈페이지 제작 시안입니다. 성현 홈페이지(seonghyun.co.kr)와 LS셔터 블로그에 공개된 내용을 바탕으로 만들었습니다. 사진이 없는 곳은 그림으로 대신했습니다.</p>
    <p class="f-copy">© 2026 ${CO.company}. All rights reserved.</p>
  </div>
</footer>`;
}

/* 모바일 하단 고정 상담 바 */
function quickbar(c) {
  return `<nav class="quickbar" aria-label="빠른 상담">
  <a class="qb-call" href="${tel()}">${icon('phone')}<span>전화</span></a>
  <a class="qb-sms" href="${sms()}">${icon('sms')}<span>문자·사진</span></a>
  <a class="qb-form" href="${c.url('contact/')}">${icon('doc')}<span>견적문의</span></a>
</nav>`;
}

export function page(c, { title, desc, body, bodyClass = '' }) {
  const full = title ? `${title} | ${CO.brand}` : `${CO.brand} | 방화셔터 제조 · ${CO.alias}`;
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
<meta property="og:site_name" content="${esc(CO.brand)}">
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
<script>document.documentElement.classList.replace('no-js','js');setTimeout(function(){if(!window.__ls)document.documentElement.classList.add('no-motion-fallback')},2500)</script>
<script src="${c.asset('js/site.js')}" defer></script>
</head>
<body class="${bodyClass}">
${header(c)}
<main id="main" tabindex="-1">
${body}
</main>
${footer(c)}
${quickbar(c)}
<a class="to-top" href="#main" data-top aria-label="맨 위로">${icon('up')}<span>TOP</span></a>
<div class="toast" role="status" aria-live="polite" data-toast></div>
</body>
</html>
`;
}

/* 하위 페이지 머리: 따뜻한 회색 띠 + 오른쪽에 흐린 슬랫 그림 */
export function pageHead(c, { en, title, lede, crumb, uid = 'ph', tabs = null }) {
  return `<section class="page-head">
  <div class="page-head-art" aria-hidden="true">${heroArt('slatsWarm', uid)}</div>
  <div class="wrap page-head-in">
    <nav class="crumbs" aria-label="현재 위치"><a href="${c.url('')}">${icon('home')}<span class="sr">홈</span></a>${icon('chevron')}<span aria-current="page">${crumb}</span></nav>
    <h1 class="page-title">${lines(title)}</h1>
    ${lede ? `<p class="page-lede">${lede}</p>` : ''}
  </div>
</section>${tabs ? subTabs(tabs) : ''}`;
}

/* 하위 페이지 안 바로가기 탭 (헤더 아래 붙어 따라옴). tabs: [['#id', '이름'], …] */
export function subTabs(tabs, label = '이 페이지 바로가기') {
  return `<nav class="pnav" aria-label="${label}"><div class="wrap"><ul>${tabs.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul></div></nav>`;
}
