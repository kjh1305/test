/* 페이지 본문: 홈, 사무소 소개, 업무 분야, 칼럼, 상담 신청, 없는 주소 */
import { OFFICE, SERVICES, OTHER, PROCESS, CATS, POSTS, FAQ_LINKS, HOME, ABOUT, CONTACT, META } from './content.mjs';
import { icon, seal, doc } from './art.mjs';
import { page, pageHero, urgentBand, btn, phoneBtn, lines, eyebrow, secHead, esc } from './layout.mjs';

const pad2 = n => String(n).padStart(2, '0');
const inkWords = text => text.split(' ').map((w, i, a) => `<span class="w">${w}${i < a.length - 1 ? ' ' : ''}</span>`).join('');
const postRow = (p, i = 0) => `<li data-cat="${p.cat}"><a href="${p.url || OFFICE.blog}" target="_blank" rel="noopener">
  <span class="col-meta"><span class="col-cat cat-${p.cat}">${CATS[p.cat]}</span><time datetime="${p.date}">${p.date.replace(/-/g, '.')}</time></span>
  <b>${p.title}</b>${icon('external')}
</a></li>`;
const ph = txt => `<span class="ph">${txt || OFFICE.placeholder}</span>`;
/* 블로그 표지가 있는 글은 카드로 보여 줍니다 (표지에 제목이 들어 있어 이미지는 장식으로 둠) */
const colCard = (c, p, i) => `<li data-reveal style="--d:${i * 0.07}s"><a class="col-card" href="${p.url}" target="_blank" rel="noopener">
  <span class="cc-img"><img src="${c.asset('img/' + p.cover)}" width="640" height="480" alt="" loading="lazy" decoding="async"></span>
  <span class="col-meta"><span class="col-cat cat-${p.cat}">${CATS[p.cat]}</span><time datetime="${p.date}">${p.date.replace(/-/g, '.')}</time></span>
  <b>${p.title}</b>
</a></li>`;
const repFig = (c, cls = '') => `<figure class="rep-fig ${cls}"><img src="${c.asset('img/rep.webp')}" width="366" height="457" alt="${OFFICE.repTitle} ${OFFICE.rep}" loading="lazy" decoding="async"></figure>`;

