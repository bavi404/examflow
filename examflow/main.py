from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from omr_processor import OMRProcessor
import uvicorn
import tempfile
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
#processor = OMRProcessor(model_path=r"C:\Users\Administrator\Downloads\best.pt")

# Update this path to where your best.pt file is located
MODEL_PATH = "./best.pt"  # or full path like "/home/user/best.pt"

processor = OMRProcessor(model_path=MODEL_PATH)

@app.post("/process-omr")
async def process_omr(file: UploadFile = File(...)):
    # Save uploaded file temporarily
    temp = tempfile.NamedTemporaryFile(delete=False, suffix=".jpg")
    content = await file.read()
    temp.write(content)
    temp.close()
    
    try:
        # Process OMR
        result = processor.process_omr(temp.name)
        return result
    finally:
        # Clean up temp file
        os.unlink(temp.name)

@app.get("/")
async def root():
    return {"message": "OMR Processor API is running"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)