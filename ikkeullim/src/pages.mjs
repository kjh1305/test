/* 페이지: 홈, 회사소개, 서비스, 포트폴리오, 상품 안내, 고객후기, FAQ, 상담신청, 404 */
import { CO, PH, SERVICES, WHY, METHOD, NAVER, PROCESS, ROLE, STORIES, VOICES, REVIEWS, TALK_TAGS, TALKS, INQUIRIES, WORK_CATS, WORKS, REVIEW_SLOTS, REVIEW_PICKS, INDUSTRIES, PRICING, FAQ, CONTACT, META, TEMPLATES, TPL_MOODS } from './content.mjs';
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

/* 성과·후기 카드: 캡처 대신 검색 화면을 그림으로 다시 그리고(검색어 + 강조된 결과), 대표님 말은 글자로.
   실제 캡처(가림 처리본)는 '실제 화면 보기'로 크게 열림 */
const mock = kw => `<div class="mock" aria-hidden="true">
    <div class="mock-bar"><span class="mock-n">N</span><span class="mock-kw">${esc(kw)}</span>${icon('search')}</div>
    <div class="mock-row"></div>
    <div class="mock-row mock-hit"><span>상위노출</span></div>
    <div class="mock-row"></div>
  </div>`;
const resultCard = (c, r, { quoteFirst = false } = {}) => `<li class="res-card${r.quote ? ' has-quote' : ''}" data-reveal>
  ${quoteFirst && r.quote ? `<p class="res-quote">${esc(r.quote)}</p>` : ''}
  ${r.keyword ? mock(r.keyword) : ''}
  <div class="res-body">
    <p class="res-ind">${r.industry ? esc(r.industry) : '업종 비공개'}</p>
    ${r.keyword ? `<p class="res-kw">‘${esc(r.keyword)}’</p>` : ''}
    <p class="res-out">${esc(r.result)}</p>
    ${!quoteFirst && r.quote ? `<p class="res-say">“${esc(r.quote)}”</p>` : ''}
    <a class="res-proof" href="${c.asset('img/reviews/' + r.img)}" data-lb data-cap="${esc((r.industry || '') + ' 실제 화면 (고객 이름·업체명 가림)')}">${icon('image')}실제 화면 보기</a>
  </div>
</li>`;

/* ---------- 업종을 골라 보는 사례 화면 ----------
   왼쪽: 업종 · 대표님 말 · 고민→한 일→결과 · 큰 숫자
   오른쪽: 실제 검색 화면(검색창 + 상위노출된 그 글, 원래 크기) 위에 카톡 대화 휴대폰을 겹쳐 둠 */
