/* 아이소메트릭 건물 그림, 아이콘 */
const C = Math.cos(Math.PI / 6), S = 0.5;
const f = n => +n.toFixed(1);

class Iso {
  constructor() { this.parts = []; this.b = [Infinity, Infinity, -Infinity, -Infinity]; }
  p(x, y, z = 0) {
    const X = (x - y) * C, Y = (x + y) * S - z, b = this.b;
    if (X < b[0]) b[0] = X; if (Y < b[1]) b[1] = Y; if (X > b[2]) b[2] = X; if (Y > b[3]) b[3] = Y;
    return [f(X), f(Y)];
  }
  d(list, close = true) { return 'M' + list.map(q => this.p(...q).join(' ')).join('L') + (close ? 'Z' : ''); }
  poly(list, attr = '') { this.parts.push(`<path d="${this.d(list)}" ${attr}/>`); }
  line(list, attr = '') { this.parts.push(`<path d="${this.d(list, false)}" fill="none" ${attr}/>`); }
  raw(s) { this.parts.push(s); }
  open(attr) { this.parts.push(`<g ${attr}>`); }
  close() { this.parts.push('</g>'); }
  svg({ pad = 16, cls = 'art', label = '' } = {}) {
    const [x0, y0, x1, y1] = this.b;
    const vb = [f(x0 - pad), f(y0 - pad), f(x1 - x0 + pad * 2), f(y1 - y0 + pad * 2)].join(' ');
    return `<svg class="${cls}" viewBox="${vb}" ${label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"'} focusable="false">${this.parts.join('')}</svg>`;
  }
}

const K = {
  ink: '#1D2125', wallL: '#E7E5DF', wallR: '#CBC8C0', roofF: '#A3A9AE', roofB: '#868D93', top: '#D9D6CF',
  glass: '#AFC2D0', glassD: '#8EA3B4', orange: '#E8591A', slab: '#BDB9B0', slabD: '#A6A298', dark: '#454B51', shutter: '#9AA0A6'
};
const SW = `stroke="${K.ink}" stroke-width="1.2" stroke-linejoin="round"`;
const THIN = `stroke="${K.ink}" stroke-width=".7" stroke-opacity=".45"`;

/* 바닥판 */
function slab(g, x, y, W, D, t = 5, attr = '') {
  g.poly([[x, y + D, 0], [x + W, y + D, 0], [x + W, y + D, -t], [x, y + D, -t]], `fill="${K.slabD}" ${SW} ${attr}`);
  g.poly([[x + W, y, 0], [x + W, y + D, 0], [x + W, y + D, -t], [x + W, y, -t]], `fill="${K.slabD}" ${SW} ${attr}`);
  g.poly([[x, y, 0], [x + W, y, 0], [x + W, y + D, 0], [x, y + D, 0]], `fill="${K.slab}" ${SW} ${attr}`);
}

/* 박공지붕 철골 건물 (길이 W는 x, 폭 D는 y 방향) */
function gable(g, { x = 0, y = 0, W, D, H, R, seam = 10, doorsL = [], doorsR = [], band = false, sign = false }) {
  const Q = (a, b, c) => [x + a, y + b, c];
  g.poly([Q(0, 0, H), Q(W, 0, H), Q(W, D / 2, H + R), Q(0, D / 2, H + R)], `fill="${K.roofB}" ${SW}`);
  g.poly([Q(0, D, 0), Q(W, D, 0), Q(W, D, H), Q(0, D, H)], `fill="${K.wallL}" ${SW}`);
  for (let a = seam; a < W; a += seam) g.line([Q(a, D, 0), Q(a, D, H)], THIN);
  g.poly([Q(W, 0, 0), Q(W, D, 0), Q(W, D, H), Q(W, D / 2, H + R), Q(W, 0, H)], `fill="${K.wallR}" ${SW}`);
  for (let b = seam; b < D; b += seam) { const top = H + R * (1 - Math.abs(b - D / 2) / (D / 2)); g.line([Q(W, b, 0), Q(W, b, top)], THIN); }
  if (band) g.poly([Q(6, D, H - 9), Q(W - 6, D, H - 9), Q(W - 6, D, H - 4), Q(6, D, H - 4)], `fill="${K.glass}" ${SW}`);
  doorsL.forEach(([a, w, h]) => {
    g.poly([Q(a, D, 0), Q(a + w, D, 0), Q(a + w, D, h), Q(a, D, h)], `fill="${K.shutter}" ${SW}`);
    for (let z = 3; z < h; z += 3) g.line([Q(a, D, z), Q(a + w, D, z)], THIN);
  });
  doorsR.forEach(([b, w, h]) => {
    g.poly([Q(W, b, 0), Q(W, b + w, 0), Q(W, b + w, h), Q(W, b, h)], `fill="${K.shutter}" ${SW}`);
    for (let z = 3; z < h; z += 3) g.line([Q(W, b, z), Q(W, b + w, z)], THIN);
  });
  g.poly([Q(0, D / 2, H + R), Q(W, D / 2, H + R), Q(W, D, H), Q(0, D, H)], `fill="${K.roofF}" ${SW}`);
  for (let a = seam; a < W; a += seam) g.line([Q(a, D / 2, H + R), Q(a, D, H)], THIN);
  if (sign) g.poly([Q(W * 0.08, D, H * 0.62), Q(W * 0.3, D, H * 0.62), Q(W * 0.3, D, H * 0.8), Q(W * 0.08, D, H * 0.8)], `fill="${K.orange}" ${SW}`);
}

