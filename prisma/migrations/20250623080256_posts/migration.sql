/*
  Warnings:

  - Made the column `content` on table `posts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "blog"."posts" ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "content" SET NOT NULL,
ALTER COLUMN "publish_time" SET DATA TYPE TIMESTAMP(3);
