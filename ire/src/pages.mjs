/* 페이지 본문: 홈, 회사소개, 사업분야, 시공사례, 건축 가이드, 견적문의, 없는 주소 */
import { CO, SCOPE, TYPES, STRENGTHS, PROCESS, COSTS, LAND, REGIONS, CATS, POSTS, PJ_CATS, PROJECTS, HOME, ABOUT, CONTACT, META } from './content.mjs';
import { icon, typeArt, heroBuilding } from './art.mjs';
import { page, pageHero, ctaBand, btn, phoneBtn, lines, eyebrow, secHead, esc } from './layout.mjs';

const pad2 = n => String(n).padStart(2, '0');
const inkWords = t => t.split(' ').map((w, i, a) => `<span class="w">${w}${i < a.length - 1 ? ' ' : ''}</span>`).join('');
const ph = (t = CO.ph) => `<span class="ph">${t}</span>`;
const LAND_IC = ['map', 'road', 'hill', 'plug'];
const postRow = p => `<li data-cat="${p.cat}"><a href="${p.url || CO.blog}" target="_blank" rel="noopener">
  <span class="post-meta"><span class="post-cat">${CATS[p.cat]}</span><time datetime="${p.date}">${p.date.replace(/-/g, '.')}</time></span>
  <b>${p.title}</b>${icon('external')}
</a></li>`;
/* 시공사례 카드: 사진(블로그 이미지)과 종류, 이름. 위치·규모·공사는 아는 것만 쓰고 나머지는 채울 자리 */
const pjCard = (c, pj, i, meta = true) => `<li class="pj${pj.img ? '' : ' pj-noimg'}" data-cat="${pj.cat}" data-reveal style="--d:${(i % 3) * 0.07}s">
  <div class="pj-img">${pj.img ? `<img src="${c.asset('img/' + pj.img)}" width="${pj.w}" height="${pj.h}" alt="${pj.name}" loading="lazy" decoding="async">` : `${icon('camera')}<span>현장 사진 자리</span>`}<span class="pj-cat">${PJ_CATS[pj.cat]}</span></div>
  <p class="pj-tag">${pj.name}${pj.note ? `<small>${pj.note}</small>` : ''}</p>
  ${meta ? `<dl class="pj-meta"><div><dt>위치</dt><dd>${pj.where || '<i></i>'}</dd></div><div><dt>규모</dt><dd><i></i></dd></div><div><dt>공사</dt><dd><i></i></dd></div></dl>` : ''}
</li>`;
/* 블로그 표지가 있는 글은 카드로 (표지에 제목이 들어 있어 이미지는 장식으로 둠) */
const postCard = (c, p, i) => `<li data-reveal style="--d:${i * 0.07}s"><a class="pcard" href="${p.url}" target="_blank" rel="noopener">
  <span class="pcard-img"><img src="${c.asset('img/' + p.cover)}" width="520" height="520" alt="" loading="lazy" decoding="async"></span>
  <span class="post-meta"><span class="post-cat">${CATS[p.cat]}</span><time datetime="${p.date}">${p.date.replace(/-/g, '.')}</time></span>
  <b>${p.title}</b>
</a></li>`;

