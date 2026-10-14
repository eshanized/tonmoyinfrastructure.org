import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

test('Status Dashboard & Telemetry Truthfulness', () => {
  const statusDash = fs.readFileSync(
    path.join(ROOT, 'components/status/live-status-dashboard.tsx'),
    'utf8'
  );
  const fleetMetrics = fs.readFileSync(
    path.join(ROOT, 'components/solutions/fleet-metrics.tsx'),
    'utf8'
  );
  const statusPage = fs.readFileSync(
    path.join(ROOT, 'app/status/page.tsx'),
    'utf8'
  );

  // 1. Strict Prohibition of Simulated Jitter and Telemetry
  assert.doesNotMatch(statusDash, /Math\.sin/, 'Status dashboard must not generate simulated values using Math.sin');
  assert.doesNotMatch(statusDash, /Math\.cos/, 'Status dashboard must not generate simulated values using Math.cos');
  assert.doesNotMatch(statusDash, /Math\.random/, 'Status dashboard must not fabricate values using Math.random');
  assert.doesNotMatch(statusDash, /setInterval/, 'Status dashboard must not run fake polling timers without live backend');
  assert.doesNotMatch(statusDash, /90-day Uptime/, 'Status dashboard must not present fake 90-day 100% uptime bar chart');

  // 2. Authoritative Facility Ground Truth
  assert.match(statusDash, /Jayapura Sovereign Facility/, 'Status dashboard must feature confirmed Jayapura sovereign facility');
  assert.match(statusDash, /Confirmed Physical Facility \(Operational\)/, 'Status must accurately reflect operational facility');
  assert.match(statusDash, /hosts TIV internal infrastructure/, 'Must clarify facility hosts internal infrastructure');
  assert.match(statusDash, /No public colocation/i, 'Commercial scope must explicitly clarify no public colocation');
  assert.match(statusDash, /Dedicated Capacity/i, 'Commercial scope must state private inquiry availability');

  // 3. Fleet Metrics Verification
  assert.doesNotMatch(fleetMetrics, /Continuous Telemetry/i, 'Fleet metrics must not claim continuous live telemetry');
  assert.match(fleetMetrics, /totalStorage\s*:\s*120/, 'Fleet metrics storage must reflect verified Jayapura pool');
  assert.match(fleetMetrics, /STORAGE POOL/, 'Fleet metrics must define storage pool metric');
  assert.match(fleetMetrics, /2N \+ N\+1/, 'Power infrastructure must reflect verified 2N setup');

  // 4. Status Page Metadata & Structure
  assert.match(statusPage, /System Health & Operational Status/, 'Status page must be titled truthfully');
  assert.doesNotMatch(statusPage, /Live Global Fleet Telemetry/i, 'Must not claim live global fleet telemetry');
});
