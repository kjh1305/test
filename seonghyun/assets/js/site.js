/* 주식회사 성현 — 화면 동작: 헤더, 모바일 메뉴, 나타나는 효과, 맨 위로, 첫 화면 슬라이드, 알림 팝업, 견적문의 폼 */
(function () {
  'use strict';
  window.__ls = true;
  var body = document.body;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var CHECK_SVG = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>';

  /* ---------- 헤더 그림자, TOP 버튼 ---------- */
  var header = $('[data-header]'), top = $('[data-top]');
  var onScroll = function () {
    var y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 8);
    if (top) top.classList.toggle('is-on', y > 500);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (top) top.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    var m = document.getElementById('main'); if (m) m.focus({ preventScroll: true });
  });

  /* ---------- 모바일 메뉴 ---------- */
  var menuBtn = $('[data-menu-btn]'), mnav = $('[data-mnav]');
  function setMenu(open) {
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    body.classList.toggle('menu-open', open);
    if (open) { mnav.hidden = false; requestAnimationFrame(function () { mnav.classList.add('is-open'); }); }
    else { mnav.classList.remove('is-open'); setTimeout(function () { if (!mnav.classList.contains('is-open')) mnav.hidden = true; }, reduce ? 0 : 260); }
  }
  if (menuBtn && mnav) {
    menuBtn.addEventListener('click', function () { setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'); });
    mnav.addEventListener('click', function (e) { if (e.target.closest('a[href]')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && body.classList.contains('menu-open')) { setMenu(false); menuBtn.focus(); } });
    var wide = window.matchMedia('(min-width: 1021px)');
    var onWide = function () { if (wide.matches && body.classList.contains('menu-open')) setMenu(false); };
    if (wide.addEventListener) wide.addEventListener('change', onWide); else if (wide.addListener) wide.addListener(onWide);
  }

  /* ---------- 나타나는 효과 ('동작 줄이기'면 바로 보임) ---------- */
  var els = $$('[data-reveal]');
  if (reduce || !('IntersectionObserver' in window)) els.forEach(function (el) { el.classList.add('is-in'); });
  else {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (!e.isIntersecting) return; e.target.classList.add('is-in'); io.unobserve(e.target); }); }, { threshold: 0.06, rootMargin: '0px 0px -4% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 첫 화면 슬라이드 ----------
     6초마다 넘어감. 마우스를 올리거나 키보드로 들어오면 잠시 멈추고, 멈춤 버튼으로 끌 수 있음.
     화살표 키(←, →)는 조작 버튼에 초점이 있을 때 동작.
     '동작 줄이기'를 켠 기기에서는 자동으로 넘기지 않음 (버튼으로만 넘김). */
  var slider = $('[data-slider]');
  if (slider) {
    var slides = $$('.hero-slide', slider), stage = $('[data-stage]', slider);
    var curEl = $('[data-cur]', slider), capEl = $('[data-cap-out]', slider), pauseBtn = $('[data-pause]', slider);
    var n = slides.length, cur = 0, timer = null, userPaused = reduce, hover = false, visible = true, DELAY = 6000;
    var pad = function (i) { return (i < 9 ? '0' : '') + (i + 1); };
    var go = function (i) {
      i = (i + n) % n; if (i === cur) return;
      slides[cur].classList.remove('is-on'); slides[cur].setAttribute('aria-hidden', 'true');
      cur = i;
      slides[cur].classList.add('is-on'); slides[cur].removeAttribute('aria-hidden');
      curEl.textContent = pad(cur);
      capEl.textContent = slides[cur].getAttribute('data-cap');
    };
    var schedule = function () {
      clearTimeout(timer); timer = null;
      stage.setAttribute('aria-live', userPaused ? 'polite' : 'off');
      if (!userPaused && !hover && visible && n > 1) timer = setTimeout(function () { go(cur + 1); schedule(); }, DELAY);
    };
    var setPaused = function (p) {
      userPaused = p;
      pauseBtn.setAttribute('aria-pressed', p ? 'true' : 'false');
      pauseBtn.setAttribute('aria-label', p ? '자동 넘김 재생' : '자동 넘김 멈춤');
      schedule();
    };
    $('[data-prev]', slider).addEventListener('click', function () { go(cur - 1); schedule(); });
    $('[data-next]', slider).addEventListener('click', function () { go(cur + 1); schedule(); });
    pauseBtn.addEventListener('click', function () { setPaused(!userPaused); });
    slider.addEventListener('mouseenter', function () { hover = true; schedule(); });
    slider.addEventListener('mouseleave', function () { hover = false; schedule(); });
    slider.addEventListener('focusin', function () { hover = true; schedule(); });
    slider.addEventListener('focusout', function (e) { if (!slider.contains(e.relatedTarget)) { hover = false; schedule(); } });
    slider.addEventListener('keydown', function (e) {
      if (!e.target.closest('.hero-ctrl')) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); go(cur + 1); schedule(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur - 1); schedule(); }
    });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; schedule(); }).observe(slider);
    document.addEventListener('visibilitychange', function () { visible = !document.hidden; schedule(); });
    setPaused(userPaused);
  }

  /* ---------- 홈 알림 팝업 (content.mjs 의 POPUPS 가 on 일 때만 HTML 이 들어감) ----------
     '오늘 하루 열지 않기'를 고르고 닫으면 오늘 자정까지 localStorage 에 기록.
     저장이 막힌 브라우저에서는 기록하지 못해도 팝업은 그대로 열림. */
  var layer = $('[data-popups]');
  if (layer) {
    var KEY = 'seonghyun-pop-', mobile = window.matchMedia('(max-width: 760px)');
    var pops = $$('[data-pop]', layer);
    pops.forEach(function (p) {
      var hide = false;
      try { hide = Number(localStorage.getItem(KEY + p.getAttribute('data-pop'))) > Date.now(); } catch (e) { hide = false; }
      p.hidden = hide;
    });
    var openPops = function () { return pops.filter(function (p) { return !p.hidden; }); };
    var closePop = function (p) {
      var today = $('[data-pop-today]', p);
      if (today && today.checked) {
        var midnight = new Date(); midnight.setHours(24, 0, 0, 0);
        try { localStorage.setItem(KEY + p.getAttribute('data-pop'), String(midnight.getTime())); } catch (e) { /* 저장 못 해도 닫기는 됨 */ }
      }
      p.hidden = true;
      var rest = openPops();
      if (rest.length) $('[data-pop-close]', rest[0]).focus();
      else { layer.hidden = true; var m = document.getElementById('main'); if (m) m.focus({ preventScroll: true }); }
    };
    pops.forEach(function (p) {
      $('[data-pop-close]', p).addEventListener('click', function () { closePop(p); });
      var link = $('.pop-img', p), telHref = link.getAttribute('data-tel');
      link.addEventListener('click', function (e) { if (telHref && mobile.matches) { e.preventDefault(); window.location.href = telHref; } });
    });
    $('[data-pop-dim]', layer).addEventListener('click', function () { openPops().forEach(closePop); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !layer.hidden && !body.classList.contains('menu-open')) openPops().forEach(closePop);
    });
    if (openPops().length) {
      layer.hidden = false;
      $('[data-pop-close]', openPops()[0]).focus({ preventScroll: true });
    }
  }

  /* ---------- 견적문의 폼: 입력 확인만 하고 보내지 않음 ---------- */
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

    /* contact/?product=f01 처럼 오면 그 제품을 미리 골라 둠 */
    var prod = new URLSearchParams(window.location.search).get('product');
    if (prod && /^[a-z0-9]+$/.test(prod)) {
      var r = form.querySelector('input[name="product"][value="' + prod + '"]');
      if (r) {
        r.checked = true;
        var note = document.createElement('p'); note.className = 'prefill-note'; note.innerHTML = CHECK_SVG;
        note.appendChild(document.createTextNode(form.getAttribute('data-prefilled')));
        form.insertBefore(note, form.firstChild);
      }
    }
  }
})();
