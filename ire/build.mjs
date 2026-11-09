/* 이레산업개발 시안: node build.mjs 로 HTML을 만듭니다 (Node 18 이상, 설치할 패키지 없음) */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ctx } from './src/layout.mjs';
import { home, about, business, projects, guide, contact, notFound } from './src/pages.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const write = (rel, html) => { const file = join(ROOT, rel); mkdirSync(dirname(file), { recursive: true }); writeFileSync(file, html); return rel; };
const out = [
  write('index.html', home(ctx(''))),
  write('about/index.html', about(ctx('about/'))),
  write('business/index.html', business(ctx('business/'))),
  write('projects/index.html', projects(ctx('projects/'))),
  write('guide/index.html', guide(ctx('guide/'))),
  write('contact/index.html', contact(ctx('contact/'))),
  write('404.html', notFound(ctx('404.html')))
];
console.log(`${out.length} files`);
