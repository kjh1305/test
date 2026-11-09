/* 공감 행정사사무소 — 화면 동작 */
(function () {
  'use strict';
  window.__gg = true;
  var root = document.documentElement, body = document.body;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var CHECK_SVG = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>';

  var tasks = [], ticking = false;
  function tick() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { ticking = false; for (var i = 0; i < tasks.length; i++) tasks[i](); });
  }
  window.addEventListener('scroll', tick, { passive: true });
  window.addEventListener('resize', tick);

  /* 헤더: 어두운 구간 위에서는 흰 글씨 */
  var header = $('[data-header]'), darks = $$('[data-dark]');
  tasks.push(function () {
    var probe = header.offsetHeight / 2, onDark = false;
    for (var i = 0; i < darks.length; i++) {
      var r = darks[i].getBoundingClientRect();
      if (r.top <= probe && r.bottom > probe) { onDark = true; break; }
    }
    header.classList.toggle('on-dark', onDark && !body.classList.contains('menu-open'));
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  });

  /* 고정 상담 바: 첫 화면을 지나면 나타남 */
  var qb = $('[data-quickbar]');
  if (qb) tasks.push(function () { qb.classList.toggle('is-on', window.scrollY > Math.min(420, window.innerHeight * 0.5)); });

  /* 모바일 메뉴 */
  var menuBtn = $('[data-menu-btn]'), mnav = $('[data-mnav]');
  function setMenu(open) {
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    body.classList.toggle('menu-open', open);
    if (open) { mnav.hidden = false; requestAnimationFrame(function () { mnav.classList.add('is-open'); }); }
    else { mnav.classList.remove('is-open'); setTimeout(function () { if (!mnav.classList.contains('is-open')) mnav.hidden = true; }, 300); }
    tick();
  }
  if (menuBtn && mnav) {
    menuBtn.addEventListener('click', function () { setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'); });
    mnav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && body.classList.contains('menu-open')) { setMenu(false); menuBtn.focus(); } });
    var wide = window.matchMedia('(min-width: 1081px)');
    var onWide = function () { if (wide.matches && body.classList.contains('menu-open')) setMenu(false); };
    if (wide.addEventListener) wide.addEventListener('change', onWide); else if (wide.addListener) wide.addListener(onWide);
  }

  /* 첫 화면 서류: 한 장씩 앞으로 나와 항목이 채워지고 도장이 찍힘 */
  var docsBox = $('[data-docs]');
  var docTimer = null, docsVisible = true;
  if (docsBox) {
    var docs = $$('.doc', docsBox), tabs = $$('.docs-tabs li', docsBox), n = docs.length, active = 0;
    var write = function (d) { d.classList.remove('is-writing'); void d.offsetWidth; d.classList.add('is-writing'); };
    var setTabs = function () { tabs.forEach(function (t, i) { t.classList.toggle('on', i === active); }); };
    var advance = function () {
      var cur = docs[active];
      cur.classList.add('is-out');
      setTimeout(function () {
        active = (active + 1) % n;
        cur.classList.add('jump');
        cur.classList.remove('is-out', 'is-writing');
        docs.forEach(function (d, i) { d.setAttribute('data-k', String((i - active + n) % n)); });
        void cur.offsetWidth;
        cur.classList.remove('jump');
        write(docs[active]);
        setTabs();
      }, 480);
    };
    var loop = function () {
      clearTimeout(docTimer);
      docTimer = setTimeout(function () {
        if (docsVisible && !document.hidden) advance();
        loop();
      }, 4600);
    };
    docsBox.__start = function () { if (reduce) return; write(docs[0]); loop(); };
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { docsVisible = es[0].isIntersecting; }).observe(docsBox);
  }

  /* 나타나는 효과 */
  function initReveal() {
    var els = $$('[data-reveal]');
    if (reduce || !('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('is-in'); }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (!e.isIntersecting) return; e.target.classList.add('is-in'); io.unobserve(e.target); });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  var started = false;
  function start() {
    if (started) return;
    started = true;
    requestAnimationFrame(function () {
      root.classList.add('is-ready');
      initReveal();
      if (docsBox) docsBox.__start();
      tick();
    });
  }
  if (document.fonts && document.fonts.ready) Promise.race([document.fonts.ready, new Promise(function (r) { setTimeout(r, 900); })]).then(start, start);
  else start();

  /* 상담 원칙 문구: 스크롤에 맞춰 진해짐 */
  var quote = $('[data-statement] .quote-q');
  if (quote) {
    var words = $$('.w', quote);
    if (reduce) words.forEach(function (w) { w.classList.add('on'); });
    else tasks.push(function () {
      var r = quote.getBoundingClientRect(), vh = window.innerHeight;
      var p = Math.max(0, Math.min(1, (vh * 0.86 - r.top) / (vh * 0.48)));
      var k = Math.round(p * words.length);
      for (var i = 0; i < words.length; i++) words[i].classList.toggle('on', i < k);
    });
  }

  /* 업무 분야: 지금 보고 있는 분야 표시 */
  var pnav = $('[data-pnav]');
  if (pnav) {
    var plinks = $$('[data-spy-link]', pnav), list = $('ul', pnav), current = -1;
    var psecs = plinks.map(function (a) { return document.getElementById(a.getAttribute('data-spy-link')); });
    tasks.push(function () {
      var mark = header.offsetHeight + pnav.offsetHeight + window.innerHeight * 0.25, cur = -1;
      for (var i = 0; i < psecs.length; i++) if (psecs[i] && psecs[i].getBoundingClientRect().top <= mark) cur = i;
      if (cur === current) return;
      current = cur;
      plinks.forEach(function (a, i) {
        a.classList.toggle('is-active', i === cur);
        if (i === cur) {
          a.setAttribute('aria-current', 'true');
          if (list.scrollWidth > list.clientWidth) list.scrollTo({ left: a.offsetLeft - list.clientWidth / 2 + a.offsetWidth / 2, behavior: reduce ? 'auto' : 'smooth' });
        } else a.removeAttribute('aria-current');
      });
    });
  }

  /* 칼럼: 분야별로 보기 */
  var filter = $('[data-filter]'), colList = $('[data-col-list]');
  if (filter && colList) {
    var btns = $$('button', filter), items = $$('li', colList);
    filter.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      var f = b.getAttribute('data-f');
      btns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      items.forEach(function (li) { li.hidden = !(f === 'all' || li.getAttribute('data-cat') === f); });
    });
  }

  /* 상담 신청 폼 */
  var form = $('[data-form]');
  if (form) {
    var errs = {};
    try { errs = JSON.parse(form.getAttribute('data-errors')); } catch (e) { /* 기본 메시지 없음 */ }
    var toast = $('[data-toast]'), toastTimer;
    var showToast = function (msg) {
      toast.textContent = msg; toast.classList.add('is-on');
      clearTimeout(toastTimer); toastTimer = setTimeout(function () { toast.classList.remove('is-on'); }, 6000);
    };
    var F = { name: $('#f-name', form), phone: $('#f-phone', form), email: $('#f-email', form), message: $('#f-message', form), privacy: $('#f-privacy', form) };
    var setErr = function (el, msg) {
      var id = el.id + '-err', p = document.getElementById(id);
      if (msg) {
        if (!p) { p = document.createElement('p'); p.className = 'err'; p.id = id; el.closest('.field').appendChild(p); }
        p.textContent = msg; el.setAttribute('aria-invalid', 'true'); el.setAttribute('aria-describedby', id);
      } else {
        if (p) p.parentNode.removeChild(p);
        el.removeAttribute('aria-invalid'); el.removeAttribute('aria-describedby');
      }
    };
    var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var PHONE = /[0-9]{2,}.*[0-9]{3,}/;
    var checks = {
      name: function () { var ok = !!F.name.value.trim(); setErr(F.name, ok ? '' : errs.name); return ok; },
      phone: function () { var ok = PHONE.test(F.phone.value); setErr(F.phone, ok ? '' : errs.phone); return ok; },
      email: function () { var v = F.email.value.trim(), ok = !v || EMAIL.test(v); setErr(F.email, ok ? '' : errs.email); return ok; },
      message: function () { var ok = !!F.message.value.trim(); setErr(F.message, ok ? '' : errs.message); return ok; },
      privacy: function () { var ok = F.privacy.checked; setErr(F.privacy, ok ? '' : errs.privacy); return ok; }
    };
    Object.keys(F).forEach(function (k) {
      var el = F[k], ev = el.type === 'checkbox' ? 'change' : 'input';
      el.addEventListener(ev, function () { if (el.getAttribute('aria-invalid')) checks[k](); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var first = null;
      ['name', 'phone', 'email', 'message', 'privacy'].forEach(function (k) { if (!checks[k]() && !first) first = F[k]; });
      if (first) { first.focus(); return; }
      showToast(form.getAttribute('data-sent'));
      form.reset();
      var note = $('.prefill-note', form); if (note) note.parentNode.removeChild(note);
    });
    /* ?area=visa 처럼 넘어오면 분야를 미리 고릅니다 */
    var area = new URLSearchParams(window.location.search).get('area');
    if (area && /^[a-z]+$/.test(area)) {
      var radio = form.querySelector('input[name="area"][value="' + area + '"]');
      if (radio) {
        radio.checked = true;
        var n2 = document.createElement('p');
        n2.className = 'prefill-note'; n2.innerHTML = CHECK_SVG;
        n2.appendChild(document.createTextNode(form.getAttribute('data-prefilled')));
        form.insertBefore(n2, form.firstChild);
      }
    }
  }

  tick();
})();
