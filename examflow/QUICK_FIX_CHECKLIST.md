# ⚡ Quick Fix Checklist - OMR Processing Not Working

## ✅ What Was Fixed

1. ✅ API route now uses environment variable instead of hardcoded localhost
2. ✅ Added Render deployment files (`requirements.txt`, `render.yaml`)
3. ✅ Created comprehensive deployment guide
4. ✅ All changes pushed to GitHub

---

## 🚀 What You Need to Do Now

### Step 1: Deploy Python Backend to Render (10 minutes)

**You mentioned you already have it deployed on Render - perfect!**

If not deployed yet:

1. Go to **[Render.com](https://render.com)** → Sign in
2. Click **New +** → **Web Service**
3. Connect your **GitHub repo** (`bavi404/examflow`)
4. Configure:
   - **Name:** `examflow-omr-processor`
   - **Root Directory:** `examflow` (or leave blank if Python files are in root)
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Instance Type:** Free
5. Click **Create Web Service**
6. Wait 5-10 minutes for build
7. **Copy your service URL** (looks like: `https://examflow-omr-processor.onrender.com`)

---

### Step 2: Add OMR_API_URL to Vercel (2 minutes)

1. Go to **[Vercel Dashboard](https://vercel.com/dashboard)**
2. Select your **examflow** project
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
   - **Name:** `OMR_API_URL`
   - **Value:** `https://your-render-service.onrender.com` (your actual Render URL)
   - **Environments:** Check all three (Production, Preview, Development)
5. Click **Save**

---

### Step 3: Redeploy Vercel (1 minute)

1. Go to **Deployments** tab in Vercel
2. Find the latest deployment
3. Click **⋯** (three dots menu)
4. Click **Redeploy**
5. Wait 1-2 minutes

---

### Step 4: Test OMR Processing ✨

1. Visit **https://examflow-tau.vercel.app**
2. Go to **OMR Processing** page
3. Upload an OMR sheet and admit card
4. Click **"Process & Secure Results"**
5. ✅ **It should work now!**

---

## 🐛 Still Not Working?

### Check #1: Is Render Service Running?

Go to Render Dashboard → Check service status:
- ✅ Should show **"Live"** in green
- ❌ If "Failed", check logs

### Check #2: Is OMR_API_URL Set Correctly?

In Vercel → Settings → Environment Variables:
- ✅ Should be `https://your-service.onrender.com` (no trailing slash)
- ❌ NOT `http://localhost:8000`

### Check #3: Did Vercel Redeploy?

In Vercel → Deployments:
- Latest deployment should be AFTER you added the environment variable
- Status should be "Ready"

### Check #4: Build Failed on Render?

If you see **"Cannot import 'setuptools.build_meta'"** error:

**Solution:**
1. Go to Render Dashboard → Your Service
2. Click **Settings** → **"Clear build cache & deploy"**
3. Make sure these files are in your repo:
   - ✅ `runtime.txt` (contains: `python-3.11.7`)
   - ✅ `requirements.txt` (updated with setuptools)
   - ✅ `render.yaml` (correct build command)
4. Redeploy

The latest code push fixed this issue automatically.

### Check #5: Model File Exists?

In your GitHub repo, check if `best.pt` file is committed:

```bash
# Check in terminal
ls -lh examflow/best.pt

# If missing, add it
git add examflow/best.pt
git commit -m "Add YOLO model file"
git push

# Then trigger redeploy in Render
```

---

## 📊 Test Your Render API Directly

Open a browser or use curl:

```bash
# Test 1: Health check
curl https://your-service.onrender.com/

# Expected: {"message": "OMR Processor API is running"}
```

```bash
# Test 2: Process OMR (with your image)
curl -X POST https://your-service.onrender.com/process-omr \
  -F "file=@path/to/omr-image.jpg"

# Expected: JSON with answers
```

---

## ⏱️ Expected Behavior

**First Request After Inactivity:**
- May take 30-60 seconds (Render free tier cold start)
- Shows "Processing..." on frontend
- This is normal!

**Subsequent Requests:**
- Should be fast (2-5 seconds)
- Service stays awake for 15 minutes after last request

---

## 📖 Detailed Guides

- **Render Deployment:** See `RENDER_DEPLOYMENT.md`
- **Full Deployment:** See `DEPLOYMENT_GUIDE.md`

---

## ✅ Success Checklist

- [ ] Python backend deployed to Render
- [ ] Render service shows "Live" status
- [ ] Render URL copied (e.g., `https://examflow-omr-processor.onrender.com`)
- [ ] `OMR_API_URL` added to Vercel environment variables
- [ ] Vercel redeployed after adding environment variable
- [ ] Tested OMR processing on deployed site
- [ ] OMR answers generated successfully

---

## 🎉 That's It!

Your OMR processing should now work on the deployed site!

**Time to complete:** ~15 minutes (including deployment wait time)

---

**Need help?** Check the logs:
- **Render Logs:** Render Dashboard → Your Service → Logs
- **Vercel Logs:** Vercel Dashboard → Deployments → Click deployment → Logs