const storyPanel = (c, k, i) => `<div class="st-panel${k.post[1] > 480 ? ' is-wide' : k.post[1] <= 340 ? ' is-narrow' : ''}" id="st-${k.id}" role="tabpanel" aria-labelledby="stt-${k.id}"${i ? ' hidden' : ''}>
  <div class="st-copy">
    <p class="st-ind">${esc(k.industry)}</p>
    <p class="st-quote">${esc(k.quote)}</p>
    <ol class="st-steps">${k.steps.map(([t, d]) => `<li><span>${t}</span><p>${esc(d)}</p></li>`).join('')}</ol>
    <p class="st-stat"><b>${esc(k.stat[0])}</b><span>${esc(k.stat[1])}</span></p>
  </div>
  <div class="st-proof">
    <figure class="st-search">
      <div class="st-bar"><span class="mock-n">N</span><span class="st-kw">${esc(k.keyword)}</span>${icon('search')}</div>
      <div class="st-post">
        <span class="st-badge">${icon('star')}${esc(k.badge)}</span>
        <a href="${c.asset('img/cases/' + k.post[0])}" data-lb data-cap="${esc(k.keyword)} 검색 결과 (실제 화면, 고객사 이름은 가림)"><img src="${c.asset('img/cases/' + k.post[0])}" width="${k.post[1]}" height="${k.post[2]}" alt="‘${esc(k.keyword)}’ 검색 결과에 노출된 이끌림 작성 글 (실제 화면)" loading="lazy" decoding="async"></a>
      </div>
      <figcaption>실제 검색 화면 · 고객사 이름은 가렸습니다</figcaption>
    </figure>
    <div class="st-phone" aria-label="대표님과 나눈 카카오톡 대화">
      <div class="st-phone-hd"><span class="st-av">${esc(k.industry.slice(0, 1))}</span><b>${esc(k.industry)} 대표님</b></div>
      <div class="st-phone-bd">
        <div class="st-chat-text" hidden>${k.chat.map(([w, t]) => `<p class="bub bub-${w}">${esc(t)}</p>`).join('')}</div>
        <div class="st-chat-img">${k.chatImgs.map(([f, w, h, s = 1, who]) => `<img${who === 'me' ? ' class="is-me"' : ''} src="${c.asset('img/cases/' + f)}" width="${Math.round(w * s)}" height="${Math.round(h * s)}" alt="실제 카카오톡 말풍선" loading="lazy" decoding="async">`).join('')}</div>
      </div>
      <button type="button" class="st-swap" data-chatswap aria-pressed="true">글자로 보기</button>
    </div>
  </div>
</div>`;
const storyBlock = (c, list = STORIES) => `<div class="st" data-stories>
  <div class="st-chips" role="tablist" aria-label="업종 고르기">${list.map((k, i) => `<button type="button" role="tab" id="stt-${k.id}" aria-controls="st-${k.id}" aria-selected="${i ? 'false' : 'true'}"${i ? ' tabindex="-1"' : ''}>${k.chip}</button>`).join('')}</div>
  <div class="st-stage">${list.map((k, i) => storyPanel(c, k, i)).join('')}</div>
  <div class="st-foot"><button type="button" class="st-next" data-st-next>다른 업종 사례 보기${icon('arrow')}</button><span class="st-count" data-st-count>1 / ${list.length}</span></div>
</div>`;
/* 대표님 한마디 흐르는 띠. kind: 'text'(글만) / 'bubble'(A: 실제 말풍선) / 'thumb'(B: 글 + 작은 실제 캡처) */
const voiceItem = (c, v, kind, dup) => {
  const t = dup ? ' tabindex="-1"' : '', cap = esc(v.industry) + ' 대표님과 나눈 카카오톡 (고객 이름·업체명 가림)';
  if (kind === 'bubble') return `<li class="vb"><a href="${c.asset('img/reviews/' + v.img)}" data-lb data-cap="${cap}"${t}><span class="vb-chat"><img src="${c.asset('img/voice/' + v.bubble[0])}" width="${Math.round(v.bubble[1] * v.bubble[3])}" height="${Math.round(v.bubble[2] * v.bubble[3])}" alt="${esc(v.industry)} 대표님이 보낸 카카오톡: ${esc(v.text)}" loading="lazy" decoding="async"></span><span class="vb-who"><span class="vb-av" aria-hidden="true">${esc(v.industry.slice(0, 1))}</span>${esc(v.industry)} 대표님</span></a></li>`;
  if (kind === 'thumb') return `<li class="vt"><p>“${esc(v.text)}”</p><div class="vt-foot"><span>${esc(v.industry)}</span><a class="vt-shot" href="${c.asset('img/reviews/' + v.img)}" data-lb data-cap="${cap}"${t}><img src="${c.asset('img/talk/' + v.talk)}" alt="" loading="lazy" decoding="async"><span>실제 대화</span></a></div></li>`;
  return `<li><p>“${esc(v.text)}”</p><span>${esc(v.industry)}</span></li>`;
};
const voices = (c, kind = 'text') => `<div class="vc vc-${kind}" aria-label="대표님 한마디"><div class="vc-track">${[0, 1].map(k => `<ul${k ? ' aria-hidden="true"' : ''}>${VOICES.map(v => voiceItem(c, v, kind, k)).join('')}</ul>`).join('')}</div></div>`;

