import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const restaurants = JSON.parse(fs.readFileSync(path.join(rootDir, 'restaurants_data.json'), 'utf-8'));
const token = process.argv[2];

if (!token) {
  console.error("Please provide Vercel token as argument.");
  process.exit(1);
}

const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
};

async function createOrUpdateProject(slug, name) {
  const projectName = `restaurant-${slug}`;
  console.log(`\nProcessing ${projectName}...`);

  const payload = {
    name: projectName,
    framework: "vite",
    rootDirectory: `apps/${slug}`,
    gitRepository: {
      repo: "wazixinho/20-algiers-restaurants",
      type: "github"
    },
    environmentVariables: [
      {
        key: "ADMIN_USER",
        value: "admin",
        type: "plain",
        target: ["production", "preview", "development"]
      },
      {
        key: "ADMIN_PASS",
        value: "admin123!",
        type: "plain",
        target: ["production", "preview", "development"]
      }
    ]
  };

  try {
    // Attempt to create
    let res = await fetch('https://api.vercel.com/v9/projects', {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });

    let data = await res.json();

    if (res.status === 409) {
      console.log(`Project ${projectName} already exists. Updating...`);
      // Update existing project
      res = await fetch(`https://api.vercel.com/v9/projects/${projectName}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          framework: "vite",
          rootDirectory: `apps/${slug}`,
          gitRepository: {
            repo: "wazixinho/20-algiers-restaurants",
            type: "github"
          }
        })
      });
      data = await res.json();
      
      // Update environment variables for existing project
      for (const envVar of payload.environmentVariables) {
        await fetch(`https://api.vercel.com/v9/projects/${projectName}/env`, {
          method: 'POST',
          headers,
          body: JSON.stringify(envVar)
        });
      }
    }

    if (!res.ok && res.status !== 409) {
      console.error(`Failed for ${projectName}:`, data);
      return false;
    }

    console.log(`✅ Success for ${projectName}. Project linked to Github.`);
    return true;
  } catch (error) {
    console.error(`❌ Error for ${projectName}:`, error);
    return false;
  }
}

async function main() {
  console.log(`Starting Vercel GitHub Linking for ${restaurants.length} projects...`);
  
  let successCount = 0;
  for (const r of restaurants) {
    const success = await createOrUpdateProject(r.id, r.name);
    if (success) successCount++;
    // Sleep a bit to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log(`\n🎉 Completed! Successfully configured ${successCount}/${restaurants.length} projects.`);
}

main();
