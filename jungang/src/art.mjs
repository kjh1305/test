/* 그림: 아이콘, 수관식 보일러 계통도(소다 보일링 준비 위치), 튜브 단면(스케일) */

const I = {
  phone: '<path d="M5 4h3.5l1.6 4.2-2.2 1.6a11 11 0 0 0 6.3 6.3l1.6-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4z"/>',
  doc: '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M10 12h5M10 16h5"/>',
  chev: '<path d="M9.5 6l6 6-6 6"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  camera: '<path d="M4 8h3l2-2.5h6L17 8h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
  blog: '<rect x="4.5" y="4" width="15" height="16" rx="1.5"/><path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  flow: '<path d="M3 8.5c3 0 3 3 6 3s3-3 6-3 3 3 6 3"/><path d="M3 15c3 0 3 3 6 3s3-3 6-3 3 3 6 3"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>',
  info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 7.8v.4"/>',
  ship: '<path d="M3 15.5l2 4h14l2-4H3z"/><path d="M5.5 15.5V11h13v4.5"/><path d="M8.5 11V7h7v4M12 3.5V7"/>',
  boiler: '<rect x="6" y="3.5" width="12" height="17" rx="2"/><path d="M9 7.5h6"/><path d="M12 11c1.8 2 2.3 3 2.3 3.9a2.3 2.3 0 0 1-4.6 0c0-.9.5-1.9 2.3-3.9z"/>',
  flame: '<path d="M12 3c3.5 4 6 6.8 6 10.5A6 6 0 0 1 6 13.5C6 11 7.5 9 9 7.5c.3 2 1.3 3 2.5 3.5C11 8 11.2 5.5 12 3z"/>',
  tubes: '<path d="M3 4.5h18M3 19.5h18"/><path d="M6 4.5v15M10 4.5v15M14 4.5v15M18 4.5v15"/>',
  shield: '<path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6z"/><path d="M8.8 12.2l2.2 2.2 4.4-4.6"/>',
  lock: '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',
  truck: '<path d="M3 6.5h11v10H3zM14 9.5h4l3 3.5v3.5h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="1.5"/><path d="M4 6.5l8 6 8-6"/>',
  globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.6 3.5 5.4 3.5 8.5s-1 5.9-3.5 8.5c-2.5-2.6-3.5-5.4-3.5-8.5s1-5.9 3.5-8.5z"/>',
  office: '<path d="M4 20.5V6l8-3v17.5M12 9h8v11.5M2.5 20.5h19"/><path d="M7 9h2M7 12.5h2M7 16h2M15 13h2M15 16.5h2"/>'
};
export const icon = (name, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${I[name]}</svg>`;

/* ---------- 수관식 보일러 계통도 ----------
   소다 보일링 준비 1~4단계가 어디서 이뤄지는지 번호로 보여 줌 (이해를 돕는 단순화한 그림) */
const valveH = (x, y, cls = '') => `<path class="bd-valve ${cls}" d="M${x - 9} ${y - 7}L${x + 9} ${y + 7}V${y - 7}L${x - 9} ${y + 7}Z"/>`;
const valveV = (x, y, cls = '') => `<path class="bd-valve ${cls}" d="M${x - 7} ${y - 9}L${x + 7} ${y + 9}H${x - 7}L${x + 7} ${y - 9}Z"/>`;
const mark = (x, y, n) => `<g class="bd-mark"><circle cx="${x}" cy="${y}" r="13"/><text x="${x}" y="${y}" dominant-baseline="central">${n}</text></g>`;
const lab = (x, y, t, anchor = 'start') => `<text class="bd-lab" x="${x}" y="${y}" text-anchor="${anchor}">${t}</text>`;

export function boilerDiagram() {
  const tubes = Array.from({ length: 11 }, (_, i) => 222 + i * 20).map(x => `<path d="M${x} 126V300"/>`).join('');
  /* 약품 순환 경로: 하부 드럼 배출밸브 → 펌프 → 약품 탱크 → 상부 드럼 분출밸브 */
  const loopA = 'M320 368V404H560V334';
  const loopB = 'M560 250V96H492';
  return `<svg class="bd" viewBox="0 0 640 460" role="img" aria-label="수관식 보일러 계통도. 1 하부 드럼 배출밸브의 플랜지, 2 상부 드럼 분출밸브의 플랜지, 3 잠근 수주통 연락관 밸브, 4 순환 펌프와 약품 탱크의 위치" focusable="false">
  <g class="bd-tubes">${tubes}</g>
  <rect class="bd-drum" x="150" y="50" width="340" height="76" rx="38"/>
  <path class="bd-water" d="M152 92H488A38 38 0 0 1 452 126H188A38 38 0 0 1 152 92Z"/>
  <rect class="bd-drum" x="190" y="300" width="260" height="56" rx="28"/>
  <path class="bd-pipe" d="M92 64H150M92 112H150"/>
  <rect class="bd-col" x="64" y="40" width="28" height="120" rx="14"/>
  ${valveH(121, 64, 'is-closed')}${valveH(121, 112, 'is-closed')}
  <path class="bd-pipe" d="M440 50V30"/><rect class="bd-sv" x="430" y="10" width="20" height="22" rx="4"/>
  <path class="bd-pipe" d="M490 96H548"/>${valveH(516, 96)}<path class="bd-flange" d="M548 84V108"/>
  <path class="bd-pipe" d="M320 356V368"/>${valveV(320, 362)}<path class="bd-flange" d="M308 368H332"/>
  <path class="bd-loop" d="${loopA}"/><path class="bd-loop" d="${loopB}"/>
  <path class="bd-dash" d="${loopA}"/><path class="bd-dash" d="${loopB}"/>
  <rect class="bd-tank" x="530" y="250" width="60" height="84" rx="8"/><path class="bd-chem" d="M532 290H588V326a6 6 0 0 1-6 6H538a6 6 0 0 1-6-6Z"/>
  <circle class="bd-pump" cx="560" cy="404" r="17"/><path class="bd-impeller" d="M560 396v16M552 404h16"/>
  ${lab(320, 94, '상부 드럼', 'middle')}${lab(320, 334, '하부 드럼', 'middle')}${lab(446, 214, '수관')}
  ${lab(78, 184, '수주통', 'middle')}${lab(458, 26, '안전밸브')}${lab(522, 296, '약품 탱크', 'end')}${lab(538, 446, '순환 펌프', 'end')}
  ${mark(352, 384, 1)}${mark(516, 66, 2)}${mark(121, 88, 3)}${mark(598, 380, 4)}
</svg>`;
}

/* ---------- 튜브 단면: 스케일이 쌓인 튜브 / 세관 후 ---------- */
export function tubeSection(state) {
  const before = state === 'before';
  const inner = before
    ? `<circle cx="100" cy="100" r="66" fill="var(--scale)"/>
       <path d="M100 52c22 1 40 13 44 34 5 22-6 44-26 53-21 9-46 3-58-16-11-18-8-41 6-57 9-10 21-14 34-14z" fill="var(--scale-2)"/>
       <path d="M104 68c15 1 26 11 28 25 2 16-8 30-23 33-16 3-31-6-35-21-4-14 4-29 17-34 4-2 8-3 13-3z" fill="var(--water-50)"/>
       ${[[62, 74, 3], [138, 132, 2.5], [70, 140, 2], [144, 70, 2.2], [52, 108, 1.8]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="var(--scale-2)"/>`).join('')}`
    : `<circle cx="100" cy="100" r="66" fill="var(--water-50)"/>
       <path d="M60 86c13-6 27 6 40 0s27-6 40 0M56 112c14-6 30 6 44 0s30-6 44 0" fill="none" stroke="var(--blue)" stroke-width="3" stroke-linecap="round" opacity=".5"/>`;
  return `<svg class="xsec" viewBox="0 0 200 200" aria-hidden="true" focusable="false">${inner}<circle cx="100" cy="100" r="72" fill="none" stroke="var(--steel)" stroke-width="12"/></svg>`;
}