const reviewTile = (c, r) => `<li class="rv-tile"><a href="${c.asset('img/reviews/' + r.img)}" data-lb data-cap="${esc(r.alt)}"><img src="${c.asset('img/reviews/' + r.img)}" width="${r.w}" height="${r.h}" alt="${esc(r.alt)}" loading="lazy" decoding="async"></a></li>`;
const reviewTiles = (c, n, group) => {
  const list = REVIEWS.filter(r => !group || r.group === group);
  if (list.length) return list.slice(0, n).map(r => reviewTile(c, r)).join('');
  const hs = [340, 260, 300, 380, 280, 320];
  return Array.from({ length: n }, (_, i) => `<li class="rv-tile is-ph" style="--h:${hs[i % hs.length]}px"><span>${icon('image')}후기 이미지 ${pad(i + 1)}</span></li>`).join('');
};

/* ===== 고객후기 · 포트폴리오 공통: 고르기 버튼 (data-flt → data-flt-items 안의 data-f) ===== */
const filterBar = (id, label, opts, total) => `<div class="flt" role="group" aria-label="${label}" data-flt="${id}">
  <button type="button" aria-pressed="true" data-v="all">전체<span>${total}</span></button>${opts.map(([v, name, n]) => `<button type="button" aria-pressed="false" data-v="${v}">${name}<span>${n}</span></button>`).join('')}
</div>`;
const TAG_NAME = Object.fromEntries(TALK_TAGS), CAT_NAME = Object.fromEntries(WORK_CATS);

/* 고객후기: 대표님이 보내 주신 말 (말이 먼저, 실제 대화 캡처는 아래) */
const talkCard = (c, t) => `<li class="tk" data-f="${t.tag}">
  <p class="tk-tag">${TAG_NAME[t.tag]}</p>
  <blockquote class="tk-quote"><p>${esc(t.quote)}</p></blockquote>
  ${t.sub ? `<p class="tk-sub">“${esc(t.sub)}”</p>` : ''}${t.note ? `<p class="tk-note">${esc(t.note)}</p>` : ''}
  <p class="tk-who"><span class="tk-av" aria-hidden="true">${esc(t.industry.slice(0, 1))}</span><span><b>${esc(t.industry)}</b> 대표님</span></p>
  <a class="tk-shot" href="${c.asset('img/reviews/' + t.img)}" data-lb data-cap="${esc(t.industry)} 대표님과 나눈 카카오톡 (고객 이름·업체명 가림)"><img src="${c.asset('img/talk/' + t.crop[0])}" width="${t.crop[1]}" height="${t.crop[2]}" alt="${esc(t.industry)} 대표님과 나눈 실제 카카오톡 대화" loading="lazy" decoding="async"><span class="tk-zoom">${icon('image')}원본 캡처 보기</span></a>
</li>`;
/* 고객후기: 블로그를 보고 들어온 문의 */
const inqCard = (c, q) => `<li class="iq" data-reveal>
  <p class="iq-head"><span class="iq-ch">${icon('chat')}${esc(q.channel)}</span><span class="iq-ind">${esc(q.industry)}</span></p>
  <p class="iq-bub">${esc(q.text)}</p>
  <a class="iq-shot" href="${c.asset('img/reviews/' + q.img)}" data-lb data-cap="${esc(q.industry)} 업체로 들어온 ${esc(q.channel)} 문의 (문의한 분 이름 가림)"><img src="${c.asset('img/talk/' + q.crop[0])}" width="${q.crop[1]}" height="${q.crop[2]}" alt="${esc(q.industry)} 업체로 들어온 실제 ${esc(q.channel)} 문의 화면" loading="lazy" decoding="async"></a>
</li>`;
/* 포트폴리오: 검색 결과 화면 사진첩 (전체 보기에서는 업종을 섞어서) */
const workOrder = () => {
  const by = WORK_CATS.map(([v]) => WORKS.filter(w => w.cat === v)), out = [];
  for (let i = 0; out.length < WORKS.length; i++) by.forEach(l => { if (l[i]) out.push(l[i]); });
  return out;
};
const workCard = (c, w) => {
  const name = w.kw ? w.kw.map(k => `‘${k}’`).join(' · ') : w.title;
  return `<li class="pf" data-f="${w.cat}">
  <a class="pf-shot" href="${c.asset('img/reviews/' + w.img)}" data-lb data-cap="${esc(name)} ${w.kw ? '검색 결과' : ''} (고객 이름·업체명 가림)"><img src="${c.asset('img/reviews/s/' + w.img)}" width="${w.thumb[0]}" height="${w.thumb[1]}" alt="${esc(name)} ${w.kw ? '네이버 검색 결과 화면' : '화면'}" loading="lazy" decoding="async">${w.badge ? `<span class="pf-badge">${icon('star')}${esc(w.badge)}</span>` : ''}</a>
  <div class="pf-cap">${w.kw ? `<p class="pf-kw">${w.kw.map(k => `<span>${icon('search')}${esc(k)}</span>`).join('')}</p>` : `<p class="pf-kw is-title">${esc(w.title)}</p>`}<p class="pf-cat">${CAT_NAME[w.cat]}</p></div>
</li>`;
};