/* ================= 홈 ================= */
export function home(c) {
  const hero = `<section class="hero" data-dark>
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap hero-in">
    <div class="hero-text">
      ${eyebrow(CO.field, 'on-dark')}
      <h1 class="hero-title" data-reveal>${lines(HOME.heroTitle)}</h1>
      <p class="hero-lede" data-reveal style="--d:.12s">${HOME.heroLede}</p>
      <div class="hero-btns" data-reveal style="--d:.2s">${phoneBtn('orange')}${btn(c.url('contact/'), '견적문의', { variant: 'ghost-light' })}</div>
    </div>
    <div class="hero-art">
      <div class="bld" data-bld>${heroBuilding()}</div>
      <button class="bld-replay" type="button" data-bld-replay>${icon('replay')}<span>다시 짓기</span></button>
    </div>
  </div>
  <div class="wrap hero-scope"><ul>${SCOPE.map((s, i) => `<li><span>${pad2(i + 1)}</span>${s.name}</li>`).join('')}</ul></div>
</section>`;

  const statement = `<section class="statement" data-statement>
  <div class="wrap">
    ${eyebrow('이레산업개발')}
    <blockquote class="statement-q"><p>${inkWords(CO.intro)}</p></blockquote>
    <p class="statement-sub" data-reveal>${HOME.statementSub}</p>
  </div>
</section>`;

  const types = `<section class="types">
  <div class="wrap">
    <div class="sec-row">${secHead({ en: 'WHAT WE BUILD', title: HOME.typesTitle, sub: HOME.typesSub })}${btn(c.url('business/'), '사업분야 자세히', { variant: 'outline' })}</div>
    <ul class="type-grid">${TYPES.map((t, i) => `<li data-reveal style="--d:${(i % 3) * 0.07}s"><a class="type" href="${c.url('business/')}#${t.id}">
      <span class="type-en">${pad2(i + 1)} ${t.en}</span>
      <div class="type-art">${typeArt(t.art)}</div>
      <h3>${t.name}</h3><p>${t.short}</p>
      <span class="type-more">${icon('arrow')}</span>
    </a></li>`).join('')}</ul>
  </div>
</section>`;

  const direct = `<section class="direct" data-dark>
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap direct-in">
    <div class="direct-head">
      <p class="sec-en on-dark" aria-hidden="true">RESPONSIBLE BUILD</p>
      <h2 class="sec-title" data-reveal>${lines(HOME.directTitle)}</h2>
    </div>
    <ol class="strengths">${STRENGTHS.map((s, i) => `<li data-reveal style="--d:${i * 0.07}s"><span class="st-no">${s.no}</span><h3>${s.title}</h3><p>${s.text}</p></li>`).join('')}</ol>
  </div>
</section>`;

  const process = `<section class="process">
  <div class="wrap">
    ${secHead({ en: 'ONE-STOP PROCESS', title: HOME.processTitle, sub: HOME.processSub })}
    <ol class="proc" data-reveal>${PROCESS.map((p, i) => `<li style="--i:${i}"><span class="proc-en">${pad2(i + 1)} · ${p.en}</span><h3>${p.title}</h3><p>${p.text}</p></li>`).join('')}</ol>
  </div>
</section>`;

  const budget = `<section class="budget">
  <div class="wrap budget-in">
    <div class="budget-col">
      ${secHead({ en: 'BUDGET', title: HOME.costTitle, sub: HOME.costSub })}
      <ol class="costs">${COSTS.map((x, i) => `<li data-reveal style="--d:${i * 0.06}s"><span class="cost-no">${pad2(i + 1)}</span><div><b>${x.title}</b><p>${x.text}</p></div></li>`).join('')}</ol>
    </div>
    <div class="budget-col">
      ${secHead({ en: 'LAND CHECK', title: HOME.landTitle })}
      <ul class="land">${LAND.map((x, i) => `<li data-reveal style="--d:${i * 0.06}s"><span class="land-ic">${icon(LAND_IC[i])}</span><div><b>${x.title}</b><p>${x.text}</p></div></li>`).join('')}</ul>
    </div>
  </div>
</section>`;

  const projects = `<section class="projects-home">
  <div class="wrap">
    <div class="sec-row">${secHead({ en: 'PROJECTS', title: HOME.projectsTitle, sub: HOME.projectsSub })}${btn(c.url('projects/'), '시공사례 전체 보기', { variant: 'outline' })}</div>
    <ul class="pj-grid pj-grid-home">${PROJECTS.filter(p => p.img).slice(0, 6).map((p, i) => pjCard(c, p, i, false)).join('')}</ul>
  </div>
</section>`;

  const guide = `<section class="guide-home">
  <div class="wrap">
    <div class="sec-row">${secHead({ en: 'GUIDE', title: HOME.guideTitle, sub: HOME.guideSub })}<div class="guide-btns">${btn(c.url('guide/'), '건축 가이드 전체', { variant: 'outline' })}${btn(CO.blog, '블로그', { variant: 'outline', ext: true })}</div></div>
    <ul class="pcards">${POSTS.filter(p => p.cover).slice(0, 4).map((p, i) => postCard(c, p, i)).join('')}</ul>
  </div>
</section>`;

  const regions = `<section class="regions">
  <div class="wrap regions-in">
    <p class="regions-title">${icon('pin')}${HOME.regionsTitle}</p>
    <ul>${REGIONS.map(r => `<li>${r}</li>`).join('')}</ul>
  </div>
</section>`;

  return page(c, { title: '', desc: META.home, bodyClass: 'p-home', body: hero + projects + statement + types + direct + process + budget + guide + regions + ctaBand(c) });
}

