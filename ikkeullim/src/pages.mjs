/* 페이지: 홈, 회사소개, 서비스, 포트폴리오, 상품 안내, 고객후기, FAQ, 상담신청, 404 */
import { CO, PH, SERVICES, WHY, PROCESS, RESULTS, REVIEWS, REVIEW_SLOTS, REVIEW_FEATURED, INDUSTRIES, PRICING, FAQ, CONTACT, META } from './content.mjs';
import { esc, br, ph, val, telHref, pad, icon, mark, btn, kakaoBtn, kakaoHref, secHead, page, pageHead, ctaBand } from './layout.mjs';

const svc = id => SERVICES.find(s => s.id === id);

/* ---------- 공통 조각 ---------- */

/* 첫 화면 그림: 바깥에서 점들이 곡선을 따라 가운데 로고로 끌려 들어감 (= 이끌림). 움직임 줄이기 설정이면 멈춤 */
function field() {
  const C = [300, 300];
  const paths = [
    'M-20 120 C120 120 200 240 300 300', 'M620 90 C470 120 380 200 300 300', 'M640 380 C500 360 400 330 300 300',
    'M560 640 C470 520 380 400 300 300', 'M120 650 C170 520 240 390 300 300', 'M-40 430 C90 420 200 360 300 300',
    'M300 -40 C330 90 300 200 300 300', 'M-30 260 C80 300 190 300 300 300'
  ];
  const dots = paths.map((p, i) => [0, 1].map(k => {
    const dur = 5.5 + (i % 4) * 1.3, begin = -((i * 1.7 + k * dur / 2) % dur);
    return `<circle r="${k ? 2 : 2.8}" class="f-dot${k ? ' f-dot-s' : ''}"><animateMotion dur="${dur}s" begin="${begin.toFixed(2)}s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines=".55 0 .85 .6"><mpath href="#fp${i}"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.85;1" dur="${dur}s" begin="${begin.toFixed(2)}s" repeatCount="indefinite"/></circle>`;
  }).join('')).join('');
  return `<div class="attract" aria-hidden="true">
  <svg class="field-svg" viewBox="0 0 600 600" data-field>
    <defs><radialGradient id="fglow"><stop offset="0" stop-color="#8EC2F5" stop-opacity=".32"/><stop offset=".45" stop-color="#5E97D6" stop-opacity=".08"/><stop offset="1" stop-color="#5E97D6" stop-opacity="0"/></radialGradient></defs>
    <circle cx="${C[0]}" cy="${C[1]}" r="280" fill="url(#fglow)"/>
    ${[90, 150, 215, 285].map((r, i) => `<ellipse class="f-orbit" cx="300" cy="300" rx="${r}" ry="${Math.round(r * .82)}" transform="rotate(${-18 + i * 9} 300 300)"/>`).join('')}
    ${paths.map((d, i) => `<path id="fp${i}" class="f-line" d="${d}"/>`).join('')}
    ${dots}
    <circle class="f-pulse" cx="300" cy="300" r="70"/>
  </svg>
  <div class="field-mark">${mark()}</div>
</div>`;
}

const serviceCard = (s, c, big = false) => `<li class="svc-card${big ? ' is-big' : ''}" data-reveal>
  <a href="${c.url('services/')}#${s.id}">
    <span class="svc-tag">${s.tag}</span>
    <h3 class="svc-name">${s.name}</h3>
    <p class="svc-short">${s.short}</p>
    ${big ? `<p class="svc-text">${s.text}</p><ul class="svc-points">${s.points.map(p => `<li>${icon('check')}${p}</li>`).join('')}</ul>` : ''}
    <span class="svc-go">${icon('arrowUpRight')}</span>
  </a>
</li>`;

const resultCard = r => `<li class="res-card" data-reveal>
  <div class="res-shot">${r.img ? `<img src="${r.img}" alt="">` : `<span>${icon('image')}실제 검색 화면 이미지</span>`}</div>
  <div class="res-body">
    <p class="res-ind">${r.industry ? esc(r.industry) : ph('업종')}</p>
    <p class="res-kw">${r.keyword ? esc(r.keyword) : ph('목표 키워드')}</p>
    <p class="res-out">${r.result ? esc(r.result) : ph('결과 (예: 검색 1위 노출)')}</p>
  </div>
</li>`;

