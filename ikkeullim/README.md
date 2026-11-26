# 이끌림 마케팅 홈페이지 시안 (베이스)

주소: https://kjh1305.github.io/test/ikkeullim/

`node build.mjs`로 HTML을 만듭니다 (Node 18 이상, 설치할 패키지 없음). 내용은 `src/content.mjs`, 화면 조각은 `src/pages.mjs`와 `src/layout.mjs`, 스타일은 `assets/css/site.css`.

## 바탕 자료

- 업체 로고 이미지: 실버 A, 하늘색 상승 화살표, 별, 'Attract Marketing / 이끌림 마케팅 / 마음을 끌고, 성과를 만듭니다'
- 요청 (2026-11-16)
  - 참고 사이트 noranmkt.com과 메뉴·내용은 비슷하게, 느낌은 아예 다르게
  - 검정 배경, 아주 좋은 퀄리티
  - 굿즈 메뉴 제외, 상품에 '홈페이지 및 블로그 관리대행' 추가
  - 사명은 '이끌림'
  - 상담은 별도 카카오톡 채팅으로 받음 → 상담 폼 없이 모든 상담 버튼을 카카오톡으로
  - 세부 업무, 성과, 고객후기 이미지(70~80장)는 나중에 받음 → 지금은 '채울 자리'

## 참고 사이트에서 본 것 (noranmkt.com, 전체 메뉴)

