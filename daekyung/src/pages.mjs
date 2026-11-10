/* 페이지 본문: 홈, 회사소개, 사업분야, 시공사례, 견적문의, 없는 주소 */
import { CO, PH, SERVICES, VALUES, PROCESS, RESTORE_CHECK, PROJECTS, FAQ, HERO_IMG, POPUPS, QUICK, BLOCKS, HOME, ABOUT, CONTACT, META } from './content.mjs';
import { icon, lineIcon } from './art.mjs';
import { page, pageHead, ctaBand, btn, secHead, photo, ph, val, telHref, br, esc } from './layout.mjs';

const SVC = Object.fromEntries(SERVICES.map(s => [s.id, s]));
const coverOf = p => (p.gallery || []).find(x => x.img === p.cover) || (p.gallery || [])[0] || p;

/* 시공사례 카드 (홈): 대표 사진, 이름, 위치, 공사 */
const caseCard = (c, p) => `<li class="case">
  <a class="case-link" href="${c.url('projects/')}#${p.id}">
    ${photo(c, coverOf(p), { label: '현장 사진' })}
    <h3 class="case-title">${p.title ? esc(p.title) : ph('현장 이름: ' + PH)}</h3>
  </a>
  <p class="case-meta">${p.where ? esc(p.where) : ph()}<span aria-hidden="true">|</span>${(p.services || []).slice(0, 2).map(id => SVC[id].name).join(', ')}</p>
</li>`;

/* 진행 과정 (순서가 있는 내용이라 번호를 붙임) */
const processList = () => `<ol class="steps">${PROCESS.map((p, i) => `<li><span class="step-no">${i + 1}</span><h3>${p.title}</h3><p>${p.text}</p></li>`).join('')}</ol>`;
const valuesList = () => `<ul class="values">${VALUES.map(v => `<li><h3>${v.title}</h3><p>${v.text}</p></li>`).join('')}</ul>`;

/* ================= 홈 ================= */
export function home(c) {
  const hero = `<section class="hero" aria-label="대경기업 소개">
  <div class="hero-bg">${HERO_IMG.img ? `<img src="${c.asset('img/' + HERO_IMG.img)}" width="${HERO_IMG.w}" height="${HERO_IMG.h}" alt="${esc(HERO_IMG.alt)}" fetchpriority="high" decoding="async">` : ''}</div>
  <div class="wrap hero-in">
    <p class="hero-field">${CO.field}</p>
    <h1 class="hero-title">${br(HOME.heroTitle)}</h1>
    <p class="hero-lede">${HOME.heroLede}</p>
    ${CO.phone ? `<a class="hero-phone" href="${telHref(CO.phone)}">${icon('phone')}<span>${esc(CO.phone)}</span></a>` : ''}
    <div class="hero-pills">${HOME.heroBtns.map(([s, l]) => `<a class="pill" href="${c.url(s)}">${l}${icon('chevron')}</a>`).join('')}</div>
  </div>
</section>`;

  const quick = `<nav class="quick" aria-label="${HOME.quickLabel}">
  <ul class="wrap quick-in">${QUICK.map(q => `<li><a href="${c.url('business/')}#${q.id}">${lineIcon(q.icon)}<span>${q.label.replace(/·/g, '·<wbr>')}</span></a></li>`).join('')}</ul>
</nav>`;

  const aboutBlk = `<section class="sec about-blk">
  <div class="wrap about-in">
    <div class="about-photo" data-reveal>${photo(c, HOME.aboutImg, { label: '현장 사진' })}</div>
    <div class="about-text" data-reveal>
      <p class="label-en">ABOUT <b>${CO.name}</b></p>
      <h2 class="sec-title">${HOME.aboutTitle}</h2>
      <p>${HOME.aboutText}</p>
      <a class="pill pill-line" href="${c.url('about/')}">더 보기${icon('chevron')}</a>
    </div>
  </div>
</section>`;

  const blocks = `<section class="blocks" aria-label="${HOME.blocksTitle}">
  <h2 class="sr">${HOME.blocksTitle}</h2>
  <ul class="blocks-in">${BLOCKS.map(b => `<li class="blk blk-${b.tone}"><a href="${c.url('business/')}#${b.id}">
    <span class="blk-en">${b.en}</span>
    <h3 class="blk-title">${b.title}</h3>
    <p class="blk-text">${b.text}</p>
    <span class="blk-go">${icon('arrowUpRight')}</span>
    ${lineIcon(b.icon, 'blk-mark')}
  </a></li>`).join('')}</ul>
</section>`;

  const cases = `<section class="sec">
  <div class="wrap">
    <div class="sec-row">${secHead({ title: HOME.projectsTitle, sub: HOME.projectsSub })}${btn(c.url('projects/'), '시공사례 전체', { variant: 'line' })}</div>
    <ul class="case-grid" data-reveal>${PROJECTS.slice(0, 3).map(p => caseCard(c, p)).join('')}</ul>
  </div>
</section>`;

  /* 알림 팝업: hidden 으로 넣어 두고 JS가 열어 줌 (JS가 없으면 보이지 않음) */
  const pops = POPUPS.filter(p => p.on);
  const popups = pops.length ? `<div class="pop-layer" data-popups hidden>
  <div class="pop-dim" data-pop-dim></div>
  <div class="pop-wrap">${pops.map(p => `<section class="pop" role="dialog" aria-modal="false" aria-label="${esc(p.label)}" data-pop="${p.id}" hidden>
    <a class="pop-img" href="${c.url(p.href)}"${p.tel ? ` data-tel="${p.tel}"` : ''}><img src="${c.asset('img/' + p.img)}" width="${p.w}" height="${p.h}" alt="${esc(p.alt)}" decoding="async"></a>
    <div class="pop-foot">
      <label class="pop-today"><input type="checkbox" data-pop-today><span>오늘 하루 열지 않기</span></label>
      <button type="button" class="pop-close" data-pop-close>닫기</button>
    </div>
  </section>`).join('')}</div>
</div>` : '';

  return page(c, { title: '', desc: META.home, bodyClass: 'p-home', body: hero + quick + aboutBlk + blocks + cases + ctaBand(c) + popups });
}