/* 번호 + 꼬리표가 붙은 3단 목록. cycle이면 칸 사이에 화살표, 아래에 '순환' 띠 */
const whyList = (list, { cycle = false } = {}) => `<ol class="why${cycle ? ' is-cycle' : ''}">${list.map((w, i) => `<li data-reveal style="--d:${i}">${cycle && i ? `<span class="why-arrow" aria-hidden="true">${icon('arrow')}</span>` : ''}<div class="why-top"><span class="why-no serif">${pad(i + 1)}</span>${w.tag ? `<span class="why-tag">${w.tag}</span>` : ''}</div><h3>${w.title}</h3><p>${w.text}</p></li>`).join('')}</ol>`;
const roleNote = () => `<p class="role-note" data-reveal><b>대표님이 하실 일</b><span>${ROLE}</span></p>`;
const forLine = (s, cls) => s.for ? `<p class="${cls}"><span>이런 분께</span>${s.for}</p>` : '';
const comboLine = s => s.combo ? `<p class="combo">${s.combo.map(x => `<span>${x}</span>`).join('<i aria-hidden="true">+</i>')}</p>` : '';

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
      <ul class="hero-notes"><li>${icon('check')}카카오톡으로 편하게 상담</li><li>${icon('check')}무료 블로그 진단</li><li>${icon('check')}원고 작성부터 발행까지</li><li>${icon('check')}월간 성과 리포트</li></ul>
    </div>
    ${field()}
  </div>
</section>`;

  const marquee = `<section class="marquee" aria-label="함께하는 업종">
  <div class="mq-track">${[0, 1].map(k => `<ul${k ? ' aria-hidden="true"' : ''}>${INDUSTRIES.map(t => `<li>${t}</li>`).join('')}</ul>`).join('')}</div>
</section>`;

  const why = `<section class="sec" aria-labelledby="why-title">
  <div class="wrap">
    <div class="sec-row">${secHead({ no: 1, title: METHOD.title, sub: METHOD.sub, id: 'why-title' })}${btn(c.url('services/') + '#naver', '네이버가 글을 고르는 방식', { variant: 'ghost' })}</div>
    ${whyList(METHOD.steps, { cycle: true })}
    <p class="why-loop" data-reveal>${icon('loop')}${METHOD.loop}</p>
  </div>
</section>`;

  const services = `<section class="sec sec-alt" aria-labelledby="svc-title">
  <div class="wrap">
    <div class="sec-row">${secHead({ no: 2, title: ['필요한 만큼,', '한 팀이 맡습니다'], sub: '블로그 포스팅 한 건부터 블로그와 홈페이지를 함께 맡기는 통합 패키지까지 고를 수 있습니다.', id: 'svc-title' })}${btn(c.url('services/'), '서비스 전체 보기', { variant: 'ghost' })}</div>
    <ul class="bento">${serviceCard(svc('total'), c, true)}${['posting', 'blog', 'web', 'blogdesign', 'video', 'press'].map(id => serviceCard(svc(id), c)).join('')}</ul>
  </div>
