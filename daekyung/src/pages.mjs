/* 페이지 본문: 홈, 회사소개, 사업분야, 시공사례(목록·현장별), 견적문의, 없는 주소 */
import { CO, PH, SERVICES, PRINCIPLES, PROCESS, RESTORE_CHECK, PROJECTS, BEFORE_AFTER, BLOG_POSTS, FAQ, POPUPS, HOME, ABOUT, CONTACT, META } from './content.mjs';
import { icon } from './art.mjs';
import { page, pageHead, ctaBand, btn, secHead, photo, ph, val, telHref, smsHref, br, esc } from './layout.mjs';

const SVC = Object.fromEntries(SERVICES.map(s => [s.id, s]));
const coverOf = p => (p.gallery || []).find(x => x.img === p.cover) || (p.gallery || [])[0] || p;
const day = d => (d ? `<time datetime="${d}">${d.replaceAll('-', '.')}</time>` : '');
/* 현장별 페이지 주소 */
export const caseUrl = (c, p) => c.url('projects/' + p.id + '/');

/* 시공사례 카드 (홈): 대표 사진, 이름, 위치, 공사 */
const caseCard = (c, p, tag = 'h3') => `<li class="case">
  <a class="case-link" href="${caseUrl(c, p)}">
    ${photo(c, coverOf(p), { label: '현장 사진' })}
    <${tag} class="case-title">${p.title ? esc(p.title) : ph('현장 이름: ' + PH)}</${tag}>
  </a>
  <p class="case-meta">${day(p.date)}<span aria-hidden="true">|</span>${p.where ? esc(p.where) : ph()}<span aria-hidden="true">|</span>${(p.services || []).slice(0, 1).map(id => SVC[id].name).join(', ')}</p>
</li>`;

/* 공사 전과 후 비교: 왼쪽이 전, 오른쪽이 후. 손잡이를 끌거나 키보드 화살표로 움직임.
   JS가 없으면 반반으로 나뉜 채 멈춰 있음 */
const altOf = (id, img) => ((PROJECTS.find(p => p.id === id) || {}).gallery || []).find(x => x.img === img)?.alt || '';
const baFrame = (c, x, i) => `<div class="ba" data-ba style="--x:50%">
  <img class="ba-img" src="${c.asset('img/' + x.b)}" width="800" height="600" alt="${esc(x.bl + ': ' + altOf(x.id, x.b))}" loading="lazy" decoding="async">
  <div class="ba-after"><img class="ba-img" src="${c.asset('img/' + x.a)}" width="800" height="600" alt="${esc(x.al + ': ' + altOf(x.id, x.a))}" loading="lazy" decoding="async"></div>
  <span class="ba-tag ba-tag-b" aria-hidden="true">${x.bl}</span><span class="ba-tag ba-tag-a" aria-hidden="true">${x.al}</span>
  <input class="ba-range" type="range" min="0" max="100" value="50" step="1" aria-label="${esc(x.tab)}: 왼쪽 ${x.bl}, 오른쪽 ${x.al} 사진의 경계" id="ba-r${i}">
  <span class="ba-handle" aria-hidden="true"><i>${icon('arrowsH')}</i></span>
</div>`;

/* 진행 과정 (순서가 있는 내용이라 번호를 붙임) */
const processList = () => `<ol class="steps">${PROCESS.map((p, i) => `<li><span class="step-no">${String(i + 1).padStart(2, '0')}</span><h3>${p.title}</h3><p>${p.text}</p></li>`).join('')}</ol>`;
const principleList = () => `<ol class="principles">${PRINCIPLES.map((v, i) => `<li><span class="pr-no">${String(i + 1).padStart(2, '0')}</span><h3>${v.title}</h3><p>${v.text}</p></li>`).join('')}</ol>`;

