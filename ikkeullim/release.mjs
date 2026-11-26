/* 실제 도메인에 올릴 묶음 만들기
   SITE_URL=https://ikkeulim.co.kr/ node release.mjs <출력 폴더>
   - 검색 허용: noindex를 빼고 canonical·og 주소를 실제 도메인으로 (템플릿 예시 화면 tNN과 404는 그대로 noindex)
   - sitemap.xml, robots.txt, .htaccess(없는 주소는 404 페이지로) 추가
   - 작업용 파일(src, build.mjs, release.mjs, README.md, ik 폴더)은 넣지 않음
   출력 폴더 안의 파일을 호스팅의 웹 폴더(가비아는 www)에 그대로 올리면 됩니다. */
import { cpSync, rmSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const ROOT = dirname(fileURLToPath(import.meta.url));
const SITE = (process.env.SITE_URL || '').replace(/\/?$/, '/');
const OUT = process.argv[2] && resolve(process.argv[2]);
if (!/^https?:\/\/[^/]+\/$/.test(SITE) || !OUT) { console.error('사용법: SITE_URL=https://도메인/ node release.mjs <출력 폴더>'); process.exit(1); }
if (OUT.startsWith(ROOT)) { console.error('출력 폴더는 시안 폴더 밖에 두세요.'); process.exit(1); }

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync(join(ROOT, 'assets'), join(OUT, 'assets'), { recursive: true });
cpSync(join(ROOT, 'portfolio', 'templates'), join(OUT, 'portfolio', 'templates'), { recursive: true });
execFileSync(process.execPath, [join(ROOT, 'build.mjs')], { env: { ...process.env, SITE_URL: SITE, OUT_DIR: OUT }, stdio: 'inherit' });

/* 404 페이지는 어느 주소에서 보여도 그림과 글꼴이 깨지지 않게 기준 주소를 붙임 */
const nf = join(OUT, '404.html');
writeFileSync(nf, readFileSync(nf, 'utf8').replace('<head>', `<head>\n<base href="${SITE}">`));

const pages = ['', 'about/', 'services/', 'portfolio/', 'portfolio/templates/', 'pricing/', 'reviews/', 'faq/', 'contact/'];
const today = new Date().toISOString().slice(0, 10);
writeFileSync(join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url><loc>${SITE}${p}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`);
writeFileSync(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}sitemap.xml\n`);
writeFileSync(join(OUT, '.htaccess'), `# 없는 주소로 들어오면 404 페이지를 보여 줌\nErrorDocument 404 /404.html\n\nDirectoryIndex index.html\n`);
console.log(`묶음 완료: ${OUT} (${SITE})`);
