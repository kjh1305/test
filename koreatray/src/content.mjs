/* =========================================================
   글로벌 코리아트레이 — 사이트 문구 (ko, en, ja, vi, th)
   L(ko, en, ja, vi, th) 순서로 적습니다.
   블로그(데이 드리머, (주)코리아 트레이)와 회사가 준 자료를 바탕으로 썼고,
   자료가 없는 부분(연혁, 인증, 규격, 사진)은 '채울 자리'로 남겨 두었습니다.
   ========================================================= */

export const L = (ko, en, ja, vi, th) => ({ ko, en, ja, vi, th });
export const t = (v, lang) => (v && typeof v === 'object' && !Array.isArray(v) && 'ko' in v ? v[lang] : v);

export const BASE_URL = 'https://kjh1305.github.io/test/koreatray/';

export const LANGS = [
  { code: 'ko', name: '한국어', prefix: '', html: 'ko' },
  { code: 'en', name: 'English', prefix: 'en/', html: 'en' },
  { code: 'ja', name: '日本語', prefix: 'ja/', html: 'ja' },
  { code: 'vi', name: 'Tiếng Việt', prefix: 'vi/', html: 'vi' },
  { code: 'th', name: 'ไทย', prefix: 'th/', html: 'th' }
];

/* ---------- 회사 정보 ---------- */
const EN_FACTORY = '8, Saejae-gil 226beon-gil, Gonjiam-eup, Gwangju-si, Gyeonggi-do, Korea';
const EN_SEOUL = 'Room 810, Janggyo Building, 363 Samil-daero, Jung-gu, Seoul, Korea';
export const CO = {
  brand: L('글로벌 코리아트레이', 'Global Korea Tray', 'Global Korea Tray', 'Global Korea Tray', 'Global Korea Tray'),
  legal: L('(주)코리아트레이', 'Korea Tray Co., Ltd.', '株式会社コリアトレイ', 'Korea Tray Co., Ltd.', 'Korea Tray Co., Ltd.'),
  short: L('코리아트레이', 'Korea Tray', 'コリアトレイ', 'Korea Tray', 'Korea Tray'),
  ceo: L('이대우', 'Lee Dae-woo', 'イ・デウ', 'Lee Dae-woo', 'Lee Dae-woo'),
  factoryKo: '경기도 광주시 곤지암읍 새재길226번길 8',
  seoulKo: '서울특별시 중구 삼일대로 363, 장교빌딩 810호',
  factory: L('경기도 광주시 곤지암읍 새재길226번길 8', EN_FACTORY, EN_FACTORY, EN_FACTORY, EN_FACTORY),
  seoul: L('서울특별시 중구 삼일대로 363, 장교빌딩 810호', EN_SEOUL, EN_SEOUL, EN_SEOUL, EN_SEOUL),
  tel: L('031-764-0810', '+82-31-764-0810', '+82-31-764-0810', '+82-31-764-0810', '+82-31-764-0810'),
  telHref: 'tel:+82317640810',
  mobile: L('010-5235-8011', '+82-10-5235-8011', '+82-10-5235-8011', '+82-10-5235-8011', '+82-10-5235-8011'),
  mobileHref: 'tel:+821052358011',
  email: 'papermarket@naver.com',
  blog: 'https://blog.naver.com/papermarket',
  blogName: L('데이 드리머, (주)코리아 트레이', 'Korea Tray blog (in Korean)', 'コリアトレイ公式ブログ（韓国語）', 'Blog Korea Tray (tiếng Hàn)', 'บล็อก Korea Tray (ภาษาเกาหลี)')
};

/* ---------- 공통 UI ---------- */
export const UI = {
  nav: {
    about: L('회사소개', 'Company', '会社紹介', 'Giới thiệu', 'เกี่ยวกับเรา'),
    products: L('제품소개', 'Products', '製品紹介', 'Sản phẩm', 'ผลิตภัณฑ์'),
    quality: L('생산·품질', 'Production', '生産・品質', 'Sản xuất', 'การผลิต'),
    contact: L('문의하기', 'Contact', 'お問い合わせ', 'Liên hệ', 'ติดต่อเรา')
  },
  home: L('홈', 'Home', 'ホーム', 'Trang chủ', 'หน้าแรก'),
  quote: L('견적 문의', 'Request a quote', 'お見積り依頼', 'Yêu cầu báo giá', 'ขอใบเสนอราคา'),
  sample: L('샘플 요청', 'Request a sample', 'サンプル依頼', 'Yêu cầu mẫu', 'ขอตัวอย่าง'),
  language: L('언어', 'Language', '言語', 'Ngôn ngữ', 'ภาษา'),
  skip: L('본문으로 건너뛰기', 'Skip to content', '本文へ移動', 'Chuyển đến nội dung', 'ข้ามไปยังเนื้อหา'),
  menuOpen: L('메뉴 열기', 'Open menu', 'メニューを開く', 'Mở menu', 'เปิดเมนู'),
  menuClose: L('메뉴 닫기', 'Close menu', 'メニューを閉じる', 'Đóng menu', 'ปิดเมนู'),
  learnMore: L('자세히 보기', 'Learn more', '詳しく見る', 'Xem chi tiết', 'ดูรายละเอียด'),
  viewMap: L('지도 보기', 'View map', '地図を見る', 'Xem bản đồ', 'ดูแผนที่'),
  openMaps: L('지도에서 열기', 'Open in Maps', '地図アプリで開く', 'Mở trong Maps', 'เปิดในแผนที่'),
  naverMap: '네이버 지도',
  call: L('전화 상담', 'Call us', 'お電話', 'Gọi điện', 'โทรหาเรา'),
  footerNote: L(
    '이 사이트는 홈페이지 제작 시안입니다. 그림으로 표시한 자리와 일부 문구는 실제 사진과 자료로 바꿀 예정입니다.',
    'This site is a design draft. Illustrations and some text will be replaced with real photos and materials.',
    'このサイトはホームページ制作の試作版です。イラストの部分や一部の文章は、実際の写真と資料に差し替える予定です。',
    'Đây là bản thiết kế thử của trang web. Hình minh họa và một số nội dung sẽ được thay bằng ảnh và tài liệu thực tế.',
    'เว็บไซต์นี้เป็นแบบร่าง ภาพประกอบและข้อความบางส่วนจะถูกแทนที่ด้วยภาพและข้อมูลจริง'
  ),
  labels: {
    ceo: L('대표이사', 'CEO', '代表取締役', 'Giám đốc', 'ประธานบริษัท'),
    factory: L('공장', 'Factory', '工場', 'Nhà máy', 'โรงงาน'),
    seoul: L('서울사무소', 'Seoul office', 'ソウル事務所', 'Văn phòng Seoul', 'สำนักงานโซล'),
    tel: L('전화·팩스', 'Tel / Fax', '電話・FAX', 'Điện thoại / Fax', 'โทรศัพท์ / แฟกซ์'),
    mobile: L('휴대폰', 'Mobile', '携帯電話', 'Di động', 'มือถือ'),
    email: L('이메일', 'Email', 'メール', 'Email', 'อีเมล'),
    blog: L('블로그', 'Blog', 'ブログ', 'Blog', 'บล็อก'),
    company: L('회사명', 'Company', '会社名', 'Tên công ty', 'ชื่อบริษัท'),
    products: L('주요 제품', 'Main products', '主な製品', 'Sản phẩm chính', 'ผลิตภัณฑ์หลัก'),
    clients: L('주요 거래처', 'Key clients', '主な取引先', 'Khách hàng tiêu biểu', 'ลูกค้าหลัก')
  },
  placeholder: L('자료를 받으면 채울 자리', 'To be filled in with real materials', '資料をいただき次第掲載', 'Sẽ bổ sung khi có tài liệu', 'จะเพิ่มเมื่อได้รับข้อมูล')
};

/* ---------- 거래 브랜드 ---------- */
const CHICKEN_TRAY = L('치킨 트레이', 'Chicken trays', 'チキントレー', 'Khay gà rán', 'ถาดใส่ไก่');
const TAKEOUT_BOX = L('테이크아웃 용기', 'Take-out containers', 'テイクアウト容器', 'Hộp mang đi', 'บรรจุภัณฑ์ซื้อกลับบ้าน');
export const BRANDS = [
  { name: L('BBQ', 'BBQ', 'BBQ', 'BBQ', 'BBQ'), note: CHICKEN_TRAY },
  { name: L('BHC', 'BHC', 'BHC', 'BHC', 'BHC'), note: CHICKEN_TRAY },
  { name: L('버거킹', 'Burger King', 'バーガーキング', 'Burger King', 'Burger King'), note: L('햄버거 트레이', 'Burger trays', 'ハンバーガートレー', 'Khay burger', 'ถาดเบอร์⁠เกอร์') },
  { name: L('아웃백', 'Outback Steakhouse', 'アウトバック', 'Outback Steakhouse', 'Outback Steakhouse'), note: TAKEOUT_BOX },
  { name: L('뚜레쥬르', 'Tous Les Jours', 'トゥレジュール', 'Tous Les Jours', 'Tous Les Jours'), note: TAKEOUT_BOX },
  { name: L('CU', 'CU', 'CU', 'CU', 'CU'), note: L('편의점 빵 트레이', 'Convenience-store bread trays', 'コンビニのパン用トレー', 'Khay bánh mì cửa hàng tiện lợi', 'ถาดขนมปังร้านสะดวกซื้อ') }
];

