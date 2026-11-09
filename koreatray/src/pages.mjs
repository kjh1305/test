/* =========================================================
   페이지 본문: 홈, 회사소개, 제품소개, 생산·품질, 문의, 없는 주소
   ========================================================= */
import { LANGS, CO, UI, HOME, ABOUT, PRODUCTS, PRODUCT_LABELS, QUALITY, CONTACT, CATEGORIES, BRANDS, WHY, PROCESS, BLOG, META, NOTFOUND, EB } from './content.mjs';
import { productArt, glueDiagram, STEP_ART, icon } from './art.mjs';
import { page, pageHero, ctaBand, foldTray, btn, lines, eyebrow, secHead, esc } from './layout.mjs';

const CODE = { ko: 'KO', en: 'EN', ja: 'JA', vi: 'VI', th: 'TH' };
const pad2 = n => String(n).padStart(2, '0');
const WHY_ICON = { onestop: 'factory', structure: 'structure', uniform: 'uniform', nofile: 'nofile' };
const plain = s => s.replace(/\|/g, '');

/* 단어(또는 구) 단위로 나눠 스크롤에 맞춰 진해지게 합니다. 일본어·태국어는 | 로 끊은 구 단위 */
function inkWords(text) {
  const parts = text.includes('|') ? text.split('|') : text.split(' ').map((w, i, a) => (i < a.length - 1 ? w + ' ' : w));
  return parts.map(w => `<span class="w">${w}</span>`).join('');
}

function whyList(c) {
  return `<ul class="why-grid">${WHY.items.map((w, i) => `<li data-reveal style="--d:${i * 0.07}s"><span class="why-ic">${icon(WHY_ICON[w.icon])}</span><h3>${c.tr(w.title)}</h3><p>${c.tr(w.text)}</p></li>`).join('')}</ul>`;
}

