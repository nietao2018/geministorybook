-- CreateEnum
CREATE TYPE "SessionType" AS ENUM ('ONE_TIME', 'SUBSCRIPTION');

-- CreateEnum
CREATE TYPE "CheckoutStatus" AS ENUM ('PENDING', 'PAID', 'EXPIRED', 'FAILED');

-- CreateTable
CREATE TABLE "checkout_sessions" (
    "checkout_id" BIGSERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "session_type" "SessionType" NOT NULL,
    "product_id" TEXT,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT DEFAULT 'USD',
    "status" "CheckoutStatus" NOT NULL DEFAULT 'PENDING',
    "success_redirect_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paid_at" TIMESTAMP(3),

    CONSTRAINT "checkout_sessions_pkey" PRIMARY KEY ("checkout_id")
);

-- AddForeignKey
ALTER TABLE "checkout_sessions" ADD CONSTRAINT "checkout_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
