import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

interface UpdateCreditsParams {
  userId: string;
  amount: number;
  type: 'PURCHASE' | 'USAGE' | 'REFUND';
}

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        name: true,
        emailVerified: true,
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  } catch {
    return null;
  }
};

/**
 * 更新用户积分
 * @param params 更新参数
 * @param params.userId 用户ID
 * @param params.amount 积分数量（正数表示增加，负数表示减少）
 * @param params.type 交易类型（PURCHASE: 购买, USAGE: 使用, REFUND: 退款）
 * @returns 更新后的用户信息
 */
export async function updateUserCredits({ userId, amount, type }: UpdateCreditsParams) {
  try {
    // 开启事务，确保积分更新和交易记录的一致性
    const result = await prisma.$transaction(async (tx) => {
      // 获取当前用户信息
      const user = await tx.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }

      // 计算新的积分值
      const newCredits = user.credits + amount;

      // 检查积分是否足够（如果是减少积分）
      if (newCredits < 0) {
        throw new Error('Insufficient credits');
      }

      // 更新用户积分
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: { credits: newCredits },
      });

      // 创建积分交易记录
      await tx.creditTransaction.create({
        data: {
          userId,
          amount: Math.abs(amount), // 存储绝对值
          type,
        },
      });

      return updatedUser;
    });

    return result;
  } catch (error) {
    console.error('Error updating user credits:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}