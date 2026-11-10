/* 중앙설비산업 — 화면 동작 (모바일 메뉴, 첫 화면 슬라이드, 알림 팝업, 계통도 흐름 멈춤, 상담문의 폼) */
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

  /* ---------- 첫 화면 사진 슬라이드 ----------
     6초마다 넘어감. 마우스를 올리거나 키보드로 들어오면 멈추고, 멈춤 버튼으로 끌 수 있음.
     '동작 줄이기'를 켠 기기에서는 자동으로 넘기지 않음 (화살표와 점으로만 넘김). */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var slider = $('[data-slider]');
  if (slider) {
    var slides = $$('.hero-slide', slider), dots = $$('[data-dot]', slider), cap = $('[data-cap]', slider);
    var stage = $('.hero-slides', slider), pauseBtn = $('[data-pause]', slider);
    var n = slides.length, cur = 0, timer = null, userPaused = reduce, hover = false, visible = true, DELAY = 6000;
    var caps = slides.map(function (s) { var l = s.getAttribute('aria-label'); return l.slice(l.indexOf(': ') + 2); });
    var go = function (i) {
      i = (i + n) % n; if (i === cur) return;
      slides[cur].classList.remove('is-on'); slides[cur].setAttribute('aria-hidden', 'true'); dots[cur].removeAttribute('aria-current');
      cur = i;
      slides[cur].classList.add('is-on'); slides[cur].removeAttribute('aria-hidden'); dots[cur].setAttribute('aria-current', 'true');
      cap.textContent = caps[cur];
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
    dots.forEach(function (d, i) { d.addEventListener('click', function () { go(i); schedule(); }); });
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
    setPaused(userPaused);
  }

  /* ---------- 홈 알림 팝업 ----------
     '오늘 하루 열지 않기'를 고르고 닫으면 오늘 자정까지 localStorage 에 기록.
     저장이 막힌 브라우저에서는 기록하지 못해도 팝업은 그대로 열림. */
  var layer = $('[data-popups]');
  if (layer) {
    var KEY = 'jungang-pop-', mobile = window.matchMedia('(max-width: 760px)');
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
      var link = $('.pop-img', p), tel = link.getAttribute('data-tel');
      link.addEventListener('click', function (e) { if (tel && mobile.matches) { e.preventDefault(); window.location.href = tel; } });
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
