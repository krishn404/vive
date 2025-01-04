import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name') || 'lofi-study';
    const page = searchParams.get('page') || '1';
    const limit = '100'; 
    
    const response = await axios.get(
      `https://vibe-backend-ujj6.onrender.com/api/search/?name=${name}&page=${page}&limit=${limit}`,
      {
        headers: {
          'Accept': 'application/json',
          'Origin': 'https://getvibe.in',
          'User-Agent': 'Mozilla/5.0' 
        }
      }
    );
    
    return NextResponse.json(response.data);
  } catch (error: unknown) {
    const err = error as AxiosError;
    console.error('Proxy error details:', err.response?.data || err.message);
    return NextResponse.json(
      { error: 'Failed to fetch data', details: err.message },
      { status: 500 }
    );
  }
}