/* ================= 홈 ================= */
export function home(c) {
  const tr = c.tr;
  const hero = `<section class="hero mat" data-dark>
  <div class="mat-grid" aria-hidden="true"></div>
  <div class="wrap hero-in">
    <div class="hero-text">
      ${eyebrow(tr(HOME.eyebrow), 'on-dark')}
      <h1 class="hero-title" data-reveal>${lines(tr(HOME.heroTitle))}</h1>
      <p class="hero-lede" data-reveal style="--d:.12s">${tr(HOME.heroLede)}</p>
      <div class="hero-btns" data-reveal style="--d:.2s">
        ${btn(c.url('contact/'), tr(UI.quote), { variant: 'kraft' })}
        ${btn(c.url('products/'), tr(HOME.viewProducts), { variant: 'ghost-light' })}
      </div>
    </div>
    <div class="hero-art">${foldTray(c)}</div>
  </div>
  <a class="hero-scroll" href="#brands"><span>${tr(HOME.scroll)}</span><i aria-hidden="true"></i></a>
  <div class="ruler" aria-hidden="true"></div>
</section>`;

  const brands = `<section class="brands" id="brands">
  <div class="wrap brands-in">
    <div class="brands-head">
      ${eyebrow(tr(HOME.brandsTitle))}
      <p class="brands-sub" data-reveal>${tr(HOME.brandsSub)}</p>
    </div>
    <ul class="brand-grid">${BRANDS.map((b, i) => `<li data-reveal style="--d:${i * 0.06}s"><b>${tr(b.name)}</b><span>${tr(b.note)}</span></li>`).join('')}</ul>
  </div>
</section>`;

  const statement = `<section class="statement" data-statement>
  <div class="wrap statement-in">
    ${eyebrow(tr(EB.statement))}
    <blockquote class="statement-q"><p>${inkWords(tr(HOME.statement))}</p></blockquote>
    <p class="statement-sub" data-reveal>${tr(HOME.statementSub)}</p>
  </div>
</section>`;

  const products = `<section class="home-products">
  <div class="wrap">
    ${secHead({ eb: tr(UI.nav.products), title: tr(HOME.productsTitle), sub: tr(HOME.productsSub) })}
    <div class="pgrid">${CATEGORIES.map((p, i) => `<a class="pcard${i < 2 ? ' pcard-lg' : ''}" href="${c.url('products/')}#${p.id}" data-reveal style="--d:${(i < 2 ? i : i - 2) * 0.07}s">
      <div class="pcard-art">${productArt(p.art)}</div>
      <div class="pcard-body">
        <p class="pcard-tag">${tr(p.structure)}</p>
        <h3>${tr(p.name)}</h3>
        <p>${tr(p.short)}</p>
        <span class="pcard-more">${tr(UI.learnMore)}${icon('arrow')}</span>
      </div>
    </a>`).join('')}</div>
    <div class="sec-foot">${btn(c.url('products/'), tr(HOME.allProducts), { variant: 'outline' })}</div>
  </div>
</section>`;

  const cells = Array.from({ length: 120 }, (_, i) => `<i style="--w:${Math.floor(i / 12) + (i % 12)}"></i>`).join('');
  const dec = tr(HOME.bigDecimals);
  const shown = new Intl.NumberFormat(c.lang, { minimumFractionDigits: dec, maximumFractionDigits: dec }).format(Number(tr(HOME.bigNumber)));
  const bignum = `<section class="bignum mat" data-dark data-bignum>
  <div class="mat-grid" aria-hidden="true"></div>
  <div class="wrap bignum-in">
    <div class="bignum-text">
      ${eyebrow(tr(EB.record), 'on-dark')}
      <p class="bignum-fig" data-reveal><b data-count="${tr(HOME.bigNumber)}" data-dec="${dec}">${shown}</b><span>${tr(HOME.bigUnit)}</span></p>
      <p class="bignum-label" data-reveal style="--d:.06s">${tr(HOME.bigLabel)}</p>
      <blockquote class="bignum-quote" data-reveal style="--d:.12s"><p>${tr(HOME.bigQuote)}</p></blockquote>
      <div data-reveal style="--d:.18s">${btn(c.url('quality/'), tr(HOME.processLink), { variant: 'ghost-light' })}</div>
    </div>
    <figure class="units" aria-hidden="true">
      <div class="units-grid">${cells}</div>
      <figcaption><i></i>${tr(HOME.gridUnit)}</figcaption>
    </figure>
  </div>
</section>`;

  const process = `<section class="home-process">
  <div class="wrap">
    ${secHead({ eb: tr(EB.process), title: tr(PROCESS.title), sub: tr(PROCESS.sub) })}
    <ol class="ptl" data-reveal>${PROCESS.steps.map((s, i) => `<li style="--i:${i}"><span class="ptl-ic">${icon(s.icon)}</span><span class="ptl-n">${pad2(i + 1)}</span><b>${tr(s.title)}</b></li>`).join('')}</ol>
    <div class="sec-foot">${btn(c.url('quality/'), tr(HOME.processLink), { variant: 'outline' })}</div>
  </div>
</section>`;

  const why = `<section class="why">
  <div class="wrap">
    ${secHead({ eb: tr(EB.why), title: tr(WHY.title) })}
    ${whyList(c)}
  </div>
</section>`;

  const four = `<section class="four">
  <div class="wrap">
    <div class="four-card">
      <div class="four-head">
        ${eyebrow(tr(EB.start))}
        <h2 class="sec-title" data-reveal>${lines(tr(HOME.fourTitle))}</h2>
        <p class="sec-sub" data-reveal style="--d:.08s">${tr(HOME.fourSub)}</p>
      </div>
      <ol class="four-list">${HOME.four.map((f, i) => `<li data-reveal style="--d:${i * 0.07}s"><span class="four-n">${i + 1}</span><span class="four-ic">${icon(f.icon)}</span><b>${tr(f.title)}</b><span class="four-q">${tr(f.text)}</span></li>`).join('')}</ol>
      <div class="four-cta" data-reveal>${btn(c.url('contact/'), tr(HOME.fourCta), { variant: 'primary' })}</div>
    </div>
  </div>
</section>`;

  const blog = `<section class="blog">
  <div class="wrap blog-in">
    <div class="blog-head">
      ${secHead({ eb: tr(UI.labels.blog), title: tr(BLOG.title), sub: tr(BLOG.sub) })}
      ${c.lang !== 'ko' ? `<p class="blog-note">${tr(BLOG.koNote)}</p>` : ''}
      ${btn(CO.blog, tr(BLOG.more), { variant: 'outline', ext: true })}
    </div>
    <ul class="blog-list">${BLOG.posts.map((p, i) => `<li data-reveal style="--d:${i * 0.06}s"><a href="${CO.blog}" target="_blank" rel="noopener">
      <span class="blog-meta"><time datetime="${p.date}">${p.date.replace(/-/g, '.')}</time><span class="blog-cat">${tr(BLOG.cats[p.cat])}</span></span>
      <b>${tr(p.title)}</b>${icon('external')}
    </a></li>`).join('')}</ul>
  </div>
</section>`;

  const global = `<section class="global">
  <div class="wrap global-in">
    <div class="global-text">
      ${eyebrow(tr(EB.global))}
      <h2 class="sec-title" data-reveal>${tr(HOME.globalTitle)}</h2>
      <p class="sec-sub" data-reveal style="--d:.08s">${tr(HOME.globalText)}</p>
    </div>
    <div class="global-side" data-reveal style="--d:.12s">
      <ul class="global-langs">${LANGS.map(l => `<li><a href="${c.url('', l.code)}" hreflang="${l.html}" lang="${l.html}" data-lang-link="${l.code}"${l.code === c.lang ? ' aria-current="true"' : ''}><b>${l.name}</b><small>${CODE[l.code]}</small></a></li>`).join('')}</ul>
      <a class="global-mail" href="mailto:${CO.email}">${icon('mail')}<span>${CO.email}</span></a>
    </div>
  </div>
</section>`;

  return page(c, {
    title: '', desc: tr(META.home), bodyClass: 'p-home',
    body: hero + brands + statement + products + bignum + process + why + four + blog + global + ctaBand(c)
  });
}

