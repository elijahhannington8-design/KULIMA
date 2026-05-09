# Database Connection Troubleshooting Guide

## Current Issue
**Error**: P1001 - Can't reach database server at `db.vfozfljltguaalhtbnho.supabase.co:5432`

This error means Prisma cannot establish a TCP connection to your Supabase PostgreSQL database.

---

## Solution Steps (In Order)

### 🔴 Step 1: Check if Database is Paused (MOST COMMON)

1. Go to https://supabase.com/dashboard
2. Select your project: `vfozfljltguaalhtbnho`
3. Look at the top of the dashboard for a banner saying **"Database Paused"**
4. If you see this banner, click **"Unpause Database"** or **"Resume"**
5. Wait 30-60 seconds for the database to start
6. Try the connection test again: `npx prisma db pull`

**Why this happens**: Supabase pauses inactive databases on free tier after a period of inactivity.

---

### 🟡 Step 2: Verify Database Status in Dashboard

1. In Supabase Dashboard, go to **Settings** → **Database**
2. Check the **Connection Info** section
3. Verify the host matches: `db.vfozfljltguaalhtbnho.supabase.co`
4. Verify the port is: `5432`
5. Check if there's a status indicator showing "Active" or "Running"

---

### 🟡 Step 3: Test Connection with Supabase SQL Editor

1. In Supabase Dashboard, go to **SQL Editor**
2. Run a simple query: `SELECT NOW();`
3. If this works, the database is running but there's a connection issue
4. If this fails, the database is definitely paused or down

---

### 🟡 Step 4: Check Network/Firewall

**Windows Firewall**:
1. Open Windows Defender Firewall
2. Click "Allow an app through firewall"
3. Ensure Node.js and your terminal have network access
4. Allow port 5432 for PostgreSQL

**Antivirus/Security Software**:
- Temporarily disable antivirus to test
- Some security software blocks database connections

**VPN/Proxy**:
- If using a VPN, try disabling it temporarily
- Some VPNs block database ports

---

### 🟡 Step 5: Verify Environment Variables

Check your `.env` file has the correct format:

```env
DATABASE_URL="postgresql://postgres:hannington%40%24@db.vfozfljltguaalhtbnho.supabase.co:5432/postgres?sslmode=require"
```

**Important**:
- Password must be URL-encoded: `@` → `%40`, `$` → `%24`
- Must include `?sslmode=require` at the end
- No spaces or line breaks in the URL

---

### 🟢 Step 6: Test with Direct Connection String

Try connecting with the Supabase connection pooler (alternative port):

1. In Supabase Dashboard → Settings → Database
2. Look for **Connection Pooling** section
3. Copy the **Connection string** (uses port 6543 instead of 5432)
4. Temporarily update your `.env` with this connection string
5. Try `npx prisma db pull` again

---

### 🟢 Step 7: Check Supabase Service Status

1. Go to https://status.supabase.com
2. Check if there are any ongoing incidents
3. Check if your region is affected

---

## Quick Test Commands

After each fix attempt, run these commands to test:

```bash
# Test 1: Pull existing schema (should fail if no tables exist yet)
npx prisma db pull

# Test 2: Validate schema
npx prisma validate

# Test 3: Generate Prisma Client
npx prisma generate
```

---

## Expected Behavior After Fix

When the connection works, you should see:

```
✔ Introspecting based on datasource defined in prisma\schema.prisma
✔ Introspected 0 models and wrote them into prisma\schema.prisma in XXXms
```

Or if tables already exist:

```
✔ Introspected X models and wrote them into prisma\schema.prisma in XXXms
```

---

## What to Do After Connection Works

Once the database connection is successful:

1. **Validate Prisma schema**: `npx prisma validate`
2. **Format schema**: `npx prisma format`
3. **Run migration**: `npx prisma migrate dev --name init`
4. **Generate client**: `npx prisma generate`
5. **Open Prisma Studio**: `npx prisma studio`

---

## Still Not Working?

If none of the above works:

1. **Contact Supabase Support**:
   - Go to Supabase Dashboard → Support
   - Describe the connection issue
   - Provide your project ref: `vfozfljltguaalhtbnho`

2. **Check Supabase Logs**:
   - Dashboard → Logs → Database Logs
   - Look for connection errors or authentication failures

3. **Try Alternative Connection**:
   - Use Supabase's built-in SQL editor for now
   - Manually create tables if needed
   - Come back to Prisma migrations later

---

## Current Environment Configuration

Your current setup:
- **Project**: vfozfljltguaalhtbnho
- **Host**: db.vfozfljltguaalhtbnho.supabase.co
- **Port**: 5432
- **Database**: postgres
- **SSL Mode**: require
- **Service Role Key**: ✅ Configured
- **Anon Key**: ✅ Configured

---

## Next Steps

1. ✅ **Complete Step 1** (unpause database) - THIS IS MOST LIKELY THE ISSUE
2. Test connection with `npx prisma db pull`
3. If successful, proceed with migration
4. If still failing, work through Steps 2-7

**Remember**: The database being paused is the #1 cause of this error on Supabase free tier!