/* ---------- 제품 분류 ---------- */
export const CATEGORIES = [
  {
    id: 'chicken', art: 'chicken',
    name: L('치킨·버거 트레이와 박스', 'Chicken & burger trays and boxes', 'チキン・バーガー用トレーと箱', 'Khay & hộp gà rán, burger', 'ถาดและกล่องไก่ทอด เบอร์⁠เกอร์'),
    short: L(
      '무게와 기름기가 있는 메뉴를 위한 튼튼한 트레이와 포장 박스. BBQ, BHC, 버거킹에 납품합니다.',
      'Sturdy trays and boxes for heavy, greasy menus. Supplied to BBQ, BHC and Burger King.',
      '重さと油分のあるメニュー向けの丈夫なトレーと箱。BBQ、BHC、バーガーキングに納品しています。',
      'Khay và hộp chắc chắn cho món nặng, nhiều dầu mỡ. Cung cấp cho BBQ, BHC và Burger King.',
      'ถาดและกล่องที่แข็งแรงสำหรับเมนูที่หนักและมีน้ำมัน ส่งให้ BBQ, BHC และ Burger King'
    ),
    long: L(
      '치킨과 햄버거는 무게가 있고 기름과 열기가 함께 담기는 메뉴입니다. 그래서 디자인보다 구조와 강도를 먼저 정합니다. 바닥이 처지거나 모서리가 벌어지지 않도록 접히는 모든 면을 붙이는 8면 접착과 메뉴에 맞는 두께로 만들고, 배달 중 흔들리고 쌓여도 형태가 유지되는지 봅니다.',
      'Chicken and burgers are heavy and come with grease and heat, so we settle structure and strength before design. To keep bottoms from sagging and corners from opening, we glue every folding face (8-point gluing), choose a board thickness that fits the menu, and check that the shape holds when boxes are shaken and stacked in delivery.',
      'チキンやハンバーガーは重さがあり、油と熱も伴うメニューです。そのため、デザインより先に構造と強度を決めます。底のたわみや角の開きを防ぐ8面接着とメニューに合った厚みでつくり、配達中に揺れたり積み重ねたりしても形が崩れないかを確認します。',
      'Gà rán và burger là món nặng, có dầu mỡ và hơi nóng, nên chúng tôi chọn cấu trúc và độ bền trước khi thiết kế. Để đáy không bị võng và góc không bị bung, chúng tôi dán tất cả các mặt gấp (dán 8 mặt), chọn độ dày phù hợp và kiểm tra hộp vẫn giữ dáng khi bị lắc và xếp chồng lúc giao hàng.',
      'ไก่ทอดและเบอร์⁠เกอร์มีน้ำหนัก มีทั้งน้ำมันและความร้อน เราจึงกำหนดโครงสร้างและความแข็งแรงก่อนดีไซน์ เพื่อไม่ให้ก้นยุบหรือมุมแยก เราติดกาวทุกด้านที่พับ (ติดกาว 8 จุด) เลือกความหนาให้เหมาะกับเมนู และตรวจว่ากล่องยังคงรูปเมื่อถูกเขย่าและวางซ้อนระหว่างจัดส่ง'
    ),
    uses: L(
      ['치킨 트레이·포장 박스', '햄버거 트레이', '순살·사이드 메뉴'],
      ['Chicken trays & boxes', 'Burger trays', 'Boneless & sides'],
      ['チキントレー・包装箱', 'ハンバーガートレー', '骨なし・サイドメニュー'],
      ['Khay & hộp gà rán', 'Khay burger', 'Gà không xương & món phụ'],
      ['ถาดและกล่องไก่ทอด', 'ถาดเบอร์⁠เกอร์', 'ไก่ไม่มีกระดูกและเมนูเคียง']
    ),
    brands: [0, 1, 2],
    structure: L('8면 접착', '8-point gluing', '8面接着', 'Dán 8 mặt', 'ติดกาว 8 จุด')
  },
  {
    id: 'bakery', art: 'bakery',
    name: L('베이커리·디저트 트레이', 'Bakery & dessert trays', 'ベーカリー・デザート用トレー', 'Khay bánh & tráng miệng', 'ถาดเบเกอรี่และของหวาน'),
    short: L(
      '빵과 구움과자, 떡을 모양 그대로 담습니다. CU 빵 트레이와 뚜레쥬르 테이크아웃 용기를 만듭니다.',
      'Holds breads, baked sweets and rice cakes in shape. We make CU bakery trays and Tous Les Jours take-out containers.',
      'パンや焼き菓子、お餅を形そのままに。CUのパン用トレーやトゥレジュールのテイクアウト容器をつくっています。',
      'Giữ nguyên hình dáng bánh mì, bánh nướng và bánh gạo. Chúng tôi làm khay bánh mì cho CU và hộp mang đi cho Tous Les Jours.',
      'บรรจุขนมปัง ขนมอบ และต็อกให้คงรูป เราผลิตถาดขนมปังให้ CU และบรรจุภัณฑ์ซื้อกลับบ้านให้ Tous Les Jours'
    ),
    long: L(
      '가벼운 빵과 디저트에는 네 방향만 붙이는 4면 접착이 잘 맞습니다. 생산이 빠르고 단가가 합리적이라 하루 판매량이 많은 매장에 알맞습니다. 연말과 명절 선물 세트용 트레이도 만듭니다.',
      'For light breads and desserts, 4-point gluing works well. It is fast to produce and reasonably priced, which suits stores that sell in volume every day. We also make trays for holiday gift sets.',
      '軽いパンやデザートには、4方向だけを接着する4面接着がよく合います。生産が速く単価も手頃なので、1日の販売数が多い店舗に向いています。年末や名節のギフトセット用トレーもつくります。',
      'Với bánh mì và món tráng miệng nhẹ, kiểu dán 4 mặt là phù hợp. Sản xuất nhanh, giá hợp lý, thích hợp cho cửa hàng bán số lượng lớn mỗi ngày. Chúng tôi cũng làm khay cho hộp quà dịp lễ, Tết.',
      'ขนมปังและของหวานที่น้ำหนักเบาเหมาะกับการติดกาว 4 จุด ผลิตได้เร็วและราคาเหมาะสม จึงเหมาะกับร้านที่ขายได้จำนวนมากทุกวัน เรายังผลิตถาดสำหรับชุดของขวัญช่วงเทศกาลด้วย'
    ),
    uses: L(
      ['빵·구움과자', '조각 케이크·마카롱', '떡·명절 선물 세트'],
      ['Breads & baked sweets', 'Cake slices & macarons', 'Rice cakes & holiday gift sets'],
      ['パン・焼き菓子', 'ショートケーキ・マカロン', 'お餅・名節ギフトセット'],
      ['Bánh mì & bánh nướng', 'Bánh kem miếng & macaron', 'Bánh gạo & hộp quà Tết'],
      ['ขนมปังและขนมอบ', 'เค้กชิ้นและมาการอง', 'ต็อกและชุดของขวัญเทศกาล']
    ),
    brands: [4, 5],
    structure: L('4면 접착', '4-point gluing', '4面接着', 'Dán 4 mặt', 'ติดกาว 4 จุด')
  },
  {
    id: 'street', art: 'street',
    name: L('분식·핫도그 트레이', 'Street food & hot dog trays', '軽食・ホットドッグ用トレー', 'Khay đồ ăn đường phố & hot dog', 'ถาดสตรีทฟู้ดและฮอทดอก'),
    short: L(
      '김밥, 핫도그, 떡볶이처럼 빨리 사 가는 메뉴를 위한 트레이. 손잡이 구조도 만듭니다.',
      'For grab-and-go menus like gimbap, hot dogs and tteokbokki, including trays with a built-in handle.',
      'キンパ、ホットドッグ、トッポッキなど、さっと買って行くメニュー向け。持ち手付きの構造もつくります。',
      'Dành cho món mua mang đi nhanh như kimbap, hot dog, tteokbokki, kể cả khay có tay cầm.',
      'สำหรับเมนูซื้อแล้วไปอย่างคิมบับ ฮอทดอก ต๊อกบกกี รวมถึงถาดแบบมีที่จับ'
    ),
    long: L(
      '핫도그 트레이는 음식 아래를 감싸면서 손잡이 역할도 하도록 설계합니다. 소스와 기름이 많은 메뉴에는 방유 처리를 검토하고, 양념이 넉넉한 떡볶이처럼 무거운 메뉴는 8면 접착을 함께 검토합니다.',
      'Hot dog trays are designed to wrap the bottom of the food and double as a handle. For saucy, greasy menus we consider grease-resistant treatment, and for heavier dishes like saucy tteokbokki we also look at 8-point gluing.',
      'ホットドッグ用トレーは、料理の下を包みながら持ち手にもなるよう設計します。ソースや油の多いメニューには防油加工を、ソースたっぷりのトッポッキのように重いメニューには8面接着も検討します。',
      'Khay hot dog được thiết kế ôm phần dưới món ăn và đóng vai trò tay cầm. Với món nhiều sốt và dầu, chúng tôi cân nhắc xử lý chống thấm dầu; với món nặng như tteokbokki nhiều sốt, chúng tôi cân nhắc thêm kiểu dán 8 mặt.',
      'ถาดฮอทดอกออกแบบให้โอบด้านล่างของอาหารและใช้เป็นที่จับได้ด้วย สำหรับเมนูที่มีซอสและน้ำมันมาก เราพิจารณาการเคลือบกันซึมน้ำมัน และสำหรับเมนูหนักอย่างต๊อกบกกีซอสเยอะ เราพิจารณาการติดกาว 8 จุดด้วย'
    ),
    uses: L(
      ['김밥', '핫도그', '떡볶이·튀김'],
      ['Gimbap', 'Hot dogs', 'Tteokbokki & fried snacks'],
      ['キンパ', 'ホットドッグ', 'トッポッキ・揚げ物'],
      ['Kimbap', 'Hot dog', 'Tteokbokki & đồ chiên'],
      ['คิมบับ', 'ฮอทดอก', 'ต๊อกบกกีและของทอด']
    ),
    brands: [],
    structure: L('4면 접착, 방유 처리 검토', '4-point gluing, grease-resistant option', '4面接着、防油加工も可', 'Dán 4 mặt, có thể chống thấm dầu', 'ติดกาว 4 จุด เลือกเคลือบกันซึมน้ำมันได้')
  },
  {
    id: 'takeout', art: 'takeout',
    name: L('테이크아웃·도시락', 'Take-out & lunch boxes', 'テイクアウト・弁当', 'Hộp mang đi & cơm hộp', 'บรรจุภัณฑ์ซื้อกลับบ้านและข้าวกล่อง'),
    short: L(
      '매장 음식을 그대로 들고 가는 용기와 반찬을 나눠 담는 보조 트레이. 아웃백 테이크아웃 용기를 만듭니다.',
      'Containers that carry restaurant food home, and insert trays that keep side dishes apart. We make take-out containers for Outback Steakhouse.',
      '店の料理をそのまま持ち帰る容器と、おかずを分けて入れる仕切りトレー。アウトバックのテイクアウト容器をつくっています。',
      'Hộp mang món ăn nhà hàng về nhà và khay phụ chia món ăn kèm. Chúng tôi làm hộp mang đi cho Outback Steakhouse.',
      'บรรจุภัณฑ์สำหรับนำอาหารจากร้านกลับบ้าน และถาดเสริมสำหรับแบ่งกับข้าว เราผลิตบรรจุภัณฑ์ซื้อกลับบ้านให้ Outback Steakhouse'
    ),
    long: L(
      '도시락은 주 용기만으로 해결하기 어려울 때가 있습니다. 반찬이 섞이지 않게 나누거나 소스가 묻지 않게 따로 담는 보조 트레이를 메뉴 구성에 맞춰 만듭니다.',
      'A main container alone is not always enough for a lunch box. We make insert trays to fit your menu, keeping side dishes apart and sauces contained.',
      '弁当はメイン容器だけでは収まらないことがあります。おかずが混ざらないように仕切ったり、ソースが付かないよう別に入れたりする補助トレーを、メニュー構成に合わせてつくります。',
      'Đôi khi một hộp chính là chưa đủ cho cơm hộp. Chúng tôi làm khay phụ theo thực đơn để món ăn kèm không lẫn vào nhau và nước sốt không bị dính.',
      'บางครั้งกล่องหลักเพียงใบเดียวยังไม่พอสำหรับข้าวกล่อง เราผลิตถาดเสริมตามเมนู เพื่อแยกกับข้าวไม่ให้ปนกันและแยกซอสไม่ให้เปื้อน'
    ),
    uses: L(
      ['레스토랑 포장 메뉴', '도시락 반찬 소분', '샐러드·사이드'],
      ['Restaurant take-out', 'Lunch box side dishes', 'Salads & sides'],
      ['レストランの持ち帰り', '弁当のおかず小分け', 'サラダ・サイド'],
      ['Món mang đi của nhà hàng', 'Chia món ăn kèm cơm hộp', 'Salad & món phụ'],
      ['อาหารซื้อกลับบ้านจากร้านอาหาร', 'แบ่งกับข้าวในข้าวกล่อง', 'สลัดและเมนูเคียง']
    ),
    brands: [3],
    structure: L('메뉴 구성에 맞춘 칸 나눔', 'Compartments to fit your menu', 'メニューに合わせた仕切り', 'Chia ngăn theo thực đơn', 'แบ่งช่องตามเมนู')
  },
  {
    id: 'custom', art: 'custom',
    name: L('주문 제작', 'Custom orders', 'オーダーメイド', 'Đặt làm theo yêu cầu', 'สั่งผลิตตามแบบ'),
    short: L(
      '매장 메뉴와 로고에 맞춘 우리 가게만의 트레이. 디자인 파일이 없어도 시작할 수 있습니다.',
      'A tray of your own, fitted to your menu and logo. You can start even without a design file.',
      'メニューとロゴに合わせた、お店だけのトレー。デザインデータがなくても始められます。',
      'Khay riêng cho cửa hàng, theo thực đơn và logo của bạn. Không cần file thiết kế vẫn có thể bắt đầu.',
      'ถาดเฉพาะของร้านคุณ ตามเมนูและโลโก้ เริ่มได้แม้ไม่มีไฟล์ดีไซน์'
    ),
    long: L(
      '기성품은 메뉴보다 크거나 작아 담았을 때 모양이 어색할 수 있습니다. 주문 제작은 메뉴 크기와 무게에 맞춰 칼선과 구조를 정하고, 원하면 로고와 매장 디자인을 인쇄합니다.',
      'Off-the-shelf trays can be too big or too small for your menu. With a custom order, we set the dieline and structure to your menu’s size and weight, and print your logo and store design if you like.',
      '既製品はメニューより大きすぎたり小さすぎたりして、盛り付けが不格好になることがあります。オーダーメイドでは、メニューのサイズと重さに合わせて抜き型と構造を決め、ご希望ならロゴや店舗デザインも印刷します。',
      'Khay có sẵn có thể quá to hoặc quá nhỏ so với món ăn. Khi đặt làm, chúng tôi thiết kế khuôn bế và cấu trúc theo kích thước, trọng lượng món ăn, và in logo, thiết kế cửa hàng nếu bạn muốn.',
      'ถาดสำเร็จรูปอาจใหญ่หรือเล็กเกินไปสำหรับเมนูของคุณ การสั่งผลิตจะกำหนดไดคัทและโครงสร้างตามขนาดและน้ำหนักของเมนู และพิมพ์โลโก้หรือดีไซน์ร้านได้ตามต้องการ'
    ),
    uses: L(
      ['새 메뉴 출시', '로고 인쇄 트레이', '시즌 한정 포장'],
      ['New menu launches', 'Logo-printed trays', 'Seasonal packaging'],
      ['新メニューの発売', 'ロゴ入りトレー', '季節限定パッケージ'],
      ['Ra mắt món mới', 'Khay in logo', 'Bao bì theo mùa'],
      ['เปิดตัวเมนูใหม่', 'ถาดพิมพ์โลโก้', 'บรรจุภัณฑ์ตามฤดูกาล']
    ),
    brands: [],
    structure: L('칼선, 두께, 접착, 인쇄를 함께 설계', 'Dieline, thickness, gluing and print designed together', '抜き型・厚み・接着・印刷をまとめて設計', 'Thiết kế đồng bộ khuôn bế, độ dày, cách dán, in ấn', 'ออกแบบไดคัท ความหนา การติดกาว และงานพิมพ์ไปพร้อมกัน')
  }
];

