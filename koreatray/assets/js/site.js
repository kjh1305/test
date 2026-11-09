/* 글로벌 코리아트레이 — 화면 동작 */
(function () {
  'use strict';
  window.__kt = true;
  var root = document.documentElement;
  var body = document.body;
  var lang = body.getAttribute('data-lang') || 'ko';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var store = {
    get: function (k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { window.localStorage.setItem(k, v); } catch (e) { /* 저장 불가 환경은 무시 */ } }
  };
  var CLOSE_SVG = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  var CHECK_SVG = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>';

  /* ---------- 스크롤 작업 묶음 ---------- */
  var tasks = [], ticking = false;
  function tick() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { ticking = false; for (var i = 0; i < tasks.length; i++) tasks[i](); });
  }
  window.addEventListener('scroll', tick, { passive: true });
  window.addEventListener('resize', tick);

  /* ---------- 헤더: 어두운 구간 위에서는 흰 글씨 ---------- */
  var header = $('[data-header]');
  var darks = $$('[data-dark]');
  tasks.push(function () {
    var probe = header.offsetHeight / 2, onDark = false;
    for (var i = 0; i < darks.length; i++) {
      var r = darks[i].getBoundingClientRect();
      if (r.top <= probe && r.bottom > probe) { onDark = true; break; }
    }
    header.classList.toggle('on-dark', onDark && !body.classList.contains('menu-open'));
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  });

  /* ---------- 모바일 메뉴 ---------- */
  var menuBtn = $('[data-menu-btn]'), mnav = $('[data-mnav]');
  function setMenu(open) {
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? menuBtn.getAttribute('data-close') : menuBtn.getAttribute('data-open'));
    body.classList.toggle('menu-open', open);
    if (open) {
      mnav.hidden = false;
      requestAnimationFrame(function () { mnav.classList.add('is-open'); });
    } else {
      mnav.classList.remove('is-open');
      setTimeout(function () { if (!mnav.classList.contains('is-open')) mnav.hidden = true; }, 300);
    }
    tick();
  }
  if (menuBtn && mnav) {
    menuBtn.addEventListener('click', function () { setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'); });
    mnav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    var wide = window.matchMedia('(min-width: 1081px)');
    var onWide = function () { if (wide.matches && body.classList.contains('menu-open')) setMenu(false); };
    if (wide.addEventListener) wide.addEventListener('change', onWide); else if (wide.addListener) wide.addListener(onWide);
  }

  /* ---------- 언어 선택 ---------- */
  var langMenu = $('[data-lang-menu]');
  function closeLang() { if (langMenu && langMenu.open) langMenu.open = false; }
  document.addEventListener('click', function (e) {
    if (langMenu && langMenu.open && !langMenu.contains(e.target)) closeLang();
    var a = e.target.closest && e.target.closest('[data-lang-link]');
    if (a) store.set('kt-lang', a.getAttribute('data-lang-link'));
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (langMenu && langMenu.open) { closeLang(); langMenu.querySelector('summary').focus(); }
    if (body.classList.contains('menu-open')) { setMenu(false); menuBtn.focus(); }
  });

  /* 브라우저 언어가 다른 경우, 그 언어 페이지를 안내합니다 (한 번 고르거나 닫으면 다시 안 띄움) */
  (function suggestLanguage() {
    if (store.get('kt-lang') || store.get('kt-suggest-off')) return;
    var data;
    try { data = JSON.parse($('#kt-suggest').textContent); } catch (e) { return; }
    var prefs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || ''];
    var want = null;
    for (var i = 0; i < prefs.length; i++) {
      var code = String(prefs[i]).toLowerCase().slice(0, 2);
      if (data[code]) { want = code; break; }
    }
    if (!want || want === lang) return;
    var s = data[want];
    var bar = document.createElement('div');
    bar.className = 'suggest';
    bar.setAttribute('lang', want);
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', s.text);
    var text = document.createElement('span'); text.textContent = s.text;
    var link = document.createElement('a'); link.href = s.href; link.textContent = s.go; link.setAttribute('hreflang', want);
    link.addEventListener('click', function () { store.set('kt-lang', want); });
    var close = document.createElement('button'); close.type = 'button'; close.setAttribute('aria-label', s.close); close.innerHTML = CLOSE_SVG;
    close.addEventListener('click', function () { store.set('kt-suggest-off', '1'); bar.parentNode && bar.parentNode.removeChild(bar); });
    bar.appendChild(text); bar.appendChild(link); bar.appendChild(close);
    setTimeout(function () { body.appendChild(bar); }, 1400);
  })();

  /* ---------- 메인 첫 화면: 접히는 트레이 ---------- */
  var fold = $('[data-fold]');
  function playFold() {
    if (!fold) return;
    fold.classList.remove('is-play');
    void fold.offsetWidth;
    fold.classList.add('is-play');
  }
  if (fold) {
    var replay = $('[data-fold-replay]');
    if (reduce) {
      fold.classList.add('is-static');
      if (replay) replay.hidden = true;
    } else if (replay) {
      replay.addEventListener('click', playFold);
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { fold.classList.toggle('is-paused', !es[0].isIntersecting); }).observe(fold);
    }
  }

  /* ---------- 나타나는 효과 ---------- */
  function initReveal() {
    var els = $$('[data-reveal]');
    if (reduce || !('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('is-in'); }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* 글꼴이 준비되면 시작합니다 (최대 0.9초 대기) */
  var started = false;
  function start() {
    if (started) return;
    started = true;
    requestAnimationFrame(function () {
      root.classList.add('is-ready');
      initReveal();
      if (fold && !reduce) playFold();
      tick();
    });
  }
  if (document.fonts && document.fonts.ready) {
    Promise.race([document.fonts.ready, new Promise(function (r) { setTimeout(r, 900); })]).then(start, start);
  } else {
    start();
  }

  /* ---------- 선언 문구: 스크롤에 맞춰 진해짐 ---------- */
  var quote = $('[data-statement] .statement-q');
  if (quote) {
    var words = $$('.w', quote);
    if (reduce) words.forEach(function (w) { w.classList.add('on'); });
    else tasks.push(function () {
      var r = quote.getBoundingClientRect(), vh = window.innerHeight;
      var p = Math.max(0, Math.min(1, (vh * 0.86 - r.top) / (vh * 0.5)));
      var n = Math.round(p * words.length);
      for (var i = 0; i < words.length; i++) words[i].classList.toggle('on', i < n);
    });
  }

  /* ---------- 120만 개: 숫자 올라가기, 칸 채우기 ---------- */
  var big = $('[data-bignum]');
  if (big) {
    var num = $('[data-count]', big);
    var target = parseFloat(num.getAttribute('data-count'));
    var dec = parseInt(num.getAttribute('data-dec') || '0', 10);
    var nf;
    try { nf = new Intl.NumberFormat(lang, { minimumFractionDigits: dec, maximumFractionDigits: dec }); } catch (e) { nf = null; }
    var fmt = function (v) { return nf ? nf.format(v) : v.toFixed(dec); };
    var run = function () {
      big.classList.add('is-on');
      if (reduce) return;
      var t0 = performance.now(), dur = 1700;
      num.textContent = fmt(0);
      var step = function (now) {
        var k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
        num.textContent = fmt(k < 1 ? target * e : target);
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window) {
      var bio = new IntersectionObserver(function (es) {
        if (!es[0].isIntersecting) return;
        bio.disconnect();
        run();
      }, { threshold: 0.35 });
      bio.observe(big);
    } else run();
  }

  /* ---------- 제품소개: 현재 보고 있는 분류 표시 ---------- */
  var pnav = $('[data-pnav]');
  if (pnav) {
    var plinks = $$('[data-spy-link]', pnav);
    var psecs = plinks.map(function (a) { return document.getElementById(a.getAttribute('data-spy-link')); });
    var list = $('ul', pnav), active = -1;
    tasks.push(function () {
      var mark = header.offsetHeight + pnav.offsetHeight + window.innerHeight * 0.25, cur = -1;
      for (var i = 0; i < psecs.length; i++) if (psecs[i] && psecs[i].getBoundingClientRect().top <= mark) cur = i;
      if (cur === active) return;
      active = cur;
      plinks.forEach(function (a, i) {
        a.classList.toggle('is-active', i === cur);
        if (i === cur) {
          a.setAttribute('aria-current', 'true');
          if (list.scrollWidth > list.clientWidth) list.scrollTo({ left: a.offsetLeft - list.clientWidth / 2 + a.offsetWidth / 2, behavior: reduce ? 'auto' : 'smooth' });
        } else a.removeAttribute('aria-current');
      });
    });
  }

  /* ---------- 생산·품질: 단계에 맞춰 그림 바꾸기 ---------- */
  var sc = $('[data-scrolly]');
  if (sc) {
    var steps = $$('[data-step]', sc), arts = $$('[data-sa]', sc);
    var nEl = $('[data-sa-n]', sc), bar = $('[data-sa-bar]', sc), curStep = 0;
    tasks.push(function () {
      var mark = window.innerHeight * 0.52, idx = 0;
      for (var i = 0; i < steps.length; i++) if (steps[i].getBoundingClientRect().top < mark) idx = i;
      if (idx === curStep) return;
      curStep = idx;
      steps.forEach(function (s, i) { s.classList.toggle('on', i === idx); });
      arts.forEach(function (a, i) { a.classList.toggle('on', i === idx); });
      if (nEl) nEl.textContent = (idx < 9 ? '0' : '') + (idx + 1);
      if (bar) bar.style.setProperty('--p', ((idx + 1) / steps.length).toFixed(3));
    });
  }

  /* ---------- 문의 폼 ---------- */
  var form = $('[data-form]');
  if (form) {
    var errs = {};
    try { errs = JSON.parse(form.getAttribute('data-errors')); } catch (e) { /* 기본 메시지 없음 */ }
    var toast = $('[data-toast]'), toastTimer;
    var showToast = function (msg) {
      toast.textContent = msg;
      toast.classList.add('is-on');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function () { toast.classList.remove('is-on'); }, 6000);
    };
    var F = {
      company: $('#f-company', form), name: $('#f-name', form), phone: $('#f-phone', form),
      email: $('#f-email', form), message: $('#f-message', form), privacy: $('#f-privacy', form)
    };
    Object.keys(F).forEach(function (k) { var el = F[k]; el.setAttribute('data-desc', el.getAttribute('aria-describedby') || ''); });
    F.phone.setAttribute('data-desc', 'h-contact');
    F.email.setAttribute('data-desc', 'h-contact');
    F.phone.setAttribute('aria-describedby', 'h-contact');
    F.email.setAttribute('aria-describedby', 'h-contact');

    var setErr = function (el, msg, host) {
      var id = el.id + '-err', p = document.getElementById(id), base = el.getAttribute('data-desc');
      if (msg) {
        if (!p) { p = document.createElement('p'); p.className = 'err'; p.id = id; (host || el.closest('.field')).appendChild(p); }
        p.textContent = msg;
        el.setAttribute('aria-invalid', 'true');
        el.setAttribute('aria-describedby', (base ? base + ' ' : '') + id);
      } else {
        if (p) p.parentNode.removeChild(p);
        el.removeAttribute('aria-invalid');
        if (base) el.setAttribute('aria-describedby', base); else el.removeAttribute('aria-describedby');
      }
    };
    var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var checks = {
      company: function () { setErr(F.company, F.company.value.trim() ? '' : errs.company); return !!F.company.value.trim(); },
      name: function () { setErr(F.name, F.name.value.trim() ? '' : errs.name); return !!F.name.value.trim(); },
      contact: function () {
        var ph = F.phone.value.trim(), em = F.email.value.trim();
        if (!ph && !em) { F.phone.setAttribute('aria-invalid', 'true'); setErr(F.email, errs.contact); return false; }
        F.phone.removeAttribute('aria-invalid');
        if (em && !EMAIL.test(em)) { setErr(F.email, errs.email); return false; }
        setErr(F.email, '');
        return true;
      },
      message: function () { setErr(F.message, F.message.value.trim() ? '' : errs.message); return !!F.message.value.trim(); },
      privacy: function () { setErr(F.privacy, F.privacy.checked ? '' : errs.privacy, F.privacy.closest('.field')); return F.privacy.checked; }
    };
    var fieldCheck = { company: 'company', name: 'name', phone: 'contact', email: 'contact', message: 'message', privacy: 'privacy' };
    Object.keys(fieldCheck).forEach(function (k) {
      var el = F[k], ev = el.type === 'checkbox' ? 'change' : 'input';
      el.addEventListener(ev, function () { if (el.getAttribute('aria-invalid') || (k === 'phone' && F.email.getAttribute('aria-invalid'))) checks[fieldCheck[k]](); });
      if (el.type !== 'checkbox') el.addEventListener('blur', function () { if (el.getAttribute('aria-invalid')) checks[fieldCheck[k]](); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var order = ['company', 'name', 'contact', 'message', 'privacy'], first = null;
      order.forEach(function (k) {
        if (!checks[k]() && !first) first = k === 'contact' ? (F.phone.value.trim() || F.email.value.trim() ? F.email : F.phone) : F[k];
      });
      if (first) { first.focus(); return; }
      showToast(form.getAttribute('data-sent'));
      form.reset();
      var note = $('.prefill-note', form); if (note) note.parentNode.removeChild(note);
    });

    /* 주소로 넘어온 제품·문의 종류를 미리 고릅니다 (?product=chicken, ?type=sample) */
    var q = new URLSearchParams(window.location.search);
    var prod = q.get('product'), type = q.get('type');
    if (prod && /^[a-z]+$/.test(prod)) {
      var sel = $('#f-product', form), opt = sel && sel.querySelector('option[value="' + prod + '"]');
      if (opt) {
        sel.value = prod;
        var n = document.createElement('p');
        n.className = 'prefill-note';
        n.innerHTML = CHECK_SVG;
        n.appendChild(document.createTextNode(form.getAttribute('data-prefilled')));
        form.insertBefore(n, form.firstChild);
      }
    }
    if (type && /^[a-z]+$/.test(type)) {
      var radio = form.querySelector('input[name="type"][value="' + type + '"]');
      if (radio) radio.checked = true;
    }
  }

  tick();
})();
