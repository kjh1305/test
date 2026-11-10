/* 페이지 본문: 홈, 회사소개, 사업분야, 작업사례, 상담문의, 없는 주소 */
import { CO, PH, HERO, FACTS, SERVICES, EXTRA, SERVICE_OPTS, SODA, SAFETY, TIPS, PROCESS, REGIONS, WORK_CATS, MORE_WORKS, HOME, ABOUT, SERVICES_PAGE, WORKS_PAGE, CONTACT, META } from './content.mjs';
import { icon, boilerDiagram, tubeSection } from './art.mjs';
import { page, pageHero, ctaBand, btn, callBtn, lines, secHead, esc, ph, val, imgSlot, photo, telHref, officeHref, phoneText } from './layout.mjs';

const contactFor = (c, svc) => c.url('contact/') + `?service=${svc}`;

/* ---------- 공통 조각 ---------- */
const processList = () => `<ol class="proc">${PROCESS.map((p, i) => `<li><span class="proc-joint">${icon(p.icon)}</span><span class="proc-no">${i + 1}단계</span><h3>${p.title}</h3><p>${p.text}</p></li>`).join('')}</ol>`;

/* 소다 보일링 준비 1~4단계: 계통도 + 번호 목록 */
const sodaDiagram = (cls = '') => `<div class="bd-wrap ${cls}">
  <figure class="bd-card" data-bd>${boilerDiagram()}<figcaption>수관식 보일러를 단순하게 그린 계통도입니다. 주황 선이 약품이 도는 길입니다.</figcaption></figure>
  <ol class="bd-steps">${SODA.phases[0].steps.map((s, i) => `<li><span class="bd-no" aria-hidden="true">${i + 1}</span><div><h3>${s.t}</h3><p>${s.d}</p></div></li>`).join('')}</ol>
</div>`;

const beforeAfter = c => `<div class="ba">
  <figure class="ba-item ba-before">${imgSlot(c, SODA.before)}<figcaption><b>세척 전</b>${SODA.before.cap.split('· ')[1]}</figcaption></figure>
  ${SODA.after.map(a => `<figure class="ba-item ba-after">${imgSlot(c, a)}<figcaption><b>고압세척 후</b>${a.cap.split('· ')[1]}</figcaption></figure>`).join('')}
</div>`;

const tipsList = (open = false) => `<div class="tips">${TIPS.map((t, i) => `<details class="tip"${open || i === 0 ? ' open' : ''}><summary><span>${t.q}</span>${icon('chev', 'ic tip-ic')}</summary><p>${t.a}</p></details>`).join('')}</div>`;