export const PRODUCT_LABELS = {
  usedFor: L('이런 메뉴에', 'Used for', '主な用途', 'Dùng cho', 'เหมาะสำหรับ'),
  suppliedTo: L('납품 브랜드', 'Supplied to', '納品先', 'Đã cung cấp cho', 'ส่งให้'),
  structure: L('구조', 'Structure', '構造', 'Cấu trúc', 'โครงสร้าง'),
  spec: L('규격·재질', 'Sizes & materials', 'サイズ・材質', 'Kích thước & chất liệu', 'ขนาดและวัสดุ'),
  specValue: L('규격표를 받으면 채울 자리', 'Spec sheet to be added', '仕様表は後日掲載', 'Sẽ bổ sung bảng thông số', 'จะเพิ่มตารางสเปกภายหลัง')
};

/* ---------- 강점 ---------- */
export const WHY = {
  title: L('코리아트레이에 맡기면', 'Why Korea Tray', 'コリアトレイが選ばれる理由', 'Vì sao chọn Korea Tray', 'ทำไมต้อง Korea Tray'),
  items: [
    {
      icon: 'onestop',
      title: L('칼선부터 납품까지 한곳에서', 'From dieline to delivery, in one place', '抜き型から納品まで一か所で', 'Từ khuôn bế đến giao hàng tại một nơi', 'ตั้งแต่ไดคัทจนถึงจัดส่งในที่เดียว'),
      text: L(
        '디자인과 칼선 협의, 인쇄, 톰슨 재단, 접착, 검수, 납품을 직접 맡습니다. 단계마다 업체가 바뀌지 않아 일정과 품질을 같은 기준으로 관리합니다.',
        'We handle design and dieline, printing, die-cutting, gluing, inspection and delivery ourselves. With no hand-offs between suppliers, schedule and quality follow one standard.',
        'デザインと抜き型の打ち合わせ、印刷、トムソン裁断、接着、検品、納品まで自社で担います。工程ごとに業者が変わらないため、納期と品質を同じ基準で管理できます。',
        'Chúng tôi tự đảm nhận thiết kế và khuôn bế, in, bế Thomson, dán, kiểm tra và giao hàng. Không phải chuyển qua nhiều nhà cung cấp nên tiến độ và chất lượng theo cùng một tiêu chuẩn.',
        'เราดูแลเองทั้งการออกแบบและไดคัท การพิมพ์ การตัดด้วยแม่พิมพ์ทอมสัน การติดกาว การตรวจสอบ และการจัดส่ง ไม่ต้องส่งต่อหลายผู้ผลิต จึงควบคุมกำหนดส่งและคุณภาพได้ด้วยมาตรฐานเดียว'
      )
    },
    {
      icon: 'structure',
      title: L('메뉴에 맞춘 구조', 'Structure that fits the menu', 'メニューに合わせた構造', 'Cấu trúc hợp với món ăn', 'โครงสร้างที่เหมาะกับเมนู'),
      text: L(
        '무조건 두꺼운 종이가 답은 아닙니다. 메뉴 무게와 운반 환경을 먼저 듣고 두께와 접착 방식(4면, 8면)을 정합니다.',
        'Thicker is not always better. We first ask about the menu’s weight and how it travels, then choose the thickness and gluing (4-point or 8-point).',
        '厚い紙が常に正解とは限りません。まずメニューの重さと運び方を伺い、厚みと接着方式（4面・8面）を決めます。',
        'Giấy dày hơn chưa chắc đã tốt hơn. Chúng tôi hỏi trước trọng lượng món ăn và cách vận chuyển, rồi mới chọn độ dày và kiểu dán (4 mặt hay 8 mặt).',
        'กระดาษหนากว่าไม่ได้ดีกว่าเสมอไป เราถามน้ำหนักของเมนูและวิธีขนส่งก่อน แล้วจึงเลือกความหนาและการติดกาว (4 จุดหรือ 8 จุด)'
      )
    },
    {
      icon: 'uniform',
      title: L('첫 장과 마지막 장이 같게', 'The first and the last, alike', '最初の1枚も最後の1枚も同じに', 'Chiếc đầu như chiếc cuối', 'ใบแรกและใบสุดท้ายเหมือนกัน'),
      text: L(
        '프랜차이즈는 어느 매장에서 받아도 같은 크기와 마감이어야 합니다. 대량 생산에서도 형태와 접착 상태가 똑같이 유지되도록 관리합니다.',
        'A franchise needs the same size and finish at every store. Even in mass production, we keep shape and gluing consistent.',
        'フランチャイズでは、どの店舗でも同じサイズと仕上がりが求められます。大量生産でも形と接着状態が同じに保たれるよう管理しています。',
        'Chuỗi cửa hàng cần cùng kích thước và độ hoàn thiện ở mọi nơi. Ngay cả khi sản xuất số lượng lớn, chúng tôi giữ hình dáng và độ dán đồng đều.',
        'แฟรนไชส์ต้องได้ขนาดและงานเก็บรายละเอียดเหมือนกันทุกสาขา แม้ผลิตจำนวนมาก เราก็ควบคุมให้รูปทรงและการติดกาวสม่ำเสมอ'
      )
    },
    {
      icon: 'nofile',
      title: L('디자인 파일이 없어도', 'No design file? No problem', 'デザインデータがなくても', 'Không cần file thiết kế', 'ไม่มีไฟล์ดีไซน์ก็ได้'),
      text: L(
        '메뉴 종류와 대략의 크기, 하루 사용량, 인쇄 여부만 알려 주시면 구조와 접착 방식을 함께 잡아 드립니다.',
        'Just tell us the menu, rough size, daily usage and whether you need printing, and we’ll work out the structure and gluing with you.',
        'メニューの種類、おおよそのサイズ、1日の使用量、印刷の有無を教えていただければ、構造と接着方式を一緒に決めていきます。',
        'Chỉ cần cho biết loại món, kích thước ước tính, số lượng dùng mỗi ngày và có cần in hay không, chúng tôi sẽ cùng bạn chọn cấu trúc và kiểu dán.',
        'แค่บอกประเภทเมนู ขนาดโดยประมาณ ปริมาณใช้ต่อวัน และต้องการพิมพ์หรือไม่ เราจะช่วยกำหนดโครงสร้างและการติดกาวให้'
      )
    }
  ]
};

