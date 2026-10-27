/* =========================================================
   정적 페이지 생성 스크립트 — `node build.mjs`
   src/의 콘텐츠로 루트에 HTML 파일들을 만듭니다.
   ========================================================= */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  SITE, STATS, SERVICES, INDUSTRIES, CASES,
  PRINCIPLES, TIMELINE, TEAMS, PROCESS, FAQ, CONTACT_STEPS, POSTS
} from './src/data.mjs';
import { creative, icon } from './src/creatives.mjs';
import {
  page, pageHero, ctaBand, caseCard, postRow, lines, plotLine, dotDate, rootFor
} from './src/components.mjs';
import { homePage } from './src/home.mjs';

const OUT = dirname(fileURLToPath(import.meta.url));
const written = [];
function write(path, html) {
  const file = join(OUT, path.endsWith('.html') ? path : join(path, 'index.html'));
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  written.push(file.replace(`${OUT}/`, ''));
}

const enc = encodeURIComponent;
const casesFor = name => CASES.filter(c => c.services.includes(name));

/* ---------------------------------------------------------
   회사소개
   --------------------------------------------------------- */
function about() {
  const path = 'about/';
  const R = rootFor(path);
  const main = `
${pageHero({
  title: ['장면을 설계하는', '마케팅 회사입니다'],
  lede: '플롯라인은 2019년 성수동의 작은 사무실에서 광고 운영자 셋이 시작했습니다. 지금은 기획, 제작, 운영, 분석을 맡은 38명이 한 팀으로 일합니다.'
})}

<section class="section about-intro" aria-labelledby="about-statement">
  <div class="wrap">
    <p class="statement" id="about-statement" data-reveal>우리가 만드는 건 광고 한 편이 아니라, 고객이 광고를 보고 구매하기까지 이어지는 <mark>장면</mark>입니다.</p>
    <ul class="principles">
      ${PRINCIPLES.map((p, i) => `<li data-reveal style="--d:${i}"><h3>${p.title}</h3><p>${p.text}</p></li>`).join('')}
    </ul>
  </div>
</section>

<section class="section stats tone-mist" aria-labelledby="about-stats">
  <div class="wrap">
    <h2 class="stats-lead" id="about-stats" data-reveal>2019년부터 브랜드 140곳의 캠페인 1,280건을 운영했습니다.</h2>
    <ul class="stat-list">
      ${STATS.map((s, i) => `<li data-reveal style="--d:${i}"><strong data-count>${s.value}</strong><span>${s.label}</span></li>`).join('')}
    </ul>
  </div>
</section>

<section class="section" aria-labelledby="history-title">
  <div class="wrap">
    <div class="section-head">
      <h2 id="history-title" data-reveal="lines">${lines(['연혁'])}</h2>
      <p>세 명이 시작한 회사가 네 팀이 됐습니다.</p>
    </div>
    <ol class="timeline" data-reveal="timeline">
      ${TIMELINE.map((t, i) => `<li style="--i:${i}"><p class="tl-year">${t.year}</p><p class="tl-text">${t.text}</p></li>`).join('')}
    </ol>
  </div>
</section>

<section class="section teams-sec tone-mist" aria-labelledby="teams-title">
  <div class="wrap">
    <div class="section-head">
      <h2 id="teams-title" data-reveal="lines">${lines(['네 팀이', '한 브랜드를 맡습니다'])}</h2>
      <p>전략팀 담당자가 처음부터 끝까지 맡고, 나머지 세 팀에서 한 명씩 함께합니다.</p>
    </div>
    <ul class="team-list">
      ${TEAMS.map((t, i) => `<li data-reveal style="--d:${i}">
        <p class="team-count"><strong data-count>${t.count}</strong></p>
        <h3>${t.name}</h3>
        <p>${t.text}</p>
      </li>`).join('')}
    </ul>
  </div>
</section>

${ctaBand(R)}`;
  write(path, page({ path, title: '회사소개', description: '플롯라인이 일하는 방식과 연혁, 팀을 소개합니다.', current: 'about', main }));
}

/* ---------------------------------------------------------
   서비스
   --------------------------------------------------------- */