/* ================= 홈 ================= */
export function home(c) {
  const hero = `<section class="hero">
  <div class="wrap hero-in">
    <div class="hero-text">
      <p class="hero-kicker">${HERO.kicker}</p>
      <h1 class="hero-title">${lines(HERO.title)}</h1>
      <p class="hero-lede">${HERO.lede}</p>
      <div class="hero-btns">${callBtn(c, { cls: 'btn-lg' })}${btn(c.url('contact/'), '상담문의 남기기', { variant: 'line', ic: 'doc', cls: 'btn-lg' })}</div>
      <p class="hero-lines"><a href="${officeHref()}">${icon('office')}사무실 ${CO.office}</a><a href="mailto:${CO.email}">${icon('mail')}${CO.email}</a></p>
    </div>
    <figure class="hero-photo">
      ${imgSlot(c, HERO, { label: '대표 현장 사진', eager: true })}
      <figcaption>${HERO.caption}</figcaption>
    </figure>
  </div>
  <div class="wrap"><ul class="facts">${FACTS.map(f => `<li>${icon(f.icon)}<div><b>${f.title}</b><span>${f.text}</span></div></li>`).join('')}</ul></div>
</section>`;

  const services = `<section class="sec">
  <div class="wrap">
    <div class="sec-row">${secHead({ title: HOME.servicesTitle, sub: HOME.servicesSub })}${btn(c.url('services/'), '사업분야 자세히', { variant: 'line', ic: 'chev' })}</div>
    <ul class="svc-list">${SERVICES.map(s => `<li><a href="${c.url('services/')}#${s.id}">
      <span class="svc-ic">${icon(s.icon)}</span>
      <span class="svc-main"><b>${s.name}</b><small>${s.work}</small></span>
      <span class="svc-short">${s.short}</span>
      ${icon('chev', 'ic svc-go')}
    </a></li>`).join('')}</ul>
    <div class="extra-row"><p>그 밖에</p><ul>${EXTRA.map(e => `<li><a href="${c.url('services/')}#extra">${e.name}</a></li>`).join('')}<li><a href="${c.url('services/')}#marine">탱크 크리닝</a></li></ul></div>
  </div>
</section>`;

  const caseSec = `<section class="sec sec-steel" id="case">
  <div class="wrap">
    <div class="sec-row">
      <div class="sec-head"><p class="case-tag">작업사례 · ${SODA.where} · ${SODA.boiler}</p><h2 class="sec-title">${lines(HOME.caseTitle)}</h2><p class="sec-sub">${HOME.caseSub}</p></div>
      <div class="case-btns">${btn(c.url('works/') + '#soda', '작업 과정 전체', { variant: 'ink', ic: 'chev' })}${btn(SODA.post, '블로그 원문', { variant: 'line', ext: true })}</div>
    </div>
    ${sodaDiagram()}
    ${beforeAfter(c)}
  </div>
</section>`;

  const tips = `<section class="sec">
  <div class="wrap tips-in">
    <div>
      ${secHead({ title: HOME.tipsTitle, sub: HOME.tipsSub })}
      ${photo(c, SAFETY.photos[2], 'tips-photo')}
      <a class="more" href="${SAFETY.post}" target="_blank" rel="noopener">블로그 글 「보일러 세관 공사 중 겪은 일들 - 4」${icon('external')}</a>
    </div>
    ${tipsList()}
  </div>
</section>`;

  const process = `<section class="sec sec-steel">
  <div class="wrap">
    ${secHead({ title: HOME.processTitle })}
    ${processList()}
  </div>
</section>`;

  const regions = `<section class="regions">
  <div class="wrap regions-in">
    <p class="regions-title">${icon('pin')}${HOME.regionsTitle}</p>
    <ul>${REGIONS.map(r => `<li>${r}</li>`).join('')}</ul>
  </div>
</section>`;

  return page(c, { title: '', desc: META.home, bodyClass: 'p-home', body: hero + services + caseSec + tips + process + regions + ctaBand(c) });
}

