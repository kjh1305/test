/* =========================================================
   메인 페이지
   첫 화면 → 로고 띠 → 선언문 → 세 장면 → 숫자 → 서비스 카드 → 가로 사례
   → 시작 전과 후 → 일하는 방식 → 인사이트 → 큰 글자 띠 → 문의
   ========================================================= */
import {
  SITE, STATS, WALL, SCENES, SERVICES, CASES, POSTS, PROCESS,
  MANIFESTO, STACK, RESULTS, REPORT, BAND
} from './data.mjs';
import { BRANDS, creative } from './creatives.mjs';
import { page, ctaBand, postRow, phone, lines, rootFor } from './components.mjs';

const fmt = n => n.toLocaleString('en-US');

function hero(R) {
  const durations = [62, 76, 68, 84];
  const wall = WALL.map((col, ci) => `<div class="wall-col${ci % 2 ? ' is-down' : ''}" style="--dur:${durations[ci]}s">
      <div class="wall-track">${col.map(id => `<div class="wall-item">${creative(id, 'feed', { decorative: true })}</div>`).join('')}</div>
    </div>`).join('');
  return `<section class="hero-main" data-dark>
  <div class="hero-wall" aria-hidden="true"><div class="wall-grid">${wall}</div></div>
  <div class="wrap hero-inner">
    <h1 class="hero-title">${lines(['고객이 스크롤을', '멈추는 순간부터', '결제 버튼을 누르는', '순간까지.'])}</h1>
    <p class="hero-lede">플롯라인은 그 사이의 장면을 설계하는 마케팅 회사입니다. 광고 집행, 콘텐츠 제작, 데이터 분석을 한&nbsp;팀이 맡습니다.</p>
    <div class="hero-actions">
      <a class="btn btn-light btn-lg" href="${R}contact/">문의하기</a>
      <a class="btn btn-ghost-light btn-lg" href="${R}work/">사례 보기</a>
    </div>
  </div>
  <p class="wall-note" aria-hidden="true">
    <svg viewBox="0 0 70 44"><path d="M4 38 C 20 40, 44 30, 60 8"/><path d="M50 9.5 L 60.5 7.5 L 60 18"/></svg>
    <span>이번 달 운영 중인 광고 소재</span>
  </p>
  <a class="scroll-cue" href="#manifesto"><span>아래로 내려 보기</span><i aria-hidden="true"></i></a>
</section>`;
}

function clients() {
  const marks = Object.values(BRANDS).map(b => {
    const w = b.word;
    return `<li style="font-family:${w.family};font-weight:${w.weight};letter-spacing:${w.spacing}em;${w.italic ? 'font-style:italic;' : ''}">${w.text}</li>`;
  }).join('');
  return `<section class="clients" aria-labelledby="clients-title">
  <div class="wrap clients-head">
    <h2 id="clients-title">함께한 브랜드</h2>
    <p>2019년부터 브랜드 140곳과 일했습니다.</p>
  </div>
  <div class="marquee"><ul class="marquee-track">${marks}${marks}</ul></div>
</section>`;
}

function manifesto() {
  const words = MANIFESTO.split(' ').map(w => `<span class="mw">${w}</span>`).join(' ');
  return `<section class="manifesto" id="manifesto" aria-label="플롯라인이 하는 일">
  <div class="wrap"><p class="manifesto-text" data-scrub>${words}</p></div>
</section>`;
}

function scenes(R) {
  return `<section class="scenes" id="scenes" data-step="1" aria-labelledby="scenes-title">
  <div class="scenes-sticky">
    <div class="wrap scenes-grid">
      <div class="scenes-copy">
        <h2 class="scenes-title" id="scenes-title">광고 한 편이 <br>매출이 되기까지</h2>
        <p class="scenes-sub">데이미스트 캠페인에서 고객이 지나간 세 장면입니다.</p>
        <ol class="scene-steps">
          ${SCENES.map((s, i) => `<li class="scene-step" data-step="${i + 1}">
            <p class="scene-pen">${i + 1}. ${s.pen}</p>
            <p class="scene-desc">${s.desc}</p>
            <p class="scene-metric">${s.metricLabel} <strong data-count>${s.metric}</strong></p>
          </li>`).join('')}
        </ol>
        <a class="text-link scenes-link" href="${R}work/daymist/">데이미스트 캠페인 자세히 보기</a>
      </div>
      <div class="scenes-stage">
        ${phone()}
        <div class="scene-rail" aria-hidden="true"><span style="--k:0"></span><span style="--k:1"></span><span style="--k:2"></span></div>
      </div>
    </div>
  </div>
</section>`;
}

