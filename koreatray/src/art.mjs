/* =========================================================
   그림: 아이소메트릭 제품 일러스트, 칼선 도면, 아이콘
   ========================================================= */

const C = Math.cos(Math.PI / 6);
const S = 0.5;
const f = n => +n.toFixed(1);

export const K = {
  ink: '#18211D', paper: '#FBF8F2', inner: '#F6EEE1', innerL: '#ECDFCB', innerR: '#E3D2B8',
  kraft: '#C6935E', kraftL: '#D6AB78', kraftD: '#AC7A45', kraftT: '#E4C59C',
  green: '#0F3327', green7: '#1D5B44', leaf: '#2F8A63', magenta: '#E2007A',
  gold: '#CF9342', goldD: '#A9682A', bun: '#E2AE66', bunD: '#BF8641', sausage: '#B4572F',
  mustard: '#E8B931', rice: '#FFFDF8', veg: '#79A468', vegD: '#4F7D45', red: '#C9583F', cyan: '#00A0DC', yellow: '#FFD23F'
};
const SW = `stroke="${K.ink}" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round"`;
const THIN = `stroke="${K.ink}" stroke-width="1" stroke-linejoin="round" stroke-linecap="round"`;

export class Iso {
  constructor() { this.parts = []; this.b = [Infinity, Infinity, -Infinity, -Infinity]; }
  p(x, y, z = 0) {
    const X = (x - y) * C, Y = (x + y) * S - z, b = this.b;
    if (X < b[0]) b[0] = X; if (Y < b[1]) b[1] = Y; if (X > b[2]) b[2] = X; if (Y > b[3]) b[3] = Y;
    return [f(X), f(Y)];
  }
  poly(list, attr = '') { this.parts.push(`<path d="M${list.map(q => this.p(...q).join(' ')).join('L')}Z" ${attr}/>`); return this; }
  path(list, attr = '') { this.parts.push(`<path d="M${list.map(q => this.p(...q).join(' ')).join('L')}" fill="none" ${attr}/>`); return this; }
  raw(s) { this.parts.push(s); return this; }
  /* 화면 좌표 기준 도형을 아이소메트릭 한 점에 붙입니다 */
  at(pt, inner, rot = 0, extent = 0) {
    const [X, Y] = this.p(...pt);
    if (extent) { const b = this.b; b[0] = Math.min(b[0], X - extent); b[1] = Math.min(b[1], Y - extent); b[2] = Math.max(b[2], X + extent); b[3] = Math.max(b[3], Y + extent); }
    this.parts.push(`<g transform="translate(${X} ${Y})${rot ? ` rotate(${rot})` : ''}">${inner}</g>`);
    return this;
  }
  svg({ pad = 14, cls = 'art', label = '' } = {}) {
    const [x0, y0, x1, y1] = this.b;
    const vb = [f(x0 - pad), f(y0 - pad), f(x1 - x0 + pad * 2), f(y1 - y0 + pad * 2)].join(' ');
    const a11y = label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"';
    return `<svg class="${cls}" viewBox="${vb}" ${a11y} focusable="false">${this.parts.join('')}</svg>`;
  }
}

/* 뚜껑 없는 트레이: 뒤쪽 안벽 → 바닥 → 내용물 → 앞쪽 바깥벽 순서로 그립니다 */
function openTray(g, { x = 0, y = 0, z = 0, W, D, H, inside, front, base = K.inner, wallIn = [K.innerL, K.innerR], out = [K.kraftL, K.kraft] }) {
  const P = (a, b, c) => [x + a, y + b, z + c];
  g.poly([P(0, 0, 0), P(0, D, 0), P(0, D, H), P(0, 0, H)], `fill="${wallIn[0]}" ${SW}`);
  g.poly([P(0, 0, 0), P(W, 0, 0), P(W, 0, H), P(0, 0, H)], `fill="${wallIn[1]}" ${SW}`);
  g.poly([P(0, 0, 0), P(W, 0, 0), P(W, D, 0), P(0, D, 0)], `fill="${base}" ${SW}`);
  if (inside) inside(P);
  g.poly([P(0, D, 0), P(W, D, 0), P(W, D, H), P(0, D, H)], `fill="${out[0]}" ${SW}`);
  g.poly([P(W, 0, 0), P(W, D, 0), P(W, D, H), P(W, 0, H)], `fill="${out[1]}" ${SW}`);
  if (front) front(P);
  return P;
}

