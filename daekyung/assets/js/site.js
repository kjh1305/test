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

  /* 첫 화면 사진 넘김: 막대가 다 차면 다음 사진. 멈춤 단추, 막대 눌러 고르기, 휴대폰은 옆으로 밀기.
     화면에서 벗어나면 잠시 멈춤. 움직임 줄이기 설정이면 자동으로 넘기지 않음(막대 애니메이션이 없어서) */
  var hs = $('[data-slides]');
  if (hs) {
    var slides = $$('.hs-slide', hs), dots = $$('.hs-dot', hs);
    var nowEl = $('[data-slides-now]', hs), pauseBtn = $('[data-slides-pause]', hs);
    var cur = 0;
    var go = function (n) {
      n = (n + slides.length) % slides.length;
      if (n === cur) return;
      slides[cur].classList.remove('is-on'); slides[cur].setAttribute('aria-hidden', 'true');
      dots[cur].classList.remove('is-on'); dots[cur].removeAttribute('aria-current');
      cur = n;
      slides[cur].classList.add('is-on'); slides[cur].removeAttribute('aria-hidden');
      dots[cur].classList.add('is-on'); dots[cur].setAttribute('aria-current', 'true');
      nowEl.textContent = (cur < 9 ? '0' : '') + (cur + 1);
    };
    if (slides.length > 1) {
      $('.hs-bar', hs).hidden = false;
      dots.forEach(function (d, i) {
        d.addEventListener('click', function () { go(i); });
        d.firstChild.addEventListener('animationend', function () { if (i === cur) go(cur + 1); });
      });
      pauseBtn.addEventListener('click', function () {
        var p = hs.classList.toggle('is-paused');
        pauseBtn.setAttribute('aria-label', p ? '사진 넘김 다시 시작' : '사진 넘김 멈추기');
      });
      var x0 = null, y0 = 0;
      hs.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
      hs.addEventListener('touchend', function (e) {
        if (x0 === null) return;
        var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; x0 = null;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) go(cur + (dx < 0 ? 1 : -1));
      }, { passive: true });
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (es) { hs.classList.toggle('is-away', !es[0].isIntersecting); }).observe(hs);
      }
    }
  }

  /* 공사 전과 후: 사진 위를 누르거나 끌면 경계가 따라옴. 세로로 밀면 페이지가 그대로 내려감(touch-action: pan-y).
     키보드는 숨은 range 입력으로 좌우 화살표 */
  $$('[data-ba]').forEach(function (ba) {
    var range = $('.ba-range', ba), dragging = false;
    var set = function (v) {
      v = Math.max(0, Math.min(100, v));
      ba.style.setProperty('--x', v + '%');
      range.value = Math.round(v);
    };
    var fromEvent = function (e) { var r = ba.getBoundingClientRect(); return (e.clientX - r.left) / r.width * 100; };
    ba.addEventListener('pointerdown', function (e) {
      if (e.button !== undefined && e.button !== 0) return;
      dragging = true; set(fromEvent(e));
      try { ba.setPointerCapture(e.pointerId); } catch (err) { /* 캡처 못 해도 동작 */ }
    });
    ba.addEventListener('pointermove', function (e) { if (dragging) set(fromEvent(e)); });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(function (t) { ba.addEventListener(t, function () { dragging = false; }); });
    range.addEventListener('input', function () { set(Number(range.value)); });
  });

  /* 공사 전과 후 현장 고르기 (탭). JS가 없으면 세 현장이 모두 보임 */
  var baTabs = $('[data-ba-tabs]');
  if (baTabs) {
    var tabs = $$('[role="tab"]', baTabs), panels = tabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });
    var pick = function (i, focus) {
      tabs.forEach(function (t, j) {
        var on = i === j;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        panels[j].hidden = !on;
      });
      if (focus) tabs[i].focus();
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { pick(i); });
      t.addEventListener('keydown', function (e) {
        var k = e.key, n = tabs.length;
        if (k === 'ArrowRight' || k === 'ArrowLeft' || k === 'Home' || k === 'End') {
          e.preventDefault();
          pick(k === 'Home' ? 0 : k === 'End' ? n - 1 : (i + (k === 'ArrowRight' ? 1 : -1) + n) % n, true);
        }
      });
    });
    baTabs.hidden = false;
    pick(0);
  }

  /* 시공사례 목록: 공사 종류로 걸러 보기. ?type=restore 처럼 붙여 열 수도 있음.
     예전 주소(projects/#현장)로 들어오면 그 현장 페이지로 보냄 */
  var pf = $('[data-pf]');
  if (pf) {
    var cards = $$('[data-pj]');
    if (location.hash) {
      var hit = cards.filter(function (li) { return '#' + li.getAttribute('data-pj') === location.hash; })[0];
      if (hit) { location.replace($('a', hit).href); return; }
    }
    var pfBtns = $$('[data-pf-v]', pf), pfCount = $('[data-pf-count]', pf);
    var apply = function (v) {
      var shown = 0;
      cards.forEach(function (li) {
        var ok = v === 'all' || (' ' + li.getAttribute('data-svc') + ' ').indexOf(' ' + v + ' ') > -1;
        li.hidden = !ok; if (ok) shown++;
      });
      pfBtns.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-pf-v') === v ? 'true' : 'false'); });
      pfCount.textContent = '현장 ' + shown + '곳';
    };
    pfBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        var v = b.getAttribute('data-pf-v');
        apply(v);
        try { history.replaceState(null, '', v === 'all' ? location.pathname : '?type=' + v); } catch (e) { /* 주소만 못 바꿈 */ }
      });
    });
    var start = new URLSearchParams(location.search).get('type');
    apply(start && pfBtns.some(function (b) { return b.getAttribute('data-pf-v') === start; }) ? start : 'all');
    pf.hidden = false;
  }
})();
