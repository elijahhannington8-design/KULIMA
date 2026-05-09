# Authentication Strategy Decision Document

## Critical Decision Required

You must choose between two authentication strategies before proceeding with migrations.

---

## Option A: Supabase Auth (RECOMMENDED) ⭐

### Architecture
```
User Registration/Login
    ↓
Supabase Auth (manages passwords, sessions, JWT)
    ↓
Middleware validates JWT token
    ↓
Extract Supabase User ID
    ↓
Prisma queries User table (linked by supabaseUserId)
```

### Prisma Schema Changes Required
```prisma
model User {
  id             String  @id @default(cuid())
  supabaseUserId String  @unique  // NEW: Link to Supabase Auth
  email          String  @unique
  role           Role
  phoneNumber    String?
  // REMOVE: passwordHash String
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  farmer        Farmer?
  buyer         Buyer?
  notifications Notification[]

  @@index([email])
  @@index([role])
  @@index([supabaseUserId])  // NEW
}
```

### Pros ✅
- **Built-in security**: Password hashing, JWT management handled by Supabase
- **Email verification**: Built-in email confirmation
- **Password reset**: Built-in password reset flow
- **OAuth ready**: Easy to add Google/Facebook login later
- **Row Level Security**: Can use Supabase RLS policies
- **Less code to maintain**: Don't need to implement auth logic
- **Production-tested**: Supabase Auth is battle-tested

### Cons ❌
- **Vendor lock-in**: Tied to Supabase
- **Two systems**: Auth in Supabase, data in Prisma
- **Learning curve**: Need to understand Supabase Auth

### Implementation Steps
1. Remove `passwordHash` from Prisma User model
2. Add `supabaseUserId` field
3. Create migration
4. Update registration flow to:
   - Create user in Supabase Auth
   - Create user record in Prisma with supabaseUserId
5. Update login flow to use Supabase Auth
6. Middleware validates Supabase JWT tokens

---

## Option B: Prisma-Only Auth

### Architecture
```
User Registration/Login
    ↓
Custom Auth Logic (bcrypt passwords)
    ↓
NextAuth.js or custom JWT
    ↓
Middleware validates JWT token
    ↓
Prisma queries User table
```

### Prisma Schema (Keep Current)
```prisma
model User {
  id           String  @id @default(cuid())
  email        String  @unique
  passwordHash String  // KEEP
  role         Role
  phoneNumber  String?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  farmer        Farmer?
  buyer         Buyer?
  notifications Notification[]

  @@index([email])
  @@index([role])
}
```

### Pros ✅
- **Full control**: Complete control over auth logic
- **No vendor lock-in**: Can switch databases easily
- **Single system**: Everything in Prisma
- **Simpler mental model**: One source of truth

### Cons ❌
- **More code to write**: Need to implement:
  - Password hashing (bcrypt)
  - JWT token generation/validation
  - Email verification
  - Password reset
  - Session management
- **Security responsibility**: You're responsible for security
- **More maintenance**: Need to maintain auth code
- **No OAuth**: Harder to add social login

### Implementation Steps
1. Keep current Prisma schema
2. Remove Supabase Auth dependencies
3. Implement custom auth with NextAuth.js or custom solution
4. Create API routes for register/login/logout
5. Implement password hashing with bcrypt
6. Create JWT token management
7. Update middleware to validate custom JWT

---

## Recommendation: Option A (Supabase Auth)

### Why?
1. **Production-grade security** out of the box
2. **Faster development** - don't reinvent the wheel
3. **Future-proof** - easy to add OAuth, MFA, etc.
4. **Less maintenance** - Supabase handles security updates
5. **Already integrated** - You're already using Supabase for database

### Migration Path (If you choose Option A)

#### Step 1: Update Prisma Schema
```prisma
// Add this field
supabaseUserId String? @unique

// Remove this field
// passwordHash String
```

#### Step 2: Create Migration
```bash
npx prisma migrate dev --name add_supabase_user_id_remove_password
```

#### Step 3: Update Registration Flow
```typescript
// server/auth.ts
export async function registerUser(email: string, password: string, role: Role) {
  // 1. Create user in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })
  
  if (authError) throw authError
  
  // 2. Create user record in Prisma
  const user = await prisma.user.create({
    data: {
      supabaseUserId: authData.user!.id,
      email,
      role,
    },
  })
  
  return user
}
```

#### Step 4: Update Login Flow
```typescript
// Use Supabase Auth for login
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
})
```

#### Step 5: Update Middleware
```typescript
// middleware.ts - already mostly correct
// Just ensure it extracts supabaseUserId and queries Prisma User
```

---

## Decision Checklist

Before proceeding, confirm:
- [ ] I have chosen Option A or Option B
- [ ] I understand the implications
- [ ] I'm ready to update the Prisma schema
- [ ] I'm ready to run migrations
- [ ] I understand the implementation steps

---

## Next Steps After Decision

### If Option A (Supabase Auth):
1. Update Prisma schema
2. Run migration
3. Update auth.ts implementation
4. Test registration flow
5. Test login flow

### If Option B (Prisma-Only):
1. Remove Supabase Auth dependencies
2. Install NextAuth.js or implement custom auth
3. Create auth API routes
4. Implement password hashing
5. Test registration flow
6. Test login flow

---

**IMPORTANT**: Do not proceed with any migrations until you've made this decision!