function closedBox(g, { x = 0, y = 0, z = 0, W, D, H, top = K.kraftT, left = K.kraftL, right = K.kraft, deco }) {
  const P = (a, b, c) => [x + a, y + b, z + c];
  g.poly([P(0, D, 0), P(W, D, 0), P(W, D, H), P(0, D, H)], `fill="${left}" ${SW}`);
  g.poly([P(W, 0, 0), P(W, D, 0), P(W, D, H), P(W, 0, H)], `fill="${right}" ${SW}`);
  g.poly([P(0, 0, H), P(W, 0, H), P(W, D, H), P(0, D, H)], `fill="${top}" ${SW}`);
  if (deco) deco(P);
  return P;
}

/* 바닥 평면(z 고정)의 원 */
function isoCircle(g, cx, cy, z, r, attr) {
  const pts = [];
  for (let i = 0; i < 28; i++) { const t = (i / 28) * Math.PI * 2; pts.push([cx + r * Math.cos(t), cy + r * Math.sin(t), z]); }
  g.poly(pts, attr);
}

/* ---------- 음식 ---------- */
const drum = `<path d="M8 -2.5L27 -4.5L27 4.5L8 2.5Z" fill="${K.paper}" ${THIN}/><circle cx="29" cy="-4.5" r="4" fill="${K.paper}" ${THIN}/><circle cx="29" cy="4.5" r="4" fill="${K.paper}" ${THIN}/><path d="M-26 0C-26 -11 -14 -15 -3 -13C6 -11 11 -6 11 0C11 6 6 11 -3 13C-14 15 -26 11 -26 0Z" fill="${K.gold}" ${SW}/><path d="M-19 -5c4-4 9-5 13-4M-16 5c4 2 9 2 12 0M-8 -1c2-1 4-1 6 0" fill="none" stroke="${K.goldD}" stroke-width="1.2" stroke-linecap="round"/>`;
const nugget = `<path d="M-12 -2C-12 -9 -4 -11 3 -9C10 -7 13 -2 11 4C9 10 0 11 -6 9C-11 7 -12 3 -12 -2Z" fill="${K.gold}" ${SW}/><path d="M-6 -3c3-2 6-2 8 0" fill="none" stroke="${K.goldD}" stroke-width="1.1" stroke-linecap="round"/>`;
const loaf = (len, w) => `<rect x="${-len / 2}" y="${-w / 2}" width="${len}" height="${w}" rx="${w / 2}" fill="${K.bun}" ${SW}/><path d="M${-len / 2 + 6} ${-w / 2 + 3}C${-len / 4} ${-w / 2 - 1} ${len / 4} ${-w / 2 - 1} ${len / 2 - 6} ${-w / 2 + 3}" fill="none" stroke="#F0C98E" stroke-width="2" stroke-linecap="round"/>${[-0.28, 0, 0.28].map(k => `<path d="M${len * k - 5} ${-w / 4}l10 ${w / 2}" stroke="${K.bunD}" stroke-width="1.4" stroke-linecap="round"/>`).join('')}`;
const bunRound = r => `<circle r="${r}" fill="${K.bun}" ${SW}/><path d="M${-r * 0.55} ${-r * 0.35}c${r * 0.3} ${-r * 0.35} ${r * 0.8} ${-r * 0.35} ${r * 1.1} 0" fill="none" stroke="#F0C98E" stroke-width="2" stroke-linecap="round"/>${[[-0.3, 0.1], [0.15, -0.05], [0.35, 0.3], [-0.05, 0.4]].map(([a, b]) => `<ellipse cx="${a * r}" cy="${b * r}" rx="1.3" ry="0.8" fill="#FFF3DC"/>`).join('')}`;
const hotdog = len => `<rect x="${-len / 2}" y="-12" width="${len}" height="24" rx="12" fill="${K.bun}" ${SW}/><rect x="${-len / 2 - 7}" y="-6" width="${len + 14}" height="12" rx="6" fill="${K.sausage}" ${SW}/><path d="M${-len / 2 + 4} 0${Array.from({ length: Math.floor((len - 8) / 9) }, (_, i) => `l4.5 ${i % 2 ? 3 : -3}l4.5 ${i % 2 ? -3 : 3}`).join('')}" fill="none" stroke="${K.mustard}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`;
const gimbap = `<circle r="9" fill="#24302A" ${THIN}/><circle r="6.6" fill="${K.rice}"/><circle cx="-2" cy="-1" r="1.6" fill="${K.red}"/><circle cx="2" cy="1.5" r="1.5" fill="${K.veg}"/><circle cx="1.5" cy="-2.2" r="1.2" fill="${K.mustard}"/>`;
const rice = `<path d="M-30 4C-30 -10 -12 -15 0 -15C12 -15 30 -10 30 4C30 10 16 13 0 13C-16 13 -30 10 -30 4Z" fill="${K.rice}" ${SW}/>${[[-14, -4], [-4, -9], [8, -6], [16, 0], [-6, 3], [4, 4]].map(([a, b]) => `<ellipse cx="${a}" cy="${b}" rx="1.6" ry="1" fill="#2B2F2A" opacity=".55"/>`).join('')}`;
const greens = `<circle cx="-7" cy="0" r="7" fill="${K.veg}" ${THIN}/><circle cx="5" cy="-3" r="7" fill="${K.vegD}" ${THIN}/><circle cx="3" cy="6" r="6" fill="${K.veg}" ${THIN}/>`;
const reds = `<ellipse cx="-6" cy="0" rx="7" ry="5" fill="${K.red}" ${THIN}/><ellipse cx="6" cy="2" rx="7" ry="5" fill="#B2462F" ${THIN}/><ellipse cx="0" cy="-5" rx="6" ry="4" fill="${K.red}" ${THIN}/>`;
const egg = `<ellipse rx="13" ry="9" fill="${K.rice}" ${SW}/><circle cx="1" cy="-1" r="4.6" fill="${K.mustard}"/>`;