/* ---------- 공정 (블로그: 디자인·칼선 협의 → 종이 → 인쇄 → 톰슨 → 접착 → 검수 → 납품) ---------- */
export const PROCESS = {
  title: L('종이 한 장이 트레이가 되기까지', 'From a sheet of paper to a tray', '一枚の紙がトレーになるまで', 'Từ tờ giấy đến chiếc khay', 'จากกระดาษหนึ่งแผ่นสู่ถาด'),
  sub: L(
    '주문 제작은 이 순서로 진행되고, 모든 단계를 코리아트레이가 직접 맡습니다.',
    'Custom orders follow these steps, and Korea Tray handles every one of them.',
    'オーダーメイドはこの順序で進み、すべての工程をコリアトレイが担います。',
    'Đơn đặt làm đi theo các bước này và Korea Tray tự đảm nhận tất cả.',
    'งานสั่งผลิตดำเนินตามขั้นตอนนี้ และ Korea Tray ดูแลเองทุกขั้นตอน'
  ),
  steps: [
    {
      icon: 'dieline',
      title: L('상담·칼선 설계', 'Consultation & dieline', 'ご相談・抜き型設計', 'Tư vấn & khuôn bế', 'ปรึกษาและออกแบบไดคัท'),
      text: L(
        '담을 메뉴와 크기, 사용량을 듣고 칼선을 그립니다. 처음 만드는 트레이는 샘플로 크기와 구조를 확인합니다.',
        'We hear your menu, size and volume and draw the dieline. For a new tray, we confirm size and structure with a sample.',
        'メニュー・サイズ・使用量を伺い、抜き型を描きます。初めてつくるトレーはサンプルでサイズと構造を確認します。',
        'Chúng tôi lắng nghe món ăn, kích thước, số lượng rồi vẽ khuôn bế. Với khay mới, kích thước và cấu trúc được kiểm tra bằng mẫu.',
        'รับฟังเมนู ขนาด และปริมาณการใช้ แล้ววาดไดคัท ถาดที่ทำครั้งแรกจะตรวจขนาดและโครงสร้างด้วยตัวอย่าง'
      )
    },
    {
      icon: 'paper',
      title: L('원지 준비', 'Paperboard', '原紙の準備', 'Chuẩn bị giấy', 'เตรียมกระดาษ'),
      text: L(
        '메뉴 무게와 유통 환경에 맞는 두께의 종이를 준비합니다.',
        'We source board of the right thickness for the menu’s weight and how it travels.',
        'メニューの重さと流通環境に合った厚みの紙を用意します。',
        'Chuẩn bị giấy có độ dày phù hợp với trọng lượng món ăn và điều kiện vận chuyển.',
        'เตรียมกระดาษที่มีความหนาเหมาะกับน้ำหนักของเมนูและสภาพการขนส่ง'
      )
    },
    {
      icon: 'print',
      title: L('인쇄', 'Printing', '印刷', 'In ấn', 'พิมพ์'),
      text: L(
        '로고와 매장 디자인을 원지에 인쇄합니다.',
        'Your logo and store design are printed on the board.',
        'ロゴと店舗デザインを原紙に印刷します。',
        'In logo và thiết kế cửa hàng lên giấy.',
        'พิมพ์โลโก้และดีไซน์ของร้านลงบนกระดาษ'
      )
    },
    {
      icon: 'cut',
      title: L('톰슨 재단', 'Die-cutting', 'トムソン裁断', 'Bế Thomson', 'ตัดด้วยแม่พิมพ์ทอมสัน'),
      text: L(
        '칼 틀로 칼선 모양대로 자르고 접는 자리를 냅니다.',
        'A cutting die cuts the dieline shape and creases the folds.',
        '抜き型で展開図どおりに裁断し、折り目を付けます。',
        'Khuôn bế cắt theo hình khuôn và tạo đường gấp.',
        'ใช้แม่พิมพ์ตัดตามไดคัทและทำรอยพับ'
      )
    },
    {
      icon: 'glue',
      title: L('접착', 'Gluing', '接着', 'Dán', 'ติดกาว'),
      text: L(
        '메뉴에 맞게 4면 또는 8면으로 접어 붙입니다. 압착 시간과 압력을 지켜 벌어지지 않게 합니다.',
        'Trays are folded and glued at 4 or 8 points to suit the menu, with the right pressing time and pressure so they don’t come apart.',
        'メニューに合わせて4面または8面で折って接着します。圧着時間と圧力を守り、開かないようにします。',
        'Khay được gấp và dán 4 hoặc 8 mặt tùy món, đảm bảo thời gian và lực ép để không bị bung.',
        'พับและติดกาว 4 หรือ 8 จุดตามเมนู โดยคุมเวลาและแรงกดให้ไม่แยกออก'
      )
    },
    {
      icon: 'inspect',
      title: L('검수', 'Inspection', '検品', 'Kiểm tra', 'ตรวจสอบ'),
      text: L(
        '형태와 접착 상태, 인쇄를 확인해 기준에 맞는 제품만 내보냅니다.',
        'We check shape, gluing and print, and only ship products that meet the standard.',
        '形・接着状態・印刷を確認し、基準を満たした製品のみ出荷します。',
        'Kiểm tra hình dáng, độ dán và in ấn; chỉ sản phẩm đạt chuẩn mới được xuất.',
        'ตรวจรูปทรง การติดกาว และงานพิมพ์ ส่งออกเฉพาะสินค้าที่ได้มาตรฐาน'
      )
    },
    {
      icon: 'deliver',
      title: L('포장·납품', 'Packing & delivery', '梱包・納品', 'Đóng gói & giao hàng', 'บรรจุและจัดส่ง'),
      text: L(
        '정해진 수량씩 묶어 비닐과 상자에 담아 납품합니다.',
        'Trays are bundled in set quantities, bagged, boxed and delivered.',
        '決められた数量ごとに束ね、袋と箱に詰めて納品します。',
        'Khay được bó theo số lượng quy định, cho vào túi, xếp thùng và giao.',
        'มัดตามจำนวนที่กำหนด ใส่ถุงและกล่อง แล้วจัดส่ง'
      )
    }
  ]
};

/* ---------- 메인 ---------- */
export const HOME = {
  title: L('종이 트레이·식품 포장 박스 제조', 'Paper trays & food packaging boxes', '紙トレー・食品包装箱メーカー', 'Khay giấy & hộp đựng thực phẩm', 'ถาดกระดาษและกล่องบรรจุอาหาร'),
  eyebrow: L('종이 트레이 · 식품 포장 박스 제조', 'Paper trays · Food packaging boxes', '紙トレー・食品包装箱の製造', 'Sản xuất khay giấy · hộp thực phẩm', 'ผลิตถาดกระดาษ · กล่องบรรจุอาหาร'),
  heroTitle: L(
    ['이름만 대면 아는 브랜드의', '트레이와 박스를 만듭니다'],
    ['Trays and boxes for', 'brands everyone knows'],
    ['誰もが知るブランドの', 'トレーと箱をつくります'],
    ['Khay và hộp giấy', 'cho những thương hiệu', 'ai cũng biết'],
    ['ถาดและกล่องกระดาษ', 'ของแบรนด์ที่ทุกคนรู้จัก']
  ),
  heroLede: L(
    'BBQ와 BHC의 치킨 트레이를 시작으로 버거킹 햄버거 트레이, 아웃백과 뚜레쥬르의 테이크아웃 용기까지, 종이로 음식을 담는 포장을 만들어 왔습니다. 칼선 설계부터 인쇄, 재단, 접착, 납품까지 한곳에서 진행합니다.',
    'Starting with chicken trays for BBQ and BHC, we have made burger trays for Burger King and take-out containers for Outback Steakhouse and Tous Les Jours: paper packaging that holds food. Dieline design, printing, cutting, gluing and delivery all happen in one place.',
    'BBQ、BHCのチキントレーをはじめ、バーガーキングのハンバーガートレー、アウトバックやトゥレジュールのテイクアウト容器まで、食べ物を包む紙のパッケージをつくってきました。抜き型の設計から印刷、裁断、接着、納品まで一か所で行います。',
    'Bắt đầu từ khay đựng gà cho BBQ và BHC, chúng tôi đã sản xuất khay burger cho Burger King và hộp mang đi cho Outback Steakhouse, Tous Les Jours: bao bì giấy đựng thực phẩm. Từ thiết kế khuôn bế đến in, cắt, dán và giao hàng, tất cả đều ở một nơi.',
    'เริ่มจากถาดใส่ไก่ให้ BBQ และ BHC เราผลิตถาดเบอร์⁠เกอร์ให้ Burger King และบรรจุภัณฑ์ซื้อกลับบ้านให้ Outback Steakhouse และ Tous Les Jours ซึ่งล้วนเป็นบรรจุภัณฑ์กระดาษสำหรับอาหาร ตั้งแต่ออกแบบไดคัท พิมพ์ ตัด ติดกาว จนถึงจัดส่ง ทำครบในที่เดียว'
  ),
  viewProducts: L('제품 보기', 'View products', '製品を見る', 'Xem sản phẩm', 'ดูผลิตภัณฑ์'),
  fold: L('접는 선', 'Fold line', '折り線', 'Đường gấp', 'เส้นพับ'),
  cut: L('자르는 선', 'Cut line', '切り線', 'Đường cắt', 'เส้นตัด'),
  replay: L('다시 접기', 'Fold again', 'もう一度折る', 'Gấp lại', 'พับอีกครั้ง'),
  scroll: L('아래로 내려 보기', 'Scroll down', '下へスクロール', 'Cuộn xuống', 'เลื่อนลง'),
  brandsTitle: L('함께하는 브랜드', 'Brands we supply', '取引ブランド', 'Thương hiệu đối tác', 'แบรนด์ที่เราส่งสินค้าให้'),
  brandsSub: L(
    '치킨과 버거, 베이커리, 편의점까지 매일 손님 손에 들리는 포장입니다.',
    'From chicken and burgers to bakeries and convenience stores, our packaging is in customers’ hands every day.',
    'チキンやバーガー、ベーカリー、コンビニまで、毎日お客様の手に渡るパッケージです。',
    'Từ gà rán, burger đến tiệm bánh và cửa hàng tiện lợi, bao bì của chúng tôi đến tay khách hàng mỗi ngày.',
    'ตั้งแต่ไก่ทอด เบอร์⁠เกอร์ ไปจนถึงร้านเบเกอรี่และร้านสะดวกซื้อ บรรจุภัณฑ์ของเราอยู่ในมือลูกค้าทุกวัน'
  ),
  statement: L(
    '먹거리를 담는 그릇 하나에도 친환경성과 편리함이 함께 담겨야 합니다.',
    'Even a single container for food should be kind to the planet and easy to use.',
    '食べ物を|入れる|器ひとつにも、|環境への|やさしさと|使いやすさが|込められて|いるべきです。',
    'Ngay cả một chiếc hộp đựng thức ăn cũng cần vừa thân thiện với môi trường, vừa tiện lợi.',
    'แม้แต่|ภาชนะ|ใส่อาหาร|ชิ้นเดียว |ก็ควร|เป็นมิตร|ต่อสิ่งแวดล้อม|และ|ใช้งาน|สะดวก'
  ),
  statementSub: L(
    '플라스틱 대신 종이로, 음식을 끝까지 지키는 트레이를 만듭니다.',
    'We make paper trays, in place of plastic, that protect food all the way to the customer.',
    'プラスチックの代わりに紙で、料理を最後まで守るトレーをつくります。',
    'Chúng tôi làm khay giấy thay cho nhựa, bảo vệ món ăn đến tận tay khách hàng.',
    'เราผลิตถาดกระดาษแทนพลาสติก ที่ปกป้องอาหารไปจนถึงมือลูกค้า'
  ),
  productsTitle: L('메뉴마다 맞는 트레이', 'A tray for every menu', 'メニューに合わせたトレー', 'Khay phù hợp từng món', 'ถาดที่เหมาะกับทุกเมนู'),
  productsSub: L(
    '담을 음식의 무게와 기름기, 이동 거리에 맞춰 구조를 정합니다.',
    'We set the structure by the food’s weight, grease and how far it travels.',
    '入れる料理の重さ・油分・持ち運ぶ距離に合わせて構造を決めます。',
    'Chúng tôi chọn cấu trúc theo trọng lượng, độ dầu mỡ và quãng đường di chuyển của món ăn.',
    'เรากำหนดโครงสร้างตามน้ำหนัก ความมัน และระยะทางขนส่งของอาหาร'
  ),
  allProducts: L('제품 전체 보기', 'All products', 'すべての製品', 'Tất cả sản phẩm', 'ผลิตภัณฑ์ทั้งหมด'),
  bigNumber: L('120', '1.2', '120', '1.2', '1.2'),
  bigUnit: L('만 개', ' million', '万個', ' triệu', ' ล้านใบ'),
  bigDecimals: L(0, 1, 0, 1, 1),
  bigLabel: L(
    '2026년 10월 한 달에만 만든 CU 리센느 빵 트레이',
    'CU bakery trays made in October 2026 alone',
    '2026年10月の1か月だけでつくったCUのパン用トレー',
    'Khay bánh mì CU sản xuất chỉ riêng trong tháng 10/2026',
    'ถาดขนมปัง CU ที่ผลิตเฉพาะในเดือนตุลาคม 2026'
  ),
  gridUnit: L('한 칸 = 1만 개', 'Each square = 10,000 trays', '1マス＝1万個', 'Mỗi ô = 10.000 chiếc', '1 ช่อง = 10,000 ใบ'),
  bigQuote: L(
    '첫 번째 트레이도, 120만 번째 트레이도 똑같은 모습이어야 합니다.',
    'The first tray and the 1.2-millionth tray should look exactly the same.',
    '1枚目のトレーも、120万枚目のトレーも、同じ姿でなければなりません。',
    'Chiếc khay đầu tiên và chiếc thứ 1,2 triệu phải giống hệt nhau.',
    'ถาดใบแรกและใบที่ 1.2 ล้านต้องเหมือนกันทุกประการ'
  ),
  processLink: L('생산 과정 자세히 보기', 'See how we make trays', '生産工程を詳しく見る', 'Xem quy trình sản xuất', 'ดูขั้นตอนการผลิต'),
  fourTitle: L('이 네 가지만 알려 주세요', 'Just tell us these four things', 'この4つを教えてください', 'Chỉ cần cho chúng tôi biết 4 điều', 'บอกเราแค่ 4 อย่างนี้'),
  fourSub: L(
    '디자인 파일이 없어도, 샘플 사진 한 장만 있어도 상담을 시작할 수 있습니다.',
    'No design file needed. Even a single sample photo is enough to get started.',
    'デザインデータがなくても、サンプル写真1枚からご相談いただけます。',
    'Không cần file thiết kế, chỉ một tấm ảnh mẫu cũng đủ để bắt đầu.',
    'ไม่ต้องมีไฟล์ดีไซน์ แค่รูปตัวอย่างใบเดียวก็เริ่มปรึกษาได้'
  ),
  four: [
    { icon: 'menu', title: L('메뉴 종류', 'Menu', 'メニューの種類', 'Loại món', 'ประเภทเมนู'), text: L('무엇을 담나요?', 'What will it hold?', '何を入れますか？', 'Đựng món gì?', 'จะใส่อะไร') },
    { icon: 'size', title: L('대략의 크기', 'Rough size', 'おおよそのサイズ', 'Kích thước ước tính', 'ขนาดโดยประมาณ'), text: L('가로, 세로, 높이를 대략 알려 주세요.', 'Approximate width, depth and height.', '横・縦・高さの目安をお知らせください。', 'Dài, rộng, cao ước tính.', 'กว้าง ยาว สูง โดยประมาณ') },
    { icon: 'usage', title: L('하루 사용량', 'Daily usage', '1日の使用量', 'Số lượng mỗi ngày', 'ปริมาณใช้ต่อวัน'), text: L('하루에 몇 개쯤 쓰나요?', 'About how many per day?', '1日に何個ほど使いますか？', 'Mỗi ngày dùng khoảng bao nhiêu?', 'ใช้วันละประมาณกี่ใบ') },
    { icon: 'printing', title: L('인쇄 여부', 'Printing', '印刷の有無', 'Có in không', 'ต้องการพิมพ์หรือไม่'), text: L('로고나 디자인을 넣을까요?', 'Logo or design on it?', 'ロゴやデザインを入れますか？', 'Có in logo hay thiết kế không?', 'จะใส่โลโก้หรือดีไซน์ไหม') }
  ],
  fourCta: L('이 네 가지로 문의하기', 'Send these four details', 'この4つで問い合わせる', 'Gửi 4 thông tin này', 'ส่ง 4 ข้อมูลนี้'),
  globalTitle: L('해외 바이어 문의도 받습니다', 'We welcome overseas buyers', '海外からのお問い合わせも承ります', 'Chào đón đối tác nước ngoài', 'ยินดีต้อนรับผู้ซื้อจากต่างประเทศ'),
  globalText: L(
    '이 사이트는 한국어, 영어, 일본어, 베트남어, 태국어로 볼 수 있습니다. 해외 문의는 이메일로 보내 주세요.',
    'This site is available in Korean, English, Japanese, Vietnamese and Thai. For inquiries from overseas, please email us.',
    'このサイトは韓国語・英語・日本語・ベトナム語・タイ語でご覧いただけます。海外からのお問い合わせはメールでお送りください。',
    'Trang web có tiếng Hàn, tiếng Anh, tiếng Nhật, tiếng Việt và tiếng Thái. Khách hàng ở nước ngoài vui lòng liên hệ qua email.',
    'เว็บไซต์นี้มีภาษาเกาหลี อังกฤษ ญี่ปุ่น เวียดนาม และไทย ผู้ติดต่อจากต่างประเทศโปรดส่งอีเมลถึงเรา'
  ),

  ctaTitle: L(
    ['필요한 트레이를', '알려 주세요'],
    ['Tell us the tray', 'you need'],
    ['必要なトレーを', 'お聞かせください'],
    ['Hãy cho chúng tôi biết', 'chiếc khay bạn cần'],
    ['บอกเราว่าคุณ', 'ต้องการถาดแบบไหน']
  ),
  ctaText: L(
    '메뉴와 크기, 사용량을 알려 주시면 구조와 견적을 안내해 드립니다.',
    'Share your menu, size and volume, and we’ll suggest a structure and a quote.',
    'メニュー・サイズ・使用量をお知らせいただければ、構造とお見積りをご案内します。',
    'Hãy cho biết món ăn, kích thước và số lượng, chúng tôi sẽ đề xuất cấu trúc và báo giá.',
    'แจ้งเมนู ขนาด และปริมาณ แล้วเราจะเสนอโครงสร้างและราคาให้'
  )
};

