/* 페이지 본문: 홈, 기능, 요금, 사용 방법, 고객지원, 도입 문의, 없는 주소 */
import { BRAND, HOME, FEATURES, FLOW, UNATTENDED, USES, PLANS, FAQ, CATS, POSTS, CONTACT, META } from './content.mjs';
import { icon, remoteMock, featureUI } from './art.mjs';
import { page, pageHero, ctaBand, btn, lines, eyebrow, secHead, esc } from './layout.mjs';

const pad2 = n => String(n).padStart(2, '0');
const ph = txt => `<span class="ph">${txt || BRAND.placeholder}</span>`;
const postRow = p => `<li data-cat="${p.cat}"><a href="${BRAND.blog}" target="_blank" rel="noopener">
  <span class="post-meta"><span class="post-cat cat-${p.cat}">${CATS[p.cat]}</span><time datetime="${p.date}">${p.date.replace(/-/g, '.')}</time></span>
  <b>${p.title}</b>${icon('external')}
</a></li>`;
const faqList = items => `<div class="faq">${items.map(([q, a], i) => `<details class="faq-item"${i === 0 ? ' open' : ''}><summary><span class="faq-q">Q</span><b>${q}</b><i class="faq-x" aria-hidden="true"></i></summary><p>${a}</p></details>`).join('')}</div>`;
const osStrip = () => `<ul class="os-list">${BRAND.oses.map(o => `<li>${o}</li>`).join('')}</ul>`;

function planCards(c) {
  return `<div class="plans">${PLANS.map(p => `<article class="plan${p.best ? ' best' : ''}${p.ph ? ' plan-ph' : ''}" data-reveal>
    ${p.best ? '<span class="plan-badge">한국총판 대표 요금제</span>' : ''}
    <h3>${p.name}</h3>
    <p class="plan-price">${p.price === '채울 자리' ? `<b class="plan-ph-price">${BRAND.placeholder}</b>` : `<b>${p.price}</b>`}${p.unit ? `<span>${p.unit}</span>` : ''}</p>
    <p class="plan-desc">${p.desc}</p>
    <ul>${p.items.map(it => `<li>${icon('check')}<span>${it.includes('채울 자리') ? `${it.split(':')[0]}: ${ph()}` : it}</span></li>`).join('')}</ul>
    ${p.id === 'free' ? btn(BRAND.site, p.cta, { variant: 'outline', ext: true, cls: 'btn-block' }) : btn(c.url('contact/') + (p.id === 'advanced' ? '?plan=advanced' : '?type=quote'), p.cta, { variant: p.best ? 'primary' : 'outline', cls: 'btn-block' })}
  </article>`).join('')}</div>`;
}