function processChart() {
  return `<div class="flight">
  <div class="flight-weeks" aria-hidden="true"><span></span><span>1주차</span><span>2주차</span><span>3주차</span><span>4주차</span><span>5주차</span><span>이후</span></div>
  <ol class="flight-steps">
    ${PROCESS.map((s, i) => `<li class="flight-step${s.kind ? ` is-${s.kind}` : ''}" style="--from:${s.from};--to:${s.to};--mfrom:${s.mfrom};--mto:${s.mto}">
      <div class="step-text"><h3><span class="step-num">${i + 1}</span>${s.title}</h3><p>${s.text}</p></div>
      <span class="step-bar" aria-hidden="true"></span>
    </li>`).join('')}
  </ol>
</div>`;
}

function services() {
  const path = 'services/';
  const R = rootFor(path);
  const items = SERVICES.map(s => {
    const related = casesFor(s.name).slice(0, 2);
    return `<article class="svc-item" id="${s.id}" aria-labelledby="${s.id}-title">
      <h2 class="svc-title" id="${s.id}-title" data-reveal="lines">${lines([s.name])}</h2>
      <p class="svc-lede">${s.long}</p>
      <dl class="svc-facts">
        <div><dt>맡는 일</dt><dd><ul>${s.work.map(w => `<li>${w}</li>`).join('')}</ul></dd></div>
        <div><dt>채널</dt><dd>${s.channels}</dd></div>
        <div><dt>같이 보는 숫자</dt><dd>${s.kpi}</dd></div>
      </dl>
      ${related.length ? `<ul class="mini-cases">${related.map(c => `<li><a class="mini-case" href="${R}work/${c.id}/" data-cursor="자세히 보기">
        <span class="mini-thumb">${creative(c.id, 'feed', { decorative: true })}</span>
        <span class="mini-text"><span class="mini-brand">${c.brand}</span><span class="mini-title">${c.title}</span><span class="hl mini-result">${c.card}</span></span>
      </a></li>`).join('')}</ul>` : ''}
      <div class="svc-actions">
        <a class="text-link" href="${R}work/?service=${enc(s.name)}">${s.name} 사례 모두 보기</a>
        <a class="text-link" href="${R}contact/?service=${enc(s.name)}">이 서비스로 문의하기</a>
      </div>
    </article>`;
  }).join('');

  const main = `
${pageHero({
  title: ['필요한 것만,', '또는 처음부터 끝까지'],
  lede: '광고 운영, 콘텐츠 제작, 데이터 분석 중 필요한 것만 골라 맡기셔도 됩니다. 어떤 조합이든 한 팀이 같은 목표를 보고 일합니다.'
})}

<section class="section svc-detail" aria-label="서비스 상세">
  <div class="wrap svc-layout">
    <nav class="svc-nav" aria-label="서비스 목록">
      <ul>${SERVICES.map(s => `<li><a href="#${s.id}">${s.name}</a></li>`).join('')}</ul>
    </nav>
    <div class="svc-items">${items}</div>
  </div>
</section>

<section class="section process tone-mist" aria-labelledby="process-title">
  <div class="wrap">
    <div class="section-head">
      <h2 id="process-title" data-reveal="lines">${lines(['일하는 방식'])}</h2>
      <p>첫 미팅부터 광고를 켜기까지 3주가 걸립니다. 그다음부터는 매주 리포트를 보내 드립니다.</p>
    </div>
    ${processChart()}
  </div>
</section>

<section class="section faq-sec" aria-labelledby="faq-title">
  <div class="wrap faq-layout">
    <h2 id="faq-title" class="faq-heading" data-reveal="lines">${lines(['자주 묻는 질문'])}</h2>
    <div class="faq-list">
      ${FAQ.map(f => `<details class="faq-item">
        <summary><span>${f.q}</span><span class="faq-icon" aria-hidden="true"></span></summary>
        <p class="faq-answer">${f.a}</p>
      </details>`).join('')}
    </div>
  </div>
</section>

${ctaBand(R)}`;
  write(path, page({ path, title: '서비스', description: '퍼포먼스 광고, 검색광고, SNS 운영, 브랜드 콘텐츠, 인플루언서, 데이터 리포트.', current: 'services', main }));
}

