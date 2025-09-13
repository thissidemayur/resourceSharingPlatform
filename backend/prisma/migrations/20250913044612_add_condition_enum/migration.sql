/*
  Warnings:

  - Changed the type of `condition` on the `Resource` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."Condition" AS ENUM ('Like_New', 'Good', 'Fair', 'Need_Repair');

-- AlterTable
ALTER TABLE "public"."Resource" DROP COLUMN "condition",
ADD COLUMN     "condition" "public"."Condition" NOT NULL;

-- DropEnum
DROP TYPE "public"."conditions";