</section>`;

  const results = `<section class="sec" aria-labelledby="res-title">
  <div class="wrap">
    <div class="sec-row">${secHead({ no: 3, title: ['함께하면,', '이렇게 달라집니다'], sub: '대표님 업종을 골라 보세요. 실제 검색 화면과 대표님이 보내 주신 말을 그대로 보여 드립니다.', id: 'res-title' })}${btn(c.url('reviews/'), '고객후기 전체 보기', { variant: 'ghost' })}</div>
    ${storyBlock(c)}
  </div>
</section>`;

  const process = `<section class="sec sec-alt" aria-labelledby="pr-title">
  <div class="wrap">
    ${secHead({ no: 4, title: ['상담부터 리포트까지', '여섯 단계'], sub: '진단 없이 제안하지 않고, 리포트 없이 넘어가지 않습니다.', id: 'pr-title' })}
    ${processList()}
    ${roleNote()}
  </div>
</section>`;

  const reviews = `<section class="sec" aria-labelledby="rv-title">
  <div class="wrap">
    <div class="sec-row">${secHead({ no: 5, title: ['먼저 맡겨 본', '대표님들의 한마디'], sub: '카카오톡으로 받은 말을 그대로 옮겼습니다.', id: 'rv-title' })}${btn(c.url('reviews/'), '고객후기 전체 보기', { variant: 'ghost' })}</div>
  </div>
  <!-- 2026-11-19 비교용: A(실제 말풍선) / B(글 + 작은 실제 캡처). 고르면 하나만 남김 -->
  <div class="vc-cmp" data-lb-scope><p class="wrap vc-label"><b>A</b>실제 카톡 말풍선</p>${voices(c, 'bubble')}</div>
  <div class="vc-cmp" data-lb-scope><p class="wrap vc-label"><b>B</b>다듬은 글 + 작은 실제 캡처</p>${voices(c, 'thumb')}</div>
</section>`;

  return page(c, { title: '', desc: META.home, bodyClass: 'p-home', body: hero + marquee + why + services + results + process + reviews + lightbox() + ctaBand(c) });
}

/* ================= 회사소개 ================= */
export function about(c) {
  const intro = `<section class="sec sec-first">
  <div class="wrap split">
    ${secHead({ title: ['검색되는 브랜드가', '선택받는 브랜드입니다'] })}
    <div class="prose" data-reveal>
      <p class="lead">고객이 상호나 업종을 검색했을 때 브랜드가 어떻게 보이는지 설계하고, 그 노출이 방문과 문의로 이어지게 만듭니다.</p>
      <p>이끌림이라는 이름처럼, 억지로 붙잡는 광고가 아니라 고객이 스스로 끌려오는 검색 결과를 만드는 것이 저희 일입니다. 무료 진단부터 매달 리포트까지, 모든 과정을 숫자로 공유합니다.</p>
      <p class="note">${ph('대표 인사말 · 회사 연혁 (받으면 채움)')}</p>
    </div>
  </div>
</section>`;
  const why = `<section class="sec sec-alt">
  <div class="wrap">
    ${secHead({ title: '이끌림이 다른 점' })}
    ${whyList(WHY)}
  </div>