/* ---------------------------------------------------------
   포트폴리오
   --------------------------------------------------------- */
function work() {
  const path = 'work/';
  const R = rootFor(path);
  const chips = (key, list) => ['전체', ...list].map(v =>
    `<button type="button" class="chip" data-value="${v}" aria-pressed="${v === '전체'}">${v}</button>`).join('');
  const main = `
${pageHero({ title: ['포트폴리오'], lede: '브랜드마다 다른 장면을 설계했습니다. 서비스와 업종으로 골라 보세요.' })}

<section class="section work-sec" aria-label="사례 목록">
  <div class="wrap">
    <div class="filters">
      <div class="filter-group" role="group" aria-labelledby="f-service">
        <span class="filter-label" id="f-service">서비스</span>
        <div class="chips" data-filter="service">${chips('service', SERVICES.map(s => s.name))}</div>
      </div>
      <div class="filter-group" role="group" aria-labelledby="f-industry">
        <span class="filter-label" id="f-industry">업종</span>
        <div class="chips" data-filter="industry">${chips('industry', INDUSTRIES)}</div>
      </div>
    </div>
    <p class="result-count" aria-live="polite">사례 <strong>${CASES.length}</strong>개</p>
    <ul class="work-grid">${CASES.map(c => caseCard(c, R)).join('')}</ul>
    <div class="work-empty" hidden>
      <p>이 조건에 맞는 사례가 아직 없어요. 서비스나 업종 중 하나를 전체로 바꿔 보세요.</p>
      <button type="button" class="btn btn-line" data-reset-filters>필터 초기화</button>
    </div>
  </div>
</section>

${ctaBand(R)}`;
  write(path, page({ path, title: '포트폴리오', description: '플롯라인이 운영한 캠페인 사례입니다.', current: 'work', main }));
}

function casePage(c, i) {
  const path = `work/${c.id}/`;
  const R = rootFor(path);
  const next = CASES[(i + 1) % CASES.length];
  const main = `
${pageHero({
  cls: 'case-hero',
  title: [c.title],
  before: `<a class="back-link" href="${R}work/">${icon('arrowLeft')}포트폴리오</a><p class="case-kicker">${c.brand}</p>`,
  after: `<dl class="case-facts">
      <div><dt>업종</dt><dd>${c.industry}</dd></div>
      <div><dt>맡은 서비스</dt><dd>${c.services.join(', ')}</dd></div>
      <div><dt>기간</dt><dd>${c.period}</dd></div>
      <div><dt>채널</dt><dd>${c.channels}</dd></div>
    </dl>`
})}

<section class="case-banner" aria-label="대표 광고 소재">
  <div class="wrap">
    <div class="case-banner-frame" data-reveal="wipe" data-parallax="0.04">
      <div class="case-banner-inner">${creative(c.id, 'banner')}</div>
    </div>
  </div>
</section>

<section class="section case-results" aria-labelledby="results-title">
  <div class="wrap">
    <h2 class="sr-only" id="results-title">결과</h2>
    <ul class="result-list">
      ${c.results.map((r, k) => `<li data-reveal style="--d:${k}"><strong data-count>${r.v}</strong><span>${r.l}</span></li>`).join('')}
    </ul>
  </div>
</section>

<section class="section case-story" aria-label="캠페인 이야기">
  <div class="wrap">
    ${[['과제', c.challenge], ['전략', c.strategy], ['결과', c.result]].map(([h, t]) => `<div class="story-row">
      <h2>${h}</h2>
      <p data-reveal>${t}</p>
    </div>`).join('')}
  </div>
</section>

<section class="section case-gallery tone-mist" aria-labelledby="gallery-title">
  <div class="wrap">
    <h2 class="sr-only" id="gallery-title">광고 소재</h2>
    <div class="gallery">
      <figure class="g-feed" data-reveal="wipe">${creative(c.id, 'feed')}</figure>
      <figure class="g-story" data-reveal="wipe" style="--d:1">${creative(c.id, 'story')}</figure>
    </div>
    <p class="pen-note">피드, 스토리, 배너 소재를 함께 만들었어요</p>
  </div>
</section>

<section class="section case-cta" aria-label="문의">
  <div class="wrap case-cta-inner">
    <p>비슷한 고민이 있다면 이야기해 주세요.</p>
    <a class="btn btn-primary btn-lg" href="${R}contact/?case=${c.id}">이 사례로 문의하기</a>
  </div>
</section>

<a class="next-case" href="${R}work/${next.id}/" data-dark data-cursor="다음 사례">
  <span class="wrap next-inner">
    <span class="next-label">다음 사례</span>
    <span class="next-title">${next.title}</span>
    <span class="next-brand">${next.brand}</span>
  </span>
  <span class="next-thumb" aria-hidden="true">${creative(next.id, 'feed', { decorative: true })}</span>
</a>`;
  write(path, page({ path, title: `${c.brand} 사례`, description: `${c.title}. ${c.result}`, current: 'work', main }));
}