/* 평지붕 상자 건물 (층마다 창) */
function box(g, { x = 0, y = 0, W, D, H, floors = 3, store = true, win = K.glass, parapet = 3, colorL = K.wallL, colorR = K.wallR, balcony = false }) {
  const Q = (a, b, c) => [x + a, y + b, c];
  const fh = H / floors;
  g.poly([Q(0, D, 0), Q(W, D, 0), Q(W, D, H), Q(0, D, H)], `fill="${colorL}" ${SW}`);
  g.poly([Q(W, 0, 0), Q(W, D, 0), Q(W, D, H), Q(W, 0, H)], `fill="${colorR}" ${SW}`);
  for (let i = 0; i < floors; i++) {
    const z0 = i * fh;
    if (i === 0 && store) {
      g.poly([Q(4, D, 2), Q(W - 4, D, 2), Q(W - 4, D, fh - 3), Q(4, D, fh - 3)], `fill="${K.glassD}" ${SW}`);
      g.poly([Q(W, 4, 2), Q(W, D - 4, 2), Q(W, D - 4, fh - 3), Q(W, 4, fh - 3)], `fill="${K.glassD}" ${SW}`);
      g.poly([Q(4, D, fh - 3), Q(W - 4, D, fh - 3), Q(W - 4, D, fh), Q(4, D, fh)], `fill="${K.orange}" ${SW}`);
      continue;
    }
    const n = Math.max(2, Math.round(W / 16)), m = Math.max(2, Math.round(D / 16));
    for (let k = 0; k < n; k++) { const a = 4 + k * ((W - 8) / n), w = (W - 8) / n - 4; g.poly([Q(a, D, z0 + 3), Q(a + w, D, z0 + 3), Q(a + w, D, z0 + fh - 3), Q(a, D, z0 + fh - 3)], `fill="${win}" ${SW}`); }
    for (let k = 0; k < m; k++) { const b = 4 + k * ((D - 8) / m), w = (D - 8) / m - 4; g.poly([Q(W, b, z0 + 3), Q(W, b + w, z0 + 3), Q(W, b + w, z0 + fh - 3), Q(W, b, z0 + fh - 3)], `fill="${win}" ${SW}`); }
    if (balcony) g.poly([Q(W * 0.2, D, z0 + 1), Q(W * 0.2, D + 5, z0 + 1), Q(W * 0.8, D + 5, z0 + 1), Q(W * 0.8, D, z0 + 1)], `fill="${K.top}" ${SW}`);
  }
  g.poly([Q(0, 0, H), Q(W, 0, H), Q(W, D, H), Q(0, D, H)], `fill="${K.top}" ${SW}`);
  g.poly([Q(parapet, parapet, H), Q(W - parapet, parapet, H), Q(W - parapet, D - parapet, H), Q(parapet, D - parapet, H)], `fill="${K.roofF}" ${THIN}`);
}