/* ================= 회사소개 ================= */
export function about(c) {
  const intro = `<section class="sec">
  <div class="wrap intro-in">
    <div>
      ${secHead({ title: ABOUT.introTitle })}
      <p class="draft-badge">${icon('doc')}${ABOUT.draft}</p>
      ${photo(c, { ...HERO, cap: HERO.caption }, 'intro-photo')}
    </div>
    <div class="intro-body">
      ${ABOUT.intro.map(p => `<p>${p}</p>`).join('')}
      <p class="intro-sign">${ABOUT.sign} ${ph()}</p>
      <ul class="facts facts-col">${FACTS.map(f => `<li>${icon(f.icon)}<div><b>${f.title}</b><span>${f.text}</span></div></li>`).join('')}</ul>
    </div>
  </div>
</section>`;
  const ways = `<section class="sec sec-steel">
  <div class="wrap">
    ${secHead({ title: ABOUT.waysTitle, sub: '소다 보일링과 안전밸브 정비 글에 적은 원칙을 옮겼습니다.' })}
    <ul class="ways">${ABOUT.ways.map(w => `<li><span class="ways-ic">${icon(w.icon)}</span><h3>${w.title}</h3><p>${w.text}</p></li>`).join('')}</ul>
  </div>
</section>`;
  const rows = [
    ['상호', CO.name],
    ['대표', val(CO.rep)],
    ['사업 분야', '산업용 보일러·열교환기·소각로 세관과 수리, 튜브 교체·축로, 계속사용안전검사 대행'],
    ['휴대폰', `<a href="${telHref(c)}">${CO.phone}</a>`],
    ['사무실', `<a href="${officeHref()}">${CO.office}</a>`],
    ['이메일', `<a href="mailto:${CO.email}">${CO.email}</a>`],
    ['홈페이지', CO.site],
    ['출장 지역', REGIONS.join(', ')],
    ['주소', val(CO.address)],
    ['사업자등록번호', val(CO.bizNo)],
    ['면허·등록', val(CO.license)],
    ['블로그', `<a href="${CO.blog}" target="_blank" rel="noopener">${CO.blogName}${icon('external')}</a>`]
  ];
  const info = `<section class="sec">
  <div class="wrap info-in">
    <div>
      ${secHead({ title: ABOUT.infoTitle })}
      <figure class="mascot-card">
        <img src="${c.asset('img/mascot-thumb.webp')}" width="400" height="528" alt="${ABOUT.mascotAlt}" loading="lazy" decoding="async">
        <figcaption><b>${ABOUT.mascotTitle}</b>${ABOUT.mascotText}</figcaption>
      </figure>
    </div>
    <dl class="info-table">${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
  </div>
</section>
<section class="sec sec-tight" id="location">
  <div class="wrap">
    ${secHead({ title: ABOUT.mapTitle })}
    <div class="map-ph">${icon('pin')}<b>지도 자리</b><span>${PH}</span><small>정확한 주소를 받으면 지도와 네이버·카카오 지도 링크를 넣습니다.</small></div>
  </div>
</section>`;
  return page(c, {
    title: '회사소개', desc: META.about, bodyClass: 'p-about',
    body: pageHero(c, { title: ABOUT.heroTitle, lede: ABOUT.heroLede, crumb: '회사소개' }) + intro + ways + info + ctaBand(c)
  });
}

/* ================= 사업분야 ================= */
export function services(c) {
  const chips = `<nav class="pnav" aria-label="사업분야 바로가기"><div class="wrap"><ul>${SERVICES.map(s => `<li><a href="#${s.id}">${icon(s.icon)}${s.name}</a></li>`).join('')}<li><a href="#extra">${icon('flow')}그 밖에</a></li></ul></div></nav>`;
  const secs = SERVICES.map((s, i) => `<section class="sec svc-sec${i % 2 ? ' rev' : ''}" id="${s.id}">
  <div class="wrap svc-in">
    <div class="svc-media">
      ${imgSlot(c, s, { label: `${s.name} 현장 사진`, alt: s.alt })}
      ${s.id === 'boiler' ? `<figure class="xsecs">
        <div class="xsec-pair">
          <div class="xsec-item">${tubeSection('before')}<p><b>스케일이 쌓인 튜브</b>물길이 좁아지고 열이 덜 전달됨</p></div>
          <div class="xsec-item">${tubeSection('after')}<p><b>세관 후</b>안쪽 스케일을 걷어 낸 튜브</p></div>
        </div>
        <figcaption>${SERVICES_PAGE.scaleNote}</figcaption>
      </figure>` : ''}
    </div>
    <div class="svc-text">
      <p class="svc-work">${icon(s.icon)}${s.work}</p>
      <h2 class="svc-name">${s.name}</h2>
      <p class="svc-lead">${s.short}</p>
      <p class="svc-body">${s.text}</p>
      <ul class="svc-items">${s.items.map(it => `<li>${icon('check')}<span>${it}</span></li>`).join('')}</ul>
      <div class="svc-btns">${btn(contactFor(c, s.id), '이 작업 상담문의', { variant: 'ink', ic: 'doc' })}${s.id === 'inspection' ? btn(c.url('works/') + '#safety', '안전밸브 정비 사례', { variant: 'line', ic: 'chev' }) : s.id === 'tube' ? btn(c.url('works/') + '#soda', '소다 보일링 사례', { variant: 'line', ic: 'chev' }) : ''}</div>
    </div>
  </div>
</section>`).join('');
  const extra = `<section class="sec sec-steel" id="extra">
  <div class="wrap">
    ${secHead({ title: SERVICES_PAGE.extraTitle })}
    <ul class="extra-grid">${EXTRA.map(e => `<li>
      <p class="extra-sub">${e.sub}</p>
      <h3>${e.name}</h3>
      <p>${e.text}</p>
      <div class="extra-links"><a class="more" href="${contactFor(c, e.id)}">상담문의${icon('chev')}</a>${e.id === 'soda' ? `<a class="more" href="${c.url('works/')}#soda">작업사례${icon('chev')}</a>` : ''}</div>
    </li>`).join('')}</ul>
  </div>
</section>
<section class="sec">
  <div class="wrap tips-in">
    <div>${secHead({ title: HOME.tipsTitle, sub: HOME.tipsSub })}<a class="more" href="${SAFETY.post}" target="_blank" rel="noopener">블로그 원문 보기${icon('external')}</a></div>
    ${tipsList()}
  </div>
</section>`;
  return page(c, {
    title: '사업분야', desc: META.services, bodyClass: 'p-services',
    body: pageHero(c, { title: SERVICES_PAGE.heroTitle, lede: SERVICES_PAGE.heroLede, crumb: '사업분야' }) + chips + secs + extra + ctaBand(c)
  });
}

