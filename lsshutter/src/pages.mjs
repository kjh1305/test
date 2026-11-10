/* 페이지 본문: 홈, 회사소개, 제품, 품질인정, 납품실적, 견적문의, 없는 주소 */
import {
  CO, PH, HERO, POPUPS, STATS, COMPANY, STATUS, PRODUCTS, COMPOSITE, CATALOG, CERTS, CERT_META, CERT_STEPS, CERT_PROGRESS, REGISTRATION, DOCS,
  RECORDS, BUILDERS, RECORDS_SUMMARY, FIELD_LOGS, FIELD_NOTE, SUPPLY, STANDARDS, HISTORY, FACTORY, CTA, CONTACT, PRODUCT_OPTS, META
} from './content.mjs';
import { icon, productIcon, waves } from './art.mjs';
import { page, pageHead, subTabs, btn, callBtn, smsBtn, kakaoBtn, phLink, lines, secHead, esc, ph, val, photo, backdrop, badge, tel, sms } from './layout.mjs';

const pad = n => String(n).padStart(2, '0');
const quoteFor = (c, id) => c.url('contact/') + `?product=${id}`;
const fullName = p => `${p.name}${/^SH-/.test(p.model) ? ` <span class="model">${p.model}</span>` : ''}`;

/* ---------- 공통 조각 ---------- */
const noticeLink = cls => CERT_META.noticeUrl
  ? `<a class="${cls}" href="${esc(CERT_META.noticeUrl)}" target="_blank" rel="noopener">한국건설기술연구원 인정 공고에서 확인${icon('external')}</a>`
  : phLink(`한국건설기술연구원 인정 공고에서 확인${icon('external')}`, cls);

const certTable = (rows, { compact = false } = {}) => `<div class="tbl-wrap"><table class="tbl${compact ? ' tbl-compact' : ''}">
  <caption class="sr">KICT 품질인정 현황</caption>
  <thead><tr><th scope="col">인정 구분</th><th scope="col">제품</th><th scope="col">내화</th><th scope="col">인정번호</th>${compact ? '' : '<th scope="col">상태</th>'}</tr></thead>
  <tbody>${rows.map(r => `<tr><td data-th="인정 구분">${r.kind}</td><th scope="row" data-th="제품">${r.product} <span class="model">${r.model}</span></th><td data-th="내화">${r.time}</td><td data-th="인정번호" class="mono">${r.no}</td>${compact ? '' : `<td data-th="상태">${badge(r)}</td>`}</tr>`).join('')}</tbody>
</table></div>`;

const certMeta = () => `<dl class="cert-meta">
  <div><dt>인정 명의</dt><dd>${CERT_META.holder}</dd></div>
  <div><dt>인정일</dt><dd>${CERT_META.date}</dd></div>
  <div><dt>유효기간</dt><dd>${CERT_META.until}까지</dd></div>
  <div><dt>공장소재지</dt><dd>${CERT_META.factory}</dd></div>
</dl>`;

/* 문의 띠: 호박색 바탕 + 전화 · 문자 · 카톡 */
const inquiryBand = (c, { home = false } = {}) => `<section class="inq${home ? ' inq-home' : ''}" aria-labelledby="inq-title">
  <div class="inq-bg" aria-hidden="true">${backdrop(c, null, 'slatsWarm', home ? 'inq' : 'inqs')}</div>
  <div class="wrap inq-in" data-reveal>
    <span class="inq-line" aria-hidden="true"></span>
    <h2 class="inq-title" id="inq-title">${CTA.title}</h2>
    <p class="inq-text">${CTA.text}</p>
    <div class="inq-btns">${callBtn()}${smsBtn()}${kakaoBtn()}</div>
    ${btn(c.url('contact/'), '문의하러가기', { variant: 'outline-light', cls: 'inq-go' })}
  </div>
</section>`;

/* 제품 카드 (홈, 제품 페이지 위쪽) */
const productCard = (c, p) => `<li class="pcard"><a href="${c.url('products/')}#${p.id}">
  <span class="pcard-img">${photo(c, p, { label: p.name, pic: p.icon })}</span>
  <span class="pcard-body">${badge(p)}<b class="pcard-name">${p.name}</b><span class="pcard-model">${/^SH-/.test(p.model) ? p.model : p.short}</span></span>
</a></li>`;

/* 직영 현장 기록: 홈 카드 */
const logCard = (c, g) => {
  const p = g.photos[g.cover] || g.photos[0];
  return `<li class="lcard" data-reveal><a href="${c.url('records/')}#log-${g.id}">
  ${photo(c, p, { label: g.title, ratio: '4 / 3' })}
  <span class="lcard-body"><span class="rec-cat">${g.kind}</span><b class="lcard-title">${g.title}</b><span class="rec-where">${icon('pin')}${g.where}</span></span>
</a></li>`;
};