function stats() {
  return `<section class="section stats tone-mist" aria-labelledby="stats-title">
  <div class="wrap">
    <h2 class="stats-lead" id="stats-title" data-reveal>광고를 맡긴 브랜드 열 곳 중 일곱 곳이 다음 해에도 함께합니다.</h2>
    <ul class="stat-list">
      ${STATS.map((s, i) => `<li data-reveal style="--d:${i}"><strong data-count>${s.value}</strong><span>${s.label}</span></li>`).join('')}
    </ul>
  </div>
</section>`;
}

function serviceStack(R) {
  const cards = SERVICES.map((s, i) => {
    const st = STACK[s.id];
    const fan = st.visuals.map((id, k) => `<span class="fan-card" style="--k:${k}">${creative(id, 'feed', { decorative: true })}</span>`).join('');
    return `<li class="stack-card tone-${st.tone}" style="--i:${i}">
      <div class="stack-copy">
        <h3 class="stack-name">${s.name}</h3>
        <p class="stack-desc">${s.long}</p>
        <ul class="stack-tags">${s.work.map(w => `<li>${w}</li>`).join('')}</ul>
        <p class="stack-kpi"><span>같이 보는 숫자</span>${s.kpi}</p>
        <a class="stack-link" href="${R}services/#${s.id}">${s.name} 자세히 보기</a>
      </div>
      <div class="stack-visual fan-${st.visuals.length}" aria-hidden="true">${fan}</div>
    </li>`;
  }).join('');
  return `<section class="section stack-sec" aria-labelledby="svc-title">
  <div class="wrap">
    <div class="section-head">
      <h2 id="svc-title" data-reveal="lines">${lines(['광고부터 콘텐츠, 데이터까지', '한 팀이 맡습니다'])}</h2>
      <a class="text-link" href="${R}services/">서비스 자세히 보기</a>
    </div>
    <ul class="stack">${cards}</ul>
  </div>
</section>`;
}

function workScroller(R) {
  const cards = CASES.map(c => `<li class="hcard"><a class="hcard-link" href="${R}work/${c.id}/" data-cursor="자세히 보기">
      <span class="hcard-thumb">${creative(c.id, 'feed', { decorative: true })}</span>
      <span class="hcard-meta"><span>${c.brand}</span><span>${c.industry}</span></span>
      <h3 class="hcard-title">${c.title}</h3>
      <span class="hcard-result"><span class="hl">${c.card}</span></span>
    </a></li>`).join('');
  return `<section class="hwork" data-dark aria-labelledby="hwork-title">
  <div class="hwork-sticky">
    <div class="wrap hwork-head">
      <h2 class="hwork-title" id="hwork-title">브랜드마다 <br>다른 장면을 설계했습니다</h2>
      <div class="hwork-side">
        <p class="hwork-count" aria-hidden="true"><span class="hwork-current">1</span> / ${CASES.length}</p>
        <a class="text-link" href="${R}work/">포트폴리오 전체 보기</a>
      </div>
    </div>
    <div class="hwork-viewport"><ul class="hwork-track">${cards}</ul></div>
    <div class="wrap"><div class="hwork-progress" aria-hidden="true"><span></span></div></div>
  </div>
</section>`;
}

function results() {
  const rows = RESULTS.map(r => {
    const c = CASES.find(x => x.id === r.id);
    const mult = (r.after / r.before).toFixed(1).replace(/\.0$/, '');
    return `<li class="ba-row" data-reveal="bars">
      <p class="ba-label"><span class="ba-brand">${c.brand}</span><span class="ba-metric">${r.metric}</span></p>
      <div class="ba-bars">
        <div class="ba-bar is-before" style="--w:${(r.before / r.after).toFixed(4)}"><span class="ba-fill"></span><span class="ba-val"><span class="sr-only">시작 전 </span>${fmt(r.before)}${r.unit}</span></div>
        <div class="ba-bar is-after" style="--w:1"><span class="ba-fill"></span><span class="ba-val"><span class="sr-only">함께한 뒤 </span><strong data-count>${fmt(r.after)}${r.unit}</strong></span></div>
      </div>
      <p class="ba-mult"><strong>${mult}배</strong></p>
    </li>`;
  }).join('');
  return `<section class="section results-sec" aria-labelledby="results-title">
  <div class="wrap">
    <div class="section-head">
      <h2 id="results-title" data-reveal="lines">${lines(['시작 전과 후'])}</h2>
      <p>사례마다 가장 먼저 바꾸고 싶었던 숫자입니다. 막대 길이는 사례마다 함께한 뒤의 숫자를 기준으로 그렸습니다.</p>
    </div>
    <div class="ba-legend" aria-hidden="true"><span class="lg is-before">시작 전</span><span class="lg is-after">플롯라인과 함께한 뒤</span></div>
    <ul class="ba-list">${rows}</ul>
  </div>
</section>`;
}