/* ================= 홈 ================= */
export function home(c) {
  const hero = `<section class="hero" data-dark>
  <div class="hero-paper" aria-hidden="true"></div>
  <div class="wrap hero-in">
    <div class="hero-text">
      ${eyebrow(HOME.eyebrow, 'on-dark')}
      <h1 class="hero-title" data-reveal>${lines(HOME.heroTitle)}</h1>
      <p class="hero-lede" data-reveal style="--d:.12s">${HOME.heroLede}</p>
      <div class="hero-btns" data-reveal style="--d:.2s">${phoneBtn('seal')}${btn(c.url('contact/'), '상담 신청', { variant: 'ghost-light' })}</div>
    </div>
    <div class="hero-art">
      <div class="docs" data-docs aria-hidden="true">
        <div class="docs-stack">${SERVICES.map((s, i) => doc(s.doc, { k: i })).join('')}</div>
        <ul class="docs-tabs">${SERVICES.map((s, i) => `<li${i === 0 ? ' class="on"' : ''}>${s.tab}</li>`).join('')}</ul>
      </div>
    </div>
  </div>
</section>`;

  const issues = `<section class="issues">
  <div class="wrap">
    ${secHead({ eb: '업무 분야', title: HOME.issueTitle, sub: HOME.issueSub })}
    <div class="issue-grid">${SERVICES.map((s, i) => `<a class="issue issue-${s.id}" href="${c.url('services/')}#${s.id}" data-reveal style="--d:${i * 0.07}s">
      <span class="issue-tab">${s.tab}</span>
      <span class="issue-ic">${icon(s.icon)}</span>
      <h3>${s.name}</h3>
      <ul>${s.faq.slice(0, 3).map(q => `<li>${q}</li>`).join('')}</ul>
      <span class="issue-more">자세히 보기${icon('arrow')}</span>
    </a>`).join('')}</div>
    <p class="issue-other" data-reveal>${icon('scale')}<span>그 밖에 공무원·교원 행정심판, 음주운전·영업정지 구제, 내용증명, 요양보호시설 등록, 법인 설립 같은 행정 업무도 맡습니다.</span><a href="${c.url('services/')}#other">그 밖의 업무 보기${icon('arrow')}</a></p>
  </div>
</section>`;

  const quote = `<section class="quote" data-statement>
  <div class="wrap quote-in">
    ${eyebrow('상담 원칙')}
    <blockquote class="quote-q"><p>${inkWords(HOME.quote)}</p><footer>${HOME.quoteBy}</footer></blockquote>
    <p class="quote-sub" data-reveal>${HOME.quoteSub}</p>
  </div>
</section>`;

  const rep = `<section class="rep" data-dark>
  <div class="wrap rep-in">
    <div class="rep-photo" data-reveal>
      ${repFig(c)}
      <p class="rep-name"><small>${OFFICE.repTitle}</small>${OFFICE.rep}</p>
    </div>
    <div class="rep-body">
      ${eyebrow('대표 행정사', 'on-dark')}
      <h2 class="sec-title" data-reveal>${lines(HOME.repTitle)}</h2>
      <ul class="creds">${OFFICE.creds.map((cr, i) => `<li data-reveal style="--d:${0.08 + i * 0.08}s"><span class="cred-ic">${icon(cr.icon)}</span><div><b>${cr.title}</b><p>${cr.text}</p></div></li>`).join('')}</ul>
      <p class="rep-promise" data-reveal>“${OFFICE.promise}”</p>
      <div data-reveal>${btn(c.url('about/'), '사무소 소개 보기', { variant: 'ghost-light' })}</div>
    </div>
  </div>
</section>`;

  const process = `<section class="process">
  <div class="wrap">
    ${secHead({ eb: '상담 절차', title: HOME.processTitle, sub: HOME.processSub })}
    <ol class="steps" data-reveal>${PROCESS.map((p, i) => `<li style="--i:${i}"><span class="step-top"><span class="step-n">${pad2(i + 1)}</span><span class="step-ic">${icon(p.icon)}</span></span><h3>${p.title}</h3><p>${p.text}</p></li>`).join('')}</ol>
  </div>
</section>`;

  const columns = `<section class="columns">
  <div class="wrap">
    <div class="columns-head">
      ${secHead({ eb: '칼럼', title: HOME.columnTitle, sub: HOME.columnSub })}
      <div class="columns-btns">${btn(c.url('column/'), '칼럼 전체 보기', { variant: 'outline' })}${btn(OFFICE.blog, '블로그', { variant: 'outline', ext: true })}</div>
    </div>
    <ul class="col-cards">${POSTS.filter(p => p.cover).slice(0, 4).map((p, i) => colCard(c, p, i)).join('')}</ul>
  </div>
</section>`;

  return page(c, { title: '', desc: META.home, bodyClass: 'p-home', body: hero + issues + quote + rep + process + urgentBand(c) + columns });
}

