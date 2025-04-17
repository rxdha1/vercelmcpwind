#!/usr/bin/env node
// Interactive CLI for sending prompts to Vercel v0 via MCP
// Best practices: single process, graceful stop, preview, prompt loop

const readline = require('readline');
const open = require('open');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// ---- REAL MCP/V0 INTEGRATION ---- //
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const VERCEL_DEPLOY_HOOK = process.env.VERCEL_DEPLOY_HOOK;
const COMPONENT_OUTPUT_PATH = process.env.COMPONENT_OUTPUT_PATH || path.resolve(__dirname, '../src/components/GeneratedComponent.jsx');
const VERCEL_PREVIEW_URL = process.env.VERCEL_PREVIEW_URL || 'https://your-vercel-preview-url.vercel.app';

async function sendPromptToV0(prompt) {
    if (!prompt) throw new Error('Prompt is required');
    if (!VERCEL_TOKEN) throw new Error('VERCEL_TOKEN missing in .env');
    console.log(`Sending prompt to v0: "${prompt}" ...`);
    // 1. Send prompt to v0.dev API
    const res = await fetch('https://api.v0.dev/generate', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${VERCEL_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
    });
    if (!res.ok) throw new Error(`v0.dev error: ${res.status} ${await res.text()}`);
    const data = await res.json();
    const code = data.code || data.result || '';
    if (!code) throw new Error('No code returned from v0.dev');

    // 2. Save code to output file
    fs.writeFileSync(COMPONENT_OUTPUT_PATH, code, 'utf8');
    console.log(`Generated code saved to ${COMPONENT_OUTPUT_PATH}`);

    // 3. Return preview URL (user must set VERCEL_PREVIEW_URL in .env)
    return VERCEL_PREVIEW_URL;
}

async function deployToVercel() {
    if (!VERCEL_DEPLOY_HOOK) {
        console.warn('No VERCEL_DEPLOY_HOOK set, cannot deploy.');
        return false;
    }
    const deployRes = await fetch(VERCEL_DEPLOY_HOOK, { method: 'POST' });
    if (!deployRes.ok) throw new Error(`Vercel deploy error: ${deployRes.status} ${await deployRes.text()}`);
    console.log('Vercel deploy triggered!');
    // Wait for a bit to allow deploy to complete (adjust as needed)
    await new Promise(res => setTimeout(res, 8000));
    return true;
}

// ---- END REAL MCP/V0 INTEGRATION ---- //

function startPromptLoop() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Type your v0 prompt (or 'stop' to exit):\n> "
    });

    let running = false;
    let lastPreviewUrl = null;
    let lastPrompt = null;

    rl.prompt();

    rl.on('line', async (line) => {
        const input = line.trim();
        if (input.toLowerCase() === 'preview') {
            if (!lastPreviewUrl) {
                console.log('No preview available yet. Please enter a prompt first.');
            } else {
                console.log(`[Preview available at ${lastPreviewUrl}]`);
                try {
                    await open(lastPreviewUrl);
                } catch (e) {
                    console.log('(Could not open browser automatically.)');
                }
            }
            rl.prompt();
            return;
        }
        if (input.toLowerCase() === 'stop') {
            if (running) {
                console.log('Stopping v0 process...');
                running = false;
            }
            rl.close();
            return;
        }
        if (input.toLowerCase() === 'deploy') {
            if (running) {
                console.log('A process is already running. Please wait.');
                rl.prompt();
                return;
            }
            if (!lastPrompt) {
                console.log('No prompt/code generated yet. Please enter a prompt first.');
                rl.prompt();
                return;
            }
            running = true;
            try {
                const deployed = await deployToVercel();
                if (deployed && lastPreviewUrl) {
                    console.log(`\n[Deployed! Preview available at ${lastPreviewUrl}]`);
                    try {
                        await open(lastPreviewUrl);
                    } catch (e) {
                        console.log('(Could not open browser automatically.)');
                    }
                }
            } catch (err) {
                console.error('Error deploying to Vercel:', err);
            }
            running = false;
            rl.prompt();
            return;
        }
        if (input === '') {
            rl.prompt();
            return;
        }
        if (running) {
            console.log('A prompt is already running. Please wait for it to finish or type "stop" to exit.');
            rl.prompt();
            return;
        }
        running = true;
        try {
            lastPrompt = input;
            const previewUrl = await sendPromptToV0(input);
            lastPreviewUrl = previewUrl;
            console.log(`\n[Preview available at ${previewUrl}]`);
            try {
                await open(previewUrl);
            } catch (e) {
                console.log('(Could not open browser automatically.)');
            }
            console.log("Type 'preview' to open the preview, 'deploy' to deploy to Vercel, another prompt for v0, or 'stop' to exit:");
        } catch (err) {
            console.error('Error communicating with v0:', err);
        }
        running = false;
        rl.prompt();
    });

    rl.on('close', () => {
        console.log('Goodbye!');
        process.exit(0);
    });
}

startPromptLoop();