/* ---------- 작은 제목(눈썹 문구) ---------- */
export const EB = {
  statement: L('우리가 지키는 기준', 'What we stand for', '私たちの考え', 'Điều chúng tôi theo đuổi', 'สิ่งที่เรายึดถือ'),
  process: L('생산 과정', 'How it’s made', '生産工程', 'Quy trình sản xuất', 'ขั้นตอนการผลิต'),
  record: L('납품 실적', 'Track record', '納品実績', 'Thành tích', 'ผลงานของเรา'),
  why: L('강점', 'Strengths', '強み', 'Thế mạnh', 'จุดแข็ง'),
  start: L('상담 시작하기', 'Getting started', 'ご相談の始め方', 'Bắt đầu', 'เริ่มต้นปรึกษา'),
  global: L('해외 문의', 'Global', '海外のお客様へ', 'Khách hàng quốc tế', 'ลูกค้าต่างประเทศ'),
  compare: L('구조 비교', 'Structure', '構造の比較', 'So sánh cấu trúc', 'เปรียบเทียบโครงสร้าง'),
  thickness: L('두께 고르기', 'Thickness', '厚みの選び方', 'Chọn độ dày', 'การเลือกความหนา'),
  quality: L('품질 기준', 'Quality', '品質基準', 'Tiêu chuẩn chất lượng', 'มาตรฐานคุณภาพ'),
  factory: L('공장', 'Factory', '工場', 'Nhà máy', 'โรงงาน')
};

/* ---------- 회사소개 ---------- */
export const ABOUT = {
  title: UI.nav.about,
  heroTitle: L(['종이 트레이', '전문 제조사'], ['Paper tray', 'specialists'], ['紙トレー専門', 'メーカー'], ['Chuyên sản xuất', 'khay giấy'], ['ผู้เชี่ยวชาญ', 'ด้านถาดกระดาษ']),
  heroLede: L(
    'BBQ와 BHC의 치킨 트레이를 시작으로 다양한 종이 트레이와 종이 패키지를 직접 생산하고 유통합니다. 아웃백, 뚜레쥬르 등 식품 브랜드와 함께 일하고, 지금은 버거킹 햄버거 트레이를 납품하고 있습니다.',
    'Starting with chicken trays for BBQ and BHC, we produce and distribute a wide range of paper trays and paper packaging. We work with food brands such as Outback Steakhouse and Tous Les Jours, and currently supply burger trays to Burger King.',
    'BBQ、BHCのチキントレーを皮切りに、さまざまな紙トレーと紙パッケージを自社で生産・流通しています。アウトバック、トゥレジュールなどの食品ブランドと協業し、現在はバーガーキングにハンバーガートレーを納品しています。',
    'Bắt đầu từ khay đựng gà cho BBQ và BHC, chúng tôi tự sản xuất và phân phối nhiều loại khay giấy và bao bì giấy. Chúng tôi hợp tác với các thương hiệu như Outback Steakhouse, Tous Les Jours và hiện đang cung cấp khay burger cho Burger King.',
    'เริ่มจากถาดใส่ไก่ให้ BBQ และ BHC เราผลิตและจัดจำหน่ายถาดกระดาษและบรรจุภัณฑ์กระดาษหลากหลายแบบด้วยตัวเอง ร่วมงานกับแบรนด์อาหารอย่าง Outback Steakhouse และ Tous Les Jours และปัจจุบันส่งถาดเบอร์⁠เกอร์ให้ Burger King'
  ),
  messageTitle: L('대표 인사말', 'Message from the CEO', '代表挨拶', 'Thông điệp từ Giám đốc', 'สารจากประธานบริษัท'),
  messageDraft: L(
    '예시 문안입니다. 대표님 말씀으로 바꿔 주세요.',
    'Sample text, to be replaced with the CEO’s own words.',
    'サンプル文です。代表ご本人のお言葉に差し替えてください。',
    'Nội dung mẫu, sẽ được thay bằng lời của Giám đốc.',
    'ข้อความตัวอย่าง จะแทนที่ด้วยข้อความจริงของประธานบริษัท'
  ),
  message: L(
    ['안녕하십니까. 코리아트레이를 찾아 주셔서 감사합니다.',
      '저희는 BBQ와 BHC의 치킨 트레이를 시작으로 여러 식품 브랜드의 종이 트레이를 만들어 왔습니다. 트레이는 음식이 손님 손에 들리는 마지막 순간까지 모양을 지켜야 합니다. 그래서 디자인보다 구조를 먼저 보고, 첫 번째 트레이와 마지막 트레이가 같도록 만듭니다.',
      '먹거리를 담는 그릇 하나에도 친환경성과 편리함이 함께 담겨야 한다고 믿습니다. 국내는 물론 해외 고객과도 함께 일할 수 있기를 기대합니다.'],
    ['Thank you for visiting Korea Tray.',
      'Starting with chicken trays for BBQ and BHC, we have made paper trays for many food brands. A tray has to keep food in shape until the moment it reaches the customer’s hands. That is why we look at structure before design, and make the first tray and the last tray alike.',
      'We believe even a single container for food should be kind to the planet and easy to use. We look forward to working with customers in Korea and around the world.'],
    ['コリアトレイのホームページをご覧いただき、ありがとうございます。',
      '私たちはBBQ、BHCのチキントレーを皮切りに、多くの食品ブランドの紙トレーをつくってきました。トレーは、料理がお客様の手に渡る最後の瞬間まで形を守らなければなりません。だからこそデザインより先に構造を考え、最初のトレーと最後のトレーが同じになるようにつくっています。',
      '食べ物を入れる器ひとつにも、環境へのやさしさと使いやすさが込められているべきだと考えています。国内はもちろん、海外のお客様ともご一緒できることを願っております。'],
    ['Cảm ơn quý khách đã ghé thăm Korea Tray.',
      'Bắt đầu từ khay đựng gà cho BBQ và BHC, chúng tôi đã làm khay giấy cho nhiều thương hiệu thực phẩm. Một chiếc khay phải giữ được hình dáng món ăn cho đến khoảnh khắc nó đến tay khách hàng. Vì vậy, chúng tôi xem xét cấu trúc trước thiết kế, và làm sao để chiếc khay đầu tiên giống hệt chiếc cuối cùng.',
      'Chúng tôi tin rằng ngay cả một chiếc hộp đựng thức ăn cũng cần thân thiện với môi trường và tiện lợi. Chúng tôi mong được hợp tác với khách hàng trong nước và quốc tế.'],
    ['ขอบคุณที่เข้าชม Korea Tray',
      'เราเริ่มจากถาดใส่ไก่ให้ BBQ และ BHC และผลิตถาดกระดาษให้แบรนด์อาหารมากมาย ถาดต้องรักษารูปทรงของอาหารไว้จนถึงวินาทีที่ส่งถึงมือลูกค้า เราจึงคิดเรื่องโครงสร้างก่อนดีไซน์ และทำให้ถาดใบแรกกับใบสุดท้ายเหมือนกัน',
      'เราเชื่อว่าแม้ภาชนะใส่อาหารชิ้นเดียวก็ควรเป็นมิตรต่อสิ่งแวดล้อมและใช้งานสะดวก และหวังว่าจะได้ร่วมงานกับลูกค้าทั้งในเกาหลีและต่างประเทศ']
  ),
  signature: L('(주)코리아트레이 대표이사 이대우', 'Lee Dae-woo, CEO, Korea Tray Co., Ltd.', '株式会社コリアトレイ 代表取締役 イ・デウ', 'Lee Dae-woo, Giám đốc, Korea Tray Co., Ltd.', 'Lee Dae-woo ประธานบริษัท Korea Tray Co., Ltd.'),
  overviewTitle: L('회사 개요', 'Company overview', '会社概要', 'Tổng quan công ty', 'ข้อมูลบริษัท'),
  historyTitle: L('연혁', 'History', '沿革', 'Lịch sử', 'ประวัติบริษัท'),
  historyNote: L(
    '설립 연도와 주요 연혁을 받으면 채울 자리입니다.',
    'Founding year and milestones to be added.',
    '設立年と主な沿革は、資料をいただき次第掲載します。',
    'Năm thành lập và các mốc phát triển sẽ được bổ sung.',
    'ปีก่อตั้งและเหตุการณ์สำคัญจะเพิ่มภายหลัง'
  ),
  certTitle: L('인증·시험성적서', 'Certifications & test reports', '認証・試験成績書', 'Chứng nhận & phiếu kiểm nghiệm', 'การรับรองและผลทดสอบ'),
  certNote: L(
    '보유하신 인증서와 시험성적서 이미지를 받으면 채울 자리입니다.',
    'Certificate and test report images to be added.',
    '保有する認証書・試験成績書の画像は、資料をいただき次第掲載します。',
    'Hình ảnh chứng nhận và phiếu kiểm nghiệm sẽ được bổ sung.',
    'ภาพใบรับรองและผลทดสอบจะเพิ่มภายหลัง'
  ),
  locationsTitle: L('오시는 길', 'Locations', 'アクセス', 'Địa điểm', 'ที่ตั้ง')
};

