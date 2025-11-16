# ExamFlow - Blockchain-Secured Examination System

A complete examination management system with blockchain verification, OMR processing, and automated result generation.

## Features

- 📝 Candidate Registration with blockchain hash generation
- 🎫 Admit Card Generation with QR codes
- ✅ Exam Center Verification via OCR
- 🔍 AI-powered OMR Sheet Processing (YOLO + OpenCV)
- 📊 Automated Result Generation
- 👨‍💼 Admin Panel for Answer Key Management
- 🔐 Tamper-proof records using Parse/Back4App

## Prerequisites

- Node.js 18+ 
- Python 3.8+ (for OMR processing)
- Back4App account (free tier available)

## Environment Setup

### 1. Create `.env.local` file

```env
# Back4App Configuration (Server-side ONLY)
BACK4APP_APP_ID=your_app_id_here
BACK4APP_JS_KEY=your_js_key_here
```

**Important:** Do NOT use `NEXT_PUBLIC_` prefix. These are server-side only.

### 2. Get Back4App Credentials

1. Sign up at [Back4App](https://www.back4app.com/)
2. Create a new app
3. Go to App Settings → Security & Keys
4. Copy Application ID and JavaScript Key

## Installation & Running

### Frontend (Next.js)

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Backend (Python OMR Processor)

```bash
# Install Python dependencies
pip install fastapi uvicorn opencv-python easyocr ultralytics

# Run OMR server
uvicorn main:app --reload --port 8000
```

The OMR API will run on [http://localhost:8000](http://localhost:8000)

## Deploying to Vercel

### Step 1: Add Environment Variables

In your Vercel project dashboard:

1. Go to Settings → Environment Variables
2. Add:
   - `BACK4APP_APP_ID` = your_app_id
   - `BACK4APP_JS_KEY` = your_js_key

**✅ No more "NEXT_PUBLIC_" warning!** Credentials are now server-side only.

### Step 2: Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or push to GitHub and connect to Vercel for automatic deployments.

### Step 3: Deploy Python Backend Separately

The Python OMR server needs to be hosted separately.

**🏆 Recommended: Hugging Face Spaces** (16GB RAM, perfect for ML)
- See [`HF_SPACES_DEPLOYMENT.md`](./HF_SPACES_DEPLOYMENT.md) for step-by-step guide
- Free tier with 16GB RAM
- No out-of-memory issues
- Optimized for ML workloads

**Alternative Options:**
- **Railway.app** (512MB → 8GB RAM)
- **Google Cloud Run** (1-4GB RAM)
- **Render.com** (⚠️ 512MB free tier - insufficient for YOLO)

Then set the environment variable in Vercel:
- **Variable:** `OMR_API_URL`
- **Value:** `https://YOUR_USERNAME-examflow-omr-processor.hf.space`

The API route automatically uses this environment variable - no code changes needed!

## Project Structure

```
examflow/
├── src/
│   ├── app/
│   │   ├── api/                    # Server-side API routes
│   │   │   ├── candidates/         # Candidate CRUD
│   │   │   ├── exam-results/       # OMR results
│   │   │   ├── answer-keys/        # Answer keys
│   │   │   ├── final-results/      # Final results
│   │   │   └── process-omr/        # OMR processing proxy
│   │   ├── registration/           # Registration page
│   │   ├── admit-card/             # Admit card generation
│   │   ├── exam-center-verification/ # Verification portal
│   │   ├── omr-processing/         # OMR upload
│   │   ├── result-generation/      # Result viewing
│   │   └── admin/answer-key/       # Admin panel
│   ├── lib/
│   │   └── parse.ts                # Parse SDK (server-side)
│   └── types/
│       └── candidate.ts            # TypeScript types
├── main.py                         # FastAPI server
├── omr_processor.py                # OMR processing logic
└── best.pt                         # YOLO model weights
```

## Key Changes from Original

### ✅ Security Improvements

1. **No client-side Parse SDK** - All database operations via API routes
2. **No NEXT_PUBLIC_ variables** - Credentials stay server-side
3. **Vercel deployment-ready** - No more security warnings

### 🔄 Architecture

- **Before:** Browser → Parse SDK → Back4App
- **After:** Browser → Next.js API Routes → Parse SDK → Back4App

## Technology Stack

- **Frontend:** Next.js 16, React 19, Tailwind CSS v4
- **Backend:** FastAPI, Python
- **Database:** Parse Server (Back4App)
- **OCR:** Tesseract.js, EasyOCR
- **ML:** YOLO (Ultralytics)
- **PDF:** jsPDF, html2canvas

## Database Collections

- **Candidate** - Registration data
- **ExamResult** - OMR answers + hashes
- **AnswerKey** - Correct answers
- **FinalResult** - Evaluated results

## Support

For issues or questions, see `ENV_SETUP.md` for detailed environment configuration.

## License

MIT
