# Implementation Plan: Platform Architecture Foundation

## Overview

This implementation plan establishes the production-grade technical foundation for the Kulima agriculture platform. The tasks are organized to build incrementally from project initialization through core infrastructure setup, ensuring each step validates functionality before proceeding. The implementation uses Next.js 14 App Router, TypeScript strict mode, Prisma ORM with Supabase PostgreSQL, and follows enterprise-grade patterns for security, scalability, and maintainability.

## Implementation Strategy

- **Incremental Validation**: Each major section ends with a checkpoint to verify functionality
- **Configuration First**: Set up tooling and configuration before writing application code
- **Type Safety**: Establish TypeScript strict mode and validation schemas early
- **Database Safety**: Use safe migration patterns and connection pooling
- **Testing Optional**: Test tasks are marked optional (*) for faster MVP iteration
- **No Placeholder Data**: Focus on production-ready infrastructure without demo data

## Tasks

- [x] 1. Initialize Next.js project with TypeScript
  - Create new Next.js 14 project with App Router and TypeScript
  - Configure package.json with project metadata
  - Install core dependencies: React 18, Next.js 14, TypeScript
  - Verify project runs with `npm run dev`
  - _Requirements: 16.1, 16.2, 16.3_

- [x] 2. Configure TypeScript strict mode
  - [x] 2.1 Set up tsconfig.json with strict compiler options
    - Enable strict mode, noUncheckedIndexedAccess, noImplicitReturns
    - Configure module resolution to "bundler"
    - Set target to ES2022
    - Configure absolute imports with @ alias
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6, 15.7, 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_
  
  - [x] 2.2 Create type definition files
    - Create src/types/index.ts for shared types
    - Create src/types/api.ts for API response types
    - _Requirements: 1.7_

- [x] 3. Set up folder structure
  - Create src/app directory with route groups: (farmer), (buyer), (admin)
  - Create src/components with subdirectories: ui, features, layouts
  - Create src/lib with subdirectories: api, validations
  - Create src/server directory for server-only code
  - Create src/types directory for TypeScript definitions
  - Create prisma directory for database schema
  - _Requirements: 1.1, 1.2, 1.3, 1.5, 1.6, 1.7, 1.8, 10.1, 10.2, 10.3_

- [x] 4. Configure code quality tools
  - [x] 4.1 Install and configure ESLint
    - Install ESLint with Next.js and TypeScript plugins
    - Configure .eslintrc.json with Next.js recommended rules
    - Add TypeScript strict rules
    - Configure import order rules
    - Add lint script to package.json
    - _Requirements: 9.1, 9.2, 9.5, 9.7_
  
  - [x] 4.2 Install and configure Prettier
    - Install Prettier and eslint-config-prettier
    - Create .prettierrc with formatting rules
    - Configure Prettier to work with ESLint
    - Add format script to package.json
    - _Requirements: 9.3, 9.4, 9.6_

- [x] 5. Configure environment variables with validation
  - [x] 5.1 Create environment configuration system
    - Install Zod for schema validation
    - Create src/lib/env.ts with Zod schema for environment variables
    - Define required variables: DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL
    - Define Supabase variables: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
    - Define SMS provider variables: SMS_PROVIDER_API_KEY, SMS_PROVIDER_SENDER_ID
    - Validate environment variables at application startup
    - Export type-safe environment object
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_
  
  - [x] 5.2 Create .env.example template
    - Document all required environment variables
    - Include example values and descriptions
    - Add instructions for obtaining API keys
    - _Requirements: 17.5_

- [x] 6. Set up Prisma ORM with Supabase PostgreSQL
  - [x] 6.1 Install Prisma dependencies
    - Install @prisma/client in dependencies
    - Install prisma CLI in devDependencies
    - Add Prisma scripts to package.json: db:migrate, db:generate, db:studio, db:reset:dev
    - _Requirements: 16.4, 18.1, 18.2, 18.3, 18.4, 18.5_
  
  - [x] 6.2 Initialize Prisma with PostgreSQL
    - Run `prisma init` to create prisma directory
    - Configure datasource to use PostgreSQL
    - Set DATABASE_URL in .env
    - _Requirements: 1.4, 18.6_
  
  - [x] 6.3 Create singleton Prisma Client
    - Create src/server/db.ts with singleton pattern
    - Implement development hot-reload protection
    - Export prisma client instance
    - Add "server-only" package import
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 13.1, 13.4_

