# 🎯 Quick Import Reference Card

> Keep this handy while coding!

## ✅ Import from Barrel Exports

```javascript
// 🎨 UI Components
import { Button, Card, Input, Modal } from '@/components';

// 🏗️ Shared Components
import { Navbar } from '@/components';

// 🧠 Custom Hooks
import { useAuth, useCart } from '@/context';
import { useNavigation, useLocalStorage } from '@/hooks';

// 🔌 Services
import { apiClient, productService } from '@/services';

// 🛠️ Utilities
import { 
  formatPrice, 
  truncate, 
  capitalize 
} from '@/utils';
import { formatDate, formatRelativeTime } from '@/utils';
import { isValidEmail, isValidPassword } from '@/utils';

// 📋 Constants
import { ROUTES, API_BASE_URL, CURRENCY_SYMBOL } from '@/constants';

// 📦 Types
import type { Product, User, Order, Cart } from '@/types';
```

---

## 🎨 UI Components Quick Syntax

```javascript
import { Button, Card, Input, Modal } from '@/components';

// Button
<Button variant="primary" size="lg">Click</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="danger" disabled>Delete</Button>
<Button fullWidth>Full Width</Button>

// Card
<Card hover={true}>
  <h3>Title</h3>
  <p>Content</p>
</Card>

// Input
<Input 
  type="email" 
  label="Email" 
  placeholder="user@example.com"
  error={errors.email}
  required
/>

// Modal
<Modal isOpen={isOpen} onClose={closeModal} title="Confirm">
  Are you sure?
</Modal>
```

---

## 🧠 Global State Quick Syntax

```javascript
// Auth Context
import { useAuth } from '@/context';

const MyComponent = () => {
  const { user, isAuthenticated, login, logout, isLoading } = useAuth();
  return (
    <div>
      {isAuthenticated ? (
        <>Welcome {user.firstName}</>
      ) : (
        <button onClick={() => login(email, password)}>Login</button>
      )}
    </div>
  );
};

// Cart Context
import { useCart } from '@/context';

const CartPage = () => {
  const { cart, addItem, removeItem, updateQuantity, totalItems } = useCart();
  return (
    <div>
      <p>Items: {totalItems}</p>
      <p>Total: ${cart.totalPrice}</p>
    </div>
  );
};
```

---

## 🔌 Custom Hooks Quick Syntax

```javascript
// Navigation
import { useNavigation } from '@/hooks';

const MyComponent = () => {
  const { goProducts, goCheckout, push } = useNavigation();
  
  return (
    <button onClick={goProducts}>Shop</button>
  );
};

// Local Storage
import { useLocalStorage } from '@/hooks';

const MyComponent = () => {
  const [name, setName, isLoaded] = useLocalStorage('username', 'Guest');
  
  return (
    <>
      <p>Hello {name}</p>
      <input onChange={e => setName(e.target.value)} />
    </>
  );
};
```

---

## 📡 API Calls Quick Syntax

```javascript
import { productService } from '@/services';

// Get all products
const products = await productService.getProducts(1, 'Gaming');

// Get single product
const product = await productService.getProductById('123');

// Search products
const results = await productService.searchProducts('MacBook');

// Featured products
const featured = await productService.getFeaturedProducts();

// Using in component with hook
function ProductsList() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    productService.getProducts(1).then(setProducts);
  }, []);
  
  return products.map(p => <ProductCard key={p.id} product={p} />);
}
```

---

## 🛠️ Utilities Quick Syntax

```javascript
import { 
  formatPrice,
  truncate,
  capitalize,
  formatDate,
  formatRelativeTime,
  isValidEmail,
  isValidPassword
} from '@/utils';

// String Utils
formatPrice(49.99)              // "$49.99"
truncate("Long string...", 10) // "Long stri..."
capitalize("hello")            // "Hello"

// Date Utils
formatDate(new Date())                    // "June 5, 2024"
formatDate(new Date(), 'short')          // "Jun 5, 24"
formatRelativeTime(new Date())           // "just now"
formatRelativeTime('2024-06-01')         // "4d ago"

// Validation Utils
isValidEmail("user@example.com")         // true
isValidPassword("MyP@ss123")             // true (8+ chars)
```

