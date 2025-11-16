# 🚀 Deploy Python OMR Backend to Render

This guide walks you through deploying the Python OMR processing backend to Render.com.

---

## 📋 Prerequisites

- GitHub account with your examflow repository
- Render.com account (free tier available)
- `best.pt` YOLO model file in your repository

---

## 🔧 Step 1: Prepare Your Repository

### Ensure these files exist:

✅ `main.py` - FastAPI application  
✅ `omr_processor.py` - OMR processing logic  
✅ `best.pt` - YOLO model weights (must be committed)  
✅ `requirements.txt` - Python dependencies  
✅ `render.yaml` - Render configuration (optional)  

### Important: Commit the Model File

```bash
# Make sure best.pt is in your repo root
git add best.pt main.py omr_processor.py requirements.txt
git commit -m "Add Python backend files for Render deployment"
git push origin main
```

**Note:** The `best.pt` file might be large. If GitHub rejects it, you'll need to use Git LFS:

```bash
git lfs install
git lfs track "*.pt"
git add .gitattributes best.pt
git commit -m "Add model file with Git LFS"
git push
```

---

## 🌐 Step 2: Deploy to Render

### Method 1: Using Render Dashboard (Recommended)

1. **Go to [Render.com](https://render.com)** and sign in

2. **Click "New +" → "Web Service"**

3. **Connect GitHub Repository:**
   - Select your `examflow` repository
   - Click "Connect"

4. **Configure Service:**

   | Setting | Value |
   |---------|-------|
   | **Name** | `examflow-omr-processor` |
   | **Region** | Choose closest to you |
   | **Branch** | `main` |
   | **Root Directory** | `examflow` |
   | **Runtime** | `Python 3` |
   | **Build Command** | `pip install --upgrade pip setuptools wheel && pip install -r requirements.txt` |
   | **Start Command** | `uvicorn main:app --host 0.0.0.0 --port $PORT` |
   | **Instance Type** | Free |

5. **Environment Variables** (Optional):
   
   Click "Advanced" → "Add Environment Variable" if needed:
   
   | Key | Value |
   |-----|-------|
   | `PYTHON_VERSION` | `3.11.7` |
   | `PORT` | `10000` |
   
   **Note:** Render will auto-detect Python version from `runtime.txt` file.

6. **Click "Create Web Service"**

7. **Wait for deployment** (5-10 minutes for first deploy)

8. **Copy your service URL** - It will look like:
   ```
   https://examflow-omr-processor.onrender.com
   ```

### Method 2: Using render.yaml (Blueprint)

1. In Render Dashboard, click "New +" → "Blueprint"
2. Connect your repository
3. Render will auto-detect `render.yaml`
4. Click "Apply" to deploy

---

## ✅ Step 3: Test Your Deployed API

### Test the root endpoint:

```bash
curl https://your-service.onrender.com/
```

Expected response:
```json
{"message": "OMR Processor API is running"}
```

### Test OMR processing:

```bash
curl -X POST https://your-service.onrender.com/process-omr \
  -F "file=@path/to/your/omr-image.jpg"
```

Expected response:
```json
{
  "name": "...",
  "roll_number": "...",
  "version": "...",
  "answers": {...},
  "answer_string": "ABCDABCD..."
}
```

---

## 🔗 Step 4: Connect to Vercel (Frontend)

### Update Environment Variable in Vercel:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your `examflow` project
3. Go to **Settings** → **Environment Variables**
4. Add new variable:

   | Name | Value |
   |------|-------|
   | `OMR_API_URL` | `https://your-service.onrender.com` |

   **Replace with your actual Render URL!**

5. **Important:** Set for all environments:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

6. **Redeploy Vercel:**
   - Go to **Deployments** tab
   - Click ⋯ on latest deployment
   - Click **Redeploy**

---

## 🧪 Step 5: Test End-to-End

1. Visit your deployed site: **https://examflow-tau.vercel.app**
2. Go to **OMR Processing** page
3. Upload an OMR sheet and admit card
4. Click "Process & Secure Results"
5. ✅ Should work without errors!

---

## 🐛 Troubleshooting

### Error: "Cannot connect to OMR processor"

**Cause:** Render service not running or wrong URL

**Solution:**
1. Check Render dashboard - service should show "Live" status
2. Verify URL in Vercel environment variables
3. Check Render logs for errors

### Error: "Application failed to respond"

**Cause:** Cold start on free tier (first request after inactivity)

**Solution:**
- Wait 30-60 seconds and try again
- Render free tier spins down after 15 minutes of inactivity
- First request after spin-down takes longer

### Error: "Cannot import 'setuptools.build_meta'" or Build Failed

**Cause:** Python version too new (3.13) or missing build tools

**Solution:**
1. Make sure `runtime.txt` exists with: `python-3.11.7`
2. Build command should be: `pip install --upgrade pip setuptools wheel && pip install -r requirements.txt`
3. Check Render is using Python 3.11.x (not 3.13)
4. Make sure **Root Directory** is set to `examflow` in Render settings
5. Clear build cache and redeploy:
   - Render Dashboard → Settings → "Clear build cache & deploy"

### Error: "No matching distribution found for torch"

**Cause:** Torch version constraints incompatible with Python version

**Solution:**
1. If using Python 3.13: Requirements have been updated to support it
2. Latest code removes strict version limits on torch
3. Make sure you've pulled latest changes: `git pull origin main`
4. Redeploy on Render

### Error: "ModuleNotFoundError" or "ImportError"

**Cause:** Missing dependencies

**Solution:**
1. Check `requirements.txt` has all dependencies
2. Check Render build logs for specific missing package
3. Add missing package to requirements.txt
4. Redeploy service

### Error: "Model file not found"

**Cause:** `best.pt` not in repository

**Solution:**
```bash
# Check if file exists
ls -lh best.pt

# Add and commit
git add best.pt
git commit -m "Add YOLO model file"
git push

# Trigger redeploy in Render
```

### Model file too large for GitHub

**Solution:** Use Git LFS:
```bash
# Install Git LFS
git lfs install

# Track large files
git lfs track "*.pt"

# Commit .gitattributes
git add .gitattributes
git commit -m "Add Git LFS tracking"

# Add model file
git add best.pt
git commit -m "Add model with LFS"
git push
```

---

## 💡 Performance Tips

### 1. Keep Service Awake (Free Tier)

Render free tier sleeps after 15 minutes. Use a cron job:

```bash
# Add to crontab or use cron-job.org
*/10 * * * * curl https://your-service.onrender.com/ > /dev/null 2>&1
```

### 2. Upgrade to Paid Plan

- $7/month for always-on service
- Faster processing
- No cold starts

### 3. Optimize Model Loading

The model loads once at startup, so subsequent requests are fast.

---

## 📊 Monitor Your Service

### Render Dashboard:

- **Logs:** Real-time application logs
- **Metrics:** CPU, memory usage
- **Events:** Deployment history

### Check Health:

```bash
# Add this endpoint to main.py
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "model_loaded": processor.model is not None
    }
```

---

## 🔄 Update Deployment

### Automatic Updates:

Render auto-deploys when you push to `main` branch:

```bash
git add .
git commit -m "Update OMR processor"
git push origin main
```

Render will:
1. Detect the push
2. Rebuild the service
3. Deploy new version
4. Zero-downtime deployment

---

## 💰 Pricing

**Free Tier:**
- ✅ 750 hours/month
- ✅ Automatic sleep after 15 min inactivity
- ✅ Shared CPU/RAM
- ⚠️ Cold starts (30-60s)

**Starter Plan ($7/month):**
- ✅ Always on
- ✅ Dedicated resources
- ✅ No cold starts
- ✅ Better performance

---

## ✅ Success Checklist

- [ ] `best.pt` model file committed to repository
- [ ] All Python files pushed to GitHub
- [ ] Render service created and deployed
- [ ] Service shows "Live" status in Render dashboard
- [ ] Root endpoint (`/`) returns success message
- [ ] `OMR_API_URL` environment variable added to Vercel
- [ ] Vercel redeployed with new environment variable
- [ ] End-to-end test successful (upload OMR on deployed site)

---

## 📧 Need Help?

- **Render Docs:** https://render.com/docs
- **Render Status:** https://status.render.com
- **Check Logs:** Render Dashboard → Your Service → Logs tab

---

**You're all set! Your OMR processor is now live on Render! 🎉**

