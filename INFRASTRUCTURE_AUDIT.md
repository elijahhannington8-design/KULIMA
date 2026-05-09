# Kulima Platform - Infrastructure Audit Report
**Date**: 2026-05-09  
**Status**: Pre-Production Stabilization Phase

## Executive Summary

This document outlines the infrastructure audit findings and remediation plan for the Kulima agriculture platform. The goal is to achieve production-grade stability before feature expansion.

---

## 1. Database Architecture

### ✅ Current State
- **Prisma Schema**: Well-structured with 10 models
- **Relationships**: Properly defined with cascade deletes
- **Indexes**: Strategic indexes on foreign keys and query fields
- **Enums**: Type-safe status enumerations

### ⚠️ Issues Identified

#### Issue 1.1: Supabase Auth + Prisma User Duplication
**Severity**: HIGH  
**Description**: Current architecture has both Supabase Auth managing users AND Prisma User model with passwordHash, creating duplicate user management.

**Impact**:
- Potential data inconsistency
- Unclear source of truth
- Authentication confusion

**Recommended Solution**:
```
OPTION A (Recommended): Supabase Auth as Primary
├── Supabase Auth manages: authentication, sessions, passwords
├── Prisma User model: stores only user_id reference + app-specific data
└── Remove passwordHash from Prisma User model

OPTION B: Prisma-Only Auth
├── Remove Supabase Auth entirely
├── Implement custom auth with Prisma User model
└── Manage sessions with NextAuth.js
```

**Decision Required**: Choose Option A or B

#### Issue 1.2: Missing Supabase User ID Link
**Severity**: MEDIUM  
**Description**: Prisma User model doesn't have a field to link to Supabase Auth user ID.

**Fix**: Add `supabaseUserId` field to User model:
```prisma
model User {
  id             String  @id @default(cuid())
  supabaseUserId String? @unique  // Link to Supabase Auth
  email          String  @unique
  role           Role
  // Remove passwordHash if using Supabase Auth
}
```

### ✅ Relational Integrity Check
- User → Farmer (1:1) ✓
- User → Buyer (1:1) ✓
- Farmer → Farm (1:N) ✓
- Farm → CropCycle (1:N) ✓
- Farmer → Listing (1:N) ✓
- Listing → Offer (1:N) ✓
- Buyer → Offer (1:N) ✓
- User → Notification (1:N) ✓
- Farmer → LoanProfile (1:1) ✓

**Status**: All relationships properly defined with cascade deletes.

---

## 2. Supabase Integration

### Current Configuration
```
NEXT_PUBLIC_SUPABASE_URL=https://vfozfljltguaalhtbnho.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ... (public key)
DATABASE_URL=postgresql://postgres:...
```

### ⚠️ Issues Identified

#### Issue 2.1: Missing Service Role Key
**Severity**: HIGH  
**Description**: No `SUPABASE_SERVICE_ROLE_KEY` configured for server-side admin operations.

**Impact**:
- Cannot bypass Row Level Security (RLS) on server
- Limited server-side database operations
- Potential security issues with using anon key server-side

**Fix**: Add to `.env`:
```env
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

**Where to find**: Supabase Dashboard → Settings → API → service_role key

#### Issue 2.2: Public Keys in Environment
**Severity**: LOW  
**Description**: `NEXT_PUBLIC_*` variables are exposed to frontend (this is correct, but needs documentation).

**Status**: Working as intended, but needs clear documentation.

### Recommended Supabase Responsibilities

```
✅ Supabase SHOULD Handle:
├── User authentication (login, register, logout)
├── Session management (JWT tokens, refresh)
├── Password management (hashing, reset)
├── Row Level Security (RLS) policies
└── File storage (future: profile images, documents)

❌ Supabase SHOULD NOT Handle:
├── Business logic (use Prisma + server actions)
├── Complex queries (use Prisma)
├── Data migrations (use Prisma migrations)
└── Application-specific data models
```

---

## 3. Prisma + Supabase Responsibilities

### Clear Separation Strategy

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                          │
│  - Next.js Pages/Components                              │
│  - Uses Supabase Client for auth state                  │
│  - Calls API routes for data operations                  │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                 AUTHENTICATION LAYER                     │
│  - Supabase Auth (login, register, sessions)            │
│  - Middleware validates JWT tokens                       │
│  - Extracts user ID and role                             │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                   API/SERVER LAYER                       │
│  - Server Actions / API Routes                           │
│  - Uses Prisma for ALL data operations                  │
│  - Business logic and validation                         │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                   DATABASE LAYER                         │
│  - Supabase PostgreSQL (storage)                        │
│  - Prisma ORM (access layer)                            │
│  - Migrations managed by Prisma                          │
└─────────────────────────────────────────────────────────┘
```