function reportChart() {
  const W = 320, H = 146, base = 112, top = 26, colW = 22;
  const step = W / REPORT.days.length;
  const max = Math.max(...REPORT.days.map(d => d[1]));
  let bars = '', labels = '';
  REPORT.days.forEach(([day, v], i) => {
    const x = i * step + (step - colW) / 2;
    const y = base - (v / max) * (base - top);
    const r = 4;
    const d = `M${x.toFixed(1)} ${base} V${(y + r).toFixed(1)} Q${x.toFixed(1)} ${y.toFixed(1)} ${(x + r).toFixed(1)} ${y.toFixed(1)} H${(x + colW - r).toFixed(1)} Q${(x + colW).toFixed(1)} ${y.toFixed(1)} ${(x + colW).toFixed(1)} ${(y + r).toFixed(1)} V${base} Z`;
    bars += `<path class="day-bar${v === max ? ' is-max' : ''}" style="--i:${i}" d="${d}"><title>${day}요일 ${v}만 원</title></path>`;
    labels += `<text class="day-label" x="${(x + colW / 2).toFixed(1)}" y="${base + 22}" text-anchor="middle">${day}</text>`;
    if (v === max) labels += `<text class="max-label" x="${(x + colW / 2).toFixed(1)}" y="${(y - 9).toFixed(1)}" text-anchor="middle">${v}</text>`;
  });
  const total = REPORT.days.reduce((s, d) => s + d[1], 0);
  return `<svg class="day-chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="요일별 매출, 합계 ${fmt(total)}만 원, 토요일이 ${max}만 원으로 가장 높음">
    <line class="axis" x1="0" y1="${base}" x2="${W}" y2="${base}"/>${bars}${labels}
  </svg>`;
}

function process() {
  const steps = PROCESS.map((s, i) => `<li class="pl-step" data-i="${i}">
      <span class="pl-mark" aria-hidden="true"></span>
      <p class="pl-when">${s.when}</p>
      <h3 class="pl-title">${s.title}</h3>
      <p class="pl-text">${s.text}</p>
    </li>`).join('');
  const kpis = REPORT.kpis.map(k => `<div><dt>${k.label}</dt><dd><strong data-count>${k.value}</strong><span class="delta">전주 대비 ${k.delta}</span></dd></div>`).join('');
  const todo = REPORT.todo.map((t, i) => `<li style="--i:${i}"><span class="todo-box" aria-hidden="true"></span>${t}</li>`).join('');
  return `<section class="section process-sec tone-mist" aria-labelledby="process-title">
  <div class="wrap">
    <div class="section-head">
      <h2 id="process-title" data-reveal="lines">${lines(['광고를 켜기까지 3주,', '그다음은 매주'])}</h2>
      <p>첫 미팅부터 광고를 켜기까지 3주가 걸립니다. 그다음부터는 매주 월요일 아침에 리포트를 보내 드립니다.</p>
    </div>
    <div class="pl-layout">
      <ol class="pl-steps" data-pline>${steps}</ol>
      <aside class="report" data-reveal="report" aria-label="주간 리포트 예시">
        <div class="report-head">
          <div>
            <p class="report-title">주간 리포트</p>
            <p class="report-sub">${REPORT.brand}, ${REPORT.period}</p>
          </div>
          <span class="report-badge">예시</span>
        </div>
        <dl class="report-kpis">${kpis}</dl>
        <figure class="report-chart">
          <figcaption>요일별 매출 (만 원)</figcaption>
          ${reportChart()}
        </figure>
        <div class="report-todo">
          <p class="todo-title">이번 주에 바꿀 것</p>
          <ul>${todo}</ul>
        </div>
      </aside>
    </div>
  </div>
</section>`;
}

function insights(R) {
  return `<section class="section" aria-labelledby="insights-title">
  <div class="wrap">
    <div class="section-head">
      <h2 id="insights-title" data-reveal="lines">${lines(['인사이트'])}</h2>
      <a class="text-link" href="${R}insights/">인사이트 전체 보기</a>
    </div>
    <ul class="post-rows">${POSTS.slice(0, 3).map(p => postRow(p, R)).join('')}</ul>
  </div>
</section>`;
}

function band() {
  const items = BAND.map(t => `<span class="vitem">${t}</span><span class="vsep" aria-hidden="true"></span>`).join('');
  return `<section class="vband" aria-label="플롯라인이 설계하는 장면">
  <p class="sr-only">${BAND.join(', ')}</p>
  <div class="vrow" data-dir="1" aria-hidden="true"><div class="vtrack">${items}${items}</div></div>
  <div class="vrow is-outline" data-dir="-1" aria-hidden="true"><div class="vtrack">${items}${items}</div></div>
</section>`;
}

export function homePage() {
  const path = '';
  const R = rootFor(path);
  const main = [
    hero(R), clients(), manifesto(), scenes(R), stats(), serviceStack(R),
    workScroller(R), results(), process(), insights(R), band(), ctaBand(R)
  ].join('\n\n');
  return page({ path, title: '', description: SITE.description, bodyClass: 'is-home', main });
}
