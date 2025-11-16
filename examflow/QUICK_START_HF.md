# 🚀 Quick Start: Deploy to Hugging Face Spaces

**Time to deploy: ~10 minutes**

This is the fastest way to get your OMR processor running with 16GB RAM (free).

## Prerequisites

✅ Hugging Face account (free): https://huggingface.co/join
✅ Git installed
✅ Git LFS installed: `git lfs install`

## 5-Step Deployment

### 1. Create Space (2 min)

1. Go to https://huggingface.co/spaces
2. Click **"Create new Space"**
3. Configure:
   - Name: `examflow-omr-processor`
   - SDK: **Docker**
   - Hardware: **CPU basic** (16GB RAM)
   - Make it public (for free tier)
4. Click **"Create Space"**

### 2. Clone Space (1 min)

```bash
git clone https://huggingface.co/spaces/YOUR_USERNAME/examflow-omr-processor
cd examflow-omr-processor
```

Replace `YOUR_USERNAME` with your Hugging Face username.

### 3. Copy Files (1 min)

From your `examflow` project directory:

```bash
# Windows PowerShell
Copy-Item ..\examflow\main.py .
Copy-Item ..\examflow\omr_processor.py .
Copy-Item ..\examflow\requirements.txt .
Copy-Item ..\examflow\best.pt .
Copy-Item ..\examflow\Dockerfile .
Copy-Item ..\examflow\.dockerignore .
Copy-Item ..\examflow\README_HF_SPACES.md README.md

# macOS/Linux
cp ../examflow/main.py .
cp ../examflow/omr_processor.py .
cp ../examflow/requirements.txt .
cp ../examflow/best.pt .
cp ../examflow/Dockerfile .
cp ../examflow/.dockerignore .
cp ../examflow/README_HF_SPACES.md README.md
```

### 4. Push to Deploy (2 min)

```bash
# Track model file with Git LFS
git lfs track "*.pt"
git add .gitattributes

# Add all files
git add .

# Commit
git commit -m "Deploy OMR processor with YOLO model"

# Push (this triggers deployment)
git push
```

### 5. Configure Vercel (2 min)

1. Go to your Vercel project dashboard
2. **Settings** → **Environment Variables**
3. Add or update:
   - **Key**: `OMR_API_URL`
   - **Value**: `https://YOUR_USERNAME-examflow-omr-processor.hf.space`
   - **Environments**: Production, Preview, Development
4. Save

5. Redeploy:
   ```bash
   git commit --allow-empty -m "Update OMR API URL"
   git push
   ```

## ✅ Test Your Deployment

### 1. Check Space Status

Visit: `https://huggingface.co/spaces/YOUR_USERNAME/examflow-omr-processor`

Wait for status: **Building** → **Running** (3-5 minutes)

### 2. Test Health Endpoint

```bash
curl https://YOUR_USERNAME-examflow-omr-processor.hf.space/health
```

Expected response:
```json
{
  "status": "healthy",
  "model_loaded": true
}
```

### 3. Test on Your Site

1. Go to your deployed Vercel site
2. Navigate to **OMR Processing** page
3. Upload an OMR sheet
4. It should process successfully! 🎉

## Troubleshooting

### Build is taking too long (>10 min)
- Check logs in your Space's "Logs" tab
- First build downloads PyTorch (~2GB), takes 5-10 minutes
- Subsequent builds are cached and faster

### "Model not found" error
- Ensure `best.pt` was copied correctly
- Check Git LFS is tracking: `git lfs ls-files`
- Should show: `best.pt`

### CORS errors from frontend
- Check that `main.py` has CORS middleware
- Verify the URL in Vercel env var matches your Space URL exactly

### Space shows "Building" forever
- Check logs for errors
- Common issue: Missing `README.md` with YAML frontmatter
- Make sure you copied `README_HF_SPACES.md` as `README.md`

## Memory Comparison

| Platform | RAM | Result |
|----------|-----|--------|
| Render Free | 512 MB | ❌ Out of Memory |
| Railway Free | 512 MB | ❌ Out of Memory |
| HF Spaces Free | 16 GB | ✅ **Works!** |
| Google Cloud Run | 1-4 GB | ✅ Works (but limited requests) |

## What's Next?

✅ Your OMR processor is live with 16GB RAM!
✅ No more out-of-memory errors
✅ Fast inference times
✅ Free tier (no credit card needed)

### Optional Upgrades

If you need even more performance:

- **CPU Upgraded** ($0.05/hr): Faster CPU
- **GPU T4** ($0.60/hr): GPU acceleration for YOLO
- **Private Space**: Keep your code/model private

## Need Help?

- **Detailed Guide**: See [`HF_SPACES_DEPLOYMENT.md`](./HF_SPACES_DEPLOYMENT.md)
- **HF Docs**: https://huggingface.co/docs/hub/spaces
- **Community**: https://discuss.huggingface.co/

---

**Deployment Complete! 🎉**

Your ExamFlow OMR processor is now running on enterprise-grade infrastructure with 16GB RAM, completely free!

