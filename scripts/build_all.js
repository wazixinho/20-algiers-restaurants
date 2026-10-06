import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const restaurants = JSON.parse(fs.readFileSync(path.join(rootDir, 'restaurants_data.json'), 'utf-8'));

console.log(`Starting automated verification and build for all ${restaurants.length} restaurant web applications...\n`);

const results = [];
const CONCURRENCY_LIMIT = 4; // Build 4 apps in parallel

async function buildApp(r, i) {
  const slug = r.id;
  const appDir = path.join(rootDir, 'apps', slug);

  console.log(`[${i + 1}/${restaurants.length}] Building ${slug} (${r.name})...`);
  const startTime = Date.now();

  try {
    await execAsync('npx vite build', {
      cwd: appDir,
      encoding: 'utf-8'
    });

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`✓ SUCCESS: ${slug} (${elapsed}s)`);
    results.push({ slug, name: r.name, success: true, time: elapsed });
  } catch (err) {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`✗ FAILED: ${slug} (${elapsed}s)`);
    console.error(`Error in ${slug}:`, err.stderr || err.stdout || err.message);
    results.push({ slug, name: r.name, success: false, error: err.message });
  }
}

async function runAll() {
  for (let i = 0; i < restaurants.length; i += CONCURRENCY_LIMIT) {
    const chunk = restaurants.slice(i, i + CONCURRENCY_LIMIT);
    const promises = chunk.map((r, index) => buildApp(r, i + index));
    await Promise.all(promises);
  }

  console.log('\n========================================');
  console.log('BUILD VERIFICATION REPORT:');
  console.log('========================================');
  let passed = 0;
  for (const res of results) {
    if (res.success) {
      passed++;
      console.log(`✓ ${res.slug.padEnd(25)} : BUILD PASSED (${res.time}s)`);
    } else {
      console.log(`✗ ${res.slug.padEnd(25)} : BUILD FAILED`);
    }
  }
  console.log(`\nTotal Passed: ${passed}/${restaurants.length}`);
  if (passed === restaurants.length) {
    console.log('ALL RESTAURANT APPLICATIONS BUILT AND VALIDATED WITH ZERO ERRORS!');
    process.exit(0);
  } else {
    console.error('Some builds failed.');
    process.exit(1);
  }
}

runAll();