/* ---------- 분야별 그림 ---------- */
const ARTS = {
  factory() {
    const g = new Iso();
    slab(g, -10, -10, 200, 120);
    box(g, { x: 150, y: 52, W: 32, D: 46, H: 30, floors: 2, store: false });
    gable(g, { W: 150, D: 100, H: 46, R: 16, doorsL: [[16, 26, 30], [52, 26, 30]], band: true, sign: true });
    return g.svg();
  },
  warehouse() {
    const g = new Iso();
    slab(g, -10, -10, 230, 110);
    gable(g, { W: 210, D: 90, H: 40, R: 12, seam: 12, doorsL: [[14, 28, 30], [56, 28, 30], [98, 28, 30], [140, 28, 30]] });
    return g.svg();
  },
  commercial() {
    const g = new Iso();
    slab(g, -8, -8, 106, 86);
    box(g, { W: 90, D: 70, H: 96, floors: 4 });
    return g.svg();
  },
  mixed() {
    const g = new Iso();
    slab(g, -8, -8, 96, 86);
    box(g, { W: 80, D: 70, H: 84, floors: 4, balcony: true, win: '#C7D3DC' });
    return g.svg();
  },
  building() {
    const g = new Iso();
    slab(g, -8, -8, 96, 96);
    box(g, { W: 80, D: 80, H: 150, floors: 7, win: K.glassD });
    return g.svg();
  },
  extension() {
    const g = new Iso();
    slab(g, -8, -8, 116, 86);
    box(g, { W: 100, D: 70, H: 54, floors: 2 });
    g.line([[0, 70, 54], [0, 70, 84], [100, 70, 84], [100, 70, 54]], `stroke="${K.orange}" stroke-width="1.6" stroke-dasharray="5 4"`);
    g.line([[100, 70, 84], [100, 0, 84], [100, 0, 54]], `stroke="${K.orange}" stroke-width="1.6" stroke-dasharray="5 4"`);
    g.line([[0, 70, 84], [0, 0, 84], [100, 0, 84]], `stroke="${K.orange}" stroke-width="1.6" stroke-dasharray="5 4"`);
    return g.svg();
  }
};
export const typeArt = id => ARTS[id]();

/* ---------- 첫 화면: 바닥판 → 기둥 → 보 → 벽 → 지붕 순서로 지어지는 공장 ---------- */
export function heroBuilding() {
  const g = new Iso();
  const W = 220, D = 130, H = 64, R = 20;
  const bays = [0, 44, 88, 132, 176, 220];
  g.open('class="b-slab"');
  slab(g, -14, -14, W + 28, D + 28, 6);
  g.close();
  /* 타워 크레인 */
  const cx = W + 46, cy = D * 0.35, top = H + R + 92;
  g.open(`class="b-crane" fill="none" stroke="${K.orange}" stroke-width="2.2" stroke-linecap="round"`);
  g.line([[cx, cy, 0], [cx, cy, top]], 'pathLength="1" class="dr"');
  g.line([[cx + 6, cy, 0], [cx + 6, cy, top]], 'pathLength="1" class="dr"');
  for (let z = 10; z < top - 4; z += 14) g.line([[cx, cy, z], [cx + 6, cy, z + 10]], 'pathLength="1" class="dr" stroke-width="1"');
  g.line([[cx + 18, cy, top], [cx - 150, cy, top]], 'pathLength="1" class="dr"');
  g.line([[cx + 3, cy, top + 16], [cx - 150, cy, top]], 'pathLength="1" class="dr" stroke-width="1.2"');
  g.line([[cx + 3, cy, top + 16], [cx + 18, cy, top]], 'pathLength="1" class="dr" stroke-width="1.2"');
  g.close();
  g.open('class="b-hook"');
  g.line([[cx - 96, cy, top], [cx - 96, cy, top - 46]], `stroke="${K.ink}" stroke-width="1" fill="none"`);
  g.poly([[cx - 102, cy, top - 46], [cx - 90, cy, top - 46], [cx - 90, cy, top - 52], [cx - 102, cy, top - 52]], `fill="${K.orange}" ${SW}`);
  g.close();
  /* 철골 기둥과 보 */
  g.open(`class="b-frame" fill="none" stroke="${K.orange}" stroke-width="2.4" stroke-linecap="round"`);
  let i = 0;
  bays.forEach(a => [0, D].forEach(b => g.line([[a, b, 0], [a, b, H]], `pathLength="1" class="dr col" style="--i:${i++}"`)));
  [[0, D / 2], [W, D / 2]].forEach(([a, b]) => g.line([[a, b, 0], [a, b, H + R]], `pathLength="1" class="dr col" style="--i:${i++}"`));
  let j = 0;
  g.line([[0, 0, H], [W, 0, H]], `pathLength="1" class="dr beam" style="--j:${j++}"`);
  g.line([[0, D, H], [W, D, H]], `pathLength="1" class="dr beam" style="--j:${j++}"`);
  bays.forEach(a => g.line([[a, 0, H], [a, D / 2, H + R], [a, D, H]], `pathLength="1" class="dr beam" style="--j:${j++}"`));
  g.line([[0, D / 2, H + R], [W, D / 2, H + R]], `pathLength="1" class="dr beam" style="--j:${j++}"`);
  g.close();
  /* 벽과 지붕 */
  const Q = (a, b, c) => [a, b, c];
  g.open('class="b-roofback"');
  g.poly([Q(0, 0, H), Q(W, 0, H), Q(W, D / 2, H + R), Q(0, D / 2, H + R)], `fill="${K.roofB}" ${SW}`);
  g.close();
  g.open('class="b-wall b-wall-l"');
  g.poly([Q(0, D, 0), Q(W, D, 0), Q(W, D, H), Q(0, D, H)], `fill="${K.wallL}" ${SW}`);
  for (let a = 11; a < W; a += 11) g.line([Q(a, D, 0), Q(a, D, H)], THIN);
  g.close();
  g.open('class="b-wall b-wall-r"');
  g.poly([Q(W, 0, 0), Q(W, D, 0), Q(W, D, H), Q(W, D / 2, H + R), Q(W, 0, H)], `fill="${K.wallR}" ${SW}`);
  for (let b = 11; b < D; b += 11) { const t = H + R * (1 - Math.abs(b - D / 2) / (D / 2)); g.line([Q(W, b, 0), Q(W, b, t)], THIN); }
  g.close();
  g.open('class="b-roof"');
  g.poly([Q(0, D / 2, H + R), Q(W, D / 2, H + R), Q(W, D, H), Q(0, D, H)], `fill="${K.roofF}" ${SW}`);
  for (let a = 11; a < W; a += 11) g.line([Q(a, D / 2, H + R), Q(a, D, H)], THIN);
  g.close();
  g.open('class="b-detail"');
  [[22, 34, 42], [70, 34, 42]].forEach(([a, w, h]) => {
    g.poly([Q(a, D, 0), Q(a + w, D, 0), Q(a + w, D, h), Q(a, D, h)], `fill="${K.shutter}" ${SW}`);
    for (let z = 4; z < h; z += 4) g.line([Q(a, D, z), Q(a + w, D, z)], THIN);
  });
  g.poly([Q(120, D, H - 14), Q(W - 10, D, H - 14), Q(W - 10, D, H - 6), Q(120, D, H - 6)], `fill="${K.glass}" ${SW}`);
  g.poly([Q(W, 28, 0), Q(W, 62, 0), Q(W, 62, 44), Q(W, 28, 44)], `fill="${K.shutter}" ${SW}`);
  for (let z = 4; z < 44; z += 4) g.line([Q(W, 28, z), Q(W, 62, z)], THIN);
  g.poly([Q(W, 82, 18), Q(W, 112, 18), Q(W, 112, 36), Q(W, 82, 36)], `fill="${K.glass}" ${SW}`);
  g.poly([Q(128, D, 14), Q(170, D, 14), Q(170, D, 30), Q(128, D, 30)], `fill="${K.orange}" ${SW}`);
  g.close();
  return g.svg({ pad: 20, cls: 'bld-svg' });
}