/* 직영 현장 기록: 납품실적 페이지 한 건 */
const logEntry = (c, g) => `<article class="log" id="log-${g.id}" aria-labelledby="log-${g.id}-t">
  <div class="log-text" data-reveal>
    <span class="rec-cat">${g.kind}</span>
    <h3 class="log-title" id="log-${g.id}-t">${g.title}</h3>
    <p class="rec-where">${icon('pin')}${g.where}</p>
    <p class="log-spec">${g.spec}</p>
    ${g.text.map(t => `<p class="log-p">${t}</p>`).join('')}
    <a class="more" href="${g.url}" target="_blank" rel="noopener">블로그 원문 보기${icon('external')}</a>
  </div>
  <ul class="log-ph n${g.photos.length}" data-reveal>${g.photos.map(p => `<li><figure>${photo(c, p, { label: p.cap, ratio: p.ratio })}<figcaption>${p.cap}</figcaption></figure></li>`).join('')}</ul>
</article>`;

/* ================= 홈 ================= */
export function home(c) {
  const n = HERO.slides.length;
  const hero = `<section class="hero" aria-roledescription="carousel" aria-label="LS셔터 첫 화면" data-slider>
  <div class="hero-slides" aria-live="off" data-stage>${HERO.slides.map((s, i) => `<div class="hero-slide${i === 0 ? ' is-on' : ''}" role="group" aria-roledescription="slide" aria-label="${i + 1} / ${n}: ${esc(s.cap)}${s.img ? '' : ' (그림)'}"${i ? ' aria-hidden="true"' : ''} data-cap="${esc(s.cap)}${s.img ? '' : ' · 그림'}">
    ${backdrop(c, s, s.art, 'h' + i, { eager: i === 0 })}
  </div>`).join('')}</div>
  <div class="hero-shade" aria-hidden="true"></div>
  <div class="wrap hero-in">
    <p class="hero-kicker">${HERO.kicker}</p>
    <h1 class="hero-title">${lines(HERO.title)}</h1>
    <p class="hero-lede">${lines(HERO.lede)}</p>
    <div class="hero-actions">
      <a class="hero-call" href="${tel()}"><span class="hc-ic">${icon('phone')}</span><span><small>대표전화 · ${CO.hours}</small><b>${CO.phone}</b></span></a>
      ${btn(c.url('contact/'), '견적문의', { variant: 'outline-light' })}
    </div>
  </div>
  <div class="wrap hero-ctrl">
    <p class="hero-count" aria-hidden="true"><b data-cur>01</b><span>/</span>${pad(n)}</p>
    <div class="hero-nav">
      <button type="button" class="hn-btn" data-prev aria-label="이전 화면">${icon('prev')}</button>
      <button type="button" class="hn-btn hn-pause" data-pause aria-label="자동 넘김 멈춤" aria-pressed="false">${icon('pause', 'ic i-pause')}${icon('play', 'ic i-play')}</button>
      <button type="button" class="hn-btn" data-next aria-label="다음 화면">${icon('next')}</button>
    </div>
    <p class="hero-cap" aria-hidden="true" data-cap-out>${HERO.slides[0].cap}${HERO.slides[0].img ? '' : ' · 그림'}</p>
  </div>
</section>`;

  const stats = `<section class="stats" aria-label="숫자로 보는 LS셔터">
  <div class="wrap"><ul class="stats-list">${STATS.map(s => `<li data-reveal><p class="st-num">${s.num}<small>${s.unit}</small></p><p class="st-label">${s.label}</p><p class="st-note">${s.note}</p></li>`).join('')}</ul></div>
</section>`;

  const company = `<section class="sec company">
  <div class="wrap company-in">
    <div class="company-text">
      ${secHead({ en: 'COMPANY', title: COMPANY.title })}
      <div class="company-body" data-reveal>
        ${COMPANY.text.map(p => `<p>${p}</p>`).join('')}
        <ul class="ticks">${COMPANY.points.map(x => `<li>${icon('check')}<span>${x}</span></li>`).join('')}</ul>
        <a class="more" href="${c.url('about/')}">회사소개 더보기${icon('chevron')}</a>
      </div>
    </div>
    <div class="company-media" data-reveal>
      <span class="offset-block" aria-hidden="true"></span>
      ${photo(c, COMPANY.img, { label: '공장', ratio: '4 / 3', pic: 'steel' })}
    </div>
  </div>
</section>`;

  const products = `<section class="sec products" aria-labelledby="prod-title">
  ${waves('waves')}
  <div class="wrap">
    ${secHead({ en: 'PRODUCTS', title: '제품소개', sub: '공장에서 직접 만드는 방화셔터와 셔터 제품입니다. 방화셔터는 품질인정 상태를 함께 표시했습니다.', center: true, id: 'prod-title' })}
    <div class="pgrid-scroll" tabindex="0" role="region" aria-label="제품 목록 (옆으로 넘겨 보기)">
      <ul class="pgrid">${PRODUCTS.map(p => productCard(c, p)).join('')}</ul>
    </div>
    <p class="composite-note" data-reveal>${icon('info')}<span>복합방화셔터(셔터 + 내화문 일체형)는 품질인정을 진행하고 있으며, 인정을 마치기 전까지 판매하지 않습니다. <a href="${c.url('products/')}#composite">자세히</a></span></p>
    <p class="center-btn">${btn(c.url('products/'), '제품 전체 보기', { variant: 'line' })}</p>
  </div>
</section>`;

  const cert = `<section class="sec cert-home">
  <div class="wrap cert-in">
    <div>
      ${secHead({ en: 'CERTIFICATION', title: ['KICT 품질인정 2종'], sub: `${CERT_META.holder} 명의로 받은 한국건설기술연구원 품질인정입니다.` })}
      <div data-reveal>
        ${certMeta()}
        <p class="cert-links">${noticeLink('more')}<a class="more" href="${c.url('certification/')}">인정 현황 전체${icon('chevron')}</a></p>
      </div>
    </div>
    <div data-reveal>${certTable(CERTS, { compact: true })}<p class="tbl-note">세부인정내용은 견적을 문의하실 때 요청해 주세요.</p></div>
  </div>
</section>`;

  const logs = `<section class="sec sec-sand logs-home" aria-labelledby="logs-title">
  <div class="wrap">
    <div class="logs-head">
      ${secHead({ en: 'FIELD LOG', title: '직영 현장 기록', sub: '설치, 철거, 자재 납품까지 LS셔터 시공팀이 직접 한 실제 현장입니다.', id: 'logs-title' })}
      <a class="more" href="${c.url('records/')}#field" data-reveal>현장 기록 전체${icon('chevron')}</a>
    </div>
    <ul class="lgrid">${FIELD_LOGS.map(g => logCard(c, g)).join('')}</ul>
  </div>
</section>`;

  const panels = `<section class="panels" aria-label="납품실적과 공급 방식">
  <div class="panel">
    <div class="panel-bg" aria-hidden="true">${backdrop(c, null, 'slatsDark', 'pn1')}</div>
    <div class="panel-in" data-reveal>
      <p class="eyebrow">RECORDS</p>
      <h2 class="panel-title">납품실적</h2>
      <p class="panel-text">${RECORDS_SUMMARY}. 물류센터부터 이차전지 소재 공장까지 들어갔습니다.</p>
      <ul class="panel-list">${RECORDS.map(r => `<li><span class="pl-cat">${r.cat}</span><span>${r.where} · ${r.site}</span></li>`).join('')}</ul>
      <p class="panel-builders"><b>주요 납품 현장 시공사</b>${BUILDERS}</p>
      ${btn(c.url('records/'), '더 보러가기', { variant: 'outline-light', cls: 'btn-sm' })}
    </div>
  </div>
  <div class="panel">
    <div class="panel-bg" aria-hidden="true">${backdrop(c, null, 'opening', 'pn2')}</div>
    <div class="panel-in" data-reveal>
      <p class="eyebrow">SUPPLY</p>
      <h2 class="panel-title">공급 방식 · 직영 시공</h2>
      <p class="panel-text">제품만 보내는 납품부터 시공팀 연결, LS셔터 직접 시공까지 현장에 맞춰 고릅니다.</p>
      <ul class="panel-list panel-list-ic">${SUPPLY.map(s => `<li>${icon(s.icon)}<span><b>${s.title}</b> ${s.text}</span></li>`).join('')}</ul>
      ${btn(c.url('about/') + '#supply', '더 보러가기', { variant: 'outline-light', cls: 'btn-sm' })}
    </div>
  </div>
</section>`;

  /* 알림 팝업: on 인 것만 넣음 (지금은 모두 꺼져 있어 HTML 에 들어가지 않음). JS 가 열어 줌 */
  const pops = POPUPS.filter(p => p.on);
  const popups = pops.length ? `<div class="pop-layer" data-popups hidden>
  <div class="pop-dim" data-pop-dim></div>
  <div class="pop-wrap">${pops.map(p => `<section class="pop" role="dialog" aria-modal="false" aria-label="${esc(p.label)}" data-pop="${esc(p.id)}" hidden>
    ${p.img
      ? `<a class="pop-img" href="${c.url(p.href)}"${p.tel ? ` data-tel="${p.tel}"` : ''}><img src="${c.asset('img/' + p.img)}" width="${p.w}" height="${p.h}" alt="${esc(p.alt)}" decoding="async"></a>`
      : `<a class="pop-img pop-text" href="${c.url(p.href)}"${p.tel ? ` data-tel="${p.tel}"` : ''}><b>${p.title}</b><span>${p.text}</span><em>${CO.phone}</em></a>`}
    <div class="pop-foot">
      <label class="pop-today"><input type="checkbox" data-pop-today><span>오늘 하루 열지 않기</span></label>
      <button type="button" class="pop-close" data-pop-close>닫기</button>
    </div>
  </section>`).join('')}</div>
</div>` : '';

  return page(c, { title: '', desc: META.home, bodyClass: 'p-home', body: hero + stats + company + products + cert + logs + inquiryBand(c, { home: true }) + panels + popups });
}