- [-] 7. Define comprehensive database schema
  - [x] 7.1 Define User model
    - Create User model with id, email, passwordHash, role, phoneNumber
    - Add timestamps: createdAt, updatedAt
    - Add unique constraint on email
    - Define Role enum: FARMER, BUYER, ADMIN
    - _Requirements: 3.1_
  
  - [x] 7.2 Define Farmer and Buyer models
    - Create Farmer model with userId, fullName, location, nationalId
    - Create Buyer model with userId, businessName, businessType, location
    - Add one-to-one relationships to User model
    - Add timestamps to both models
    - _Requirements: 3.2, 3.3_
  
  - [x] 7.3 Define Farm and CropCycle models
    - Create Farm model with farmerId, name, location, sizeInAcres
    - Create CropCycle model with farmId, cropType, plantingDate, expectedHarvestDate, actualHarvestDate, status
    - Add relationships: Farmer has many Farms, Farm has many CropCycles
    - Add indexes on foreign keys
    - Define CropCycleStatus enum: PLANNED, ACTIVE, HARVESTED, FAILED
    - _Requirements: 3.4, 3.5_
  
  - [x] 7.4 Define Listing and Offer models
    - Create Listing model with farmerId, cropType, quantity, pricePerUnit, status, description
    - Create Offer model with listingId, buyerId, offerAmount, status, message
    - Add relationships: Farmer has many Listings, Buyer has many Offers, Listing has many Offers
    - Add indexes on status fields for filtering
    - Define ListingStatus enum: DRAFT, ACTIVE, SOLD, EXPIRED
    - Define OfferStatus enum: PENDING, ACCEPTED, REJECTED, WITHDRAWN
    - _Requirements: 3.6, 3.7_
  
  - [x] 7.5 Define Notification model
    - Create Notification model with userId, type, channel, message, status, sentAt
    - Add relationship to User model
    - Add index on userId and status
    - Define NotificationType enum: OFFER_RECEIVED, OFFER_ACCEPTED, OFFER_REJECTED, PRICE_ALERT, WEATHER_ALERT
    - Define NotificationChannel enum: SMS, EMAIL, PUSH
    - Define NotificationStatus enum: PENDING, SENT, FAILED
    - _Requirements: 3.8_
  
  - [x] 7.6 Define MarketPrice and LoanProfile models
    - Create MarketPrice model with cropType, pricePerUnit, location, date, source
    - Create LoanProfile model with farmerId, loanAmount, interestRate, status, disbursementDate, repaymentDate
    - Add relationship: Farmer has one LoanProfile
    - Add index on MarketPrice date and location
    - Define LoanStatus enum: PENDING, APPROVED, DISBURSED, REPAID, DEFAULTED
    - _Requirements: 3.9, 3.10_
  
  - [-] 7.7 Run initial migration
    - Generate Prisma Client with `npm run db:generate`
    - Create initial migration with `npm run db:migrate:dev`
    - Verify schema in Prisma Studio
    - _Requirements: 18.1, 18.2, 18.4_

- [ ] 8. Checkpoint - Verify database setup
  - Ensure Prisma Client generates without errors
  - Ensure database connection works
  - Ensure all models are created in database
  - Ask the user if questions arise

- [x] 9. Create API response utilities
  - [x] 9.1 Create standardized response functions
    - Create src/lib/api/responses.ts
    - Implement successResponse() function returning status 200
    - Implement errorResponse() function with status code and error code
    - Implement validationErrorResponse() for Zod errors
    - Implement unauthorizedResponse() returning status 401
    - Implement forbiddenResponse() returning status 403
    - Implement notFoundResponse() returning status 404
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_
  
  - [x] 9.2 Define TypeScript types for responses
    - Create ApiResponse<T> type for success responses
    - Create ApiError type for error responses
    - Export types from src/types/api.ts
    - _Requirements: 5.7_
  
  - [ ]* 9.3 Write unit tests for response utilities
    - Test successResponse returns correct format
    - Test errorResponse includes error code
    - Test validationErrorResponse formats Zod errors
    - Test all status codes are correct
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

- [x] 10. Create validation schemas
  - [x] 10.1 Create authentication validation schemas
    - Create src/lib/validations/auth.ts
    - Define registerSchema with email, password, role, phoneNumber
    - Define loginSchema with email and password
    - Validate email format
    - Validate password minimum 8 characters
    - Validate phone number in E.164 format (+254...)
    - Export TypeScript types from schemas
    - _Requirements: 6.1, 6.2, 6.8_
  
  - [x] 10.2 Create farm and crop validation schemas
    - Create src/lib/validations/farm.ts
    - Define createFarmSchema with name, location, sizeInAcres
    - Define createCropCycleSchema with cropType, plantingDate, expectedHarvestDate
    - Validate required fields and data types
    - Export TypeScript types from schemas
    - _Requirements: 6.3, 6.4_
  
  - [x] 10.3 Create marketplace validation schemas
    - Create src/lib/validations/marketplace.ts
    - Define createListingSchema with cropType, quantity, pricePerUnit, description
    - Define createOfferSchema with offerAmount and message
    - Validate numeric fields are positive
    - Export TypeScript types from schemas
    - _Requirements: 6.5, 6.6, 6.7_
  
  - [ ]* 10.4 Write unit tests for validation schemas
    - Test valid inputs pass validation
    - Test invalid emails are rejected
    - Test short passwords are rejected
    - Test invalid phone formats are rejected
    - Test negative numbers are rejected
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.8_