### Implementation Rules

1. **Authentication Flow**:
   ```
   User Login → Supabase Auth → JWT Token → Middleware validates → API route gets user ID → Prisma queries
   ```

2. **Data Operations**:
   ```
   ALL database operations → Prisma ORM → Supabase PostgreSQL
   ```

3. **Never Mix**:
   - ❌ Don't use Supabase client for data queries
   - ❌ Don't use Prisma for authentication
   - ✅ Use Supabase for auth, Prisma for data

---

## 4. Environment Variable Management

### Current Variables Audit

| Variable | Type | Status | Security | Notes |
|----------|------|--------|----------|-------|
| `DATABASE_URL` | Private | ✅ | Secure | URL-encoded password |
| `NEXTAUTH_SECRET` | Private | ⚠️ | Weak | Change in production |
| `NEXTAUTH_URL` | Private | ✅ | OK | Localhost for dev |
| `NEXT_PUBLIC_SUPABASE_URL` | Public | ✅ | OK | Exposed to frontend |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | ✅ | OK | Exposed to frontend |
| `SUPABASE_SERVICE_ROLE_KEY` | Private | ❌ | **MISSING** | **Required** |
| `SMS_PROVIDER_API_KEY` | Private | ⏸️ | N/A | Optional for now |
| `NODE_ENV` | Private | ✅ | OK | Development |

### Required Actions

1. **Add Missing Variables**:
```env
# Add to .env
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key-here"
```

2. **Update .env.example**:
```env
# Add to .env.example
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
```

3. **Production Checklist**:
- [ ] Generate strong `NEXTAUTH_SECRET` (32+ chars)
- [ ] Update `NEXTAUTH_URL` to production domain
- [ ] Verify all keys are from production Supabase project
- [ ] Never commit `.env` to Git (already protected ✓)

### Vercel Deployment Variables

```
Required Environment Variables for Vercel:
├── DATABASE_URL (from Supabase)
├── NEXTAUTH_SECRET (generate new for production)
├── NEXTAUTH_URL (https://your-domain.vercel.app)
├── NEXT_PUBLIC_SUPABASE_URL
├── NEXT_PUBLIC_SUPABASE_ANON_KEY
├── SUPABASE_SERVICE_ROLE_KEY
└── NODE_ENV=production (auto-set by Vercel)
```

---

## 5. Migration Safety Strategy

### Pre-Migration Checklist

Before running `prisma migrate dev`:
- [ ] Verify DATABASE_URL connection
- [ ] Backup existing data (if any)
- [ ] Review generated SQL
- [ ] Test on development database first
- [ ] Document migration purpose

### Safe Migration Workflow

```bash
# 1. Check schema validity
npx prisma validate

# 2. Format schema
npx prisma format

# 3. Create migration (dev only)
npx prisma migrate dev --name descriptive_name

# 4. Review generated SQL
# Check prisma/migrations/XXXXXX_descriptive_name/migration.sql

# 5. Apply to production (when ready)
npx prisma migrate deploy
```

### Migration Naming Convention

```
Format: YYYYMMDDHHMMSS_descriptive_action

Examples:
✅ 20260509_init
✅ 20260510_add_user_supabase_id
✅ 20260511_remove_password_hash
❌ migration_1
❌ update
❌ fix
```

### Rollback Strategy

```bash
# If migration fails:
1. DO NOT run prisma migrate reset in production
2. Create a new migration to undo changes
3. Use expand-and-contract pattern for schema changes
```

---

## 6. Deployment Stability

### Build Verification

```bash
# Local build test
npm run build

# Expected output:
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
```

### Vercel Configuration

**next.config.js** - Production Ready ✅
```javascript
module.exports = {
  reactStrictMode: true,  // ✓ Enabled
  images: {
    domains: ['vfozfljltguaalhtbnho.supabase.co'],  // ✓ Configured
  },
}
```

**package.json** - Scripts Audit ✅
```json
{
  "scripts": {
    "dev": "next dev",           // ✓
    "build": "next build",       // ✓
    "start": "next start",       // ✓
    "postinstall": "prisma generate"  // ✓ Critical for Vercel
  }
}
```

### Vercel Deployment Checklist

