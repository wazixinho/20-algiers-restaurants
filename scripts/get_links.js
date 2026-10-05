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
  'Authorization': `Bearer ${token}`
};

async function getLinks() {
  for (const r of restaurants) {
    const slug = r.id;
    const projectName = `restaurant-${slug}`;
    try {
      const res = await fetch(`https://api.vercel.com/v9/projects/${projectName}`, { headers });
      const data = await res.json();
      
      let liveUrl = null;
      if (data.targets && data.targets.production) {
        liveUrl = 'https://' + data.targets.production.url;
      } else if (data.latestDeployments && data.latestDeployments.length > 0) {
        liveUrl = 'https://' + data.latestDeployments[0].url;
      } else {
        // Fallback guess if it hasn't finished deploying yet
        liveUrl = `https://${projectName}.vercel.app (Deploying...)`;
      }
      
      console.log(`- **${r.name}**: ${liveUrl}`);
    } catch (e) {
      console.log(`- **${r.name}**: https://${projectName}.vercel.app`);
    }
  }
}

getLinks();
