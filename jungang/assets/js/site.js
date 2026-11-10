/* 중앙설비산업 — 화면 동작 (모바일 메뉴, 계통도 흐름 멈춤, 상담문의 폼) */
(function () {
  'use strict';
  var body = document.body;
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var CHECK_SVG = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>';

  /* ---------- 모바일 메뉴 ---------- */
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
    var wide = window.matchMedia('(min-width: 1021px)');
    var onWide = function () { if (wide.matches && body.classList.contains('menu-open')) setMenu(false); };
    if (wide.addEventListener) wide.addEventListener('change', onWide); else if (wide.addListener) wide.addListener(onWide);
  }

  /* ---------- 보일러 계통도의 약품 흐름: 화면 밖에 있으면 멈춤 ---------- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { e.target.classList.toggle('is-paused', !e.isIntersecting); }); });
    $$('[data-bd] .bd').forEach(function (el) { io.observe(el); });
  }

  /* ---------- 상담문의 폼: 입력 확인만 하고 전송하지 않음 ---------- */
  var form = $('[data-form]');
  if (form) {
    var errs = {}; try { errs = JSON.parse(form.getAttribute('data-errors')); } catch (e) { /* 기본 메시지 없음 */ }
    var toast = $('[data-toast]'), tt;
    var showToast = function (m) { toast.textContent = m; toast.classList.add('is-on'); clearTimeout(tt); tt = setTimeout(function () { toast.classList.remove('is-on'); }, 6000); };
    var F = { name: $('#f-name', form), phone: $('#f-phone', form), email: $('#f-email', form), message: $('#f-message', form), privacy: $('#f-privacy', form) };
    var setErr = function (el, msg) {
      var id = el.id + '-err', p = document.getElementById(id);
      if (msg) {
        if (!p) { p = document.createElement('p'); p.className = 'err'; p.id = id; el.closest('.field').appendChild(p); }
        p.textContent = msg; el.setAttribute('aria-invalid', 'true'); el.setAttribute('aria-describedby', id);
      } else { if (p) p.parentNode.removeChild(p); el.removeAttribute('aria-invalid'); el.removeAttribute('aria-describedby'); }
    };
    var PHONE = /^[0-9+()\-\s]{8,}$/, EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var checks = {
      name: function () { var ok = !!F.name.value.trim(); setErr(F.name, ok ? '' : errs.name); return ok; },
      phone: function () { var v = F.phone.value.trim(), ok = PHONE.test(v) && v.replace(/\D/g, '').length >= 8; setErr(F.phone, ok ? '' : errs.phone); return ok; },
      email: function () { var v = F.email.value.trim(), ok = !v || EMAIL.test(v); setErr(F.email, ok ? '' : errs.email); return ok; },
      message: function () { var ok = !!F.message.value.trim(); setErr(F.message, ok ? '' : errs.message); return ok; },
      privacy: function () { var ok = F.privacy.checked; setErr(F.privacy, ok ? '' : errs.privacy); return ok; }
    };
    Object.keys(F).forEach(function (k) { var el = F[k]; el.addEventListener(el.type === 'checkbox' ? 'change' : 'input', function () { if (el.getAttribute('aria-invalid')) checks[k](); }); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var first = null;
      ['name', 'phone', 'email', 'message', 'privacy'].forEach(function (k) { if (!checks[k]() && !first) first = F[k]; });
      if (first) { first.focus(); return; }
      showToast(form.getAttribute('data-sent'));
      form.reset();
      var note = $('.prefill-note', form); if (note) note.parentNode.removeChild(note);
    });

    /* contact/?service=soda 처럼 오면 그 작업을 미리 골라 둠 */
    var svc = new URLSearchParams(window.location.search).get('service');
    if (svc && /^[a-z]+$/.test(svc)) {
      var r = form.querySelector('input[name="service"][value="' + svc + '"]');
      if (r) {
        r.checked = true;
        var n = document.createElement('p'); n.className = 'prefill-note'; n.innerHTML = CHECK_SVG;
        n.appendChild(document.createTextNode(form.getAttribute('data-prefilled')));
        form.insertBefore(n, form.firstChild);
      }
    }
  }
})();
