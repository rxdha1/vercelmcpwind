# MCP for Vercel and v0.dev with advanced capabilites.

## About this MCP for Vercel and v0.dev

Specifies Vercel as the deployment provider.
Enables v0.dev as a coding assistant for UI and code generation.
Allows for database provisioning (e.g., PostgreSQL, MySQL, or Vercel’s own storage).
Optionally, provides authentication and environment variable management.

Vercel Integration: The deployment provider is set to Vercel. Fill in your actual projectId, teamId, and API token (these can be generated on your Vercel dashboard).
v0.dev Integration: The AI provider is v0.dev. You’ll need an API key from your v0.dev account.
Database Setup: The configuration provisions a PostgreSQL database using Vercel’s managed Postgres (or you can swap for MySQL, PlanetScale, etc.). The connection string is referenced via an environment variable.
Features: Flags to enable auto-deployment, AI code generation, and database provisioning.
Instructions: Human-readable steps for how the MCP ould orchestrate the workflow.

Support multiple database types: PostgreSQL, MySQL, SQLite, and MongoDB, each with their own provider and environment variable for connection.
Add advanced configuration:
Secrets management for sensitive values (API keys, DB passwords, etc.).
Multi-environment support for development, staging, and production, allowing you to override environment variables and secrets per environment.
Flags to enable these features in the features section.
Provide clear placeholders and structure so you can easily fill in your actual credentials.
This configuration enables flexible deployment, secure secrets handling, and easy switching between environments. 

## MCP Configuration File
le Overview
project: Describes your project.
providers: Sets up deployment (Vercel), AI (v0.dev), and multiple database types (Postgres, MySQL, SQLite, MongoDB).
features: Enables advanced workflow features (auto-deploy, AI code generation, secrets management, multi-environment support).
secrets: Stores sensitive info (API keys, DB URLs).
environments: Lets you define dev, staging, and production settings and secrets.
instructions: Human-readable workflow steps.
mcpServers:
Defines custom MCP servers (like Puppeteer and Figma).
Specifies how to start them and their connection addresses:
Puppeteer MCP: http://localhost:4001
Figma MCP: http://localhost:4002
These ports are available and do not conflict with your local web development on port 5173.
What you can do with this file
Add/Remove Custom MCP Servers: Integrate tools for browser automation, design, etc.
Connect Cascade to Local MCPs: Cascade will use the address fields to connect to your running servers.
Switch Environments: Seamlessly move between dev/staging/prod with different secrets and DBs.
Provision Databases: Instantly connect to different DBs as needed.
Automate Deployments: Push to Vercel or other providers.
Securely Manage Secrets: Keep sensitive info out of your codebase.
Next Steps
Start your MCP servers on the assigned ports:
For Puppeteer:
npx -y @modelcontextprotocol/server-puppeteer --port 4001
For Figma:
npx figma-mcp --port 4002
In Cascade/Windsurf, use the "Refresh" option in the MCP server UI. Your servers should now appear and be connectable.
You can now orchestrate complex workflows, use AI code generation, automate deployments, and connect with external tools—all from this config!

## How to Use

need to install or run the MCP server separately.

Here’s how you can proceed to get your local MCP server running:

1. Check for a Global MCP CLI
Many MCP servers (for Windsurf/Cascade) are installed globally via npm. The most common commands are:



npx mcp-server start
or



npx windsurf-mcp start
or, if installed globally:



mcp-server start
or



windsurf-mcp start
If you get a “command not found” error, you’ll need to install it.

2. Install MCP Server (if not present)
Try installing the MCP server globally:



npm install -g windsurf-mcp
or



npm install -g mcp-server

3. Start the MCP Server
Once installed, run:


windsurf-mcp start
or

mcp-server start
This ould start your MCP server on a local port (commonly 3000 or 4000).

4. Add MCP Server to Windsurf/Cascade
Go to Windsurf Settings → Cascade → Add Server.
Enter the address, e.g. http://localhost:3000
Click Refresh.

Copy the conten in the vercelv0mcp.json with your own values for the placeholders to your mcp_config.json file usually localed in .condium/windsurf/mcp_config.json and is located in different folders in other IDE's.  The MCP configuration here works for all IDEs when placed in the right directory/file.  
```

```

### Vercel and v0.dev MCP Configuration Notes:

o fully utilize Vercel and v0.dev with your local repo in Windsurf, you need to ensure:

Vercel and v0.dev are properly configured as providers in your config (which you already have in the providers section).
You have valid API keys/tokens for both services in your secrets (and optionally per-environment).
You do NOT need to run local MCP servers for Vercel and v0.dev—these are cloud services, not local processes like Puppeteer or Figma MCP. Instead, your MCP or Cascade agent will use the API keys to connect to their APIs.
How it works in your config
Vercel:
The deployment provider uses your Vercel project and team IDs, plus your API token.
When you trigger a deploy, the MCP or Cascade agent will use these credentials to deploy your code to Vercel.
v0.dev:
The ai provider uses your v0.dev API key.
When you request code or UI generation, the MCP/Cascade agent will use this key to access v0.dev’s AI APIs.
You do not need to add an address for these cloud services in mcpServers!
Instead, just ensure your API keys and config are correct.

