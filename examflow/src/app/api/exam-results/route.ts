import { NextRequest, NextResponse } from 'next/server';
import Parse from '@/lib/parse';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const ExamResult = Parse.Object.extend('ExamResult');
    const examResult = new ExamResult();

    examResult.set('registrationNumber', data.registrationNumber);
    examResult.set('candidateId', data.candidateId);
    examResult.set('candidateName', data.candidateName);
    examResult.set('answerString', data.answerString);
    examResult.set('answerStringHash', data.answerStringHash);
    examResult.set('omrName', data.omrName);
    examResult.set('omrRollNumber', data.omrRollNumber);
    examResult.set('version', data.version);
    examResult.set('totalQuestions', data.totalQuestions);
    examResult.set('answeredQuestions', data.answeredQuestions);
    examResult.set('processedAt', new Date());
    examResult.set('status', 'secured');

    await examResult.save();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving exam result:', error);
    return NextResponse.json(
      { error: 'Failed to save exam result' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const registrationNumber = searchParams.get('registrationNumber');
    
    if (!registrationNumber) {
      return NextResponse.json(
        { error: 'Missing registrationNumber parameter' },
        { status: 400 }
      );
    }

    const ExamResult = Parse.Object.extend('ExamResult');
    const query = new Parse.Query(ExamResult);
    query.equalTo('registrationNumber', registrationNumber);
    const examResult = await query.first();

    if (!examResult) {
      return NextResponse.json(
        { error: 'Exam result not found' },
        { status: 404 }
      );
    }

    const resultData = {
      id: examResult.id,
      registrationNumber: examResult.get('registrationNumber'),
      candidateId: examResult.get('candidateId'),
      candidateName: examResult.get('candidateName'),
      answerString: examResult.get('answerString'),
      answerStringHash: examResult.get('answerStringHash'),
      omrName: examResult.get('omrName'),
      omrRollNumber: examResult.get('omrRollNumber'),
      version: examResult.get('version'),
      totalQuestions: examResult.get('totalQuestions'),
      answeredQuestions: examResult.get('answeredQuestions'),
      processedAt: examResult.get('processedAt')?.toISOString(),
      status: examResult.get('status'),
    };
    
    return NextResponse.json(resultData);
  } catch (error) {
    console.error('Error fetching exam result:', error);
    return NextResponse.json(
      { error: 'Failed to fetch exam result' },
      { status: 500 }
    );
  }
}