/* ================= 회사소개 ================= */
export function about(c) {
  const greet = `<section class="greet">
  <div class="wrap greet-in">
    <div>
      ${secHead({ en: 'GREETING', title: ABOUT.greetTitle })}
      <p class="draft-badge">${icon('doc')}${ABOUT.draft}</p>
    </div>
    <div class="greet-body" data-reveal>
      ${ABOUT.greeting.map(p => `<p>${p}</p>`).join('')}
      <p class="greet-sign">${ABOUT.sign} ${ph()}</p>
    </div>
  </div>
</section>`;
  const principles = `<section class="direct direct-about" data-dark>
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap direct-in">
    <div class="direct-head"><p class="sec-en on-dark" aria-hidden="true">OUR PRINCIPLES</p><h2 class="sec-title" data-reveal>${lines(['이레산업개발이', '지키는 네 가지'])}</h2></div>
    <ol class="strengths">${STRENGTHS.map((s, i) => `<li data-reveal style="--d:${i * 0.07}s"><span class="st-no">${s.no}</span><h3>${s.title}</h3><p>${s.text}</p></li>`).join('')}</ol>
  </div>
</section>`;
  const rows = [
    ['상호', CO.legal],
    ['대표', ph()],
    ['분야', `${CO.field} (주택, 근생, 공장, 창고, 빌딩)`],
    ['공사', SCOPE.map(s => s.name).join(', ')],
    ['전화', `<a href="${CO.phoneHref}">${CO.phone}</a>`],
    ['이메일', `<a href="mailto:${CO.email}">${CO.email}</a>`],
    ['주소', CO.address],
    ['사업자등록번호', ph()],
    ['건설업 등록', ph()],
    ['블로그', `<a href="${CO.blog}" target="_blank" rel="noopener">${CO.blogName}${icon('external')}</a>`]
  ];
  const info = `<section class="info">
  <div class="wrap info-in">
    <div>${secHead({ en: 'COMPANY', title: ABOUT.infoTitle })}</div>
    <dl class="info-table" data-reveal>${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
  </div>
</section>`;
  const map = `<section class="map-sec" id="location">
  <div class="wrap">
    ${secHead({ en: 'LOCATION', title: ABOUT.mapTitle })}
    <div class="map-card" data-reveal>
      <div class="map-addr">${icon('pin')}<div><b>${CO.address}</b><p>${CO.legal}</p></div></div>
      <div class="map-links">
        <a href="https://map.naver.com/p/search/${encodeURIComponent(CO.mapQuery)}" target="_blank" rel="noopener">네이버 지도${icon('external')}</a>
        <a href="https://map.kakao.com/link/search/${encodeURIComponent(CO.mapQuery)}" target="_blank" rel="noopener">카카오맵${icon('external')}</a>
      </div>
      <p class="map-note">지도는 실제 사이트에서 넣습니다. ${HOME.regionsTitle}: ${REGIONS.join(', ')}</p>
    </div>
  </div>
</section>`;
  return page(c, {
    title: '회사소개', desc: META.about, bodyClass: 'p-about',
    body: pageHero(c, { en: 'ABOUT', eb: '회사소개', title: ABOUT.heroTitle, lede: ABOUT.heroLede, crumb: '회사소개', img: 'hero-about.webp' }) + greet + principles + info + map + ctaBand(c)
  });
}

/* ================= 사업분야 ================= */
export function business(c) {
  const chips = `<nav class="pnav" data-pnav aria-label="사업분야 바로가기"><div class="wrap"><ul>${TYPES.map((t, i) => `<li><a href="#${t.id}" data-spy-link="${t.id}"><span>${pad2(i + 1)}</span>${t.name}</a></li>`).join('')}</ul></div></nav>`;
  const secs = TYPES.map((t, i) => `<section class="biz${i % 2 ? ' rev' : ''}" id="${t.id}">
  <div class="wrap biz-in">
    <div class="biz-art" data-reveal>${typeArt(t.art)}</div>
    <div class="biz-body">
      <p class="biz-en">${pad2(i + 1)} · ${t.en}</p>
      <h2 class="biz-title" data-reveal>${t.name}</h2>
      <p class="biz-short" data-reveal style="--d:.05s">${t.short}</p>
      <p class="biz-text" data-reveal style="--d:.1s">${t.text}</p>
      <ul class="biz-points" data-reveal style="--d:.14s">${t.points.map(p => `<li>${icon('check')}<span>${p}</span></li>`).join('')}</ul>
      <div class="biz-cta" data-reveal style="--d:.18s">${btn(c.url('contact/') + '?use=' + (t.id === 'extension' ? 'etc' : t.id), '이 건물로 견적문의')}</div>
    </div>
  </div>
</section>`).join('');
  const scope = `<section class="scope">
  <div class="wrap">
    ${secHead({ en: 'SCOPE OF WORK', title: ['공사 범위'], sub: '새로 짓는 일부터 고쳐 쓰는 일, 준공 절차까지 맡습니다.' })}
    <ol class="scope-grid">${SCOPE.map((s, i) => `<li data-reveal style="--d:${i * 0.07}s"><span class="scope-en">${pad2(i + 1)} ${s.en}</span><h3>${s.name}</h3><p>${s.text}</p></li>`).join('')}</ol>
  </div>
</section>`;
  return page(c, {
    title: '사업분야', desc: META.business, bodyClass: 'p-business',
    body: pageHero(c, { en: 'BUSINESS', eb: '사업분야', title: ['쓰임에 맞춰', '짓습니다'], lede: '공장, 창고, 근린생활시설부터 상가주택과 빌딩, 증축과 대수선까지 맡습니다.', crumb: '사업분야', img: 'hero-business.webp' }) + chips + secs + scope + ctaBand(c)
  });
}

