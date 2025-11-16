---
title: ExamFlow OMR Processor
emoji: 📄
colorFrom: blue
colorTo: green
sdk: docker
pinned: false
license: mit
app_port: 7860
---

# ExamFlow OMR Processor

This is the backend service for ExamFlow's Optical Mark Recognition (OMR) processing system. It uses a custom-trained YOLO model to detect and extract information from OMR sheets.

## Features

- **YOLO-based Region Detection**: Detects name, registration number, voucher number, MCQs, and marking areas
- **Bubble Detection**: Advanced multi-method bubble detection with enhanced accuracy
- **Text Extraction**: OCR for registration numbers and names using EasyOCR
- **Answer String Generation**: Generates answer strings from detected marked bubbles

## API Endpoints

### POST /process-omr

Process an uploaded OMR sheet image.

**Request:**
- Content-Type: `multipart/form-data`
- Body: `file` - Image file (JPG, PNG)

**Response:**
```json
{
  "registration_number": "ABC123",
  "name": "John Doe",
  "voucher_number": "VOU456",
  "answer_string": "ABCDDCBAA...",
  "total_questions": 100,
  "marked_answers": 95
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "model_loaded": true
}
```

## Technology Stack

- **FastAPI**: Modern web framework
- **YOLOv8**: Object detection model
- **OpenCV**: Image processing
- **EasyOCR**: Text recognition
- **PyTorch**: Deep learning framework

## Local Development

```bash
# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## Credits

Part of the ExamFlow examination management system.