---

## 📋 Constants Quick Reference

```javascript
import { ROUTES, CURRENCY_SYMBOL, DEFAULT_PAGE_SIZE } from '@/constants';

// Routes
ROUTES.HOME              // "/"
ROUTES.PRODUCTS          // "/products"
ROUTES.PRODUCT_DETAIL    // "/products/:id"
ROUTES.CART              // "/cart"
ROUTES.CHECKOUT          // "/checkout"
ROUTES.LOGIN             // "/auth/login"
ROUTES.DASHBOARD         // "/dashboard"

// Usage in navigation
<Link href={ROUTES.PRODUCTS}>Products</Link>
<Link href={`${ROUTES.PRODUCTS}/${productId}`}>Details</Link>

// Pricing
CURRENCY_SYMBOL          // "$"
TAX_RATE                 // 0.08 (8%)

// Pagination
DEFAULT_PAGE_SIZE        // 20
PRODUCT_LIST_PAGE_SIZE   // 12
```

---

## 📦 Common TypeScript Types

```typescript
import type { 
  Product,
  Cart,
  CartItem,
  User,
  Order,
  OrderStatus,
  ApiResponse,
  PaginatedResponse
} from '@/types';

// Product type
const product: Product = {
  id: '1',
  name: 'MacBook Pro',
  price: 1299,
  image: 'image.jpg',
  inStock: true,
  // ... other fields
};

// Cart type
const cart: Cart = {
  id: '1',
  items: [],
  totalPrice: 0,
  totalItems: 0,
  // ... other fields
};

// API Response type
const response: ApiResponse<Product> = {
  success: true,
  data: product
};
```

---

## ❌ DON'T DO

```javascript
// ❌ Deep imports
import Button from '@/components/ui/button/Button.jsx';

// ❌ Magic strings
const url = 'http://localhost:3001/api/products';
const limit = 20;

// ❌ API calls in components
useEffect(() => {
  fetch('/api/products').then(r => r.json()).then(setProducts);
}, []);

// ❌ Relative imports (use barrel exports)
import { formatPrice } from '../../utils/stringUtils';

// ❌ Props drilling for global state
<Component user={user} cart={cart} />
```

---

## ✅ DO

```javascript
// ✅ Barrel exports
import { Button } from '@/components';

// ✅ Use constants
import { API_BASE_URL, PRODUCT_LIST_PAGE_SIZE } from '@/constants';
const url = `${API_BASE_URL}/products?limit=${PRODUCT_LIST_PAGE_SIZE}`;

// ✅ API calls in services/hooks
import { productService } from '@/services';
useEffect(() => {
  productService.getProducts(1).then(setProducts);
}, []);

// ✅ Barrel exports for utilities
import { formatPrice } from '@/utils';

// ✅ Use context hooks for global state
const { user, isAuthenticated } = useAuth();
const { cart, totalItems } = useCart();
```

---

## 🎯 Component Creation Checklist

When creating a new component:

- [ ] Use barrel exports for imports
- [ ] Place component in correct folder (`components/shared/`, `components/ui/`, or `features/*/`)
- [ ] Create `index.js` that exports the component
- [ ] Use CSS Modules for styles (`.module.css`)
- [ ] Add to parent barrel export
- [ ] Add JSDoc comment explaining the component
- [ ] Use TypeScript types for props (if using .jsx/.tsx)
- [ ] Extract magic strings to constants
- [ ] Keep component focused and small
- [ ] Test imports work from barrel export

---

## 📝 Documentation Template

Copy this for new components:

```javascript
/**
 * ComponentName
 * 
 * Brief description of what this component does.
 * 
 * Features:
 * - Feature 1
 * - Feature 2
 * 
 * Usage:
 * <ComponentName prop1="value" prop2={true} />
 */

import styles from './ComponentName.module.css';

export default function ComponentName({ prop1, prop2 }) {
  return <div>{/* JSX */}</div>;
}
```

---

**Save this file as a bookmark! 🔖**

Last Updated: 2024
