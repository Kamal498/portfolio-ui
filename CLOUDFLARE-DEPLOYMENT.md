# Deploy React App to Cloudflare Pages

## Complete Integration Guide: React Frontend + Cloud Run Backend

---

## Prerequisites

✅ Backend deployed to Cloud Run  
✅ Backend URL available  
✅ Frontend code ready  
✅ GitHub repository created  

---

## Step 1: Update Frontend Configuration

### 1.1 Get Your Backend URL

Go to: https://console.cloud.google.com/run

Copy your backend service URL (looks like: `https://portfolio-backend-xxxxx-uc.a.run.app`)

### 1.2 Update .env.production

```bash
cd /Users/k0p0ghj/programs/personal/portfolio-website
```

Edit `.env.production`:
```env
VITE_API_BASE_URL=https://YOUR-CLOUD-RUN-URL/api
```

**Example:**
```env
VITE_API_BASE_URL=https://portfolio-backend-abc123-uc.a.run.app/api
```

**Important:** Include `/api` at the end!

---

## Step 2: Test Locally (Optional)

```bash
# Install dependencies
npm install

# Build production bundle
npm run build

# Preview production build
npm run preview
```

Open http://localhost:4173 and verify:
- Data loads from backend
- No CORS errors in console
- All pages work correctly

---

## Step 3: Push to GitHub

### 3.1 Check Current Status

```bash
git status
```

### 3.2 Commit Changes

```bash
git add .
git commit -m "Configure production backend URL for Cloudflare deployment"
git push origin main
```

**If repository doesn't exist:**

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit"

# Create repository on GitHub
# Go to: https://github.com/new

# Add remote and push
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio-website.git
git push -u origin main
```

---

## Step 4: Deploy to Cloudflare Pages

### 4.1 Login to Cloudflare

Go to: https://dash.cloudflare.com

### 4.2 Create New Pages Project

1. Navigate to: **Workers & Pages** → **Create application** → **Pages**
2. Click **"Connect to Git"**

### 4.3 Connect GitHub

1. Click **"Connect GitHub"**
2. Authorize Cloudflare to access your GitHub
3. Select repository: `portfolio-website` (or your repo name)

### 4.4 Configure Build Settings

**Project name:** `portfolio` (or your preferred name)

**Production branch:** `main`

**Framework preset:** `Vite`

**Build command:**
```bash
npm run build
```

**Build output directory:**
```
dist
```

**Root directory:** `/` (leave empty)

**Environment variables:**
Click **"Add variable"**

| Variable Name | Value |
|--------------|-------|
| `VITE_API_BASE_URL` | Your Cloud Run URL + `/api` |

**Example:**
```
VITE_API_BASE_URL = https://portfolio-backend-abc123-uc.a.run.app/api
```

### 4.5 Deploy

1. Click **"Save and Deploy"**
2. Wait 2-5 minutes for build to complete
3. You'll get a URL like: `https://portfolio.pages.dev`

---

## Step 5: Update Backend CORS

Your frontend is now deployed at a Cloudflare URL. Update your backend to allow requests from this domain.

### 5.1 Get Your Cloudflare Pages URL

After deployment, copy your site URL (e.g., `https://portfolio-abc.pages.dev`)

### 5.2 Update Backend CORS

**Option A: Via GCP Console (Recommended)**

1. Go to: https://console.cloud.google.com/run
2. Click on `portfolio-backend`
3. Click **"Edit & Deploy New Revision"**
4. Go to **"Variables & Secrets"** tab
5. Find `ALLOWED_ORIGINS` variable
6. Update value to: `https://your-site.pages.dev`
7. Click **"Deploy"**

**Option B: Via Command Line**

```bash
gcloud run services update portfolio-backend \
  --region us-central1 \
  --update-env-vars "ALLOWED_ORIGINS=https://your-site.pages.dev"
```

**For Multiple Origins (including localhost):**
```bash
gcloud run services update portfolio-backend \
  --region us-central1 \
  --update-env-vars "ALLOWED_ORIGINS=https://your-site.pages.dev,http://localhost:5173"
```

---

## Step 6: Test Your Deployed Site

### 6.1 Open Your Site

Visit your Cloudflare Pages URL: `https://your-site.pages.dev`

### 6.2 Verify Functionality

**Check these pages:**
- ✅ Home page loads
- ✅ About page shows your info
- ✅ Projects display correctly
- ✅ Skills load from database
- ✅ Experience section works
- ✅ Blog posts appear
- ✅ Contact form (if implemented)

### 6.3 Check Browser Console

Press `F12` and check:
- ✅ No CORS errors
- ✅ No 404 errors
- ✅ API calls succeed (200 status)

---

## Troubleshooting

### Issue: CORS Error

**Error in console:**
```
Access to XMLHttpRequest at 'https://...' from origin 'https://your-site.pages.dev' 
has been blocked by CORS policy
```