/* ---------- 제품소개 ---------- */
export const PRODUCTS = {
  title: UI.nav.products,
  heroTitle: L(['메뉴마다', '맞는 트레이'], ['A tray for', 'every menu'], ['メニューに', '合わせたトレー'], ['Khay phù hợp', 'từng món ăn'], ['ถาดที่เหมาะ', 'กับทุกเมนู']),
  heroLede: HOME.productsSub,
  glueTitle: L('4면 접착과 8면 접착', '4-point vs 8-point gluing', '4面接着と8面接着', 'Dán 4 mặt và dán 8 mặt', 'ติดกาว 4 จุดกับ 8 จุด'),
  glueSub: L(
    '같은 두께라도 접착 방식에 따라 강도가 달라집니다.',
    'With the same board, the gluing method changes how strong the tray is.',
    '同じ厚みでも、接着方式によって強度が変わります。',
    'Cùng độ dày giấy, cách dán khác nhau sẽ cho độ chắc khác nhau.',
    'แม้กระดาษหนาเท่ากัน วิธีติดกาวก็ทำให้ความแข็งแรงต่างกัน'
  ),
  glue: [
    {
      kind: 4,
      name: L('4면 접착', '4-point gluing', '4面接着', 'Dán 4 mặt', 'ติดกาว 4 จุด'),
      how: L('네 방향만 붙이는 방식. 생산이 빠르고 단가가 합리적입니다.', 'Glued in four places. Faster to produce and reasonably priced.', '4方向だけを接着する方式。生産が速く、単価も手頃です。', 'Chỉ dán ở 4 vị trí. Sản xuất nhanh, giá hợp lý.', 'ติดกาวเพียง 4 จุด ผลิตเร็วและราคาเหมาะสม'),
      best: L('김밥, 핫도그, 떡, 빵, 디저트', 'Gimbap, hot dogs, rice cakes, bread, desserts', 'キンパ、ホットドッグ、お餅、パン、デザート', 'Kimbap, hot dog, bánh gạo, bánh mì, tráng miệng', 'คิมบับ ฮอทดอก ต็อก ขนมปัง ของหวาน')
    },
    {
      kind: 8,
      name: L('8면 접착', '8-point gluing', '8面接着', 'Dán 8 mặt', 'ติดกาว 8 จุด'),
      how: L('접히는 모든 면을 추가로 붙이는 방식. 무게와 충격에 강합니다.', 'Every folding face is glued. Stronger against weight and impact.', '折り面をすべて追加で接着する方式。重さや衝撃に強くなります。', 'Dán thêm tất cả các mặt gấp. Chịu lực và va đập tốt hơn.', 'ติดกาวเพิ่มทุกด้านที่พับ ทนน้ำหนักและแรงกระแทกได้ดีกว่า'),
      best: L('치킨, 햄버거, 양념이 많은 떡볶이', 'Chicken, burgers, saucy tteokbokki', 'チキン、ハンバーガー、ソースたっぷりのトッポッキ', 'Gà rán, burger, tteokbokki nhiều sốt', 'ไก่ทอด เบอร์⁠เกอร์ ต๊อกบกกีซอสเยอะ')
    }
  ],
  howLabel: L('방식', 'How it works', '方式', 'Cách làm', 'วิธี'),
  bestLabel: L('잘 맞는 메뉴', 'Best for', '向いているメニュー', 'Phù hợp với', 'เหมาะกับ'),
  thickTitle: L('두께는 메뉴 무게에서 정합니다', 'Thickness starts from the menu’s weight', '厚みはメニューの重さから決めます', 'Độ dày bắt đầu từ trọng lượng món ăn', 'ความหนาเริ่มจากน้ำหนักของเมนู'),
  thickText: L(
    '두꺼울수록 튼튼할 것 같지만, 가벼운 메뉴에 두꺼운 종이를 쓰면 단가만 오릅니다. 반대로 무겁고 기름진 메뉴에 얇은 종이를 쓰면 바닥이 처집니다. 담을 메뉴와 무게를 먼저 알려 주시면 맞는 종이와 구조를 제안합니다.',
    'Thicker seems stronger, but thick board under a light menu only raises the unit price. Thin board under a heavy, greasy menu makes the bottom sag. Tell us the menu and its weight first, and we’ll suggest the right board and structure.',
    '厚いほど丈夫に思えますが、軽いメニューに厚い紙を使うと単価が上がるだけです。逆に重く油の多いメニューに薄い紙を使うと底がたわみます。まずメニューと重さを教えていただければ、合う紙と構造をご提案します。',
    'Giấy càng dày có vẻ càng chắc, nhưng dùng giấy dày cho món nhẹ chỉ làm tăng giá. Ngược lại, giấy mỏng cho món nặng và nhiều dầu sẽ làm đáy bị võng. Hãy cho chúng tôi biết món ăn và trọng lượng trước, chúng tôi sẽ đề xuất loại giấy và cấu trúc phù hợp.',
    'ดูเหมือนยิ่งหนายิ่งแข็งแรง แต่ใช้กระดาษหนากับเมนูเบาจะทำให้ราคาต่อชิ้นสูงขึ้นเท่านั้น กลับกัน ใช้กระดาษบางกับเมนูหนักและมัน ก้นถาดจะยุบ บอกเมนูและน้ำหนักก่อน แล้วเราจะเสนอกระดาษและโครงสร้างที่เหมาะ'
  ),
  thickScale: L(['가벼운 메뉴', '무겁고 기름진 메뉴'], ['Light menus', 'Heavy, greasy menus'], ['軽いメニュー', '重く油の多いメニュー'], ['Món nhẹ', 'Món nặng, nhiều dầu'], ['เมนูเบา', 'เมนูหนักและมัน']),
  thickExamples: L(
    ['꼬마김밥·디저트', '빵·떡·핫도그', '떡볶이·튀김', '치킨·햄버거'],
    ['Mini gimbap & desserts', 'Bread, rice cakes, hot dogs', 'Tteokbokki & fried snacks', 'Chicken & burgers'],
    ['ミニキンパ・デザート', 'パン・お餅・ホットドッグ', 'トッポッキ・揚げ物', 'チキン・ハンバーガー'],
    ['Kimbap mini & tráng miệng', 'Bánh mì, bánh gạo, hot dog', 'Tteokbokki & đồ chiên', 'Gà rán & burger'],
    ['คิมบับมินิและของหวาน', 'ขนมปัง ต็อก ฮอทดอก', 'ต๊อกบกกีและของทอด', 'ไก่ทอดและเบอร์⁠เกอร์']
  )
};

/* ---------- 생산·품질 ---------- */
export const QUALITY = {
  title: UI.nav.quality,
  heroTitle: L(['첫 장부터 마지막 장까지', '같은 트레이'], ['The same tray,', 'first to last'], ['最初の1枚から', '最後の1枚まで同じトレー'], ['Chiếc khay giống nhau', 'từ đầu đến cuối'], ['ถาดเหมือนกัน', 'ตั้งแต่ใบแรกจนใบสุดท้าย']),
  heroLede: L(
    '칼선 설계부터 납품까지, 모든 과정을 한곳에서 맡아 같은 기준으로 관리합니다.',
    'From dieline design to delivery, we handle every step in one place and manage it to one standard.',
    '抜き型の設計から納品まで、すべての工程を一か所で担い、同じ基準で管理しています。',
    'Từ thiết kế khuôn bế đến giao hàng, chúng tôi đảm nhận mọi công đoạn tại một nơi và quản lý theo cùng một tiêu chuẩn.',
    'ตั้งแต่ออกแบบไดคัทจนถึงจัดส่ง เราดูแลทุกขั้นตอนในที่เดียวและควบคุมด้วยมาตรฐานเดียว'
  ),
  pointsTitle: L('식품에 닿는 포장이라서', 'Because it touches food', '食品に触れる包装だから', 'Vì bao bì tiếp xúc với thực phẩm', 'เพราะบรรจุภัณฑ์สัมผัสอาหาร'),
  points: [
    {
      title: L('대량 생산에도 같은 품질', 'Consistent at volume', '大量生産でも同じ品質', 'Đồng đều khi sản xuất lớn', 'คุณภาพเท่ากันแม้ผลิตจำนวนมาก'),
      text: L(
        '샘플 몇 장이 아니라 본생산 물량 전체에서 형태와 접착 상태가 같아야 합니다. 2026년 10월에는 CU 리센느 빵 트레이 120만 개를 한 달 동안 생산했습니다.',
        'Shape and gluing must match across the whole production run, not just a few samples. In October 2026 we produced 1.2 million CU bakery trays in a single month.',
        '数枚のサンプルではなく、本生産の全数で形と接着状態がそろっていなければなりません。2026年10月にはCUのパン用トレーを1か月で120万個生産しました。',
        'Hình dáng và độ dán phải đồng đều trên toàn bộ lô sản xuất, không chỉ vài mẫu. Tháng 10/2026, chúng tôi đã sản xuất 1,2 triệu khay bánh mì cho CU trong một tháng.',
        'รูปทรงและการติดกาวต้องเหมือนกันทั้งล็อตการผลิต ไม่ใช่แค่ตัวอย่างไม่กี่ใบ ในเดือนตุลาคม 2026 เราผลิตถาดขนมปังให้ CU 1.2 ล้านใบภายในเดือนเดียว'
      )
    },
    {
      title: L('벌어지지 않는 접착', 'Glue that holds', '開かない接着', 'Dán chắc, không bung', 'กาวที่ไม่แยก'),
      text: L(
        '접착 불량은 대부분 압착 부족과 원지 상태가 겹쳐 생깁니다. 압착 시간과 압력을 지키고, 원지를 고를 때부터 접착이 잘 되는 조건을 확인합니다.',
        'Gluing failures usually come from insufficient pressing combined with board condition. We keep pressing time and pressure, and check gluing conditions from the moment we choose the board.',
        '接着不良の多くは、圧着不足と原紙の状態が重なって起こります。圧着時間と圧力を守り、原紙を選ぶ段階から接着しやすい条件を確認します。',
        'Lỗi dán thường do ép chưa đủ cộng với tình trạng giấy. Chúng tôi giữ đúng thời gian và lực ép, đồng thời kiểm tra điều kiện bám dính ngay từ khi chọn giấy.',
        'ปัญหากาวไม่ติดมักเกิดจากการกดไม่พอร่วมกับสภาพของกระดาษ เราคุมเวลาและแรงกด และตรวจเงื่อนไขการยึดติดตั้งแต่ตอนเลือกกระดาษ'
      )
    },
    {
      title: L('시즌 전에 미리', 'Ready before the season', 'シーズン前に早めに', 'Chuẩn bị trước mùa cao điểm', 'พร้อมก่อนถึงฤดูกาล'),
      text: L(
        '연말과 명절에는 포장 주문이 한꺼번에 몰립니다. 처음 만드는 트레이는 디자인 확정, 칼선, 인쇄, 접착까지 시간이 필요하니 시즌 전에 미리 상담하시길 권합니다.',
        'Packaging orders pile up before year-end and the holidays. A new tray needs time for design, dieline, printing and gluing, so we recommend talking to us before the season.',
        '年末や名節の前には包装の注文が一度に集中します。初めてつくるトレーはデザイン確定、抜き型、印刷、接着まで時間がかかるため、シーズン前の早めのご相談をおすすめします。',
        'Đơn bao bì dồn dập trước cuối năm và các dịp lễ. Khay mới cần thời gian cho thiết kế, khuôn bế, in và dán, vì vậy bạn nên liên hệ trước mùa cao điểm.',
        'ช่วงปลายปีและเทศกาล ออร์เดอร์บรรจุภัณฑ์จะเข้ามาพร้อมกันจำนวนมาก ถาดที่ทำครั้งแรกต้องใช้เวลาออกแบบ ทำไดคัท พิมพ์ และติดกาว จึงแนะนำให้ปรึกษาล่วงหน้าก่อนถึงฤดูกาล'
      )
    }
  ],
  factoryTitle: L('곤지암 공장', 'Gonjiam factory', '昆池岩工場', 'Nhà máy Gonjiam', 'โรงงานกนจีอัม'),
  photoSlots: L(['공장 전경', '인쇄 설비', '톰슨·접착 공정'], ['Factory exterior', 'Printing equipment', 'Die-cutting & gluing line'], ['工場外観', '印刷設備', 'トムソン・接着工程'], ['Toàn cảnh nhà máy', 'Thiết bị in', 'Dây chuyền bế & dán'], ['ภาพรวมโรงงาน', 'เครื่องพิมพ์', 'สายการผลิตไดคัทและติดกาว']),
  photoNote: L('사진을 받으면 채울 자리', 'Photo to be added', '写真をいただき次第掲載', 'Sẽ thay bằng ảnh thực tế', 'จะแทนที่ด้วยภาพจริง')
};