- 메뉴: 홈 / 회사소개 / 블로그 마케팅 / 블로그 진단(아이디 입력해 등급 매기는 도구) / 포트폴리오(템플릿 59종 + 업종별 검색 결과) / 상품 안내(블로그 활성화 3유형, 단품, 상담 상품, 올인원, 굿즈) / 굿즈 / FAQ / 상담신청
- 디자인: 따뜻한 갈색 어둠(#232119) + 노란색(#FFD400), 둥근 카드(14~20px), 영어 소제목 + 노란 줄, 친근한 '~해요' 말투, 검색 화면 모형과 데모 그래프

## 이끌림 시안이 다르게 간 것

| 구분 | 참고 사이트 | 이끌림 |
| --- | --- | --- |
| 바탕 | 따뜻한 갈색 어둠 | 차가운 순흑 `#060709` |
| 색 | 노란색 | 로고의 실버(제목 그라데이션)와 하늘색 `#8EC2F5` 하나 |
| 모양 | 둥근 카드 | 각진 모서리(4px), 가는 선, 크게 쓴 제목 |
| 첫 화면 | 검색 결과 모형 | 점들이 곡선을 따라 가운데 로고로 끌려 들어가는 그림 (= 이끌림) |
| 서비스 | 카드 4개 | 큰 대표 상품 1개 + 작은 카드 5개 (벤토) |
| 말투 | ~해요 | ~합니다 |
| 블로그 진단 | 따로 메뉴(도구) | 상담신청 폼의 '무료 블로그 진단' 항목으로 합침 |

글꼴: Pretendard(본문·제목) + Instrument Serif(영문 'Attract Marketing'과 큰 번호, Google Fonts).

## 밝은 화면 전환

- 헤더 오른쪽 해/달 버튼(모바일은 메뉴 안 버튼)으로 어두운 화면 ↔ 밝은 화면. 기본은 어두운 화면이고, 고른 쪽을 브라우저에 기억함(`localStorage` 'ik-theme')
- 색은 `assets/css/site.css` 맨 위 `:root`(어두운)와 `:root[data-theme="light"]`(밝은)에서만 바꿈. 로고 A의 은색도 밝은 화면에서는 진한 쇠색으로 바뀜(`--mk1~3`)

## 페이지

| 주소 | 내용 |
| --- | --- |
| `/` | 첫 화면, 업종 흐름 띠, 이끌림의 방법(3가지 순환), 서비스 벤토, 업종별 사례 화면, 진행 6단계 + 사장님이 하실 일, 사장님 한마디 띠, 마무리 |
| `about/` | 소개 글('검색되는 브랜드가 선택받는 브랜드입니다'), 이끌림이 다른 점(3), 진행 6단계, 운영 정보(대표·주소·사업자등록번호) |
| `services/` | 맨 위 '네이버가 글을 고르는 방식'(크롤링→인덱싱→랭킹, C-RANK · D.I.A.+ · 스마트블록과 이끌림의 대응), 서비스 6개: 홈페이지 및 블로그 관리대행(통합 패키지), 블로그 포스팅, 블로그 활성화, 홈페이지 제작, 블로그 스킨 디자인, 영상 제작. 각 서비스에 '이런 분께' |
| `portfolio/` | 위쪽 탭(검색 결과 화면 / 홈페이지 템플릿), 검색 결과 화면 79장 사진첩(업종 골라 보기, 16장 + 더 보기), 홈페이지 템플릿 미리보기 8개와 '모두 보기'. 원래 있던 '홈페이지 · 블로그 디자인 제작 사례' 빈자리는 템플릿으로 바꿈(실제 제작 사례 이미지를 받으면 다시 넣을 수 있음) |
| `pricing/` | 대표 상품(홈페이지 및 블로그 관리대행 = 포스팅 + 활성화 + 디자인 통합 패키지) 크게, 블로그 / 홈페이지 & 브랜드 디자인 두 묶음. 가격은 모두 '상담 문의' |
| `reviews/` | 대표님이 보내 주신 말 11개(반응 골라 보기, 실제 카톡 캡처), 블로그를 보고 들어온 문의 5개 |
| `faq/` | 서비스 · 진행 · 결제 12문항. 제안서 질문·답변 7개(`src: '제안서'`) + 예시 답변 5개 |
| `contact/` | 상담 안내: 카카오톡 상담 버튼, 보내 주면 좋은 내용 4가지, 진행 순서 |
| `portfolio/templates/` | 홈페이지 템플릿 모음(상담 중에 '여기서 골라 주세요' 하고 보여 주는 페이지): 고르는 순서 3단계, 분위기 골라 보기, 템플릿마다 PC·휴대폰 화면, 설명, 어울리는 업종, 색, 글꼴, 미리보기. 포트폴리오 위쪽 탭, 포트폴리오 아래 템플릿 미리보기, 서비스의 '홈페이지 제작'에서 들어감 |
| `portfolio/templates/t01/` … | 템플릿 한 장짜리 화면. 위에 '템플릿 목록 / 이 템플릿으로 상담' 막대 |

상담 버튼(헤더, 첫 화면, 서비스·상품, 마무리 띠, PC 오른쪽 아래 노란 버튼, 모바일 하단 노란 바)은 모두 `CO.kakao`로 연결됩니다. 주소가 비어 있는 동안은 상담 안내 페이지로 갑니다.

## 홈페이지 템플릿 (2026-11-26 요청)

요청: 홈페이지 제작을 원하는 업체가 템플릿을 보고 기본 화면을 고를 수 있게, 서로 다른 느낌으로 20개 정도. 업체가 원하는 느낌을 말로만 설명하면 너무 추상적이라 고를 거리가 필요함.

- 1차로 4개(T01~T04)를 만들어 보여 드림. 업체 답(2026-11-26): 포트폴리오 안에 넣고, 상담 중에 템플릿 모음 페이지를 보여 주며 고르게 함. 나머지는 알아서, 많을수록 좋음 → 24개로 정함(상담 중 한 화면에서 고르기 좋은 양, 분위기로 골라 보기). 처음 계획한 16개에 반려동물, 꽃집, 자동차 정비, 요가·필라테스를 더함
- 템플릿은 `portfolio/templates/tNN/index.html` 한 파일에 CSS·JS를 모두 넣은 한 장짜리 화면입니다(빌드 없이 그대로 고침). 사이트 빌드(`node build.mjs`)는 모음 페이지(`portfolio/templates/index.html`)만 만듭니다
- 위쪽 안내 막대(`portfolio/templates/tpl.css`): 템플릿 번호와 이름, '글과 사진은 예시', 템플릿 목록, 이 템플릿으로 상담(상담 안내 페이지)
- 상호, 글, 가격, 전화번호(02-000-0000, 010-0000-0000), 주소(OO구)는 모두 지어낸 예시
- 목록 데이터: `src/content.mjs`의 `TEMPLATES`(번호, 이름, 분위기 `f`, 어울리는 업종, 설명, 색, 글꼴)와 `TPL_MOODS`(깔끔한, 고급스러운, 강렬한, 따뜻한, 자연스러운, 귀여운, 어두운)
- 목록의 화면 사진: `assets/img/tpl/tNN-pc.webp`(1440×900 화면을 960×600으로), `tNN-m.webp`(390×844 화면을 240×520으로). 안내 막대는 빼고 찍음. 템플릿을 고치면 다시 찍어야 함

<!-- tpl-table -->
| 번호 | 이름 | 분위기 | 화면 구성 | 어울리는 업종 | 글꼴 |
| --- | --- | --- | --- | --- | --- |
| T01 | 여백 | 깔끔한 | 넓은 여백과 가는 글자, 아치형 사진으로 차분하게 보여 줍니다. 진료 시간표에 오늘 요일과 지금 진료 중인지를 표시합니다. | 병원·의원, 한의원, 상담 업종 | IBM Plex Sans KR |
| T02 | 지면 | 고급스러운, 깔끔한 | 잡지처럼 큰 명조 제목과 넓게 펼친 사진. 작업마다 위치, 면적, 기간, 공사 범위를 붙이고 상담 신청 폼으로 끝납니다. | 인테리어, 건축, 가구, 사진 스튜디오 | Noto Serif KR · Pretendard |
| T03 | 물살 | 강렬한 | 화면을 채우는 굵은 글자와 진한 파랑. 반별 안내, 요일별 시간표, 요금표를 크고 분명하게 보여 줍니다. | 운동·레슨, 학원, 체육시설 | Black Han Sans · Pretendard |
| T04 | 오늘구움 | 귀여운, 따뜻한 | 둥근 글자와 딸기색, 물결 테두리. 오늘 나오는 시간을 지금 시각에 맞춰 보여 주고, 메뉴와 가격을 사진과 함께 놓습니다. | 디저트·카페, 동네 가게, 꽃집, 키즈 | Jua · Gowun Dodum |
| T05 | 밤의 식탁 | 고급스러운, 어두운 | 어두운 와인색과 황동색. 차림표처럼 정리한 코스와 잔 와인 가격, 대관 안내, 날짜·시간을 고르는 예약 문의가 있습니다. | 와인바, 다이닝, 오마카세, 바 | Hahmlet · Pretendard |
| T06 | 단단함 | 깔끔한, 강렬한 | 남색과 파랑. 회사 개요 숫자, 가공 범위, 보유 설비 표, 납품 절차, 고객사 로고 자리, 도면을 첨부하는 견적 폼까지 회사 소개에 필요한 것을 갖췄습니다. | 제조, 공장, 기업 간 거래, 설비 | Gothic A1 |
| T07 | 숲결 | 자연스러운, 따뜻한 | 연한 초록과 부드러운 명조, 둥근 사진 틀과 세로로 쓴 글귀. 진료 안내, 한약 소개, 진료 과정, 진료 시간을 편안하게 보여 줍니다. | 한의원, 약국, 자연주의 제품, 상담 | Gowun Batang · Pretendard |
| T08 | 결 | 고급스러운, 따뜻한 | 연분홍과 모브색, 가는 명조. 겹쳐 놓은 사진, 탭으로 나눈 관리 메뉴와 가격, 처음 오시는 분 안내, 네이버 예약 버튼이 있습니다. | 피부관리, 네일, 헤어, 뷰티 숍 | Nanum Myeongjo · Pretendard |
| T09 | 놀이터 | 귀여운, 강렬한 | 노랑·하늘·초록·주황에 굵은 테두리, 스티커처럼 기울인 반 소개 카드. 하루 일과표와 이번 주 식단표를 매주 바꿔 올릴 수 있습니다. | 어린이집, 유치원, 키즈 카페, 아이 학원 | Dongle · Pretendard |
| T10 | 밑줄 | 깔끔한, 귀여운 | 모눈 공책 바탕에 형광펜 밑줄과 빨간 손글씨 메모. 학년별로 골라 보는 반 시간표, 일주일 수업 방식, 레벨 테스트 신청이 있습니다. | 학원, 교습소, 공부방, 과외 | Pretendard · Nanum Pen Script |
| T11 | 정도 | 고급스러운, 깔끔한 | 버건디와 금색 선, 고전적인 명조. 펼쳐 보는 업무 분야 목차, 대표 소개, 상담 절차와 비용 표, 상담 예약 폼으로 믿음을 줍니다. | 법률, 세무, 노무, 회계, 전문직 | Song Myung · Pretendard |
| T12 | 반반 | 강렬한, 깔끔한 | 화면을 반으로 나눠 한쪽은 사진, 한쪽은 목록. 아래로 내릴 때마다 사진이 바뀌고, 종류별로 골라 보는 매물 카드와 중개 보수 표가 있습니다. | 부동산, 분양, 매장 여러 곳, 상품 목록 | Noto Sans KR |
| T13 | 프레임 | 깔끔한 | 흰 바탕에 사진만 크게. 종류별로 골라 보는 벽돌 쌓기 사진첩, 누르면 크게 보기, 촬영 상품표가 있습니다. 작업물이 많은 업체에 맞습니다. | 사진관, 영상 제작, 작가, 디자이너 | Pretendard |
| T14 | 바로문의 | 강렬한 | 첫 화면에 견적 폼을 두고 노랑과 검정으로 눈에 띄게. 고객 고민, 시공 순서, 가격표, 자주 묻는 질문, 휴대폰 하단 전화 버튼까지 문의 받기에 집중했습니다. | 시공, 청소, 이사, 수리, 방역 | Do Hyeon · Pretendard |
| T15 | 골목 | 따뜻한, 귀여운 | 빨강·겨자·민트에 옛날 간판 글씨. 차림판처럼 꾸민 메뉴와 가격, 기울여 붙인 사진, 가게 연혁, 포장·배달 안내가 있습니다. | 분식, 노포, 동네 식당, 오래된 가게 | Yeon Sung · Nanum Gothic |
| T16 | 회로 | 깔끔한 | 밝은 회청색에 파랑과 민트. 화면 안에 직접 만든 프로그램 화면, 기능 소개, 월·연 결제로 바뀌는 요금표, 자주 묻는 질문이 있습니다. | IT, 앱, 프로그램, 온라인 서비스 | Orbit · IBM Plex Sans KR |
| T17 | 나뭇결 | 따뜻한, 자연스러운 | 호두나무색과 굵은 명조. 옆으로 넘겨 보는 작품, 눌러 보는 나무 견본, 클래스 안내와 주문 제작 순서가 있습니다. | 가구, 목공, 공방, 수공예 | Noto Serif KR · Pretendard |
| T18 | 한상 | 자연스러운, 고급스러운 | 한지 바탕에 먹색, 붓글씨를 세로로 쓰고 붉은 낙관을 찍었습니다. 족자처럼 걸어 놓은 차림표와 계절 상차림이 있습니다. | 찻집, 한식당, 떡집, 전통 공예 | Nanum Brush Script · Nanum Myeongjo |
| T19 | 머무름 | 자연스러운, 고급스러운 | 화면 가득한 풍경 위에 날짜와 인원을 고르는 예약 막대. 객실 카드, 평일·주말·성수기 요금표, 주변 즐길 거리, 이용 안내가 있습니다. | 펜션, 숙소, 캠핑장, 스테이 | Diphylleia · Pretendard |
| T20 | 모노 | 고급스러운, 강렬한 | 흑백 사진과 아주 가는 큰 글자, 맨 위의 빨간 선 하나. 마우스를 올리면 사진이 바뀌는 작업 목록과 넘겨 보는 사진 띠가 있습니다. | 건축, 인테리어 설계, 디자인 사무소 | Pretendard |
| T21 | 산책 | 귀여운, 따뜻한 | 귤색과 남색에 통통한 글씨. 몸 크기를 고르면 바뀌는 미용 가격표, 호텔·데이케어 카드, 하루 일과, 예약 전 확인할 것이 있습니다. | 반려동물 미용, 호텔, 용품, 동물병원 | Bagel Fat One · Pretendard |
| T22 | 꽃말 | 자연스러운, 따뜻한 | 짙은 잎색과 양귀비 빨강, 장식적인 제목 글씨. 오늘 배송 마감까지 남은 시간, 쓰임새별 꽃다발, 정기 구독, 배송 안내가 있습니다. | 꽃집, 선물 가게, 소품, 케이크 주문 | Grandiflora One · Gowun Dodum |
| T23 | 주행 | 강렬한, 어두운 | 아스팔트 회색과 신호 빨강, 사선으로 자른 사진과 경고 띠. 탭으로 나눈 작업 가격표, 정비 순서, 차종과 날짜를 받는 예약 폼이 있습니다. | 자동차 정비, 세차, 광택, 타이어 | Gasoek One · Pretendard |
| T24 | 숨 | 자연스러운, 깔끔한 | 연보라와 자두색, 천천히 커졌다 작아지는 숨쉬기 원. 수준을 고르면 맞는 수업만 보이는 주간 시간표와 회원권 안내가 있습니다. | 요가, 필라테스, 명상, 상담 | Sunflower |
<!-- /tpl-table -->

### 템플릿 사진 출처

사진은 Unsplash 사진입니다(Unsplash 라이선스: 상업적으로 무료로 쓸 수 있고 출처 표기는 필요 없음). Unsplash 검색은 봇 확인 화면이 떠서 쓰지 않았고, Unsplash 사진을 모아 둔 Lorem Picsum(picsum.photos)에서 크기에 맞게 잘라 받아 WebP로 줄였습니다. 실제 업체 홈페이지에는 업체 사진을 씁니다.

<!-- tpl-credits -->
| 파일 (`portfolio/templates/`) | 찍은 사람 | 원본 |
| --- | --- | --- |
| `t01/img/hero.webp` | Todd Quackenbush | https://unsplash.com/photos/JJB_K8aCPU4 |
| `t01/img/dome.webp` | Drew Patrick Miller | https://unsplash.com/photos/VLT62-JzddA |
| `t01/img/rest.webp` | David Mao | https://unsplash.com/photos/m0l5J8Lqnzo |
| `t02/img/hero.webp` | Breather | https://unsplash.com/photos/DEdM9Vs6s8w |
| `t02/img/frames.webp` | The Anchor | https://unsplash.com/photos/6hgsktgpfIE |
| `t02/img/balcony.webp` | Dominik Martin | https://unsplash.com/photos/B6uUPYt7wz4 |
| `t02/img/window.webp` | Logan Adermatt | https://unsplash.com/photos/VkF8pVVoFg0 |
| `t02/img/desk.webp` | Aleksi Tappura | https://unsplash.com/photos/mCg0ZgD7BgU |
| `t02/img/tools.webp` | Jeff Sheldon | https://unsplash.com/photos/8z2Q6XWLYa4 |
| `t02/img/floor.webp` | Keith Misner | https://unsplash.com/photos/h0Vxgz5tyXA |
| `t03/img/hero.webp` | Todd Quackenbush | https://unsplash.com/photos/E9PJO_vL3E8 |
| `t03/img/under.webp` | Stefanus Martanto Setyo Husodo | https://unsplash.com/photos/74ytEYcOJDc |
| `t04/img/hero.webp` | Olenka Kotyk | https://unsplash.com/photos/eqsEZNCm4-c |
| `t04/img/cake.webp` | Annie Spratt | https://unsplash.com/photos/R3LcfTvcGWY |
| `t04/img/rasp.webp` | Glen Carrie | https://unsplash.com/photos/FjjUVn_KHLU |
| `t04/img/straw.webp` | veeterzy | https://unsplash.com/photos/OJJIaFZOeX4 |
| `t04/img/yog.webp` | Jeffrey Deng | https://unsplash.com/photos/h6t2dbYgDuc |
| `t04/img/latte.webp` | Carli Jean | https://unsplash.com/photos/UWRqlJcDCXA |
| `t04/img/honey.webp` | Sonja Langford | https://unsplash.com/photos/RQHzRELE2Ss |
| `t04/img/berries.webp` | Ben Moore | https://unsplash.com/photos/pJILiyPdrXI |
| `t05/img/hero.webp` | Todd Quackenbush | https://unsplash.com/photos/x5SRhkFajrA |
| `t05/img/grapes.webp` | Jassy Onyae | https://unsplash.com/photos/1gBUXhf0PtA |
| `t05/img/forks.webp` | Alejandro Escamilla | https://unsplash.com/photos/8yqds_91OLw |
| `t05/img/dish.webp` | davide ragusa | https://unsplash.com/photos/4jcFu1byopQ |
| `t06/img/hero.webp` | Sylwia Bartyzel | https://unsplash.com/photos/sfO5mHyObtM |
| `t06/img/grid.webp` | Mika Ruusunen | https://unsplash.com/photos/ypVM8PnygUo |
| `t06/img/hall.webp` | Erez Attias | https://unsplash.com/photos/KqVHRmHVwwM |
| `t07/img/hero.webp` | Jean Lakosnyk | https://unsplash.com/photos/N9yFjkDc0vA |
| `t07/img/buds.webp` | John French | https://unsplash.com/photos/SNW4DWZEy8I |
| `t07/img/green.webp` | Noah Baslé | https://unsplash.com/photos/kqB7IDljjMI |
| `t08/img/hero.webp` | Aaron Burden | https://unsplash.com/photos/UvRMcIeXq9Y |
| `t08/img/coral.webp` | Cas Cornelissen | https://unsplash.com/photos/G2UTNecskWg |
| `t08/img/cup.webp` | Carli Jean | https://unsplash.com/photos/15YDf39RIVc |
| `t08/img/bloom.webp` | Arvee Marie | https://unsplash.com/photos/YnfGtpt2gf4 |
| `t09/img/trike.webp` | Florian Klauer | https://unsplash.com/photos/GG0jOrmwqtw |
| `t09/img/swing.webp` | Aaron Burden | https://unsplash.com/photos/ob6O_xd67O0 |
| `t10/img/book.webp` | Alejandro Escamilla | https://unsplash.com/photos/cZhUxIQjILg |
| `t10/img/note.webp` | Noe Araujo | https://unsplash.com/photos/ChY016PARQY |
| `t11/img/hero.webp` | Alec Cutter | https://unsplash.com/photos/Sfn8f32ZIj0 |
| `t11/img/hall.webp` | Hartmut Tobies | https://unsplash.com/photos/O9TEKuI1Icw |
| `t12/img/park.webp` | freddie marriage | https://unsplash.com/photos/utwYoEu9SU8 |
| `t12/img/sea.webp` | Rúben dos Santos | https://unsplash.com/photos/DROwSrK20nE |
| `t12/img/city.webp` | Lili Popper | https://unsplash.com/photos/71cd1rWqO8M |
| `t12/img/sky.webp` | Carli Jean | https://unsplash.com/photos/Gk6YgzmrLgM |
| `t12/img/white.webp` | Julien Moreau | https://unsplash.com/photos/688Fna1pwOQ |
| `t13/img/hero.webp` | Jeff Sheldon | https://unsplash.com/photos/zr8msYQhfRg |
| `t13/img/g1.webp` | Alexey Topolyanskiy | https://unsplash.com/photos/-oWyJoSqBRM |
| `t13/img/g2.webp` | Christian Joudrey | https://unsplash.com/photos/mWRR1xj95hg |
| `t13/img/g3.webp` | Andrew Coelho | https://unsplash.com/photos/VB-w_3dnyvI |
| `t13/img/g4.webp` | Wolfgang Lutz | https://unsplash.com/photos/yOujaSETXlo |
| `t13/img/g5.webp` | Go Wild | https://unsplash.com/photos/V0yAek6BgGk |
| `t13/img/g6.webp` | Philippe Wuyts | https://unsplash.com/photos/_h7aBovKia4 |
| `t13/img/g7.webp` | Ales Krivec | https://unsplash.com/photos/HkTMcmlMOUQ |
| `t13/img/g8.webp` | Paul Jarvis | https://unsplash.com/photos/NYDo21ssGao |
| `t13/img/cam.webp` | Mia Domenico | https://unsplash.com/photos/1z1F5Qc30Bs |
| `t14/img/hero.webp` | Jeff Sheldon | https://unsplash.com/photos/JWiMShWiF14 |
| `t14/img/wood.webp` | Steve Richey | https://unsplash.com/photos/6xqAK6oAeHA |
| `t15/img/shop.webp` | Thong Vo | https://unsplash.com/photos/ZLmSzOPoUno |
| `t15/img/coffee.webp` | Justin Leibow | https://unsplash.com/photos/ZJsseAxEcqM |
| `t15/img/door.webp` | Brennan Ehrhardt | https://unsplash.com/photos/HALe2SmkWAI |
| `t15/img/veg.webp` | Webvilla | https://unsplash.com/photos/hv1MrBzGGNY |
| `t15/img/bowl.webp` | Monstruo Estudio | https://unsplash.com/photos/lQy6mHZ7fYk |
| `t15/img/mug.webp` | Shyamanta Baruah | https://unsplash.com/photos/aeVA-j1y2BY |
| `t16/img/desk.webp` | Vadim Sherbakov | https://unsplash.com/photos/Hi9GSwWkCJk |
| `t16/img/imac.webp` | William Iven | https://unsplash.com/photos/GANqCr1BRTU |
| `t16/img/white.webp` | Jeff Sheldon | https://unsplash.com/photos/9dI3g8owHiI |
| `t17/img/hero.webp` | Todd Quackenbush | https://unsplash.com/photos/IClZBVw5W5A |
| `t17/img/shop.webp` | Ariana Prestes | https://unsplash.com/photos/MpSnQAUTgcE |
| `t17/img/bench.webp` | Jeff Sheldon | https://unsplash.com/photos/o6Y9E-DdG6w |
| `t17/img/pencil.webp` | Jeff Sheldon | https://unsplash.com/photos/guH91yuPaMk |
| `t17/img/cabin.webp` | Alexander Shustov | https://unsplash.com/photos/OxzhYtL-00Y |
| `t17/img/room.webp` | Clark Street Mercantile | https://unsplash.com/photos/vC-GqGbakJo |
| `t18/img/pot.webp` | Vee O | https://unsplash.com/photos/hGO27G5tZJ8 |
| `t18/img/cup.webp` | Dominik Martin | https://unsplash.com/photos/JYFmYif4n70 |
| `t18/img/knit.webp` | Padurariu Alexandru | https://unsplash.com/photos/k0SwnevO_wk |
| `t19/img/hero.webp` | Ales Krivec | https://unsplash.com/photos/DgtRKZOOE0w |
| `t19/img/night.webp` | Aurélien bellanger | https://unsplash.com/photos/uoSEDUu8F-I |
| `t19/img/walk.webp` | Aleksandra Boguslawska | https://unsplash.com/photos/MS7KD9Ti7FQ |
| `t19/img/dusk.webp` | Stefanus Martanto Setyo Husodo | https://unsplash.com/photos/GKR1tBkmW3M |
| `t19/img/coast.webp` | Rob Bye | https://unsplash.com/photos/OlZ1nWLEEgM |
| `t20/img/hero.webp` | Carl Nenzen Loven | https://unsplash.com/photos/busqfOj6i80 |
| `t20/img/p1.webp` | Noah Rosenfield | https://unsplash.com/photos/Za0O5DovZBc |
| `t20/img/p2.webp` | Padurariu Alexandru | https://unsplash.com/photos/ZKBQmgMyf8s |
| `t20/img/p3.webp` | Samuel Zeller | https://unsplash.com/photos/j0g8taxHZa0 |
| `t20/img/p4.webp` | Matthew Wiebe | https://unsplash.com/photos/VviFtDJakYk |
| `t20/img/p5.webp` | Anthony DELANOIX | https://unsplash.com/photos/b5POxb2aL9o |
| `t20/img/p6.webp` | Roman Kraft | https://unsplash.com/photos/7sMHTVJ0OTA |
| `t21/img/hero.webp` | André Spieker | https://unsplash.com/photos/8wTPqxlnKM4 |
| `t21/img/pug.webp` | Matthew Wiebe | https://unsplash.com/photos/U5rMrSI7Pn4 |
| `t21/img/bull.webp` | Yamon  Figurs | https://unsplash.com/photos/2zlxFmByClI |
| `t21/img/husky.webp` | Alexander Dimitrov | https://unsplash.com/photos/KGy1GFeKBu4 |
| `t21/img/dash.webp` | Noel Lopez | https://unsplash.com/photos/BjelfpszQDw |
| `t22/img/hero.webp` | Leigh Kendell | https://unsplash.com/photos/-So60UAgCtU |
| `t22/img/b1.webp` | Ales Krivec | https://unsplash.com/photos/hLxqYJspAkE |
| `t22/img/b2.webp` | Steven Spassov | https://unsplash.com/photos/tVIqMgGlAG0 |
| `t22/img/b3.webp` | Shannon Richards | https://unsplash.com/photos/jJzmexjwfGE |
| `t22/img/b4.webp` | Rula Sibai | https://unsplash.com/photos/-vq7mi4oF0s |
| `t22/img/b5.webp` | Alejandro Escamilla | https://unsplash.com/photos/Iuq0EL4EINY |
| `t22/img/vase.webp` | Padurariu Alexandru | https://unsplash.com/photos/iNmouRApXYM |
| `t23/img/hero.webp` | jamie mink | https://unsplash.com/photos/5Qwz2KyfIBE |
| `t23/img/dash.webp` | Sean Stratton | https://unsplash.com/photos/3I5j50pIXvU |
| `t23/img/seat.webp` | David Marcu | https://unsplash.com/photos/_iVG4MsY2N0 |
| `t24/img/hero.webp` | Federico Bottos | https://unsplash.com/photos/11H1SSVcIxc |
| `t24/img/hill.webp` | Anton Sulsky | https://unsplash.com/photos/YcfCXxo7rpc |
| `t24/img/calm.webp` | Vladimir Kudinov | https://unsplash.com/photos/-wWRHIUklxM |
<!-- /tpl-credits -->

## 후기 이미지 (2026-11-16 받음, 96장)

- 2026-11-17 업체 피드백: 자동차 후기(26년식 미니쿠퍼, r063)는 제외 — 사례 화면·성과 목록·후기 이미지·업종 띠에서 빼고 이미지 파일도 지움 (지금 95장)
- `assets/img/reviews/r001~r096.webp`(r063 없음), 목록은 `src/content.mjs`의 `REVIEWS` (`group`: result = 성과+고객 대화 정리 40장, search = 검색 결과 화면 56장)
- (처음 기준, 2026-11-18에 바뀜 → 위 '후기 이미지 다시 처리') 모자이크 기준: 검색어, 네이버 탭, 결과 표시용 빨간 테두리, 슬라이드 제목은 남김. 업체명·블로그명·글 제목·본문 요약·작성자 프로필, 카톡 이름·프로필 사진·대화방 제목, 사진 위 글자(전화번호·상호), 사람 이름은 가림. 카톡 말풍선 대화 내용은 남기되 대화 속 업체명·이름은 가림
- 원본 슬라이드에 있던 '노란마케팅' 문구는 모두 가림
- 가림 방식(2차): 뭉갠 모자이크 대신 둥근 회색 막대. 검색창 N 로고는 원본으로 되돌림
- 화면 정리(2차): 후기 카드는 캡처 대신 검색 화면을 그림으로 다시 그리고 사장님 말을 글자로 (`RESULTS`), 캡처는 '실제 화면 보기'로. 후기 페이지 검색 화면은 `REVIEW_PICKS` 16장만 같은 비율로, 나머지는 '원본 캡처 전체 보기' 안에
- 처리 방법: 글자 위치 인식(Tesseract 한국어, RapidOCR) + 화면 바탕색 판별로 자동 처리 → 숫자·이름 재검사 → 한 장씩 눈으로 확인 후 손으로 보완(064, 086)
- 홈 후기 띠에 먼저 나오는 것: `REVIEW_FEATURED`

## 성과 사례·숏폼 (후기 이미지와 영상에서 정리)

- `RESULTS`: 업종, 검색어, 결과, 고객 한마디, 이미지 (업체명 없이). 포트폴리오에 전부, 홈에 앞 3개
- 실적 출처: 대표가 노란마케팅 공동대표 시절 진행한 사례 (업체 확인 완료, 그대로 사용)
- (2026-11-18 삭제) `SHORTS`: `assets/video/short-air.mp4`(천장형 공기청정기 제품 소개), `short-window.mp4`(창호 레일 보수) — 제품·업체 이름, 전화번호 나오는 구간만 모자이크(ffmpeg), 포트폴리오 '숏폼 제작 사례'
- 업종 흐름 띠(`INDUSTRIES`)도 실제 사례 업종으로 바꿈

## 후기 (4차): 업종을 골라 보는 사례 화면

- `STORIES` 6개(시공·철거 / 인테리어 / 설비·기계 / 주방·청소 / 학원 / 음식·도시락). 업종 칩을 누르면 한 사례가 크게 바뀜
- 왼쪽: 사장님 말(크게) · 고민→한 일→결과(대화·캡처에 실제로 나온 사실만) · 큰 숫자
- 가운데: 실제 검색 화면 — 검색창은 다시 그리고, 상위노출된 그 글만 원본에서 잘라 원래 크기로(`assets/img/cases/p*.webp`). 고객사 이름·사진이 보이는 곳만 '고객사' 라벨로 덮음(모자이크 없음). 누르면 크게
- 오른쪽: 휴대폰 속 카톡 대화. 실제 말풍선 조각(`c*.webp`)이 기본, '글자로 보기'로 글자 말풍선과 바꿔 볼 수 있음
- 글 폭에 따라 배치가 바뀜: 넓은 글(학원)은 이야기를 위에 가로로 펼치고 아래에 검색 화면을 원래 크기로, 좁은 휴대폰 캡처(철거·후드)는 검색 화면도 휴대폰 모양으로 두 휴대폰을 나란히. 받은 슬라이드가 원본이라 이미지를 키우지 않고 원래 크기 이하로만 보여 줌
- 사장님 한마디: `VOICES` 흐르는 띠 / 그 밖의 사례: 업종 벽(`RESULTS` 중 위 7개에 없는 것)
- 홈(3번 섹션), 고객후기, 포트폴리오에 같은 사례 화면

## 업체 제안서 반영 (2026-11-16)

받은 자료: Gamma 문서(gamma.app/docs/-ryapbw7j8dz1phw), ikkeulim.netlify.app. 두 곳 모두 같은 '블로그 마케팅 제안서'.

- 회사 정보: 대표 손민구, 사업자등록번호 334-18-02449, 주소 서울 강북구 수유로 36, 4층 401호(이화빌딩) → `CO`, 푸터·회사소개. 전화·이메일은 제안서에도 없음
- 상품: 제안서의 4개 상품(블로그 포스팅 / 블로그 활성화 / 홈페이지 & 브랜드 디자인 / 통합 패키지)에 맞춤. 통합 패키지는 처음 요청한 이름 '홈페이지 및 블로그 관리대행' 그대로. 홈페이지 & 브랜드 디자인은 홈페이지 제작 · 블로그 스킨 디자인 · 영상 제작 셋으로 나눔. 제안서의 '대상'은 각 상품의 '이런 분께'로
- 뺀 것: 언론 송출 · 플레이스 노출(제안서에 없음), '1:1 전담 담당자'(제안서에 없음, 첫 화면 표시는 '원고 작성부터 발행까지'로 바꿈)
- 홈 1번 섹션: '왜 이끌림' → 제안서 '이끌림의 방법'(D.I.A.+ 품질 콘텐츠 → 스마트블록 노출 설계 → 체류 시간, 순환)
- 서비스 페이지 맨 위: 제안서 '네이버가 글을 고르는 방식'
- 회사소개: 제안서 '이끌림마케팅이 다른 점'(알고리즘 전문성 / 맞춤형 콘텐츠 / 매출 전환)
- 진행: 5단계 → 제안서 6단계(상담 → 진단 → 전략 → 제작·발행 → 활성화 운영 → 월간 리포트) + 고객사 역할('사장님이 하실 일')
- 넣지 않은 것: '상위 1% 블로그' 같은 근거 없는 표현

## 메인 '대표님들의 한마디' 실제 이미지 비교 (2026-11-19)

업체가 이 자리에 실제 이미지를 넣어 달라고 해서 두 가지를 위아래로 넣어 둠. 고르면 하나만 남기고 `voices(c, 'bubble' | 'thumb')`로 정리
- **A 실제 카톡 말풍선**: 그 말이 적힌 말풍선만 잘라(`assets/img/voice/v1~8.webp`, 모서리 투명) 카톡 하늘색 바탕 위에. 글자 크기가 비슷해 보이게 말풍선마다 배율(`VOICES[].bubble[3]`). 원문 그대로라 맞춤법도 원래대로
- **B 다듬은 글 + 작은 실제 캡처**: 지금 글 카드 오른쪽 아래에 대화 캡처 썸네일('실제 대화')
- 둘 다 누르면 원본 캡처가 크게 열림 (같은 띠 안에서만 넘겨 봄)

## 고객후기 · 포트폴리오 나눔 (2026-11-18)

두 페이지가 같은 내용(업종별 사례 화면 + 그 밖의 사례)이라 똑같아 보여서, 보여 주는 것을 나눔. 업종별 사례 화면(`STORIES`)은 메인에만.

- **고객후기 = 사람 이야기**: 받은 캡처 중 대화 · 문의가 담긴 16장
  - '대표님이 보내 주신 말'(`TALKS` 11개): 대표님이 카톡으로 한 말을 크게, 그 아래 실제 대화 부분만 자른 캡처(`assets/img/talk/k###.webp`). 반응으로 골라 보기(문의가 늘었어요 / 검색 상위에 올랐어요 / 계약 · 소개로 / 만족해요)
  - '블로그를 보고 들어온 문의'(`INQUIRIES` 5개): 톡톡 · 블로그 댓글로 들어온 실제 문의
  - 문구는 캡처에 적힌 말 그대로(웃음 표시만 뺌). 대표님이 '네'만 하고 이끌림이 결과를 알린 캡처(074 공장매매, 080 와이어로프)는 포트폴리오로
- **포트폴리오 = 결과 자료**: 검색 결과 화면 79장(`WORKS`) 사진첩(맨 위 숫자 요약은 2026-11-20 업체 요청으로 뺌). 업종 8묶음으로 골라 보기, 카드마다 검색창에 입력된 검색어, 이미지에 적힌 경우만 '1위 · 인기글 · 순위권' 표시. 처음엔 16장(업종을 섞어서), '더 보기'로 전체. 썸네일은 `assets/img/reviews/s/`(폭 560), 누르면 원본
- 077 캡처 속 담당자 이름('정민쌤')도 가림
- `RESULTS`(성과 목록)는 지금 페이지에서 안 씀 (자료로만 남김)

## 영상 포트폴리오 삭제 (2026-11-18 업체 피드백)

- 포트폴리오의 '숏폼 제작 사례'(영상 2개) 섹션과 `SHORTS`, 영상 파일(`assets/video/`)을 지움
- 상품 '영상 제작'은 그대로 두고, 설명의 '포트폴리오에서 실제 제작 영상을 볼 수 있습니다' 문장만 뺌

## 후기 이미지 다시 처리 (2026-11-18 업체 피드백)

- 기준: 이미지는 있는 그대로, **고객 이름·업체명만** 가림. 검색어·글 제목·본문·사진은 그대로 둠
  - 함께 가린 것: 휴대폰 번호, 카톡·톡톡 프로필 사진, 썸네일 속 상호 로고·전화번호, 사람 얼굴이 크게 나온 사진(한끼코리아 썸네일), '노란마케팅' 문구, 담당자 이름(이정민)
- 방법: 원본 크기에서 글자 줄 위치(RapidOCR) → 줄마다 글자 인식(Tesseract) → 업체명 목록으로 찾아 둥근 회색 막대 → 95장 한 장씩 확대해 보고 손으로 보완. 작업 파일은 작업용 폴더(spec2.json: 이미지별 가릴 이름·좌표)
- 사례 화면의 글 조각(`assets/img/cases/p*.webp`)도 새 이미지에서 다시 자름 → '고객사' 라벨 대신 같은 회색 막대, 썸네일 사진은 보임
- 쓰지 않던 조각(`t*.webp`, `c065-*.webp`) 삭제
- '업종 비공개' 두 후기(r065) 업종: 소음방지 바닥장판 · 바닥매트 시공 (업체가 알려 줌)

## 업체 피드백 (2026-11-17)

- 자동차 후기(미니쿠퍼) 제외
- '이런 분께' 문구를 '본업이 바쁘신 대표님' 같은 말투로 (`SERVICES[].for`)
- 연락처: 전화 02-980-0077, 월~토 10:00~18:00, atractmg@naver.com (`CO`)
- 상품에 '언론 송출'(100여 개 이상 언론사) 추가 → 상품 안내는 블로그 / 홈페이지 & 브랜드 디자인 / 영상 · 언론 세 묶음, 홈 벤토는 4칸 격자(아래 두 칸 넓게)
- 헤더·푸터 로고 글자 '이끌림' → '이끌림마케팅' (`CO.name`)
- 사이트 전체 '사장님' → '대표님'
- 사례 화면 휴대폰 속 대화: 실제 카톡 캡처를 기본으로 ('글자로 보기'로 바꿔 볼 수 있음). 원본 글씨가 작은 캡처는 1.1~1.5배로 키워 보여 주고(`chatImgs`의 배율), 이끌림이 보낸 노란 말풍선은 오른쪽에. 더 선명하게 하려면 카톡 원본 캡처가 필요

## 나중에 채울 것

- **서비스 세부 업무·성과**: 서비스 페이지의 점선 칸
- **카카오톡 채널(또는 오픈채팅) 주소**: `CO.kakao`
- **회사 정보**: 모두 채움 (대표·주소·사업자등록번호는 제안서, 전화·이메일·운영시간은 2026-11-17 업체 전달)
- 대표 인사말·연혁, 제작 사례 이미지

## 업체에 확인할 것

- 플레이스 노출도 하는지 (제안서에 없어 지금은 뺌)
- 카톡 대화 원본 캡처(휴대폰 화면): 사례 화면 휴대폰 속 대화를 실제 캡처로 바꾸려면 필요. 지금 '실제 캡처로 보기'는 슬라이드 속 작은 말풍선을 잘라 쓴 것이라 글자가 작음
- 홈페이지 & 브랜드 디자인을 세 상품(홈페이지 제작 · 블로그 스킨 디자인 · 영상 제작)으로 나눠 보여 줘도 되는지
- FAQ 중 예시 답변 5개 (제안서에 없는 것)
- 로고 원본 파일 (지금은 같은 모양을 SVG로 다시 그림: `src/layout.mjs`의 `mark()`, `assets/img/mark.svg`)
- 견적 가격을 공개할지
