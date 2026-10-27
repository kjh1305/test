# 마케팅 회사 홈페이지 시안

가상의 마케팅 회사 "플롯라인(Plotline)"을 기준으로 만든 홈페이지 시안입니다. 회사명, 고객사, 사례, 수치는 모두 가상입니다.

## 구성

- `index.html` — 페이지 전체 구조
- `assets/css/style.css` — 디자인
- `assets/js/main.js` — 메인 스토리보드 애니메이션, 포트폴리오 필터와 상세, 문의 폼 검증
  - 서비스는 `SERVICES`, 포트폴리오 사례는 `CASES` 배열에서 고치면 됩니다.
- `assets/fonts` — SUIT, 나눔손글씨 펜 (둘 다 SIL OFL, 자체 호스팅)
- `assets/og.png` — 링크 공유 미리보기 이미지

## 실제 회사명으로 바꾸기

`index.html`과 `assets/js/main.js`에서 `플롯라인`, `Plotline`을 검색해 바꾸면 됩니다. 시안 안내 문구는 푸터의 `footer-note`에 있습니다.

## 배포

GitHub Pages에서 `main` 브랜치의 루트(`/`)를 배포 경로로 지정하면 됩니다. 시안이라 검색엔진 수집은 막아 두었습니다(`noindex`).
