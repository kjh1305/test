/* 글로벌 코리아트레이 시안: node build.mjs 로 언어별 HTML을 만듭니다 (Node 18 이상, 설치할 패키지 없음) */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LANGS } from './src/content.mjs';
import { ctx } from './src/layout.mjs';
import { home, about, products, quality, contact, notFound } from './src/pages.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const write = (rel, html) => {
  const file = join(ROOT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  return rel;
};

const PAGES = [['', home], ['about/', about], ['products/', products], ['quality/', quality], ['contact/', contact]];
const out = [];
for (const L of LANGS) {
  for (const [slug, fn] of PAGES) out.push(write(`${L.prefix}${slug}index.html`, fn(ctx(L.code, slug))));
  out.push(write(`${L.prefix}404.html`, notFound(ctx(L.code, '404.html'))));
}
console.log(`${out.length} files`);
