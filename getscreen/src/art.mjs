/* 아이콘, 원격지원 화면 목업 */
import { BRAND } from './content.mjs';

const I = {
  browser: '<rect x="3" y="4.5" width="18" height="15" rx="2"/><path d="M3 9h18M6.5 6.8h.01M9 6.8h.01"/><path d="M9.5 13.5l2 2 3.5-3.8"/>',
  kiosk: '<rect x="6" y="2.5" width="12" height="13" rx="1.5"/><path d="M9 6.5h6M9 9.5h4M10 15.5v3h4v-3M7.5 21.5h9"/>',
  folders: '<path d="M3 7.5a1.5 1.5 0 011.5-1.5H9l2 2h8.5A1.5 1.5 0 0121 9.5v8a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 17.5z"/><path d="M7 13h10M7 16h6"/>',
  devices: '<rect x="2.5" y="4.5" width="13" height="9.5" rx="1.5"/><path d="M6 18h6M9 14v4"/><rect x="16.5" y="9" width="5" height="10.5" rx="1.2"/><path d="M18.5 17.5h1"/>',
  layers: '<path d="M12 3.5l9 4.5-9 4.5-9-4.5z"/><path d="M3 12.5l9 4.5 9-4.5M3 16.5l9 4.5 9-4.5"/>',
  app: '<rect x="3.5" y="3.5" width="17" height="17" rx="3"/><path d="M3.5 8.5h17M8 12.5h8M8 15.5h5"/>',
  pos: '<rect x="4" y="3" width="16" height="11" rx="1.5"/><path d="M8 7h8M8 10h5M6 14l-1.5 6.5h15L18 14M9 17.5h6"/>',
  factory: '<path d="M3 20.5h18M4 20.5V11l5 3v-3l5 3v-3l5 3v6.5M16.5 20.5V4h3v13"/><path d="M7 17h2M11 17h2"/>',
  code: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 10l-2.5 2.5L9 15M15 10l2.5 2.5L15 15M13 9l-2 7"/>',
  hospital: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M12 8v8M8 12h8"/>',
  screen: '<rect x="2.5" y="4" width="19" height="12" rx="1.5"/><path d="M12 16v4M8 20h8"/><path d="M6.5 8h5M6.5 11h8"/>',
  phone: '<path d="M5.5 3.5h3.3l1.7 4.6-2.2 1.4a11.5 11.5 0 006.2 6.2l1.4-2.2 4.6 1.7v3.3a2 2 0 01-2.1 2A16.5 16.5 0 013.5 5.6a2 2 0 012-2.1z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/>',
  chat: '<path d="M12 4c5 0 9 3.1 9 7s-4 7-9 7c-.9 0-1.8-.1-2.6-.3L5 20l1.2-3.7C4.2 15 3 13.1 3 11c0-3.9 4-7 9-7z"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  external: '<path d="M8 16L17 7M9 7h8v8"/>',
  lock: '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 018 0v2.5"/>',
  zap: '<path d="M13 2.5L4.5 13.5H11L10 21.5l8.5-11H12z"/>',
  link: '<path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1"/>',
  shield: '<path d="M12 3l7 3v5.5c0 4.3-3 7.8-7 9.5-4-1.7-7-5.2-7-9.5V6z"/>',
  wallet: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 9.5h18M16 14.5h2"/>',
  user: '<circle cx="12" cy="8.5" r="4"/><path d="M4.5 20.5c1.2-3.6 4-5.5 7.5-5.5s6.3 1.9 7.5 5.5"/>',
  doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 15.5h6"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  cursor: '<path d="M5 3.5l13 7-5.6 1.6L10 18z" fill="currentColor"/>'
};
export const icon = (name, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${I[name]}</svg>`;

export const mark = (cls = 'mark') => `<span class="${cls}" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14.5" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9.5 21h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M10.2 7.2l6.3 3.4-2.8.8-1.1 2.8z" fill="currentColor"/></svg></span>`;

/* 원격지원 화면: 상담원 브라우저 안에 고객 화면이 열리고, 커서가 오류를 해결 */
export function remoteMock() {
  return `<div class="rs" data-rs aria-hidden="true">
  <div class="rs-stage">
    <div class="rs-browser">
      <div class="rs-bar">
        <span class="rs-dots"><i></i><i></i><i></i></span>
        <span class="rs-url">${icon('lock')}dash.getscreen.kr</span>
        <span class="rs-status"><i></i><b class="st-wait">연결 대기</b><b class="st-on">연결됨</b></span>
      </div>
      <div class="rs-body">
        <aside class="rs-side">
          <p class="rs-side-h">빠른 지원</p>
          <div class="rs-code"><small>접속 번호</small><b>482 913</b></div>
          <p class="rs-side-h">내 기기</p>
          <ul class="rs-dev">
            <li class="on"><i></i>고객 PC</li>
            <li><i></i>매장 키오스크</li>
            <li><i></i>공장 PC</li>
            <li class="off"><i></i>사무실 POS</li>
          </ul>
        </aside>
        <div class="rs-screen">
          <div class="rs-app">
            <div class="rs-app-bar"><span>주문 관리 프로그램</span><span class="rs-win"><i></i><i></i><i></i></span></div>
            <div class="rs-app-body">
              <div class="rs-row h"><i></i><i></i><i></i></div>
              ${[0, 1, 2, 3].map(() => '<div class="rs-row"><i></i><i></i><i></i></div>').join('')}
            </div>
          </div>
          <div class="rs-dialog">
            <p class="rs-dialog-h"><span class="warn">!</span>프린터가 응답하지 않습니다</p>
            <p class="rs-dialog-t">영수증 프린터 연결을 확인해 주세요.</p>
            <div class="rs-dialog-b"><span>취소</span><span class="pri">설정 열기</span></div>
          </div>
          <div class="rs-settings">
            <p class="rs-dialog-h">프린터 설정</p>
            <div class="rs-set-row"><span>기본 프린터로 사용</span><span class="rs-toggle"><i></i></span></div>
            <div class="rs-set-row"><span>영수증 자동 출력</span><span class="rs-toggle on"><i></i></span></div>
          </div>
          <div class="rs-toast">${icon('check')}<span>문제가 해결됐어요</span></div>
          <div class="rs-taskbar"><i></i><i></i><i></i><span>오후 2:14</span></div>
          <div class="rs-connecting"><span class="rs-spin"></span><b>고객 화면에 연결하는 중</b><small>접속 번호 482 913</small></div>
          <div class="rs-cursor">${icon('cursor', 'ic rs-arrow')}<span>상담원</span><i class="rs-ripple"></i></div>
        </div>
      </div>
    </div>
    <div class="rs-chip rs-chip-a">${icon('zap')}<span>설치 없이 브라우저에서</span></div>
    <div class="rs-chip rs-chip-b">${icon('kiosk')}<span>무인기기 상시접속</span></div>
  </div>
</div>`;
}

/* 기능 카드용 작은 화면 */
export const featureUI = {
  web: () => `<div class="fui fui-web"><div class="fui-bar"><i></i><i></i><i></i><span>빠른 지원</span></div><div class="fui-in"><p>초대 링크</p><div class="fui-field"><span>getscreen.me/…</span><b>복사</b></div><p>접속 번호</p><div class="fui-code">482 913</div></div></div>`,
  unattended: () => `<div class="fui fui-list">${[['매장 키오스크 01', 1], ['매장 키오스크 02', 1], ['공장 PC (라인 2)', 1], ['사무실 POS', 0]].map(([n, on]) => `<div class="fui-dev"><i class="${on ? 'on' : ''}"></i><span>${n}</span><b>${on ? '온라인' : '꺼짐'}</b></div>`).join('')}</div>`,
  group: () => `<div class="fui fui-tree"><div class="fui-g">${icon('folders')}<b>A사 사무실</b><span>4대</span></div><div class="fui-g sub"><i></i>회계팀 PC</div><div class="fui-g sub"><i></i>영업팀 PC</div><div class="fui-g">${icon('folders')}<b>B사 매장</b><span>2대</span></div><div class="fui-g sub"><i></i>키오스크</div></div>`,
  os: () => `<div class="fui fui-os">${BRAND.oses.map(o => `<span>${o}</span>`).join('')}</div>`,
  sessions: () => `<div class="fui fui-tabs"><div class="fui-tab on">세션 1</div><div class="fui-tab">세션 2</div><div class="fui-tab">세션 3</div><div class="fui-tab more">+</div><div class="fui-pane"><i></i><i></i><i></i></div></div>`,
  dash: () => `<div class="fui fui-choice"><div class="fui-opt on">${icon('browser')}<b>웹 브라우저</b><span>기본</span></div><div class="fui-opt">${icon('app')}<b>설치형 대시보드</b><span>선택</span></div></div>`
};