const reviewTile = (c, r) => `<li class="rv-tile"><a href="${c.asset('img/reviews/' + r.img)}" data-lb data-cap="${esc(r.alt)}"><img src="${c.asset('img/reviews/' + r.img)}" width="${r.w}" height="${r.h}" alt="${esc(r.alt)}" loading="lazy" decoding="async"></a></li>`;
const reviewTiles = (c, n, group) => {
  const list = REVIEWS.filter(r => !group || r.group === group);
  if (list.length) return list.slice(0, n).map(r => reviewTile(c, r)).join('');
  const hs = [340, 260, 300, 380, 280, 320];
  return Array.from({ length: n }, (_, i) => `<li class="rv-tile is-ph" style="--h:${hs[i % hs.length]}px"><span>${icon('image')}후기 이미지 ${pad(i + 1)}</span></li>`).join('');
};

const processList = () => `<ol class="steps">${PROCESS.map((p, i) => `<li data-reveal style="--d:${i}"><span class="step-no">${pad(i + 1)}</span><h3>${p.title}</h3><p>${p.text}</p></li>`).join('')}</ol>`;

const faqList = items => `<div class="faq">${items.map(f => `<details><summary><span>${f.q}</span>${icon('plus')}</summary><p>${f.a}</p></details>`).join('')}</div>`;

const lightbox = () => `<dialog class="lb" data-lb-dialog aria-label="이미지 크게 보기">
  <figure><img alt="" data-lb-img><figcaption data-lb-cap></figcaption></figure>
  <button type="button" class="lb-btn lb-prev" data-lb-prev aria-label="이전">${icon('chevron')}</button>
  <button type="button" class="lb-btn lb-next" data-lb-next aria-label="다음">${icon('chevron')}</button>
  <button type="button" class="lb-close" data-lb-close aria-label="닫기">${icon('close')}</button>
</dialog>`;