/* ================= 홈 ================= */
export function home(c) {
  const hero = `<section class="hero">
  <div class="hero-grid" aria-hidden="true"></div>
  <div class="wrap hero-in">
    <div class="hero-text">
      ${eyebrow(HOME.eyebrow)}
      <h1 class="hero-title" data-reveal>${lines(HOME.heroTitle)}</h1>
      <p class="hero-lede" data-reveal style="--d:.1s">${HOME.heroLede}</p>
      <ul class="hero-points" data-reveal style="--d:.16s">${HOME.heroPoints.map(p => `<li>${icon('check')}${p}</li>`).join('')}</ul>
      <div class="hero-btns" data-reveal style="--d:.22s">${btn(BRAND.site, HOME.start, { variant: 'primary', ext: true, cls: 'btn-lg' })}${btn(c.url('contact/'), HOME.demo, { variant: 'outline', cls: 'btn-lg' })}</div>
    </div>
    <div class="hero-art">${remoteMock()}</div>
  </div>
  <div class="wrap os-band" data-reveal><p>${HOME.osTitle}</p>${osStrip()}</div>
</section>`;

  const feats = `<section class="feats">
  <div class="wrap">
    ${secHead({ eb: '핵심 기능', title: HOME.featTitle, sub: HOME.featSub })}
    <div class="feat-grid">${FEATURES.map((f, i) => `<a class="feat" href="${c.url('features/')}#${f.id}" data-reveal style="--d:${(i % 3) * 0.06}s">
      <span class="feat-ic">${icon(f.icon)}</span><h3>${f.title}</h3><p>${f.text}</p><span class="feat-more">자세히${icon('arrow')}</span>
    </a>`).join('')}</div>
  </div>
</section>`;

  const flow = `<section class="flow">
  <div class="wrap">
    ${secHead({ eb: '연결 방법', title: HOME.flowTitle, sub: HOME.flowSub })}
    <ol class="flow-steps" data-reveal>${FLOW.map((s, i) => `<li style="--i:${i}"><span class="flow-n">${pad2(i + 1)}</span><span class="flow-who ${s.who === '고객' ? 'cust' : ''}">${s.who}</span><h3>${s.title}</h3><p>${s.text}</p></li>`).join('')}</ol>
    <div class="sec-foot">${btn(c.url('guide/'), '사용 방법 자세히 보기', { variant: 'outline' })}</div>
  </div>
</section>`;

  const price = `<section class="price-teaser">
  <div class="wrap pt-in">
    <div>
      ${eyebrow('요금')}
      <h2 class="sec-title" data-reveal>${lines(HOME.priceTitle)}</h2>
      <p class="sec-sub" data-reveal style="--d:.08s">${HOME.priceSub}</p>
      <div class="pt-btns" data-reveal style="--d:.12s">${btn(c.url('pricing/'), '요금 자세히 보기', { variant: 'primary' })}${btn(BRAND.site, 'FREE 버전으로 시작', { variant: 'outline', ext: true })}</div>
    </div>
    <div class="pt-card" data-reveal style="--d:.1s">
      <p class="pt-name">Advanced</p>
      <p class="pt-price"><b data-count="30">30</b><span>만원</span><small>/ 연</small></p>
      <ul>${PLANS[1].items.map(it => `<li>${icon('check')}${it}</li>`).join('')}</ul>
      <p class="pt-note">부가세 별도</p>
    </div>
  </div>
</section>`;

  const uses = `<section class="uses">
  <div class="wrap">
    ${secHead({ eb: '활용 분야', title: HOME.useTitle, sub: HOME.useSub })}
    <div class="use-grid">${USES.map((u, i) => `<div class="use" data-reveal style="--d:${(i % 4) * 0.05}s"><span class="use-ic">${icon(u.icon)}</span><h3>${u.title}</h3><p>${u.text}</p></div>`).join('')}<a class="use use-more" href="${c.url('contact/')}" data-reveal style="--d:.15s"><span class="use-ic">${icon('chat')}</span><h3>${HOME.useMore.title}</h3><p>${HOME.useMore.text}</p><span class="use-link">${HOME.useMore.cta}${icon('arrow')}</span></a></div>
  </div>
</section>`;

  const blog = `<section class="blog">
  <div class="wrap">
    <div class="blog-head">${secHead({ eb: '블로그', title: HOME.blogTitle, sub: HOME.blogSub })}<div>${btn(c.url('support/') + '#guides', '가이드 전체 보기', { variant: 'outline' })}</div></div>
    <ul class="post-list">${POSTS.slice(0, 5).map(postRow).join('')}</ul>
  </div>
</section>`;

  return page(c, { title: '', desc: META.home, bodyClass: 'p-home', body: hero + feats + flow + price + uses + blog + ctaBand(c) });
}

/* ================= 기능 ================= */
export function features(c) {
  const secs = FEATURES.map((f, i) => `<section class="fsec${i % 2 ? ' rev' : ''}" id="${f.id}">
  <div class="wrap fsec-in">
    <div class="fsec-ui" data-reveal>${featureUI[f.id]()}</div>
    <div class="fsec-body">
      <span class="feat-ic">${icon(f.icon)}</span>
      <h2 data-reveal>${f.title}</h2>
      <p class="fsec-text" data-reveal style="--d:.06s">${f.text}</p>
      <ul class="fsec-list" data-reveal style="--d:.1s">${f.detail.map(d => `<li>${icon('check')}${d}</li>`).join('')}</ul>
    </div>
  </div>
</section>`).join('');
  const os = `<section class="os-table-sec">
  <div class="wrap">
    ${secHead({ eb: '지원 환경', title: '지원하는 운영체제' })}
    <div class="os-table" data-reveal>${BRAND.oses.map(o => `<div><b>${o}</b><span>${icon('check')}지원</span></div>`).join('')}</div>
    <p class="note"><span>운영체제와 요금제에 따라 세부 기능의 제공 범위가 다를 수 있습니다. 운영체제별 상세 기능표는 ${ph()}입니다.</span></p>
    <div class="ph-card" data-reveal>${icon('shield')}<div><b>보안·접속 기록 기능</b><p>접속 승인, 접속 기록, 권한 관리 등 보안 기능 상세는 ${BRAND.placeholder}입니다.</p></div></div>
  </div>
</section>`;
  return page(c, {
    title: '기능', desc: META.features, bodyClass: 'p-features',
    body: pageHero(c, { eb: '기능', title: ['고객 PC 지원부터', '무인기기 관리까지'], lede: '상담원은 웹 브라우저 하나로 고객을 지원하고, 등록한 기기에는 언제든 접속합니다.', crumb: '기능' }) + secs + os + ctaBand(c)
  });
}

