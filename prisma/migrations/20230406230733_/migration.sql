UPDATE "Note"
SET "createdAt" = NOW()
WHERE "createdAt" IS NULL;
UPDATE "Note"
SET "updatedAt" = NOW()
WHERE "updatedAt" IS NULL;
-- AlterTable
ALTER TABLE "Note" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;
