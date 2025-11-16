import { NextRequest, NextResponse } from 'next/server';
import Parse from '@/lib/parse';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const AnswerKey = Parse.Object.extend('AnswerKey');
    const answerKey = new AnswerKey();

    answerKey.set('examName', data.examName);
    answerKey.set('totalQuestions', data.totalQuestions);
    answerKey.set('answerKey', data.answerKey);
    answerKey.set('answerString', data.answerString);
    answerKey.set('createdAt', new Date());
    answerKey.set('status', 'active');

    await answerKey.save();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving answer key:', error);
    return NextResponse.json(
      { error: 'Failed to save answer key' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const examName = searchParams.get('examName');
    
    if (!examName) {
      return NextResponse.json(
        { error: 'Missing examName parameter' },
        { status: 400 }
      );
    }

    const AnswerKey = Parse.Object.extend('AnswerKey');
    const query = new Parse.Query(AnswerKey);
    query.equalTo('examName', examName);
    query.equalTo('status', 'active');
    const answerKey = await query.first();

    if (!answerKey) {
      return NextResponse.json(
        { error: 'Answer key not found' },
        { status: 404 }
      );
    }

    const keyData = {
      id: answerKey.id,
      examName: answerKey.get('examName'),
      totalQuestions: answerKey.get('totalQuestions'),
      answerKey: answerKey.get('answerKey'),
      answerString: answerKey.get('answerString'),
      createdAt: answerKey.get('createdAt')?.toISOString(),
      status: answerKey.get('status'),
    };
    
    return NextResponse.json(keyData);
  } catch (error) {
    console.error('Error fetching answer key:', error);
    return NextResponse.json(
      { error: 'Failed to fetch answer key' },
      { status: 500 }
    );
  }
}