/* ================= 요금 ================= */
export function pricing(c) {
  const body = `<section class="pricing">
  <div class="wrap">
    ${planCards(c)}
    <p class="note center">가격은 2026년 10월 13일 국내 가격표 기준이며 부가세 별도입니다. FREE 버전의 제공 범위와 다른 요금제는 ${BRAND.placeholder}입니다.</p>
  </div>
</section>
<section class="pricing-faq">
  <div class="wrap narrow">
    ${secHead({ eb: '요금 문의', title: '요금에 대해 자주 묻는 질문', center: true })}
    ${faqList([FAQ[2], FAQ[3], FAQ[4]])}
  </div>
</section>`;
  return page(c, {
    title: '요금', desc: META.pricing, bodyClass: 'p-pricing',
    body: pageHero(c, { eb: '요금', title: ['상담원 3명,', '1년 30만원'], lede: '상담원 수를 기준으로 요금이 정해집니다. 무료(FREE) 버전으로 먼저 써 볼 수 있습니다.', crumb: '요금' }) + body + ctaBand(c)
  });
}

/* ================= 사용 방법 ================= */
export function guide(c) {
  const steps = (arr, cls) => `<ol class="g-steps ${cls}">${arr.map((s, i) => `<li data-reveal style="--d:${i * 0.07}s"><span class="g-n">${pad2(i + 1)}</span><div>${s.who ? `<span class="flow-who ${s.who === '고객' ? 'cust' : ''}">${s.who}</span>` : ''}<h3>${s.title}</h3><p>${s.text}</p></div></li>`).join('')}</ol>`;
  const body = `<section class="gsec" id="quick">
  <div class="wrap gsec-in">
    <div class="gsec-head">${eyebrow('빠른 지원')}<h2 class="sec-title" data-reveal>고객 PC에 1:1로 연결하기</h2><p class="sec-sub">상담원은 브라우저에서 시작하고, 고객은 접속용 파일만 실행합니다.</p><div class="gsec-ui">${featureUI.web()}</div></div>
    ${steps(FLOW, '')}
  </div>
</section>
<section class="gsec alt" id="unattended">
  <div class="wrap gsec-in">
    <div class="gsec-head">${eyebrow('무인 접속')}<h2 class="sec-title" data-reveal>키오스크·공장 PC에 상시 접속하기</h2><p class="sec-sub">접속을 승인해 줄 사람이 없는 기기는 장애가 나기 전에 미리 준비해 둡니다.</p><div class="gsec-ui">${featureUI.unattended()}</div></div>
    ${steps(UNATTENDED, '')}
  </div>
</section>
<section class="gsec" id="download">
  <div class="wrap">
    ${secHead({ eb: '다운로드', title: '에이전트와 설치형 대시보드' })}
    <div class="dl-grid">
      <div class="dl-card" data-reveal>${icon('kiosk')}<b>기기용 에이전트</b><p>무인 접속할 기기에 설치합니다.</p>${ph('다운로드 링크: ' + BRAND.placeholder)}</div>
      <div class="dl-card" data-reveal style="--d:.06s">${icon('app')}<b>설치형 대시보드</b><p>브라우저 대신 설치형으로 쓰고 싶은 상담원용입니다.</p>${ph('다운로드 링크: ' + BRAND.placeholder)}</div>
      <div class="dl-card" data-reveal style="--d:.12s">${icon('doc')}<b>사용 설명서</b><p>처음 쓰는 상담원을 위한 안내서입니다.</p>${ph('설명서 파일: ' + BRAND.placeholder)}</div>
    </div>
  </div>
</section>`;
  return page(c, {
    title: '사용 방법', desc: META.guide, bodyClass: 'p-guide',
    body: pageHero(c, { eb: '사용 방법', title: ['처음 쓰는 날부터', '바로 지원합니다'], lede: '고객 PC 1:1 지원과 무인기기 상시접속, 두 가지 방법을 안내합니다.', crumb: '사용 방법' }) + body + ctaBand(c)
  });
}

