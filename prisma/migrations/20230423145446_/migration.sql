-- CreateEnum
CREATE TYPE "NotePermission" AS ENUM ('EDIT', 'ARCHIVE', 'DELETE');

-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "sharedPermissions" "NotePermission"[] DEFAULT ARRAY[]::"NotePermission"[];
