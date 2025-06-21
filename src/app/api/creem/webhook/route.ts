import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { updateCheckoutSession, getUserIdByProductId, getCheckoutSessionStatusById } from '@/supabase/checkout_sessions'
import { updateUserCredits } from '@/supabase/user'
import { env } from '@/env.mjs'
import { pricingData } from "@/config/credits-plan";

function verifyCreemSignature(payload: string, signature: string): boolean {
  try {
    const computedSignature = crypto
      .createHmac('sha256', env.SIGNATURE)
      .update(payload)
      .digest('hex');
    
    return computedSignature === signature;
  } catch (error) {
    console.error('Error verifying signature:', error);
    return false;
  }
}

function getCreditsAmountByProductId(productId: string) {
  return pricingData.find(item => item.productId === productId) || null;
}

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get('creem-signature');

    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 401 });
    }

    // 验证签名
    if (!verifyCreemSignature(body, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const payload = JSON.parse(body);
    const { eventType, object } = payload;
    const productData = getCreditsAmountByProductId(object?.order?.product)

    //查询checkout状态
    const status = await getCheckoutSessionStatusById(object?.id)

    // 更新checkout_sessions
    if (eventType === 'checkout.completed' && status === 'PAID' && productData) {
      await updateCheckoutSession({
        checkoutId: object?.id,
        updates: {
          status: 'PAID',
          paidAt: new Date()
        }
      });

      const userId = await getUserIdByProductId(object?.id)

      userId && await updateUserCredits({
        userId,
        amount: productData.quantity,
        type: "PURCHASE"
      })
    }

    // 处理订阅相关事件
    if (eventType === 'subscription.created' || 
        eventType === 'subscription.updated' || 
        eventType === 'subscription.cancelled') {
      
      const { subscription_id, status, user_id } = object;

      // 更新checkout session状态
      // await prisma.checkoutSession.updateMany({
      //   where: {
      //     checkoutId: subscription_id,
      //     sessionType: 'SUBSCRIPTION'
      //   },
      //   data: {
      //     status: status === 'active' ? 'PAID' : 
      //            status === 'cancelled' ? 'EXPIRED' : 'FAILED',
      //     paidAt: status === 'active' ? new Date() : undefined
      //   }
      // });

      // 如果是订阅创建或更新，更新用户的订阅状态
      // if (eventType === 'subscription.created' || eventType === 'subscription.updated') {
      //   if (status === 'active') {
      //     // 更新用户积分或订阅状态
      //     await prisma.user.update({
      //       where: { id: user_id },
      //       data: {
      //         // 根据业务需求更新相关字段
      //       }
      //     });
      //   }
      // }
    }

    return NextResponse.json({ success: true }, { status: 200});
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
