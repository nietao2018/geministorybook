import { NextRequest, NextResponse } from 'next/server';
import { replicate } from "@/lib/replicate";
import { env } from "@/env.mjs";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

const Version = {
  tryClothing: "cuuupid/idm-vton:0513734a452173b8173e907e3a59d19a36266e55b48528559432bd21c7d7e985",
}
const MODEL = {
  photoRealStyle: "black-forest-labs/flux-kontext-pro"
}

export async function POST(request: NextRequest) {
  try {

    const session = await auth();
    const userId = session?.user?.id;

    // 校验用户id 是否存在
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { input, model, useCredit, type } = await request.json();

    // 查询用户id 积分
    const creditUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { credits: true },
    });
  
    if (!creditUser || creditUser?.credits < useCredit) {
      return !creditUser ? NextResponse.json({ error: "User not found" }, { status: 404 }) : NextResponse.json({ error: "Price buy credits" }, { status: 201 })
    }
    const newCredits = creditUser.credits - useCredit;


    const webhookUrl = process.env.NODE_ENV === 'development' ? `${env.NGROK}/api/webhooks/replicate` : `${env.NEXT_PUBLIC_APP_URL}/api/webhooks/replicate`;
    // 创建预测表
    const prediction = await prisma.prediction.create({
            data: {
                userId: userId,
                status: "pending",
            },
    });

    // 发起预测
    let response;
    if (type === 'model') {
      response = await replicate.predictions.create({
        model: MODEL[model],
        input: input,
        webhook: `${webhookUrl}?predictionId=${prediction.id}`,
        webhook_events_filter: ["completed"]
      });
    } else {
      response = await replicate.predictions.create({
        version: Version[model],
        input: input,
        webhook: `${webhookUrl}?predictionId=${prediction.id}`,
        webhook_events_filter: ["completed"]
      });
    }
    
  
    console.log(response, response)

    // 更新预测表
    await prisma.prediction.update({
      where: { id: prediction.id },
      data: { 
          pId: response.id,
          status: "processing"
      },
    });

    // 积分扣减
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { credits: newCredits },
    });

    // 创建交易记录
    await prisma.creditTransaction.create({
      data: {
        userId: userId,
        amount: useCredit,
        type: 'USAGE',
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