/* ================= 홈 ================= */
export function home(c) {
  /* 첫 화면: 사진이 화면 가로 가득 넘어가고, 흰 글 상자가 사진 아래쪽에 걸쳐 올라옴.
     JS가 없으면 첫 장만 보이고 아래 막대는 숨김 */
  const slides = HOME.heroImgs;
  const n2 = i => String(i).padStart(2, '0');
  const srcset = s => { const f = n => c.asset('img/' + s.img.replace(/\.webp$/, n + '.webp')); return `${f('-800')} 800w, ${f('')} ${s.w}w, ${f('-xl')} 2400w`; };
  const stage = `<div class="hero-stage hs" data-slides role="region" aria-roledescription="carousel" aria-label="시공 분위기 사진">
    <div class="hs-frame">${slides.map((s, i) => `<figure class="hs-slide${i ? '' : ' is-on'}" role="group" aria-roledescription="slide" aria-label="${slides.length}장 중 ${i + 1}번째"${i ? ' aria-hidden="true"' : ''} style="--px:${s.pos || '50%'};--py:${s.posY || '50%'}"><img src="${c.asset('img/' + s.img)}" srcset="${srcset(s)}" sizes="100vw" width="${s.w}" height="${s.h}" alt="${esc(s.alt)}"${i ? ' loading="lazy"' : ' fetchpriority="high"'} decoding="async"></figure>`).join('')}</div>
    <div class="wrap hs-bar-wrap">
      <div class="hs-bar" hidden>
        <button class="hs-pause" type="button" data-slides-pause aria-label="사진 넘김 멈추기">${icon('pause')}${icon('play')}</button>
        <p class="hs-count" aria-hidden="true"><b data-slides-now>01</b><span>/</span>${n2(slides.length)}</p>
        <div class="hs-dots">${slides.map((s, i) => `<button class="hs-dot${i ? '' : ' is-on'}" type="button" aria-label="${i + 1}번째 사진 보기"${i ? '' : ' aria-current="true"'}><i></i></button>`).join('')}</div>
      </div>
    </div>
  </div>`;
  const hero = `<section class="hero" aria-labelledby="hero-title">
  ${stage}
  <div class="wrap hero-below">
    <div class="hero-panel">
      <p class="hero-label">${HOME.heroLabel}</p>
      <h1 class="hero-title" id="hero-title">${br(HOME.heroTitle)}</h1>
      <p class="hero-lede">${HOME.heroLede}</p>
      <div class="hero-btns">${btn(c.url('contact/'), '견적문의 · 방문 예약', { cls: 'btn-lg' })}${CO.phone ? `<a class="btn btn-line btn-lg" href="${telHref(CO.phone)}">${icon('phone')}${esc(CO.phone)}</a>` : ''}</div>
      ${CO.hours ? `<p class="hero-hours"><span class="dot" aria-hidden="true"></span>${CO.hours} 상담</p>` : ''}
    </div>
    <dl class="facts">${HOME.facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
  </div>
</section>`;

  /* 사업분야: 큰 사진 카드. 위 두 개는 넓게, 아래 세 개는 정사각형 */
  const services = `<section class="sec svc-sec" aria-labelledby="svc-title">
  <div class="wrap">
    <div class="sec-row">
      <div class="sec-head" data-reveal><h2 class="sec-title" id="svc-title">${HOME.servicesTitle}</h2><p class="sec-sub">${HOME.servicesSub}</p></div>
      ${btn(c.url('business/'), '사업분야 자세히', { variant: 'line' })}
    </div>
    <ul class="svc-grid">${SERVICES.map((sv, i) => `<li class="svc-card${i < 2 ? ' is-wide' : ''}" data-reveal><a href="${c.url('business/')}#${sv.id}">
      ${sv.img ? `<img src="${c.asset('img/' + sv.img)}" width="${sv.w}" height="${sv.h}" alt="" loading="lazy" decoding="async">` : `<span class="svc-thumb-ph">사진 받을 자리</span>`}
      <span class="svc-card-body"><span class="svc-no">${sv.no}</span><span class="svc-name">${sv.name}</span><span class="svc-short">${sv.short}</span></span>
      <span class="svc-go">${icon('arrowUpRight')}</span>
    </a></li>`).join('')}</ul>
  </div>
</section>`;

  /* 공사 전과 후: 현장 이름 단추로 바꿔 봄. JS가 없으면 세 현장이 모두 차례로 보이고 단추는 숨김 */
  const baSec = `<section class="sec sec-stone ba-sec" aria-labelledby="ba-title">
  <div class="wrap ba-in">
    <div class="ba-head" data-reveal>
      <h2 class="sec-title" id="ba-title">${HOME.baTitle}</h2>
      <p class="sec-sub">${HOME.baSub}</p>
      <div class="ba-tabs" role="tablist" aria-label="현장 고르기" data-ba-tabs hidden>${BEFORE_AFTER.map((x, i) => `<button type="button" role="tab" id="ba-t${i}" aria-controls="ba-p${i}" aria-selected="${i ? 'false' : 'true'}"${i ? ' tabindex="-1"' : ''}>${x.tab}</button>`).join('')}</div>
    </div>
    <div class="ba-panels" data-reveal>${BEFORE_AFTER.map((x, i) => {
      const p = PROJECTS.find(q => q.id === x.id);
      return `<div class="ba-panel" role="tabpanel" id="ba-p${i}" aria-labelledby="ba-t${i}" data-ba-panel>
        ${baFrame(c, x, i)}
        <p class="ba-cap"><b>${x.tab}</b><span>${x.text}</span>${p ? `<a class="text-link" href="${caseUrl(c, p)}">이 현장 자세히${icon('chevron')}</a>` : ''}</p>
      </div>`;
    }).join('')}</div>
  </div>
</section>`;

  const aboutBlk = `<section class="dark-sec" aria-labelledby="ab-title">
  <div class="wrap dark-in">
    <div data-reveal>
      <h2 class="dark-quote" id="ab-title">${br(HOME.aboutQuote)}</h2>
    </div>
    <div class="dark-body" data-reveal>
      <p>${HOME.aboutText}</p>
      ${principleList()}
      <a class="text-link" href="${c.url('about/')}">회사소개 보기${icon('chevron')}</a>
    </div>
  </div>
</section>`;

  const process = `<section class="sec sec-stone">
  <div class="wrap">
    ${secHead({ title: HOME.processTitle, sub: HOME.processSub })}
    <div data-reveal>${processList()}</div>
  </div>
</section>`;

  /* 시공사례: 최근 6곳. 맨 앞 현장은 크게 */
  const cases = `<section class="sec">
  <div class="wrap">
    <div class="sec-row">${secHead({ title: HOME.projectsTitle, sub: HOME.projectsSub })}${btn(c.url('projects/'), `시공사례 ${PROJECTS.length}곳 모두 보기`, { variant: 'line' })}</div>
    <ul class="case-grid is-mosaic" data-reveal>${PROJECTS.slice(0, 6).map(p => caseCard(c, p)).join('')}</ul>
  </div>
</section>`;

  /* 알림 팝업: on: true 인 것만. hidden 으로 넣어 두고 JS가 열어 줌 */
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

  return page(c, { title: '', desc: META.home, bodyClass: 'p-home', body: hero + services + baSec + aboutBlk + cases + process + ctaBand(c) + popups });
}