/* ---------- 문의 ---------- */
export const CONTACT = {
  title: UI.nav.contact,
  heroTitle: L(['견적과 샘플,', '편하게 문의하세요'], ['Quotes and samples,', 'just ask'], ['お見積り・サンプルの', 'ご相談はこちら'], ['Báo giá và mẫu,', 'cứ hỏi chúng tôi'], ['ใบเสนอราคาและตัวอย่าง', 'สอบถามได้เลย']),
  heroLede: L(
    '메뉴 종류와 크기, 하루 사용량, 인쇄 여부를 적어 주시면 확인 후 연락드립니다.',
    'Tell us your menu, size, daily usage and printing needs, and we’ll get back to you.',
    'メニュー・サイズ・1日の使用量・印刷の有無をご記入いただければ、確認のうえご連絡します。',
    'Hãy cho biết loại món, kích thước, số lượng mỗi ngày và nhu cầu in, chúng tôi sẽ liên hệ lại.',
    'กรอกประเภทเมนู ขนาด ปริมาณใช้ต่อวัน และความต้องการพิมพ์ แล้วเราจะติดต่อกลับ'
  ),
  direct: L('바로 연락하기', 'Reach us directly', '直接のご連絡', 'Liên hệ trực tiếp', 'ติดต่อโดยตรง'),
  f: {
    type: L('문의 종류', 'Inquiry type', 'お問い合わせの種類', 'Loại yêu cầu', 'ประเภทคำถาม'),
    types: L(['견적 문의', '샘플 요청', '기타'], ['Quote', 'Sample', 'Other'], ['お見積り', 'サンプル', 'その他'], ['Báo giá', 'Mẫu', 'Khác'], ['ใบเสนอราคา', 'ตัวอย่าง', 'อื่น ๆ']),
    company: L('회사명 또는 매장명', 'Company or store name', '会社名・店舗名', 'Tên công ty hoặc cửa hàng', 'ชื่อบริษัทหรือร้าน'),
    name: L('담당자 이름', 'Your name', 'ご担当者名', 'Họ tên', 'ชื่อผู้ติดต่อ'),
    country: L('국가', 'Country', '国', 'Quốc gia', 'ประเทศ'),
    countries: L(['대한민국', '일본', '베트남', '태국', '기타'], ['Korea', 'Japan', 'Vietnam', 'Thailand', 'Other'], ['韓国', '日本', 'ベトナム', 'タイ', 'その他'], ['Hàn Quốc', 'Nhật Bản', 'Việt Nam', 'Thái Lan', 'Khác'], ['เกาหลีใต้', 'ญี่ปุ่น', 'เวียดนาม', 'ไทย', 'อื่น ๆ']),
    defaultCountry: L(0, -1, 1, 2, 3),
    phone: L('연락처', 'Phone', '電話番号', 'Số điện thoại', 'เบอร์โทรศัพท์'),
    email: L('이메일', 'Email', 'メールアドレス', 'Email', 'อีเมล'),
    contactHint: L('연락처와 이메일 중 하나는 꼭 적어 주세요.', 'Please give a phone number or an email.', '電話番号かメールアドレスのどちらかは必ずご記入ください。', 'Vui lòng cung cấp số điện thoại hoặc email.', 'กรุณากรอกเบอร์โทรศัพท์หรืออีเมลอย่างใดอย่างหนึ่ง'),
    product: L('메뉴 종류', 'Menu type', 'メニューの種類', 'Loại món', 'ประเภทเมนู'),
    notSure: L('아직 정하지 않았어요', 'Not decided yet', '未定', 'Chưa xác định', 'ยังไม่แน่ใจ'),
    select: L('선택해 주세요', 'Select', '選択してください', 'Chọn', 'เลือก'),
    size: L('대략의 크기', 'Rough size', 'おおよそのサイズ', 'Kích thước ước tính', 'ขนาดโดยประมาณ'),
    sizeHint: L('예: 가로 20cm, 세로 15cm, 높이 5cm', 'e.g. 20 × 15 × 5 cm', '例：横20cm×縦15cm×高さ5cm', 'VD: 20 × 15 × 5 cm', 'เช่น 20 × 15 × 5 ซม.'),
    usage: L('하루 사용량', 'Daily usage', '1日の使用量', 'Số lượng mỗi ngày', 'ปริมาณใช้ต่อวัน'),
    usageHint: L('예: 하루 300개', 'e.g. 300 per day', '例：1日300個', 'VD: 300 chiếc/ngày', 'เช่น วันละ 300 ใบ'),
    printing: L('인쇄 여부', 'Printing', '印刷の有無', 'In ấn', 'การพิมพ์'),
    printOpts: L(['인쇄 있음', '인쇄 없음', '아직 몰라요'], ['With printing', 'No printing', 'Not sure yet'], ['印刷あり', '印刷なし', '未定'], ['Có in', 'Không in', 'Chưa biết'], ['พิมพ์', 'ไม่พิมพ์', 'ยังไม่แน่ใจ']),
    message: L('문의 내용', 'Message', 'お問い合わせ内容', 'Nội dung', 'รายละเอียด'),
    messageHint: L('참고할 사진이나 원하는 점을 적어 주세요.', 'Anything else we should know, such as reference photos or requests.', '参考写真やご要望などをご記入ください。', 'Ảnh tham khảo hoặc yêu cầu khác của bạn.', 'รูปอ้างอิงหรือความต้องการเพิ่มเติม'),
    photoNote: L('참고 사진은 이메일로 보내 주셔도 됩니다.', 'You can also email reference photos.', '参考写真はメールでもお送りいただけます。', 'Bạn cũng có thể gửi ảnh tham khảo qua email.', 'ส่งรูปอ้างอิงทางอีเมลได้เช่นกัน'),
    required: L('필수', 'Required', '必須', 'Bắt buộc', 'จำเป็น'),
    privacy: L('개인정보 수집과 이용에 동의합니다', 'I agree to the collection and use of my personal information', '個人情報の収集・利用に同意します', 'Tôi đồng ý cho thu thập và sử dụng thông tin cá nhân', 'ฉันยินยอมให้เก็บและใช้ข้อมูลส่วนบุคคล'),
    privacyMore: L('내용 보기', 'Details', '詳細', 'Chi tiết', 'รายละเอียด'),
    privacyText: L(
      '수집 항목: 회사명, 담당자 이름, 연락처, 이메일. 이용 목적: 문의 답변. 보관 기간: 상담 종료 후 1년.',
      'Collected: company, name, phone, email. Purpose: replying to your inquiry. Kept for 1 year after the consultation ends.',
      '収集項目：会社名、ご担当者名、電話番号、メール。利用目的：お問い合わせへの回答。保管期間：ご相談終了後1年。',
      'Thông tin thu thập: tên công ty, họ tên, số điện thoại, email. Mục đích: trả lời yêu cầu. Lưu trong 1 năm sau khi kết thúc tư vấn.',
      'ข้อมูลที่เก็บ: ชื่อบริษัท ชื่อ เบอร์โทรศัพท์ อีเมล วัตถุประสงค์: เพื่อตอบคำถาม ระยะเวลาเก็บ: 1 ปีหลังสิ้นสุดการปรึกษา'
    ),
    submit: L('문의 보내기', 'Send inquiry', '送信する', 'Gửi yêu cầu', 'ส่งคำถาม')
  },
  errors: {
    company: L('회사명이나 매장명을 입력해 주세요.', 'Enter your company or store name.', '会社名または店舗名を入力してください。', 'Vui lòng nhập tên công ty hoặc cửa hàng.', 'กรุณากรอกชื่อบริษัทหรือร้าน'),
    name: L('담당자 이름을 입력해 주세요.', 'Enter your name.', 'ご担当者名を入力してください。', 'Vui lòng nhập họ tên.', 'กรุณากรอกชื่อผู้ติดต่อ'),
    contact: L('연락처나 이메일 중 하나는 입력해 주세요.', 'Enter a phone number or an email.', '電話番号かメールアドレスのどちらかを入力してください。', 'Vui lòng nhập số điện thoại hoặc email.', 'กรุณากรอกเบอร์โทรศัพท์หรืออีเมลอย่างใดอย่างหนึ่ง'),
    email: L('이메일 주소 형식을 확인해 주세요.', 'Check the email address format.', 'メールアドレスの形式をご確認ください。', 'Vui lòng kiểm tra định dạng email.', 'กรุณาตรวจสอบรูปแบบอีเมล'),
    message: L('문의 내용을 적어 주세요.', 'Enter your message.', 'お問い合わせ内容を入力してください。', 'Vui lòng nhập nội dung.', 'กรุณากรอกรายละเอียด'),
    privacy: L('개인정보 수집과 이용에 동의해 주세요.', 'Agree to the privacy terms to continue.', '個人情報の取り扱いに同意してください。', 'Vui lòng đồng ý với điều khoản thông tin cá nhân.', 'กรุณายินยอมเรื่องข้อมูลส่วนบุคคล')
  },
  sent: L(
    '문의 내용을 확인했어요. 시안이라 실제로 전송되지는 않고, 실제 사이트에서는 papermarket@naver.com으로 전달됩니다.',
    'Your inquiry looks good. This is a draft, so nothing was sent. On the live site it will go to papermarket@naver.com.',
    '入力内容を確認しました。試作版のため送信はされません。公開サイトでは papermarket@naver.com に届きます。',
    'Đã kiểm tra nội dung. Đây là bản thử nên chưa gửi đi; trên trang chính thức, yêu cầu sẽ được gửi đến papermarket@naver.com.',
    'ตรวจสอบข้อมูลแล้ว นี่เป็นแบบร่างจึงยังไม่ได้ส่งจริง ในเว็บไซต์จริงข้อความจะถูกส่งไปที่ papermarket@naver.com'
  ),
  prefilled: L(
    '선택하신 제품을 미리 골라 뒀어요.',
    'We’ve pre-selected the product you chose.',
    '選んだ製品をあらかじめ選択しました。',
    'Chúng tôi đã chọn sẵn sản phẩm bạn quan tâm.',
    'เราเลือกสินค้าที่คุณสนใจไว้ให้แล้ว'
  )
};

