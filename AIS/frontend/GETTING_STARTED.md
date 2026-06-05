# 🛒 LaptopShop E-Commerce Frontend

A production-grade Next.js 15+ e-commerce application for a laptop shop, built with scalability, maintainability, and team collaboration in mind.

## 🎯 Quick Start for New Developers

### 1. Understanding the Architecture

Read [ARCHITECTURE.md](./ARCHITECTURE.md) for the complete guide. Key points:

- **Components** live in `src/components/` - centralized barrel exports
- **Features** live in `src/features/` - feature-based architecture
- **Global state** in `src/context/` - access via hooks like `useAuth()`, `useCart()`
- **API calls** in `src/services/` - never call APIs directly in components
- **Constants** in `src/constants/` - use `ROUTES`, `API_BASE_URL`, etc.
- **Types** in `src/types/` - all TypeScript types and interfaces
- **Utilities** in `src/utils/` - pure helper functions

### 2. Common Imports

```javascript
// ✅ Components (barrel exports)
import { Button, Card, Input, Modal, Navbar } from '@/components';

// ✅ Hooks
import { useAuth, useCart } from '@/context';
import { useNavigation, useLocalStorage } from '@/hooks';

// ✅ Services and Utilities
import { productService } from '@/services';
import { formatPrice, isValidEmail } from '@/utils';

// ✅ Constants and Types
import { ROUTES, API_BASE_URL } from '@/constants';
import type { Product, User, Order } from '@/types';
```

### 3. Creating Your First Component

```javascript
// ✅ Good pattern - Use barrel exports
import { Button, Card } from '@/components';
import { ROUTES } from '@/constants';
import Link from 'next/link';

export default function MyComponent() {
  return (
    <Card>
      <p>Welcome!</p>
      <Link href={ROUTES.PRODUCTS}>
        <Button>Shop Now</Button>
      </Link>
    </Card>
  );
}
```

---

## 📁 Folder Structure Reference

```
src/
├── app/                 # Next.js App Router pages
├── components/          # ⭐ All reusable components
│   ├── ui/             # Base components (Button, Card, etc.)
│   └── shared/         # Shared layout (Navbar, Footer, etc.)
├── features/           # Feature-based modules (Product Catalog, Cart, etc.)
├── context/            # Global state providers (Auth, Cart)
├── hooks/              # Custom reusable hooks
├── services/           # API calls and business logic
├── utils/              # Pure utility functions
├── types/              # TypeScript interfaces
├── constants/          # Global constants and config
├── layouts/            # Layout wrappers (reserved)
└── assets/             # Images and static files
```

---

## 🚀 Available Features

### Implemented
- ✅ **Navbar** - Full navigation with search, cart badge, user menu
- ✅ **UI Components** - Button, Card, Input, Modal
- ✅ **Authentication Context** - User state management
- ✅ **Cart Context** - Shopping cart with localStorage sync
- ✅ **Type Definitions** - Complete TypeScript types for all entities
- ✅ **Constants** - Centralized routes, API config, validation rules
- ✅ **Services** - API client and product service
- ✅ **Hooks** - Navigation, localStorage helpers
- ✅ **Utilities** - String, date, and validation helpers

### Ready to Build (Feature Templates)
- 📋 Product Catalog - Components/hooks/services structure
- 🛒 Shopping Cart - Context, components, utilities
- ❤️ Wishlist - Template ready
- 🔐 Authentication - Context provider ready
- 📊 User Dashboard - Feature folder ready
- 💳 Checkout - Feature folder ready

---

## 📖 Development Workflow

### Adding a New Component

```javascript
// 1. Create in src/components/shared/ (if shared) or src/features/*/components/
// 2. Create component file and styles
// 3. Export from component's index.js
// 4. Add to parent barrel export (shared/index.js or ui/index.js)
// 5. Now accessible as import { YourComponent } from '@/components'
```

### Adding a New Feature

```
1. Create folder: src/features/my-feature/
2. Create subfolders: components/, hooks/, services/, context/
3. Add files following the pattern
4. Create index.js with barrel exports
5. Import in pages: import { MyComponent } from '@/features/my-feature'
```

### Adding a Custom Hook

```javascript
// 1. Create in src/hooks/useMyHook.js
// 2. Export from src/hooks/index.js
// 3. Import: import { useMyHook } from '@/hooks'
```

---

## 🔑 Key Files to Know

| File | Purpose |
|------|---------|
| [src/app/layout.js](./src/app/layout.js) | Root layout with context providers |
| [src/components/index.js](./src/components/index.js) | Main component barrel export |
| [src/constants/index.ts](./src/constants/index.ts) | All global constants |
| [src/types/index.ts](./src/types/index.ts) | All TypeScript types |
| [src/context/index.js](./src/context/index.js) | Global state providers |
| [src/services/index.js](./src/services/index.js) | API services |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Complete architecture guide |

---