/* ================= 회사소개 ================= */
export function about(c) {
  const intro = `<section class="sec sec-first">
  <div class="wrap split">
    ${secHead({ title: ABOUT.introTitle })}
    <div class="prose" data-reveal>${ABOUT.intro.map(p => `<p>${p}</p>`).join('')}
      <p class="sign">${CO.name} 대표 ${CO.ceo ? esc(CO.ceo) : ph('대표 이름')}</p>
    </div>
  </div>
</section>`;

  const principles = `<section class="dark-sec">
  <div class="wrap">
    <div class="sec-head" data-reveal><h2 class="sec-title">${ABOUT.principlesTitle}</h2></div>
    <div data-reveal>${principleList()}</div>
  </div>
</section>`;

  const fields = `<section class="sec">
  <div class="wrap split">
    ${secHead({ title: ABOUT.fieldsTitle })}
    <div data-reveal>
      <ul class="field-grid">${ABOUT.fields.map(f => `<li>${f}</li>`).join('')}</ul>
      <p class="field-note">메뉴에서는 칸막이·천정공사, 원상복구, 인테리어, 공장보수공사, 수장공사 다섯 가지로 묶어 소개합니다. <a class="text-link" href="${c.url('business/')}">사업분야 보기${icon('chevron')}</a></p>
    </div>
  </div>
</section>`;

  const rows = [
    ['상호', CO.name],
    ['대표', val(CO.ceo)],
    ['분야', CO.field],
    ['사업분야', SERVICES.map(s => s.name).join(', ')],
    ['시공 지역', CO.area],
    ['전화', val(CO.phone, p => `<a href="${telHref(p)}">${esc(p)}</a>`)],
    ['이메일', val(CO.email, e => `<a href="mailto:${esc(e)}">${esc(e)}</a>`)],
    ['주소', val(CO.address)],
    ['사업자등록번호', val(CO.bizNo)],
    ['상담 시간', val(CO.hours)],
    ['블로그', `<a href="${CO.blog}" target="_blank" rel="noopener">${CO.blogName}${icon('external')}</a>`]
  ];
  const info = `<section class="sec sec-stone">
  <div class="wrap split">
    ${secHead({ title: ABOUT.infoTitle })}
    <dl class="info-table" data-reveal>${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
  </div>
</section>`;

  const map = `<section class="sec" id="location">
  <div class="wrap split">
    ${secHead({ title: ABOUT.mapTitle })}
    <div class="map-card" data-reveal>
      ${icon('pin')}
      <p class="map-addr">${val(CO.address)}</p>
      <p class="map-note">현장 견적은 전국 어디든 직접 찾아가서 봅니다.</p>
      ${CO.address ? `<div class="map-btns">${btn('https://map.naver.com/p/search/' + encodeURIComponent(CO.address), '네이버 지도', { variant: 'line', ext: true })}${btn('https://map.kakao.com/link/search/' + encodeURIComponent(CO.address), '카카오맵', { variant: 'line', ext: true })}</div>` : ''}
    </div>
  </div>
</section>`;

  return page(c, {
    title: '회사소개', desc: META.about, bodyClass: 'p-about',
    body: pageHead(c, { title: ABOUT.heroTitle, lede: ABOUT.heroLede, crumb: '회사소개' }) + intro + principles + fields + info + map + ctaBand(c)
  });
}

