/* 이끌림 — 화면 동작: 헤더, 모바일 메뉴, 나타남, 카드 빛, 끌려오는 점 멈춤, 후기 크게 보기, 상담 폼 확인 */
(function () {
  'use strict';
  var body = document.body;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };

  /* 헤더: 내리면 바탕이 생김 */
  var header = $('[data-header]');
  var onScroll = function () { if (header) header.classList.toggle('is-scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* 모바일 메뉴 */
  var menuBtn = $('[data-menu-btn]'), mnav = $('[data-mnav]');
  function setMenu(open) {
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.querySelector('.sr').textContent = open ? '메뉴 닫기' : '메뉴 열기';
    body.classList.toggle('menu-open', open);
    if (open) { mnav.hidden = false; requestAnimationFrame(function () { mnav.classList.add('is-open'); }); }
    else { mnav.classList.remove('is-open'); setTimeout(function () { if (!mnav.classList.contains('is-open')) mnav.hidden = true; }, reduce ? 0 : 250); }
  }
  if (menuBtn && mnav) {
    menuBtn.addEventListener('click', function () { setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'); });
    mnav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && body.classList.contains('menu-open')) { setMenu(false); menuBtn.focus(); } });
    var wide = window.matchMedia('(min-width: 1041px)');
    var onWide = function () { if (wide.matches && body.classList.contains('menu-open')) setMenu(false); };
    if (wide.addEventListener) wide.addEventListener('change', onWide);
  }

  /* 나타나는 효과 */
  var els = $$('[data-reveal]');
  if (reduce || !('IntersectionObserver' in window)) els.forEach(function (el) { el.classList.add('is-in'); });
  else {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (!e.isIntersecting) return; e.target.classList.add('is-in'); io.unobserve(e.target); }); }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* 서비스 카드: 마우스 위치에 은은한 빛 */
  $$('.svc-card a').forEach(function (a) {
    a.addEventListener('pointermove', function (e) { var r = a.getBoundingClientRect(); a.style.setProperty('--mx', (e.clientX - r.left) + 'px'); a.style.setProperty('--my', (e.clientY - r.top) + 'px'); });
  });

  /* 끌려오는 점: 움직임 줄이기면 멈춤, 화면 밖이면 쉼 */
  var field = $('[data-field]');
  if (field && field.pauseAnimations) {
    if (reduce) field.pauseAnimations();
    else if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) field.unpauseAnimations(); else field.pauseAnimations(); }); }).observe(field);
  }

  /* 후기 크게 보기 */
  var dlg = $('[data-lb-dialog]');
  var shots = $$('[data-lb]');
  if (dlg && shots.length && dlg.showModal) {
    var lbImg = $('[data-lb-img]', dlg), lbCap = $('[data-lb-cap]', dlg), cur = 0, opener = null;
    var show = function (i) { cur = (i + shots.length) % shots.length; var a = shots[cur]; lbImg.src = a.getAttribute('href'); lbImg.alt = a.getAttribute('data-cap') || ''; lbCap.textContent = (cur + 1) + ' / ' + shots.length; };
    shots.forEach(function (a, i) { a.addEventListener('click', function (e) { e.preventDefault(); opener = a; show(i); dlg.showModal(); }); });
    $('[data-lb-prev]', dlg).addEventListener('click', function () { show(cur - 1); });
    $('[data-lb-next]', dlg).addEventListener('click', function () { show(cur + 1); });
    $('[data-lb-close]', dlg).addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg || e.target.tagName === 'FIGURE') dlg.close(); });
    dlg.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') show(cur - 1); else if (e.key === 'ArrowRight') show(cur + 1); });
    dlg.addEventListener('close', function () { lbImg.removeAttribute('src'); if (opener) opener.focus(); });
  } else shots.forEach(function (a) { a.setAttribute('target', '_blank'); });

  /* 상담 폼: 필수 항목 확인 (시안이라 전송은 안 함) */
  var form = $('[data-form]'), toast = $('[data-toast]');
  if (form) {
    var tt;
    var showToast = function (m) { toast.textContent = m; toast.classList.add('is-on'); clearTimeout(tt); tt = setTimeout(function () { toast.classList.remove('is-on'); }, 6000); };
    var q = new URLSearchParams(location.search).get('service');
    if (q) $$('input[name="service"]', form).forEach(function (i) { if (i.value === q) i.checked = true; });
    var F = { company: form.company, name: form.name, phone: form.phone, privacy: form.privacy };
    var PHONE = /^0\d{1,2}-?\d{3,4}-?\d{4}$/;
    var msgs = { company: '상호나 회사명을 입력해 주세요.', name: '담당자 성함을 입력해 주세요.', phone: '연락받을 전화번호를 입력해 주세요. (예: 010-0000-0000)', privacy: '개인정보 수집과 이용에 동의해 주세요.' };
    var setErr = function (el, msg) {
      var host = el.closest('.field'), id = el.name + '-err', old = document.getElementById(id);
      if (old) old.remove();
      if (msg) { el.setAttribute('aria-invalid', 'true'); var p = document.createElement('p'); p.className = 'err'; p.id = id; p.textContent = msg; host.appendChild(p); el.setAttribute('aria-describedby', id); }
      else { el.removeAttribute('aria-invalid'); el.removeAttribute('aria-describedby'); }
    };
    var ok = {
      company: function () { return !!F.company.value.trim(); }, name: function () { return !!F.name.value.trim(); },
      phone: function () { return PHONE.test(F.phone.value.trim()); }, privacy: function () { return F.privacy.checked; }
    };
    var check = function (k) { var good = ok[k](); setErr(F[k], good ? '' : msgs[k]); return good; };
    Object.keys(F).forEach(function (k) { F[k].addEventListener(F[k].type === 'checkbox' ? 'change' : 'input', function () { if (F[k].getAttribute('aria-invalid')) check(k); }); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var first = null;
      Object.keys(F).forEach(function (k) { if (!check(k) && !first) first = F[k]; });
      if (first) { first.focus(); return; }
      showToast(form.getAttribute('data-sent') || '입력한 내용을 확인했어요. 시안이라 실제로 전송되지는 않습니다.');
      form.reset();
    });
  }
})();