/* ---------------------------------------------------------
   인사이트
   --------------------------------------------------------- */
function insights() {
  const path = 'insights/';
  const R = rootFor(path);
  const main = `
${pageHero({ title: ['인사이트'], lede: '광고를 직접 운영하며 배운 것을 정리합니다.' })}
<section class="section" aria-label="글 목록">
  <div class="wrap">
    <ul class="post-rows is-large">${POSTS.map(p => postRow(p, R, { summary: true })).join('')}</ul>
  </div>
</section>
${ctaBand(R)}`;
  write(path, page({ path, title: '인사이트', description: '광고를 직접 운영하며 배운 것을 정리합니다.', current: 'insights', main }));
}

function post(p) {
  const path = `insights/${p.slug}/`;
  const R = rootFor(path);
  const body = p.body.map(([type, text]) => {
    if (type === 'h2') return `<h2>${text}</h2>`;
    if (type === 'callout') return `<aside class="callout"><span class="callout-label">현장 메모</span><p>${text}</p></aside>`;
    return `<p>${text}</p>`;
  }).join('\n');
  const others = POSTS.filter(o => o.slug !== p.slug);
  const main = `
<div class="read-progress" aria-hidden="true"><span></span></div>
${pageHero({
  cls: 'post-hero',
  title: [p.title],
  lede: p.summary,
  before: `<a class="back-link" href="${R}insights/">${icon('arrowLeft')}인사이트</a>
    <p class="post-meta"><span class="post-meta-cat">${p.cat}</span><time datetime="${p.date}">${dotDate(p.date)}</time><span>읽는 데 ${p.read}</span></p>`
})}
<article class="section article" aria-label="본문">
  <div class="wrap article-wrap">
    <div class="article-body">
${body}
    </div>
  </div>
</article>
<section class="section tone-mist" aria-labelledby="more-title">
  <div class="wrap">
    <div class="section-head"><h2 id="more-title">다른 글</h2><a class="text-link" href="${R}insights/">인사이트 전체 보기</a></div>
    <ul class="post-rows">${others.map(o => postRow(o, R)).join('')}</ul>
  </div>
</section>
${ctaBand(R)}`;
  write(path, page({ path, title: p.title, description: p.summary, current: 'insights', main }));
}

/* ---------------------------------------------------------
   문의
   --------------------------------------------------------- */
