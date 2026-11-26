/* 이끌림 마케팅 시안: node build.mjs 로 HTML을 만듭니다 (Node 18 이상, 설치할 패키지 없음) */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ctx } from './src/layout.mjs';
import { home, about, services, portfolio, pricing, reviews, faq, contact, templates, notFound } from './src/pages.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = process.env.OUT_DIR || ROOT;   /* release.mjs가 실제 도메인용 묶음을 만들 때만 바꿈 */
const write = (rel, html) => { const file = join(OUT, rel); mkdirSync(dirname(file), { recursive: true }); writeFileSync(file, html); return rel; };
const out = [
  write('index.html', home(ctx(''))),
  write('about/index.html', about(ctx('about/'))),
  write('services/index.html', services(ctx('services/'))),
  write('portfolio/index.html', portfolio(ctx('portfolio/'))),
  write('pricing/index.html', pricing(ctx('pricing/'))),
  write('reviews/index.html', reviews(ctx('reviews/'))),
  write('faq/index.html', faq(ctx('faq/'))),
  write('contact/index.html', contact(ctx('contact/'))),
  write('portfolio/templates/index.html', templates(ctx('portfolio/templates/'))),
  write('404.html', notFound(ctx('404.html')))
];
console.log(`${out.length} files`);