</section>`;
  const process = `<section class="sec">
  <div class="wrap">
    ${secHead({ title: '일하는 방식은 여섯 단계', sub: '어떤 상품이든 같은 순서로 진행합니다.' })}
    ${processList()}
    ${roleNote()}
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
  const naver = `<section class="sec sec-first" id="naver" aria-labelledby="nv-title">
  <div class="wrap">
    ${secHead({ title: NAVER.title, sub: NAVER.sub, id: 'nv-title' })}
    <ol class="nv-flow" aria-label="네이버 검색이 글을 다루는 순서">${NAVER.flow.map(([t, d], i) => `<li data-reveal style="--d:${i}">${i ? `<span class="nv-arrow" aria-hidden="true">${icon('chevron')}</span>` : ''}<span class="nv-step">${pad(i + 1)}</span><b>${t}</b><span class="nv-desc">${d}</span></li>`).join('')}</ol>
    <ul class="nv-grid">${NAVER.signals.map(g => `<li class="nv-card" data-reveal>
      <h3 class="nv-name">${g.name}</h3>
      <p class="nv-role">${g.role}</p>
      <dl class="nv-items">${g.items.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
      <p class="nv-ours"><b>이끌림은</b>${g.ours}</p>
    </li>`).join('')}</ul>
  </div>
</section>`;
  const chips = `<nav class="chips" aria-label="서비스 바로가기"><div class="wrap"><ul>${SERVICES.map(s => `<li><a href="#${s.id}">${s.name}</a></li>`).join('')}</ul></div></nav>`;
  const secs = SERVICES.map((s, i) => `<section class="srv${i === 0 ? ' is-main' : ''}" id="${s.id}" aria-labelledby="srv-${s.id}">
  <div class="wrap srv-in">
    <div class="srv-head" data-reveal>
      <p class="srv-no"><span class="serif">${pad(i + 1)}</span>${s.tag}</p>
      <h2 class="srv-title" id="srv-${s.id}">${s.name}</h2>
      <p class="srv-short">${s.short}</p>
      ${forLine(s, 'srv-for')}
      ${comboLine(s)}
    </div>
    <div class="srv-body" data-reveal>
      <p>${s.text}</p>
      <ul class="srv-points">${s.points.map(p => `<li>${icon('check')}${p}</li>`).join('')}</ul>
      <div class="srv-detail">${ph('세부 작업 내용 · 성과 (이미지 분석 후 채움)')}</div>
      ${s.id === 'web' ? `<div class="srv-btns">${btn(c.url('portfolio/templates/'), '홈페이지 템플릿 보기', { variant: 'primary' })}${kakaoBtn(c, '이 서비스 카카오톡 상담', { variant: 'ghost' })}</div>` : kakaoBtn(c, '이 서비스 카카오톡 상담', { variant: i === 0 ? 'primary' : 'ghost' })}
    </div>
  </div>
</section>`).join('');
  return page(c, { title: '서비스', desc: META.services, bodyClass: 'p-services', body: pageHead(c, { kicker: '서비스', title: ['블로그와 홈페이지,', '따로 또 같이'], lede: '검색에서 보이고, 읽히고, 문의로 이어지는 데 필요한 일을 맡습니다.' }) + naver + chips + secs + ctaBand(c) });
}

/* ================= 포트폴리오 ================= */
export function portfolio(c) {
  const cats = WORK_CATS.map(([v, n]) => [v, n, WORKS.filter(w => w.cat === v).length]);
  const gallery = `<section class="sec sec-first">
  <div class="wrap">
    ${filterBar('pf', '업종 골라 보기', cats, WORKS.length)}
    <ul class="pf-wall" data-flt-items="pf" data-flt-limit="16">${workOrder().map(w => workCard(c, w)).join('')}</ul>
    <div class="pf-more" hidden><button type="button" class="btn btn-ghost" data-flt-more="pf">검색 결과 화면 더 보기<span>${WORKS.length - 16}장</span></button></div>
    <p class="pf-note">모두 받은 캡처 그대로입니다. 고객 이름과 업체명만 가렸고, 누르면 원본 크기로 볼 수 있습니다.</p>
  </div>
</section>`;
  const works = `<section class="sec sec-alt" id="templates">
  <div class="wrap">
    <div class="sec-row">${secHead({ title: '홈페이지 템플릿', sub: '홈페이지를 새로 만드실 때 기본 화면을 고르는 모음입니다. 번호로 골라 주시면 업체에 맞게 만들어 드립니다.' })}${btn(c.url('portfolio/templates/'), `템플릿 ${TEMPLATES.length}개 모두 보기`, { variant: 'primary' })}</div>
    <ul class="tp-mini">${TEMPLATES.slice(0, 8).map(t => `<li data-reveal><a href="${c.url('portfolio/templates/')}#${t.slug}"><img src="${c.asset('img/tpl/' + t.slug + '-pc.webp')}" width="960" height="600" alt="" loading="lazy" decoding="async"><span><b>${t.no}</b>${esc(t.name)}</span><small>${esc(t.fit.split(',')[0])}</small></a></li>`).join('')}</ul>
  </div>
</section>`;
  return page(c, { title: '포트폴리오', desc: META.portfolio, bodyClass: 'p-portfolio', body: pageHead(c, { kicker: '포트폴리오', title: ['검색 첫 화면이', '증명합니다'], lede: '이끌림이 쓴 글이 실제 네이버 검색 결과에 오른 화면입니다. 업종을 골라 보세요.' }) + pfTabs(c, 'search') + gallery + works + ctaBand(c) + lightbox() });
}

