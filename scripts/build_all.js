import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const restaurants = JSON.parse(fs.readFileSync(path.join(rootDir, 'restaurants_data.json'), 'utf-8'));

console.log(`Starting automated verification and build for all ${restaurants.length} restaurant web applications...\\n`);

const results = [];

for (let i = 0; i < restaurants.length; i++) {
  const r = restaurants[i];
  const slug = r.id;
  const appDir = path.join(rootDir, 'apps', slug);

  process.stdout.write(`[${i + 1}/${restaurants.length}] Building ${slug} (${r.name})... `);
  const startTime = Date.now();

  try {
    const output = execSync('npx vite build', {
      cwd: appDir,
      stdio: 'pipe',
      encoding: 'utf-8'
    });

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`✓ SUCCESS (${elapsed}s)`);
    results.push({ slug, name: r.name, success: true, time: elapsed });
  } catch (err) {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`✗ FAILED (${elapsed}s)`);
    console.error(err.stderr || err.stdout || err.message);
    results.push({ slug, name: r.name, success: false, error: err.message });
  }
}

console.log('\\n========================================');
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
console.log(`\\nTotal Passed: ${passed}/${restaurants.length}`);
if (passed === restaurants.length) {
  console.log('ALL RESTAURANT APPLICATIONS BUILT AND VALIDATED WITH ZERO ERRORS!');
  process.exit(0);
} else {
  console.error('Some builds failed.');
  process.exit(1);
}
