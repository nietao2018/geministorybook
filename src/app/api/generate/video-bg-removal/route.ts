import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const videoFile = formData.get('video') as File;
    const options = JSON.parse(formData.get('options') as string || '{}');

    if (!videoFile) {
      return NextResponse.json({ error: 'No video file provided' }, { status: 400 });
    }

    // 验证文件类型
    const allowedTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/webm', 'video/quicktime'];
    if (!allowedTypes.includes(videoFile.type)) {
      return NextResponse.json({ 
        error: 'Invalid file type. Only MP4, MOV, AVI, and WebM files are supported.' 
      }, { status: 400 });
    }

    // 验证文件大小 (500MB)
    const maxSize = 500 * 1024 * 1024;
    if (videoFile.size > maxSize) {
      return NextResponse.json({ 
        error: 'File size exceeds 500MB limit' 
      }, { status: 400 });
    }

    // 模拟视频背景移除处理
    // 在实际应用中，这里会调用真正的AI服务
    await new Promise(resolve => setTimeout(resolve, 8000)); // 模拟处理时间

    // 创建一个示例处理结果
    const processedVideoBuffer = Buffer.from('processed-video-data');
    
    // 根据选项确定输出格式
    const outputFormat = options.outputFormat || 'mp4';
    const mimeType = `video/${outputFormat}`;
    
    return new NextResponse(processedVideoBuffer, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': `attachment; filename="bg_removed_${videoFile.name}"`,
      },
    });

  } catch (error) {
    console.error('Video background removal error:', error);
    return NextResponse.json({ 
      error: 'Internal server error during video processing' 
    }, { status: 500 });
  }
}