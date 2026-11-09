/* 겟스크린미 한국총판 시안: node build.mjs 로 HTML을 만듭니다 (Node 18 이상, 설치할 패키지 없음) */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ctx } from './src/layout.mjs';
import { home, features, pricing, guide, support, contact, notFound } from './src/pages.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const write = (rel, html) => {
  const file = join(ROOT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  return rel;
};

const out = [
  write('index.html', home(ctx(''))),
  write('features/index.html', features(ctx('features/'))),
  write('pricing/index.html', pricing(ctx('pricing/'))),
  write('guide/index.html', guide(ctx('guide/'))),
  write('support/index.html', support(ctx('support/'))),
  write('contact/index.html', contact(ctx('contact/'))),
  write('404.html', notFound(ctx('404.html')))
];
console.log(`${out.length} files`);
