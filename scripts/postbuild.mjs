import fs from 'node:fs';
import path from 'node:path';

/**
 * Postbuild script for Next.js static export.
 *
 * Many shared hosting environments (20i StackCP, cPanel File Manager, certain zip extractors)
 * sanitize or strip square brackets [ ] from directory names during upload or extraction,
 * turning [slug] into slug and [version] into version.
 *
 * This script ensures BOTH bracketed and unbracketed directories exist in the build output,
 * guaranteeing chunks resolve regardless of whether the server or file manager preserved brackets.
 */
function duplicateBracketedDirs(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith('[') && entry.name.endsWith(']')) {
        const unbracketedName = entry.name.slice(1, -1);
        const unbracketedPath = path.join(dir, unbracketedName);
        fs.cpSync(fullPath, unbracketedPath, { recursive: true });
        console.log(`[postbuild] Created compatibility mirror: ${entry.name} -> ${unbracketedName}`);
      }
      duplicateBracketedDirs(fullPath);
    }
  }
}

const outDir = path.join(process.cwd(), 'out');
const chunksAppDir = path.join(outDir, '_next/static/chunks/app');

if (fs.existsSync(chunksAppDir)) {
  console.log('[postbuild] Mirroring bracketed chunk directories for shared hosting compatibility...');
  duplicateBracketedDirs(chunksAppDir);
}

// Ensure .nojekyll exists for GitHub Pages compatibility
const nojekyllPath = path.join(outDir, '.nojekyll');
if (!fs.existsSync(nojekyllPath)) {
  fs.writeFileSync(nojekyllPath, '# GitHub Pages\n');
  console.log('[postbuild] Created .nojekyll for GitHub Pages compatibility.');
}
