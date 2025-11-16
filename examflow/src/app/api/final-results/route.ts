import { NextRequest, NextResponse } from 'next/server';
import Parse from '@/lib/parse';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const FinalResult = Parse.Object.extend('FinalResult');
    const finalResult = new FinalResult();

    finalResult.set('registrationNumber', data.registrationNumber);
    finalResult.set('candidateId', data.candidateId);
    finalResult.set('candidateName', data.candidateName);
    finalResult.set('examName', data.examName);
    finalResult.set('totalQuestions', data.totalQuestions);
    finalResult.set('correctAnswers', data.correctAnswers);
    finalResult.set('wrongAnswers', data.wrongAnswers);
    finalResult.set('unattempted', data.unattempted);
    finalResult.set('score', data.score);
    finalResult.set('percentage', data.percentage);
    finalResult.set('status', 'published');
    finalResult.set('generatedAt', new Date());

    await finalResult.save();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving final result:', error);
    return NextResponse.json(
      { error: 'Failed to save final result' },
      { status: 500 }
    );
  }
}