/* ================= 사무소 소개 ================= */
export function about(c) {
  const greet = `<section class="greet">
  <div class="wrap greet-in">
    <div class="greet-side">
      ${eyebrow('인사말')}
      <h2 class="sec-title" data-reveal>${ABOUT.greetTitle}</h2>
      <p class="draft-badge">${icon('doc')}${ABOUT.draft}</p>
      <div data-reveal>${repFig(c, 'rep-fig-light')}</div>
    </div>
    <div class="greet-body" data-reveal style="--d:.08s">
      ${ABOUT.greeting.map(p => `<p>${p}</p>`).join('')}
      <p class="greet-sign"><span>${ABOUT.sign}</span>${seal('seal sign-seal')}</p>
    </div>
  </div>
</section>`;

  const profileRows = [
    ['대표 행정사', OFFICE.rep],
    ['출입국', OFFICE.creds[0].title],
    ['교육', OFFICE.creds[1].title + ' (학교폭력 전문 행정사)'],
    ['학력', OFFICE.degrees],
    ['소속', OFFICE.member],
    ['주요 업무', SERVICES.map(s => s.name).join(', ') + ', 행정심판·민원행정'],
    ['행정사 등록', ph()]
  ];
  const officeRows = [
    ['상호', OFFICE.name],
    ['대표', `${OFFICE.repTitle} ${OFFICE.rep}`],
    ['전화', `<a href="${OFFICE.phoneHref}">${OFFICE.phone}</a>`],
    ['이메일', `<a href="mailto:${OFFICE.email}">${OFFICE.email}</a><br><a href="mailto:${OFFICE.email2}">${OFFICE.email2}</a>`],
    ['찾아오시는 길', OFFICE.station],
    ['주소', ph()],
    ['상담 시간', ph()],
    ['블로그', `<a href="${OFFICE.blog}" target="_blank" rel="noopener">${OFFICE.blogName}${icon('external')}</a>`]
  ];
  const table = rows => `<dl class="info-table" data-reveal>${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`;
  const info = `<section class="info">
  <div class="wrap info-in">
    <div>${secHead({ eb: '약력', title: ABOUT.profileTitle })}${table(profileRows)}</div>
    <div>${secHead({ eb: '사무소', title: ABOUT.officeTitle })}${table(officeRows)}</div>
  </div>
</section>`;

  const map = `<section class="map-sec" id="location">
  <div class="wrap">
    ${secHead({ eb: '위치', title: ABOUT.mapTitle })}
    <div class="map-ph" data-reveal>${icon('pin')}<b>${OFFICE.station}</b><span>${ABOUT.mapNote}입니다.</span><a class="map-link" href="https://map.naver.com/p/search/${encodeURIComponent('동대문역사문화공원역')}" target="_blank" rel="noopener">네이버 지도에서 역 위치 보기${icon('external')}</a></div>
  </div>
</section>`;

  return page(c, {
    title: '사무소 소개', desc: META.about, bodyClass: 'p-about',
    body: pageHero(c, { eb: '사무소 소개', title: ABOUT.heroTitle, lede: ABOUT.heroLede, crumb: '사무소 소개' }) + greet + info + map + urgentBand(c)
  });
}

/* ================= 업무 분야 ================= */
export function services(c) {
  const chips = `<nav class="pnav" data-pnav aria-label="업무 분야 바로가기"><div class="wrap"><ul>${SERVICES.map((s, i) => `<li><a href="#${s.id}" data-spy-link="${s.id}"><span>${pad2(i + 1)}</span>${s.name}</a></li>`).join('')}<li><a href="#other" data-spy-link="other"><span>+</span>그 밖의 업무</a></li></ul></div></nav>`;
  const secs = SERVICES.map((s, i) => `<section class="svc${i % 2 ? ' rev' : ''}" id="${s.id}">
  <div class="wrap svc-in">
    <div class="svc-art" data-reveal>
      <figure class="svc-photo"><img src="${c.asset('img/' + s.photo.src)}" width="${s.photo.w}" height="${s.photo.h}" alt="${s.photo.alt}" loading="lazy" decoding="async"></figure>
      <div class="svc-doc">${doc(s.doc)}</div>
    </div>
    <div class="svc-body">
      <p class="svc-n">${pad2(i + 1)} <span>/ ${pad2(SERVICES.length)}</span></p>
      <h2 class="svc-title" data-reveal>${s.name}</h2>
      <p class="svc-short" data-reveal style="--d:.05s">${s.short}</p>
      <blockquote class="svc-lead" data-reveal style="--d:.1s">${s.lead}</blockquote>
      ${s.alert ? `<p class="svc-alert" data-reveal>${icon('alert')}<span>${s.alert}</span></p>` : ''}
      <div class="svc-cols" data-reveal style="--d:.12s">
        <div><h3>이런 분께</h3><ul class="who">${s.who.map(w => `<li>${icon('check')}<span>${w}</span></li>`).join('')}</ul></div>
        <div><h3>주요 업무</h3><ul class="tasks">${s.tasks.map(t => `<li>${t}</li>`).join('')}</ul></div>
      </div>
      <div class="svc-faq" data-reveal style="--d:.14s">
        <h3>자주 받는 질문</h3>
        <ul>${s.faq.map(q => `<li><a href="${FAQ_LINKS[q] || OFFICE.blog}" target="_blank" rel="noopener"><span>${q}</span>${icon('external')}</a></li>`).join('')}</ul>
        <p class="svc-note">질문을 누르면 관련 글이 있는 블로그로 이동합니다.</p>
      </div>
      <div class="svc-cta" data-reveal style="--d:.16s">${btn(c.url('contact/') + '?area=' + s.id, '이 분야 상담 신청')}${phoneBtn('outline-phone')}</div>
    </div>
  </div>
</section>`).join('');

  const other = `<section class="other" id="other">
  <div class="wrap other-in">
    ${secHead({ eb: '그 밖의 업무', title: OTHER.title, sub: OTHER.sub })}
    <div>
      <div class="other-grid">${OTHER.groups.map((g, i) => `<div class="other-card" data-reveal style="--d:${i * 0.08}s"><span class="other-ic">${icon(g.icon)}</span><h3>${g.name}</h3><ul>${g.items.map(t => `<li>${t}</li>`).join('')}</ul></div>`).join('')}</div>
      <div class="other-cta" data-reveal>${btn(c.url('contact/') + '?area=etc', '기타 행정 상담 신청')}${phoneBtn('outline-phone')}</div>
    </div>
  </div>
</section>`;

  return page(c, {
    title: '업무 분야', desc: META.services, bodyClass: 'p-services',
    body: pageHero(c, { eb: '업무 분야', title: ['네 가지 분야,', '사정에 맞춰 돕습니다'], lede: '출입국·비자, 출입국 사범심사·구제, 학교폭력·행정심판, 공장등록·인허가 업무를 맡고, 그 밖의 행정심판과 민원행정도 돕습니다.', crumb: '업무 분야' }) + chips + secs + other + urgentBand(c)
  });
}