/* ================= 시공사례 ================= */
export function projects(c) {
  const body = `<section class="pj-page">
  <div class="wrap">
    <div class="filter" role="group" aria-label="종류별로 보기" data-filter>
      <button type="button" aria-pressed="true" data-f="all">전체 <span>${PROJECTS.length}</span></button>
      ${Object.entries(PJ_CATS).map(([k, v]) => `<button type="button" aria-pressed="false" data-f="${k}">${v} <span>${PROJECTS.filter(p => p.cat === k).length}</span></button>`).join('')}
    </div>
    <p class="pj-note">${icon('camera')}<span>사진은 블로그 이미지입니다. 위치, 규모, 공사 내용을 받으면 카드마다 채웁니다.</span></p>
    <ul class="pj-grid pj-grid-full" data-post-list>${PROJECTS.map((p, i) => pjCard(c, p, i)).join('')}</ul>
  </div>
</section>`;
  return page(c, {
    title: '시공사례', desc: META.projects, bodyClass: 'p-projects',
    body: pageHero(c, { en: 'PROJECTS', eb: '시공사례', title: ['직접 지은', '건물들'], lede: '이레산업개발이 시공한 공장, 창고, 근린생활시설을 소개합니다.', crumb: '시공사례', img: 'hero-projects.webp' }) + body + ctaBand(c)
  });
}

/* ================= 건축 가이드 ================= */
export function guide(c) {
  const count = k => POSTS.filter(p => p.cat === k).length;
  const body = `<section class="guide-page">
  <div class="wrap">
    <div class="filter" role="group" aria-label="분야별로 보기" data-filter>
      <button type="button" aria-pressed="true" data-f="all">전체 <span>${POSTS.length}</span></button>
      ${Object.entries(CATS).map(([k, v]) => `<button type="button" aria-pressed="false" data-f="${k}">${v} <span>${count(k)}</span></button>`).join('')}
    </div>
    <p class="guide-note">${icon('blog')}글을 누르면 네이버 블로그로 이동합니다. 목록은 2026년 11월 9일 기준이고, 받은 글 5개는 그 글로, 나머지는 블로그 첫 화면으로 연결됩니다.</p>
    <ul class="post-list post-list-full" data-post-list>${POSTS.map(postRow).join('')}</ul>
  </div>
</section>`;
  return page(c, {
    title: '건축 가이드', desc: META.guide, bodyClass: 'p-guide',
    body: pageHero(c, { en: 'GUIDE', eb: '건축 가이드', title: ['건축주가', '자주 묻는 것들'], lede: '공장, 창고, 근린생활시설을 지을 때 알아 두면 좋은 내용을 블로그에 정리하고 있습니다.', crumb: '건축 가이드', img: 'hero-guide.webp' }) + body + ctaBand(c)
  });
}