/* ================= 회사소개 ================= */
export function about(c) {
  const tr = c.tr, Lb = UI.labels;
  const msg = tr(ABOUT.message);
  const message = `<section class="msg">
  <div class="wrap msg-in">
    <div class="msg-side">
      ${eyebrow(tr(ABOUT.messageTitle))}
      <h2 class="sec-title msg-title" data-reveal>${plain(tr(HOME.statement))}</h2>
      <p class="draft-badge">${icon('doc')}${tr(ABOUT.messageDraft)}</p>
    </div>
    <div class="msg-body" data-reveal style="--d:.08s">
      ${msg.map(p => `<p>${p}</p>`).join('')}
      <p class="msg-sign">${tr(ABOUT.signature)}</p>
    </div>
  </div>
</section>`;

  const rows = [
    [Lb.company, `${tr(CO.legal)}${c.lang !== 'en' ? ` <small lang="en">Korea Tray Co., Ltd.</small>` : ''}`],
    [Lb.ceo, tr(CO.ceo)],
    [Lb.products, CATEGORIES.map(p => tr(p.name)).join(', ')],
    [Lb.clients, BRANDS.map(b => tr(b.name)).join(', ')],
    [Lb.factory, `${tr(CO.factory)}${c.lang !== 'ko' ? ` <small lang="ko">${CO.factoryKo}</small>` : ''}`],
    [Lb.seoul, `${tr(CO.seoul)}${c.lang !== 'ko' ? ` <small lang="ko">${CO.seoulKo}</small>` : ''}`],
    [Lb.tel, `<a href="${CO.telHref}">${tr(CO.tel)}</a>`],
    [Lb.mobile, `<a href="${CO.mobileHref}">${tr(CO.mobile)}</a>`],
    [Lb.email, `<a href="mailto:${CO.email}">${CO.email}</a>`],
    [Lb.blog, `<a href="${CO.blog}" target="_blank" rel="noopener">${tr(CO.blogName)}${icon('external')}</a>`]
  ];
  const overview = `<section class="overview">
  <div class="wrap ov-in">
    ${secHead({ eb: tr(UI.nav.about), title: tr(ABOUT.overviewTitle) })}
    <dl class="ov-table" data-reveal>${rows.map(([k, v]) => `<div><dt>${tr(k)}</dt><dd>${v}</dd></div>`).join('')}</dl>
  </div>
</section>`;

  const records = `<section class="records">
  <div class="wrap rec-in">
    <article class="rec" data-reveal>
      <h2 class="rec-title">${tr(ABOUT.historyTitle)}</h2>
      <ol class="rec-history">${[0, 1, 2].map(() => `<li><span class="sk sk-year"></span><span class="sk sk-line"></span></li>`).join('')}</ol>
      <p class="ph-note">${icon('doc')}${tr(ABOUT.historyNote)}</p>
    </article>
    <article class="rec" data-reveal style="--d:.08s">
      <h2 class="rec-title">${tr(ABOUT.certTitle)}</h2>
      <ul class="rec-certs">${[0, 1, 2].map(() => `<li>${icon('ribbon')}</li>`).join('')}</ul>
      <p class="ph-note">${icon('doc')}${tr(ABOUT.certNote)}</p>
    </article>
  </div>
</section>`;

  const why = `<section class="why why-about">
  <div class="wrap">
    ${secHead({ eb: tr(EB.why), title: tr(WHY.title) })}
    ${whyList(c)}
  </div>
</section>`;

  const loc = (kind, ko, local) => {
    const q = encodeURIComponent(ko);
    return `<article class="loc" data-reveal>
      <div class="loc-map"><iframe title="${esc(tr(UI.labels[kind]))}: ${esc(tr(local))}" src="https://www.google.com/maps?q=${q}&amp;hl=${c.lang}&amp;z=16&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
      <div class="loc-body">
        <p class="loc-kind">${icon('pin')}${tr(UI.labels[kind])}</p>
        <h3>${tr(local)}</h3>
        ${c.lang !== 'ko' ? `<p class="loc-ko" lang="ko">${ko}</p>` : ''}
        <p class="loc-tel">${icon('phone')}<a href="${CO.telHref}">${tr(CO.tel)}</a></p>
        <div class="loc-btns">
          <a href="https://www.google.com/maps/search/?api=1&amp;query=${q}" target="_blank" rel="noopener">${tr(UI.openMaps)}${icon('external')}</a>
          <a href="https://map.naver.com/p/search/${q}" target="_blank" rel="noopener" lang="ko">${UI.naverMap}${icon('external')}</a>
        </div>
      </div>
    </article>`;
  };
  const locations = `<section class="locs" id="location">
  <div class="wrap">
    ${secHead({ eb: tr(UI.viewMap), title: tr(ABOUT.locationsTitle) })}
    <div class="loc-grid">${loc('factory', CO.factoryKo, CO.factory)}${loc('seoul', CO.seoulKo, CO.seoul)}</div>
  </div>
</section>`;

  return page(c, {
    title: tr(UI.nav.about), desc: tr(META.about), bodyClass: 'p-about',
    body: pageHero(c, { eb: tr(UI.nav.about), title: tr(ABOUT.heroTitle), lede: tr(ABOUT.heroLede), crumb: tr(UI.nav.about) }) + message + overview + why + records + locations + ctaBand(c)
  });
}

