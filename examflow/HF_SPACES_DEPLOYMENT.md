# Hugging Face Spaces Deployment Guide

This guide will walk you through deploying the ExamFlow OMR Processor backend to Hugging Face Spaces with 16GB RAM (free tier).

## Why Hugging Face Spaces?

✅ **16GB RAM** (vs Render's 512MB)
✅ **Free tier** for public repositories
✅ **Perfect for ML models** (YOLO, PyTorch, OpenCV)
✅ **No cold starts** with persistent hardware
✅ **Easy deployment** via Git

---

## Prerequisites

1. **Hugging Face Account** (free)
   - Sign up at https://huggingface.co/join

2. **Git** installed on your system

3. **Git LFS** for the model file
   ```bash
   # Install Git LFS (if not already installed)
   git lfs install
   ```

---

## Step-by-Step Deployment

### 1. Create a New Space

1. Go to https://huggingface.co/spaces
2. Click **"Create new Space"**
3. Configure your Space:
   - **Space name**: `examflow-omr-processor` (or your preferred name)
   - **License**: MIT
   - **Select the Space SDK**: **Docker**
   - **Space hardware**: **CPU basic** (16GB RAM, free)
   - **Visibility**: Public (for free tier)

4. Click **"Create Space"**

### 2. Clone the Space Repository

After creating the Space, clone it to your local machine:

```bash
git clone https://huggingface.co/spaces/YOUR_USERNAME/examflow-omr-processor
cd examflow-omr-processor
```

### 3. Copy Backend Files

Copy the following files from your `examflow` directory to the cloned Space directory:

```bash
# From your examflow project directory
cp main.py YOUR_SPACE_DIR/
cp omr_processor.py YOUR_SPACE_DIR/
cp requirements.txt YOUR_SPACE_DIR/
cp best.pt YOUR_SPACE_DIR/
cp Dockerfile YOUR_SPACE_DIR/
cp .dockerignore YOUR_SPACE_DIR/
cp README_HF_SPACES.md YOUR_SPACE_DIR/README.md
```

**Important**: Rename `README_HF_SPACES.md` to `README.md` in the Space directory. The YAML frontmatter in this file configures your Space.

### 4. Set Up Git LFS for the Model File

The `best.pt` model file (21.5 MB) should be tracked with Git LFS:

```bash
cd YOUR_SPACE_DIR
git lfs track "*.pt"
git add .gitattributes
```

### 5. Push to Hugging Face

```bash
# Add all files
git add .

# Commit
git commit -m "Initial deployment of OMR processor"

# Push to Hugging Face
git push
```

### 6. Monitor Deployment

1. Go to your Space URL: `https://huggingface.co/spaces/YOUR_USERNAME/examflow-omr-processor`
2. You'll see the build logs in real-time
3. Wait for the status to change from "Building" → "Running" (usually 3-5 minutes)

### 7. Test Your API

Once deployed, test the health endpoint:

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

---

## Configure Vercel to Use Hugging Face Space

Update your Vercel environment variable:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Update or add:
   - **Key**: `OMR_API_URL`
   - **Value**: `https://YOUR_USERNAME-examflow-omr-processor.hf.space`
   - **Environment**: Production, Preview, Development

4. **Redeploy** your Vercel frontend to apply changes:
   ```bash
   # From your project root
   git commit --allow-empty -m "Trigger redeploy with new OMR_API_URL"
   git push
   ```

---

## Troubleshooting

### Build Fails with "No space left on device"

This is rare on HF Spaces. If it happens:
- Make sure you're using `.dockerignore` to exclude unnecessary files
- Remove any large unused files from your repository

### Model Not Loading

Check the logs in your Space's "Logs" tab. Common issues:
- `best.pt` not found: Ensure Git LFS is properly configured
- Permission denied: Make sure the model file is in the root directory

### API Timeout

If the first request times out:
- The model is loading (one-time initialization)
- Subsequent requests will be fast
- Consider adding a warmup endpoint

### CORS Issues

If you get CORS errors from the frontend:
- Check that `main.py` has proper CORS configuration
- Verify the middleware is allowing your Vercel domain

---

## Performance & Costs

**Free Tier Includes:**
- 16GB RAM
- Persistent storage for models
- Unlimited API calls (fair use)
- No credit card required for public Spaces

**Limitations:**
- Space must be public (or upgrade to PRO)
- Fair use policy applies
- May be rate-limited under extreme load

**Upgrading (Optional):**
- **CPU Upgraded** ($0.05/hr): Better CPU, more RAM
- **GPU T4** ($0.60/hr): For faster inference
- **Private Spaces**: Keep your code private

---

## Monitoring Your Space

### View Logs
```
https://huggingface.co/spaces/YOUR_USERNAME/examflow-omr-processor/logs
```

### Check Status
```
https://huggingface.co/spaces/YOUR_USERNAME/examflow-omr-processor
```

### API Analytics
HF Spaces provides basic analytics in your Space settings.

---

## Updating Your Deployment

To update your code:

```bash
cd YOUR_SPACE_DIR

# Make changes to your files
# ...

# Commit and push
git add .
git commit -m "Update OMR processor"
git push
```

The Space will automatically rebuild and redeploy.

---

## Complete File Structure

Your HF Space repository should look like this:

```
examflow-omr-processor/
├── Dockerfile              # Container configuration
├── README.md              # HF Spaces config (with YAML frontmatter)
├── .dockerignore          # Files to exclude from Docker build
├── .gitattributes         # Git LFS configuration
├── main.py                # FastAPI application
├── omr_processor.py       # OMR processing logic
├── requirements.txt       # Python dependencies
└── best.pt               # YOLO model (tracked with Git LFS)
```

---

## Next Steps

1. ✅ Deploy to Hugging Face Spaces
2. ✅ Update `OMR_API_URL` in Vercel
3. ✅ Test OMR processing on your live site
4. 🎉 Enjoy 16GB RAM and no memory issues!

---

## Support

- **HF Spaces Docs**: https://huggingface.co/docs/hub/spaces
- **Docker SDK**: https://huggingface.co/docs/hub/spaces-sdks-docker
- **Community**: https://discuss.huggingface.co/

---

## Comparison: Render vs Hugging Face Spaces

| Feature | Render Free | HF Spaces Free |
|---------|-------------|----------------|
| RAM | 512 MB ❌ | 16 GB ✅ |
| Cold Starts | Yes | Minimal |
| Build Time | 5-10 min | 3-5 min |
| ML Models | Difficult | Optimized ✅ |
| Deployment | Git/Docker | Git/Docker ✅ |
| Cost | Free | Free ✅ |

**Winner for ML**: Hugging Face Spaces 🏆

