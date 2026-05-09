# Multi-Role Agricultural Ecosystem - Design Document

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     KULIMA Platform                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Frontend   │  │   API Layer  │  │   Database   │      │
│  │              │  │              │  │              │      │
│  │ - Auth Pages │  │ - Auth API   │  │ - User       │      │
│  │ - Dashboards │  │ - Role API   │  │ - Profiles   │      │
│  │ - Components │  │ - RBAC       │  │ - Relations  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Database Schema Design

### Core Models

#### User (Existing - Enhanced)
```prisma
model User {
  id           String   @id @default(cuid())
  email        String   @unique
  passwordHash String
  phoneNumber  String?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  
  // Role relationships
  farmerProfile   FarmerProfile?
  buyerProfile    BuyerProfile?
  supplierProfile SupplierProfile?
  adminProfile    AdminProfile?
  
  // Existing relationships
  notifications Notification[]
}
```

#### FarmerProfile (Renamed from Farmer)
```prisma
model FarmerProfile {
  id         String   @id @default(cuid())
  userId     String   @unique
  fullName   String
  location   String
  nationalId String?
  verified   Boolean  @default(false)
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  
  user     User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  farms    Farm[]
  listings Listing[]
  loanProfile LoanProfile?
}
```

#### BuyerProfile (Renamed from Buyer)
```prisma
model BuyerProfile {
  id           String   @id @default(cuid())
  userId       String   @unique
  businessName String
  businessType String
  location     String
  verified     Boolean  @default(false)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  
  user   User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  offers Offer[]
}
```

#### SupplierProfile (New)
```prisma
enum SupplierType {
  SEED
  FERTILIZER
  EQUIPMENT
  IRRIGATION
  AGROCHEMICAL
  LIVESTOCK_FEED
}

model SupplierProfile {
  id              String       @id @default(cuid())
  userId          String       @unique
  businessName    String
  supplierType    SupplierType
  location        String
  businessLicense String?
  verified        Boolean      @default(false)
  verifiedAt      DateTime?
  rating          Float?       @default(0)
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt
  
  user     User              @relation(fields: [userId], references: [id], onDelete: Cascade)
  products SupplierProduct[]
  orders   SupplierOrder[]
}
```

#### SupplierProduct (New)
```prisma
model SupplierProduct {
  id          String   @id @default(cuid())
  supplierId  String
  name        String
  description String?
  category    String
  price       Float
  unit        String
  stock       Int
  imageUrl    String?
  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  supplier SupplierProfile @relation(fields: [supplierId], references: [id], onDelete: Cascade)
  
  @@index([supplierId])
  @@index([active])
}
```

#### SupplierOrder (New)
```prisma
enum OrderStatus {
  PENDING
  CONFIRMED
  SHIPPED
  DELIVERED
  CANCELLED
}

model SupplierOrder {
  id         String      @id @default(cuid())
  supplierId String
  buyerId    String
  productId  String
  quantity   Int
  totalPrice Float
  status     OrderStatus @default(PENDING)
  createdAt  DateTime    @default(now())
  updatedAt  DateTime    @updatedAt
  
  supplier SupplierProfile @relation(fields: [supplierId], references: [id], onDelete: Cascade)
  
  @@index([supplierId])
  @@index([buyerId])
  @@index([status])
}
```

