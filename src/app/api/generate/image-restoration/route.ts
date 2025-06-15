import { NextRequest, NextResponse } from 'next/server';
import { replicate } from "@/lib/replicate";
import { env } from "@/env.mjs";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json();
    
    if (!image) {
      return NextResponse.json(
        { error: 'No image data provided' },
        { status: 400 }
      );
    }

    const input =  {
      input_image: image,
      prompt: 'Restore your old photo to a fresh state'
    }

    const webhookUrl = process.env.NODE_ENV === 'development' ? `${env.NGROK}/api/webhooks/replicate` : `${env.NEXT_PUBLIC_APP_URL}/api/webhooks/replicate`;
    console.log("webhookUrl", webhookUrl);
    const prediction = await prisma.prediction.create({
            data: {
                studioId: 'cmbx4ftdr000314jmjt3rq2st',
                status: "pending",
            },
    });

    const response = await replicate.predictions.create({
      model: "black-forest-labs/flux-kontext-pro",
      input: input,
      webhook: `${webhookUrl}?predictionId=${prediction.id}`,
      webhook_events_filter: ["completed"]
    });
  
    console.log(response, response)

    await prisma.prediction.update({
      where: { id: prediction.id },
      data: { 
          pId: response.id,
          status: "processing"
      },
    });

    return NextResponse.json({ 
      success: true, 
      id: prediction.id 
    },
    {
      status: 200
    });

  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