/* ================= 회사소개 ================= */
export function about(c) {
  const intro = `<section class="sec company" id="intro">
  <div class="wrap company-in">
    <div class="company-text">
      ${secHead({ en: 'ABOUT', title: COMPANY.title })}
      <div class="company-body" data-reveal>
        ${COMPANY.text.map(p => `<p>${p}</p>`).join('')}
        <ul class="ticks">${COMPANY.points.map(x => `<li>${icon('check')}<span>${x}</span></li>`).join('')}</ul>
      </div>
    </div>
    <div class="company-media" data-reveal>
      <span class="offset-block" aria-hidden="true"></span>
      ${photo(c, COMPANY.img, { label: '공장', pic: 'steel' })}
    </div>
  </div>
</section>`;

  const standards = `<section class="sec sec-sand" id="standard">
  <div class="wrap">
    ${secHead({ en: 'OUR STANDARD', title: '만드는 방식이 다르면, 현장이 달라집니다', center: true })}
    <ol class="stds">${STANDARDS.map((s, i) => `<li data-reveal><span class="std-no">${pad(i + 1)}</span><p class="std-en">${s.en}</p><h3>${s.title}</h3><p>${s.text}</p></li>`).join('')}</ol>
  </div>
</section>`;

  const factory = `<section class="sec" id="factory">
  <div class="wrap fac-in">
    <figure class="fac-photo" data-reveal>${photo(c, FACTORY.photo, { label: FACTORY.photo.cap, ratio: '4 / 5' })}<figcaption>${FACTORY.photo.cap}</figcaption></figure>
    <div>
      ${secHead({ en: 'FACTORY', title: '공장 · 직접 절곡', sub: `${CO.factory}. 강판을 자르고 접어 슬랫과 부재를 만드는 곳입니다. 외주 없이 한 공장 안에서 끝냅니다.` })}
      <ol class="fac-steps">${FACTORY.steps.map((f, i) => `<li data-reveal><span class="fs-no">${pad(i + 1)}</span><div><h3>${f.title}</h3><p>${f.text}</p></div></li>`).join('')}</ol>
    </div>
  </div>
</section>`;

  const supply = `<section class="sec sec-sand" id="supply">
  <div class="wrap supply-in">
    ${secHead({ en: 'SUPPLY', title: ['공급 방식', '직영 LS셔터'], sub: 'LS셔터는 주식회사 성현이 직접 운영합니다. 공장에서 만든 제품을 세 가지 방식으로 현장에 보냅니다.' })}
    <ol class="supply-list">${SUPPLY.map((s, i) => `<li data-reveal><span class="sp-ic">${icon(s.icon)}</span><div><p class="sp-no">${pad(i + 1)}</p><h3>${s.title}</h3><p>${s.text}</p></div></li>`).join('')}</ol>
  </div>
</section>`;

  const history = `<section class="sec" id="history">
  <div class="wrap hist-in">
    ${secHead({ en: 'HISTORY', title: '걸어온 길' })}
    <ol class="hist">${HISTORY.map(h => `<li data-reveal><b>${h.year}</b><span>${h.text}</span></li>`).join('')}</ol>
  </div>
</section>`;

  const rows = [
    ['상호', `${CO.company} (${CO.companyEn})`],
    ['직영 브랜드', `${CO.brand} (${CO.sub})`],
    ['대표자', CO.ceo],
    ['사업자등록번호', CO.bizNo],
    ['설립', `${CO.founded} (셔터 일은 ${CO.since}부터)`],
    ['공장', CO.factory],
    ['대표전화', `<a href="${tel()}">${CO.phone}</a> (${CO.hours})`],
    ['문자 · 사진 상담', `<a href="${sms()}">${CO.sms}</a>`],
    ['카카오톡 채널', CO.kakao.url ? `<a href="${CO.kakao.url}" target="_blank" rel="noopener">${CO.kakao.name}${icon('external')}</a>` : CO.kakao.name],
    ...(CO.fax ? [['팩스', CO.fax]] : []),
    ...(CO.email ? [['이메일', CO.email]] : []),
    ['블로그', `<a href="${CO.blog}" target="_blank" rel="noopener">${CO.blogName}${icon('external')}</a>`],
    ['본사 홈페이지', `<a href="${CO.hq}" target="_blank" rel="noopener">seonghyun.co.kr${icon('external')}</a>`]
  ];
  const info = `<section class="sec sec-sand" id="location">
  <div class="wrap info-in">
    <div>
      ${secHead({ en: 'INFORMATION', title: '회사 정보 · 오시는 길' })}
      <div class="loc-card" data-reveal>
        <span class="loc-art" aria-hidden="true">${icon('pin')}</span>
        <p class="loc-label">공장 · 본사</p>
        <p class="loc-addr">${CO.factory}</p>
        <p class="loc-hours">${icon('clock')}${CO.hours}</p>
        <div class="loc-btns">
          ${btn('https://map.naver.com/p/search/' + encodeURIComponent(CO.factory), '네이버 지도', { variant: 'line', ext: true })}
          ${btn('https://map.kakao.com/?q=' + encodeURIComponent(CO.factory), '카카오맵', { variant: 'line', ext: true })}
        </div>
      </div>
    </div>
    <dl class="info-table" data-reveal>${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
  </div>
</section>`;

  return page(c, {
    title: '회사소개', desc: META.about, bodyClass: 'p-about',
    body: pageHead(c, { en: 'COMPANY', title: ['셔터의 처음과 끝,', '한 공장에서 만듭니다'], lede: `${CO.since} 셔터 일을 시작해 ${CO.founded} ${CO.company}을 세웠습니다. LS셔터는 그 공장이 직접 운영하는 브랜드입니다.`, crumb: '회사소개', tabs: [['#intro', '회사 개요'], ['#standard', '만드는 방식'], ['#factory', '공장 · 직접 절곡'], ['#supply', '공급 방식'], ['#history', '걸어온 길'], ['#location', '오시는 길']] })
      + intro + standards + factory + supply + history + info + inquiryBand(c)
  });
}

