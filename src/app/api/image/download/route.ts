import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { imageUrl } = await request.json();
    
    if (!imageUrl) {
      return NextResponse.json({ error: 'No image URL provided' }, { status: 400 });
    }
    
    // Fetch the image from the remote server
    const imageResponse = await fetch(imageUrl);
    
    if (!imageResponse.ok) {
      return NextResponse.json(
        { error: `Failed to fetch image: ${imageResponse.status}` }, 
        { status: imageResponse.status }
      );
    }
    
    // Get the image data
    const imageData = await imageResponse.arrayBuffer();
    
    // Determine content type
    const contentType = imageResponse.headers.get('content-type') || 'image/png';
    
    // Return the image data
    return new NextResponse(imageData, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('Proxy image request failed:', error);
    return NextResponse.json(
      { error: 'Error processing image request' }, 
      { status: 500 }
    );
  }
} 