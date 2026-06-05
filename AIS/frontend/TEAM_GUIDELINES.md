# 👥 Team Development Guidelines

This document establishes standards for consistent, scalable development on the LaptopShop project.

---

## 📋 Table of Contents

1. [Code Organization Standards](#code-organization-standards)
2. [Component Guidelines](#component-guidelines)
3. [Import Standards](#import-standards)
4. [State Management Guidelines](#state-management-guidelines)
5. [Service Layer Standards](#service-layer-standards)
6. [Code Review Checklist](#code-review-checklist)
7. [Naming Conventions](#naming-conventions)
8. [File Structure Rules](#file-structure-rules)
9. [Common Patterns](#common-patterns)
10. [Anti-Patterns to Avoid](#anti-patterns-to-avoid)

---

## 🏗️ Code Organization Standards

### Rule 1: Feature-Based Organization
All new features must be created in `/src/features/`:

```
✅ CORRECT
src/features/my-feature/
├── components/
├── hooks/
├── services/
├── context/
├── types.ts
└── index.js

❌ INCORRECT
src/
├── MyFeatureComponent.jsx
├── myFeatureHook.js
├── myFeatureService.js
```

### Rule 2: Barrel Exports Required
Every folder must have an `index.js` that exports all public items:

```javascript
// ✅ CORRECT - src/features/my-feature/index.js
export { default as MyComponent } from './components/MyComponent';
export { useMyHook } from './hooks/useMyHook';
export { myService } from './services/myService';

// ✅ Components can be imported as:
import { MyComponent } from '@/features/my-feature';
```

### Rule 3: No Deep Imports
Never import from nested paths:

```javascript
// ❌ BAD
import Button from '@/components/ui/button/Button.jsx';
import { useCart } from '@/context/CartContext.jsx';

// ✅ GOOD
import { Button } from '@/components';
import { useCart } from '@/context';
```

---

## 🧩 Component Guidelines

### Rule 1: Small, Focused Components
Each component should have a single responsibility:

```javascript
// ❌ BAD - Too many responsibilities
function ProductList() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(setProducts);
  }, []);
  
  const handleAddToCart = (product) => {
    // ... complex logic
  };
  
  const handleFilter = (category) => {
    // ... complex logic
  };
  
  return (
    <div>
      {/* Complex JSX */}
    </div>
  );
}

// ✅ GOOD - Separated concerns
function ProductList({ onAddToCart, onFilter }) {
  const [products, setProducts] = useState([]);
  const { getProducts } = useProducts();
  
  useEffect(() => {
    getProducts();
  }, []);
  
  return (
    <div>
      {products.map(p => (
        <ProductCard 
          key={p.id} 
          product={p} 
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
```

### Rule 2: Use JSDoc Comments
Document every component:

```javascript
/**
 * ProductCard
 * 
 * Displays a single product with image, price, and action buttons.
 * 
 * @param {Product} product - The product to display
 * @param {Function} onAddToCart - Callback when add to cart is clicked
 * @param {Boolean} showWishlist - Whether to show wishlist button
 * 
 * @example
 * <ProductCard 
 *   product={product}
 *   onAddToCart={(p) => handleAdd(p)}
 *   showWishlist={true}
 * />
 */
export default function ProductCard({ product, onAddToCart, showWishlist }) {
  // ...
}
```

### Rule 3: Component Props Structure
Use object destructuring for multiple props:

```javascript
// ❌ Unclear what props are needed
function MyComponent(props) {
  return <div>{props.name}</div>;
}

// ✅ Clear and self-documenting
function MyComponent({ name, email, isActive = false }) {
  return <div>{name}</div>;
}

// ✅ With type annotation (TypeScript)
interface MyComponentProps {
  name: string;
  email: string;
  isActive?: boolean;
}

function MyComponent({ name, email, isActive = false }: MyComponentProps) {
  return <div>{name}</div>;
}
```

### Rule 4: Component Files Location
- **UI Components** (atomic) → `src/components/ui/`
- **Shared Components** (cross-page) → `src/components/shared/`
- **Feature Components** → `src/features/feature-name/components/`

---

## 📥 Import Standards

### Rule 1: Import Order
Follow this import order in all files:

```javascript
// 1. React and Next.js imports
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// 2. Component imports (barrel exports)
import { Button, Card } from '@/components';
import { Navbar } from '@/components';

// 3. Hook imports
import { useAuth, useCart } from '@/context';
import { useNavigation } from '@/hooks';

// 4. Service and utility imports
import { productService } from '@/services';
import { formatPrice, isValidEmail } from '@/utils';

// 5. Constants and types
import { ROUTES, API_BASE_URL } from '@/constants';
import type { Product, User } from '@/types';

// 6. Local styles
import styles from './MyComponent.module.css';
```

### Rule 2: Barrel Export Usage
Always use barrel exports:

```javascript
// ✅ GOOD
import { Button, Card, Input } from '@/components';
import { useAuth, useCart } from '@/context';

// ❌ BAD
import Button from '@/components/ui/button/Button.jsx';
import { AuthContext } from '@/context/AuthContext.jsx';
```

### Rule 3: Relative Imports Exception
Only use relative imports within the same feature:

```javascript
// src/features/product-catalog/components/ProductGrid.jsx
import { useProducts } from '../hooks';  // ✅ OK within feature
import { productService } from '../services';  // ✅ OK within feature
import { useAuth } from '@/context';  // ✅ Use barrel for global
```

---

## 🧠 State Management Guidelines

### Rule 1: Global State (Context) Usage
Use context only for truly global state:

```javascript
// ✅ GOOD - Global state
// User auth - needed everywhere
<AuthProvider>

// Shopping cart - accessed from multiple pages
<CartProvider>

// ❌ BAD - Local state better as component state
// Product filter selections - only used in one component
// Pagination state - only used in one page
```

### Rule 2: Context Hook Pattern
Export both context and hook from context files:

```javascript
// ✅ CORRECT - src/context/MyContext.jsx
export const MyContext = createContext();

export function MyProvider({ children }) {
  // ... logic
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
}

export function useMyContext() {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within MyProvider');
  }
  return context;
}
```

### Rule 3: Local State Preference
Prefer component state over context:

```javascript
// ❌ BAD - Context overkill
const [isModalOpen, setIsModalOpen] = useContext(UIContext);

// ✅ GOOD - Local state
const [isModalOpen, setIsModalOpen] = useState(false);
```

---

## 🔌 Service Layer Standards

### Rule 1: No Direct API Calls in Components
All API calls must go through services:

```javascript
// ❌ BAD - API call in component
function MyComponent() {
  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(setProducts);
  }, []);
}

// ✅ GOOD - API call in service
function MyComponent() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    productService.getProducts().then(setProducts);
  }, []);
}
```

### Rule 2: Service Structure
Services should be organized by domain:

```javascript
// src/services/productService.js
export const productService = {
  async getProducts(page = 1) {
    return apiClient.get(`/products?page=${page}`);
  },
  
  async getProductById(id) {
    return apiClient.get(`/products/${id}`);
  },
  
  async searchProducts(query) {
    return apiClient.get(`/products/search?q=${query}`);
  }
};
```

### Rule 3: Error Handling
Services should handle errors gracefully:

```javascript
// ✅ GOOD - Error handling in service
export const productService = {
  async getProducts(page = 1) {
    try {
      return await apiClient.get(`/products?page=${page}`);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw new Error('Unable to load products. Please try again.');
    }
  }
};
```

---

## ✅ Code Review Checklist

Use this checklist when reviewing code:

### Structure
- [ ] Uses barrel exports for imports
- [ ] Component in correct folder (ui/, shared/, or features/)
- [ ] Has `index.js` exporting the component
- [ ] One responsibility per component
- [ ] File naming follows conventions

### Imports
- [ ] No deep imports (`@/components/ui/button/Button.jsx` is bad)
- [ ] Correct import order (React → Components → Hooks → Utils → Constants)
- [ ] All imports are from barrel exports where applicable

### State Management
- [ ] Global state in context, not component state
- [ ] No context for temporary/local state
- [ ] Proper hook usage without circular dependencies

### API & Services
- [ ] No `fetch()` calls in components
- [ ] All API calls in services
- [ ] Error handling implemented
- [ ] API calls in hooks/effects, not on render

### Code Quality
- [ ] JSDoc comments for components
- [ ] No magic strings/numbers
- [ ] Consistent naming conventions
- [ ] TypeScript types defined

### Testing
- [ ] Component testable in isolation
- [ ] Hooks testable independently
- [ ] Services can be mocked

### Documentation
- [ ] Explained why this component is needed
- [ ] Usage examples provided
- [ ] Props documented

---

## 📝 Naming Conventions

### Components
```javascript
// File names: PascalCase
ProductCard.jsx
ShoppingCart.jsx
UserProfile.jsx

// Exports: Default export
export default ProductCard;
```

### Hooks
```javascript
// File names: camelCase with 'use' prefix
useProducts.js
useAuth.js
useLocalStorage.js

// Usage
export const useProducts = () => { ... };
```

### Services
```javascript
// File names: camelCase with 'Service' suffix
productService.js
authService.js
userService.js

// Exports
export const productService = { ... };
```

### Utilities
```javascript
// File names: camelCase with domain name
stringUtils.js
dateUtils.js
validationUtils.js

// Exports: Named exports
export const formatPrice = (price) => { ... };
export const isValidEmail = (email) => { ... };
```

### Constants
```javascript
// Constants: UPPER_SNAKE_CASE
API_BASE_URL
PRODUCT_LIST_PAGE_SIZE
DEFAULT_CURRENCY
```

### CSS Classes
```css
/* CSS Classes: kebab-case */
.product-card { }
.navbar-logo { }
.user-menu-container { }
```

---

## 📁 File Structure Rules

### Folder Naming
- All lowercase
- Use hyphens for multiple words
- Descriptive names

```javascript
✅ src/features/product-catalog/
✅ src/components/shared/
✅ src/hooks/

❌ src/features/ProductCatalog/
❌ src/components/Shared/
❌ src/hooks/
```

### File Naming
- **Components**: PascalCase (Button.jsx)
- **Hooks**: camelCase with `use` prefix (useCart.js)
- **Services**: camelCase with `Service` suffix (productService.js)
- **Utils**: camelCase (stringUtils.js)
- **Styles**: [ComponentName].module.css

### Index Files
Every folder must have an `index.js`:

```javascript
// ✅ src/features/my-feature/index.js
export { default as MyComponent } from './components/MyComponent';
export { useMyHook } from './hooks/useMyHook';
```

---

## 🎯 Common Patterns

### Pattern 1: Feature Component with Hook

```javascript
// src/features/product-catalog/components/ProductList.jsx
import { useProducts } from '../hooks';
import { ProductCard } from './ProductCard';

export default function ProductList() {
  const { products, isLoading } = useProducts();
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}

// src/features/product-catalog/hooks/useProducts.js
import { productService } from '../services';
import { useState, useEffect } from 'react';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    productService.getProducts()
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, []);
  
  return { products, isLoading };
};

// src/features/product-catalog/index.js
export { default as ProductList } from './components/ProductList';
export { useProducts } from './hooks/useProducts';
```

### Pattern 2: Context Provider

```javascript
// src/context/MyContext.jsx
'use client';

import { createContext, useContext, useState } from 'react';

export const MyContext = createContext();

export function MyProvider({ children }) {
  const [data, setData] = useState(null);
  
  const value = { data, setData };
  
  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
}

export function useMyContext() {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within MyProvider');
  }
  return context;
}

// src/app/layout.js
import { MyProvider } from '@/context';

export default function RootLayout({ children }) {
  return (
    <MyProvider>
      {children}
    </MyProvider>
  );
}
```

---

## ⚠️ Anti-Patterns to Avoid

### Anti-Pattern 1: API Calls in Components
```javascript
// ❌ DON'T
function MyComponent() {
  useEffect(() => {
    fetch('/api/data').then(r => r.json()).then(setData);
  }, []);
}

// ✅ DO
function MyComponent() {
  const { data } = useMyData();
}
```

### Anti-Pattern 2: Deep Imports
```javascript
// ❌ DON'T
import Button from '@/components/ui/button/Button.jsx';

// ✅ DO
import { Button } from '@/components';
```

### Anti-Pattern 3: Context for Local State
```javascript
// ❌ DON'T
const [isOpen, setIsOpen] = useContext(UIContext);

// ✅ DO
const [isOpen, setIsOpen] = useState(false);
```

### Anti-Pattern 4: Magic Strings
```javascript
// ❌ DON'T
const url = 'http://localhost:3001/api/products?limit=20';

// ✅ DO
import { API_BASE_URL, PRODUCT_LIST_PAGE_SIZE } from '@/constants';
const url = `${API_BASE_URL}/products?limit=${PRODUCT_LIST_PAGE_SIZE}`;
```

### Anti-Pattern 5: No Error Handling
```javascript
// ❌ DON'T
productService.getProducts().then(setProducts);

// ✅ DO
productService.getProducts()
  .then(setProducts)
  .catch(error => console.error('Failed:', error));
```

---

## 🎓 Enforcement

### Code Review Process
1. All PRs must follow this guideline
2. Reviewer uses the checklist above
3. Request changes if violations found
4. Auto-formatting tools can catch some violations

### Team Discussions
- Monthly architecture reviews
- Share learnings and patterns
- Discuss improvements to guidelines
- Update guidelines as needed

---

## 🤝 Contributing

When in doubt:
1. Check ARCHITECTURE.md
2. Look at similar components
3. Ask the team
4. Follow the established patterns

---

**Consistency = Scalability = Happy Team** ✨

Last Updated: June 5, 2024
