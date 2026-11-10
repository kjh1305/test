/* 페이지 본문: 홈, 회사소개, 제품, 품질인정, 납품실적, 견적문의, 없는 주소 */
import {
  CO, PH, HERO, POPUPS, STATS, COMPANY, STATUS, PRODUCTS, COMPOSITE, CATALOG, CERTS, CERT_META, CERT_PENDING, DOCS,
  RECORDS, BUILDERS, RECORDS_SUMMARY, SUPPLY, STANDARDS, HISTORY, FACTORY_PHOTOS, CTA, CONTACT, PRODUCT_OPTS, META
} from './content.mjs';
import { icon, productIcon, waves } from './art.mjs';
import { page, pageHead, btn, callBtn, smsBtn, kakaoBtn, phLink, lines, secHead, esc, ph, val, photo, backdrop, badge, tel, sms } from './layout.mjs';

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

  return page(c, { title: '', desc: META.home, bodyClass: 'p-home', body: hero + stats + company + products + cert + inquiryBand(c, { home: true }) + panels + popups });
}

/* ================= 회사소개 ================= */
export function about(c) {
  const intro = `<section class="sec company">
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
  <div class="wrap">
    ${secHead({ en: 'FACTORY', title: '공장 · 직접 절곡', sub: `${CO.factory}. 강판을 자르고 접어 슬랫과 부재를 만드는 곳입니다.` })}
    <ul class="fac-grid">${FACTORY_PHOTOS.map(f => `<li data-reveal>${photo(c, f, { label: f.cap })}<p>${f.cap}</p></li>`).join('')}</ul>
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
    ['카카오톡 채널', `${CO.kakao.name} ${CO.kakao.url ? '' : ph('채널 주소 · ' + PH)}`],
    ['팩스 · 이메일', `${val(CO.fax)} ${val(CO.email)}`],
    ['블로그', `<a href="${CO.blog}" target="_blank" rel="noopener">${CO.blogName}${icon('external')}</a>`],
    ['본사 홈페이지', `<a href="${CO.hq}" target="_blank" rel="noopener">seonghyun.co.kr${icon('external')}</a>`]
  ];
  const info = `<section class="sec sec-sand" id="location">
  <div class="wrap info-in">
    <div>
      ${secHead({ en: 'INFORMATION', title: '회사 정보 · 오시는 길' })}
      <div class="map-ph" data-reveal>${icon('pin')}<b>지도 자리</b><span>${PH}</span><small>${CO.factory}</small></div>
    </div>
    <dl class="info-table" data-reveal>${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
  </div>
</section>`;

  return page(c, {
    title: '회사소개', desc: META.about, bodyClass: 'p-about',
    body: pageHead(c, { en: 'COMPANY', title: ['셔터의 처음과 끝,', '한 공장에서 만듭니다'], lede: `${CO.since} 셔터 일을 시작해 ${CO.founded} ${CO.company}을 세웠습니다. LS셔터는 그 공장이 직접 운영하는 브랜드입니다.`, crumb: '회사소개' })
      + intro + standards + factory + supply + history + info + inquiryBand(c)
  });
}

/* ================= 제품 ================= */
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
    <div class="catalog" data-reveal>
      ${CATALOG ? btn(c.url(CATALOG), '카탈로그 PDF 받기', { variant: 'line', ic: 'doc' }) : `<span class="btn btn-line is-ph" role="link" aria-disabled="true">${icon('doc')}<span>카탈로그 PDF</span><span class="ph-tag">파일 자리</span></span>`}
    </div>
  </div>
</section>`;

  const secs = PRODUCTS.map((p, i) => `<section class="sec prod${i % 2 ? ' rev' : ''}" id="${p.id}" aria-labelledby="${p.id}-t">
  <div class="wrap prod-in">
    <div class="prod-media" data-reveal>${photo(c, p, { label: p.name, pic: p.icon })}</div>
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
export function certification(c) {
  const main = `<section class="sec">
  <div class="wrap">
    ${secHead({ en: 'KICT', title: ['한국건설기술연구원', '품질인정 2종'], sub: `${CERT_META.holder} 명의의 인정입니다. 인정번호는 인정 공고에서 누구나 확인할 수 있습니다.` })}
    <div data-reveal>${certTable(CERTS)}</div>
    <div class="cert-row" data-reveal>
      ${certMeta()}
      <div class="cert-check">
        <p>${icon('shield')}<span>인정번호를 직접 확인해 보세요.</span></p>
        ${noticeLink('btn btn-line')}
      </div>
    </div>
  </div>
</section>`;

  const scans = `<section class="sec sec-sand">
  <div class="wrap">
    ${secHead({ en: 'CERTIFICATE', title: '인정서', sub: '인정서 사본을 받으면 이 자리에 넣습니다.' })}
    <ul class="scan-grid">${CERT_META.scans.map(s => `<li data-reveal>${photo(c, s, { label: s.cap, ratio: '210 / 297' })}<p>${s.cap}</p></li>`).join('')}</ul>
  </div>
</section>`;

  const pending = `<section class="sec" id="pending">
  <div class="wrap">
    ${secHead({ en: 'IN PROGRESS', title: '인정 진행 중인 제품', sub: COMPOSITE.asOf })}
    <div class="tbl-wrap" data-reveal><table class="tbl">
      <caption class="sr">품질인정 진행 중인 제품</caption>
      <thead><tr><th scope="col">제품</th><th scope="col">내화</th><th scope="col">상태</th></tr></thead>
      <tbody>${CERT_PENDING.map(r => `<tr><th scope="row" data-th="제품">${r.product} <span class="model">${r.model}</span></th><td data-th="내화">${r.time}</td><td data-th="상태">${badge(r)}</td></tr>`).join('')}</tbody>
    </table></div>
    <p class="tbl-note" data-reveal>${icon('info')}복합방화셔터(SH-CF01, SH-CS01)는 인정을 마치기 전까지 판매하거나 유통하지 않습니다.</p>
  </div>
</section>`;

  const docs = `<section class="sec sec-sand" id="docs">
  <div class="wrap">
    ${secHead({ en: 'DOCUMENTS', title: '서류 지원', sub: '인정 제품을 납품할 때 필요한 서류를 함께 챙깁니다.', center: true })}
    <ul class="docs">${DOCS.map(d => `<li data-reveal><span class="doc-ic">${icon(d.icon)}</span><h3>${d.title}</h3><p>${d.text}</p></li>`).join('')}</ul>
  </div>
</section>`;

  return page(c, {
    title: '품질인정', desc: META.certification, bodyClass: 'p-cert',
    body: pageHead(c, { en: 'CERTIFICATION', title: '품질인정', lede: '인정번호와 유효기간, 인정을 진행하고 있는 제품의 현황을 알려 드립니다.', crumb: '품질인정' })
      + main + scans + pending + docs + inquiryBand(c)
  });
}

/* ================= 납품실적 ================= */
export function records(c) {
  const sum = `<section class="sec">
  <div class="wrap">
    <ul class="rec-sum" data-reveal>
      <li><p class="st-num">300<small>여 현장</small></p><p class="st-label">최근 3년 납품</p></li>
      <li><p class="st-num">전국</p><p class="st-label">납품 · 시공</p></li>
      <li><p class="st-num">4<small>개 분야</small></p><p class="st-label">물류 · 업무 · 주거 · 산업</p></li>
    </ul>
    ${secHead({ en: 'MAJOR RECORDS', title: '주요 납품 현장' })}
    <ul class="rec-grid">${RECORDS.map(r => `<li class="rec" data-reveal>
      ${photo(c, r, { label: `${r.where} ${r.site}`, pic: 'steel' })}
      <div class="rec-body"><span class="rec-cat">${r.cat}</span><h3>${r.site}</h3><p class="rec-where">${icon('pin')}${r.where}</p><p class="rec-prod">${r.product}</p></div>
    </li>`).join('')}</ul>
    <p class="builders" data-reveal><b>주요 납품 현장 시공사</b><span>${BUILDERS}</span></p>
  </div>
</section>`;

  const more = `<section class="sec sec-sand">
  <div class="wrap more-rec" data-reveal>
    <div>
      <h2 class="sec-title">더 많은 현장은 블로그에서</h2>
      <p class="sec-sub">실적 목록과 현장 사진을 더 받으면 이 페이지에 채웁니다. ${ph()}</p>
    </div>
    ${btn(CO.blog, CO.blogName, { variant: 'line', ext: true })}
  </div>
</section>`;

  return page(c, {
    title: '납품실적', desc: META.records, bodyClass: 'p-records',
    body: pageHead(c, { en: 'PERFORMANCE', title: '납품실적', lede: `${RECORDS_SUMMARY}. 물류센터, 지식산업센터, 청년주택, 공장까지 들어갔습니다.`, crumb: '납품실적' })
      + sum + more + inquiryBand(c)
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