/* ---------- 제품 일러스트 ---------- */
function artChicken(label) {
  const g = new Iso();
  closedBox(g, {
    x: 30, y: -150, W: 150, D: 112, H: 62,
    deco: P => {
      g.poly([P(0, 112, 22), P(150, 112, 22), P(150, 112, 36), P(0, 112, 36)], `fill="${K.green}" stroke="none"`);
      [26, 48, 70].forEach(v => g.poly([P(150, v, 40), P(150, v + 12, 40), P(150, v + 12, 46), P(150, v, 46)], `fill="#7A532C" ${THIN}`));
      isoCircle(g, 75, 56, 62, 26, `fill="none" stroke="${K.green}" stroke-width="2.2"`);
      isoCircle(g, 75, 56, 62, 17, `fill="${K.green}" stroke="none"`);
    }
  });
  openTray(g, {
    x: 0, y: 0, W: 170, D: 120, H: 34,
    inside: P => {
      g.at(P(48, 36, 10), drum, -12, 30);
      g.at(P(104, 40, 10), drum, 18, 30);
      g.at(P(74, 82, 12), drum, -26, 30);
      g.at(P(134, 92, 10), nugget, 8, 14);
    },
    front: P => g.poly([P(18, 120, 12), P(80, 120, 12), P(80, 120, 20), P(18, 120, 20)], `fill="${K.green}" stroke="none"`)
  });
  return g.svg({ label, pad: 16 });
}

function artBakery(label) {
  const g = new Iso();
  openTray(g, {
    x: 0, y: 0, W: 190, D: 118, H: 18,
    inside: P => {
      g.at(P(56, 34, 12), loaf(92, 34), 30, 50);
      g.at(P(62, 84, 12), loaf(92, 34), 30, 50);
      g.at(P(148, 64, 14), bunRound(24), 0, 26);
    }
  });
  openTray(g, {
    x: 214, y: -24, W: 90, D: 70, H: 14,
    inside: P => {
      g.at(P(30, 34, 8), `<circle r="12" fill="#E9B7B5" ${SW}/><circle r="7" fill="#F4D3D1"/>`, 0, 14);
      g.at(P(62, 34, 8), `<circle r="12" fill="#CFE0B4" ${SW}/><circle r="7" fill="#E2EDCF"/>`, 0, 14);
    }
  });
  return g.svg({ label, pad: 16 });
}