/* ================= 홈 ================= */
export function home(c) {
  const hero = `<section class="hero" aria-labelledby="hero-title">
  <div class="hero-glow" aria-hidden="true"></div>
  <div class="wrap hero-in">
    <div class="hero-copy">
      <p class="hero-kicker"><span class="serif">${CO.en}</span><span class="dot" aria-hidden="true"></span>블로그 · 홈페이지 마케팅</p>
      <h1 class="hero-title" id="hero-title"><span class="ln">마음을 끌고,</span><span class="ln"><em class="grad">성과</em>를 만듭니다</span></h1>
      <p class="hero-lede">검색에서 우리 가게를 찾은 고객이 블로그를 읽고, 홈페이지에서 문의를 남기기까지. 이끌림은 그 흐름을 설계하고 매달 숫자로 보여드립니다.</p>
      <div class="hero-btns">${kakaoBtn(c, '카카오톡으로 무료 상담', { cls: 'btn-lg' })}${btn(c.url('pricing/'), '상품 보기', { variant: 'ghost', cls: 'btn-lg' })}</div>
      <ul class="hero-notes"><li>${icon('check')}카카오톡으로 편하게 상담</li><li>${icon('check')}무료 블로그 진단</li><li>${icon('check')}1:1 전담 담당자</li><li>${icon('check')}월간 성과 리포트</li></ul>
    </div>
    ${field()}
  </div>
</section>`;

  const marquee = `<section class="marquee" aria-label="함께하는 업종">
  <div class="mq-track">${[0, 1].map(k => `<ul${k ? ' aria-hidden="true"' : ''}>${INDUSTRIES.map(t => `<li>${t}</li>`).join('')}</ul>`).join('')}</div>
</section>`;

  const why = `<section class="sec" aria-labelledby="why-title">
  <div class="wrap">
    ${secHead({ no: 1, title: ['검색 첫 화면에서', '고객의 마음을 끕니다'], sub: '고객은 결정하기 전에 검색합니다. 그 첫 화면에 무엇이 보이느냐가 문의를 가릅니다.', id: 'why-title' })}
    <ol class="why">${WHY.map((w, i) => `<li data-reveal style="--d:${i}"><span class="why-no serif">${pad(i + 1)}</span><h3>${w.title}</h3><p>${w.text}</p></li>`).join('')}</ol>
  </div>
</section>`;

  const services = `<section class="sec sec-alt" aria-labelledby="svc-title">
  <div class="wrap">
    <div class="sec-row">${secHead({ no: 2, title: ['필요한 만큼,', '한 팀이 맡습니다'], sub: '블로그와 홈페이지를 따로 또 같이. 단품부터 관리대행까지 고를 수 있습니다.', id: 'svc-title' })}${btn(c.url('services/'), '서비스 전체 보기', { variant: 'ghost' })}</div>
    <ul class="bento">${serviceCard(svc('total'), c, true)}${['blog', 'web', 'webcare', 'posting', 'extra'].map(id => serviceCard(svc(id), c)).join('')}</ul>
  </div>
</section>`;

  const results = `<section class="sec" aria-labelledby="res-title">
  <div class="wrap">
    <div class="sec-row">${secHead({ no: 3, title: ['함께하면,', '이렇게 달라집니다'], sub: '업종별 실제 검색 화면으로 보여드립니다. (성과 이미지 정리 후 채울 자리)', id: 'res-title' })}${btn(c.url('portfolio/'), '포트폴리오 보기', { variant: 'ghost' })}</div>
    <ul class="res-grid">${RESULTS.slice(0, 3).map(resultCard).join('')}</ul>
  </div>
</section>`;

  const process = `<section class="sec sec-alt" aria-labelledby="pr-title">
  <div class="wrap">
    ${secHead({ no: 4, title: ['상담부터 리포트까지', '다섯 단계'], sub: '진단 없이 제안하지 않고, 리포트 없이 넘어가지 않습니다.', id: 'pr-title' })}
    ${processList()}
  </div>
</section>`;

  const reviews = `<section class="sec" aria-labelledby="rv-title">
  <div class="wrap">
    <div class="sec-row">${secHead({ no: 5, title: ['먼저 맡겨 본', '사장님들의 이야기'], sub: '실제 고객후기 이미지를 그대로 보여드립니다.', id: 'rv-title' })}${btn(c.url('reviews/'), '고객후기 전체 보기', { variant: 'ghost' })}</div>
  </div>
  <div class="rv-strip" data-reveal><ul>${REVIEW_FEATURED.map(f => REVIEWS.find(r => r.img === f)).filter(Boolean).map(r => reviewTile(c, r)).join('')}</ul></div>
</section>`;

  return page(c, { title: '', desc: META.home, bodyClass: 'p-home', body: hero + marquee + why + services + results + process + reviews + ctaBand(c) });
}

