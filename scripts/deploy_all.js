import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const setTimeoutAsync = promisify(setTimeout);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const restaurants = JSON.parse(fs.readFileSync(path.join(rootDir, 'restaurants_data.json'), 'utf-8'));
const manifestPath = path.join(rootDir, 'deployment_manifest.json');

// Get git commit SHA
let commitSha = '';
try {
  const { stdout } = await execAsync('git rev-parse HEAD', { cwd: rootDir, encoding: 'utf-8' });
  commitSha = stdout.trim();
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
const adminUser = process.env.ADMIN_USER || 'admin';
// Require ADMIN_PASS to be set in environment variables to avoid hardcoding secrets
if (!process.env.ADMIN_PASS) {
  console.warn("⚠️ WARNING: ADMIN_PASS is not set in environment variables. Deployments will not have a secure password set.");
}
const adminPassArg = process.env.ADMIN_PASS ? `-e ADMIN_PASS=${process.env.ADMIN_PASS}` : '';

const CONCURRENCY_LIMIT = 2; // Keep it low to avoid Vercel API rate limits

async function deployApp(r, i) {
  const slug = r.id;
  
  // Check if already successfully deployed
  const existing = manifest.find(m => m.slug === slug && m.build_status === 'SUCCESS' && m.live_url);
  if (existing) {
    console.log(`[${i + 1}/${restaurants.length}] ${slug} (${r.name}): Already deployed -> ${existing.live_url}`);
    return;
  }

  console.log(`[${i + 1}/${restaurants.length}] Deploying ${slug} (${r.name})...`);

  let attempts = 0;
  let success = false;
  let liveUrl = null;
  let errorMsg = null;

  try {
    fs.rmSync(path.join(rootDir, '.vercel'), { recursive: true, force: true });
  } catch (_) {}

  while (attempts < 3 && !success) {
    attempts++;
    try {
      let cmd = '';
      if (vercelToken) {
        cmd = `npx vercel --prod --yes --name "restaurant-${slug}" -e ADMIN_USER=${adminUser} ${adminPassArg} --token ${vercelToken}`;
      } else {
        cmd = `npx vercel deploy --temporary --name "restaurant-${slug}" --yes -e ADMIN_USER=${adminUser} ${adminPassArg}`;
      }

      const { stdout } = await execAsync(cmd, {
        cwd: rootDir,
        encoding: 'utf-8',
        timeout: 150000
      });

      // Try parsing JSON block or regex match URL
      // More robust Regex for matching URLs safely
      const urlMatch = stdout.match(/https:\/\/[a-zA-Z0-9\-_.]+vercel\.app/g);
      if (urlMatch && urlMatch.length > 0) {
        // Find the valid production or temporary url (exclude api.vercel.com)
        const candidates = urlMatch.filter(u => !u.includes('api.vercel.com'));
        liveUrl = candidates[candidates.length - 1] || candidates[0];
        success = true;
      } else {
        // Check if json exists in output
        const jsonMatch = stdout.match(/\{[\s\S]*"status":\s*"ok"[\s\S]*\}/);
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
        throw new Error(`Deployment succeeded but could not extract Vercel URL. Raw output:\n${stdout.slice(-500)}`);
      }

      console.log(`  ✓ SUCCESS (attempt ${attempts}): ${liveUrl}`);
    } catch (err) {
      errorMsg = err.stderr || err.stdout || err.message;
      
      // If error message indicates rate limiting (429), use exponential backoff
      const isRateLimited = errorMsg.includes('429') || errorMsg.toLowerCase().includes('too many requests');
      const waitTime = isRateLimited ? 10000 * attempts : 5000;
      
      console.warn(`  ✗ Attempt ${attempts} failed: ${err.message.split('\n')[0]}`);
      
      if (attempts < 3) {
        console.log(`  Retrying deployment for ${slug} in ${waitTime/1000}s...`);
        await setTimeoutAsync(waitTime);
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
  await setTimeoutAsync(4000);
}

async function runAllDeployments() {
  for (let i = 0; i < restaurants.length; i += CONCURRENCY_LIMIT) {
    const chunk = restaurants.slice(i, i + CONCURRENCY_LIMIT);
    const promises = chunk.map((r, index) => deployApp(r, i + index));
    await Promise.all(promises);
  }

  console.log('\n========================================');
  console.log('DEPLOYMENT COMPLETE: MANIFEST SUMMARY');
  console.log('========================================');
  const deployedCount = manifest.filter(m => m.build_status === 'SUCCESS').length;
  console.log(`Total Deployed: ${deployedCount}/${restaurants.length}`);
  console.log(`Manifest written to: ${manifestPath}\n`);
}

runAllDeployments().catch(console.error);
