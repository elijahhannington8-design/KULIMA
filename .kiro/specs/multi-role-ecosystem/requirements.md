# Multi-Role Agricultural Ecosystem - Requirements

## Overview
Transform KULIMA from a farmer-buyer marketplace into a comprehensive multi-role agricultural ecosystem platform supporting Farmers, Buyers, Suppliers, and Admins with role-based dashboards and seamless role-switching capabilities.

## User Stories

### US-1: Multi-Role Account Creation
**As a** new user  
**I want to** select one or multiple roles during signup  
**So that** I can access all relevant platform features for my business needs

**Acceptance Criteria:**
- User can select from: Farmer, Buyer, Supplier, Admin (admin assigned separately)
- User can select multiple roles (e.g., Farmer + Supplier)
- System creates appropriate profile records for each selected role
- User receives unified authentication across all roles

### US-2: Supplier Type Selection
**As a** supplier  
**I want to** specify my supplier category during onboarding  
**So that** buyers can find me in the right category

**Acceptance Criteria:**
- Supplier can choose from predefined categories:
  - Seed suppliers
  - Fertilizer suppliers
  - Equipment suppliers
  - Irrigation suppliers
  - Agrochemical suppliers
  - Livestock feed suppliers
- System supports adding new supplier categories without code changes
- Supplier type is displayed on their profile and storefront

### US-3: Role Switching
**As a** user with multiple roles  
**I want to** switch between my different role dashboards  
**So that** I can manage different aspects of my agricultural business

**Acceptance Criteria:**
- Role switcher visible in navigation for multi-role users
- Switching roles updates dashboard, navigation, and available features
- Current role persists across sessions
- Smooth transition without full page reload

### US-4: Farmer Dashboard
**As a** farmer  
**I want** a comprehensive dashboard  
**So that** I can manage my farm operations and sales

**Features:**
- Crop listings management
- Real-time market prices
- Weather insights
- Sales analytics
- Buyer offers management
- Order tracking
- Farm profile management
- AI farming insights
- Inventory management

### US-5: Buyer Dashboard
**As a** buyer  
**I want** a procurement-focused dashboard  
**So that** I can source produce and supplies efficiently

**Features:**
- Browse marketplace (farmers & suppliers)
- Negotiate with farmers
- Order management
- Saved suppliers list
- Purchase history
- Logistics tracking
- Procurement analytics

### US-6: Supplier Dashboard
**As a** supplier  
**I want** a storefront management dashboard  
**So that** I can sell agricultural supplies to farmers and buyers

**Features:**
- Product catalog management
- Inventory control
- Supplier storefront
- Order fulfillment
- Verification badge display
- Sales analytics
- Delivery management

### US-7: Admin Dashboard
**As an** admin  
**I want** platform oversight tools  
**So that** I can moderate and manage the ecosystem

**Features:**
- User moderation
- Supplier verification workflow
- Marketplace monitoring
- Analytics overview
- Dispute management
- Platform metrics
- Fraud/security controls
- Content management

### US-8: Role-Based Access Control
**As the** system  
**I want to** enforce role-based permissions  
**So that** users only access features appropriate to their roles

**Acceptance Criteria:**
- Protected routes based on user roles
- API endpoints validate role permissions
- Dashboard modules load based on active role
- Admin-only features restricted to admin role

## Correctness Properties

### CP-1: Single User Identity
**Property:** Each user must have exactly one User record regardless of number of roles  
**Rationale:** Prevents authentication fragmentation and data inconsistency

### CP-2: Role Profile Integrity
**Property:** For each role a user has, exactly one corresponding profile record must exist  
**Rationale:** Ensures data consistency and prevents orphaned profiles

### CP-3: Role Permission Isolation
**Property:** Users can only access features and data permitted by their active role  
**Rationale:** Maintains security and prevents unauthorized access

### CP-4: Supplier Type Validity
**Property:** All supplier profiles must have a valid supplier type from the defined enum  
**Rationale:** Ensures data integrity and proper categorization

### CP-5: Multi-Role Session Consistency
**Property:** When a user switches roles, their session must maintain authentication while updating permissions  
**Rationale:** Provides seamless UX without security compromise

## Non-Functional Requirements

### NFR-1: Performance
- Dashboard loads in <2s on 3G connection
- Role switching completes in <500ms
- Mobile-first responsive design
- Optimized for low-end Android devices

### NFR-2: Scalability
- Support for adding new supplier types without schema changes
- Extensible role system for future role types
- Modular dashboard architecture

### NFR-3: Security
- Role-based access control (RBAC)
- Protected API routes
- Secure role switching
- Admin verification for sensitive roles

### NFR-4: Usability
- Intuitive role selection during onboarding
- Clear role indicator in navigation
- Smooth role switching UX
- Consistent design across all dashboards

## Technical Constraints

### TC-1: Database Architecture
- Use existing Prisma schema as foundation
- Add new models without breaking existing relationships
- Maintain single User table for authentication
- Use relational profile models for role-specific data

### TC-2: Authentication
- Continue using Supabase Auth for authentication
- Use Prisma for role and profile management
- Implement RBAC middleware

### TC-3: Frontend Architecture
- Use mock data initially for new features
- Separate UI components from business logic
- Implement lazy loading for dashboard modules
- Use dynamic imports for role-specific features

## Out of Scope (Phase 1)
- Payment processing integration
- Advanced AI farming insights
- Real-time chat between users
- Mobile native apps
- Multi-language support
- Advanced logistics tracking