/* ================= 칼럼 ================= */
export function column(c) {
  const count = k => POSTS.filter(p => p.cat === k).length;
  const body = `<section class="col-page">
  <div class="wrap">
    <div class="col-filter" role="group" aria-label="분야별로 보기" data-filter>
      <button type="button" aria-pressed="true" data-f="all">전체 <span>${POSTS.length}</span></button>
      ${Object.entries(CATS).map(([k, v]) => `<button type="button" aria-pressed="false" data-f="${k}">${v} <span>${count(k)}</span></button>`).join('')}
    </div>
    <p class="col-note">${icon('blog')}글을 누르면 네이버 블로그로 이동합니다. 목록은 2026년 11월 9일 기준입니다.</p>
    <ul class="col-list col-list-full" data-col-list>${POSTS.map(postRow).join('')}</ul>
  </div>
</section>`;
  return page(c, {
    title: '칼럼', desc: META.column, bodyClass: 'p-column',
    body: pageHero(c, { eb: '칼럼', title: ['상담 현장에서', '자주 받는 질문'], lede: '대표 행정사가 블로그에 정리한 글을 분야별로 모았습니다.', crumb: '칼럼' }) + body
  });
}

/* ================= 상담 신청 ================= */
export function contact(c) {
  const req = '<em class="req" aria-hidden="true">*</em><span class="sr">필수</span>';
  const form = `<form class="qform" novalidate data-form data-errors="${esc(JSON.stringify(CONTACT.errors))}" data-sent="${esc(CONTACT.sent)}" data-prefilled="${esc(CONTACT.prefilled)}">
  <fieldset class="fset">
    <legend>상담 분야</legend>
    <div class="seg">${CONTACT.areas.map(([v, l]) => `<label><input type="radio" name="area" value="${v}"><span>${l}</span></label>`).join('')}</div>
  </fieldset>
  <div class="fgrid">
    <div class="field"><label for="f-name">이름${req}</label><input id="f-name" name="name" type="text" autocomplete="name" required></div>
    <div class="field"><label for="f-phone">연락처${req}</label><input id="f-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="010-0000-0000" required></div>
    <div class="field"><label for="f-email">이메일</label><input id="f-email" name="email" type="email" autocomplete="email"></div>
    <div class="field"><label for="f-visa">국적·체류자격</label><input id="f-visa" name="visa" type="text" placeholder="예: 베트남, E-9"><p class="hint">외국인 의뢰인만 적어 주세요.</p></div>
    <div class="field span2"><label for="f-deadline">받은 통지서와 기한</label><input id="f-deadline" name="deadline" type="text" placeholder="예: 사범심사 출석통보, 11월 20일 출석"></div>
  </div>
  <div class="field"><label for="f-message">상황 설명${req}</label><textarea id="f-message" name="message" rows="6" placeholder="지금까지의 경위와 궁금한 점을 편하게 적어 주세요." required></textarea></div>
  <fieldset class="fset">
    <legend>연락받기 좋은 시간</legend>
    <div class="seg seg-sm">${CONTACT.times.map((t, i) => `<label><input type="radio" name="time" value="${i}"${i === 0 ? ' checked' : ''}><span>${t}</span></label>`).join('')}</div>
  </fieldset>
  <div class="field consent">
    <label class="check"><input id="f-privacy" name="privacy" type="checkbox" required><span class="box" aria-hidden="true">${icon('check')}</span><span>개인정보 수집과 이용에 동의합니다${req}</span></label>
    <details class="privacy-more"><summary>내용 보기</summary><p>${CONTACT.privacyText}</p></details>
  </div>
  <button class="btn btn-primary btn-lg" type="submit"><span>상담 신청하기</span>${icon('arrow')}</button>
</form>`;

  const aside = `<aside class="contact-aside">
  <div class="ca-phone">
    <p>기한이 급하면 전화가 가장 빠릅니다</p>
    <a href="${OFFICE.phoneHref}">${icon('phone')}${OFFICE.phone}</a>
    <span>상담 시간: ${ph()}</span>
  </div>
  <div class="ca-card">
    <h2>상담 때 있으면 좋은 것</h2>
    <ul class="ca-prep">${CONTACT.prepare.map(p => `<li>${icon('check')}<span>${p}</span></li>`).join('')}</ul>
  </div>
  <div class="ca-card">
    <h2>사무소</h2>
    <p class="ca-line"><b>찾아오시는 길</b>${OFFICE.station}</p>
    <p class="ca-line"><b>주소</b>${ph()}</p>
    <p class="ca-line"><b>이메일</b><a href="mailto:${OFFICE.email}">${OFFICE.email}</a></p>
    <p class="ca-visit">${icon('route')}<span>${CONTACT.visit}</span></p>
    <a class="ca-link" href="${OFFICE.blog}" target="_blank" rel="noopener">${icon('blog')}${OFFICE.blogName}${icon('external')}</a>
  </div>
</aside>`;

  return page(c, {
    title: '상담 신청', desc: META.contact, bodyClass: 'p-contact',
    body: pageHero(c, { eb: '상담 신청', title: CONTACT.heroTitle, lede: CONTACT.heroLede, crumb: '상담 신청' }) + `<section class="contact"><div class="wrap contact-in">${form}${aside}</div></section>`
  });
}

/* ================= 없는 주소 ================= */
export function notFound(c) {
  return page(c, {
    title: '페이지를 찾을 수 없어요', desc: '주소가 바뀌었거나 없는 페이지입니다.', bodyClass: 'p-404',
    body: `<section class="page-hero nf" data-dark><div class="hero-paper" aria-hidden="true"></div><div class="wrap page-hero-in">
      <p class="nf-code">404</p>
      <h1 class="page-title">${lines(['찾으시는 페이지가', '없어요'])}</h1>
      <p class="page-lede">주소가 바뀌었거나 없는 페이지예요. 아래에서 다시 찾아 주세요.</p>
      <div class="hero-btns">${btn(c.url(''), '홈으로', { variant: 'seal' })}${btn(c.url('services/'), '업무 분야', { variant: 'ghost-light' })}${btn(c.url('contact/'), '상담 신청', { variant: 'ghost-light' })}</div>
    </div></section>`
  });
}