function artStreet(label) {
  const g = new Iso();
  const W = 210, D = 58, H = 26;
  openTray(g, {
    x: 0, y: 0, W, D, H,
    inside: P => g.at(P(W / 2 - 4, D / 2, 14), hotdog(150), 30, 90),
    front: P => {
      g.poly([P(W, 10, H), P(W, D - 10, H), P(W, D - 14, H + 30), P(W, 14, H + 30)], `fill="${K.kraft}" ${SW}`);
      g.poly([P(W, 21, H + 12), P(W, D - 21, H + 12), P(W, D - 21, H + 20), P(W, 21, H + 20)], `fill="#7A532C" stroke="none"`);
    }
  });
  openTray(g, {
    x: -10, y: 92, W: 150, D: 54, H: 20,
    inside: P => [22, 52, 82, 112].forEach((v, i) => g.at(P(v + 6, 27, 9 + (i % 2)), gimbap, 0, 12))
  });
  return g.svg({ label, pad: 16 });
}

function artTakeout(label) {
  const g = new Iso();
  const W = 190, D = 130, H = 44;
  openTray(g, {
    x: 0, y: 0, W, D, H,
    inside: P => {
      g.poly([P(104, 0, 0), P(104, D, 0), P(104, D, H - 8), P(104, 0, H - 8)], `fill="${K.innerR}" ${SW}`);
      g.at(P(52, 66, 14), rice, 30, 34);
      g.poly([P(104, 66, 0), P(W, 66, 0), P(W, 66, H - 8), P(104, 66, H - 8)], `fill="${K.innerL}" ${SW}`);
      g.at(P(148, 32, 10), greens, 0, 16);
      g.at(P(148, 98, 10), reds, 0, 16);
    }
  });
  closedBox(g, {
    x: 214, y: 6, W: 70, D: 70, H: 34,
    deco: P => {
      isoCircle(g, 35, 35, 34, 18, `fill="none" stroke="${K.green}" stroke-width="2"`);
      g.poly([P(0, 70, 12), P(70, 70, 12), P(70, 70, 20), P(0, 70, 20)], `fill="${K.green}" stroke="none"`);
    }
  });
  return g.svg({ label, pad: 16 });
}

function artCustom(label) {
  return dieline({ W: 150, D: 104, H: 40, theme: 'light', label, dims: true, marks: true, cls: 'art' });
}

const ARTS = { chicken: artChicken, bakery: artBakery, street: artStreet, takeout: artTakeout, custom: artCustom };
export const productArt = (id, label = '') => ARTS[id](label);

/* ---------- 칼선 도면 (위에서 본 펼친 모양) ---------- */
export function dielineGeometry(W, D, H) {
  const t = Math.round(H * 0.62), q = Math.round(t * 0.5);
  const cut = [
    [0, -H], [W, -H], [W + t, -H + q], [W + t, -q], [W, 0],
    [W + H, 0], [W + H, D], [W, D],
    [W + t, D + q], [W + t, D + H - q], [W, D + H],
    [0, D + H], [-t, D + H - q], [-t, D + q], [0, D],
    [-H, D], [-H, 0], [0, 0],
    [-t, -q], [-t, -H + q]
  ];
  const folds = [
    [[0, 0], [W, 0]], [[W, 0], [W, D]], [[W, D], [0, D]], [[0, D], [0, 0]],
    [[0, -H], [0, 0]], [[W, -H], [W, 0]], [[0, D], [0, D + H]], [[W, D], [W, D + H]]
  ];
  return { t, q, cut, folds };
}