/* ================= 사업분야 ================= */
export function business(c) {
  const chips = `<nav class="chips" aria-label="사업분야 바로가기"><div class="wrap"><ul>${SERVICES.map(s => `<li><a href="#${s.id}">${s.name}</a></li>`).join('')}</ul></div></nav>`;
  const related = s => {
    const ps = PROJECTS.filter(p => (p.services || []).includes(s.id) && p.id);
    return ps.length ? `<p class="biz-related"><span>관련 사례</span>${ps.slice(0, 4).map(p => `<a href="${caseUrl(c, p)}">${esc(p.title)}</a>`).join('')}${ps.length > 4 ? `<a href="${c.url('projects/')}?type=${s.id}">시공사례 전체 보기</a>` : ''}</p>` : '';
  };
  const restoreCheck = `<div class="biz-extra" data-reveal><h3>원상복구 전에 확인할 것</h3><ul class="check-grid">${RESTORE_CHECK.map(x => `<li>${icon('check')}<div><b>${x.title}</b><p>${x.text}</p></div></li>`).join('')}</ul></div>`;
  const secs = SERVICES.map(s => `<section class="biz" id="${s.id}">
  <div class="wrap">
    <div class="biz-in">
      <div class="biz-photo" data-reveal>${photo(c, s, { label: s.name + ' 사진' })}</div>
      <div class="biz-body" data-reveal>
        <p class="biz-no">${s.no}</p>
        <h2 class="biz-title">${s.name}</h2>
        <p class="biz-short">${s.short}</p>
        <p class="biz-text">${s.text}</p>
        <h3 class="biz-sub">주로 하는 일</h3>
        <ul class="biz-points">${s.points.map(p => `<li>${icon('check')}<span>${p}</span></li>`).join('')}</ul>
        ${related(s)}
        ${s.gallery ? `<ul class="biz-gal">${s.gallery.map(x => `<li><a href="${c.asset('img/' + x.img)}" data-lb data-cap="${esc(x.alt)}"><img src="${c.asset('img/' + x.img)}" width="${x.w}" height="${x.h}" alt="${esc(x.alt)}" loading="lazy" decoding="async"></a></li>`).join('')}</ul>` : ''}
        ${btn(c.url('contact/') + '?service=' + s.id, '이 공사로 견적문의')}
      </div>
    </div>
    ${s.id === 'restore' ? restoreCheck : ''}
  </div>
</section>`).join('');
  const process = `<section class="sec sec-stone">
  <div class="wrap">
    ${secHead({ title: HOME.processTitle, sub: HOME.processSub })}
    <div data-reveal>${processList()}</div>
  </div>
</section>`;
  return page(c, {
    title: '사업분야', desc: META.business, bodyClass: 'p-business',
    body: pageHead(c, { title: '사업분야', lede: '칸막이·천정공사, 원상복구, 인테리어, 공장보수공사, 수장공사. 각 분야의 기술진이 직접 시공합니다.', crumb: '사업분야' }) + chips + secs + process + lightbox() + ctaBand(c)
  });
}