/* ================= 고객지원 ================= */
export function support(c) {
  const count = k => POSTS.filter(p => p.cat === k).length;
  const body = `<section class="channels">
  <div class="wrap ch-grid">
    <a class="ch" href="${BRAND.phoneHref}" data-reveal>${icon('phone')}<b>전화 상담</b><span>${BRAND.phone}</span><small>운영 시간: ${BRAND.placeholder}</small></a>
    <a class="ch" href="${BRAND.kakao}" target="_blank" rel="noopener" data-reveal style="--d:.06s">${icon('chat')}<b>카카오톡 상담</b><span>채널에서 바로 문의</span><small>카카오톡 채널로 연결됩니다</small></a>
    <a class="ch" href="mailto:${BRAND.email}" data-reveal style="--d:.12s">${icon('mail')}<b>이메일</b><span>${BRAND.email}</span><small>도입·사용 문의</small></a>
  </div>
</section>
<section class="support-faq" id="faq">
  <div class="wrap narrow">
    ${secHead({ eb: '자주 묻는 질문', title: '궁금한 점을 먼저 확인하세요', center: true })}
    ${faqList(FAQ)}
  </div>
</section>
<section class="guides" id="guides">
  <div class="wrap">
    ${secHead({ eb: '블로그', title: '원격지원 가이드', sub: '도입 전 비교 기준, 업종별 활용 방법, 보안·운영 팁을 블로그에 정리하고 있습니다.' })}
    <div class="filter" role="group" aria-label="분류별로 보기" data-filter>
      <button type="button" aria-pressed="true" data-f="all">전체 <span>${POSTS.length}</span></button>
      ${Object.entries(CATS).map(([k, v]) => `<button type="button" aria-pressed="false" data-f="${k}">${v} <span>${count(k)}</span></button>`).join('')}
    </div>
    <p class="note">${icon('doc')}글을 누르면 공식 블로그로 이동합니다(글별 주소는 자료를 받으면 연결). 목록은 2026년 11월 9일 기준입니다.</p>
    <ul class="post-list" data-post-list>${POSTS.map(postRow).join('')}</ul>
  </div>
</section>`;
  return page(c, {
    title: '고객지원', desc: META.support, bodyClass: 'p-support',
    body: pageHero(c, { eb: '고객지원', title: ['막히는 부분은', '바로 물어보세요'], lede: '전화, 카카오톡, 이메일로 도입과 사용 문의를 받습니다.', crumb: '고객지원' }) + body
  });
}

