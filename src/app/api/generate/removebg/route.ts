import { NextRequest, NextResponse } from 'next/server';
import { replicate } from "@/lib/replicate";
import { env } from "@/env.mjs";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { image } = await request.json();
    
    if (!image) {
      return NextResponse.json(
        { error: 'No image data provided' },
        { status: 400 }
      );
    }

    const input =  {
      image: `data:image/jpeg;base64,${image}`,
    }

    const webhookUrl = process.env.NODE_ENV === 'development' ? `${env.NGROK}/api/webhooks/replicate` : `${env.NEXT_PUBLIC_APP_URL}/api/webhooks/replicate`;
    console.log("webhookUrl", webhookUrl);
    const prediction = await prisma.prediction.create({
            data: {
                userId: session?.user?.id,
                status: "pending",
            },
    });

    const response = await replicate.predictions.create({
      version: "95fcc2a26d3899cd6c2691c900465aaeff466285a65c14638cc5f36f34befaf1",
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
