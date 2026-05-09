-- Kulima Platform Database Migration
-- Generated from Prisma Schema

-- Create Enums
CREATE TYPE "Role" AS ENUM ('FARMER', 'BUYER', 'ADMIN');
CREATE TYPE "CropCycleStatus" AS ENUM ('PLANNED', 'ACTIVE', 'HARVESTED', 'FAILED');
CREATE TYPE "ListingStatus" AS ENUM ('DRAFT', 'ACTIVE', 'SOLD', 'EXPIRED');
CREATE TYPE "OfferStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'WITHDRAWN');
CREATE TYPE "NotificationType" AS ENUM ('OFFER_RECEIVED', 'OFFER_ACCEPTED', 'OFFER_REJECTED', 'PRICE_ALERT', 'WEATHER_ALERT');
CREATE TYPE "NotificationChannel" AS ENUM ('SMS', 'EMAIL', 'PUSH');
CREATE TYPE "NotificationStatus" AS ENUM ('PENDING', 'SENT', 'FAILED');
CREATE TYPE "LoanStatus" AS ENUM ('PENDING', 'APPROVED', 'DISBURSED', 'REPAID', 'DEFAULTED');

-- Create Tables
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "phoneNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Farmer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "nationalId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Farmer_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Buyer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "businessType" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Buyer_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Farm" (
    "id" TEXT NOT NULL,
    "farmerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "sizeInAcres" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Farm_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "CropCycle" (
    "id" TEXT NOT NULL,
    "farmId" TEXT NOT NULL,
    "cropType" TEXT NOT NULL,
    "plantingDate" TIMESTAMP(3) NOT NULL,
    "expectedHarvestDate" TIMESTAMP(3) NOT NULL,
    "actualHarvestDate" TIMESTAMP(3),
    "status" "CropCycleStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CropCycle_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Listing" (
    "id" TEXT NOT NULL,
    "farmerId" TEXT NOT NULL,
    "cropType" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "pricePerUnit" DOUBLE PRECISION NOT NULL,
    "status" "ListingStatus" NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Offer" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "offerAmount" DOUBLE PRECISION NOT NULL,
    "status" "OfferStatus" NOT NULL,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "channel" "NotificationChannel" NOT NULL,
    "message" TEXT NOT NULL,
    "status" "NotificationStatus" NOT NULL,
    "sentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "MarketPrice" (
    "id" TEXT NOT NULL,
    "cropType" TEXT NOT NULL,
    "pricePerUnit" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "source" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MarketPrice_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "LoanProfile" (
    "id" TEXT NOT NULL,
    "farmerId" TEXT NOT NULL,
    "loanAmount" DOUBLE PRECISION NOT NULL,
    "interestRate" DOUBLE PRECISION NOT NULL,
    "status" "LoanStatus" NOT NULL,
    "disbursementDate" TIMESTAMP(3),
    "repaymentDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoanProfile_pkey" PRIMARY KEY ("id")
);

-- Create Unique Constraints
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "Farmer_userId_key" ON "Farmer"("userId");
CREATE UNIQUE INDEX "Buyer_userId_key" ON "Buyer"("userId");
CREATE UNIQUE INDEX "LoanProfile_farmerId_key" ON "LoanProfile"("farmerId");

-- Create Indexes
CREATE INDEX "User_email_idx" ON "User"("email");
CREATE INDEX "User_role_idx" ON "User"("role");
CREATE INDEX "Farmer_userId_idx" ON "Farmer"("userId");
CREATE INDEX "Buyer_userId_idx" ON "Buyer"("userId");
CREATE INDEX "Farm_farmerId_idx" ON "Farm"("farmerId");
CREATE INDEX "CropCycle_farmId_idx" ON "CropCycle"("farmId");
CREATE INDEX "CropCycle_status_idx" ON "CropCycle"("status");
CREATE INDEX "Listing_farmerId_idx" ON "Listing"("farmerId");
CREATE INDEX "Listing_status_idx" ON "Listing"("status");
CREATE INDEX "Listing_farmerId_status_idx" ON "Listing"("farmerId", "status");
CREATE INDEX "Offer_listingId_idx" ON "Offer"("listingId");
CREATE INDEX "Offer_buyerId_idx" ON "Offer"("buyerId");
CREATE INDEX "Offer_status_idx" ON "Offer"("status");
CREATE INDEX "Notification_userId_idx" ON "Notification"("userId");
CREATE INDEX "Notification_status_idx" ON "Notification"("status");
CREATE INDEX "Notification_userId_status_idx" ON "Notification"("userId", "status");
CREATE INDEX "MarketPrice_date_idx" ON "MarketPrice"("date");
CREATE INDEX "MarketPrice_location_idx" ON "MarketPrice"("location");
CREATE INDEX "MarketPrice_cropType_location_date_idx" ON "MarketPrice"("cropType", "location", "date");
CREATE INDEX "LoanProfile_farmerId_idx" ON "LoanProfile"("farmerId");
CREATE INDEX "LoanProfile_status_idx" ON "LoanProfile"("status");

-- Add Foreign Keys
ALTER TABLE "Farmer" ADD CONSTRAINT "Farmer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Buyer" ADD CONSTRAINT "Buyer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Farm" ADD CONSTRAINT "Farm_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CropCycle" ADD CONSTRAINT "CropCycle_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Buyer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "LoanProfile" ADD CONSTRAINT "LoanProfile_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
