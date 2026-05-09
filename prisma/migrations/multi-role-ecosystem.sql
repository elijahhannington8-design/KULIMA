-- Multi-Role Ecosystem Migration
-- This migration adds Supplier and Admin support while maintaining existing data

-- Step 1: Add new enums
CREATE TYPE "SupplierType" AS ENUM ('SEED', 'FERTILIZER', 'EQUIPMENT', 'IRRIGATION', 'AGROCHEMICAL', 'LIVESTOCK_FEED');
CREATE TYPE "AdminRole" AS ENUM ('SUPER_ADMIN', 'MODERATOR', 'SUPPORT');
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED');

-- Step 2: Update existing Role enum to include SUPPLIER
ALTER TYPE "Role" ADD VALUE 'SUPPLIER';

-- Step 3: Add new notification types
ALTER TYPE "NotificationType" ADD VALUE 'ORDER_PLACED';
ALTER TYPE "NotificationType" ADD VALUE 'ORDER_SHIPPED';
ALTER TYPE "NotificationType" ADD VALUE 'VERIFICATION_APPROVED';

-- Step 4: Remove role column from User table (multi-role support)
-- IMPORTANT: This is a breaking change if you have existing data
-- Comment out if you want to keep existing role data temporarily
-- ALTER TABLE "User" DROP COLUMN "role";

-- Step 5: Add verified column to existing profile tables
ALTER TABLE "Farmer" ADD COLUMN "verified" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Buyer" ADD COLUMN "verified" BOOLEAN NOT NULL DEFAULT false;

-- Step 6: Create Supplier table
CREATE TABLE "Supplier" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "supplierType" "SupplierType" NOT NULL,
    "location" TEXT NOT NULL,
    "businessLicense" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "verifiedAt" TIMESTAMP(3),
    "rating" DOUBLE PRECISION DEFAULT 0,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- Step 7: Create Admin table
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "adminRole" "AdminRole" NOT NULL DEFAULT 'MODERATOR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- Step 8: Create SupplierProduct table
CREATE TABLE "SupplierProduct" (
    "id" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "imageUrl" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SupplierProduct_pkey" PRIMARY KEY ("id")
);

-- Step 9: Create SupplierOrder table
CREATE TABLE "SupplierOrder" (
    "id" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SupplierOrder_pkey" PRIMARY KEY ("id")
);

-- Step 10: Create unique constraints
CREATE UNIQUE INDEX "Supplier_userId_key" ON "Supplier"("userId");
CREATE UNIQUE INDEX "Admin_userId_key" ON "Admin"("userId");

-- Step 11: Create indexes for Supplier
CREATE INDEX "Supplier_userId_idx" ON "Supplier"("userId");
CREATE INDEX "Supplier_supplierType_idx" ON "Supplier"("supplierType");
CREATE INDEX "Supplier_verified_idx" ON "Supplier"("verified");

-- Step 12: Create indexes for Admin
CREATE INDEX "Admin_userId_idx" ON "Admin"("userId");
CREATE INDEX "Admin_adminRole_idx" ON "Admin"("adminRole");

-- Step 13: Create indexes for Farmer (new)
CREATE INDEX "Farmer_verified_idx" ON "Farmer"("verified");

-- Step 14: Create indexes for Buyer (new)
CREATE INDEX "Buyer_verified_idx" ON "Buyer"("verified");

-- Step 15: Create indexes for SupplierProduct
CREATE INDEX "SupplierProduct_supplierId_idx" ON "SupplierProduct"("supplierId");
CREATE INDEX "SupplierProduct_active_idx" ON "SupplierProduct"("active");
CREATE INDEX "SupplierProduct_category_idx" ON "SupplierProduct"("category");

-- Step 16: Create indexes for SupplierOrder
CREATE INDEX "SupplierOrder_supplierId_idx" ON "SupplierOrder"("supplierId");
CREATE INDEX "SupplierOrder_buyerId_idx" ON "SupplierOrder"("buyerId");
CREATE INDEX "SupplierOrder_productId_idx" ON "SupplierOrder"("productId");
CREATE INDEX "SupplierOrder_status_idx" ON "SupplierOrder"("status");

-- Step 17: Add foreign keys for Supplier
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Step 18: Add foreign keys for Admin
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Step 19: Add foreign keys for SupplierProduct
ALTER TABLE "SupplierProduct" ADD CONSTRAINT "SupplierProduct_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Step 20: Add foreign keys for SupplierOrder
ALTER TABLE "SupplierOrder" ADD CONSTRAINT "SupplierOrder_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SupplierOrder" ADD CONSTRAINT "SupplierOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "SupplierProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Migration complete!
-- Next steps:
-- 1. Review this migration carefully
-- 2. Apply to your Supabase database
-- 3. Verify all relationships work correctly
-- 4. Test with sample data
