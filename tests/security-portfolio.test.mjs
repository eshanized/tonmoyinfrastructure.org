import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

test('Portfolio Economics: Security Boundary & Fake Admin Elimination', () => {
  const authFile = fs.readFileSync(
    path.join(ROOT, 'lib/portfolio-economics/auth.ts'),
    'utf8'
  );
  const dashboardView = fs.readFileSync(
    path.join(ROOT, 'components/portfolio-economics/management-dashboard-view.tsx'),
    'utf8'
  );
  const internalRoute = fs.readFileSync(
    path.join(ROOT, 'app/internal/portfolio-economics/page.tsx'),
    'utf8'
  );

  // 1. Session Security Defaults
  assert.match(authFile, /export const PUBLIC_SESSION/, 'Auth module must define PUBLIC_SESSION');
  assert.match(authFile, /role:\s*'Viewer'/, 'PUBLIC_SESSION must have Viewer role');
  assert.match(authFile, /isInternal:\s*false/, 'PUBLIC_SESSION must have isInternal = false');

  // Must not have an active DEFAULT_ADMIN_SESSION exported for public use
  assert.doesNotMatch(authFile, /export const DEFAULT_ADMIN_SESSION/, 'Must not export DEFAULT_ADMIN_SESSION as active public session');

  // 2. Removal of Client-Side Role Switcher
  assert.doesNotMatch(dashboardView, /<select[^>]*onChange=\{[^}]*setRole/i, 'Dashboard must not have client-side role selector dropdown');
  assert.doesNotMatch(dashboardView, /Switch Role/i, 'Dashboard must not display Switch Role control');

  // 3. Production Static Security Gate
  assert.match(dashboardView, /Console Restricted|Access Restricted|SECURITY BOUNDARY ENFORCED/, 'Dashboard view must enforce restricted barrier');
  assert.match(dashboardView, /\/transparency\/financials/, 'Restricted barrier must link to public transparency portal');

  // 4. Internal Route Demarcation
  assert.match(internalRoute, /noIndex:\s*true/, 'Internal route must enforce noIndex');
  assert.match(internalRoute, /ManagementDashboardView/, 'Internal route must mount ManagementDashboardView');
});
