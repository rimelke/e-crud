-- AlterTable
ALTER TABLE "users" ADD COLUMN     "activationExpires" TIMESTAMPTZ,
ADD COLUMN     "activationToken" VARCHAR,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;