/* ================= 회사소개 ================= */
export function about(c) {
  const intro = `<section class="sec sec-first">
  <div class="wrap split">
    ${secHead({ title: ['결과로 말하는', '마케팅 파트너'] })}
    <div class="prose" data-reveal>
      <p class="lead">고객이 상호나 업종을 검색했을 때 브랜드가 어떻게 보이는지 설계하고, 그 노출이 방문과 문의로 이어지게 만듭니다.</p>
      <p>이끌림이라는 이름처럼, 억지로 붙잡는 광고가 아니라 고객이 스스로 끌려오는 검색 결과를 만드는 것이 저희 일입니다. 무료 진단부터 매달 리포트까지, 모든 과정을 숫자로 공유합니다.</p>
      <p class="note">${ph('대표 인사말 · 회사 연혁 (받으면 채움)')}</p>
    </div>
  </div>
</section>`;
  const why = `<section class="sec sec-alt">
  <div class="wrap">
    ${secHead({ title: '이끌림이 일하는 원칙' })}
    <ol class="why">${WHY.map((w, i) => `<li data-reveal style="--d:${i}"><span class="why-no serif">${pad(i + 1)}</span><h3>${w.title}</h3><p>${w.text}</p></li>`).join('')}</ol>
  </div>
</section>`;
  const process = `<section class="sec">
  <div class="wrap">
    ${secHead({ title: '일하는 방식은 다섯 단계', sub: '어떤 상품이든 같은 원칙으로 진행합니다.' })}
    ${processList()}
  </div>
</section>`;
  const rows = [['상호', CO.full], ['영문', CO.en], ['대표', val(CO.ceo)], ['전화', val(CO.phone, p => `<a href="${telHref(p)}">${esc(p)}</a>`)], ['이메일', val(CO.email)], ['운영시간', val(CO.hours)], ['주소', val(CO.address)], ['사업자등록번호', val(CO.bizNo)]];
  const info = `<section class="sec sec-alt">
  <div class="wrap split">
    ${secHead({ title: '운영 정보' })}
    <dl class="info" data-reveal>${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
  </div>
</section>`;
  return page(c, { title: '회사소개', desc: META.about, bodyClass: 'p-about', body: pageHead(c, { kicker: '회사소개', title: ['검색에서 시작해', '문의로 이어지는 마케팅'], lede: CO.slogan + '. 이끌림이 일하는 방식을 소개합니다.' }) + intro + why + process + info + ctaBand(c) });
}

/* ================= 서비스 ================= */
export function services(c) {
  const chips = `<nav class="chips" aria-label="서비스 바로가기"><div class="wrap"><ul>${SERVICES.map(s => `<li><a href="#${s.id}">${s.name}</a></li>`).join('')}</ul></div></nav>`;
  const secs = SERVICES.map((s, i) => `<section class="srv${i === 0 ? ' is-main' : ''}" id="${s.id}" aria-labelledby="srv-${s.id}">
  <div class="wrap srv-in">
    <div class="srv-head" data-reveal>
      <p class="srv-no"><span class="serif">${pad(i + 1)}</span>${s.tag}</p>
      <h2 class="srv-title" id="srv-${s.id}">${s.name}</h2>
      <p class="srv-short">${s.short}</p>
    </div>
    <div class="srv-body" data-reveal>
      <p>${s.text}</p>
      <ul class="srv-points">${s.points.map(p => `<li>${icon('check')}${p}</li>`).join('')}</ul>
      <div class="srv-detail">${ph('세부 작업 내용 · 성과 (이미지 분석 후 채움)')}</div>
      ${kakaoBtn(c, '이 서비스 카카오톡 상담', { variant: i === 0 ? 'primary' : 'ghost' })}
    </div>
  </div>
</section>`).join('');
  return page(c, { title: '서비스', desc: META.services, bodyClass: 'p-services', body: pageHead(c, { kicker: '서비스', title: ['블로그와 홈페이지,', '따로 또 같이'], lede: '검색에서 보이고, 읽히고, 문의로 이어지는 데 필요한 일을 맡습니다.' }) + chips + secs + ctaBand(c) });
}

/* ================= 포트폴리오 ================= */
export function portfolio(c) {
  const results = `<section class="sec sec-first">
  <div class="wrap">
    ${secHead({ title: '함께한 결과', sub: '업종별 목표 키워드와 실제 검색 화면을 모읍니다. 성과 이미지를 정리하면 이 칸들이 채워집니다.' })}
    <ul class="res-grid">${RESULTS.map(resultCard).join('')}</ul>
  </div>
</section>`;
  const works = `<section class="sec sec-alt">
  <div class="wrap">
    ${secHead({ title: '제작 사례', sub: '홈페이지와 블로그 홈페이지형 디자인 사례가 들어갈 자리입니다.' })}
    <ul class="work-grid">${Array.from({ length: 6 }, (_, i) => `<li class="work" data-reveal><div class="work-shot"><span>${icon('image')}제작 사례 ${pad(i + 1)}</span></div><p class="work-name">${ph('업체 · 업종')}</p></li>`).join('')}</ul>
  </div>
</section>`;
  return page(c, { title: '포트폴리오', desc: META.portfolio, bodyClass: 'p-portfolio', body: pageHead(c, { kicker: '포트폴리오', title: ['검색 첫 화면이', '증명합니다'], lede: '함께한 업체의 검색 노출 결과와 제작 사례를 모았습니다.' }) + results + works + ctaBand(c) });
}

