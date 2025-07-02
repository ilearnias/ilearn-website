import { NextResponse } from 'next/server';
import { API_CONFIG, API_ENDPOINTS } from '@/config/api';

export async function POST(request: Request) {
  try {
    // Add CORS headers
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Handle preflight request
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { headers });
    }

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({
        status: false,
        message: 'Email and password are required',
        data: null
      }, { status: 400, headers });
    }

    // Forward the request to your actual backend API
    const apiUrl = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`;
    console.log('Forwarding request to:', apiUrl); // Debug log

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log('API Response:', data); // Debug log

    // Just forward the response as is
    return NextResponse.json(data, { 
      status: response.ok ? 200 : response.status,
      headers 
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({
      status: false,
      message: 'Internal server error',
      data: null
    }, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
}

// Handle OPTIONS request
export async function OPTIONS(request: Request) {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 