- [x] 11. Create error handling infrastructure
  - [x] 11.1 Define custom error classes
    - Create src/lib/errors.ts
    - Define AppError base class with message, code, statusCode
    - Define ValidationError extending AppError
    - Define UnauthorizedError extending AppError
    - Define ForbiddenError extending AppError
    - Define NotFoundError extending AppError
    - _Requirements: 7.1, 7.4, 7.6_
  
  - [x] 11.2 Create error translation utilities
    - Create translatePrismaError() function for database errors
    - Create formatZodError() function for validation errors
    - Implement error sanitization to prevent sensitive data leakage
    - _Requirements: 7.3, 7.4, 7.5_
  
  - [x] 11.3 Create structured logging utility
    - Create src/lib/logger.ts
    - Implement log() function with levels: info, warn, error, debug
    - Include context: userId, requestId, path, method, duration
    - Use JSON format in production, human-readable in development
    - _Requirements: 7.2_
  
  - [x] 11.4 Create React error boundary component
    - Create src/components/ErrorBoundary.tsx
    - Catch rendering errors and display user-friendly message
    - Log errors with full context
    - _Requirements: 7.7_

- [x] 12. Set up Supabase authentication integration
  - [x] 12.1 Install Supabase dependencies
    - Install @supabase/supabase-js and @supabase/ssr
    - Add Supabase environment variables to env.ts validation
    - _Requirements: 4.1_
  
  - [x] 12.2 Create Supabase client utilities
    - Create src/lib/supabase/server.ts for server-side client
    - Create src/lib/supabase/client.ts for client-side client
    - Create src/lib/supabase/middleware.ts for session refresh
    - Use cookies for session management
    - _Requirements: 13.2, 13.3_
  
  - [x] 12.3 Create authentication service layer
    - Create src/server/auth.ts with server-only import
    - Implement createSession() function
    - Implement getSession() function
    - Implement requireAuth() function that throws UnauthorizedError
    - Implement requireRole() function that throws ForbiddenError
    - _Requirements: 13.1, 13.2, 13.4_

- [x] 13. Create middleware for session management
  - Create src/middleware.ts
  - Implement session refresh using Supabase SSR
  - Protect route groups: (farmer), (buyer), (admin)
  - Redirect unauthenticated users to login
  - Validate user role matches route group
  - _Requirements: 1.2_

- [-] 14. Set up TailwindCSS with design tokens
  - [x] 14.1 Install and configure TailwindCSS
    - Install tailwindcss, postcss, autoprefixer
    - Run `npx tailwindcss init -p`
    - Configure content paths in tailwind.config.ts
    - Import Tailwind directives in global CSS
    - _Requirements: 16.5_
  
  - [x] 14.2 Define design tokens in Tailwind config
    - Extend theme with color palette: primary, secondary, success, warning, error, neutral
    - Define spacing scale
    - Define typography scale with font families, sizes, weights
    - Define mobile-first breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
    - Define border radius values
    - Define shadow values
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7, 12.1, 12.3_
  
  - [ ] 14.3 Configure viewport for mobile rendering
    - Add viewport meta tag in root layout
    - Configure touch target sizes
    - _Requirements: 12.2, 12.5_

- [x] 15. Create base component architecture
  - [ ] 15.1 Create layout components
    - Create src/components/layouts/RootLayout.tsx
    - Create src/components/layouts/FarmerLayout.tsx for (farmer) routes
    - Create src/components/layouts/BuyerLayout.tsx for (buyer) routes
    - Create src/components/layouts/AdminLayout.tsx for (admin) routes
    - Use TypeScript for all components
    - Apply responsive Tailwind classes
    - _Requirements: 10.3, 10.4, 10.5, 12.4_
  
  - [ ] 15.2 Create primitive UI components
    - Create src/components/ui/Button.tsx with variants
    - Create src/components/ui/Input.tsx with validation states
    - Create src/components/ui/Card.tsx for content containers
    - Use named exports for all components
    - Colocate styles using Tailwind classes
    - _Requirements: 10.1, 10.6, 10.7_
  
  - [ ] 15.3 Set up component organization structure
    - Create src/components/features directory
    - Add README.md documenting component organization
    - _Requirements: 10.2_

- [ ] 16. Configure state management libraries
  - [ ] 16.1 Set up TanStack Query
    - Install @tanstack/react-query
    - Create src/lib/query-client.ts
    - Configure QueryClientProvider in root layout
    - Set default staleTime and cacheTime
    - _Requirements: 16.7_
  
  - [ ] 16.2 Set up Zustand
    - Install zustand
    - Create example store in src/lib/stores/ui-store.ts
    - Document state management boundaries in comments
    - _Requirements: 16.8_