/* ================= 작업사례 ================= */
export function works(c) {
  let n = 0;
  const caseNav = `<nav class="pnav" aria-label="작업사례 바로가기"><div class="wrap"><ul>
    <li><a href="#soda">${icon('flow')}소다 보일링</a></li><li><a href="#safety">${icon('shield')}안전밸브 정비</a></li><li><a href="#more">${icon('camera')}더 받을 사례</a></li>
  </ul></div></nav>`;
  const phases = SODA.phases.map((p, pi) => `<div class="phase">
    <div class="phase-head"><h3>${p.name}</h3></div>
    <ol class="phase-steps" start="${n + 1}">${p.steps.map(s => { n++; return `<li><span class="bd-no" aria-hidden="true">${n}</span><div><h4>${s.t}</h4><p>${s.d}</p></div></li>`; }).join('')}</ol>
    ${p.photos.length ? `<div class="phase-photos n${p.photos.length}">${p.photos.map(ph => photo(c, ph)).join('')}</div>` : ''}
  </div>`).join('');

  const soda = `<section class="sec case" id="soda">
  <div class="wrap">
    <div class="case-head">
      <div>
        <p class="case-tag">사례 1 · ${SODA.when}</p>
        <h2 class="sec-title">${SODA.title}</h2>
        <p class="case-why">${SODA.why}</p>
        <dl class="case-meta">
          <div><dt>현장</dt><dd>${SODA.where}</dd></div>
          <div><dt>설비</dt><dd>${SODA.boiler}</dd></div>
          <div><dt>작업</dt><dd>소다 보일링(알칼리 보일링), 고압세척</dd></div>
        </dl>
        <p class="case-links">${btn(SODA.post, '블로그 원문', { variant: 'line', ext: true })}${btn(contactFor(c, 'soda'), '소다 보일링 상담문의', { variant: 'ink', ic: 'doc' })}</p>
      </div>
      ${photo(c, SODA.boilerImg, 'case-boiler')}
    </div>
    <h3 class="sub-title">약품이 도는 길</h3>
    ${sodaDiagram('bd-wrap-case')}
    <h3 class="sub-title">작업 순서</h3>
    <div class="phases">${phases}</div>
    <h3 class="sub-title">세척 전과 후</h3>
    ${beforeAfter(c)}
    <p class="photo-note">${icon('info')}<span>세척 전 사진은 상부 드럼, 세척 후 사진은 드럼 내부와 하부 드럼 바닥입니다. 같은 자리를 찍은 사진은 아닙니다.</span></p>
  </div>
</section>`;

  const safety = `<section class="sec sec-steel case" id="safety">
  <div class="wrap">
    <div class="case-head case-head-text">
      <div>
        <p class="case-tag">사례 2 · 법정검사(계속사용안전검사) 준비</p>
        <h2 class="sec-title">${SAFETY.title}</h2>
        <p class="case-why">${SAFETY.lead}</p>
        <p class="case-links">${btn(SAFETY.post, '블로그 원문', { variant: 'line', ext: true })}${btn(contactFor(c, 'inspection'), '법정검사 상담문의', { variant: 'ink', ic: 'doc' })}</p>
      </div>
    </div>
    <div class="sv-grid">${photo(c, { ...HERO, cap: HERO.caption }, 'sv-main')}${SAFETY.photos.map(p => photo(c, p)).join('')}</div>
    <div class="tips-in tips-in-case">
      <h3 class="sub-title">이 작업에서 배운 것</h3>
      ${tipsList()}
    </div>
  </div>
</section>`;

  const more = `<section class="sec" id="more">
  <div class="wrap">
    ${secHead({ title: WORKS_PAGE.moreTitle, sub: WORKS_PAGE.moreNote })}
    <ul class="wk-grid">${MORE_WORKS.map((w, i) => `<li class="wk">
      ${imgSlot(c, w, { label: '현장 사진', alt: w.title || WORK_CATS[w.cat] })}
      <div class="wk-body">
        <span class="wk-cat">${WORK_CATS[w.cat]}</span>
        <h3 class="wk-title">${w.title || ph(`사례 제목 · ${PH}`)}</h3>
        <dl class="wk-meta"><div><dt>현장</dt><dd>${val(w.where)}</dd></div></dl>
      </div>
    </li>`).join('')}</ul>
    <p class="wk-blog">${btn(CO.blog, '블로그에서 작업 소식 보기', { variant: 'line', ext: true })}</p>
  </div>
</section>`;

  return page(c, {
    title: '작업사례', desc: META.works, bodyClass: 'p-works',
    body: pageHero(c, { title: WORKS_PAGE.heroTitle, lede: WORKS_PAGE.heroLede, crumb: '작업사례' }) + caseNav + soda + safety + more + ctaBand(c)
  });
}

