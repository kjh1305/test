/* 겟스크린미 한국총판 — 화면 동작 */
(function () {
  'use strict';
  window.__gs = true;
  var root = document.documentElement, body = document.body;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var CHECK_SVG = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>';

  /* 헤더 그림자 */
  var header = $('[data-header]');
  var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 6); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* 모바일 메뉴 */
  var menuBtn = $('[data-menu-btn]'), mnav = $('[data-mnav]');
  function setMenu(open) {
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    body.classList.toggle('menu-open', open);
    if (open) { mnav.hidden = false; requestAnimationFrame(function () { mnav.classList.add('is-open'); }); }
    else { mnav.classList.remove('is-open'); setTimeout(function () { if (!mnav.classList.contains('is-open')) mnav.hidden = true; }, 260); }
  }
  if (menuBtn && mnav) {
    menuBtn.addEventListener('click', function () { setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'); });
    mnav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && body.classList.contains('menu-open')) { setMenu(false); menuBtn.focus(); } });
    var wide = window.matchMedia('(min-width: 1025px)');
    var onWide = function () { if (wide.matches && body.classList.contains('menu-open')) setMenu(false); };
    if (wide.addEventListener) wide.addEventListener('change', onWide); else if (wide.addListener) wide.addListener(onWide);
  }

  /* 첫 화면 원격지원 목업: 화면에 보일 때만 움직임 */
  var rs = $('[data-rs]');
  if (rs && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { rs.classList.toggle('is-paused', !es[0].isIntersecting); }).observe(rs);
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
      if (rs && !reduce) rs.classList.add('is-play');
    });
  }
  if (document.fonts && document.fonts.ready) Promise.race([document.fonts.ready, new Promise(function (r) { setTimeout(r, 900); })]).then(start, start);
  else start();

  /* 블로그 글 분류 */
  var filter = $('[data-filter]'), list = $('[data-post-list]');
  if (filter && list) {
    var btns = $$('button', filter), items = $$('li', list);
    filter.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      var f = b.getAttribute('data-f');
      btns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      items.forEach(function (li) { li.hidden = !(f === 'all' || li.getAttribute('data-cat') === f); });
    });
  }

  /* 도입 문의 폼 */
  var form = $('[data-form]');
  if (form) {
    var errs = {};
    try { errs = JSON.parse(form.getAttribute('data-errors')); } catch (e) { /* 기본 메시지 없음 */ }
    var toast = $('[data-toast]'), toastTimer;
    var showToast = function (msg) {
      toast.textContent = msg; toast.classList.add('is-on');
      clearTimeout(toastTimer); toastTimer = setTimeout(function () { toast.classList.remove('is-on'); }, 6000);
    };
    var F = { company: $('#f-company', form), name: $('#f-name', form), phone: $('#f-phone', form), email: $('#f-email', form), message: $('#f-message', form), privacy: $('#f-privacy', form) };
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
    var checks = {
      company: function () { var ok = !!F.company.value.trim(); setErr(F.company, ok ? '' : errs.company); return ok; },
      name: function () { var ok = !!F.name.value.trim(); setErr(F.name, ok ? '' : errs.name); return ok; },
      contact: function () {
        var ph = F.phone.value.trim(), em = F.email.value.trim();
        if (!ph && !em) { F.phone.setAttribute('aria-invalid', 'true'); setErr(F.email, errs.contact); return false; }
        F.phone.removeAttribute('aria-invalid');
        if (em && !EMAIL.test(em)) { setErr(F.email, errs.email); return false; }
        setErr(F.email, ''); return true;
      },
      message: function () { var ok = !!F.message.value.trim(); setErr(F.message, ok ? '' : errs.message); return ok; },
      privacy: function () { var ok = F.privacy.checked; setErr(F.privacy, ok ? '' : errs.privacy); return ok; }
    };
    var map = { company: 'company', name: 'name', phone: 'contact', email: 'contact', message: 'message', privacy: 'privacy' };
    Object.keys(map).forEach(function (k) {
      var el = F[k], ev = el.type === 'checkbox' ? 'change' : 'input';
      el.addEventListener(ev, function () { if (el.getAttribute('aria-invalid') || (k === 'phone' && F.email.getAttribute('aria-invalid'))) checks[map[k]](); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var first = null;
      ['company', 'name', 'contact', 'message', 'privacy'].forEach(function (k) {
        if (!checks[k]() && !first) first = k === 'contact' ? (F.phone.value.trim() || F.email.value.trim() ? F.email : F.phone) : F[k];
      });
      if (first) { first.focus(); return; }
      showToast(form.getAttribute('data-sent'));
      form.reset();
      var note = $('.prefill-note', form); if (note) note.parentNode.removeChild(note);
    });
    /* ?plan=advanced, ?type=quote 처럼 넘어오면 미리 채웁니다 */
    var q = new URLSearchParams(window.location.search);
    var plan = q.get('plan'), type = q.get('type');
    if (plan === 'advanced') {
      F.message.value = 'Advanced 요금제(상담원 3명, 연 30만원) 도입을 문의합니다.\n';
      type = type || 'quote';
      var n = document.createElement('p');
      n.className = 'prefill-note'; n.innerHTML = CHECK_SVG;
      n.appendChild(document.createTextNode(form.getAttribute('data-prefilled')));
      form.insertBefore(n, form.firstChild);
    }
    if (type && /^[a-z]+$/.test(type)) {
      var r = form.querySelector('input[name="type"][value="' + type + '"]');
      if (r) r.checked = true;
    }
  }
})();