/* ================= 회사소개 ================= */
export function about(c) {
  const intro = `<section class="sec sec-first">
  <div class="wrap split">
    ${secHead({ title: ABOUT.introTitle })}
    <div class="prose" data-reveal>${ABOUT.intro.map(p => `<p>${p}</p>`).join('')}
      <ul class="tag-list">${SERVICES.map(s => `<li><a href="${c.url('business/')}#${s.id}">${s.name}</a></li>`).join('')}</ul>
    </div>
  </div>
</section>`;

  const values = `<section class="sec sec-tint">
  <div class="wrap split">
    ${secHead({ title: HOME.valuesTitle })}
    <div data-reveal>${valuesList()}</div>
  </div>
</section>`;

  const greet = `<section class="sec">
  <div class="wrap split">
    ${secHead({ title: ABOUT.greetTitle })}
    <div class="ph-box" data-reveal>${icon('user')}<b>대표 인사말과 대표 사진</b><span>${PH}</span></div>
  </div>
</section>`;

  const rows = [
    ['상호', CO.name],
    ['대표', val(CO.ceo)],
    ['분야', CO.field],
    ['주력 공사', '상가건물 천장공사, 칸막이공사, 바닥공사'],
    ['공사 종류', SERVICES.map(s => s.name).join(', ')],
    ['시공 지역', CO.area],
    ['전화', val(CO.phone, p => `<a href="${telHref(p)}">${esc(p)}</a>`)],
    ['이메일', val(CO.email, e => `<a href="mailto:${esc(e)}">${esc(e)}</a>`)],
    ['주소', val(CO.address)],
    ['사업자등록번호', val(CO.bizNo)],
    ['면허·등록', val(CO.license)],
    ['블로그', `<a href="${CO.blog}" target="_blank" rel="noopener">${CO.blogName}${icon('external')}</a>`]
  ];
  const info = `<section class="sec sec-top-line">
  <div class="wrap split">
    ${secHead({ title: ABOUT.infoTitle })}
    <dl class="info-table" data-reveal>${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
  </div>
</section>`;

  const map = `<section class="sec sec-top-line" id="location">
  <div class="wrap split">
    ${secHead({ title: ABOUT.mapTitle })}
    <div class="ph-box ph-box-map" data-reveal>${icon('pin')}<b>주소와 지도</b><span>${PH}</span></div>
  </div>
</section>`;

  return page(c, {
    title: '회사소개', desc: META.about, bodyClass: 'p-about',
    body: pageHead(c, { title: ABOUT.heroTitle, lede: ABOUT.heroLede, crumb: '회사소개' }) + intro + values + greet + info + map + ctaBand(c)
  });
}

