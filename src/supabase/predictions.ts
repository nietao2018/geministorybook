import { prisma } from '@/lib/db';

/**
 * 根据 userId 查询所有 predictions
 * @param userId 用户ID
 * @returns predictions 列表
 */
export async function getPredictionsByUserId(userId: string) {
  return prisma.prediction.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
}
