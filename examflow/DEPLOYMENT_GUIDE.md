# 🚀 Vercel Deployment Guide

## ✅ Problem Solved

The **"NEXT_PUBLIC_ environment variable warning"** has been completely fixed! 

### What Changed?

- ✅ Removed `NEXT_PUBLIC_` prefix from all environment variables
- ✅ Moved all Parse SDK operations to server-side API routes
- ✅ Credentials now stay on the server (never sent to browser)
- ✅ Vercel deployment will succeed without security warnings

---

## 📋 Deployment Checklist

### 1️⃣ **Local Setup First**

Create `.env.local` in the project root:

```env
BACK4APP_APP_ID=your_actual_app_id
BACK4APP_JS_KEY=your_actual_js_key
```

Test locally:
```bash
npm install
npm run dev
```

Visit http://localhost:3000 and test the registration flow.

---

### 2️⃣ **Vercel Environment Variables**

In your Vercel project:

1. Go to **Settings** → **Environment Variables**
2. Add these **three variables**:

| Name | Value | Environment |
|------|-------|-------------|
| `BACK4APP_APP_ID` | your_app_id | Production, Preview, Development |
| `BACK4APP_JS_KEY` | your_js_key | Production, Preview, Development |
| `OMR_API_URL` | your_render_url | Production, Preview, Development |

**Example for OMR_API_URL:**
```
https://examflow-omr-processor.onrender.com
```

**⚠️ Important:**
- Do **NOT** use `NEXT_PUBLIC_` prefix
- Apply to all environments (Production, Preview, Development)
- OMR_API_URL should be your deployed Render service URL

---

### 3️⃣ **Deploy to Vercel**

#### Option A: GitHub (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables (see step 2)
4. Click **Deploy**

#### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Set environment variables
vercel env add BACK4APP_APP_ID
vercel env add BACK4APP_JS_KEY

# Deploy to production
vercel --prod
```

---

### 4️⃣ **Python Backend (OMR Processing)**

The Python OMR processor must be deployed separately. We **recommend Hugging Face Spaces** for ML workloads.

#### **🏆 Recommended: Hugging Face Spaces (16GB RAM)**

**📖 Complete Guide:** See [`HF_SPACES_DEPLOYMENT.md`](./HF_SPACES_DEPLOYMENT.md) for detailed step-by-step instructions.

**Why Hugging Face Spaces?**
- ✅ **16GB RAM** (vs Render's 512MB)
- ✅ **Perfect for ML models** (YOLO, PyTorch, OpenCV)
- ✅ **Free tier** with no credit card
- ✅ **No out-of-memory errors**
- ✅ **Fast cold starts**

**Quick Setup:**

1. **Create a Space:**
   - Go to https://huggingface.co/spaces
   - Click "Create new Space"
   - Choose **Docker SDK**
   - Select **CPU basic** (16GB RAM, free)

2. **Clone and Deploy:**
   ```bash
   git clone https://huggingface.co/spaces/YOUR_USERNAME/examflow-omr-processor
   cd examflow-omr-processor
   
   # Copy files (from examflow directory)
   cp main.py omr_processor.py requirements.txt best.pt Dockerfile .dockerignore .
   cp README_HF_SPACES.md README.md
   
   # Push to deploy
   git lfs track "*.pt"
   git add .
   git commit -m "Initial deployment"
   git push
   ```

3. **Add to Vercel Environment Variables:**
   - Variable: `OMR_API_URL`
   - Value: `https://YOUR_USERNAME-examflow-omr-processor.hf.space`

**✅ Deployment takes 3-5 minutes!**

---

#### **Alternative: Render.com (512MB RAM)**

**⚠️ Note:** Render's free tier (512MB RAM) is insufficient for YOLO + PyTorch. Consider this only if:
- You have a paid Render plan (1GB+ RAM)
- You've optimized the model significantly

**📖 Complete Guide:** See [`RENDER_DEPLOYMENT.md`](./RENDER_DEPLOYMENT.md) for Render-specific instructions.

**Quick Setup (if using Render):**

1. Deploy to [Render.com](https://render.com)
2. Configure: Build command: `pip install -r requirements.txt`
3. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Add to Vercel: `OMR_API_URL` = Your Render URL

**⚠️ Memory Issues:** Expect out-of-memory errors on free tier.

---

## ✅ Verification

After deployment, test these flows:

1. **Registration**: http://your-app.vercel.app/registration
2. **Admit Card**: Generate and download
3. **Verification**: Upload admit card
4. **OMR Processing**: Test with OMR sheet (requires Python backend)
5. **Result Generation**: Check results

---

## 🐛 Troubleshooting

### Error: "Missing Back4App environment variables"

**Solution:** Environment variables not set correctly in Vercel.

1. Go to Vercel → Settings → Environment Variables
2. Verify both `BACK4APP_APP_ID` and `BACK4APP_JS_KEY` exist
3. Redeploy: Vercel → Deployments → ⋯ → Redeploy

### Error: "Cannot connect to OMR processor"

**Solution:** Python backend not running or wrong URL.

1. Verify Python backend is deployed and running
2. Check URL in `src/app/api/process-omr/route.ts`
3. Test Python backend: `curl https://your-backend.com/`

### Error: "Candidate not found"

**Solution:** Back4App database not connected.

1. Check environment variables are correct
2. Verify Back4App app is active
3. Check Back4App dashboard for data

---

## 📊 Architecture Flow

```
Browser Request
    ↓
Next.js API Route (Server-Side)
    ↓
Parse SDK (with credentials from env)
    ↓
Back4App Database
```

**Key Point:** Credentials never reach the browser! 🔒

---

## 🎉 Success!

You should now see:
- ✅ No security warnings in Vercel
- ✅ Successful deployment
- ✅ Working application

## 📧 Support

If you encounter issues:
1. Check this guide again
2. Verify all environment variables
3. Check Vercel deployment logs
4. Test locally first with `.env.local`

---

**You're all set! 🚀**