What you need to do
Replace the placeholders in your secrets section with your real API keys:
```json
"secrets": {
  "VERCEL_TOKEN": "<your-vercel-api-token>",
  "V0_DEV_API_KEY": "<your-v0-dev-api-key>",
  ...
}
```
You can get your Vercel API token from your Vercel dashboard.
You can get your v0.dev API key from your v0.dev account.
(Optional) Set environment-specific secrets if you want different keys for dev/staging/prod.
Make sure your providers section has the correct IDs for your Vercel project and team.

## v0.dev ai info and preview setups in MCP

hen using v0.dev as an MCP (Model Context Protocol) provider, the typical workflow for seeing changes in preview mode on their AI IDE view is as follows:

How v0.dev Preview Works
Edit or Generate Code/UI with v0.dev
You use v0.dev (via their web IDE or via integration in Windsurf/Cascade) to generate or edit code/components.
Preview Mode in v0.dev
In the v0.dev web interface, there is a “Preview” button or panel.
When you make changes (either by AI prompt or manual edit), you can click “Preview” to see a live rendering of the UI/component.
This preview is rendered in a sandboxed environment using the code/context you see in the editor.
Integration with Local Repo (Optional)
If you have connected your local repo to v0.dev (using their GitHub integration or file sync), changes made in v0.dev can be pushed to your repo, and vice versa.
If you are using Windsurf/Cascade with v0.dev as an AI provider, you can generate code locally and then push to your repo or deploy to Vercel for a full-stack preview.
Live Preview in Windsurf/Cascade
If you want to view your changes live locally (e.g., with Vite or Next.js), run your local dev server (e.g., npm run dev) and open the local preview (e.g., http://localhost:5173).
v0.dev’s preview is isolated to their UI, but you can always copy code from v0.dev to your local repo and see it live in your own browser.
Key Points
v0.dev’s “Preview” is for the code/context in their web IDE.
To see a live preview of your full app, run your local dev server and open the browser at your local port (e.g., 5173).
If you want to sync changes between v0.dev and your local repo, use their GitHub/file sync integration.
Practical Workflow
In v0.dev:
Generate/edit code → Click “Preview” to see the result in their AI IDE.
In your local repo (Windsurf):
Pull or copy the generated code into your repo.
Run your local dev server (npm run dev or similar).
Open the local preview URL (e.g., http://localhost:5173).
For full-stack preview:
Deploy to Vercel and use the Vercel preview URL.

### What the mcp_config.json file does for Cascade/Windsurf:

1. Why You Don’t See an Address Field
When you click "Add Custom Server" in Cascade settings, it takes you to this config file because Cascade expects you to define custom MCP servers here. However, the "mcpServers" section currently only specifies how to start servers (the command and args), not their addresses.

To make servers available to Cascade, you need to specify their addresses (URLs) so the IDE knows how to connect to them.

2. How to Fix the File
Add an "address" (or "url") field to each server under "mcpServers". For example:
```json
"mcpServers": {
  "puppeteer": {
    "command": "npx",
    "args": [
      "-y",
      "@modelcontextprotocol/server-puppeteer"
    ],
    "address": "http://localhost:4001"
  },
  "figma": {
    "command": "npx",
    "args": [
      "figma-mcp"
    ],
    "env": {
      "FIGMA_API_KEY": "kQb1kSFNQtXkWnlQ7AVVpQH5BqVxwP"
    },
    "address": "http://localhost:4002"
  }
}
```

Replace the ports (4001, 4002) with the actual ports your MCP servers run on.

3. What This File Does
This config file is a central control panel for your Cascade/Windsurf + MCP setup. Here’s what you can do with it:

Project Metadata: Name, description, and documentation for your project.
Providers: Set up deployment (Vercel), AI (v0.dev), and multiple database types (Postgres, MySQL, SQLite, MongoDB).
Features: Toggle auto-deploy, AI code generation, database provisioning, secrets management, and multi-environment support.
Secrets: Store API keys, DB URLs, and other sensitive data.
Environments: Define different settings for development, staging, and production (env vars and secrets).
Instructions: Human-readable steps for how Cascade/Windsurf should orchestrate your workflow.
mcpServers: Define custom MCP servers (like Puppeteer, Figma) with:
How to start them (command, args, env)
Where to connect (address/url)
4. What You Can Do With It
Add/Remove Custom MCP Servers: Integrate tools like Puppeteer (for browser automation), Figma (for design), etc.
Connect Cascade to Local/Remote MCPs: By specifying the address, Cascade can communicate with these servers.
Manage Multiple Environments: Seamlessly switch between dev/staging/prod and have different secrets/envs for each.
Provision Databases: Set up and connect to different databases as needed.
Securely Manage Secrets: Keep API keys and sensitive info out of your codebase.
Automate Deployments: Push changes to Vercel or other providers automatically.