/* ================= 제품소개 ================= */
export function products(c) {
  const tr = c.tr;
  const pnav = `<nav class="pnav" data-pnav aria-label="${esc(tr(UI.nav.products))}"><div class="wrap"><ul>${CATEGORIES.map((p, i) => `<li><a href="#${p.id}" data-spy-link="${p.id}"><span>${pad2(i + 1)}</span>${tr(p.name)}</a></li>`).join('')}</ul></div></nav>`;
  const details = CATEGORIES.map((p, i) => `<section class="pdetail${i % 2 ? ' rev' : ''}" id="${p.id}" data-spy>
  <div class="wrap pdetail-in">
    <div class="pdetail-art" data-reveal>${productArt(p.art, esc(tr(p.name)))}</div>
    <div class="pdetail-body">
      <p class="pdetail-n">${pad2(i + 1)} <span>/ ${pad2(CATEGORIES.length)}</span></p>
      <h2 class="pdetail-title" data-reveal>${tr(p.name)}</h2>
      <p class="pdetail-lead" data-reveal style="--d:.06s">${tr(p.short)}</p>
      <p class="pdetail-text" data-reveal style="--d:.1s">${tr(p.long)}</p>
      <dl class="pspec" data-reveal style="--d:.14s">
        <div><dt>${tr(PRODUCT_LABELS.usedFor)}</dt><dd><ul class="chips">${tr(p.uses).map(u => `<li>${u}</li>`).join('')}</ul></dd></div>
        ${p.brands.length ? `<div><dt>${tr(PRODUCT_LABELS.suppliedTo)}</dt><dd>${p.brands.map(b => tr(BRANDS[b].name)).join(', ')}</dd></div>` : ''}
        <div><dt>${tr(PRODUCT_LABELS.structure)}</dt><dd>${tr(p.structure)}</dd></div>
        <div><dt>${tr(PRODUCT_LABELS.spec)}</dt><dd class="ph">${tr(PRODUCT_LABELS.specValue)}</dd></div>
      </dl>
      <div class="pdetail-cta" data-reveal style="--d:.18s">${btn(c.url('contact/') + '?product=' + p.id, tr(UI.quote), { variant: 'primary' })}</div>
    </div>
  </div>
</section>`).join('');

  const glue = `<section class="glue">
  <div class="wrap">
    ${secHead({ eb: tr(EB.compare), title: tr(PRODUCTS.glueTitle), sub: tr(PRODUCTS.glueSub) })}
    <div class="glue-grid">${PRODUCTS.glue.map((g, i) => `<article class="glue-card" data-reveal style="--d:${i * 0.08}s">
      <div class="glue-art">${glueDiagram(g.kind, esc(tr(g.name)))}<span class="glue-count"><b>${g.kind}</b></span></div>
      <h3>${tr(g.name)}</h3>
      <dl><div><dt>${tr(PRODUCTS.howLabel)}</dt><dd>${tr(g.how)}</dd></div><div><dt>${tr(PRODUCTS.bestLabel)}</dt><dd>${tr(g.best)}</dd></div></dl>
    </article>`).join('')}</div>
  </div>
</section>`;

  const ex = tr(PRODUCTS.thickExamples), ends = tr(PRODUCTS.thickScale);
  const thick = `<section class="thick">
  <div class="wrap thick-in">
    <div class="thick-text">
      ${eyebrow(tr(EB.thickness))}
      <h2 class="sec-title" data-reveal>${tr(PRODUCTS.thickTitle)}</h2>
      <p class="sec-sub" data-reveal style="--d:.08s">${tr(PRODUCTS.thickText)}</p>
    </div>
    <div class="thick-scale" data-reveal style="--d:.12s">
      <ol class="thick-steps">${ex.map((e, i) => `<li style="--i:${i}"><span class="thick-sheet" aria-hidden="true">${'<i></i>'.repeat(i + 1)}</span><b>${e}</b></li>`).join('')}</ol>
      <div class="thick-axis" aria-hidden="true"><span>${ends[0]}</span><i></i><span>${ends[1]}</span></div>
    </div>
  </div>
</section>`;

  return page(c, {
    title: tr(UI.nav.products), desc: tr(META.products), bodyClass: 'p-products',
    body: pageHero(c, { eb: tr(UI.nav.products), title: tr(PRODUCTS.heroTitle), lede: tr(PRODUCTS.heroLede), crumb: tr(UI.nav.products) }) + pnav + details + glue + thick + ctaBand(c)
  });
}