export function dieline({ W = 240, D = 168, H = 60, theme = 'light', dims = true, marks = true, label = '', cls = 'art', draw = false, fill = true }) {
  const { cut, folds } = dielineGeometry(W, D, H);
  const pad = dims ? 34 : 14;
  const x0 = -H - pad, y0 = -H - pad, w = W + 2 * H + 2 * pad, h = D + 2 * H + 2 * pad;
  const ink = theme === 'dark' ? '#FFFFFF' : K.ink;
  const sub = theme === 'dark' ? 'rgba(255,255,255,.62)' : 'rgba(24,33,29,.55)';
  const paper = theme === 'dark' ? 'rgba(255,255,255,.06)' : K.paper;
  const d = 'M' + cut.map(p => p.join(' ')).join('L') + 'Z';
  const drawAttr = draw ? ' pathLength="1" class="dl-draw"' : '';
  let s = '';
  if (fill) s += `<path d="${d}" fill="${paper}"/>`;
  s += `<g fill="none" stroke="${K.magenta}" stroke-width="1.6" stroke-dasharray="6 5" class="dl-folds">${folds.map(([a, b]) => `<path d="M${a.join(' ')}L${b.join(' ')}"/>`).join('')}</g>`;
  s += `<path d="${d}" fill="none" stroke="${ink}" stroke-width="1.8" stroke-linejoin="round"${drawAttr}/>`;
  if (dims) {
    const dimLine = (x1, y1, x2, y2, txt, tx, ty) => `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${sub}" stroke-width="1"/>` +
      (x1 === x2
        ? `<path d="M${x1 - 4} ${y1}h8M${x2 - 4} ${y2}h8" stroke="${sub}" stroke-width="1"/>`
        : `<path d="M${x1} ${y1 - 4}v8M${x2} ${y2 - 4}v8" stroke="${sub}" stroke-width="1"/>`) +
      `<text x="${tx}" y="${ty}" fill="${sub}" font-size="12" font-weight="600" text-anchor="middle" font-family="inherit">${txt}</text>`;
    s += `<g class="dl-dims">`;
    s += dimLine(0, -H - 16, W, -H - 16, 'W', W / 2, -H - 21);
    s += dimLine(W + H + 16, 0, W + H + 16, D, 'D', W + H + 26, D / 2 + 4);
    s += dimLine(-H, D + H + 16, 0, D + H + 16, 'H', -H / 2, D + H + 30);
    s += `</g>`;
  }
  if (marks) {
    const m = (x, y) => `<g stroke="${theme === 'dark' ? 'rgba(255,255,255,.7)' : K.magenta}" stroke-width="1" fill="none"><circle cx="${x}" cy="${y}" r="5"/><path d="M${x - 9} ${y}h18M${x} ${y - 9}v18"/></g>`;
    s += `<g class="dl-marks">${m(-H - 18, -H - 18)}${m(W + H + 18, -H - 18)}${m(-H - 18, D + H + 18)}${m(W + H + 18, D + H + 18)}</g>`;
  }
  const a11y = label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"';
  return `<svg class="${cls}" viewBox="${x0} ${y0} ${w} ${h}" ${a11y} focusable="false">${s}</svg>`;
}

/* ---------- 접착 방식 도식 (위에서 본 트레이) ---------- */
export function glueDiagram(kind, label = '') {
  const W = 220, D = 150, inset = 30;
  const dots = [];
  const corners = [[0, 0, 1, 1], [W, 0, -1, 1], [W, D, -1, -1], [0, D, 1, -1]];
  corners.forEach(([x, y, sx, sy]) => {
    if (kind === 4) dots.push([x + sx * inset * 0.5, y + sy * inset * 0.5]);
    else { dots.push([x + sx * inset * 0.5, y + sy * inset * 0.18]); dots.push([x + sx * inset * 0.18, y + sy * inset * 0.5]); }
  });
  let s = `<rect x="0" y="0" width="${W}" height="${D}" rx="6" fill="${K.kraftL}" ${SW}/>`;
  s += `<rect x="${inset}" y="${inset}" width="${W - inset * 2}" height="${D - inset * 2}" fill="${K.inner}" ${SW}/>`;
  s += corners.map(([x, y, sx, sy]) => `<path d="M${x + sx * 3} ${y + sy * 3}L${x + sx * inset} ${y + sy * inset}" stroke="${K.ink}" stroke-width="1.1" stroke-dasharray="3 3"/>`).join('');
  s += `<path d="M${inset} ${inset}H${W - inset}V${D - inset}H${inset}Z" fill="none" stroke="${K.magenta}" stroke-width="1.4" stroke-dasharray="6 5"/>`;
  s += dots.map(([x, y], i) => `<circle class="glue-dot" style="--i:${i}" cx="${x}" cy="${y}" r="6.5" fill="${K.leaf}" stroke="#fff" stroke-width="2"/>`).join('');
  const a11y = label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"';
  return `<svg class="glue-svg" viewBox="-14 -14 ${W + 28} ${D + 28}" ${a11y} focusable="false">${s}</svg>`;
}

