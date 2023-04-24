/*
  Warnings:

  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `Tag` table. All the data in the column will be lost.
  - The primary key for the `TagsOnNotes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `TagsOnNotes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_userId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnNotes" DROP CONSTRAINT "TagsOnNotes_userId_name_fkey";

-- AlterTable
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_pkey",
DROP COLUMN "userId",
ADD CONSTRAINT "Tag_pkey" PRIMARY KEY ("name");

-- AlterTable
ALTER TABLE "TagsOnNotes" DROP CONSTRAINT "TagsOnNotes_pkey",
DROP COLUMN "userId",
ADD CONSTRAINT "TagsOnNotes_pkey" PRIMARY KEY ("noteId", "name");

-- AddForeignKey
ALTER TABLE "TagsOnNotes" ADD CONSTRAINT "TagsOnNotes_name_fkey" FOREIGN KEY ("name") REFERENCES "Tag"("name") ON DELETE CASCADE ON UPDATE CASCADE;