/* ================= 생산·품질 ================= */
export function quality(c) {
  const tr = c.tr, n = PROCESS.steps.length;
  const scrolly = `<section class="scrolly" data-scrolly>
  <div class="wrap scrolly-in">
    <div class="scrolly-art" aria-hidden="true">
      <div class="scrolly-frame">
        ${STEP_ART.map((f, i) => `<div class="sa${i === 0 ? ' on' : ''}" data-sa="${i}">${f()}</div>`).join('')}
        <p class="scrolly-count"><b data-sa-n>01</b><span>/ ${pad2(n)}</span></p>
        <div class="scrolly-bar"><i data-sa-bar></i></div>
      </div>
    </div>
    <div class="scrolly-steps">
      ${secHead({ eb: tr(EB.process), title: tr(PROCESS.title), sub: tr(PROCESS.sub) })}
      <ol class="steps">${PROCESS.steps.map((s, i) => `<li class="step${i === 0 ? ' on' : ''}" data-step="${i}">
        <div class="step-art" aria-hidden="true">${STEP_ART[i]()}</div>
        <span class="step-ic">${icon(s.icon)}</span>
        <div class="step-body"><p class="step-n">STEP ${pad2(i + 1)}</p><h3>${tr(s.title)}</h3><p>${tr(s.text)}</p></div>
      </li>`).join('')}</ol>
    </div>
  </div>
</section>`;

  const points = `<section class="qpoints">
  <div class="wrap">
    ${secHead({ eb: tr(EB.quality), title: tr(QUALITY.pointsTitle) })}
    <ol class="qp-grid">${QUALITY.points.map((p, i) => `<li data-reveal style="--d:${i * 0.08}s"><span class="qp-n">${pad2(i + 1)}</span><h3>${tr(p.title)}</h3><p>${tr(p.text)}</p></li>`).join('')}</ol>
  </div>
</section>`;

  const photos = `<section class="photos">
  <div class="wrap">
    ${secHead({ eb: tr(EB.factory), title: tr(QUALITY.factoryTitle) })}
    <ul class="photo-grid">${tr(QUALITY.photoSlots).map((s, i) => `<li data-reveal style="--d:${i * 0.08}s"><div class="photo-ph">${icon('camera')}<span>${tr(QUALITY.photoNote)}</span></div><p>${s}</p></li>`).join('')}</ul>
  </div>
</section>`;

  return page(c, {
    title: tr(UI.nav.quality), desc: tr(META.quality), bodyClass: 'p-quality',
    body: pageHero(c, { eb: tr(UI.nav.quality), title: tr(QUALITY.heroTitle), lede: tr(QUALITY.heroLede), crumb: tr(UI.nav.quality) }) + scrolly + points + photos + ctaBand(c)
  });
}