/* ================= 상품 안내 ================= */
export function pricing(c) {
  const flagship = svc('total');
  const top = `<section class="sec sec-first">
  <div class="wrap">
    <article class="flag" data-reveal>
      <div class="flag-glow" aria-hidden="true"></div>
      <div class="flag-copy">
        <p class="flag-tag">${flagship.tag}</p>
        <h2 class="flag-title">${flagship.name}</h2>
        <p class="flag-text">${flagship.text}</p>
        <div class="flag-price"><b>가격 상담 문의</b><span>카카오톡 상담에서 견적을 안내합니다</span></div>
        ${kakaoBtn(c, '이 상품 카카오톡 상담')}
      </div>
      <ul class="flag-points">${flagship.points.map(p => `<li>${icon('check')}${p}</li>`).join('')}</ul>
    </article>
  </div>
</section>`;
  const groups = PRICING.groups.map((g, gi) => `<section class="sec${gi % 2 === 0 ? ' sec-alt' : ''}">
  <div class="wrap">
    ${secHead({ title: g.title, sub: g.sub })}
    <ul class="price-grid">${g.ids.map(id => svc(id)).filter(s => s.id !== 'total' || gi !== 0).map(s => `<li class="price" data-reveal>
      <p class="price-tag">${s.tag}</p>
      <h3>${s.name}</h3>
      <p class="price-short">${s.short}</p>
      <ul>${s.points.map(p => `<li>${icon('check')}${p}</li>`).join('')}</ul>
      <p class="price-val">가격 상담 문의</p>
      ${kakaoBtn(c, '카카오톡 상담', { variant: 'ghost', cls: 'btn-block' })}
    </li>`).join('')}</ul>
  </div>
</section>`).join('');
  const note = `<section class="sec sec-tight"><div class="wrap"><p class="price-note">${PRICING.note}</p></div></section>`;
  return page(c, { title: '상품 안내', desc: META.pricing, bodyClass: 'p-pricing', body: pageHead(c, { kicker: '상품 안내', title: ['필요한 만큼만,', '고를 수 있습니다'], lede: PRICING.lead }) + top + groups + note + ctaBand(c) });
}

/* ================= 고객후기 ================= */
export function reviews(c) {
  const res = REVIEWS.filter(r => r.group === 'result'), srch = REVIEWS.filter(r => r.group === 'search');
  const wall = `<section class="sec sec-first">
  <div class="wrap">
    <div class="rv-tabs" role="tablist" aria-label="후기 종류">
      <button type="button" role="tab" aria-selected="true" aria-controls="rv-result" id="tab-result" data-rv-tab>성과 · 고객 대화 <span>${res.length}</span></button>
      <button type="button" role="tab" aria-selected="false" aria-controls="rv-search" id="tab-search" data-rv-tab tabindex="-1">검색 상위노출 화면 <span>${srch.length}</span></button>
    </div>
    <p class="rv-note">업체명과 개인정보는 모자이크로 가렸습니다. 이미지를 누르면 크게 볼 수 있습니다.</p>
    <ul class="rv-grid" id="rv-result" role="tabpanel" aria-labelledby="tab-result">${res.map(r => reviewTile(c, r)).join('')}</ul>
    <ul class="rv-wall" id="rv-search" role="tabpanel" aria-labelledby="tab-search" hidden>${srch.map(r => reviewTile(c, r)).join('')}</ul>
  </div>
</section>`;
  return page(c, { title: '고객후기', desc: META.reviews, bodyClass: 'p-reviews', body: pageHead(c, { kicker: '고객후기', title: ['먼저 맡겨 본', '사장님들의 이야기'], lede: `함께한 업체의 검색 상위노출 결과와 사장님들이 보내 주신 대화 ${REVIEWS.length}장입니다.` }) + wall + lightbox() + ctaBand(c) });
}