#### AdminProfile (New)
```prisma
enum AdminRole {
  SUPER_ADMIN
  MODERATOR
  SUPPORT
}

model AdminProfile {
  id        String    @id @default(cuid())
  userId    String    @unique
  adminRole AdminRole @default(MODERATOR)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### Migration Strategy

**Phase 1: Schema Extension (Non-Breaking)**
1. Add new models: SupplierProfile, SupplierProduct, SupplierOrder, AdminProfile
2. Add new enums: SupplierType, OrderStatus, AdminRole
3. Add relationships to User model
4. Keep existing Farmer and Buyer models temporarily

**Phase 2: Data Migration (If needed)**
1. Rename Farmer → FarmerProfile
2. Rename Buyer → BuyerProfile
3. Update all foreign key references
4. Migrate existing data

**Phase 3: Cleanup**
1. Remove old model references
2. Update all queries and mutations

## Frontend Architecture

### Directory Structure

```
app/
├── (auth)/
│   ├── login/
│   ├── signup/
│   └── onboarding/          # New: Multi-role onboarding
│
├── (dashboard)/
│   ├── layout.tsx           # Enhanced: Role-aware layout
│   ├── farmer/              # Farmer dashboard
│   │   ├── dashboard/
│   │   ├── farms/
│   │   ├── listings/
│   │   ├── offers/
│   │   ├── analytics/
│   │   └── profile/
│   │
│   ├── buyer/               # Buyer dashboard
│   │   ├── dashboard/
│   │   ├── marketplace/
│   │   ├── orders/
│   │   ├── suppliers/
│   │   └── analytics/
│   │
│   ├── supplier/            # Supplier dashboard
│   │   ├── dashboard/
│   │   ├── products/
│   │   ├── inventory/
│   │   ├── orders/
│   │   ├── storefront/
│   │   └── analytics/
│   │
│   └── admin/               # Admin dashboard
│       ├── dashboard/
│       ├── users/
│       ├── verification/
│       ├── disputes/
│       └── analytics/
│
components/
├── ui/                      # Shared UI components
├── layouts/
│   ├── FarmerLayout.tsx
│   ├── BuyerLayout.tsx
│   ├── SupplierLayout.tsx
│   └── AdminLayout.tsx
├── features/
│   ├── role-switcher/       # New: Role switching component
│   ├── onboarding/          # New: Multi-role onboarding
│   └── verification/        # New: Supplier verification
│
lib/
├── auth/
│   ├── rbac.ts              # Role-based access control
│   ├── permissions.ts       # Permission definitions
│   └── role-utils.ts        # Role helper functions
├── hooks/
│   ├── useCurrentRole.ts    # Current active role
│   ├── useUserRoles.ts      # All user roles
│   └── useRoleSwitch.ts     # Role switching logic
└── types/
    └── roles.ts             # Role type definitions
```

### Component Design

#### RoleSwitcher Component
```typescript
interface RoleSwitcherProps {
  currentRole: UserRole;
  availableRoles: UserRole[];
  onRoleChange: (role: UserRole) => void;
}

// Features:
// - Dropdown menu with available roles
// - Visual indicator of current role
// - Smooth transition animation
// - Persists selection to localStorage
```

#### OnboardingFlow Component
```typescript
interface OnboardingFlowProps {
  onComplete: (selectedRoles: UserRole[], profileData: ProfileData) => void;
}

// Steps:
// 1. Role selection (multi-select)
// 2. Profile information (role-specific)
// 3. Verification (for suppliers)
// 4. Confirmation
```

#### DashboardLayout Component
```typescript
interface DashboardLayoutProps {
  role: UserRole;
  children: ReactNode;
}

// Features:
// - Role-specific navigation
// - Role switcher (if multi-role)
// - Breadcrumbs
// - Notifications
// - User menu
```

## API Design

### Authentication Endpoints

```typescript
POST /api/auth/signup
Body: {
  email: string;
  password: string;
  roles: UserRole[];
  profiles: {
    farmer?: FarmerProfileData;
    buyer?: BuyerProfileData;
    supplier?: SupplierProfileData;
  };
}
Response: { user: User; session: Session }

POST /api/auth/switch-role
Body: { roleId: string }
Response: { currentRole: UserRole; permissions: Permission[] }
```

### Role Management Endpoints

```typescript
GET /api/user/roles
Response: { roles: UserRole[]; currentRole: UserRole }

POST /api/user/add-role
Body: { role: UserRole; profileData: ProfileData }
Response: { success: boolean; profile: Profile }

