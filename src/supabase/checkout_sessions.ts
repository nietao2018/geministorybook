import { prisma } from "@/lib/db";

export async function createCheckoutSession({
  checkoutId,
  userId,
  sessionType,
  productId,
  amount,
  successRedirectUrl,
}: {
  checkoutId: string;
  userId: string;
  sessionType: "ONE_TIME" | "SUBSCRIPTION";
  productId: string;
  amount: number;
  successRedirectUrl?: string;
}) {
  try {
    // 首先检查用户是否存在
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    const checkoutSession = await prisma.checkoutSession.create({
      data: {
        checkoutId: checkoutId,
        userId,
        sessionType,
        productId,
        amount,
        successRedirectUrl,
      },
    });
    
    return checkoutSession;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// 更新 checkout_session
export async function updateCheckoutSession({
  checkoutId,
  updates,
}: {
  checkoutId: string;
  updates: {
    status?: "PENDING" | "PAID" | "EXPIRED" | "FAILED";
    paidAt?: Date | null;
    successRedirectUrl?: string;
  };
}) {  
  try {
    const updatedSession = await prisma.checkoutSession.update({
      where: {
        checkoutId,
      },
      data: {
        ...updates,
        ...(updates.status === "PAID" && !updates.paidAt ? { paidAt: new Date() } : {}),
      },
    });
    
    return updatedSession;
  } catch (error) {
    console.error("Error updating checkout session:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}


// 依据productId查询userId
export const getUserIdByProductId = async (checkoutId: string) => {
 try {
   const checkoutSession = await prisma.checkoutSession.findFirst({
     where: {
      checkoutId,
      status: 'PAID'
     },
     select: {
       userId: true
     },
     orderBy: {
       createdAt: 'desc'
     }
   });

   return checkoutSession?.userId || null;
 } catch (error) {
   console.error('Error getting user ID by product ID:', error);
   return null;
 }
};