/* ================= 상담문의 ================= */
export function contact(c) {
  const req = '<em class="req" aria-hidden="true">*</em><span class="sr">필수</span>';
  const seg = (name, items) => `<div class="seg">${items.map(([v, l]) => `<label><input type="radio" name="${name}" value="${v}"><span>${l}</span></label>`).join('')}</div>`;
  const form = `<form class="qform" novalidate data-form data-errors="${esc(JSON.stringify(CONTACT.errors))}" data-sent="${esc(CONTACT.sent)}" data-prefilled="${esc(CONTACT.prefilled)}">
  <fieldset class="fset"><legend>어떤 작업인가요?</legend>${seg('service', SERVICE_OPTS)}</fieldset>
  <fieldset class="fset"><legend>설비 종류</legend>${seg('equipment', CONTACT.equipment.map(e => [e, e]))}</fieldset>
  <div class="fgrid">
    <div class="field"><label for="f-company">회사명</label><input id="f-company" name="company" type="text" autocomplete="organization"></div>
    <div class="field"><label for="f-site">현장 위치</label><input id="f-site" name="site" type="text" placeholder="예: 울산 ○○산업단지"></div>
    <div class="field"><label for="f-size">설비 용량</label><input id="f-size" name="size" type="text" placeholder="예: 수관식 30톤/시"></div>
    <div class="field"><label for="f-when">희망 일정</label><input id="f-when" name="when" type="text" placeholder="예: 다음 달 정기 보수 기간"></div>
    <div class="field"><label for="f-name">담당자${req}</label><input id="f-name" name="name" type="text" autocomplete="name" required></div>
    <div class="field"><label for="f-phone">연락처${req}</label><input id="f-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="010-0000-0000" required></div>
    <div class="field span2"><label for="f-email">이메일</label><input id="f-email" name="email" type="email" autocomplete="email"></div>
  </div>
  <div class="field"><label for="f-message">문의 내용${req}</label><textarea id="f-message" name="message" rows="6" placeholder="증상, 하려는 작업, 최근 검사·세관 시기처럼 아는 내용을 적어 주세요." required></textarea></div>
  <div class="field consent">
    <label class="check"><input id="f-privacy" name="privacy" type="checkbox" required><span class="box" aria-hidden="true">${icon('check')}</span><span>개인정보 수집과 이용에 동의합니다${req}</span></label>
    <details class="privacy-more"><summary>내용 보기</summary><p>${CONTACT.privacyText}</p></details>
  </div>
  <button class="btn btn-call btn-lg btn-submit" type="submit"><span>상담문의 보내기</span>${icon('chev')}</button>
</form>`;
  const aside = `<aside class="contact-aside">
  <div class="ca-call">
    <p>급하면 휴대폰으로 바로 전화 주세요</p>
    <a class="ca-num" href="${telHref(c)}">${icon('phone')}${phoneText()}</a>
    <dl>
      <div><dt>${icon('office')}사무실</dt><dd><a href="${officeHref()}">${CO.office}</a></dd></div>
      <div><dt>${icon('mail')}이메일</dt><dd><a href="mailto:${CO.email}">${CO.email}</a></dd></div>
      <div><dt>${icon('globe')}홈페이지</dt><dd>${CO.site}</dd></div>
      <div><dt>${icon('pin')}출장 지역</dt><dd>${REGIONS.join(' · ')}</dd></div>
    </dl>
  </div>
  <div class="ca-card"><h2>상담 때 알려 주시면 좋은 것</h2><ul class="ca-tell">${CONTACT.tellUs.map(x => `<li>${icon('check')}<span>${x}</span></li>`).join('')}</ul></div>
  <a class="ca-blog" href="${CO.blog}" target="_blank" rel="noopener">${icon('blog')}<span><b>${CO.blogName}</b><small>작업 기록과 점검 상식</small></span>${icon('external')}</a>
</aside>`;
  return page(c, {
    title: '상담문의', desc: META.contact, bodyClass: 'p-contact',
    body: pageHero(c, { title: CONTACT.heroTitle, lede: CONTACT.heroLede, crumb: '상담문의' }) + `<section class="sec sec-tight-top"><div class="wrap contact-in">${form}${aside}</div></section>`
  });
}

/* ================= 없는 주소 ================= */
export function notFound(c) {
  return page(c, {
    title: '페이지를 찾을 수 없어요', desc: '주소가 바뀌었거나 없는 페이지입니다.', bodyClass: 'p-404',
    body: `<section class="page-hero nf"><div class="wrap nf-in">
      <div>
        <p class="nf-code" aria-hidden="true">404</p>
        <h1 class="page-title">${lines(['찾으시는 페이지가', '없어요'])}</h1>
        <p class="page-lede">주소가 바뀌었거나 없는 페이지예요. 아래에서 다시 찾아보세요.</p>
        <div class="hero-btns">${btn(c.url(''), '홈으로', { variant: 'ink' })}${btn(c.url('services/'), '사업분야', { variant: 'line' })}${btn(c.url('contact/'), '상담문의', { variant: 'line' })}</div>
      </div>
      <img class="nf-mascot" src="${c.asset('img/mascot-run.webp')}" width="440" height="404" alt="달려가는 중앙설비산업 마스코트 중앙이">
    </div><div class="hero-pipe" aria-hidden="true"><span></span></div></section>`
  });
}
