import { NextRequest, NextResponse } from 'next/server';
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
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
    const quality = parseInt(formData.get('quality') as string) || 85;
    const format = (formData.get('format') as string) || 'jpeg';
    const maxWidth = formData.get('maxWidth') ? parseInt(formData.get('maxWidth') as string) : undefined;
    const maxHeight = formData.get('maxHeight') ? parseInt(formData.get('maxHeight') as string) : undefined;

    if (!image) {
      return NextResponse.json(
        { error: 'Image file is required' },
        { status: 400 }
      );
    }

    // Validate quality
    if (quality < 10 || quality > 100) {
      return NextResponse.json(
        { error: 'Quality must be between 10 and 100' },
        { status: 400 }
      );
    }

    // Validate format
    if (!['jpeg', 'png', 'webp'].includes(format)) {
      return NextResponse.json(
        { error: 'Format must be jpeg, png, or webp' },
        { status: 400 }
      );
    }

    // Check user credits
    const user = await prisma.user.findUnique({
      where: { id: session.user.id! },
      select: { credits: true }
    });

    if (!user || user.credits < 2) {
      return NextResponse.json(
        { error: 'Insufficient credits' },
        { status: 201 }
      );
    }

    // Convert file to buffer
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Get original image metadata
    const metadata = await sharp(buffer).metadata();
    
    let sharpInstance = sharp(buffer);

    // Apply resize if dimensions are specified
    if (maxWidth || maxHeight) {
      sharpInstance = sharpInstance.resize({
        width: maxWidth,
        height: maxHeight,
        fit: 'inside', // Maintain aspect ratio
        withoutEnlargement: true // Don't enlarge smaller images
      });
    }

    // Apply compression based on format
    let processedImageBuffer: Buffer;
    let contentType: string;

    switch (format) {
      case 'jpeg':
        processedImageBuffer = await sharpInstance
          .jpeg({ 
            quality: quality,
            progressive: true,
            mozjpeg: true // Use mozjpeg for better compression
          })
          .toBuffer();
        contentType = 'image/jpeg';
        break;
      
      case 'png':
        processedImageBuffer = await sharpInstance
          .png({ 
            quality: quality,
            progressive: true,
            compressionLevel: Math.floor((100 - quality) / 10) // Convert quality to compression level
          })
          .toBuffer();
        contentType = 'image/png';
        break;
      
      case 'webp':
        processedImageBuffer = await sharpInstance
          .webp({ 
            quality: quality,
            effort: 6 // Higher effort for better compression
          })
          .toBuffer();
        contentType = 'image/webp';
        break;
      
      default:
        throw new Error('Unsupported format');
    }

    // Deduct credits
    await prisma.user.update({
      where: { id: session.user.id! },
      data: { credits: { decrement: 2 } }
    });

    // Log the transaction
    await prisma.creditTransaction.create({
      data: {
        userId: session.user.id!,
        amount: 2,
        type: 'USAGE'
      }
    });

    // Return the processed image
    return new NextResponse(processedImageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Length': processedImageBuffer.length.toString(),
        'Cache-Control': 'no-cache',
        'X-Original-Size': buffer.length.toString(),
        'X-Compressed-Size': processedImageBuffer.length.toString(),
        'X-Compression-Ratio': Math.round((1 - processedImageBuffer.length / buffer.length) * 100).toString()
      },
    });

  } catch (error: any) {
    console.error('Image compression error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to compress image' },
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