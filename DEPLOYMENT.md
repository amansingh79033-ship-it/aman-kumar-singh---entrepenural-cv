# Deploying to Vercel

This application is optimized for deployment on Vercel.

## Prerequisites

1. A Vercel account ([sign up here](https://vercel.com/signup))
2. Vercel CLI installed (optional): `npm i -g vercel`

## Environment Variables

Before deploying, set up these environment variables in your Vercel project:

### Required

- `GEMINI_API_KEY` - Your Google Gemini API key for AI features

### Auto-configured by Vercel

- `POSTGRES_URL` - Vercel Postgres connection string (if using Vercel Postgres)
- `VERCEL_OIDC_TOKEN` - Auto-generated authentication token

## Deployment Methods

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Add New Project"
4. Import your repository
5. Configure environment variables
6. Click "Deploy"

### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

## Build Configuration

The app uses the following build settings (configured in `vercel.json`):

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Framework**: Vite
- **Functions Runtime**: Edge (for `/api` routes)

## Post-Deployment

After deployment:

1. **Set up Vercel Postgres** (if using database features):
   - Go to your project in Vercel Dashboard
   - Navigate to "Storage" tab
   - Create a new Postgres database
   - Environment variables will be auto-configured

2. **Initialize Database**:
   - Visit `https://your-domain.vercel.app/api/init-db`
   - This will create necessary tables

3. **Verify Deployment**:
   - Check that the site loads correctly
   - Test audio playback features
   - Verify admin dashboard access

## Troubleshooting

### Build Fails

- Check build logs in Vercel Dashboard
- Ensure all dependencies are in `package.json`
- Verify TypeScript compilation: `npx tsc --noEmit`

### API Routes Not Working

- Verify serverless functions are in `/api` directory
- Check function logs in Vercel Dashboard
- Ensure environment variables are set

### Database Connection Issues

- Verify Vercel Postgres is set up
- Check that environment variables are configured
- Run `/api/init-db` to initialize tables

## Performance Optimization

The app includes:

- Code splitting for optimal loading
- Asset caching (1 year for immutable assets)
- Edge runtime for API functions
- Minified and optimized build output

## Security Headers

Configured security headers:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

## Support

For deployment issues, check:

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
