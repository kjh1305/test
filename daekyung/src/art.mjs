/* 아이콘 (선 아이콘, 24×24) */
const I = {
  phone: '<path d="M5.5 3.5h3.3l1.7 4.6-2.2 1.4a11.5 11.5 0 006.2 6.2l1.4-2.2 4.6 1.7v3.3a2 2 0 01-2.1 2A16.5 16.5 0 013.5 5.6a2 2 0 012-2.1z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/>',
  doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 15.5h6"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
  external: '<path d="M8 16L17 7M9 7h8v8"/>',
  camera: '<path d="M4 7.5h3.5L9 5h6l1.5 2.5H20a1 1 0 011 1V19a1 1 0 01-1 1H4a1 1 0 01-1-1V8.5a1 1 0 011-1z"/><circle cx="12" cy="13.5" r="3.8"/>',
  blog: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 9h8M8 12.5h8M8 16h5"/>',
  user: '<circle cx="12" cy="8.5" r="3.5"/><path d="M5 20a7 7 0 0114 0"/>',
  chevron: '<path d="M9 6l6 6-6 6"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  arrowUpRight: '<path d="M7 17L17 7M8 7h9v9"/>',
  up: '<path d="M12 19V5M6 11l6-6 6 6"/>'
};
export const icon = (name, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${I[name]}</svg>`;

/* 공종 선 아이콘 (64×64, 가는 선). 홈 아이콘 줄과 큰 블록의 바탕 그림에 씁니다. */
const L = {
  /* 경량철골: 위아래 러너와 스터드 */
  frame: '<rect x="6" y="8" width="52" height="5" rx="1"/><rect x="6" y="51" width="52" height="5" rx="1"/><path d="M14 13v38M26 13v38M38 13v38M50 13v38"/><path d="M14 27h12M38 37h12"/>',
  /* 칸막이·가벽: 판넬 벽과 문 */
  partition: '<path d="M6 56V10h52v46"/><path d="M4 56h56"/><path d="M19 10v46M45 10v46"/><rect x="26" y="24" width="12" height="32"/><circle cx="35" cy="41" r="1.2"/>',
  /* 천장·텍스: 천장 격자와 텍스 무늬 */
  ceiling: '<path d="M4 12h56L50 34H14z"/><path d="M22 12l-4 22M32 12v22M42 12l4 22M9 23h46"/><path d="M32 34v8"/><path d="M26 48a6 6 0 0112 0z"/><path d="M14 18h.01M26 18h.01M37 18h.01M49 18h.01M18 29h.01M29 29h.01M36 29h.01M46 29h.01"/>',
  /* 철거·원상복구: 되돌리는 화살표와 벽 */
  restore: '<path d="M14 22a22 22 0 1 1-4 14"/><path d="M6 14l4 9 9-3"/><rect x="24" y="26" width="18" height="16"/><path d="M24 34h18M33 26v8M29 34v8M37 34v8"/>',
  /* 목공·인테리어: 나무 판재와 직각자 */
  wood: '<rect x="6" y="18" width="40" height="16" rx="1.5"/><path d="M11 23c6 2 12 2 18 0s10-2 14 0M11 29c5-2 10-2 15 0s9 2 15 0"/><path d="M40 40h18v18H52V46H40z"/><path d="M44 46v-2M48 46v-3M52 50h2M52 54h3"/>'
};
export const lineIcon = (name, cls = 'lic') => `<svg class="${cls}" viewBox="0 0 64 64" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${L[name]}</svg>`;