/* ================= 시공사례 목록 ================= */
export function projects(c) {
  /* 공사 종류로 걸러 보기: JS가 있을 때만 보임. ?type=partition 처럼 붙이면 그 종류로 열림 */
  const kinds = SERVICES.map(s => [s, PROJECTS.filter(p => (p.services || []).includes(s.id)).length]).filter(([, n]) => n);
  const filter = `<div class="pf-bar" data-pf hidden><div class="wrap pf-in">
    <div class="pf-btns" role="group" aria-label="공사 종류로 보기">
      <button type="button" data-pf-v="all" aria-pressed="true">전체<span>${PROJECTS.length}</span></button>
      ${kinds.map(([s, n]) => `<button type="button" data-pf-v="${s.id}" aria-pressed="false">${s.name}<span>${n}</span></button>`).join('')}
    </div>
    <p class="pf-count" aria-live="polite" data-pf-count></p>
  </div></div>`;
  const card = p => `<li class="pj-card" data-svc="${(p.services || []).join(' ')}" data-pj="${p.id}">
    <a href="${caseUrl(c, p)}">
      <span class="pj-card-photo">${photo(c, coverOf(p), { label: '현장 사진' })}<span class="pj-card-n">${icon('camera')}${(p.gallery || []).length}</span></span>
      <span class="pj-card-meta">${day(p.date)}<span aria-hidden="true">|</span>${p.where ? esc(p.where) : ''}</span>
      <h2 class="pj-card-title">${esc(p.title)}</h2>
      <span class="pj-card-tags">${(p.services || []).map(id => `<span>${SVC[id].name}</span>`).join('')}</span>
    </a>
  </li>`;
  const list = `<section class="sec sec-first pj-list"><div class="wrap">
    <ul class="pj-grid" data-pf-list>${PROJECTS.map(card).join('')}</ul>
  </div></section>`;
  const more = `<section class="sec sec-stone" id="blog"><div class="wrap">
    <div class="sec-row">${secHead({ title: '블로그 최근 글', sub: '현장 소식은 네이버 블로그에 먼저 올립니다. 글을 누르면 블로그에서 열립니다.' })}${btn(CO.blog, '블로그에서 더 보기', { variant: 'line', ext: true })}</div>
    <ul class="blog-list" data-reveal>${BLOG_POSTS.map(b => `<li><a href="${esc(b.url)}" target="_blank" rel="noopener"><span class="bl-meta">${day(b.date)}<span>${esc(b.cat)}</span></span><span class="bl-title">${esc(b.title)}</span>${icon('external')}</a></li>`).join('')}</ul>
  </div></section>`;
  return page(c, {
    title: '시공사례', desc: META.projects, bodyClass: 'p-projects',
    body: pageHead(c, { title: '시공사례', lede: `블로그에 올린 현장 ${PROJECTS.length}곳입니다. 현장을 누르면 공사 내용과 과정 사진을 모두 볼 수 있습니다.`, crumb: '시공사례' }) + filter + list + more + ctaBand(c)
  });
}

