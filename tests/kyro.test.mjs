import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

test('KYRO-1: project registration and truthful pre-release status', () => {
  const contentFile = fs.readFileSync(path.join(ROOT, 'lib/content.ts'), 'utf8');
  const kyroIdx = contentFile.indexOf("slug: 'kyro'");
  assert.ok(kyroIdx !== -1, 'Kyro must be registered in lib/content.ts');
  const nextProject = contentFile.indexOf("slug: '", kyroIdx + 12);
  const kyroChunk = contentFile.slice(kyroIdx, nextProject === -1 ? kyroIdx + 12000 : nextProject);
  assert.match(kyroChunk, /status:\s*'Development'/, 'Kyro must remain in development');
  assert.match(kyroChunk, /productStatus:\s*'preview'/, 'Kyro must remain preview');
  assert.match(kyroChunk, /releaseStatus:\s*'pre-release'/, 'Kyro must remain pre-release');
  assert.match(kyroChunk, /repository:\s*'https:\/\/github\.com\/eshanized\/Kyro'/, 'Kyro source URL must be present');
  assert.match(kyroChunk, /observe–reason–act–verify/i, 'Kyro approach should be documented');
  assert.match(kyroChunk, /release qualification/i, 'Kyro must not be claimed as fully release-qualified');
});

test('KYRO-2: discovery, static route and SEO indexing integration', () => {
  const contentFile = fs.readFileSync(path.join(ROOT, 'lib/content.ts'), 'utf8');
  const homepage = fs.readFileSync(path.join(ROOT, 'app/page.tsx'), 'utf8');
  const projectIndex = fs.readFileSync(path.join(ROOT, 'app/projects/page.tsx'), 'utf8');
  const projectRoute = fs.readFileSync(path.join(ROOT, 'app/projects/[slug]/page.tsx'), 'utf8');
  const sitemap = fs.readFileSync(path.join(ROOT, 'app/sitemap.ts'), 'utf8');
  const structuredData = fs.readFileSync(path.join(ROOT, 'lib/structured-data.ts'), 'utf8');

  assert.match(contentFile, /slug:\s*'kyro'/, 'canonical catalogue must include Kyro');
  assert.match(homepage, /Kyro — Visual AI Desktop Agent/, 'homepage must feature Kyro');
  assert.match(homepage, /href="\/projects\/kyro"/, 'homepage must link to the project profile');
  assert.match(homepage, /https:\/\/github\.com\/eshanized\/Kyro/, 'homepage must link to the GitHub repository');
  assert.match(projectIndex, /getProjects\(\)\.filter\(\(p\) => p\.status === 'Development'\)/, 'development venture list must be catalogue-driven');
  assert.match(projectRoute, /getProjects\(\)\.map\(\(p\) => \(\{ slug: p\.slug \}\)\)/, 'static params must include all project slugs');
  assert.match(sitemap, /getProjects\(\)/, 'sitemap must derive project URLs from project catalogue');
  assert.match(structuredData, /generateSoftwareApplicationSchema/, 'project route should have software structured-data support');
});