GET /api/user/permissions
Response: { permissions: Permission[] }
```

### Supplier Endpoints

```typescript
GET /api/supplier/products
Response: { products: SupplierProduct[] }

POST /api/supplier/products
Body: { product: SupplierProductInput }
Response: { product: SupplierProduct }

GET /api/supplier/orders
Response: { orders: SupplierOrder[] }

PATCH /api/supplier/orders/:id
Body: { status: OrderStatus }
Response: { order: SupplierOrder }
```

## Role-Based Access Control (RBAC)

### Permission Matrix

| Feature | Farmer | Buyer | Supplier | Admin |
|---------|--------|-------|----------|-------|
| View Marketplace | ✓ | ✓ | ✓ | ✓ |
| Create Listings | ✓ | ✗ | ✗ | ✓ |
| Make Offers | ✗ | ✓ | ✗ | ✓ |
| Manage Products | ✗ | ✗ | ✓ | ✓ |
| Verify Suppliers | ✗ | ✗ | ✗ | ✓ |
| View Analytics | ✓ | ✓ | ✓ | ✓ |
| Moderate Users | ✗ | ✗ | ✗ | ✓ |

### Middleware Implementation

```typescript
// middleware/rbac.ts
export function requireRole(allowedRoles: UserRole[]) {
  return async (req, res, next) => {
    const user = await getCurrentUser(req);
    const currentRole = await getCurrentRole(req);
    
    if (!allowedRoles.includes(currentRole)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    next();
  };
}

// Usage
app.get('/api/supplier/products', 
  requireRole(['SUPPLIER', 'ADMIN']), 
  getSupplierProducts
);
```

## UI/UX Design Patterns

### Role Indicator
- Persistent badge showing current role
- Color-coded by role type
- Visible in header/navigation

### Role Switcher
- Dropdown menu in header
- Shows all available roles
- Smooth transition animation
- Confirmation for unsaved changes

### Dashboard Customization
- Role-specific widgets
- Customizable layout
- Quick actions based on role
- Contextual help

### Onboarding Experience
- Progressive disclosure
- Role-specific guidance
- Visual progress indicator
- Skip/complete later options

## Performance Optimization

### Code Splitting
```typescript
// Lazy load role-specific dashboards
const FarmerDashboard = dynamic(() => import('@/app/(dashboard)/farmer/dashboard'));
const BuyerDashboard = dynamic(() => import('@/app/(dashboard)/buyer/dashboard'));
const SupplierDashboard = dynamic(() => import('@/app/(dashboard)/supplier/dashboard'));
const AdminDashboard = dynamic(() => import('@/app/(dashboard)/admin/dashboard'));
```

### Data Fetching Strategy
- Use React Query for caching
- Prefetch role-specific data
- Optimistic updates for role switching
- Background sync for offline support

## Security Considerations

### Authentication
- Supabase Auth for session management
- JWT tokens with role claims
- Secure cookie storage
- CSRF protection

### Authorization
- Server-side role validation
- API route protection
- Database-level RLS (Row Level Security)
- Audit logging for admin actions

### Data Privacy
- Role-based data access
- Encrypted sensitive data
- GDPR compliance
- Data retention policies

## Testing Strategy

### Unit Tests
- Role permission logic
- Profile creation/update
- Role switching functionality

### Integration Tests
- Multi-role signup flow
- Role-based API access
- Dashboard rendering by role

### E2E Tests
- Complete onboarding flow
- Role switching scenarios
- Cross-role interactions

## Deployment Strategy

### Phase 1: Database Migration
1. Deploy schema changes
2. Run data migrations
3. Verify data integrity

### Phase 2: Backend Deployment
1. Deploy API endpoints
2. Deploy RBAC middleware
3. Test role permissions

### Phase 3: Frontend Deployment
1. Deploy new dashboards
2. Deploy role switcher
3. Deploy onboarding flow

### Phase 4: Monitoring
1. Track role distribution
2. Monitor role switching patterns
3. Analyze dashboard usage
4. Collect user feedback