/* ================= 시공사례 현장별 (projects/<id>/) ================= */
export function projectPage(c, p) {
  const i = PROJECTS.indexOf(p);
  const newer = PROJECTS[i - 1], older = PROJECTS[i + 1];
  const pair = BEFORE_AFTER.find(x => x.id === p.id);
  const cover = coverOf(p);
  const meta = `<p class="pjd-meta">${p.where ? `<span>${esc(p.where)}</span>` : ''}${day(p.date)}${(p.services || []).map(id => `<a href="${c.url('business/')}#${id}">${SVC[id].name}</a>`).join('')}</p>`;
  const top = `<section class="sec sec-first pjd"><div class="wrap">
    <div class="pjd-in">
      <figure class="pjd-cover" data-reveal>${photo(c, cover, { label: '현장 사진', eager: true })}<figcaption>${esc(cover.alt || '')}</figcaption></figure>
      <aside class="pjd-side" data-reveal>
        <h2>공사 내용</h2>
        <ul class="biz-points">${(p.works || []).map(w => `<li>${icon('check')}<span>${w}</span></li>`).join('')}</ul>
        <div class="pjd-btns">
          ${btn(c.url('contact/') + '?service=' + (p.services || [])[0], '비슷한 공사 견적문의')}
          ${p.url ? btn(p.url, '블로그 원문 보기', { variant: 'line', ext: true }) : ''}
        </div>
      </aside>
    </div>
  </div></section>`;
  const baBlk = pair ? `<section class="sec sec-stone pjd-ba"><div class="wrap ba-in">
    <div class="ba-head" data-reveal><h2 class="sec-title">${HOME.baTitle}</h2><p class="sec-sub">${pair.text} 가운데 손잡이를 옆으로 밀어 보세요.</p></div>
    <div class="ba-panels" data-reveal><div class="ba-panel">${baFrame(c, pair, 9)}</div></div>
  </div></section>` : '';
  const gal = `<section class="sec pjd-gal"><div class="wrap">
    <div class="sec-row"><div class="sec-head" data-reveal><h2 class="sec-title">현장 사진 ${(p.gallery || []).length}장</h2><p class="sec-sub">공사 순서대로 올렸습니다. 사진을 누르면 크게 볼 수 있습니다.</p></div></div>
    <ul class="gallery" data-gallery>${(p.gallery || []).map(x => `<li><a href="${c.asset('img/' + x.img)}" data-lb data-cap="${esc(x.alt)}"><img src="${c.asset('img/' + x.img)}" width="${x.w}" height="${x.h}" alt="${esc(x.alt)}" loading="lazy" decoding="async"></a><span>${esc(x.alt)}</span></li>`).join('')}</ul>
    <nav class="pjd-nav" aria-label="다른 시공사례">
      ${newer ? `<a class="pjd-prev" href="${caseUrl(c, newer)}"><small>${icon('chevron')}더 최근 현장</small><b>${esc(newer.title)}</b></a>` : '<span></span>'}
      <a class="pjd-all" href="${c.url('projects/')}">목록</a>
      ${older ? `<a class="pjd-next" href="${caseUrl(c, older)}"><small>이전 현장${icon('chevron')}</small><b>${esc(older.title)}</b></a>` : '<span></span>'}
    </nav>
  </div></section>`;
  const desc = `${p.title}. ${p.summary}`.slice(0, 150);
  return page(c, {
    title: `${p.title} | 시공사례`, desc, bodyClass: 'p-project',
    body: pageHead(c, { title: p.title, lede: p.summary, crumb: p.chip || p.title, parent: ['projects/', '시공사례'], meta, cls: 'pjd-head' }) + top + baBlk + gal + lightbox() + ctaBand(c)
  });
}
const lightbox = () => `<dialog class="lb" data-lb-dialog aria-label="사진 크게 보기">
  <figure><img alt="" data-lb-img><figcaption data-lb-cap></figcaption></figure>
  <button type="button" class="lb-btn lb-prev" data-lb-prev aria-label="이전 사진">${icon('chevron')}</button>
  <button type="button" class="lb-btn lb-next" data-lb-next aria-label="다음 사진">${icon('chevron')}</button>
  <button type="button" class="lb-close" data-lb-close aria-label="닫기" autofocus>${icon('close')}</button>
</dialog>`;

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
  </div>
  <fieldset class="fset visit"><legend>현장 방문 예약</legend>
    <p class="fhint">방문을 원하는 날짜와 시간대를 고르면 확인 후 전화로 확정해 드립니다.</p>
    <div class="fgrid">
      <div class="field"><label for="f-date">희망 날짜</label><input id="f-date" name="date" type="date"></div>
      <div class="field"><span class="flabel" id="l-time">희망 시간대</span><div role="radiogroup" aria-labelledby="l-time">${seg('time', CONTACT.times.map(t => [t, t]))}</div></div>
      <div class="field span2"><label for="f-when">공사 희망 일정</label><input id="f-when" name="when" type="text" placeholder="예: 12월 중순 / 원상복구라면 반납일"></div>
    </div>
  </fieldset>
  <div class="fgrid">
    <div class="field"><label for="f-name">이름${req}</label><input id="f-name" name="name" type="text" autocomplete="name" required></div>
    <div class="field"><label for="f-phone">연락처${req}</label><input id="f-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="010-0000-0000" required></div>
  </div>
  <div class="field"><label for="f-message">문의 내용${req}</label><textarea id="f-message" name="message" rows="6" placeholder="공사할 곳과 원하는 내용을 편하게 적어 주세요." required></textarea></div>
  <div class="field consent">
    <label class="check"><input id="f-privacy" name="privacy" type="checkbox" required><span class="box" aria-hidden="true">${icon('check')}</span><span>개인정보 수집과 이용에 동의합니다${req}</span></label>
    <details class="privacy-more"><summary>내용 보기</summary><p>${CONTACT.privacyText}</p></details>
  </div>
  <button class="btn btn-primary btn-lg" type="submit">견적문의 · 방문 예약 보내기</button>
  <p class="form-note">${icon('mail')}${CONTACT.formNote}</p>