/* ---------- 생산 과정 일러스트 ---------- */
function stepPaper() {
  const g = new Iso();
  const cols = [K.kraftD, K.kraft, K.kraftL, '#E7CDA6', K.paper];
  cols.forEach((c, i) => closedBox(g, { x: i * 4, y: -i * 3, z: i * 9, W: 200, D: 140, H: 7, top: c, left: c, right: K.kraftD }));
  return g.svg({ pad: 18 });
}
function stepPrint() {
  const g = new Iso();
  closedBox(g, {
    W: 220, D: 150, H: 5, top: K.paper, left: K.kraftL, right: K.kraft,
    deco: P => {
      g.poly([P(46, 36, 5), P(174, 36, 5), P(174, 114, 5), P(46, 114, 5)], `fill="none" stroke="${K.green}" stroke-width="2"`);
      isoCircle(g, 110, 75, 5, 22, `fill="${K.green}" stroke="none"`);
      [K.cyan, K.magenta, K.yellow, K.ink].forEach((c, i) => g.poly([P(16 + i * 14, 132, 5), P(28 + i * 14, 132, 5), P(28 + i * 14, 144, 5), P(16 + i * 14, 144, 5)], `fill="${c}" stroke="none"`));
      const reg = (x, y) => { isoCircle(g, x, y, 5, 5, `fill="none" stroke="${K.magenta}" stroke-width="1"`); g.path([[x - 9, y, 5], [x + 9, y, 5]], `stroke="${K.magenta}" stroke-width="1"`); g.path([[x, y - 9, 5], [x, y + 9, 5]], `stroke="${K.magenta}" stroke-width="1"`); };
      reg(14, 14); reg(206, 14);
    }
  });
  return g.svg({ pad: 18 });
}
function stepCut() {
  const g = new Iso();
  const W = 120, D = 84, H = 32;
  const { cut } = dielineGeometry(W, D, H);
  const ox = 60, oy = 50;
  closedBox(g, { W: 260, D: 200, H: 5, top: '#E9D5B7', left: K.kraftL, right: K.kraft });
  g.poly(cut.map(([a, b]) => [ox + a + H, oy + b + H, 5]), `fill="#B78E5E" stroke="${K.ink}" stroke-width="1.1"`);
  g.poly(cut.map(([a, b]) => [ox + a + H - 6, oy + b + H - 6, 44]), `fill="${K.paper}" ${SW}`);
  return g.svg({ pad: 18 });
}
function stepGlue() {
  const g = new Iso();
  openTray(g, {
    W: 200, D: 140, H: 46,
    front: P => {
      [[0, 0], [200, 0], [200, 140], [0, 140]].forEach(([a, b]) => {
        if (a === 0 && b === 0) return;
        [14, 32].forEach(h => g.at(P(a, b, h), `<circle r="6" fill="${K.leaf}" stroke="#fff" stroke-width="2"/>`, 0, 8));
      });
    }
  });
  return g.svg({ pad: 22 });
}
function stepInspect() {
  const g = new Iso();
  openTray(g, { W: 200, D: 140, H: 40 });
  g.at([200, 0, 82], `<circle r="26" fill="${K.leaf}" stroke="#fff" stroke-width="3"/><path d="M-11 1l7.5 7.5L12 -9" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>`, 0, 30);
  return g.svg({ pad: 20 });
}
function stepDeliver() {
  const g = new Iso();
  const W = 150, D = 110;
  for (let i = 0; i < 6; i++) {
    const z = i * 9;
    g.poly([[0, D, z], [W, D, z], [W, D, z + 9], [0, D, z + 9]], `fill="${i % 2 ? K.kraft : K.kraftL}" ${SW}`);
    g.poly([[W, 0, z], [W, D, z], [W, D, z + 9], [W, 0, z + 9]], `fill="${i % 2 ? K.kraftD : K.kraft}" ${SW}`);
  }
  openTray(g, { z: 54, W, D, H: 22 });
  g.poly([[60, D, 0], [86, D, 0], [86, D, 76], [60, D, 76]], `fill="${K.green}" stroke="none" opacity=".92"`);
  g.poly([[W, 46, 0], [W, 70, 0], [W, 70, 76], [W, 46, 76]], `fill="${K.green7}" stroke="none" opacity=".92"`);
  closedBox(g, { x: 190, y: 10, W: 120, D: 100, H: 70, top: K.kraftT, deco: P => g.poly([P(52, 0, 70), P(68, 0, 70), P(68, 100, 70), P(52, 100, 70)], `fill="#D8B58B" stroke="none"`) });
  return g.svg({ pad: 18 });
}
export const STEP_ART = [
  () => dieline({ W: 170, D: 118, H: 46, theme: 'light', dims: true, marks: true }),
  stepPaper, stepPrint, stepCut, stepGlue, stepInspect, stepDeliver
];