/* ================= 사업분야 ================= */
export function business(c) {
  const chips = `<nav class="chips" aria-label="사업분야 바로가기"><div class="wrap"><ul>${SERVICES.map(s => `<li><a href="#${s.id}">${s.name}</a></li>`).join('')}</ul></div></nav>`;
  const related = s => {
    const ps = PROJECTS.filter(p => (p.services || []).includes(s.id) && p.id);
    return ps.length ? `<p class="biz-related"><span>관련 사례</span>${ps.map(p => `<a href="${c.url('projects/')}#${p.id}">${esc(p.title)}</a>`).join('')}</p>` : '';
  };
  const restoreCheck = `<div class="biz-extra" data-reveal><h3>원상복구 전에 확인할 것</h3><ul class="check-grid">${RESTORE_CHECK.map(x => `<li>${icon('check')}<div><b>${x.title}</b><p>${x.text}</p></div></li>`).join('')}</ul></div>`;
  const secs = SERVICES.map(s => `<section class="biz" id="${s.id}">
  <div class="wrap">
    <div class="biz-in">
      <div class="biz-photo" data-reveal>${photo(c, s, { label: s.name + ' 사진' })}</div>
      <div class="biz-body" data-reveal>
        <h2 class="biz-title">${s.name}</h2>
        <p class="biz-short">${s.short}</p>
        <p class="biz-text">${s.text}</p>
        <h3 class="biz-sub">주로 하는 일</h3>
        <ul class="biz-points">${s.points.map(p => `<li>${icon('check')}<span>${p}</span></li>`).join('')}</ul>
        ${related(s)}
        ${btn(c.url('contact/') + '?service=' + s.id, '이 공사로 견적문의', { variant: 'line' })}
      </div>
    </div>
    ${s.id === 'restore' ? restoreCheck : ''}
  </div>
</section>`).join('');
  const process = `<section class="sec sec-tint">
  <div class="wrap">
    ${secHead({ title: HOME.processTitle, sub: '공사 종류와 관계없이 보통 이 순서로 진행합니다.' })}
    <div data-reveal>${processList()}</div>
  </div>
</section>`;
  return page(c, {
    title: '사업분야', desc: META.business, bodyClass: 'p-business',
    body: pageHead(c, { title: '사업분야', lede: '경량철골과 칸막이, 천장공사를 중심으로 바닥, 철거·원상복구, 인테리어까지 실내 공사에 필요한 공정을 맡습니다.', crumb: '사업분야' }) + chips + secs + process + ctaBand(c)
  });
}

/* ================= 시공사례 ================= */
export function projects(c) {
  const chips = `<nav class="chips" aria-label="시공사례 바로가기"><div class="wrap"><ul>${PROJECTS.map(p => p.id ? `<li><a href="#${p.id}">${esc(p.title || '사례')}</a></li>` : '').join('')}</ul></div></nav>`;
  const block = (p, i) => `<section class="pj${i % 2 ? ' sec-tint' : ''}" id="${p.id}">
  <div class="wrap">
    <div class="pj-head" data-reveal>
      <div>
        <p class="pj-where">${p.where ? esc(p.where) : ph()}</p>
        <h2 class="pj-title">${p.title ? esc(p.title) : ph('현장 이름: ' + PH)}</h2>
        <p class="pj-summary">${p.summary || ph()}</p>
        ${p.url ? `<p class="pj-link">${btn(p.url, '블로그 글 보기', { variant: 'line', ext: true })}</p>` : ''}
      </div>
      <div class="pj-side">
        <h3>공사 내용</h3>
        <ul class="biz-points">${(p.works || []).map(w => `<li>${icon('check')}<span>${w}</span></li>`).join('')}</ul>
        <p class="pj-tags">${(p.services || []).map(id => `<a href="${c.url('business/')}#${id}">${SVC[id].name}</a>`).join('')}</p>
      </div>
    </div>
    <ul class="gallery" data-gallery>${(p.gallery || []).map(x => `<li><a href="${c.asset('img/' + x.img)}" data-lb data-cap="${esc(x.alt)}"><img src="${c.asset('img/' + x.img)}" width="${x.w}" height="${x.h}" alt="${esc(x.alt)}" loading="lazy" decoding="async"></a><span>${esc(x.alt)}</span></li>`).join('')}</ul>
  </div>
</section>`;
  const more = `<section class="sec sec-top-line"><div class="wrap more-in" data-reveal>
    <p>더 많은 현장은 블로그에 올리고 있습니다.</p>${btn(CO.blog, '블로그에서 더 보기', { variant: 'line', ext: true })}
  </div></section>`;
  const lb = `<dialog class="lb" data-lb-dialog aria-label="사진 크게 보기">
  <figure><img alt="" data-lb-img><figcaption data-lb-cap></figcaption></figure>
  <button type="button" class="lb-btn lb-prev" data-lb-prev aria-label="이전 사진">${icon('chevron')}</button>
  <button type="button" class="lb-btn lb-next" data-lb-next aria-label="다음 사진">${icon('chevron')}</button>
  <button type="button" class="lb-close" data-lb-close aria-label="닫기" autofocus>${icon('close')}</button>
</dialog>`;
  return page(c, {
    title: '시공사례', desc: META.projects, bodyClass: 'p-projects',
    body: pageHead(c, { title: '시공사례', lede: '블로그에 올린 현장을 공사 과정 사진과 함께 소개합니다. 사진을 누르면 크게 볼 수 있습니다.', crumb: '시공사례' }) + chips + PROJECTS.map(block).join('') + more + lb + ctaBand(c)
  });
}