</form>`;
  const aside = `<aside class="contact-aside">
  <div class="ca-card">
    <h2>전화 · 문자 · 이메일</h2>
    ${CO.phone ? `<a class="ca-phone" href="${telHref(CO.phone)}">${esc(CO.phone)}</a>` : `<p class="ca-phone">${ph()}</p>`}
    <div class="ca-btns">${CO.phone ? `<a class="btn btn-primary" href="${telHref(CO.phone)}">${icon('phone')}전화하기</a><a class="btn btn-line" href="${smsHref(CO.phone)}">${icon('doc')}문자 보내기</a>` : ''}${CO.email ? `<a class="btn btn-line" href="mailto:${esc(CO.email)}">${icon('mail')}이메일 보내기</a>` : ''}</div>
    <dl class="ca-dl"><div><dt>상담 시간</dt><dd>${val(CO.hours)}</dd></div><div><dt>이메일</dt><dd>${val(CO.email)}</dd></div><div><dt>시공 지역</dt><dd>${CO.area}</dd></div></dl>
  </div>
  <div class="ca-card">
    <h2>알려 주시면 좋은 것</h2>
    <ul class="ca-list">${CONTACT.tellUs.map(x => `<li>${icon('check')}<span>${x}</span></li>`).join('')}</ul>
  </div>
</aside>`;
  const faq = `<section class="sec sec-stone" id="faq">
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