const MAP_SVG = `<svg viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice" role="img" aria-label="오시는 길 약도 (시안용 가상 위치)">
  <rect width="1200" height="520" fill="#E7EAF1"/>
  <path d="M-20 400 C 200 360, 380 430, 600 392 S 980 300, 1220 330 L 1220 470 C 980 440, 800 520, 600 500 S 200 470, -20 520 Z" fill="#CFDDF2"/>
  <g fill="#D8E9D2"><rect x="80" y="70" width="210" height="130" rx="18"/><rect x="900" y="60" width="220" height="110" rx="18"/></g>
  <g fill="#F7F8FB">
    <rect x="320" y="60" width="150" height="90" rx="8"/><rect x="490" y="60" width="130" height="90" rx="8"/><rect x="640" y="60" width="110" height="90" rx="8"/>
    <rect x="320" y="200" width="150" height="110" rx="8"/><rect x="490" y="200" width="130" height="110" rx="8"/><rect x="770" y="200" width="160" height="110" rx="8"/>
    <rect x="80" y="240" width="210" height="80" rx="8"/><rect x="960" y="200" width="160" height="90" rx="8"/>
  </g>
  <g stroke="#FFFFFF" stroke-width="22" stroke-linecap="round" fill="none">
    <path d="M-20 178 H 1220"/><path d="M300 -20 V 360"/><path d="M760 -20 V 350"/>
  </g>
  <g stroke="#FFFFFF" stroke-width="10" stroke-linecap="round" fill="none">
    <path d="M480 40 V 330"/><path d="M630 40 V 330"/><path d="M60 225 H 300"/><path d="M940 120 V 320"/>
  </g>
  <path d="M-20 178 H 1220" stroke="#C7CDDB" stroke-width="2" stroke-dasharray="14 12"/>
  <g transform="translate(700 236)">
    <circle r="54" fill="#2B3CFF" opacity=".12"/>
    <path d="M0 18 C -16 0, -22 -10, -22 -22 A 22 22 0 0 1 22 -22 C 22 -10, 16 0, 0 18 Z" fill="#2B3CFF"/>
    <circle cy="-22" r="8" fill="#FFFFFF"/>
  </g>
  <g transform="translate(730 150)">
    <rect width="184" height="44" rx="22" fill="#14172B"/>
    <text x="92" y="28" text-anchor="middle" font-family="'SUIT Variable', sans-serif" font-size="17" font-weight="800" fill="#FFFFFF">플롯라인</text>
  </g>
  <g transform="translate(300 178)">
    <circle r="15" fill="#FFFFFF" stroke="#14172B" stroke-width="3"/>
    <text y="5.5" text-anchor="middle" font-family="'SUIT Variable', sans-serif" font-size="14" font-weight="800" fill="#14172B">역</text>
  </g>
  <text x="300" y="222" text-anchor="middle" font-family="'SUIT Variable', sans-serif" font-size="15" font-weight="700" fill="#5C6178">지하철역 도보 5분</text>
</svg>`;

