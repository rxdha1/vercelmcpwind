// Automated v0.dev codegen + Vercel deploy script
// Usage: node scripts/codegen_and_deploy.js "<your prompt>"

const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

// Load secrets from environment or fallback to .env
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const V0_DEV_API_KEY = process.env.V0_DEV_API_KEY;
const VERCEL_DEPLOY_HOOK = process.env.VERCEL_DEPLOY_HOOK;
const COMPONENT_OUTPUT_PATH = process.env.COMPONENT_OUTPUT_PATH || path.resolve(__dirname, '../src/components/GeneratedComponent.jsx');

const prompt = process.argv.slice(2).join(' ');
if (!prompt) {
  console.error('Usage: node scripts/codegen_and_deploy.js "<your prompt>"');
  process.exit(1);
}

async function generateCode() {
  const res = await fetch('https://api.v0.dev/generate', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${V0_DEV_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt })
  });
  if (!res.ok) throw new Error(`v0.dev error: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return data.code || data.result || '';
}

async function saveCode(code) {
  fs.writeFileSync(COMPONENT_OUTPUT_PATH, code, 'utf8');
  console.log(`Generated code saved to ${COMPONENT_OUTPUT_PATH}`);
}

async function triggerVercelDeploy() {
  if (!VERCEL_DEPLOY_HOOK) {
    console.warn('No VERCEL_DEPLOY_HOOK set, skipping deploy.');
    return;
  }
  const res = await fetch(VERCEL_DEPLOY_HOOK, { method: 'POST' });
  if (!res.ok) throw new Error(`Vercel deploy error: ${res.status} ${await res.text()}`);
  console.log('Vercel deploy triggered!');
}

(async () => {
  try {
    const code = await generateCode();
    await saveCode(code);
    await triggerVercelDeploy();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