/* ---------- 블로그 최근 글 (사용자가 보내 준 블로그 목록 기준) ---------- */
export const BLOG = {
  title: L('블로그 소식', 'From our blog', 'ブログ', 'Tin từ blog', 'จากบล็อกของเรา'),
  sub: L(
    '현장 이야기와 트레이 고르는 법을 블로그에 꾸준히 올리고 있습니다.',
    'We regularly post factory stories and tips on choosing trays.',
    '現場の話やトレーの選び方を、ブログで定期的に発信しています。',
    'Chúng tôi thường xuyên chia sẻ chuyện ở xưởng và cách chọn khay trên blog.',
    'เราโพสต์เรื่องราวจากโรงงานและวิธีเลือกถาดในบล็อกอย่างสม่ำเสมอ'
  ),
  koNote: L('', 'Posts are written in Korean.', '記事は韓国語で書かれています。', 'Bài viết bằng tiếng Hàn.', 'บทความเขียนเป็นภาษาเกาหลี'),
  more: L('블로그에서 더 보기', 'Visit the blog', 'ブログを見る', 'Xem blog', 'ไปที่บล็อก'),
  cats: {
    tips: L('유용한 이야기', 'Tips', 'お役立ち情報', 'Mẹo hay', 'เกร็ดความรู้'),
    delivery: L('트레이 납품 사진', 'Deliveries', '納品レポート', 'Giao hàng', 'การส่งมอบ')
  },
  posts: [
    {
      date: '2026-11-09', cat: 'tips',
      title: L(
        '분식 포장 트레이, 김밥·핫도그·떡 매장이라면 이렇게 고르세요',
        'Street-food trays: how gimbap, hot dog and rice cake shops should choose',
        '軽食用トレー：キンパ・ホットドッグ・お餅の店ならこう選ぶ',
        'Khay đồ ăn đường phố: cách chọn cho tiệm kimbap, hot dog, bánh gạo',
        'ถาดสตรีทฟู้ด: ร้านคิมบับ ฮอทดอก และต็อกควรเลือกอย่างไร'
      )
    },
    {
      date: '2026-11-06', cat: 'tips',
      title: L(
        '종이 트레이 주문제작, 처음 맡기기 전에 알아두면 좋은 과정과 기준',
        'Custom paper trays: the process and criteria to know before your first order',
        '紙トレーのオーダーメイド：初めて依頼する前に知っておきたい工程と基準',
        'Đặt làm khay giấy: quy trình và tiêu chí nên biết trước đơn hàng đầu tiên',
        'สั่งผลิตถาดกระดาษ: ขั้นตอนและเกณฑ์ที่ควรรู้ก่อนสั่งครั้งแรก'
      )
    },
    {
      date: '2026-11-04', cat: 'tips',
      title: L(
        '크리스마스 디저트 포장 트레이, 연말 선물 세트를 돋보이게 만드는 준비법',
        'Christmas dessert trays: making year-end gift sets stand out',
        'クリスマスのデザート用トレー：年末ギフトセットを引き立てる準備',
        'Khay tráng miệng Giáng sinh: chuẩn bị để hộp quà cuối năm thêm nổi bật',
        'ถาดขนมคริสต์มาส: เตรียมชุดของขวัญปลายปีให้โดดเด่น'
      )
    },
    {
      date: '2026-10-23', cat: 'delivery',
      title: L(
        'CU 리센느 빵 종이 트레이 납품, 이번 달 120만 개를 현장에서 보여드립니다',
        'Delivering CU bakery trays: 1.2 million this month, from the factory floor',
        'CUのパン用紙トレーを納品：今月120万個を現場からお見せします',
        'Giao khay giấy bánh mì cho CU: 1,2 triệu chiếc trong tháng, xem tận xưởng',
        'ส่งมอบถาดกระดาษขนมปังให้ CU: 1.2 ล้านใบในเดือนนี้ จากหน้างานจริง'
      )
    }
  ]
};

/* ---------- 검색·공유용 설명 ---------- */
export const META = {
  home: L(
    '(주)코리아트레이는 BBQ·BHC 치킨 트레이, 버거킹 햄버거 트레이, 아웃백·뚜레쥬르 테이크아웃 용기를 만드는 종이 트레이·식품 포장 박스 제조사입니다.',
    'Korea Tray makes paper trays and food packaging boxes, including chicken trays for BBQ and BHC, burger trays for Burger King and take-out containers for Outback Steakhouse and Tous Les Jours.',
    'コリアトレイは、BBQ・BHCのチキントレー、バーガーキングのハンバーガートレー、アウトバック・トゥレジュールのテイクアウト容器をつくる紙トレー・食品包装箱メーカーです。',
    'Korea Tray sản xuất khay giấy và hộp đựng thực phẩm, gồm khay gà cho BBQ, BHC, khay burger cho Burger King và hộp mang đi cho Outback Steakhouse, Tous Les Jours.',
    'Korea Tray ผลิตถาดกระดาษและกล่องบรรจุอาหาร รวมถึงถาดไก่ให้ BBQ และ BHC ถาดเบอร์⁠เกอร์ให้ Burger King และบรรจุภัณฑ์ซื้อกลับบ้านให้ Outback Steakhouse และ Tous Les Jours'
  ),
  about: L(
    '코리아트레이 회사소개: 대표 인사말, 회사 개요, 곤지암 공장과 서울사무소 위치.',
    'About Korea Tray: message from the CEO, company overview, and our Gonjiam factory and Seoul office.',
    'コリアトレイの会社紹介：代表挨拶、会社概要、昆池岩工場とソウル事務所の所在地。',
    'Giới thiệu Korea Tray: thông điệp từ Giám đốc, tổng quan công ty, nhà máy Gonjiam và văn phòng Seoul.',
    'เกี่ยวกับ Korea Tray: สารจากประธาน ข้อมูลบริษัท โรงงานกนจีอัมและสำนักงานโซล'
  ),
  products: L(
    '치킨·버거, 베이커리·디저트, 분식·핫도그, 테이크아웃·도시락 트레이와 주문 제작. 4면 접착과 8면 접착의 차이도 안내합니다.',
    'Trays for chicken and burgers, bakery and desserts, street food and hot dogs, take-out and lunch boxes, plus custom orders. We also explain 4-point vs 8-point gluing.',
    'チキン・バーガー、ベーカリー・デザート、軽食・ホットドッグ、テイクアウト・弁当用トレーとオーダーメイド。4面接着と8面接着の違いもご案内します。',
    'Khay cho gà rán & burger, bánh & tráng miệng, đồ ăn đường phố & hot dog, đồ mang đi & cơm hộp, cùng đặt làm theo yêu cầu. Giải thích sự khác nhau giữa dán 4 mặt và 8 mặt.',
    'ถาดสำหรับไก่ทอดและเบอร์⁠เกอร์ เบเกอรี่และของหวาน สตรีทฟู้ดและฮอทดอก อาหารซื้อกลับบ้านและข้าวกล่อง รวมถึงสั่งผลิต พร้อมอธิบายการติดกาว 4 จุดและ 8 จุด'
  ),
  quality: L(
    '칼선 설계부터 인쇄, 톰슨 재단, 접착, 검수, 납품까지. 코리아트레이가 한곳에서 진행하는 생산 과정입니다.',
    'From dieline design to printing, die-cutting, gluing, inspection and delivery: how Korea Tray makes trays in one place.',
    '抜き型の設計から印刷、トムソン裁断、接着、検品、納品まで。コリアトレイが一か所で行う生産工程です。',
    'Từ thiết kế khuôn bế đến in, bế, dán, kiểm tra và giao hàng: quy trình sản xuất tại một nơi của Korea Tray.',
    'ตั้งแต่ออกแบบไดคัท พิมพ์ ตัดด้วยแม่พิมพ์ ติดกาว ตรวจสอบ จนถึงจัดส่ง ขั้นตอนการผลิตในที่เดียวของ Korea Tray'
  ),
  contact: L(
    '종이 트레이 견적과 샘플 문의. 메뉴 종류, 대략의 크기, 하루 사용량, 인쇄 여부만 알려 주세요.',
    'Ask for a quote or a sample. Just tell us your menu, rough size, daily usage and printing needs.',
    '紙トレーのお見積り・サンプルのご相談。メニュー、おおよそのサイズ、1日の使用量、印刷の有無をお知らせください。',
    'Yêu cầu báo giá hoặc mẫu khay giấy. Chỉ cần cho biết món ăn, kích thước, số lượng mỗi ngày và nhu cầu in.',
    'ขอใบเสนอราคาหรือตัวอย่างถาดกระดาษ แค่บอกเมนู ขนาดโดยประมาณ ปริมาณใช้ต่อวัน และความต้องการพิมพ์'
  )
};

/* ---------- 없는 주소 ---------- */
export const NOTFOUND = {
  title: L('페이지를 찾을 수 없어요', 'Page not found', 'ページが見つかりません', 'Không tìm thấy trang', 'ไม่พบหน้านี้'),
  text: L(
    '주소가 바뀌었거나 없는 페이지예요. 아래 메뉴에서 찾아 주세요.',
    'The address may have changed or the page doesn’t exist. Try one of the links below.',
    'アドレスが変わったか、ページが存在しません。下のメニューからお探しください。',
    'Địa chỉ có thể đã thay đổi hoặc trang không tồn tại. Hãy thử các liên kết bên dưới.',
    'ที่อยู่อาจเปลี่ยนไปหรือไม่มีหน้านี้ ลองใช้ลิงก์ด้านล่าง'
  ),
  home: L('홈으로', 'Go home', 'ホームへ', 'Về trang chủ', 'กลับหน้าแรก')
};

/* ---------- 다른 언어 안내 띠 ---------- */
export const SUGGEST = {
  ko: '이 페이지를 한국어로 볼 수 있어요.',
  en: 'This page is available in English.',
  ja: 'このページは日本語でもご覧いただけます。',
  vi: 'Trang này có phiên bản tiếng Việt.',
  th: 'หน้านี้มีภาษาไทย',
  go: { ko: '한국어로 보기', en: 'View in English', ja: '日本語で見る', vi: 'Xem bằng tiếng Việt', th: 'ดูภาษาไทย' },
  close: L('닫기', 'Close', '閉じる', 'Đóng', 'ปิด')
};