/* ================= 문의 ================= */
export function contact(c) {
  const tr = c.tr, F = CONTACT.f;
  const req = `<em class="req" aria-hidden="true">*</em><span class="sr">${tr(F.required)}</span>`;
  const countries = tr(F.countries), defC = tr(F.defaultCountry);
  const errors = {}; Object.keys(CONTACT.errors).forEach(k => { errors[k] = tr(CONTACT.errors[k]); });
  const types = tr(F.types), prints = tr(F.printOpts);
  const form = `<form class="qform" novalidate data-form data-errors="${esc(JSON.stringify(errors))}" data-sent="${esc(tr(CONTACT.sent))}" data-prefilled="${esc(tr(CONTACT.prefilled))}">
  <fieldset class="fset">
    <legend>${tr(F.type)}</legend>
    <div class="seg">${types.map((v, i) => `<label><input type="radio" name="type" value="${['quote', 'sample', 'other'][i]}"${i === 0 ? ' checked' : ''}><span>${v}</span></label>`).join('')}</div>
  </fieldset>
  <div class="fgrid">
    <div class="field"><label for="f-company">${tr(F.company)}${req}</label><input id="f-company" name="company" type="text" autocomplete="organization" required></div>
    <div class="field"><label for="f-name">${tr(F.name)}${req}</label><input id="f-name" name="name" type="text" autocomplete="name" required></div>
    <div class="field"><label for="f-country">${tr(F.country)}</label><select id="f-country" name="country">${defC === -1 ? `<option value="" selected>${tr(F.select)}</option>` : ''}${countries.map((v, i) => `<option${i === defC ? ' selected' : ''}>${v}</option>`).join('')}</select></div>
    <div class="field"><label for="f-phone">${tr(F.phone)}</label><input id="f-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel"></div>
    <div class="field span2"><label for="f-email">${tr(F.email)}</label><input id="f-email" name="email" type="email" autocomplete="email"><p class="hint" id="h-contact">${tr(F.contactHint)}</p></div>
  </div>
  <fieldset class="fset four-set">
    <legend>${tr(HOME.fourTitle)}</legend>
    <div class="fgrid">
      <div class="field"><label for="f-product">${tr(F.product)}</label><select id="f-product" name="product"><option value="">${tr(F.select)}</option>${CATEGORIES.map(p => `<option value="${p.id}">${tr(p.name)}</option>`).join('')}<option value="unsure">${tr(F.notSure)}</option></select></div>
      <div class="field"><label for="f-size">${tr(F.size)}</label><input id="f-size" name="size" type="text" placeholder="${esc(tr(F.sizeHint))}"></div>
      <div class="field"><label for="f-usage">${tr(F.usage)}</label><input id="f-usage" name="usage" type="text" placeholder="${esc(tr(F.usageHint))}"></div>
      <div class="field"><span class="flabel" id="l-print">${tr(F.printing)}</span><div class="seg seg-sm" role="radiogroup" aria-labelledby="l-print">${prints.map((v, i) => `<label><input type="radio" name="printing" value="${['yes', 'no', 'unsure'][i]}"${i === 2 ? ' checked' : ''}><span>${v}</span></label>`).join('')}</div></div>
    </div>
  </fieldset>
  <div class="field"><label for="f-message">${tr(F.message)}${req}</label><textarea id="f-message" name="message" rows="5" placeholder="${esc(tr(F.messageHint))}" required></textarea><p class="hint">${tr(F.photoNote)} <a href="mailto:${CO.email}">${CO.email}</a></p></div>
  <div class="field consent">
    <label class="check"><input id="f-privacy" name="privacy" type="checkbox" required><span class="box" aria-hidden="true">${icon('check')}</span><span>${tr(F.privacy)}${req}</span></label>
    <details class="privacy-more"><summary>${tr(F.privacyMore)}</summary><p>${tr(F.privacyText)}</p></details>
  </div>
  <button class="btn btn-primary btn-lg" type="submit"><span>${tr(F.submit)}</span>${icon('arrow')}</button>
</form>`;

  const aside = `<aside class="contact-aside">
  <div class="ca-card">
    <h2>${tr(CONTACT.direct)}</h2>
    <ul class="ca-list">
      <li><a href="${CO.telHref}">${icon('phone')}<span><small>${tr(UI.labels.tel)}</small>${tr(CO.tel)}</span></a></li>
      <li><a href="${CO.mobileHref}">${icon('phone')}<span><small>${tr(UI.labels.mobile)}</small>${tr(CO.mobile)}</span></a></li>
      <li><a href="mailto:${CO.email}">${icon('mail')}<span><small>${tr(UI.labels.email)}</small>${CO.email}</span></a></li>
      <li><a href="${CO.blog}" target="_blank" rel="noopener">${icon('blog')}<span><small>${tr(UI.labels.blog)}</small>${tr(CO.blogName)}</span></a></li>
    </ul>
  </div>
  <div class="ca-card ca-addr">
    <p><b>${tr(UI.labels.factory)}</b>${tr(CO.factory)}${c.lang !== 'ko' ? `<small lang="ko">${CO.factoryKo}</small>` : ''}</p>
    <p><b>${tr(UI.labels.seoul)}</b>${tr(CO.seoul)}${c.lang !== 'ko' ? `<small lang="ko">${CO.seoulKo}</small>` : ''}</p>
    <a class="ca-map" href="${c.url('about/')}#location">${icon('pin')}${tr(UI.viewMap)}${icon('arrow')}</a>
  </div>
</aside>`;

  return page(c, {
    title: tr(UI.nav.contact), desc: tr(META.contact), bodyClass: 'p-contact',
    body: pageHero(c, { eb: tr(UI.nav.contact), title: tr(CONTACT.heroTitle), lede: tr(CONTACT.heroLede), crumb: tr(UI.nav.contact) }) +
      `<section class="contact"><div class="wrap contact-in">${form}${aside}</div></section>`
  });
}

/* ================= 없는 주소 ================= */
export function notFound(c) {
  const tr = c.tr;
  return page(c, {
    title: tr(NOTFOUND.title), desc: tr(NOTFOUND.text), bodyClass: 'p-404',
    body: `<section class="nf mat" data-dark><div class="mat-grid" aria-hidden="true"></div><div class="wrap nf-in">
      <p class="nf-code">404</p>
      <h1 class="page-title">${tr(NOTFOUND.title)}</h1>
      <p class="page-lede">${tr(NOTFOUND.text)}</p>
      <div class="hero-btns">${btn(c.url(''), tr(NOTFOUND.home), { variant: 'kraft' })}${btn(c.url('products/'), tr(UI.nav.products), { variant: 'ghost-light' })}${btn(c.url('contact/'), tr(UI.nav.contact), { variant: 'ghost-light' })}</div>
    </div></section>`
  });
}
