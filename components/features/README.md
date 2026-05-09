# Feature Components

This directory contains feature-specific components that combine primitive UI components with business logic.

## Organization

Components are organized by feature domain:

```
features/
├── auth/           # Authentication components (login, register, etc.)
├── farms/          # Farm management components
├── listings/       # Marketplace listing components
├── offers/         # Offer management components
├── notifications/  # Notification components
└── shared/         # Shared feature components
```

## Component Guidelines

### 1. Feature Components vs UI Components

**UI Components** (`components/ui/`):
- Primitive, reusable building blocks
- No business logic
- Accept data via props
- Examples: Button, Input, Card

**Feature Components** (`components/features/`):
- Domain-specific functionality
- May contain business logic
- Compose UI components
- Examples: LoginForm, FarmCard, ListingGrid

### 2. Naming Conventions

- Use PascalCase for component files: `FarmCard.tsx`
- Use descriptive names that indicate purpose: `CreateListingForm.tsx`
- Suffix with component type when helpful: `FarmList.tsx`, `OfferCard.tsx`

### 3. Component Structure

```typescript
// components/features/farms/FarmCard.tsx
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface FarmCardProps {
  farm: {
    id: string
    name: string
    location: string
    sizeInAcres: number
  }
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export function FarmCard({ farm, onEdit, onDelete }: FarmCardProps) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">{farm.name}</h3>
      </CardHeader>
      <CardBody>
        <p>Location: {farm.location}</p>
        <p>Size: {farm.sizeInAcres} acres</p>
      </CardBody>
      {(onEdit || onDelete) && (
        <CardFooter>
          {onEdit && (
            <Button onClick={() => onEdit(farm.id)} variant="outline">
              Edit
            </Button>
          )}
          {onDelete && (
            <Button onClick={() => onDelete(farm.id)} variant="danger">
              Delete
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
```

### 4. State Management

- **Local state**: Use `useState` for component-specific state
- **Form state**: Use controlled components or form libraries
- **Server state**: Use TanStack Query for data fetching
- **Global state**: Use Zustand for cross-component state

### 5. Data Fetching

Feature components should use TanStack Query for data fetching:

```typescript
import { useQuery } from '@tanstack/react-query'

export function FarmList() {
  const { data: farms, isLoading, error } = useQuery({
    queryKey: ['farms'],
    queryFn: () => fetch('/api/farms').then((res) => res.json()),
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading farms</div>

  return (
    <div className="grid gap-4">
      {farms.map((farm) => (
        <FarmCard key={farm.id} farm={farm} />
      ))}
    </div>
  )
}
```

### 6. TypeScript Types

- Import types from `@/types` for shared types
- Define component-specific types inline or in adjacent `.types.ts` file
- Use strict typing for all props and state

### 7. Accessibility

- Use semantic HTML elements
- Include ARIA labels where needed
- Ensure keyboard navigation works
- Test with screen readers

### 8. Testing

- Write unit tests for complex logic
- Write integration tests for user flows
- Use React Testing Library
- Test accessibility with jest-axe

## Examples

### Authentication Feature

```
features/auth/
├── LoginForm.tsx       # Login form component
├── RegisterForm.tsx    # Registration form component
├── PasswordReset.tsx   # Password reset component
└── AuthGuard.tsx       # Route protection component
```

### Farm Management Feature

```
features/farms/
├── FarmCard.tsx        # Display single farm
├── FarmList.tsx        # List of farms
├── FarmForm.tsx        # Create/edit farm form
└── CropCycleCard.tsx   # Display crop cycle
```

### Marketplace Feature

```
features/listings/
├── ListingCard.tsx     # Display single listing
├── ListingGrid.tsx     # Grid of listings
├── ListingForm.tsx     # Create/edit listing form
└── ListingFilters.tsx  # Filter controls
```

## Best Practices

1. **Keep components focused**: Each component should have a single responsibility
2. **Compose, don't duplicate**: Reuse UI components instead of recreating styles
3. **Props over configuration**: Pass behavior via props rather than hardcoding
4. **Error boundaries**: Wrap feature components in error boundaries
5. **Loading states**: Always handle loading and error states
6. **Responsive design**: Use Tailwind's responsive classes
7. **Performance**: Use React.memo() for expensive components
8. **Documentation**: Add JSDoc comments for complex components

## Import Aliases

Use the `@/` alias for absolute imports:

```typescript
import { Button } from '@/components/ui/Button'
import { FarmCard } from '@/components/features/farms/FarmCard'
import { useAuth } from '@/lib/hooks/useAuth'
import type { Farm } from '@/types'
```

## Questions?

Refer to:
- UI component examples in `components/ui/`
- Layout components in `components/layouts/`
- Type definitions in `types/`
- API utilities in `lib/api/`
