/* 대경기업 — 화면 동작: 헤더, 모바일 메뉴, 부드러운 나타남, 견적문의 폼 확인 */
(function () {
  'use strict';
  window.__dk = true;
  var body = document.body;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var CHECK_SVG = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>';

  /* 헤더: 스크롤하면 밑줄 */
  var header = $('[data-header]');
  var floaters = $('[data-floaters]');
  var onScroll = function () {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
    if (floaters) floaters.classList.toggle('is-top-on', window.scrollY > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* 모바일 메뉴 */
  var menuBtn = $('[data-menu-btn]'), mnav = $('[data-mnav]');
  function setMenu(open) {
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    body.classList.toggle('menu-open', open);
    if (open) { mnav.hidden = false; requestAnimationFrame(function () { mnav.classList.add('is-open'); }); }
    else { mnav.classList.remove('is-open'); setTimeout(function () { if (!mnav.classList.contains('is-open')) mnav.hidden = true; }, reduce ? 0 : 250); }
  }
  if (menuBtn && mnav) {
    menuBtn.addEventListener('click', function () { setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'); });
    mnav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && body.classList.contains('menu-open')) { setMenu(false); menuBtn.focus(); } });
    var wide = window.matchMedia('(min-width: 961px)');
    var onWide = function () { if (wide.matches && body.classList.contains('menu-open')) setMenu(false); };
    if (wide.addEventListener) wide.addEventListener('change', onWide); else if (wide.addListener) wide.addListener(onWide);
  }

  /* 부드러운 나타남 (움직임 줄이기 설정이면 바로 보임) */
  var els = $$('[data-reveal]');
  if (reduce || !('IntersectionObserver' in window)) els.forEach(function (el) { el.classList.add('is-in'); });
  else {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (!e.isIntersecting) return; e.target.classList.add('is-in'); io.unobserve(e.target); }); }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* 맨 위로 */
  var top = $('[data-top]');
  if (top) top.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    var m = document.getElementById('main'); if (m) { m.setAttribute('tabindex', '-1'); m.focus({ preventScroll: true }); }
  });

  /* 홈 알림 팝업
     '오늘 하루 열지 않기'를 고르고 닫으면 오늘 자정까지 localStorage 에 기록.
     저장이 막힌 브라우저에서는 기록하지 못해도 팝업은 그대로 열림. JS가 없으면 팝업은 보이지 않음. */
  var layer = $('[data-popups]');
  if (layer) {
    var KEY = 'daekyung-pop-', mobile = window.matchMedia('(max-width: 640px)');
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
      else { layer.hidden = true; var m = document.getElementById('main'); if (m) { m.setAttribute('tabindex', '-1'); m.focus({ preventScroll: true }); } }
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

  /* 시공사례 사진 크게 보기 (JS가 없으면 링크로 사진 파일이 열림) */
  var dlg = $('[data-lb-dialog]');
  if (dlg && typeof dlg.showModal === 'function') {
    var shots = $$('[data-lb]'), lbImg = $('[data-lb-img]', dlg), lbCap = $('[data-lb-cap]', dlg), cur = 0, opener = null;
    var show = function (i) {
      cur = (i + shots.length) % shots.length;
      var a = shots[cur], im = $('img', a);
      lbImg.src = a.getAttribute('href'); lbImg.alt = im ? im.alt : '';
      lbCap.textContent = a.getAttribute('data-cap') + ' (' + (cur + 1) + ' / ' + shots.length + ')';
    };
    shots.forEach(function (a, i) {
      a.addEventListener('click', function (e) { e.preventDefault(); opener = a; show(i); dlg.showModal(); });
    });
    $('[data-lb-prev]', dlg).addEventListener('click', function () { show(cur - 1); });
    $('[data-lb-next]', dlg).addEventListener('click', function () { show(cur + 1); });
    $('[data-lb-close]', dlg).addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg || e.target.tagName === 'FIGURE') dlg.close(); });
    dlg.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') show(cur - 1); else if (e.key === 'ArrowRight') show(cur + 1); });
    dlg.addEventListener('close', function () { lbImg.removeAttribute('src'); if (opener) opener.focus(); });
  }

  /* 견적문의 폼: 입력 확인만 하고 전송하지 않음 */
  var form = $('[data-form]');
  if (form) {
    var errs = {}; try { errs = JSON.parse(form.getAttribute('data-errors')); } catch (e) { /* 기본 메시지 없음 */ }
    var toast = $('[data-toast]'), tt;
    var showToast = function (m) { toast.textContent = m; toast.classList.add('is-on'); clearTimeout(tt); tt = setTimeout(function () { toast.classList.remove('is-on'); }, 6000); };
    var svcSet = $('#f-service', form), svcRadios = $$('input[name="service"]', form);
    var F = { name: $('#f-name', form), phone: $('#f-phone', form), message: $('#f-message', form), privacy: $('#f-privacy', form) };
    var setErr = function (el, host, msg) {
      var id = (el.id || host.id) + '-err', p = document.getElementById(id);
      if (msg) {
        if (!p) { p = document.createElement('p'); p.className = 'err'; p.id = id; host.appendChild(p); }
        p.textContent = msg; el.setAttribute('aria-invalid', 'true'); el.setAttribute('aria-describedby', id);
      } else { if (p) p.parentNode.removeChild(p); el.removeAttribute('aria-invalid'); el.removeAttribute('aria-describedby'); }
    };
    var PHONE = /[0-9]{2,}.*[0-9]{3,}/;
    var checks = {
      service: function () {
        var ok = svcRadios.some(function (r) { return r.checked; });
        svcSet.classList.toggle('is-invalid', !ok);
        svcRadios.forEach(function (r, i) { if (i === 0) setErr(r, svcSet, ok ? '' : errs.service); else if (ok) r.removeAttribute('aria-invalid'); });
        return ok;
      },
      name: function () { var ok = !!F.name.value.trim(); setErr(F.name, F.name.closest('.field'), ok ? '' : errs.name); return ok; },
      phone: function () { var ok = PHONE.test(F.phone.value); setErr(F.phone, F.phone.closest('.field'), ok ? '' : errs.phone); return ok; },
      message: function () { var ok = !!F.message.value.trim(); setErr(F.message, F.message.closest('.field'), ok ? '' : errs.message); return ok; },
      privacy: function () { var ok = F.privacy.checked; setErr(F.privacy, F.privacy.closest('.field'), ok ? '' : errs.privacy); return ok; }
    };
    Object.keys(F).forEach(function (k) { var el = F[k]; el.addEventListener(el.type === 'checkbox' ? 'change' : 'input', function () { if (el.getAttribute('aria-invalid')) checks[k](); }); });
    svcRadios.forEach(function (r) { r.addEventListener('change', function () { if (svcSet.classList.contains('is-invalid')) checks.service(); }); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var first = null;
      ['service', 'name', 'phone', 'message', 'privacy'].forEach(function (k) { if (!checks[k]() && !first) first = k === 'service' ? svcRadios[0] : F[k]; });
      if (first) {
        first.focus({ preventScroll: true });
        (first.closest('.field') || first).scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' });
        return;
      }
      showToast(form.getAttribute('data-sent')); form.reset();
      var note = $('.prefill-note', form); if (note) note.parentNode.removeChild(note);
    });
    /* ?service=restore 처럼 붙이면 그 공사 종류를 미리 선택 */
    var svc = new URLSearchParams(window.location.search).get('service');
    if (svc && /^[a-z]+$/.test(svc)) {
      var radio = form.querySelector('input[name="service"][value="' + svc + '"]');
      if (radio) {
        radio.checked = true;
        var n = document.createElement('p'); n.className = 'prefill-note'; n.innerHTML = CHECK_SVG;
        n.appendChild(document.createTextNode(form.getAttribute('data-prefilled')));
        form.insertBefore(n, form.firstChild);
      }
    }
  }
})();
