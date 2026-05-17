# IntelliDocs AI - Deployment Guide

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development](#local-development)
3. [Backend Deployment](#backend-deployment-render)
4. [Frontend Deployment](#frontend-deployment-vercel)
5. [Configuration Checklist](#configuration-checklist)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:

### Accounts & Services

- [ ] GitHub account with repository access
- [ ] MongoDB Atlas account (free tier available)
- [ ] Google Cloud project with Generative AI API enabled
- [ ] Render account (https://render.com)
- [ ] Vercel account (https://vercel.com)
- [ ] Auth0 account (https://auth0.com)

### API Keys

1. **Google Generative AI API Key**
   - Visit: https://makersuite.google.com/app/apikey
   - Create new API key
   - Copy and save securely

2. **MongoDB Connection String**
   - Create cluster on MongoDB Atlas
   - Create database user
   - Get connection string: `mongodb+srv://user:password@cluster.mongodb.net/dbname`

3. **Auth0 Configuration**
   - Create application in Auth0
   - Get Domain and Client ID
   - Set Allowed Callback URLs

---

## Local Development

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/IntelliDocs-AI.git
cd IntelliDocs-AI
```

### 2. Backend Setup

```bash
cd smartdoc-backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your values
# Edit .env with:
# - MONGODB_URI=your_mongodb_uri
# - GOOGLE_GENERATIVE_AI_API_KEY=your_api_key
# - CORS_ORIGIN=http://localhost:5173
# - PORT=5000

# Start development server
npm run dev
# Server runs on http://https://intellidocs-backend-zn1j.onrender.com
```

### 3. Frontend Setup

```bash
cd ../smartdoc-frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with:
# - VITE_AUTH0_DOMAIN=your_auth0_domain
# - VITE_AUTH0_CLIENT_ID=your_auth0_client_id
# - VITE_AUTH0_CALLBACK_URL=http://localhost:5173
# - VITE_API_BASE_URL=http://https://intellidocs-backend-zn1j.onrender.com

# Start development server
npm run dev
# Frontend runs on http://localhost:5173
```

### 4. Verify Local Setup

- [ ] Frontend loads at http://localhost:5173
- [ ] Backend responds at http://https://intellidocs-backend-zn1j.onrender.com/health
- [ ] Auth0 login works
- [ ] Can upload documents
- [ ] Document analysis features work

---

## Backend Deployment (Render)

### Step 1: Prepare Repository

```bash
# Ensure .env is in .gitignore
echo ".env" >> .gitignore

# Commit changes
git add .
git commit -m "Prepare backend for production deployment"
git push origin main
```

### Step 2: Create Render Web Service

1. Log in to https://dashboard.render.com
2. Click **"New +"** button
3. Select **"Web Service"**
4. Connect your GitHub repository
5. Configure service:
   - **Name**: `intellidocs-ai-backend`
   - **Environment**: `Node`
   - **Region**: Select closest to your users
   - **Build Command**: `cd smartdoc-backend && npm install`
   - **Start Command**: `cd smartdoc-backend && npm start`
   - **Instance Type**: Free (or paid for better uptime)

### Step 3: Add Environment Variables

In Render dashboard, click **"Environment"** and add:

```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/intellidocs-ai?retryWrites=true&w=majority
GOOGLE_GENERATIVE_AI_API_KEY=your-api-key-here
CORS_ORIGIN=https://your-frontend-domain.vercel.app
OPENAI_API_KEY=sk-... (optional)
```

### Step 4: Deploy

1. Click **"Create Web Service"**
2. Render will automatically deploy from your main branch
3. Once deployed, note the service URL (e.g., `https://intellidocs-ai-backend.onrender.com`)

### Step 5: Verify Backend

```bash
# Check if service is healthy
curl https://your-backend-url.onrender.com/health

# Should respond with:
# {"status":"healthy","timestamp":"2024-...","uptime":123.45}
```

---

## Frontend Deployment (Vercel)

### Step 1: Update Frontend Configuration

Create `smartdoc-frontend/.env.production`:

```env
VITE_AUTH0_DOMAIN=your-auth0-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_AUTH0_CALLBACK_URL=https://your-app.vercel.app
VITE_API_BASE_URL=https://your-backend-url.onrender.com
VITE_GOOGLE_GENERATIVE_AI_API_KEY=your-google-api-key
```

⚠️ **Important**: Don't commit `.env.production` to GitHub. Set these in Vercel's environment variables instead.

### Step 2: Deploy Using Vercel CLI

```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel

# Navigate to frontend directory
cd smartdoc-frontend

# Deploy
vercel --prod

# Vercel will prompt for:
# - Project name: intellidocs-ai-frontend
# - Directory: ./
# - Build command: npm run build
# - Output directory: dist
```

### Step 3: Configure Environment Variables in Vercel

1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add all variables from `.env.production`:
   - Click **"Add"**
   - Enter variable name and value
   - Select **"Production"** environment
   - Click **"Save"**

5. Once all variables are added, trigger a new deployment:
   - Go to **Deployments**
   - Click **"Redeploy"** on latest deployment
   - Select **"Yes"** to redeploy

### Step 4: Update Auth0 Callback URLs

1. Log in to Auth0 dashboard
2. Go to Applications → Your App
3. In **Settings**, update:
   - **Allowed Callback URLs**: `https://your-app.vercel.app/dashboard`
   - **Allowed Logout URLs**: `https://your-app.vercel.app`
   - **Allowed Web Origins**: `https://your-app.vercel.app`
4. Save changes

### Step 5: Verify Frontend

```bash
# Visit your frontend URL
curl https://your-app.vercel.app

# Check that:
# - Page loads without 404 errors
# - Auth0 login button appears
# - No console errors (check browser dev tools)
```

---

## Configuration Checklist

### Before Going Live

**Backend (Render):**
- [ ] All environment variables set correctly
- [ ] Health check endpoint responds
- [ ] MongoDB connection works
- [ ] Google API key is valid
- [ ] CORS_ORIGIN matches frontend URL
- [ ] Server starts without errors

**Frontend (Vercel):**
- [ ] All environment variables set correctly
- [ ] Build completes successfully
- [ ] Page loads without errors
- [ ] Auth0 login works
- [ ] Can upload documents
- [ ] API calls reach backend correctly

**Auth0:**
- [ ] Application created
- [ ] Callback URLs updated with production domain
- [ ] Logout URLs updated
- [ ] Web Origins updated
- [ ] Domain and Client ID saved

**MongoDB:**
- [ ] Database created
- [ ] User created with read/write permissions
- [ ] Connection string obtained
- [ ] Network access allows Render IP

---

## Troubleshooting

### Frontend Can't Connect to Backend

**Problem**: CORS error or 404 when frontend calls API

**Solutions**:
1. Check `VITE_API_BASE_URL` matches backend URL
2. Verify CORS_ORIGIN on backend matches frontend URL
3. Check backend is running: `curl https://backend-url/health`
4. Check network tab in browser dev tools for actual request URL

### Auth0 Login Not Working

**Problem**: Redirect loop or "Callback URL Mismatch" error

**Solutions**:
1. Verify `VITE_AUTH0_CALLBACK_URL` in frontend matches Auth0 settings
2. Check Auth0 Allowed Callback URLs includes your Vercel URL
3. Clear browser cache and cookies
4. Verify Auth0 domain and client ID are correct

### Document Upload Fails

**Problem**: File upload returns error

**Solutions**:
1. Check file size is under 50MB
2. Check MongoDB is accessible from Render (network access)
3. Check Google API key in .env is valid
4. Check backend logs: `vercel logs` on Render dashboard
5. Verify CORS allows file upload endpoint

### Build Fails on Deployment

**Problem**: Deployment fails during build phase

**Solutions**:
1. Check `npm run build` works locally
2. Check all dependencies listed in package.json
3. Check for TypeScript/syntax errors: `npm run lint`
4. Check build output directory is correct (dist/)
5. Review Vercel/Render build logs for specific error

### Slow Document Processing

**Problem**: Summarization or analysis takes very long

**Solutions**:
1. Check Google API rate limits haven't been exceeded
2. Check MongoDB query performance
3. Consider upgrading to paid tier for better resource allocation
4. Optimize OCR processing for large PDFs
5. Consider implementing document chunking for very large files

---

## Monitoring & Maintenance

### Production Monitoring

**Backend Health Checks**:
```bash
# Daily health check
curl https://your-backend.onrender.com/health
```

**Frontend Performance**:
- Monitor Vercel Analytics
- Check browser console for errors
- Monitor Core Web Vitals

### Logs

**Render Backend Logs**:
- Log in to Render dashboard
- Select your service
- Click "Logs" tab
- View real-time logs

**Vercel Frontend Logs**:
- Log in to Vercel
- Select your project
- Click "Deployments"
- Select deployment and view logs

### Updating Deployment

**Backend**:
```bash
git add .
git commit -m "Update backend"
git push origin main
# Render auto-deploys on push
```

**Frontend**:
```bash
git add .
git commit -m "Update frontend"
git push origin main
# Vercel auto-deploys on push
```

---

## Security Best Practices

1. ✅ **Never commit .env files** - Use environment variables
2. ✅ **Rotate API keys regularly** - Change Google/OpenAI keys monthly
3. ✅ **Monitor resource usage** - Check Render/Vercel dashboards
4. ✅ **Enable 2FA** - On all service accounts (GitHub, Auth0, etc.)
5. ✅ **Review dependencies** - Run `npm audit` monthly
6. ✅ **Keep libraries updated** - Run `npm update` before production deploys
7. ✅ **Monitor logs** - Check for suspicious activity
8. ✅ **Backup data** - MongoDB Atlas automatic backups enabled

---

## Cost Estimation

| Service | Free Tier | Notes |
|---------|-----------|-------|
| Render | $7/month | Backend hosting |
| Vercel | Free | Frontend hosting |
| MongoDB Atlas | Free (512MB) | Database - paid for larger |
| Google Generative AI | Free quota | ~60 requests/day, then paid |
| Auth0 | Free (7,500 users) | Authentication |

**Estimated Monthly Cost**: $7-15 for small deployments

---

## Support

For issues:
1. Check logs on Render/Vercel dashboards
2. Review browser console (F12)
3. Check GitHub Issues
4. Review this guide's troubleshooting section

---

**Last Updated**: 2024
**IntelliDocs AI Team**
