<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1M8QV606ReTEb7X-mU93vuKbnUoa4Izms

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Cloudflare Pages

To create a public link for sharing with stakeholders via Cloudflare Pages:

1. Push this code to a GitHub repository
2. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. Navigate to Pages and click "Create a project"
4. Connect your GitHub repository
5. Configure the build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
6. Click "Save and Deploy"

Once deployed, you'll receive a public URL in the format `https://your-project-name.pages.dev` that you can share with stakeholders.

For detailed instructions, see [cloudflare-deployment.md](./cloudflare-deployment.md).