/* ================= FAQ ================= */
export function faq(c) {
  const cats = [...new Set(FAQ.map(f => f.cat))];
  const body = `<section class="sec sec-first">
  <div class="wrap faq-in">
    ${cats.map(cat => `<div class="faq-grp" data-reveal><h2 class="faq-cat">${cat}</h2>${faqList(FAQ.filter(f => f.cat === cat))}</div>`).join('')}
    <p class="faq-more">원하는 답이 없다면 카카오톡으로 물어보세요. <a class="text-link" href="${kakaoHref(c)}">카카오톡 상담${icon('arrow')}</a></p>
  </div>
</section>`;
  return page(c, { title: 'FAQ', desc: META.faq, bodyClass: 'p-faq', body: pageHead(c, { kicker: 'FAQ', title: '자주 묻는 질문', lede: '상담 전에 가장 많이 묻는 질문을 모았습니다. (답변은 예시, 업체 확인 필요)' }) + body + ctaBand(c) });
}

/* ================= 상담 안내 (카카오톡) ================= */
export function contact(c) {
  const main = `<section class="sec sec-first">
  <div class="wrap kakao-in">
    <div class="kakao-card" data-reveal>
      <div class="kakao-glow" aria-hidden="true"></div>
      <span class="kakao-ic">${icon('chat')}</span>
      <h2 class="kakao-title">${br(['상담은', '카카오톡으로 받습니다'])}</h2>
      <p class="kakao-text">전화나 폼 없이, 카카오톡 채팅으로 편하게 물어보세요. 담당자가 확인하고 답변드립니다.</p>
      ${kakaoBtn(c, '카카오톡으로 상담 시작하기', { variant: 'kakao', cls: 'btn-lg' })}
      ${CO.kakao ? '' : `<p class="kakao-ph">${ph('카카오톡 채널 주소 (받으면 연결)')}</p>`}
    </div>
    <div class="kakao-side">
      <div class="ks-block" data-reveal>
        <h2>이렇게 보내 주시면 더 빨리 답해 드려요</h2>
        <ol class="ks-send">${CONTACT.send.map(([t, d], i) => `<li><span class="ks-no">${pad(i + 1)}</span><div><b>${t}</b><p>${d}</p></div></li>`).join('')}</ol>
      </div>
      <div class="ks-block" data-reveal>
        <h2>상담은 이렇게 진행돼요</h2>
        <ol class="ca-steps">${CONTACT.steps.map(t => `<li>${t}</li>`).join('')}</ol>
      </div>
      <dl class="ks-info" data-reveal><div><dt>운영시간</dt><dd>${val(CO.hours)}</dd></div><div><dt>이메일</dt><dd>${val(CO.email)}</dd></div></dl>
    </div>
  </div>
</section>`;
  return page(c, { title: '상담 안내', desc: META.contact, bodyClass: 'p-contact', body: pageHead(c, { kicker: '상담 안내', title: ['카카오톡으로', '편하게 물어보세요'], lede: '상담은 무료이고 계약을 강요하지 않습니다. 블로그·홈페이지 무료 진단도 카카오톡으로 신청하시면 됩니다.' }) + main });
}

export function notFound(c) {
  return page(c, { title: '페이지를 찾을 수 없습니다', desc: META.home, bodyClass: 'p-404', body: `<section class="page-head nf"><div class="page-glow" aria-hidden="true"></div><div class="wrap"><p class="page-kicker serif">404</p><h1 class="page-title">페이지를 찾을 수 없습니다</h1><p class="page-lede">주소가 바뀌었거나 없는 페이지입니다.</p><div class="hero-btns">${btn(c.url(''), '홈으로')}${kakaoBtn(c, '카카오톡 상담', { variant: 'ghost' })}</div></div></section>` });
}
