# Deploy Frontend to Cloudflare Pages

## Prerequisites
- GitHub account
- Cloudflare account (free tier)
- Push your code to GitHub repository

## Deployment Steps

### 1. Push to GitHub
```bash
cd /Users/k0p0ghj/programs/personal/portfolio-website
git add .
git commit -m "Prepare for Cloudflare deployment"
git push origin main
```

### 2. Connect to Cloudflare Pages

1. Go to https://dash.cloudflare.com
2. Navigate to **Workers & Pages** → **Create application** → **Pages**
3. Connect your GitHub account
4. Select your `portfolio-website` repository
5. Configure build settings:
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (leave empty)
   - **Node version**: 18 or higher

### 3. Add Environment Variables

In Cloudflare Pages settings, add:
```
VITE_API_BASE_URL = https://portfolio-backend-xxxxx-uc.a.run.app/api
```
(Replace with your actual Cloud Run backend URL)

### 4. Deploy

Click **Save and Deploy** - Cloudflare will:
- Build your React app
- Deploy to global CDN
- Provide URL: `your-portfolio.pages.dev`

### 5. Update Backend CORS

After deployment, update your backend's ALLOWED_ORIGINS:
```bash
gcloud run services update portfolio-backend \
  --region us-central1 \
  --set-env-vars "ALLOWED_ORIGINS=https://your-portfolio.pages.dev"
```

## Custom Domain (Optional)

1. In Cloudflare Pages → **Custom domains**
2. Add your domain (e.g., `portfolio.yourdomain.com`)
3. Follow DNS configuration instructions
4. SSL automatically configured by Cloudflare

## Redeployment

Any push to `main` branch automatically triggers new deployment.
