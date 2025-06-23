/*
  Warnings:

  - The primary key for the `checkout_sessions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `studioId` on the `predictions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[checkout_id]` on the table `checkout_sessions` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `checkout_sessions` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `userId` to the `predictions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "predictions" DROP CONSTRAINT "predictions_studioId_fkey";

-- AlterTable
ALTER TABLE "checkout_sessions" DROP CONSTRAINT "checkout_sessions_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ALTER COLUMN "checkout_id" DROP DEFAULT,
ALTER COLUMN "checkout_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "checkout_sessions_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "checkout_sessions_checkout_id_seq";

-- AlterTable
ALTER TABLE "predictions" DROP COLUMN "studioId",
ADD COLUMN     "predictionData" JSONB,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "checkout_sessions_checkout_id_key" ON "checkout_sessions"("checkout_id");
