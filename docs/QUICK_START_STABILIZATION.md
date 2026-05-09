# Kulima Platform - Quick Start Stabilization Guide

## 🎯 Current Status
**Phase**: Infrastructure Stabilization  
**Goal**: Production-ready foundation before feature development

---

## 🔴 CRITICAL: Do These First

### 1. Fix Supabase Database Connection
**Problem**: Can't connect to database  
**Cause**: Network/firewall or database paused

**Solution**:
1. Go to https://supabase.com/dashboard
2. Select project: `vfozfljltguaalhtbnho`
3. Check if database is **paused** → If yes, **unpause it**
4. Go to Settings → Database → Connection String
5. Copy the URI connection string
6. Update `.env` with correct `DATABASE_URL`

### 2. Add Service Role Key
**Problem**: Missing `SUPABASE_SERVICE_ROLE_KEY`

**Solution**:
1. Supabase Dashboard → Settings → API
2. Copy `service_role` key (NOT the anon key)
3. Add to `.env`:
```env
SUPABASE_SERVICE_ROLE_KEY="eyJ...your-service-role-key"
```

### 3. Choose Authentication Strategy
**Problem**: Unclear if using Supabase Auth or Prisma for authentication

**Solution**: Read `docs/AUTH_STRATEGY_DECISION.md` and choose:
- **Option A**: Supabase Auth (RECOMMENDED)
- **Option B**: Prisma-Only Auth

**After choosing, update Prisma schema accordingly.**

---

## 📋 Stabilization Checklist

### Phase 1: Database & Auth (Do First)
- [ ] Fix Supabase database connection
- [ ] Add `SUPABASE_SERVICE_ROLE_KEY` to `.env`
- [ ] Choose auth strategy (A or B)
- [ ] Update Prisma schema based on auth choice
- [ ] Run initial migration: `npx prisma migrate dev --name init`
- [ ] Verify tables created: `npx prisma studio`

### Phase 2: Environment & Security
- [ ] Generate strong `NEXTAUTH_SECRET` for production
- [ ] Document all environment variables
- [ ] Test environment validation
- [ ] Verify `.env` is in `.gitignore`

### Phase 3: Build & Deploy
- [ ] Test local build: `npm run build`
- [ ] Fix any build errors
- [ ] Test Prisma generation in build
- [ ] Prepare Vercel environment variables

### Phase 4: Documentation
- [ ] Review `INFRASTRUCTURE_AUDIT.md`
- [ ] Create API documentation
- [ ] Document deployment process
- [ ] Create development guide

### Phase 5: Git Workflow
- [ ] Set up branch protection on GitHub
- [ ] Create `develop` branch
- [ ] Document commit message convention
- [ ] Set up PR template

---

## 🚀 Quick Commands Reference

### Database
```bash
# Validate schema
npx prisma validate

# Format schema
npx prisma format

# Create migration
npx prisma migrate dev --name descriptive_name

# Generate Prisma Client
npx prisma generate

# Open Prisma Studio
npx prisma studio

# Reset database (DEV ONLY!)
npx prisma migrate reset
```

### Development
```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Format code
npm run format
```

### Git
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Commit with convention
git commit -m "feat(scope): description"

# Push to GitHub
git push origin feature/your-feature-name
```

---

## 📁 Key Files to Review

| File | Purpose | Status |
|------|---------|--------|
| `INFRASTRUCTURE_AUDIT.md` | Complete audit report | ✅ Created |
| `docs/AUTH_STRATEGY_DECISION.md` | Auth strategy guide | ✅ Created |
| `prisma/schema.prisma` | Database schema | ⚠️ Needs auth decision |
| `.env` | Environment variables | ⚠️ Missing service key |
| `lib/env.ts` | Environment validation | ✅ Updated |
| `.env.example` | Environment template | ✅ Updated |

---

## ⚠️ Common Issues & Solutions

### Issue: "Can't reach database server"
**Solution**: Check if Supabase database is paused. Unpause it in dashboard.

### Issue: "Invalid environment variables"
**Solution**: Check `.env` file has all required variables. Compare with `.env.example`.

### Issue: "Prisma Client not generated"
**Solution**: Run `npx prisma generate` manually.

### Issue: "Build fails on Vercel"
**Solution**: Ensure `postinstall` script runs `prisma generate` in `package.json`.

---

## 📞 Need Help?

1. **Database Issues**: Check `INFRASTRUCTURE_AUDIT.md` Section 1
2. **Auth Confusion**: Read `docs/AUTH_STRATEGY_DECISION.md`
3. **Environment Variables**: Check `INFRASTRUCTURE_AUDIT.md` Section 4
4. **Deployment**: Check `INFRASTRUCTURE_AUDIT.md` Section 6

---

## 🎯 Success Criteria

You'll know stabilization is complete when:
- ✅ Database migration runs successfully
- ✅ `npm run build` completes without errors
- ✅ All environment variables are configured
- ✅ Auth strategy is chosen and implemented
- ✅ Prisma Studio shows all tables
- ✅ Local development server runs
- ✅ Ready to deploy to Vercel

---

**Next Phase**: Once stabilization is complete, you can begin feature development with confidence!
