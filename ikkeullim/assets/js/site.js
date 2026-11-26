/* 이끌림 — 화면 동작: 헤더, 모바일 메뉴, 나타남, 카드 빛, 끌려오는 점 멈춤, 후기 크게 보기, 상담 폼 확인 */
(function () {
  'use strict';
  var body = document.body;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };

  /* 밝은 화면 / 어두운 화면 바꾸기 (선택은 이 브라우저에 기억) */
  var root = document.documentElement, meta = document.querySelector('meta[name="theme-color"]');
  var syncTheme = function () {
    var light = root.getAttribute('data-theme') === 'light';
    $$('[data-theme-btn]').forEach(function (b) {
      b.setAttribute('aria-label', light ? '어두운 화면으로 보기' : '밝은 화면으로 보기');
      var l = b.querySelector('[data-theme-label]'); if (l) l.textContent = light ? '어두운 화면으로 보기' : '밝은 화면으로 보기';
    });
    if (meta) meta.setAttribute('content', light ? '#F5F6F8' : '#060709');
  };
  $$('[data-theme-btn]').forEach(function (b) {
    b.addEventListener('click', function () {
      var light = root.getAttribute('data-theme') !== 'light';
      if (!reduce) { root.classList.add('theme-anim'); setTimeout(function () { root.classList.remove('theme-anim'); }, 350); }
      if (light) root.setAttribute('data-theme', 'light'); else root.removeAttribute('data-theme');
      try { localStorage.setItem('ik-theme', light ? 'light' : 'dark'); } catch (e) {}
      syncTheme();
    });
  });
  syncTheme();

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

  /* 채팅 모양 상담 창: 말풍선으로 대화를 시작하고, 실제 상담은 카카오톡으로 이어감 */
  var chat = $('[data-chat]');
  if (chat) {
    var D = JSON.parse($('[data-chat-data]', chat).textContent);
    var log = $('[data-chat-log]', chat), ft = $('[data-chat-ft]', chat), fab = $('[data-chat-fab]');
    var opener = null, started = false, timers = [];
    var wait = function (ms) { return reduce ? 0 : ms; };
    var later = function (fn, ms) { timers.push(setTimeout(fn, wait(ms))); };
    var scroll = function () { log.scrollTop = log.scrollHeight; };
    var bubble = function (text, who) { var b = document.createElement('p'); b.className = 'cb cb-' + who; b.textContent = text; log.appendChild(b); scroll(); return b; };
    var typing = function () { var t = document.createElement('p'); t.className = 'cb cb-bot cb-typing'; t.setAttribute('aria-label', '입력 중'); t.innerHTML = '<span></span><span></span><span></span>'; log.appendChild(t); scroll(); return t; };
    /* 봇 말풍선 여러 개를 '입력 중' 표시와 함께 차례로 */
    var say = function (lines, done) {
      var i = 0;
      (function next() {
        if (i >= lines.length) { if (done) done(); return; }
        var t = typing();
        later(function () { t.remove(); bubble(lines[i++], 'bot'); later(next, 260); }, 520 + Math.min(lines[i].length * 12, 700));
      })();
    };
    var showOptions = function () {
      ft.innerHTML = '';
      var wrap = document.createElement('div'); wrap.className = 'chat-opts';
      D.options.forEach(function (o) {
        var b = document.createElement('button'); b.type = 'button'; b.className = 'chat-opt'; b.textContent = o.label;
        b.addEventListener('click', function () { pick(o); });
        wrap.appendChild(b);
      });
      ft.appendChild(wrap);
      var first = wrap.querySelector('button'); if (first && chat.contains(document.activeElement)) first.focus();
    };
    var pick = function (o) {
      ft.innerHTML = '';
      bubble(o.label, 'me');
      say([o.reply, D.next], function () { showHandoff(o); });
    };
    var showHandoff = function (o) {
      ft.innerHTML = '';
      var go = document.createElement('a'); go.className = 'chat-go'; go.href = D.kakao;
      if (D.ext) { go.target = '_blank'; go.rel = 'noopener'; }
      go.innerHTML = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4C7 4 3 7.1 3 11c0 2.5 1.6 4.6 4 5.9L6.2 20l3.7-2.3c.7.1 1.4.2 2.1.2 5 0 9-3.1 9-7s-4-7-9-7z"/></svg>카카오톡으로 이어서 상담하기';
      var row = document.createElement('div'); row.className = 'chat-row';
      var copy = document.createElement('button'); copy.type = 'button'; copy.className = 'chat-sub'; copy.textContent = '보낼 문구 복사';
      copy.addEventListener('click', function () {
        var text = D.copyTpl.replace('{label}', o.label);
        var ok = function () { copy.textContent = '복사했어요'; setTimeout(function () { copy.textContent = '보낼 문구 복사'; }, 2000); };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(ok, function () {}); else ok();
      });
      var back = document.createElement('button'); back.type = 'button'; back.className = 'chat-sub'; back.textContent = '처음으로';
      back.addEventListener('click', function () { reset(); start(); });
      row.appendChild(copy); row.appendChild(back);
      ft.appendChild(go); ft.appendChild(row);
      if (!D.hasKakao) { var n = document.createElement('p'); n.className = 'chat-note'; n.textContent = '시안: 카카오톡 채널 주소를 받으면 이 버튼이 카카오톡 채팅으로 바로 열립니다.'; ft.appendChild(n); }
      if (chat.contains(document.activeElement) || document.activeElement === document.body) go.focus();
    };
    var reset = function () { timers.forEach(clearTimeout); timers = []; log.innerHTML = ''; ft.innerHTML = ''; };
    var start = function () { started = true; say(D.hello, showOptions); };
    var open = function (from) {
      opener = from || null;
      chat.hidden = false; requestAnimationFrame(function () { chat.classList.add('is-open'); });
      body.classList.add('chat-open');
      if (fab) fab.setAttribute('aria-expanded', 'true');
      if (!started) start();
      $('[data-chat-close]', chat).focus();
    };
    var close = function () {
      chat.classList.remove('is-open'); body.classList.remove('chat-open');
      if (fab) fab.setAttribute('aria-expanded', 'false');
      setTimeout(function () { if (!chat.classList.contains('is-open')) chat.hidden = true; }, reduce ? 0 : 220);
      if (opener) opener.focus();
    };
    if (fab) { fab.setAttribute('aria-controls', 'chat'); fab.setAttribute('aria-expanded', 'false'); }
    $$('[data-chat-open]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        if (a === fab && !chat.hidden) close(); else open(a);
      });
    });
    $('[data-chat-close]', chat).addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !chat.hidden) close(); });
  }

  /* 후기 탭 */
  var tabs = $$('[data-rv-tab]');
  tabs.forEach(function (t, i) {
    var sel = function () {
      tabs.forEach(function (o) { var on = o === t; o.setAttribute('aria-selected', on ? 'true' : 'false'); o.tabIndex = on ? 0 : -1; document.getElementById(o.getAttribute('aria-controls')).hidden = !on; });
    };
    t.addEventListener('click', sel);
    t.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { var n = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length]; n.focus(); n.click(); } });
  });

  /* 업종을 골라 보는 사례 화면 */
  $$('[data-stories]').forEach(function (st) {
    var tabs = $$('[role="tab"]', st), count = $('[data-st-count]', st), cur = 0;
    var show = function (i, focus) {
      cur = (i + tabs.length) % tabs.length;
      tabs.forEach(function (t, k) {
        var on = k === cur; t.setAttribute('aria-selected', on ? 'true' : 'false'); t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
      if (count) count.textContent = (cur + 1) + ' / ' + tabs.length;
      if (focus) tabs[cur].focus();
      tabs[cur].scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
    };
    tabs.forEach(function (t, k) {
      t.addEventListener('click', function () { show(k); });
      t.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { e.preventDefault(); show(k + 1, true); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); show(k - 1, true); }
      });
    });
    var next = $('[data-st-next]', st);
    if (next) next.addEventListener('click', function () { show(cur + 1); });
  });
  /* 휴대폰 속 대화: 글자 말풍선 ↔ 실제 캡처 */
  $$('[data-chatswap]').forEach(function (b) {
    b.addEventListener('click', function () {
      var ph = b.closest('.st-phone'), img = b.getAttribute('aria-pressed') !== 'true';
      $('.st-chat-text', ph).hidden = img; $('.st-chat-img', ph).hidden = !img;
      b.setAttribute('aria-pressed', img ? 'true' : 'false'); b.textContent = img ? '글자로 보기' : '실제 캡처로 보기';
    });
  });

  /* 고르기 버튼 (고객후기: 반응 / 포트폴리오: 업종) */
  $$('[data-flt]').forEach(function (bar) {
    var id = bar.getAttribute('data-flt'), box = $('[data-flt-items="' + id + '"]'), btns = $$('button', bar);
    if (!box) return;
    var limit = +box.getAttribute('data-flt-limit') || 0, more = $('[data-flt-more="' + id + '"]'), open = !limit, v = 'all';
    var apply = function () {
      $$('[data-f]', box).forEach(function (it, i) { it.hidden = (v !== 'all' && (' ' + it.getAttribute('data-f') + ' ').indexOf(' ' + v + ' ') < 0) || (v === 'all' && !open && i >= limit); });
      if (more) more.parentNode.hidden = open || v !== 'all';
    };
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        v = b.getAttribute('data-v');
        btns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        apply();
      });
    });
    if (more) more.addEventListener('click', function () { open = true; apply(); var n = $$('[data-f]', box)[limit]; if (n) { var a = n.querySelector('a'); if (a) a.focus({ preventScroll: true }); } });
    apply();
  });

  /* 후기 크게 보기 */
  var dlg = $('[data-lb-dialog]');
  var shots = $$('[data-lb]');
  if (dlg && shots.length && dlg.showModal) {
    var lbImg = $('[data-lb-img]', dlg), lbCap = $('[data-lb-cap]', dlg), cur = 0, opener = null;
    var vis = shots; /* 같은 섹션에서 보이는 것만 넘겨 보기 (고르기 버튼으로 숨긴 것은 뺌) */
    var show = function (i) { cur = (i + vis.length) % vis.length; var a = vis[cur]; lbImg.src = a.getAttribute('href'); lbImg.alt = a.getAttribute('data-cap') || ''; lbCap.textContent = (a.getAttribute('data-cap') || '') + '  ·  ' + (cur + 1) + ' / ' + vis.length; };
    shots.forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); opener = a; var sc = a.closest('[data-lb-scope]') || a.closest('section') || document.body; vis = shots.filter(function (x) { return sc.contains(x) && x.offsetParent !== null && !x.closest('[aria-hidden="true"]'); }); var at = vis.indexOf(a); if (at < 0) at = vis.findIndex(function (x) { return x.getAttribute('href') === a.getAttribute('href'); }); show(Math.max(0, at)); dlg.showModal(); }); });
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
