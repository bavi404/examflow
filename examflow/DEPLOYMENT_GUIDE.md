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
2. Add these **two variables**:

| Name | Value | Environment |
|------|-------|-------------|
| `BACK4APP_APP_ID` | your_app_id | Production, Preview, Development |
| `BACK4APP_JS_KEY` | your_js_key | Production, Preview, Development |

**⚠️ Important:**
- Do **NOT** use `NEXT_PUBLIC_` prefix
- Apply to all environments (Production, Preview, Development)

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

The Python server must be deployed separately. Choose one:

#### **Option 1: Railway.app** (Easiest)

1. Create account at [Railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Add these files to your Python repo:

**`Procfile`:**
```
web: uvicorn main:app --host 0.0.0.0 --port $PORT
```

**`requirements.txt`:**
```
fastapi
uvicorn[standard]
opencv-python-headless
easyocr
ultralytics
python-multipart
```

4. Deploy and copy the URL

#### **Option 2: Render.com** (Free Tier)

1. Create account at [Render.com](https://render.com)
2. New → Web Service
3. Connect GitHub repo
4. Build Command: `pip install -r requirements.txt`
5. Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Deploy and copy URL

#### **Update API Endpoint**

In `examflow/src/app/api/process-omr/route.ts`, line 12:

```typescript
// Replace localhost with your deployed Python backend
const response = await fetch('https://your-python-backend.railway.app/process-omr', {
  method: 'POST',
  body: formData,
});
```

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

