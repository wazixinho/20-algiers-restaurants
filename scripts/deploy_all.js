import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const restaurants = JSON.parse(fs.readFileSync(path.join(rootDir, 'restaurants_data.json'), 'utf-8'));
const manifestPath = path.join(rootDir, 'deployment_manifest.json');

// Get git commit SHA
let commitSha = '';
try {
  commitSha = execSync('git rev-parse HEAD', { cwd: rootDir, encoding: 'utf-8' }).trim();
} catch (e) {
  commitSha = 'UNKNOWN';
}

// Load existing manifest if present to resume or retain
let manifest = [];
if (fs.existsSync(manifestPath)) {
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  } catch (e) {
    manifest = [];
  }
}

function saveManifest() {
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
}

console.log(`Starting Vercel Deployment Suite for ${restaurants.length} restaurants...`);
console.log(`Git Commit SHA: ${commitSha}\n`);

const vercelToken = process.env.VERCEL_TOKEN;

for (let i = 0; i < restaurants.length; i++) {
  const r = restaurants[i];
  const slug = r.id;
  const appDir = path.join(rootDir, 'apps', slug);

  // Check if already successfully deployed
  const existing = manifest.find(m => m.slug === slug && m.build_status === 'SUCCESS' && m.live_url);
  if (existing) {
    console.log(`[${i + 1}/${restaurants.length}] ${slug} (${r.name}): Already deployed -> ${existing.live_url}`);
    continue;
  }

  console.log(`[${i + 1}/${restaurants.length}] Deploying ${slug} (${r.name})...`);

  let attempts = 0;
  let success = false;
  let liveUrl = null;
  let errorMsg = null;

  try {
    fs.rmSync(path.join(rootDir, '.vercel'), { recursive: true, force: true });
  } catch (_) {}

  while (attempts < 2 && !success) {
    attempts++;
    try {
      let cmd = '';
      if (vercelToken) {
        cmd = `npx vercel --prod --yes --name "restaurant-${slug}" -e ADMIN_USER=admin -e ADMIN_PASS=admin123! --token ${vercelToken}`;
      } else {
        cmd = `npx vercel deploy --temporary --name "restaurant-${slug}" --yes -e ADMIN_USER=admin -e ADMIN_PASS=admin123!`;
      }

      const output = execSync(cmd, {
        cwd: rootDir,
        encoding: 'utf-8',
        stdio: 'pipe',
        timeout: 150000
      });

      // Try parsing JSON block or regex match URL
      const urlMatch = output.match(/https:\/\/[a-zA-Z0-9\-_.]+\.vercel\.app/g);
      if (urlMatch && urlMatch.length > 0) {
        // Find the valid production or temporary url (exclude api.vercel.com)
        const candidates = urlMatch.filter(u => !u.includes('api.vercel.com'));
        liveUrl = candidates[candidates.length - 1] || candidates[0];
        success = true;
      } else {
        // Check if json exists in output
        const jsonMatch = output.match(/\{[\s\S]*"status":\s*"ok"[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          liveUrl = parsed.deployment?.url || parsed.url;
          if (liveUrl && !liveUrl.startsWith('http')) {
            liveUrl = `https://${liveUrl}`;
          }
          success = true;
        }
      }

      if (!success) {
        throw new Error(`Deployment succeeded but could not extract Vercel URL. Raw output:\n${output.slice(-500)}`);
      }

      console.log(`  ✓ SUCCESS (attempt ${attempts}): ${liveUrl}`);
    } catch (err) {
      errorMsg = err.stderr || err.stdout || err.message;
      console.warn(`  ✗ Attempt ${attempts} failed: ${err.message.split('\n')[0]}`);
      if (attempts < 2) {
        console.log(`  Retrying deployment for ${slug}...`);
        try { execSync('powershell -Command "Start-Sleep -Seconds 5"'); } catch (_) {}
      }
    }
  }

  // Update or append to manifest
  const recordIndex = manifest.findIndex(m => m.slug === slug);
  const record = {
    slug,
    restaurant_name: r.name,
    build_status: success ? 'SUCCESS' : 'FAILED',
    commit_sha: commitSha,
    live_url: liveUrl || null,
    deployed_at: new Date().toISOString(),
    ...(errorMsg && !success ? { error: errorMsg.slice(-500) } : {})
  };

  if (recordIndex >= 0) {
    manifest[recordIndex] = record;
  } else {
    manifest.push(record);
  }

  saveManifest();

  // Gentle delay between deployments to prevent anonymous API throttling
  try {
    execSync('powershell -Command "Start-Sleep -Seconds 4"');
  } catch (_) {}
}

console.log('\n========================================');
console.log('DEPLOYMENT COMPLETE: MANIFEST SUMMARY');
console.log('========================================');
const deployedCount = manifest.filter(m => m.build_status === 'SUCCESS').length;
console.log(`Total Deployed: ${deployedCount}/${restaurants.length}`);
console.log(`Manifest written to: ${manifestPath}\n`);
