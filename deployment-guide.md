# Vercel Deployment Guide

This project is optimized for a seamless deployment experience on [Vercel](https://vercel.com).

## Deployment Steps

1. **Connect Repository**: Push your code to GitHub, GitLab, or Bitbucket.
2. **Import Project**: In the Vercel Dashboard, click "New Project" and select your repository.
3. **Configure Framework**: Vercel should automatically detect **Vite** as the framework. If not, select it manually.
4. **Environment Variables**:
   - If you integrate Firebase in the future, add your `VITE_FIREBASE_*` variables here.
   - Currently, the app uses `localStorage` for data persistence, so no environment variables are strictly required for core functionality.
5. **Deploy**: Click "Deploy".

## Project Optimizations

- **Clean URLs**: Configured in `vercel.json` to remove `.html` extensions.
- **SPA Routing**: Automatic rewrites to `index.html` ensure client-side routing works perfectly.
- **Security Headers**: Includes `nosniff`, `DENY` frame options, and XSS protection.
- **Fast Image compression**: Admin dashboard automatically handles image optimization for better performance.

## Troubleshooting

- **Build Errors**: Ensure you have `npm install` run before `npm run build`.
- **Three.js Canvas**: If the canvas looks distorted on initial load, ensure the container has fixed dimensions.
