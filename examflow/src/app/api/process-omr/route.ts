import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Use environment variable for OMR processor URL
    // Falls back to localhost for local development
    const omrApiUrl = process.env.OMR_API_URL || 'http://localhost:8000';
    
    console.log(`Forwarding request to OMR processor at ${omrApiUrl}...`);
    
    const response = await fetch(`${omrApiUrl}/process-omr`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OMR API error:', response.status, errorText);
      return NextResponse.json(
        { 
          error: 'Failed to process OMR sheet', 
          details: 'Make sure your local OMR server is running on port 8000'
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('OMR processing successful:', data);
    
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('OMR Processing error:', error);
    
    return NextResponse.json(
      { 
        error: 'Cannot connect to OMR processor', 
        details: 'Make sure your local OMR server is running: uvicorn main:app --reload --port 8000' 
      },
      { status: 500 }
    );
  }
}