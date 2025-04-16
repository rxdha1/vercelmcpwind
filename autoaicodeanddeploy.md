run the script:
// Usage: node scripts/codegen_and_deploy.js "<your prompt>"

.env file in the project root:

env
bash```
V0_DEV_API_KEY=your-v0-dev-api-key
VERCEL_DEPLOY_HOOK=[https://api.vercel.com/v1/integrations/deploy/<your-hook-id>](https://api.vercel.com/v1/integrations/deploy/<your-hook-id>)
COMPONENT_OUTPUT_PATH=src/components/GeneratedComponent.jsx
V0_DEV_API_KEY: Your v0.dev API key.
VERCEL_DEPLOY_HOOK: Your Vercel deploy hook URL (get this from your Vercel dashboard under project settings > Git > Deploy Hooks).
COMPONENT_OUTPUT_PATH: Where the generated code will be saved (you can change this path if you want).
```
```
How to Use Your New Automation
Set up your .env file with the above variables and your real keys/URLs.
Run automated codegen + deploy:


node scripts/codegen_and_deploy.js "Create a React component for a login form"
This will:
Call v0.dev to generate code from your prompt.
Save the code to your chosen component file.
Trigger a Vercel deployment.
Check your Vercel dashboard for the new deployment and see the generated component in your app!