/* ================= 제품 ================= */
const MARK = { al: 'ALUMINIUM', security: 'SECURITY', parts: 'PARTS', etc: 'DOORS' };
export function products(c) {
  const chips = `<nav class="pnav" aria-label="제품 바로가기"><div class="wrap"><ul>${PRODUCTS.map(p => `<li><a href="#${p.id}">${p.nav || p.name}</a></li>`).join('')}<li><a href="#composite">복합방화셔터</a></li></ul></div></nav>`;

  const legend = `<section class="sec sec-tight">
  <div class="wrap">
    <div class="legend" data-reveal>
      <h2 class="legend-title">품질인정 상태 표시</h2>
      <ul>
        <li>${badge({ status: 'cert' })}<span>한국건설기술연구원(KICT) 품질인정서를 받은 제품</span></li>
        <li>${badge({ status: 'pending' })}<span>국가시험은 통과했고, 인정서 발급을 기다리는 제품</span></li>
        <li>${badge({ status: 'notsale' })}<span>품질인정 진행 중인 제품. 인정을 마치기 전까지 판매하지 않음</span></li>
      </ul>
      <p class="legend-note">${COMPOSITE.asOf} 방화셔터가 아닌 제품은 회색 표시로 종류만 적었습니다.</p>
    </div>
    ${CATALOG ? `<div class="catalog" data-reveal>${btn(c.url(CATALOG), '카탈로그 PDF 받기', { variant: 'line', ic: 'doc' })}</div>` : ''}
  </div>
</section>`;

  const secs = PRODUCTS.map((p, i) => `<section class="sec prod${i % 2 ? ' rev' : ''}" id="${p.id}" aria-labelledby="${p.id}-t">
  <div class="wrap prod-in">
    <div class="prod-media" data-reveal>${photo(c, p, { label: p.name, pic: p.icon, mark: MARK[p.id] || p.model })}</div>
    <div class="prod-text" data-reveal>
      ${badge(p)}
      <h2 class="prod-name" id="${p.id}-t">${fullName(p)}</h2>
      <p class="prod-lead">${p.short}</p>
      <p class="prod-body">${p.text}</p>
      <dl class="spec">${p.specs.map(([k, v]) => `<div><dt>${k}</dt><dd${k === '인정번호' && /^FDS/.test(v) ? ' class="mono"' : ''}>${v}</dd></div>`).join('')}</dl>
      ${p.uses.length ? `<p class="uses"><b>주로 쓰는 곳</b>${p.uses.map(u => `<span>${u}</span>`).join('')}</p>` : ''}
      <div class="prod-btns">${btn(quoteFor(c, p.id), '이 제품으로 견적문의', { variant: 'amber' })}${p.status ? btn(c.url('certification/'), '품질인정 현황', { variant: 'line' }) : ''}</div>
    </div>
  </div>
</section>`).join('');

  const composite = `<section class="sec" id="composite" aria-labelledby="composite-t">
  <div class="wrap">
    <div class="composite" data-reveal>
      <div class="composite-head">
        <h2 id="composite-t">${COMPOSITE.title}</h2>
        <p>${COMPOSITE.text}</p>
      </div>
      <ul class="composite-list">${COMPOSITE.items.map(x => `<li id="${x.id}">
        <span class="cp-ic">${productIcon(x.icon)}</span>
        <div>${badge(x)}<h3>${x.name} <span class="model">${x.model}</span></h3><p>${x.text}</p><p class="cp-no">인정 완료 전까지 판매 · 유통하지 않음</p></div>
      </li>`).join('')}</ul>
      <p class="composite-asof">※ ${COMPOSITE.asOf}</p>
    </div>
  </div>
</section>`;

  return page(c, {
    title: '제품', desc: META.products, bodyClass: 'p-products',
    body: pageHead(c, { en: 'PRODUCTS', title: '제품소개', lede: '제품 선정부터 제작과 공급, 시공과 결선까지 현장에 맞춰 제안합니다.', crumb: '제품' })
      + chips + legend + secs + composite + inquiryBand(c)
  });
}

