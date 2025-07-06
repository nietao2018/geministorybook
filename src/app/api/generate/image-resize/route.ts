import { NextRequest, NextResponse } from 'next/server';
import { auth } from "@/auth";
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const image = formData.get('image') as File;
    const width = parseInt(formData.get('width') as string);
    const height = parseInt(formData.get('height') as string);
    const maintainAspectRatio = formData.get('maintainAspectRatio') === 'true';

    if (!image) {
      return NextResponse.json(
        { error: 'Image file is required' },
        { status: 400 }
      );
    }

    if (!width || !height || width < 1 || height < 1 || width > 4096 || height > 4096) {
      return NextResponse.json(
        { error: 'Valid width and height (1-4096px) are required' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Get original image metadata
    const metadata = await sharp(buffer).metadata();
    
    let resizeOptions: { width: number; height: number; fit?: keyof sharp.FitEnum } = {
      width,
      height,
    };

    // If maintain aspect ratio is true, use 'inside' fit to preserve aspect ratio
    if (maintainAspectRatio) {
      resizeOptions.fit = 'inside';
    }

    // Process image with sharp
    const processedImageBuffer = await sharp(buffer)
      .resize(resizeOptions)
      .png({ quality: 90, progressive: true })
      .toBuffer();

    // Return the processed image
    return new NextResponse(processedImageBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Length': processedImageBuffer.length.toString(),
        'Cache-Control': 'no-cache',
      },
    });

  } catch (error: any) {
    console.error('Image resize error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to resize image' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}