import { NextRequest, NextResponse } from 'next/server';
import Parse from '@/lib/parse';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const Candidate = Parse.Object.extend('Candidate');
    const candidate = new Candidate();

    // Set all form data
    candidate.set('fullName', data.fullName);
    candidate.set('fatherName', data.fatherName);
    candidate.set('motherName', data.motherName);
    candidate.set('dateOfBirth', new Date(data.dateOfBirth));
    candidate.set('gender', data.gender);
    candidate.set('email', data.email);
    candidate.set('phone', data.phone);
    candidate.set('address', data.address);
    candidate.set('city', data.city);
    candidate.set('state', data.state);
    candidate.set('pincode', data.pincode);
    candidate.set('examName', data.examName);
    candidate.set('examCategory', data.examCategory);
    candidate.set('qualification', data.qualification);
    candidate.set('passingYear', data.passingYear);
    candidate.set('percentage', parseFloat(data.percentage));
    candidate.set('preferredCenter1', data.preferredCenter1);
    candidate.set('preferredCenter2', data.preferredCenter2);
    candidate.set('preferredCenter3', data.preferredCenter3);
    candidate.set('aadharNumber', data.aadharNumber);
    candidate.set('photoURL', data.photoURL);
    candidate.set('registrationNumber', data.registrationNumber);
    candidate.set('status', 'registered');
    candidate.set('admitCardGenerated', false);
    candidate.set('registrationHash', data.registrationHash);

    const savedCandidate = await candidate.save();
    
    return NextResponse.json({ 
      success: true, 
      id: savedCandidate.id 
    });
  } catch (error) {
    console.error('Error creating candidate:', error);
    return NextResponse.json(
      { error: 'Failed to create candidate' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const registrationNumber = searchParams.get('registrationNumber');
    
    const Candidate = Parse.Object.extend('Candidate');
    const query = new Parse.Query(Candidate);
    
    let candidate;
    if (id) {
      candidate = await query.get(id);
    } else if (registrationNumber) {
      query.equalTo('registrationNumber', registrationNumber);
      candidate = await query.first();
    } else {
      return NextResponse.json(
        { error: 'Missing id or registrationNumber parameter' },
        { status: 400 }
      );
    }

    if (!candidate) {
      return NextResponse.json(
        { error: 'Candidate not found' },
        { status: 404 }
      );
    }

    const candidateData = {
      id: candidate.id,
      fullName: candidate.get('fullName'),
      fatherName: candidate.get('fatherName'),
      motherName: candidate.get('motherName'),
      dateOfBirth: candidate.get('dateOfBirth')?.toISOString(),
      gender: candidate.get('gender'),
      email: candidate.get('email'),
      phone: candidate.get('phone'),
      address: candidate.get('address'),
      city: candidate.get('city'),
      state: candidate.get('state'),
      pincode: candidate.get('pincode'),
      examName: candidate.get('examName'),
      examCategory: candidate.get('examCategory'),
      qualification: candidate.get('qualification'),
      passingYear: candidate.get('passingYear'),
      percentage: candidate.get('percentage'),
      preferredCenter1: candidate.get('preferredCenter1'),
      preferredCenter2: candidate.get('preferredCenter2'),
      preferredCenter3: candidate.get('preferredCenter3'),
      aadharNumber: candidate.get('aadharNumber'),
      registrationNumber: candidate.get('registrationNumber'),
      registrationHash: candidate.get('registrationHash'),
      photoURL: candidate.get('photoURL'),
      status: candidate.get('status'),
    };
    
    return NextResponse.json(candidateData);
  } catch (error) {
    console.error('Error fetching candidate:', error);
    return NextResponse.json(
      { error: 'Failed to fetch candidate' },
      { status: 500 }
    );
  }
}