/* ---------- 로고 ---------- */
export const logoMark = (cls = 'logo-mark') => `<svg class="${cls}" viewBox="0 0 36 36" aria-hidden="true" focusable="false"><path d="M4 31V15.5L18 6l14 9.5V31" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M11 31V20h14v11" fill="#E8591A"/><path d="M2 31h32" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`;

/* ---------- 아이콘 ---------- */
const I = {
  phone: '<path d="M5.5 3.5h3.3l1.7 4.6-2.2 1.4a11.5 11.5 0 006.2 6.2l1.4-2.2 4.6 1.7v3.3a2 2 0 01-2.1 2A16.5 16.5 0 013.5 5.6a2 2 0 012-2.1z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/>',
  blog: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 9h8M8 12.5h8M8 16h5"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  external: '<path d="M8 16L17 7M9 7h8v8"/>',
  doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 15.5h6"/>',
  camera: '<path d="M4 7.5h3.5L9 5h6l1.5 2.5H20a1 1 0 011 1V19a1 1 0 01-1 1H4a1 1 0 01-1-1V8.5a1 1 0 011-1z"/><circle cx="12" cy="13.5" r="3.8"/>',
  replay: '<path d="M4.5 12a7.5 7.5 0 107.5-7.5 7.5 7.5 0 00-5.6 2.5"/><path d="M5 3.5v4.5h4.5"/>',
  map: '<path d="M3 6.5l6-2.5 6 2.5 6-2.5v13.5l-6 2.5-6-2.5-6 2.5z"/><path d="M9 4v13.5M15 6.5V20"/>',
  road: '<path d="M7 21L10 3M17 21L14 3"/><path d="M12 6v2.5M12 11.5V14M12 17v2.5"/>',
  hill: '<path d="M2.5 19.5h19M3 19.5l6-9 4 5 3-3.5 5 7.5"/>',
  plug: '<path d="M9 3v5M15 3v5M6.5 8h11v3a5.5 5.5 0 01-11 0zM12 16.5V21"/>',
  hard: '<path d="M4 16.5h16M5.5 16.5a6.5 6.5 0 0113 0M10 10V6.5a2 2 0 014 0V10"/><path d="M3.5 16.5v2h17v-2"/>'
};
export const icon = (name, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${I[name]}</svg>`;