/* ================= 홈페이지 템플릿 ================= */
const pfTabs = (c, cur) => `<nav class="pf-tabs" aria-label="포트폴리오 나눠 보기"><div class="wrap">
  <a href="${c.url('portfolio/')}"${cur === 'search' ? ' aria-current="page"' : ''}>검색 결과 화면<span>${WORKS.length}</span></a>
  <a href="${c.url('portfolio/templates/')}"${cur === 'tpl' ? ' aria-current="page"' : ''}>홈페이지 템플릿<span>${TEMPLATES.length}</span></a>
</div></nav>`;
const MOOD_NAME = Object.fromEntries(TPL_MOODS);
const tplCard = (c, t) => `<li class="tp" id="${t.slug}" data-f="${t.f.join(' ')}" data-reveal>
  <a class="tp-shot" href="${c.url('portfolio/templates/' + t.slug + '/')}" aria-label="${t.no} ${esc(t.name)} 미리보기">
    <img class="tp-pc" src="${c.asset('img/tpl/' + t.slug + '-pc.webp')}" width="960" height="600" alt="" loading="lazy" decoding="async">
    <img class="tp-m" src="${c.asset('img/tpl/' + t.slug + '-m.webp')}" width="240" height="520" alt="" loading="lazy" decoding="async">
  </a>
  <div class="tp-body">
    <p class="tp-name"><span class="tp-no">${t.no}</span>${esc(t.name)}</p>
    <p class="tp-moods">${t.f.map(f => `<span>${MOOD_NAME[f]}</span>`).join('')}</p>
    <p class="tp-desc">${esc(t.desc)}</p>
    <dl class="tp-meta"><div><dt>어울리는 업종</dt><dd>${esc(t.fit)}</dd></div><div><dt>색</dt><dd class="tp-colors">${t.colors.map(x => `<i style="background:${x}" title="${x}"></i>`).join('')}</dd></div><div><dt>글꼴</dt><dd>${esc(t.font)}</dd></div></dl>
    <a class="btn btn-ghost tp-go" href="${c.url('portfolio/templates/' + t.slug + '/')}">${t.no} 미리보기</a>
  </div>
</li>`;
export function templates(c) {
  const moods = TPL_MOODS.map(([v, n]) => [v, n, TEMPLATES.filter(t => t.f.includes(v)).length]).filter(m => m[2]);
  const how = `<section class="sec sec-first">
  <div class="wrap">
    <ol class="tp-how" aria-label="템플릿으로 홈페이지 만드는 순서">
      <li><b>미리보기</b><span>PC와 휴대폰에서 실제 화면처럼 넘겨 봅니다.</span></li>
      <li><b>번호 고르기</b><span>마음에 드는 번호를 카카오톡으로 알려 주세요. 두세 개를 섞어도 됩니다.</span></li>
      <li><b>업체 내용으로 제작</b><span>상호, 글, 사진, 색을 업체에 맞게 바꾸고 필요한 페이지를 더합니다.</span></li>
    </ol>
    ${filterBar('tp', '분위기 골라 보기', moods, TEMPLATES.length)}
    <ul class="tp-list" data-flt-items="tp">${TEMPLATES.map(t => tplCard(c, t)).join('')}</ul>
    <p class="tp-note">템플릿의 상호, 글, 가격, 전화번호는 모두 지어낸 예시입니다. 사진은 상업적으로 쓸 수 있는 무료 사진(Unsplash)이고, 실제 제작 때는 업체 사진으로 바꿉니다.</p>
  </div>
</section>`;
  return page(c, { title: '홈페이지 템플릿', desc: META.templates, bodyClass: 'p-templates', body: pageHead(c, { kicker: '포트폴리오 · 홈페이지 템플릿', title: ['마음에 드는 화면을', '먼저 골라 보세요'], lede: '원하는 느낌을 말로 설명하기 어려우시면, 아래 템플릿에서 번호로 골라 주세요. 그 화면을 기본으로 업체에 맞게 만들어 드립니다.' }) + pfTabs(c, 'tpl') + how + ctaBand(c) });
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
        ${comboLine(flagship)}
        <p class="flag-text">${flagship.text}</p>
        ${forLine(flagship, 'flag-for')}
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
      ${forLine(s, 'price-for')}
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
  const tags = TALK_TAGS.map(([v, n]) => [v, n, TALKS.filter(t => t.tag === v).length]);
  const body = `<section class="sec sec-first">
  <div class="wrap">
    ${secHead({ title: '대표님이 보내 주신 말', sub: '함께 일하며 카카오톡으로 받은 말을 그대로 옮겼습니다. 아래는 그 대화의 실제 캡처입니다.' })}
    ${filterBar('tk', '반응 골라 보기', tags, TALKS.length)}
    <ul class="tk-wall" data-flt-items="tk">${TALKS.map(t => talkCard(c, t)).join('')}</ul>
  </div>
</section>
<section class="sec sec-alt">
  <div class="wrap">
    ${secHead({ title: '블로그를 보고 들어온 문의', sub: '대표님 업체로 실제로 들어온 톡톡 · 댓글 문의입니다. 문의한 분의 이름은 가렸습니다.' })}
    <ul class="iq-wall">${INQUIRIES.map(q => inqCard(c, q)).join('')}</ul>
  </div>
</section>`;
  return page(c, { title: '고객후기', desc: META.reviews, bodyClass: 'p-reviews', body: pageHead(c, { kicker: '고객후기', title: ['먼저 맡겨 본', '대표님들의 이야기'], lede: '숫자보다 먼저, 대표님들이 직접 하신 말을 보여 드립니다.' }) + body + ctaBand(c) + lightbox() });
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
  return page(c, { title: 'FAQ', desc: META.faq, bodyClass: 'p-faq', body: pageHead(c, { kicker: 'FAQ', title: '자주 묻는 질문', lede: '상담 전에 가장 많이 묻는 질문을 모았습니다.' }) + body + ctaBand(c) });
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
      <dl class="ks-info" data-reveal><div><dt>전화</dt><dd>${val(CO.phone, p => `<a href="${telHref(p)}">${esc(p)}</a>`)}</dd></div><div><dt>운영시간</dt><dd>${val(CO.hours)}</dd></div><div><dt>이메일</dt><dd>${val(CO.email)}</dd></div></dl>
    </div>
  </div>
</section>`;
  return page(c, { title: '상담 안내', desc: META.contact, bodyClass: 'p-contact', body: pageHead(c, { kicker: '상담 안내', title: ['카카오톡으로', '편하게 물어보세요'], lede: '상담은 무료이고 계약을 강요하지 않습니다. 블로그·홈페이지 무료 진단도 카카오톡으로 신청하시면 됩니다.' }) + main });
}

export function notFound(c) {
  return page(c, { title: '페이지를 찾을 수 없습니다', desc: META.home, bodyClass: 'p-404', body: `<section class="page-head nf"><div class="page-glow" aria-hidden="true"></div><div class="wrap"><p class="page-kicker serif">404</p><h1 class="page-title">페이지를 찾을 수 없습니다</h1><p class="page-lede">주소가 바뀌었거나 없는 페이지입니다.</p><div class="hero-btns">${btn(c.url(''), '홈으로')}${kakaoBtn(c, '카카오톡 상담', { variant: 'ghost' })}</div></div></section>` });
}
