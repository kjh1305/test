/* =========================================================
   Plotline — 마케팅 회사 홈페이지 시안
   ========================================================= */
(() => {
  'use strict';

  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));
  const root = document.documentElement;
  const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reduced = () => reduceQuery.matches;
  const hasIO = 'IntersectionObserver' in window;

  /* ---------- 첫 화면 등장: 글꼴이 준비된 뒤 시작 ---------- */
  const markReady = () => requestAnimationFrame(() => root.classList.add('is-ready'));
  if (document.fonts && document.fonts.ready) {
    Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 900))]).then(markReady);
  } else {
    markReady();
  }

  /* ---------- Toast ---------- */
  const toastEl = $('.toast');
  let toastTimer = 0;
  function toast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-visible'), 4600);
  }

  /* ---------- 스크롤 작업 (rAF로 한 번에) ---------- */
  const scrollTasks = [];
  let ticking = false;
  function runScrollTasks() {
    ticking = false;
    scrollTasks.forEach(fn => fn());
  }
  function requestTick() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(runScrollTasks);
  }
  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', requestTick);

  /* ---------- Header: 어두운 구간 위에서는 흰 글씨 ---------- */
  const header = $('.site-header');
  const darkSections = $$('[data-dark]');
  scrollTasks.push(() => {
    const probe = header.offsetHeight / 2;
    let onDark = false;
    for (const section of darkSections) {
      const r = section.getBoundingClientRect();
      if (r.top <= probe && r.bottom > probe) { onDark = true; break; }
    }
    header.classList.toggle('on-dark', onDark);
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  });

  /* ---------- Mobile menu ---------- */
  const menuToggle = $('.menu-toggle');
  const mobileMenu = $('#mobile-menu');
  function setMenu(open) {
    menuToggle.setAttribute('aria-expanded', String(open));
    $('.sr-only', menuToggle).textContent = open ? '메뉴 닫기' : '메뉴 열기';
    mobileMenu.hidden = !open;
    mobileMenu.classList.toggle('is-open', open);
    root.classList.toggle('is-locked', open);
    header.classList.toggle('menu-open', open);
  }
  menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
  $$('a', mobileMenu).forEach(a => a.addEventListener('click', () => setMenu(false)));
  window.matchMedia('(min-width: 960px)').addEventListener('change', e => { if (e.matches) setMenu(false); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuToggle.focus();
    }
  });

  /* ---------- 숫자 올라가기 ---------- */
  function parseCount(text) {
    const m = text.match(/^(\D*?)(\d[\d,]*(?:\.\d+)?)(.*)$/s);
    if (!m) return null;
    const [, pre, num, suf] = m;
    return {
      pre, suf,
      value: parseFloat(num.replace(/,/g, '')),
      decimals: (num.split('.')[1] || '').length,
      commas: num.includes(',')
    };
  }
  function countUp(el) {
    if (!el || el.dataset.counted) return;
    el.dataset.counted = '1';
    const final = el.textContent;
    const c = parseCount(final);
    if (!c || reduced()) return;
    const fmt = v => c.pre + (c.commas
      ? v.toLocaleString('en-US', { minimumFractionDigits: c.decimals, maximumFractionDigits: c.decimals })
      : v.toFixed(c.decimals)) + c.suf;
    const duration = 1400;
    const start = performance.now();
    const frame = now => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = t < 1 ? fmt(c.value * eased) : final;
      if (t < 1) requestAnimationFrame(frame);
    };
    el.textContent = fmt(0);
    requestAnimationFrame(frame);
  }
  const counters = $$('[data-count]').filter(el => !el.closest('.scenes'));
  if (hasIO) {
    const cio = new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      countUp(e.target);
      cio.unobserve(e.target);
    }), { threshold: 0.6 });
    counters.forEach(el => cio.observe(el));
  }

  /* ---------- 스크롤하면 나타나기 ---------- */
  const reveals = $$('[data-reveal]');
  if (hasIO && !reduced()) {
    // clip-path로 완전히 가려진 요소는 교차가 0으로 계산되므로, 닦아내기는 부모를 관찰합니다.
    const targets = new Map();
    reveals.forEach(el => {
      const target = el.dataset.reveal === 'wipe' ? el.parentElement : el;
      if (!targets.has(target)) targets.set(target, []);
      targets.get(target).push(el);
    });
    const rio = new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      targets.get(e.target).forEach(el => el.classList.add('is-in'));
      rio.unobserve(e.target);
    }), { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    targets.forEach((_, target) => rio.observe(target));
  } else {
    reveals.forEach(el => el.classList.add('is-in'));
  }

  /* ---------- 끝없이 흐르는 벽과 로고 띠 ---------- */
  $$('.wall-track, .marquee-track').forEach(track => {
    Array.from(track.children).forEach(child => {
      const clone = child.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
    track.classList.add('is-looping');
  });
  if (hasIO) {
    const pio = new IntersectionObserver(entries => entries.forEach(e => {
      e.target.classList.toggle('is-paused', !e.isIntersecting);
    }));
    $$('.hero-main, .clients').forEach(el => pio.observe(el));
  }

  /* ---------- 메인: 스크롤 연동 세 장면 ---------- */
  const scenes = $('.scenes');
  if (scenes) {
    const TIMELINE = {
      1: [[0, 's1-scroll'], [1900, 's1-thumb']],
      2: [[350, 's2-save'], [800, 's2-toast'], [1750, 's2-comment']],
      3: [[400, 's3-press'], [760, 's3-sheet'], [1150, 's3-check']]
    };
    const played = new Set();
    let current = 0;

    const endState = n => { played.add(n); scenes.classList.add(...TIMELINE[n].map(s => s[1])); };
    function setStep(n) {
      if (n === current) return;
      current = n;
      scenes.dataset.step = String(n);
      for (let k = 1; k < n; k++) if (!played.has(k)) endState(k);
      if (!played.has(n)) {
        if (reduced()) endState(n);
        else {
          played.add(n);
          TIMELINE[n].forEach(([t, cls]) => setTimeout(() => scenes.classList.add(cls), t));
        }
      }
      countUp($(`.scene-step[data-step="${n}"] [data-count]`, scenes));
    }
    scrollTasks.push(() => {
      const r = scenes.getBoundingClientRect();
      const total = scenes.offsetHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      scenes.style.setProperty('--p', p.toFixed(4));
      if (r.top < window.innerHeight * 0.55 && r.bottom > 0) setStep(p < 0.34 ? 1 : p < 0.67 ? 2 : 3);
    });
  }

  /* ---------- 메인: 단어가 하나씩 진해지는 문장 ---------- */
  const scrub = $('[data-scrub]');
  if (scrub && !reduced()) {
    const words = $$('.mw', scrub);
    let lit = -1;
    scrub.classList.add('is-scrub');
    scrollTasks.push(() => {
      const r = scrub.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
      const n = Math.round(p * words.length);
      if (n === lit) return;
      words.forEach((w, i) => w.classList.toggle('is-lit', i < n));
      lit = n;
    });
  }

  /* ---------- 메인: 위로 쌓이는 서비스 카드 ---------- */
  const stackEl = $('.stack');
  if (stackEl) {
    const cards = $$('.stack-card', stackEl);
    let tops = [];
    const measureTops = () => { tops = cards.map(c => parseFloat(getComputedStyle(c).top) || 0); };
    measureTops();
    window.addEventListener('resize', measureTops);
    scrollTasks.push(() => {
      const sr = stackEl.getBoundingClientRect();
      if (sr.bottom < 0 || sr.top > window.innerHeight) return;
      for (let i = 0; i < cards.length - 1; i++) {
        const d = cards[i + 1].getBoundingClientRect().top - tops[i + 1];
        const t = Math.min(1, Math.max(0, 1 - d / cards[i].offsetHeight));
        cards[i].style.setProperty('--t', t.toFixed(3));
      }
    });
  }

  /* ---------- 메인: 세로 스크롤로 넘기는 사례 ---------- */
  const hwork = $('.hwork');
  if (hwork) {
    const track = $('.hwork-track', hwork);
    const hcards = $$('.hcard', hwork);
    const currentEl = $('.hwork-current', hwork);
    const bar = $('.hwork-progress', hwork);
    let total = 0;
    const measureWork = () => {
      total = Math.max(0, track.scrollWidth - window.innerWidth);
      hwork.style.height = `${total + window.innerHeight}px`;
      requestTick();
    };
    measureWork();
    window.addEventListener('resize', measureWork);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measureWork);
    scrollTasks.push(() => {
      const range = hwork.offsetHeight - window.innerHeight;
      const p = range > 0 ? Math.min(1, Math.max(0, -hwork.getBoundingClientRect().top / range)) : 0;
      track.style.transform = `translate3d(${(-p * total).toFixed(1)}px, 0, 0)`;
      bar.style.setProperty('--p', p.toFixed(4));
      currentEl.textContent = String(Math.min(hcards.length, Math.round(p * (hcards.length - 1)) + 1));
    });
    // 키보드로 카드에 들어오면 그 카드가 보이는 위치로 페이지를 옮깁니다.
    track.addEventListener('focusin', e => {
      const card = e.target.closest('.hcard');
      if (!card || !total) return;
      const pad = parseFloat(getComputedStyle(track).paddingLeft) || 0;
      const p = Math.min(1, Math.max(0, (card.offsetLeft - pad) / total));
      const top = hwork.getBoundingClientRect().top + window.scrollY + p * (hwork.offsetHeight - window.innerHeight);
      window.scrollTo({ top, behavior: 'auto' });
    });
  }

  /* ---------- 메인: 스크롤에 맞춰 그려지는 일하는 방식 ---------- */
  const pline = $('[data-pline]');
  if (pline) {
    const steps = $$('.pl-step', pline);
    scrollTasks.push(() => {
      const r = pline.getBoundingClientRect();
      const mark = window.innerHeight * 0.6;
      const p = Math.min(1, Math.max(0, (mark - r.top) / r.height));
      pline.style.setProperty('--p', p.toFixed(4));
      steps.forEach(s => s.classList.toggle('is-on', s.getBoundingClientRect().top < mark));
    });
  }

  /* ---------- 메인: 스크롤 속도에 맞춰 흐르는 큰 문구 ---------- */
  const vband = $('.vband');
  if (vband && hasIO && !reduced()) {
    const rows = $$('.vrow', vband).map(row => {
      const t = $('.vtrack', row);
      Array.from(t.children).forEach(child => t.appendChild(child.cloneNode(true)));
      return { track: t, dir: Number(row.dataset.dir) || 1, x: 0, half: 0 };
    });
    const measureBand = () => rows.forEach(r => {
      r.half = r.track.scrollWidth / 2;
      if (r.dir < 0 && r.x === 0) r.x = -r.half * 0.37; // 두 줄의 시작 위치를 엇갈리게
    });
    measureBand();
    window.addEventListener('resize', measureBand);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measureBand);
    let running = false;
    let lastY = window.scrollY;
    let velocity = 0;
    const tick = () => {
      if (!running) return;
      const y = window.scrollY;
      velocity += (Math.min(90, Math.abs(y - lastY)) - velocity) * 0.12;
      lastY = y;
      rows.forEach(r => {
        r.x -= (0.7 + velocity * 0.55) * r.dir;
        if (r.half) {
          while (r.x <= -r.half) r.x += r.half;
          while (r.x > 0) r.x -= r.half;
        }
        r.track.style.transform = `translate3d(${r.x.toFixed(1)}px, 0, 0)`;
      });
      requestAnimationFrame(tick);
    };
    new IntersectionObserver(entries => {
      const visible = entries[entries.length - 1].isIntersecting;
      if (visible && !running) {
        running = true;
        lastY = window.scrollY;
        requestAnimationFrame(tick);
      } else if (!visible) {
        running = false;
      }
    }).observe(vband);
  }

  /* ---------- 패럴랙스 ---------- */
  const parallaxEls = $$('[data-parallax]');
  if (parallaxEls.length && hasIO && !reduced()) {
    const active = new Set();
    const paio = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) active.add(e.target); else active.delete(e.target);
    }), { rootMargin: '15% 0px' });
    parallaxEls.forEach(el => paio.observe(el));
    scrollTasks.push(() => {
      const vh = window.innerHeight;
      active.forEach(el => {
        const r = el.parentElement.getBoundingClientRect();
        const speed = parseFloat(el.dataset.parallax) || 0.06;
        const offset = (r.top + r.height / 2 - vh / 2) * -speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
    });
  }

  /* ---------- 따라다니는 커서 ---------- */
  const bubble = $('.cursor-bubble');
  if (bubble && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const label = $('span', bubble);
    let x = -200, y = -200, tx = -200, ty = -200, raf = 0;
    const loop = () => {
      const k = reduced() ? 1 : 0.2;
      x += (tx - x) * k;
      y += (ty - y) * k;
      bubble.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.3 ? requestAnimationFrame(loop) : 0;
    };
    window.addEventListener('pointermove', e => {
      tx = e.clientX; ty = e.clientY;
      if (!bubble.classList.contains('is-on')) { x = tx; y = ty; }
      if (!raf) raf = requestAnimationFrame(loop);
    }, { passive: true });
    document.addEventListener('pointerover', e => {
      const target = e.target.closest('[data-cursor]');
      if (!target) return;
      label.textContent = target.dataset.cursor;
      bubble.classList.add('is-on');
    });
    document.addEventListener('pointerout', e => {
      const target = e.target.closest('[data-cursor]');
      if (target && !target.contains(e.relatedTarget)) bubble.classList.remove('is-on');
    });
  }

  /* ---------- 포트폴리오 필터 ---------- */
  const grid = $('.work-grid');
  if (grid) {
    const cards = $$('.case-card', grid);
    const countEl = $('.result-count');
    const emptyEl = $('.work-empty');
    const groups = $$('.chips[data-filter]');
    const state = { service: '전체', industry: '전체' };
    const valid = key => $$(`.chips[data-filter="${key}"] .chip`).map(c => c.dataset.value);
    const params = new URLSearchParams(location.search);
    ['service', 'industry'].forEach(key => {
      const v = params.get(key);
      if (v && valid(key).includes(v)) state[key] = v;
    });

    function apply(animate) {
      let n = 0;
      cards.forEach(card => {
        const ok = (state.service === '전체' || card.dataset.services.split('|').includes(state.service))
          && (state.industry === '전체' || card.dataset.industry === state.industry);
        card.hidden = !ok;
        card.classList.remove('is-entering');
        if (ok) {
          if (animate && !reduced()) {
            void card.offsetWidth;
            card.style.setProperty('--i', n);
            card.classList.add('is-entering');
          }
          n++;
        }
      });
      countEl.innerHTML = `사례 <strong>${n}</strong>개`;
      emptyEl.hidden = n > 0;
      groups.forEach(g => $$('.chip', g).forEach(chip =>
        chip.setAttribute('aria-pressed', String(state[g.dataset.filter] === chip.dataset.value))));
      const q = new URLSearchParams();
      if (state.service !== '전체') q.set('service', state.service);
      if (state.industry !== '전체') q.set('industry', state.industry);
      history.replaceState(null, '', `${location.pathname}${q.toString() ? `?${q}` : ''}`);
    }
    groups.forEach(g => g.addEventListener('click', e => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      state[g.dataset.filter] = chip.dataset.value;
      apply(true);
    }));
    $('[data-reset-filters]').addEventListener('click', () => {
      state.service = '전체';
      state.industry = '전체';
      apply(true);
    });
    apply(false);
  }

  /* ---------- 서비스 페이지: 현재 위치 표시 ---------- */
  const svcNav = $('.svc-nav');
  if (svcNav && hasIO) {
    const links = $$('a', svcNav);
    const sio = new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(a => a.setAttribute('aria-current', String(a.hash === `#${e.target.id}`)));
    }), { rootMargin: '-35% 0px -60% 0px' });
    $$('.svc-item').forEach(s => sio.observe(s));
  }

  /* ---------- 글 읽기 진행 막대 ---------- */
  const progress = $('.read-progress');
  const article = $('.article-body');
  if (progress && article) {
    scrollTasks.push(() => {
      const r = article.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.5;
      const p = total > 0 ? Math.min(1, Math.max(0, (window.innerHeight * 0.5 - r.top) / total)) : 0;
      progress.style.setProperty('--p', p.toFixed(4));
    });
  }

  /* ---------- 문의 폼 ---------- */
  const form = $('.contact-form');
  if (form) {
    const RULES = {
      company: v => (v.trim() ? '' : '회사명을 입력해 주세요.'),
      name: v => (v.trim() ? '' : '담당자 이름을 입력해 주세요.'),
      phone: v => {
        if (!v.trim()) return '연락처를 입력해 주세요.';
        return /^0\d{1,2}-?\d{3,4}-?\d{4}$/.test(v.trim()) ? '' : '연락처를 010-0000-0000 형식으로 입력해 주세요.';
      },
      email: v => (!v.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : '이메일 주소 형식을 확인해 주세요.'),
      message: v => (v.trim().length >= 5 ? '' : '문의 내용을 5자 이상 적어 주세요.')
    };
    const PRIVACY_MSG = '개인정보 수집과 이용에 동의해 주세요.';
    const setError = (name, message) => {
      $(`#e-${name}`, form).textContent = message;
      form.elements[name].setAttribute('aria-invalid', message ? 'true' : 'false');
    };

    form.addEventListener('submit', e => {
      e.preventDefault();
      let firstInvalid = null;
      Object.entries(RULES).forEach(([name, rule]) => {
        const message = rule(form.elements[name].value);
        setError(name, message);
        if (message && !firstInvalid) firstInvalid = form.elements[name];
      });
      const privacy = form.elements.privacy;
      setError('privacy', privacy.checked ? '' : PRIVACY_MSG);
      if (!privacy.checked && !firstInvalid) firstInvalid = privacy;
      if (firstInvalid) { firstInvalid.focus(); return; }

      form.reset();
      $$('[aria-invalid]', form).forEach(el => el.removeAttribute('aria-invalid'));
      toast('문의 내용을 확인했어요. 시안이라 실제로 전송되지는 않고, 실제 사이트에서는 담당자 메일로 바로 전달됩니다.');
    });
    form.addEventListener('input', e => {
      const { name } = e.target;
      if (e.target.getAttribute('aria-invalid') !== 'true') return;
      if (RULES[name]) setError(name, RULES[name](e.target.value));
      if (name === 'privacy') setError('privacy', e.target.checked ? '' : PRIVACY_MSG);
    });

    // 사례나 서비스 페이지에서 넘어온 경우 미리 채우기
    const params = new URLSearchParams(location.search);
    const boxes = $$('input[name="services"]', form);
    let mapData = {};
    try { mapData = JSON.parse($('#case-map').textContent); } catch (err) { mapData = {}; }
    const fromCase = mapData[params.get('case')];
    const fromService = params.get('service');
    if (fromCase) {
      boxes.forEach(b => { b.checked = fromCase.services.includes(b.value); });
      form.elements.message.value = `${fromCase.brand} 사례처럼 ${fromCase.services.join(', ')} 상담을 받고 싶어요.\n`;
      toast(`${fromCase.brand} 사례를 보고 오셨네요. 관심 서비스와 문의 내용을 미리 채워 뒀어요.`);
    } else if (fromService && boxes.some(b => b.value === fromService)) {
      boxes.forEach(b => { b.checked = b.value === fromService; });
      toast(`관심 서비스에서 ${fromService} 항목을 골라 뒀어요.`);
    }
  }

  requestTick();
})();
