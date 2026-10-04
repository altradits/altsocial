# Deployment Guide

The application is deployed on Vercel:
🌐 **Live URL:** [https://altsocial-one.vercel.app](https://altsocial-one.vercel.app)

## Automatic Deployments

This repository includes `vercel.json` and a root build script.

Whenever code is pushed to the `main` branch or a production deployment is triggered:
```bash
npx vercel --prod
```

Vercel builds using:
- **Build Command**: `npm run build --prefix frontend`
- **Output Directory**: `frontend/dist`
