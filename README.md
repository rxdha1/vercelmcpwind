# MCP for Vercel and v0.dev with advanced capabilites.

## About this MCP for Vercel and v0

Specifies Vercel as the deployment provider.
Enables v0.dev as a coding assistant for UI and code generation.
Allows for database provisioning (e.g., PostgreSQL, MySQL, or Vercel’s own storage).
Optionally, provides authentication and environment variable management.

Vercel Integration: The deployment provider is set to Vercel. Fill in your actual projectId, teamId, and API token (these can be generated on your Vercel daboard).
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