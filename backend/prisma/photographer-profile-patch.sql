-- Idempotent patch for photographer profile editing fields.
-- Run this in your PostgreSQL/Supabase SQL editor.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS "Profile" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "userId" TEXT NOT NULL UNIQUE,
  "displayName" TEXT,
  "contactEmail" TEXT,
  "contactPhone" TEXT,
  "bio" TEXT,
  "servicesOffered" TEXT,
  "pricingInfo" TEXT,
  "portfolioVisibility" TEXT NOT NULL DEFAULT 'public',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "Profile" ADD COLUMN IF NOT EXISTS "displayName" TEXT;
ALTER TABLE "Profile" ADD COLUMN IF NOT EXISTS "contactEmail" TEXT;
ALTER TABLE "Profile" ADD COLUMN IF NOT EXISTS "contactPhone" TEXT;
ALTER TABLE "Profile" ADD COLUMN IF NOT EXISTS "bio" TEXT;
ALTER TABLE "Profile" ADD COLUMN IF NOT EXISTS "servicesOffered" TEXT;
ALTER TABLE "Profile" ADD COLUMN IF NOT EXISTS "pricingInfo" TEXT;
ALTER TABLE "Profile" ADD COLUMN IF NOT EXISTS "portfolioVisibility" TEXT NOT NULL DEFAULT 'public';
ALTER TABLE "Profile" ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Profile" ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

CREATE UNIQUE INDEX IF NOT EXISTS "Profile_userId_key" ON "Profile" ("userId");

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'Profile_userId_fkey'
  ) THEN
    ALTER TABLE "Profile"
      ADD CONSTRAINT "Profile_userId_fkey"
      FOREIGN KEY ("userId")
      REFERENCES "User" ("id")
      ON DELETE CASCADE
      ON UPDATE CASCADE;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS "Organization" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "userId" TEXT NOT NULL UNIQUE,
  "orgName" TEXT,
  "website" TEXT,
  "address" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "Organization" ADD COLUMN IF NOT EXISTS "orgName" TEXT;
ALTER TABLE "Organization" ADD COLUMN IF NOT EXISTS "website" TEXT;
ALTER TABLE "Organization" ADD COLUMN IF NOT EXISTS "address" TEXT;
ALTER TABLE "Organization" ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Organization" ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

CREATE UNIQUE INDEX IF NOT EXISTS "Organization_userId_key" ON "Organization" ("userId");

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'Organization_userId_fkey'
  ) THEN
    ALTER TABLE "Organization"
      ADD CONSTRAINT "Organization_userId_fkey"
      FOREIGN KEY ("userId")
      REFERENCES "User" ("id")
      ON DELETE CASCADE
      ON UPDATE CASCADE;
  END IF;
END $$;
