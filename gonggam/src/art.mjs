/* 아이콘과 서류 그림 */
import { OFFICE } from './content.mjs';

const I = {
  passport: '<rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="10.5" r="3.2"/><path d="M8.8 10.5h6.4M12 7.3c1.2 1.4 1.2 5 0 6.4M12 7.3c-1.2 1.4-1.2 5 0 6.4M9 17h6"/>',
  shield: '<path d="M12 3l7 3v5.5c0 4.3-3 7.8-7 9.5-4-1.7-7-5.2-7-9.5V6z"/><path d="M8.8 12.2l2.2 2.2 4.2-4.4"/>',
  school: '<path d="M3 9.5L12 5l9 4.5-9 4.5z"/><path d="M7 11.5V16c1.3 1.3 3 2 5 2s3.7-.7 5-2v-4.5M21 9.5v5"/>',
  factory: '<path d="M3 20.5h18M4 20.5V11l5 3v-3l5 3v-3l5 3v6.5M16.5 20.5V4h3v13"/><path d="M7 17h2M11 17h2"/>',
  phone: '<path d="M5.5 3.5h3.3l1.7 4.6-2.2 1.4a11.5 11.5 0 006.2 6.2l1.4-2.2 4.6 1.7v3.3a2 2 0 01-2.1 2A16.5 16.5 0 013.5 5.6a2 2 0 012-2.1z"/>',
  chat: '<path d="M4 5.5h16v10H9l-5 4z"/><path d="M8 9.5h8M8 12.5h5"/>',
  route: '<circle cx="6" cy="18" r="2.2"/><circle cx="18" cy="6" r="2.2"/><path d="M8.2 18H15a3 3 0 000-6H9a3 3 0 010-6h6.8"/>',
  pen: '<path d="M4 20l1-4.5L15.5 5a2.1 2.1 0 013 3L8 18.5z"/><path d="M13.5 7l3 3M4 20h16"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/>',
  blog: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 9h8M8 12.5h8M8 16h5"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 15.5h6"/>',
  user: '<circle cx="12" cy="8.5" r="4"/><path d="M4.5 20.5c1.2-3.6 4-5.5 7.5-5.5s6.3 1.9 7.5 5.5"/>',
  alert: '<path d="M12 3.5l9 16H3z"/><path d="M12 10v4.5M12 17.3v.2"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  external: '<path d="M8 16L17 7M9 7h8v8"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>'
};
export const icon = (name, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${I[name]}</svg>`;

export const seal = (cls = 'seal') => `<span class="${cls}" aria-hidden="true"><b>공감</b></span>`;

/* 서류 한 장: 위쪽 분야 표시, 제목, 항목 줄, 아래 서명 칸과 도장 */
const WIDTHS = [[78, 52], [64, 70], [84, 40]];
export function doc(d, { k = 0, attrs = '' } = {}) {
  return `<article class="doc" data-k="${k}" ${attrs}>
    <span class="doc-clip" aria-hidden="true"></span>
    <header class="doc-head"><span class="doc-label">${d.label}</span><span class="doc-office">${OFFICE.name}</span></header>
    <h3 class="doc-title">${d.title}</h3>
    <dl class="doc-rows">${d.rows.map((r, i) => `<div><dt>${r}</dt><dd>${WIDTHS[i].map((w, j) => `<i class="ln" style="--w:${w}%;--j:${i * 2 + j}"></i>`).join('')}</dd></div>`).join('')}</dl>
    <p class="doc-foot"><span>위와 같이 제출합니다.</span><span class="doc-date">2026. 11.</span></p>
    <p class="doc-sign">${OFFICE.repTitle} ${OFFICE.rep} <span class="doc-in">(인)</span>${seal('seal seal-stamp')}</p>
  </article>`;
}