/* ---------- 로고 ---------- */
export const logoMark = (cls = 'logo-mark') => `<svg class="${cls}" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M10 3.5h12V10h6.5v12H22v6.5H10V22H3.5V10H10z" fill="${K.kraft}" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M10 10h12v12H10z" fill="#F6EEE1" stroke="${K.magenta}" stroke-width="1.3" stroke-dasharray="2.4 1.8"/></svg>`;

/* ---------- 아이콘 (24 격자, 선 1.6) ---------- */
const I = {
  factory: '<path d="M3 20.5h18M4 20.5V11l5 3v-3l5 3v-3l5 3v6.5M16.5 20.5V4h3v13"/><path d="M7 17h2M11 17h2"/>',
  structure: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5l8 4.5 8-4.5M12 12v9"/>',
  uniform: '<rect x="8" y="3.5" width="12.5" height="12.5" rx="1.5"/><path d="M5.5 7.5v11a2 2 0 002 2h11"/><path d="M11.5 9.8l2 2 3.5-3.8"/>',
  nofile: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12.5h6M9 16.5h4"/>',
  dieline: '<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/><path d="M9 9h6v6H9z" stroke-dasharray="2 2"/>',
  paper: '<path d="M4 8l8-4 8 4-8 4z"/><path d="M4 12l8 4 8-4M4 16l8 4 8-4"/>',
  print: '<path d="M7 9V3.5h10V9"/><path d="M7 17H4.5v-6.5a1.5 1.5 0 011.5-1.5h12a1.5 1.5 0 011.5 1.5V17H17"/><path d="M7 14h10v6.5H7z"/>',
  cut: '<circle cx="6" cy="6.5" r="3"/><circle cx="6" cy="17.5" r="3"/><path d="M8.5 8.2L20 18.5M8.5 15.8L20 5.5"/>',
  glue: '<path d="M12 3.5c3.4 4.4 6 7.5 6 10.6a6 6 0 01-12 0c0-3.1 2.6-6.2 6-10.6z"/><path d="M9.5 14.5a2.5 2.5 0 002.5 2.5"/>',
  inspect: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21M7.8 10.6l2 2 3.6-3.8"/>',
  deliver: '<path d="M2.5 6h11.5v10H2.5zM14 9.5h4l3.5 3.5v3H14"/><circle cx="7" cy="18" r="1.8"/><circle cx="17.5" cy="18" r="1.8"/>',
  menu: '<path d="M3.5 11.5h17a8.5 8.5 0 01-17 0z"/><path d="M8.5 7.5c0-1.4 1-1.9 1-3.3M12.5 7.5c0-1.4 1-1.9 1-3.3M16.5 7.5c0-1.4 1-1.9 1-3.3"/>',
  size: '<path d="M3 17L17 3l4 4L7 21z"/><path d="M7.5 12.5l1.8 1.8M10.5 9.5l1.8 1.8M13.5 6.5l1.8 1.8"/>',
  usage: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4M8.5 14h2M13.5 14h2M8.5 17h2"/>',
  printing: '<path d="M9 3.5h6v5.5l-1 3h-4l-1-3z"/><path d="M5 15h14v3H5zM4 21h16"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18"/>',
  phone: '<path d="M5.5 3.5h3.3l1.7 4.6-2.2 1.4a11.5 11.5 0 006.2 6.2l1.4-2.2 4.6 1.7v3.3a2 2 0 01-2.1 2A16.5 16.5 0 013.5 5.6a2 2 0 012-2.1z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  blog: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 9h8M8 12.5h8M8 16h5"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  external: '<path d="M8 16L17 7M9 7h8v8"/>',
  chevron: '<path d="M6.5 9.5l5.5 5.5 5.5-5.5"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  burger: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
  replay: '<path d="M4.5 12a7.5 7.5 0 107.5-7.5 7.5 7.5 0 00-5.6 2.5"/><path d="M5 3.5v4.5h4.5"/>',
  camera: '<path d="M4 7.5h3.5L9 5h6l1.5 2.5H20a1 1 0 011 1V19a1 1 0 01-1 1H4a1 1 0 01-1-1V8.5a1 1 0 011-1z"/><circle cx="12" cy="13.5" r="3.8"/>',
  doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 15.5h6"/>',
  ribbon: '<circle cx="12" cy="9" r="5.5"/><path d="M8.5 13.5L7 21l5-2.5 5 2.5-1.5-7.5"/>'
};
export const icon = (name, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${I[name]}</svg>`;