/* ================= 품질인정 ================= */
/* 제품별 진행 막대: 6칸, 마친 단계는 채움, 그다음은 '진행 중' 줄무늬 */
const progressRow = r => `<tr>
  <th scope="row"><b>${r.model}</b><small>${r.name}</small></th>
  <td class="pg-cell"><span class="pg" role="img" aria-label="${CERT_STEPS.length}단계 중 ${r.done}단계 마침${r.done < CERT_STEPS.length ? `, ${CERT_STEPS[r.done].title} 진행 중` : ''}">${CERT_STEPS.map((_, k) => `<i class="${k < r.done ? 'is-done' : k === r.done ? 'is-now' : ''}"></i>`).join('')}</span></td>
  <td class="pg-state">${badge(r)}${r.note ? `<small>${r.note}</small>` : ''}</td>
</tr>`;

export function certification(c) {
  const main = `<section class="sec" id="kict">
  <div class="wrap">
    ${secHead({ en: 'KICT', title: ['한국건설기술연구원', '품질인정 2종'], sub: `${CERT_META.holder} 명의의 인정입니다. 인정번호는 인정 공고에서 누구나 확인할 수 있습니다.` })}
    <ul class="cdocs">${CERTS.map(r => `<li class="cdoc" data-reveal>
      <div class="cdoc-top"><span class="cdoc-ic">${productIcon(r.model === 'SH-F01' ? 'steel' : 'screen')}</span>${badge(r)}</div>
      <p class="cdoc-kind">${r.kind}</p>
      <h3 class="cdoc-name">${r.product} <span class="model">${r.model}</span></h3>
      <dl class="cdoc-dl">
        <div><dt>인정번호</dt><dd class="mono">${r.no}</dd></div>
        <div><dt>내화</dt><dd>${r.time}</dd></div>
        <div><dt>인정일</dt><dd>${CERT_META.date}</dd></div>
        <div><dt>유효기간</dt><dd>${CERT_META.until}까지</dd></div>
      </dl>
      ${r.pdf ? btn(r.pdf, '인정서 · 세부인정내용 PDF', { variant: 'line', ext: true, cls: 'cdoc-btn' }) : ''}
    </li>`).join('')}</ul>
    <div class="cert-check cert-bar" data-reveal>
      <p>${icon('shield')}<span>인정 명의 ${CERT_META.holder} · 공장소재지 ${CERT_META.factory}. 인정번호는 한국건설기술연구원 공고에서 직접 확인할 수 있습니다.</span></p>
      ${noticeLink('btn btn-line')}
    </div>
  </div>
</section>`;

  const process = `<section class="sec sec-sand" id="process">
  <div class="wrap">
    ${secHead({ en: 'CERTIFICATION PROCESS', title: '품질인정, 이렇게 받습니다', sub: '방화셔터는 「건축법」에 따라 품질인정을 받은 제품만 쓸 수 있습니다. 인정기관인 한국건설기술연구원이 아래 6단계로 심사합니다.' })}
    <ol class="steps6" data-reveal>${CERT_STEPS.map((x, i) => `<li><span class="s6-no">${pad(i + 1)}</span><h3>${x.title}</h3><p>${x.text}</p></li>`).join('')}</ol>
    <p class="after-note" data-reveal><b>인정 후에도</b>인정 표시 관리, 정기 품질관리 점검, 판매실적 신고가 이어지고, 유효기간이 끝나면 연장 심사를 받습니다.</p>
  </div>
</section>`;

  const progress = `<section class="sec" id="pending">
  <div class="wrap">
    ${secHead({ en: 'PROGRESS', title: '성현 제품은 여기까지 왔습니다', sub: COMPOSITE.asOf })}
    <div class="pg-wrap" data-reveal><table class="pg-tbl">
      <caption class="sr">제품별 품질인정 진행 단계</caption>
      <thead><tr><th scope="col">제품</th><th scope="col"><span class="pg-heads">${CERT_STEPS.map(x => `<span>${x.title.replace('인정 ', '').replace(' 발급', '')}</span>`).join('')}</span></th><th scope="col">현재</th></tr></thead>
      <tbody>${CERT_PROGRESS.map(progressRow).join('')}</tbody>
    </table></div>
    <p class="pg-legend" data-reveal><span><i class="is-done"></i>마친 단계</span><span><i class="is-now"></i>진행 중</span><span><i></i>남은 단계</span></p>
    <p class="tbl-note" data-reveal>${icon('info')}복합방화셔터(SH-CF01, SH-CS01)는 원재료 채취와 제품 제작을 마치고 완제품 확인을 기다리는 단계입니다. 인정을 마치기 전까지 판매하거나 유통하지 않습니다.</p>
  </div>
</section>`;

  const docs = `<section class="sec sec-sand" id="docs">
  <div class="wrap">
    ${secHead({ en: 'DOCUMENTS', title: '설계 · 감리 · 시공사를 위한 서류 지원', sub: '방화셔터는 서류까지 갖춰야 준공이 끝납니다. 인정 제품을 납품할 때 필요한 서류를 함께 챙깁니다.', center: true })}
    <ul class="docs">${DOCS.map(d => `<li data-reveal><span class="doc-ic">${icon(d.icon)}</span><h3>${d.title}</h3><p>${d.text}</p></li>`).join('')}</ul>
  </div>
</section>`;

  const reg = `<section class="sec" id="registration">
  <div class="wrap">
    ${secHead({ en: 'REGISTRATION', title: '등록 현황' })}
    <ul class="regs">${REGISTRATION.map(r => `<li data-reveal><div class="reg-head"><span class="doc-ic">${icon(r.icon)}</span><div><p class="eyebrow">${r.en}</p><h3>${r.title}</h3></div></div><dl>${r.rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl></li>`).join('')}</ul>
  </div>
</section>`;

  return page(c, {
    title: '품질인정', desc: META.certification, bodyClass: 'p-cert',
    body: pageHead(c, { en: 'CERTIFICATION', title: '품질인정 · 등록', lede: 'KICT 품질인정과 인정 진행 현황, 서류 지원, 공장 등록 현황입니다.', crumb: '품질인정', tabs: [['#kict', 'KICT 품질인정'], ['#process', '인정 절차'], ['#pending', '진행 현황'], ['#docs', '서류 지원'], ['#registration', '등록 현황']] })
      + main + process + progress + docs + reg + inquiryBand(c)
  });
}

/* ================= 납품실적 ================= */
export function records(c) {
  const sum = `<section class="sec" id="major">
  <div class="wrap">
    <ul class="rec-sum" data-reveal>
      <li><p class="st-num">300<small>여 현장</small></p><p class="st-label">최근 3년 납품</p></li>
      <li><p class="st-num">전국</p><p class="st-label">납품 · 시공</p></li>
      <li><p class="st-num">4<small>개 분야</small></p><p class="st-label">물류 · 업무 · 주거 · 산업</p></li>
    </ul>
    ${secHead({ en: 'MAJOR RECORDS', title: '주요 납품 현장' })}
    <ul class="rec-grid">${RECORDS.map(r => `<li class="rec" data-reveal>
      ${photo(c, r, { label: `${r.where} ${r.site}`, pic: r.pic })}
      <div class="rec-body"><span class="rec-cat">${r.cat}</span><h3>${r.site}</h3><p class="rec-where">${icon('pin')}${r.where}</p><p class="rec-prod">${r.product}</p></div>
    </li>`).join('')}</ul>
    <p class="builders" data-reveal><b>주요 납품 현장 시공사</b><span>${BUILDERS}</span></p>
  </div>
</section>`;

  const field = `<section class="sec sec-sand" id="field">
  <div class="wrap">
    ${secHead({ en: 'FIELD LOG', title: 'LS셔터 직영 현장 기록', sub: `직영 LS셔터가 직접 설치하고 철거하고 납품한 현장입니다. ${FIELD_NOTE}` })}
    <div class="logs">${FIELD_LOGS.map(g => logEntry(c, g)).join('')}</div>
  </div>
</section>`;

  const more = `<section class="sec">
  <div class="wrap more-rec" data-reveal>
    <div>
      <h2 class="sec-title">더 많은 현장은 블로그에서</h2>
      <p class="sec-sub">시공 · 수리 · 철거 · 자재 납품 현장을 LS셔터 블로그에 계속 올립니다.</p>
    </div>
    ${btn(CO.blog, CO.blogName, { variant: 'line', ext: true })}
  </div>
</section>`;

  return page(c, {
    title: '납품실적', desc: META.records, bodyClass: 'p-records',
    body: pageHead(c, { en: 'PERFORMANCE', title: '납품실적', lede: `${RECORDS_SUMMARY}. 물류센터, 지식산업센터, 청년주택, 공장까지 들어갔습니다.`, crumb: '납품실적', tabs: [['#major', '주요 납품 현장'], ['#field', '직영 현장 기록']] })
      + sum + field + more + inquiryBand(c)
  });
}

/* ================= 견적문의 ================= */
export function contact(c) {
  const req = '<em class="req" aria-hidden="true">*</em><span class="sr">필수</span>';
  const form = `<form class="qform" novalidate data-form data-errors="${esc(JSON.stringify(CONTACT.errors))}" data-sent="${esc(CONTACT.sent)}" data-prefilled="${esc(CONTACT.prefilled)}">
  <fieldset class="fset"><legend>어떤 제품인가요?</legend><div class="seg">${PRODUCT_OPTS.map(([v, l]) => `<label><input type="radio" name="product" value="${v}"><span>${l}</span></label>`).join('')}</div></fieldset>
  <div class="fgrid">
    <div class="field"><label for="f-site">현장 지역</label><input id="f-site" name="site" type="text" placeholder="예: 경기 부천"></div>
    <div class="field"><label for="f-size">개구부 대략 크기</label><input id="f-size" name="size" type="text" placeholder="예: 가로 6m × 세로 4m"></div>
    <div class="field"><label for="f-qty">수량</label><input id="f-qty" name="qty" type="text" inputmode="numeric" placeholder="예: 4개소"></div>
    <div class="field"><label for="f-when">필요한 시기</label><input id="f-when" name="when" type="text" placeholder="예: 내년 3월 준공"></div>
    <div class="field"><label for="f-company">회사 · 현장명</label><input id="f-company" name="company" type="text" autocomplete="organization"></div>
    <div class="field"><label for="f-name">담당자${req}</label><input id="f-name" name="name" type="text" autocomplete="name" required></div>
    <div class="field"><label for="f-phone">연락처${req}</label><input id="f-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="010-0000-0000" required></div>
    <div class="field"><label for="f-email">이메일</label><input id="f-email" name="email" type="email" autocomplete="email"></div>
  </div>
  <div class="field"><label for="f-message">문의 내용${req}</label><textarea id="f-message" name="message" rows="6" placeholder="현장 상황과 필요한 내용을 적어 주세요. 제품명을 몰라도 괜찮습니다." required></textarea></div>
  <p class="form-tip">${icon('camera')}<span>현장 사진이나 도면은 문자(<a href="${sms()}">${CO.sms}</a>)로 보내 주시면 더 빨리 견적을 드릴 수 있습니다.</span></p>
  <div class="field consent" id="privacy">
    <label class="check"><input id="f-privacy" name="privacy" type="checkbox" required><span class="box" aria-hidden="true">${icon('check')}</span><span>개인정보 수집과 이용에 동의합니다${req}</span></label>
    <details class="privacy-more"><summary>개인정보처리방침 보기</summary><p>${CONTACT.privacyText}</p></details>
  </div>
  <button class="btn btn-amber btn-lg btn-submit" type="submit"><span>견적문의 보내기</span>${icon('chevron')}</button>
</form>`;

  const aside = `<aside class="contact-aside" aria-label="바로 상담">
  <div class="ca-card ca-call">
    <p class="ca-label">바로 상담</p>
    <div class="ca-btns">${callBtn('btn-block')}${smsBtn('btn-block')}${kakaoBtn('btn-block')}</div>
    <p class="ca-hours">${icon('clock')}${CO.hours}</p>
  </div>
  <div class="ca-card"><h2>알려 주시면 좋은 것</h2><ul class="ticks">${CONTACT.tellUs.map(x => `<li>${icon('check')}<span>${x}</span></li>`).join('')}</ul></div>
</aside>`;

  const faq = `<section class="sec sec-sand" id="faq">
  <div class="wrap faq-in">
    ${secHead({ en: 'FAQ', title: '자주 묻는 질문' })}
    <div class="faq">${CONTACT.faq.map((f, i) => `<details class="faq-item"${i === 0 ? ' open' : ''}><summary><span>${f.q}</span>${icon('plus', 'ic faq-ic')}</summary><p>${f.a}</p></details>`).join('')}</div>
  </div>
</section>`;

  return page(c, {
    title: '견적문의', desc: META.contact, bodyClass: 'p-contact',
    body: pageHead(c, { en: 'CONTACT', title: '견적문의', lede: `${CTA.title}. ${CTA.text}`, crumb: '견적문의' })
      + `<section class="sec"><div class="wrap contact-in">${form}${aside}</div></section>` + faq
  });
}

/* ================= 없는 주소 ================= */
export function notFound(c) {
  return page(c, {
    title: '페이지를 찾을 수 없습니다', desc: '주소가 바뀌었거나 없는 페이지입니다.', bodyClass: 'p-404',
    body: `<section class="nf">
  <div class="nf-bg" aria-hidden="true">${backdrop(c, null, 'opening', 'nf')}</div>
  <div class="wrap nf-in">
    <p class="eyebrow">404</p>
    <h1 class="nf-title">셔터가 내려진 페이지입니다</h1>
    <p class="nf-text">주소가 바뀌었거나 없는 페이지입니다. 아래에서 찾으시는 곳으로 가 보세요.</p>
    <div class="nf-btns">${btn(c.url(''), '홈으로', { variant: 'amber' })}${btn(c.url('products/'), '제품 보기', { variant: 'outline-light' })}${btn(c.url('contact/'), '견적문의', { variant: 'outline-light' })}</div>
  </div>
</section>`
  });
}
