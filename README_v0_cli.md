# Vercel v0 Interactive CLI

This CLI tool lets you interactively generate, preview, and deploy UI components using [Vercel v0](https://v0.dev/) and your MCP setup.

---

## Features
- **Prompt v0**: Type natural language prompts to generate UI code with Vercel v0.
- **Preview**: Instantly open the latest preview URL in your browser, as often as you want.
- **Deploy**: Deploy the generated UI to Vercel only when you choose.
- **Interactive**: Continue prompting, previewing, or deploying in a single session.
- **Safe**: No auto-deploys; you control when to deploy.

---

## Setup

1. **Install dependencies**
   ```sh
   npm install open node-fetch
   ```

2. **Configure your `.env` file** (in the project root):
   ```env
   V0_DEV_API_KEY=your-v0-dev-api-key
   VERCEL_DEPLOY_HOOK=https://api.vercel.com/v1/integrations/deploy/prj_xxx/xxx
   COMPONENT_OUTPUT_PATH=absolute/path/to/your/GeneratedComponent.jsx
   VERCEL_PREVIEW_URL=https://your-vercel-preview-url.vercel.app
   ```
   - `V0_DEV_API_KEY`: Your API key for v0.dev
   - `VERCEL_DEPLOY_HOOK`: (Optional) Vercel deploy webhook URL
   - `COMPONENT_OUTPUT_PATH`: Where to save generated code
   - `VERCEL_PREVIEW_URL`: The live preview URL for your Vercel site

3. **Run the CLI**
   ```sh
   node scripts/v0_prompt_cli.js
   ```

---

## Usage & Options

After each prompt, you can type:
- **Another prompt**: Generate new UI code with v0
- **preview**: Open the latest preview URL in your browser (repeatable)
- **deploy**: Deploy the latest generated code to Vercel (only when you want)
- **stop**: Exit the CLI

### Example Session
```
Type your v0 prompt (or 'stop' to exit):
> Make the button blue
[Preview available at https://your-vercel-preview-url.vercel.app]
Type 'preview' to open the preview, 'deploy' to deploy to Vercel, another prompt for v0, or 'stop' to exit:
> preview
[Preview available at https://your-vercel-preview-url.vercel.app]
> deploy
[Deployed! Preview available at https://your-vercel-preview-url.vercel.app]
> stop
Goodbye!
```

---

## Best Practices
- **No auto-deploys**: Deploy only when ready.
- **Preview anytime**: Use `preview` to open the latest preview as often as needed.
- **Prompt safely**: Each prompt overwrites the previous generated code.
- **.env secrets**: Never commit your `.env` file to version control.

---

## Troubleshooting
- **Missing packages**: Run `npm install open node-fetch` if you see module errors.
- **API key errors**: Ensure your `.env` is filled out and valid.
- **Preview not updating**: Wait for Vercel to finish deploying after `deploy`.
- **No preview URL**: Set `VERCEL_PREVIEW_URL` in your `.env` to your Vercel site.

---

## How It Works
- Prompts are sent to v0.dev via API.
- Generated code is saved to your component path.
- Deploy is triggered via Vercel webhook only when you type `deploy`.
- Preview URL is opened in your browser using the `open` package.

---

## Customization
- Edit `scripts/v0_prompt_cli.js` to change output paths, add logging, or extend functionality.
- You can further automate deploy status checks or add more CLI options as needed.

---

## Credits
- Built for interactive UI prototyping with [Vercel v0](https://v0.dev/) and MCP.
- Maintained by Operate.fun