- [ ] 17. Create API route structure
  - Create src/app/api/auth directory with route.ts placeholders
  - Create src/app/api/farmers directory with route.ts placeholders
  - Create src/app/api/buyers directory with route.ts placeholders
  - Create src/app/api/farms directory with route.ts placeholders
  - Create src/app/api/crop-cycles directory with route.ts placeholders
  - Create src/app/api/listings directory with route.ts placeholders
  - Create src/app/api/offers directory with route.ts placeholders
  - Create src/app/api/notifications directory with route.ts placeholders
  - Create src/app/api/market-prices directory with route.ts placeholders
  - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5, 19.6, 19.7, 19.8, 19.9_

- [-] 18. Configure Git repository
  - [ ] 18.1 Create .gitignore file
    - Exclude node_modules
    - Exclude .next build directory
    - Exclude .env files (keep .env.example)
    - Exclude .DS_Store and OS files
    - _Requirements: 17.1, 17.2, 17.3, 17.4_
  
  - [ ] 18.2 Initialize Git repository
    - Run `git init`
    - Create initial commit with project structure
    - _Requirements: 17.7_

- [ ] 19. Configure deployment settings
  - [ ] 19.1 Add build and deployment scripts
    - Add build script to package.json
    - Add start script to package.json
    - Add postinstall script for Prisma generation
    - _Requirements: 14.1, 14.2, 14.3, 14.4_
  
  - [ ] 19.2 Configure Next.js for production
    - Configure next.config.js for Vercel serverless
    - Enable React strict mode
    - Configure image optimization domains
    - _Requirements: 14.5_

- [ ] 20. Create comprehensive README documentation
  - [ ] 20.1 Write README.md
    - Add project description and overview
    - Document prerequisites: Node.js 18+, npm/pnpm
    - Document installation steps
    - Document environment variable setup with .env.example reference
    - Document database setup: Prisma migration commands
    - Document development server start: `npm run dev`
    - Document build and deployment: `npm run build`, `npm start`
    - Document project structure with folder descriptions
    - Document technology stack with version numbers
    - _Requirements: 20.1, 20.2, 20.3, 20.4, 20.5, 20.6, 20.7, 20.8, 20.9, 14.6_
  
  - [ ] 20.2 Add architecture documentation
    - Document Supabase Auth + Prisma integration pattern
    - Document middleware authentication flow
    - Document API route organization
    - Document state management boundaries
    - _Requirements: 20.8, 20.9_

- [ ] 21. Final checkpoint - Verify complete setup
  - Ensure TypeScript compiles with no errors
  - Ensure ESLint runs with no errors
  - Ensure Prettier formats code correctly
  - Ensure database migrations apply successfully
  - Ensure development server starts without errors
  - Ensure production build completes successfully
  - Review README for completeness
  - Ask the user if questions arise

## Notes

- **No Property-Based Tests**: This feature is infrastructure setup, not algorithmic logic requiring universal properties
- **Optional Testing Tasks**: Tasks marked with `*` are optional unit tests that can be skipped for faster MVP
- **Incremental Validation**: Checkpoints ensure each major section works before proceeding
- **Production-Ready Patterns**: All code follows enterprise-grade patterns for security and scalability
- **Type Safety**: End-to-end type safety from database to UI components
- **Mobile-First**: All responsive design uses mobile-first breakpoints
- **Server Protection**: Server-only code protected with "server-only" package
- **Safe Migrations**: Database changes use expand-and-contract pattern
- **No Placeholder Data**: Focus on infrastructure without demo/seed data

## Technology Stack

- **Framework**: Next.js 14 App Router
- **Language**: TypeScript (strict mode)
- **Database**: Supabase PostgreSQL + Prisma ORM
- **Authentication**: Supabase Auth
- **Styling**: TailwindCSS
- **State Management**: TanStack Query + Zustand
- **Validation**: Zod
- **Deployment**: Vercel

## Success Criteria

✅ Project structure matches enterprise folder architecture  
✅ TypeScript strict mode enabled with no compilation errors  
✅ Database schema defined with all 10 models  
✅ Environment variables validated at startup  
✅ API response utilities provide consistent error handling  
✅ Validation schemas cover all input types  
✅ Error handling infrastructure catches and logs errors  
✅ Supabase authentication integrated with Prisma  
✅ Middleware protects routes by role  
✅ TailwindCSS configured with design tokens  
✅ Component architecture foundation established  
✅ State management libraries configured  
✅ API route structure organized by feature  
✅ Git repository configured with proper .gitignore  
✅ Deployment configuration ready for Vercel  
✅ README documentation complete with setup instructions  
✅ Production build succeeds  
✅ Development server runs without errors