**Solution:**
1. Verify backend `ALLOWED_ORIGINS` includes your Cloudflare URL
2. Make sure there are no trailing slashes
3. Redeploy backend after updating

### Issue: 404 Not Found

**Error:** API endpoints return 404

**Solution:**
1. Check `.env.production` has correct backend URL
2. Verify URL includes `/api` at the end
3. Test backend directly: `curl https://your-backend-url/api/personal-info`

### Issue: Build Failed on Cloudflare

**Common causes:**
- Missing dependencies in `package.json`
- Build command incorrect
- Node version mismatch

**Solution:**
1. Go to Cloudflare Pages → Your project → **Deployment**
2. View build logs
3. Fix errors and push to GitHub (auto-redeploys)

### Issue: Environment Variable Not Working

**Problem:** API calls go to wrong URL

**Solution:**
1. In Cloudflare Pages → Your project → **Settings** → **Environment variables**
2. Verify `VITE_API_BASE_URL` is set correctly
3. **Important:** Must start with `VITE_` for Vite to include it
4. Trigger new deployment after changing

---

## Redeployment

### Automatic (Recommended)

Any push to `main` branch automatically triggers new deployment:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# Cloudflare auto-deploys in 2-5 minutes
```

### Manual

1. Go to: https://dash.cloudflare.com
2. **Workers & Pages** → Your project
3. Click **"Create deployment"**
4. Select branch and deploy

---

## Custom Domain (Optional)

### 1. Add Custom Domain

1. In Cloudflare Pages → Your project → **Custom domains**
2. Click **"Set up a custom domain"**
3. Enter your domain: `portfolio.yourdomain.com`
4. Follow DNS configuration instructions

### 2. Update Backend CORS

```bash
gcloud run services update portfolio-backend \
  --region us-central1 \
  --update-env-vars "ALLOWED_ORIGINS=https://portfolio.yourdomain.com"
```

### 3. SSL Certificate

Automatically provisioned by Cloudflare (free)

---

## Monitoring

### View Deployment History

1. Cloudflare Pages → Your project → **Deployments**
2. See all builds, status, and logs

### Analytics

1. Cloudflare Pages → Your project → **Analytics**
2. View traffic, requests, bandwidth

### Build Logs

1. Click any deployment
2. View **Build log** tab
3. Debug build issues

---

## Performance Optimization

### 1. Enable Cloudflare Cache

Already enabled by default for static assets

### 2. Use Cloudflare CDN

Your site is automatically distributed globally

### 3. Image Optimization

Use Cloudflare Image Resizing (optional, paid feature)

---

## Security

✅ **HTTPS enforced** (automatic)  
✅ **CORS properly configured**  
✅ **Environment variables secure**  
✅ **No sensitive data in frontend**  

**Additional Security:**
- Enable Cloudflare WAF (optional)
- Set up rate limiting (optional)
- Enable Bot Protection (optional)

---

## Cost

**Cloudflare Pages:**
- ✅ Unlimited bandwidth
- ✅ Unlimited requests
- ✅ 500 builds/month
- ✅ **$0/month** (free tier)

---

## Architecture Overview

```
User Browser
    ↓ HTTPS
Cloudflare Pages CDN (React App)
    ↓ API calls
Cloud Run (Spring Boot Backend)
    ↓ Unix Socket
Cloud SQL (PostgreSQL)
```

**Benefits:**
- Global CDN (fast worldwide)
- Auto-scaling backend
- Secure database connection
- Zero to minimal cost

---

## Useful Commands

```bash
# Update backend URL
cd /Users/k0p0ghj/programs/personal/portfolio-website
vim .env.production

# Rebuild locally
npm run build

# Test production build
npm run preview

# Push to trigger deployment
git add .env.production
git commit -m "Update backend URL"
git push origin main

# Update backend CORS
gcloud run services update portfolio-backend \
  --region us-central1 \
  --update-env-vars "ALLOWED_ORIGINS=https://your-new-url.pages.dev"
```

---

## Support Links

- **Cloudflare Pages Docs:** https://developers.cloudflare.com/pages
- **Vite Build Docs:** https://vitejs.dev/guide/build.html
- **Your Cloudflare Dashboard:** https://dash.cloudflare.com

---

## Summary Checklist

- [ ] Backend deployed to Cloud Run
- [ ] Backend URL copied
- [ ] `.env.production` updated with backend URL
- [ ] Code pushed to GitHub
- [ ] Cloudflare Pages project created
- [ ] Environment variables configured
- [ ] Site deployed successfully
- [ ] Backend CORS updated with Cloudflare URL
- [ ] All pages tested
- [ ] No console errors

---

**Ready to deploy? Start at Step 1!**

**Need help?** Check the troubleshooting section or deployment logs.