/* ================= 견적문의 ================= */
export function contact(c) {
  const req = '<em class="req" aria-hidden="true">*</em><span class="sr">필수</span>';
  const seg = (name, items, checked = -1) => `<div class="seg">${items.map(([v, l], i) => `<label><input type="radio" name="${name}" value="${v}"${i === checked ? ' checked' : ''}><span>${l}</span></label>`).join('')}</div>`;
  const form = `<form class="qform" novalidate data-form data-errors="${esc(JSON.stringify(CONTACT.errors))}" data-sent="${esc(CONTACT.sent)}" data-prefilled="${esc(CONTACT.prefilled)}">
  <fieldset class="fset field" id="f-service"><legend>공사 종류${req}</legend>${seg('service', [...SERVICES.map(s => [s.id, s.name]), ['etc', '기타']])}</fieldset>
  <fieldset class="fset"><legend>현장</legend>${seg('place', CONTACT.places.map(p => [p, p]))}</fieldset>
  <div class="fgrid">
    <div class="field"><label for="f-site">현장 위치</label><input id="f-site" name="site" type="text" placeholder="예: 경기 성남시"></div>
    <div class="field"><label for="f-size">대략의 면적</label><input id="f-size" name="size" type="text" placeholder="예: 30평"></div>
    <div class="field span2"><label for="f-when">희망 일정</label><input id="f-when" name="when" type="text" placeholder="원상복구라면 반납일도 적어 주세요"></div>
    <div class="field"><label for="f-name">이름${req}</label><input id="f-name" name="name" type="text" autocomplete="name" required></div>
    <div class="field"><label for="f-phone">연락처${req}</label><input id="f-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="010-0000-0000" required></div>
  </div>
  <div class="field"><label for="f-message">문의 내용${req}</label><textarea id="f-message" name="message" rows="6" placeholder="공사할 곳과 원하는 내용을 편하게 적어 주세요." required></textarea></div>
  <div class="field consent">
    <label class="check"><input id="f-privacy" name="privacy" type="checkbox" required><span class="box" aria-hidden="true">${icon('check')}</span><span>개인정보 수집과 이용에 동의합니다${req}</span></label>
    <details class="privacy-more"><summary>내용 보기</summary><p>${CONTACT.privacyText}</p></details>
  </div>
  <button class="btn btn-primary btn-lg" type="submit">견적문의 보내기</button>
</form>`;
  const aside = `<aside class="contact-aside">
  <div class="ca-card">
    <h2>전화 상담</h2>
    ${CO.phone ? `<a class="ca-phone" href="${telHref(CO.phone)}">${esc(CO.phone)}</a>` : `<p class="ca-phone">${ph()}</p>`}
    <dl class="ca-dl"><div><dt>시공 지역</dt><dd>${CO.area}</dd></div><div><dt>상담 시간</dt><dd>${val(CO.hours)}</dd></div><div><dt>이메일</dt><dd>${val(CO.email)}</dd></div></dl>
  </div>
  <div class="ca-card">
    <h2>알려 주시면 좋은 것</h2>
    <ul class="ca-list">${CONTACT.tellUs.map(x => `<li>${icon('check')}<span>${x}</span></li>`).join('')}</ul>
  </div>
</aside>`;
  const faq = `<section class="sec sec-tint" id="faq">
  <div class="wrap split">
    ${secHead({ title: CONTACT.faqTitle })}
    <div class="faq" data-reveal>${FAQ.map(f => `<details><summary>${f.q}${icon('chevron')}</summary><p>${f.a}</p></details>`).join('')}</div>
  </div>
</section>`;
  return page(c, {
    title: '견적문의', desc: META.contact, bodyClass: 'p-contact',
    body: pageHead(c, { title: CONTACT.heroTitle, lede: CONTACT.heroLede, crumb: '견적문의' }) + `<section class="sec sec-first"><div class="wrap contact-in">${form}${aside}</div></section>` + faq
  });
}

/* ================= 없는 주소 ================= */
export function notFound(c) {
  return page(c, {
    title: '페이지를 찾을 수 없어요', desc: '주소가 바뀌었거나 없는 페이지입니다.', bodyClass: 'p-404',
    body: `<section class="page-head nf"><div class="wrap">
      <p class="nf-code">404</p>
      <h1 class="page-title">찾으시는 페이지가 없어요</h1>
      <p class="page-lede">주소가 바뀌었거나 없는 페이지입니다. 아래에서 다시 찾아 주세요.</p>
      <div class="hero-btns">${btn(c.url(''), '홈으로')}${btn(c.url('business/'), '사업분야', { variant: 'line' })}${btn(c.url('contact/'), '견적문의', { variant: 'line' })}</div>
    </div></section>`
  });
}