/* ================= 견적문의 ================= */
export function contact(c) {
  const req = '<em class="req" aria-hidden="true">*</em><span class="sr">필수</span>';
  const seg = (name, items, checked = -1) => `<div class="seg">${items.map((it, i) => { const [v, l] = Array.isArray(it) ? it : [String(i), it]; return `<label><input type="radio" name="${name}" value="${v}"${i === checked ? ' checked' : ''}><span>${l}</span></label>`; }).join('')}</div>`;
  const form = `<form class="qform" novalidate data-form data-errors="${esc(JSON.stringify(CONTACT.errors))}" data-sent="${esc(CONTACT.sent)}" data-prefilled="${esc(CONTACT.prefilled)}">
  <fieldset class="fset"><legend>건물 용도</legend>${seg('use', CONTACT.uses)}</fieldset>
  <fieldset class="fset"><legend>공사 종류</legend>${seg('work', CONTACT.works, 0)}</fieldset>
  <fieldset class="fset"><legend>땅</legend>${seg('land', CONTACT.land, 0)}</fieldset>
  <div class="fgrid">
    <div class="field"><label for="f-site">부지 위치</label><input id="f-site" name="site" type="text" placeholder="예: 경기 화성시 동탄"></div>
    <div class="field"><label for="f-size">대략의 면적</label><input id="f-size" name="size" type="text" placeholder="예: 대지 300평, 건물 200평"></div>
    <div class="field"><label for="f-when">희망 착공 시기</label><input id="f-when" name="when" type="text" placeholder="예: 2027년 봄"></div>
    <div class="field"><label for="f-budget">예상 예산</label><input id="f-budget" name="budget" type="text" placeholder="정해졌다면 적어 주세요"></div>
    <div class="field"><label for="f-name">이름${req}</label><input id="f-name" name="name" type="text" autocomplete="name" required></div>
    <div class="field"><label for="f-phone">연락처${req}</label><input id="f-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="010-0000-0000" required></div>
    <div class="field span2"><label for="f-email">이메일</label><input id="f-email" name="email" type="email" autocomplete="email"></div>
  </div>
  <div class="field"><label for="f-message">문의 내용${req}</label><textarea id="f-message" name="message" rows="6" placeholder="생산설비, 필요한 층고, 주차 대수처럼 생각해 둔 내용을 편하게 적어 주세요." required></textarea></div>
  <div class="field consent">
    <label class="check"><input id="f-privacy" name="privacy" type="checkbox" required><span class="box" aria-hidden="true">${icon('check')}</span><span>개인정보 수집과 이용에 동의합니다${req}</span></label>
    <details class="privacy-more"><summary>내용 보기</summary><p>${CONTACT.privacyText}</p></details>
  </div>
  <button class="btn btn-primary btn-lg" type="submit"><span>견적문의 보내기</span>${icon('arrow')}</button>
</form>`;
  const aside = `<aside class="contact-aside">
  <div class="ca-phone"><p>바로 통화하면 가장 빠릅니다</p><a href="${CO.phoneHref}">${icon('phone')}${CO.phone}</a><a class="ca-mail" href="mailto:${CO.email}">${icon('mail')}${CO.email}</a><p class="ca-addr">${icon('pin')}<span>${CO.address}<br><small>전화 및 방문 상담 환영</small></span></p></div>
  <div class="ca-card"><h2>상담 때 알려 주시면 좋은 것</h2><ul class="ca-tell">${CONTACT.tellUs.map(x => `<li>${icon('check')}<span>${x}</span></li>`).join('')}</ul></div>
  <div class="ca-card"><h2>상담 전에 알면 좋은 것</h2><ul class="ca-list">${LAND.map(x => `<li>${icon('check')}<span><b>${x.title}</b> ${x.text}</span></li>`).join('')}</ul></div>
</aside>`;
  return page(c, {
    title: '견적문의', desc: META.contact, bodyClass: 'p-contact',
    body: pageHero(c, { en: 'CONTACT', eb: '견적문의', title: CONTACT.heroTitle, lede: CONTACT.heroLede, crumb: '견적문의', img: 'hero-contact.webp' }) + `<section class="contact"><div class="wrap contact-in">${form}${aside}</div></section>`
  });
}

/* ================= 없는 주소 ================= */
export function notFound(c) {
  return page(c, {
    title: '페이지를 찾을 수 없어요', desc: '주소가 바뀌었거나 없는 페이지입니다.', bodyClass: 'p-404',
    body: `<section class="page-hero nf" data-dark><div class="grid-bg" aria-hidden="true"></div><p class="page-en" aria-hidden="true">404</p><div class="wrap page-hero-in">
      <h1 class="page-title">${lines(['찾으시는 페이지가', '없어요'])}</h1>
      <p class="page-lede">주소가 바뀌었거나 없는 페이지예요.</p>
      <div class="hero-btns">${btn(c.url(''), '홈으로', { variant: 'orange' })}${btn(c.url('business/'), '사업분야', { variant: 'ghost-light' })}${btn(c.url('contact/'), '견적문의', { variant: 'ghost-light' })}</div>
    </div></section>`
  });
}
