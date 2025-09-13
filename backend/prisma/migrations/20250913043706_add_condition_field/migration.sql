/*
  Warnings:

  - You are about to drop the column `video` on the `Resource` table. All the data in the column will be lost.
  - Added the required column `borrowingPeriod` to the `Resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `condition` to the `Resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupLocation` to the `Resource` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Resource` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "public"."conditions" AS ENUM ('Like_New', 'Good', 'Fair', 'Need_Repair');

-- AlterTable
ALTER TABLE "public"."Resource" DROP COLUMN "video",
ADD COLUMN     "borrowingPeriod" INTEGER NOT NULL,
ADD COLUMN     "condition" "public"."conditions" NOT NULL,
ADD COLUMN     "included" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "pickupLocation" TEXT NOT NULL,
ADD COLUMN     "securityDeposit" TEXT,
ADD COLUMN     "specialInstruction" TEXT,
ALTER COLUMN "description" SET NOT NULL;