/* ================= 도입 문의 ================= */
export function contact(c) {
  const req = '<em class="req" aria-hidden="true">*</em><span class="sr">필수</span>';
  const form = `<form class="qform" novalidate data-form data-errors="${esc(JSON.stringify(CONTACT.errors))}" data-sent="${esc(CONTACT.sent)}" data-prefilled="${esc(CONTACT.prefilled)}">
  <fieldset class="fset">
    <legend>문의 유형</legend>
    <div class="seg">${CONTACT.types.map(([v, l], i) => `<label><input type="radio" name="type" value="${v}"${i === 0 ? ' checked' : ''}><span>${l}</span></label>`).join('')}</div>
  </fieldset>
  <div class="fgrid">
    <div class="field"><label for="f-company">회사명${req}</label><input id="f-company" name="company" type="text" autocomplete="organization" required></div>
    <div class="field"><label for="f-name">담당자${req}</label><input id="f-name" name="name" type="text" autocomplete="name" required></div>
    <div class="field"><label for="f-phone">연락처</label><input id="f-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="02-000-0000"></div>
    <div class="field"><label for="f-email">이메일</label><input id="f-email" name="email" type="email" autocomplete="email"></div>
    <p class="hint span2" id="h-contact">연락처와 이메일 중 하나는 꼭 적어 주세요.</p>
    <div class="field"><label for="f-agents">예상 상담원 수</label><select id="f-agents" name="agents"><option value="">선택해 주세요</option><option>1~3명</option><option>4~10명</option><option>11명 이상</option><option>아직 모르겠어요</option></select></div>
    <div class="field"><span class="flabel" id="l-target">원격 대상</span><div class="checks" role="group" aria-labelledby="l-target">${CONTACT.targets.map(([v, l]) => `<label class="chk"><input type="checkbox" name="target" value="${v}"><span>${l}</span></label>`).join('')}</div></div>
    <div class="field span2"><span class="flabel" id="l-os">사용하는 운영체제</span><div class="checks" role="group" aria-labelledby="l-os">${BRAND.oses.map(o => `<label class="chk"><input type="checkbox" name="os" value="${o}"><span>${o}</span></label>`).join('')}</div></div>
  </div>
  <div class="field"><label for="f-message">문의 내용${req}</label><textarea id="f-message" name="message" rows="6" placeholder="지금 쓰는 원격지원 프로그램, 지원 대상, 궁금한 점을 적어 주세요." required></textarea></div>
  <div class="field consent">
    <label class="check"><input id="f-privacy" name="privacy" type="checkbox" required><span class="box" aria-hidden="true">${icon('check')}</span><span>개인정보 수집과 이용에 동의합니다${req}</span></label>
    <details class="privacy-more"><summary>내용 보기</summary><p>${CONTACT.privacyText}</p></details>
  </div>
  <button class="btn btn-primary btn-lg" type="submit"><span>문의 보내기</span>${icon('arrow')}</button>
</form>`;
  const aside = `<aside class="contact-aside">
  <div class="ca-card ca-main"><p>전화 상담</p><a href="${BRAND.phoneHref}">${icon('phone')}${BRAND.phone}</a><span>운영 시간: ${BRAND.placeholder}</span></div>
  <a class="ca-card ca-kakao" href="${BRAND.kakao}" target="_blank" rel="noopener">${icon('chat')}<div><b>카카오톡 상담</b><span>채널에서 바로 문의하기</span></div>${icon('external')}</a>
  <a class="ca-card ca-mail" href="mailto:${BRAND.email}">${icon('mail')}<div><b>이메일</b><span>${BRAND.email}</span></div></a>
  <div class="ca-card ca-free"><b>먼저 써 보고 싶다면</b><p>FREE 버전으로 바로 시작할 수 있습니다.</p>${btn(BRAND.site, HOME.start, { variant: 'outline', ext: true, cls: 'btn-sm' })}</div>
</aside>`;
  return page(c, {
    title: '도입 문의', desc: META.contact, bodyClass: 'p-contact',
    body: pageHero(c, { eb: '도입 문의', title: ['우리 회사에 맞는 구성,', '알려 드릴게요'], lede: '상담원 수와 원격 대상을 알려 주시면 확인 후 연락드립니다.', crumb: '도입 문의' }) + `<section class="contact"><div class="wrap contact-in">${form}${aside}</div></section>`
  });
}

/* ================= 없는 주소 ================= */
export function notFound(c) {
  return page(c, {
    title: '페이지를 찾을 수 없어요', desc: '주소가 바뀌었거나 없는 페이지입니다.', bodyClass: 'p-404',
    body: `<section class="page-hero nf"><div class="hero-grid" aria-hidden="true"></div><div class="wrap page-hero-in">
      <p class="nf-code">404</p>
      <h1 class="page-title">${lines(['연결할 수 없는', '페이지예요'])}</h1>
      <p class="page-lede">주소가 바뀌었거나 없는 페이지예요. 아래에서 다시 찾아 주세요.</p>
      <div class="hero-btns">${btn(c.url(''), '홈으로', { variant: 'primary' })}${btn(c.url('features/'), '기능 보기', { variant: 'outline' })}${btn(c.url('contact/'), '도입 문의', { variant: 'outline' })}</div>
    </div></section>`
  });
}