function contact() {
  const path = 'contact/';
  const R = rootFor(path);
  const caseMap = Object.fromEntries(CASES.map(c => [c.id, { brand: c.brand, services: c.services }]));
  const main = `
${pageHero({ title: ['어떤 장면부터', '바꿔 볼까요?'], lede: '광고 계정이나 매출 상황을 간단히 적어 주세요. 2영업일 안에 담당자가 연락드립니다.' })}

<section class="section contact-sec" aria-label="문의하기">
  <div class="wrap contact-grid">
    <aside class="contact-side">
      <dl class="contact-info">
        <div><dt>전화</dt><dd>${SITE.phone}</dd></div>
        <div><dt>이메일</dt><dd><a href="mailto:${SITE.email}">${SITE.email}</a></dd></div>
        <div><dt>운영 시간</dt><dd>${SITE.hours}</dd></div>
        <div><dt>주소</dt><dd>${SITE.address}</dd></div>
      </dl>
      <h2 class="side-title">상담은 이렇게 진행돼요</h2>
      <ol class="steps">
        ${CONTACT_STEPS.map((s, i) => `<li><span class="steps-num">${i + 1}</span><div><h3>${s.title}</h3><p>${s.text}</p></div></li>`).join('')}
      </ol>
    </aside>

    <form class="contact-form" novalidate>
      <div class="field-row">
        <div class="field">
          <label for="f-company">회사명 <span class="req">필수</span></label>
          <input id="f-company" name="company" type="text" autocomplete="organization" required aria-describedby="e-company">
          <p class="field-error" id="e-company"></p>
        </div>
        <div class="field">
          <label for="f-name">담당자 이름 <span class="req">필수</span></label>
          <input id="f-name" name="name" type="text" autocomplete="name" required aria-describedby="e-name">
          <p class="field-error" id="e-name"></p>
        </div>
      </div>
      <div class="field-row">
        <div class="field">
          <label for="f-phone">연락처 <span class="req">필수</span></label>
          <input id="f-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="010-0000-0000" required aria-describedby="e-phone">
          <p class="field-error" id="e-phone"></p>
        </div>
        <div class="field">
          <label for="f-email">이메일</label>
          <input id="f-email" name="email" type="email" autocomplete="email" aria-describedby="e-email">
          <p class="field-error" id="e-email"></p>
        </div>
      </div>
      <fieldset class="field">
        <legend>관심 있는 서비스</legend>
        <div class="check-chips">
          ${SERVICES.map(s => `<label class="check-chip"><input type="checkbox" name="services" value="${s.name}"><span>${s.name}</span></label>`).join('')}
        </div>
      </fieldset>
      <div class="field">
        <label for="f-budget">월 광고 예산</label>
        <select id="f-budget" name="budget">
          <option value="">선택해 주세요</option>
          <option>300만 원 미만</option>
          <option>300만 원 ~ 1,000만 원</option>
          <option>1,000만 원 ~ 3,000만 원</option>
          <option>3,000만 원 이상</option>
          <option>아직 정하지 않았어요</option>
        </select>
      </div>
      <div class="field">
        <label for="f-message">문의 내용 <span class="req">필수</span></label>
        <textarea id="f-message" name="message" rows="6" placeholder="지금 운영 중인 채널, 고민되는 점을 적어 주세요." required aria-describedby="e-message"></textarea>
        <p class="field-error" id="e-message"></p>
      </div>
      <div class="field consent">
        <label class="consent-label">
          <input type="checkbox" name="privacy" required aria-describedby="e-privacy">
          <span>개인정보 수집과 이용에 동의합니다 <span class="req">필수</span></span>
        </label>
        <details class="consent-detail">
          <summary>내용 보기</summary>
          <p>수집 항목: 회사명, 담당자 이름, 연락처, 이메일. 이용 목적: 문의 답변과 상담. 보관 기간: 상담 종료 후 1년.</p>
        </details>
        <p class="field-error" id="e-privacy"></p>
      </div>
      <button type="submit" class="btn btn-primary btn-lg submit-button">문의 보내기</button>
    </form>
  </div>
</section>

<section class="section tone-mist" aria-labelledby="map-title">
  <div class="wrap">
    <div class="section-head">
      <h2 id="map-title" data-reveal="lines">${lines(['오시는 길'])}</h2>
      <p>${SITE.address}<br>지하철역에서 걸어서 5분 거리입니다.</p>
    </div>
    <div class="map" data-reveal="wipe">${MAP_SVG}</div>
  </div>
</section>
<script type="application/json" id="case-map">${JSON.stringify(caseMap)}</script>`;
  write(path, page({ path, title: '문의하기', description: '광고 계정이나 매출 상황을 남겨 주시면 2영업일 안에 연락드립니다.', current: 'contact', main }));
}

/* ---------------------------------------------------------
   404 (GitHub Pages는 어느 깊이에서든 이 파일을 보여 주므로 절대 경로 사용)
   --------------------------------------------------------- */
function notFound() {
  const R = '/test/';
  const main = `
<section class="page-hero nf-hero" data-dark>
  ${plotLine()}
  <div class="wrap page-hero-inner">
    <h1 class="page-title">${lines(['찾는 페이지가', '없어요'])}</h1>
    <p class="page-lede">주소가 바뀌었거나 삭제된 페이지예요. 처음 화면이나 포트폴리오에서 다시 찾아보세요.</p>
    <div class="nf-actions">
      <a class="btn btn-light btn-lg" href="${R}">처음으로</a>
      <a class="btn btn-ghost-light btn-lg" href="${R}work/">포트폴리오 보기</a>
    </div>
  </div>
</section>`;
  write('404.html', page({ path: '404.html', title: '페이지를 찾을 수 없어요', main, rootOverride: R }));
}

write('index.html', homePage());
about();
services();
work();
CASES.forEach(casePage);
insights();
POSTS.forEach(post);
contact();
notFound();

console.log(`${written.length} pages`);
written.forEach(f => console.log(` - ${f}`));