- [ ] Connect GitHub repository
- [ ] Configure environment variables
- [ ] Set build command: `npm run build`
- [ ] Set install command: `npm install`
- [ ] Verify Prisma generates during build
- [ ] Test preview deployment first
- [ ] Monitor build logs for errors

---

## 7. Project Structure Audit

### Current Structure Assessment

```
kulima-platform/
├── app/                    ✅ Clean App Router structure
│   ├── (farmer)/          ✅ Role-based route groups
│   ├── (buyer)/           ✅ Role-based route groups
│   ├── (admin)/           ✅ Role-based route groups
│   └── api/               ⚠️ Empty (needs API routes)
├── components/            ✅ Organized by type
│   ├── ui/               ✅ Primitive components
│   ├── features/         ✅ Feature components
│   └── layouts/          ✅ Layout components
├── lib/                   ✅ Utilities well-organized
│   ├── api/              ✅ API utilities
│   ├── supabase/         ✅ Supabase clients
│   ├── validations/      ✅ Zod schemas
│   ├── env.ts            ✅ Environment validation
│   ├── errors.ts         ✅ Custom errors
│   └── logger.ts         ✅ Structured logging
├── server/                ✅ Server-only code
│   ├── auth.ts           ✅ Auth utilities
│   └── db.ts             ✅ Prisma client
├── prisma/                ✅ Database schema
│   └── schema.prisma     ✅ Complete schema
├── types/                 ✅ TypeScript types
└── middleware.ts          ✅ Auth middleware
```

### Recommendations

1. **Create API Routes** (currently empty):
```
app/api/
├── auth/
│   ├── register/route.ts
│   └── login/route.ts
├── farmers/
│   └── route.ts
├── listings/
│   └── route.ts
└── offers/
    └── route.ts
```

2. **Add Documentation**:
```
docs/
├── ARCHITECTURE.md
├── API.md
├── DEPLOYMENT.md
└── DEVELOPMENT.md
```

---

## 8. Git & DevOps

### Current Git Status ✅
- Repository initialized
- .gitignore properly configured
- Initial commit created (47 files)
- .env excluded from Git

### Recommended Git Workflow

```
main (production)
├── develop (integration)
│   ├── feature/user-auth
│   ├── feature/marketplace
│   └── feature/notifications
└── hotfix/* (emergency fixes)
```

### Branch Protection Rules (GitHub)

```
main branch:
├── Require pull request reviews
├── Require status checks to pass
├── Require branches to be up to date
└── Include administrators
```

### Commit Message Convention

```
Format: <type>(<scope>): <subject>

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Adding tests
- chore: Maintenance

Examples:
✅ feat(auth): add Supabase authentication
✅ fix(database): correct user relationship
✅ docs(readme): update setup instructions
❌ update
❌ fix bug
❌ changes
```

---

## 9. Security Audit

### ✅ Security Strengths
- TypeScript strict mode enabled
- Environment variables validated
- .env excluded from Git
- Server-only code protected
- Input validation with Zod
- SQL injection prevention (Prisma)

### ⚠️ Security Improvements Needed

1. **Add Rate Limiting**:
```typescript
// lib/rate-limit.ts (already created, needs implementation)
```

2. **Add CSRF Protection**:
```typescript
// middleware.ts (add CSRF token validation)
```

3. **Add Content Security Policy**:
```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  }
]
```

---

## 10. Action Items Summary

### 🔴 Critical (Do First)
1. [ ] Fix Supabase database connection
2. [ ] Add `SUPABASE_SERVICE_ROLE_KEY` to environment
3. [ ] Decide on auth strategy (Supabase Auth vs Prisma)
4. [ ] Update Prisma schema based on auth decision
5. [ ] Run initial migration successfully

### 🟡 High Priority (Do Next)
6. [ ] Create API route structure
7. [ ] Implement authentication flow
8. [ ] Add service role key to Supabase client
9. [ ] Update environment validation
10. [ ] Test local build

### 🟢 Medium Priority (Before Production)
11. [ ] Add rate limiting
12. [ ] Add security headers
13. [ ] Create documentation
14. [ ] Set up GitHub branch protection
15. [ ] Configure Vercel deployment

---

## Conclusion

The Kulima platform has a **solid foundation** with good architecture decisions. The main issues are:
1. **Auth strategy needs clarification** (Supabase vs Prisma)
2. **Database connection needs fixing**
3. **Missing service role key**

Once these are resolved, the platform will be production-ready for feature development.

**Recommended Next Step**: Fix database connection and run initial migration.