## 🎨 Component Showcase

### Navbar Component
The **Navbar** demonstrates best practices:
- Mobile-responsive design
- Icon badges for cart/wishlist
- User authentication dropdown
- Search functionality
- CSS Module scoping
- Centralized constants usage

Try it: Already integrated in the root layout!

### UI Components
- **Button** - Multiple variants (primary, secondary, danger) and sizes
- **Card** - Container with hover effects
- **Input** - Form input with validation display
- **Modal** - Reusable dialog component

Usage:
```javascript
import { Button, Card, Input, Modal } from '@/components';

// Examples
<Button variant="primary" size="lg">Click Me</Button>
<Card hover={true}><p>Content</p></Card>
<Input label="Email" type="email" error="Invalid email" />
<Modal isOpen={true} title="Confirm">Are you sure?</Modal>
```

---

## 🔌 Context Providers

### Auth Context
```javascript
import { useAuth } from '@/context';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  return <div>{isAuthenticated ? 'Logged in' : 'Not logged in'}</div>;
}
```

### Cart Context
```javascript
import { useCart } from '@/context';

function MyComponent() {
  const { cart, addItem, removeItem, totalItems } = useCart();
  return <div>Items in cart: {totalItems}</div>;
}
```

---

## 📝 Naming Conventions

### Components
- PascalCase: `ProductCard.jsx`, `ShoppingCart.jsx`

### Hooks
- camelCase with `use` prefix: `useProduct.js`, `useNavigation.js`

### Services
- camelCase: `productService.js`, `authService.js`

### Utils
- camelCase: `formatPrice()`, `isValidEmail()`

### Constants
- UPPER_SNAKE_CASE: `API_BASE_URL`, `PRODUCT_LIST_PAGE_SIZE`

### CSS Classes
- kebab-case: `.product-card`, `.navbar-logo`

---

## 🚦 Import Priority

When importing, prioritize this order:

1. ✅ **Barrel exports** (recommended)
   ```javascript
   import { Button } from '@/components';
   import { useCart } from '@/context';
   ```

2. ✅ **Named exports**
   ```javascript
   import { productService } from '@/services';
   import { formatPrice } from '@/utils';
   ```

3. ⚠️ **Relative imports** (only within features)
   ```javascript
   import { useProducts } from '../hooks';  // OK within feature
   import { ProductCard } from '../components';
   ```

4. ❌ **Deep imports** (avoid)
   ```javascript
   import Button from '@/components/ui/button/Button.jsx';  // Bad
   ```

---

## 🛠️ Environment Setup

### Configure jsconfig.json
✅ Already configured with path aliases (`@/` points to `src/`)

### Install Dependencies
```bash
npm install
# or
yarn install
```

### Start Development
```bash
npm run dev
# Navigate to http://localhost:3000
```

---

## 📚 Learning Resources

### Inside This Project
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Complete architecture guide (READ FIRST!)
- [src/components/shared/navbar/Navbar.jsx](./src/components/shared/navbar/Navbar.jsx) - Production-quality component example
- [src/context/AuthContext.jsx](./src/context/AuthContext.jsx) - Context provider example
- [src/services/productService.js](./src/services/productService.js) - Service layer example

### External Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)
- [React Hooks](https://react.dev/reference/react)
- [CSS Modules](https://nextjs.org/docs/app/building-your-application/styling/css-modules)

---

## 🤝 Team Guidelines

### Before Writing Code
1. Read [ARCHITECTURE.md](./ARCHITECTURE.md)
2. Review existing similar components
3. Follow the established patterns

### Code Review Checklist
- ✅ Uses barrel exports
- ✅ Constants instead of magic strings
- ✅ Types are properly defined
- ✅ Components are small and focused
- ✅ API calls are in services, not components
- ✅ Follows naming conventions
- ✅ CSS Modules for styles
- ✅ Proper documentation

### Common Questions?
1. "Where should this component go?" → See folder structure
2. "How do I use the Navbar?" → Already in root layout
3. "How do I add a new page?" → Create in `app/` folder
4. "How do I access user data?" → Use `useAuth()` hook
5. "How do I fetch data?" → Use services in hooks

---

## 🎯 Next Steps

1. ✅ **Understand the architecture** - Read ARCHITECTURE.md (30 mins)
2. ✅ **Review Navbar component** - See how it's structured (10 mins)
3. ✅ **Try using components** - Create a test page (15 mins)
4. ✅ **Add your first feature** - Follow the feature template (1-2 hours)

---

## 📞 Need Help?

- **Architecture questions?** → See [ARCHITECTURE.md](./ARCHITECTURE.md)
- **How to add a feature?** → See "Feature Development Guide" in ARCHITECTURE.md
- **Component examples?** → Check [src/components/](./src/components/)
- **API integration?** → Check [src/services/](./src/services/)

---

**Built with ❤️ following enterprise Next.js best practices.**

Last Updated: 2024
