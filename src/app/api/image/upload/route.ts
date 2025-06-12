import { NextRequest, NextResponse } from 'next/server';
import { uploadBase64ToR2 } from '@/actions/upload-to-r2';

export async function POST(request: NextRequest) {
    try {
        const { image, fileName } = await request.json();

        if (!image || !fileName) {
            return NextResponse.json(
                { error: 'Image and fileName are required' },
                { status: 400 }
            );
        }

        // 使用 uploadBase64ToR2 函数上传图片
        const fileUrl = await uploadBase64ToR2(image, fileName);
        
        return NextResponse.json({
            success: true,
            url: fileUrl
        });
    } catch (error) {
        console.error('Error uploading to R2:', error);
        return NextResponse.json(
            { error: 'Failed to upload file to R2' },
            { status: 500 }
        );
    }
} 