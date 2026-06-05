# 🎨 Architecture Visualization

Visual representations of the LaptopShop architecture structure and data flow.

---

## 📊 Folder Structure Diagram

```
src/
│
├── 📁 app/                          # Next.js App Router
│   ├── layout.js                    # Root layout (providers here)
│   ├── page.js                      # Home page
│   ├── globals.css                  # Global styles
│   └── laptop/
│       ├── page.jsx                 # Laptop list page
│       └── [id]/
│           └── page.jsx             # Laptop detail page
│
├── 📁 components/                   # ⭐ ALL REUSABLE COMPONENTS
│   ├── ⭐ index.js                  # MAIN BARREL EXPORT
│   │
│   ├── 📁 ui/                       # 🔷 Base UI Components (Atomic)
│   │   ├── ⭐ index.js              # Barrel: exports Button, Card, Input, Modal
│   │   ├── button/
│   │   │   ├── Button.jsx           # Component logic
│   │   │   ├── Button.module.css    # Scoped styles
│   │   │   └── index.js             # Component export
│   │   ├── card/
│   │   │   ├── Card.jsx
│   │   │   ├── Card.module.css
│   │   │   └── index.js
│   │   ├── input/
│   │   │   ├── Input.jsx
│   │   │   ├── Input.module.css
│   │   │   └── index.js
│   │   └── modal/
│   │       ├── Modal.jsx
│   │       ├── Modal.module.css
│   │       └── index.js
│   │
│   └── 📁 shared/                   # 🔷 Cross-Page Components (Layout)
│       ├── ⭐ index.js              # Barrel: exports Navbar, Footer, etc.
│       ├── navbar/
│       │   ├── Navbar.jsx           # ⭐ FLAGSHIP COMPONENT
│       │   ├── Navbar.module.css
│       │   └── index.js
│       ├── footer/
│       ├── sidebar/
│       └── breadcrumbs/
│
├── 📁 features/                     # 🔷 FEATURE-BASED MODULES
│   ├── product-catalog/
│   │   ├── components/              # Feature-specific components
│   │   ├── hooks/                   # Feature-specific hooks
│   │   ├── services/                # Feature-specific API
│   │   ├── context/                 # Feature-specific state
│   │   ├── types.ts                 # Feature types
│   │   ├── constants.ts             # Feature constants (optional)
│   │   └── index.js                 # ⭐ Feature barrel export
│   │
│   ├── product-details/
│   ├── cart/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── context/
│   │   └── index.js
│   ├── wishlist/
│   ├── auth/
│   ├── user-dashboard/
│   └── checkout/
│
├── 📁 context/                      # 🔷 GLOBAL STATE PROVIDERS
│   ├── ⭐ index.js                  # Barrel: exports AuthProvider, CartProvider
│   ├── AuthContext.jsx              # User authentication state
│   └── CartContext.jsx              # Shopping cart state
│
├── 📁 hooks/                        # 🔷 CUSTOM REACT HOOKS
│   ├── ⭐ index.js                  # Barrel: all hooks
│   ├── useNavigation.js             # Navigation utilities
│   └── useLocalStorage.js           # LocalStorage management
│
├── 📁 services/                     # 🔷 API & BUSINESS LOGIC
│   ├── ⭐ index.js                  # Barrel: exports apiClient, productService
│   ├── api.js                       # HTTP client (base)
│   └── productService.js            # Product API calls
│
├── 📁 utils/                        # 🔷 PURE UTILITY FUNCTIONS
│   ├── ⭐ index.js                  # Barrel: exports all utilities
│   ├── stringUtils.js               # String helpers
│   ├── dateUtils.js                 # Date formatting
│   └── validationUtils.js           # Input validation
│
├── 📁 types/                        # 🔷 TYPESCRIPT TYPES
│   └── index.ts                     # Product, User, Cart, Order, etc.
│
├── 📁 constants/                    # 🔷 GLOBAL CONSTANTS
│   └── index.ts                     # ROUTES, API_BASE_URL, validation rules, etc.
│
├── 📁 layouts/                      # 🔷 LAYOUT WRAPPERS (Reserved)
│   └── (future use)
│
└── 📁 assets/                       # 🔷 STATIC FILES
    ├── images/
    └── icons/
```

---

## 🔄 Data Flow Architecture

```
┌────────────────────────────────────────────────────────────┐
│                    BROWSER / CLIENT                        │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐                                       │
│  │  User Actions  │                                       │
│  │  (Click, Type) │                                       │
│  └────────┬────────┘                                       │
│           │                                                │
│           ▼                                                │
│  ┌────────────────────────────────────────┐                │
│  │     COMPONENTS (UI Layer)              │                │
│  │  ┌─────────────────────────────────┐   │                │
│  │  │  Navbar.jsx                     │   │                │
│  │  │  ProductCard.jsx                │   │                │
│  │  │  CartSummary.jsx                │   │                │
│  │  └─────────────────────────────────┘   │                │
│  └────────┬─────────────────────────────┬──┘                │
│           │                             │                  │
│  ┌────────▼──────────┐      ┌──────────▼────────┐          │
│  │  HOOKS / STATE    │      │   EVENT HANDLERS  │          │
│  │  ┌──────────────┐ │      │  ┌──────────────┐ │          │
│  │  │ useAuth()    │ │      │  │ onClick()    │ │          │
│  │  │ useCart()    │ │      │  │ onChange()   │ │          │
│  │  │ useProducts()│ │      │  │ onSubmit()   │ │          │
│  │  └──────────────┘ │      │  └──────┬───────┘ │          │
│  └────────┬──────────┘      └─────────┼────────┘          │
│           │                           │                  │
│  ┌────────▼───────────────────────────▼───────────┐       │
│  │        CONTEXT PROVIDERS (Global State)        │       │
│  │  ┌───────────────────────────────────────────┐ │       │
│  │  │  AuthProvider                            │ │       │
│  │  │  └─ user, isAuthenticated, login/logout  │ │       │
│  │  └───────────────────────────────────────────┘ │       │
│  │  ┌───────────────────────────────────────────┐ │       │
│  │  │  CartProvider                            │ │       │
│  │  │  └─ cart, addItem, removeItem, totalItems│ │       │
│  │  └───────────────────────────────────────────┘ │       │
│  └────────┬──────────────────────────────────────┘       │
│           │                                              │
│  ┌────────▼──────────────────────────────────┐          │
│  │    SERVICES (API Abstraction Layer)       │          │
│  │  ┌──────────────────────────────────────┐ │          │
│  │  │  apiClient                          │ │          │
│  │  │  ├─ GET, POST, PUT, DELETE          │ │          │
│  │  │  └─ Error handling, Auth headers    │ │          │
│  │  └──────────────────────────────────────┘ │          │
│  │  ┌──────────────────────────────────────┐ │          │
│  │  │  productService                     │ │          │
│  │  │  ├─ getProducts()                   │ │          │
│  │  │  ├─ getProductById()                │ │          │
│  │  │  └─ searchProducts()                │ │          │
│  │  └──────────────────────────────────────┘ │          │
│  └────────┬──────────────────────────────────┘          │
│           │                                              │
│  ┌────────▼──────────────────────────────┐              │
│  │      UTILITIES & HELPERS              │              │
│  │  ┌────────────────────────────────┐   │              │
│  │  │  formatPrice()                 │   │              │
│  │  │  isValidEmail()                │   │              │
│  │  │  formatDate()                  │   │              │
│  │  └────────────────────────────────┘   │              │
│  └──────────────────────────────────────┘              │
│                                                         │
│  ┌──────────────────────────────────────────┐          │
│  │    CONSTANTS                            │          │
│  │  ┌──────────────────────────────────┐   │          │
│  │  │  ROUTES, API_BASE_URL            │   │          │
│  │  │  CURRENCY_SYMBOL, CACHE_DURATIONS│   │          │
│  │  │  VALIDATION_RULES                │   │          │
│  │  └──────────────────────────────────┘   │          │
│  └──────────────────────────────────────────┘          │
│                                                         │
└────────────────────────┬──────────────────────────────┘
                         │
                         │ HTTP Requests
                         │
                    ┌────▼──────┐
                    │   API     │
                    │  SERVER   │
                    └───────────┘
                         │
                    ┌────▼──────┐
                    │ DATABASE  │
                    └───────────┘
```

---

## 🔌 Component Hierarchy

```
┌─────────────────────────────────────────────────┐
│          ROOT LAYOUT (src/app/layout.js)        │
├─────────────────────────────────────────────────┤
│ <AuthProvider>                                  │
│   <CartProvider>                                │
│     <Navbar />  ──────────────────┐             │
│     <main>                        │             │
│       {children}                  │             │
│       ├─ ProductList              │             │
│       │  ├─ ProductCard           │ Uses        │
│       │  ├─ ProductCard    ────────── Global    │
│       │  └─ ProductCard           │ State       │
│       ├─ CartPage                 │             │
│       │  ├─ CartItem              │             │
│       │  ├─ CartItem    ──────────┘             │
│       │  └─ CartSummary                         │
│       └─ CheckoutFlow                          │
│          ├─ ShippingForm                       │
│          ├─ PaymentForm                        │
│          └─ OrderSummary                       │
│     </main>                                     │
│   </CartProvider>                               │
│ </AuthProvider>                                 │
└─────────────────────────────────────────────────┘
```

---

## 🧩 Component Import Pattern

```
┌────────────────────────────────────────┐
│     COMPONENTS (import path)           │
├────────────────────────────────────────┤
│                                        │
│  Level 0: Main Barrel Export           │
│  ┌────────────────────────────────┐   │
│  │  @/components                  │   │
│  │  imports: Button, Card, Input, │   │
│  │           Modal, Navbar        │   │
│  └────────────────────────────────┘   │
│                                        │
│              ▼                         │
│                                        │
│  Level 1: Category Barrel Exports      │
│  ┌────────────────────────────────┐   │
│  │  @/components/ui               │   │
│  │  @/components/shared           │   │
│  └────────────────────────────────┘   │
│                                        │
│              ▼                         │
│                                        │
│  Level 2: Component Barrel Exports     │
│  ┌────────────────────────────────┐   │
│  │  @/components/ui/button        │   │
│  │  @/components/shared/navbar    │   │
│  └────────────────────────────────┘   │
│                                        │
│              ▼                         │
│                                        │
│  Level 3: Direct Component (avoid)     │
│  ┌────────────────────────────────┐   │
│  │  @/components/ui/button/Button │   │
│  │  (Only needed if no barrel)    │   │
│  └────────────────────────────────┘   │
│                                        │
│  ⭐ ALWAYS USE: @/components          │
│  (Maximum abstraction, maximum      │
│   discoverability, maximum reuse)    │
└────────────────────────────────────────┘
```

---

## 🔄 Request/Response Cycle

```
Component
   │
   │  calls: productService.getProducts()
   │
   ▼
productService
   │
   │  calls: apiClient.get('/products')
   │
   ▼
apiClient
   │
   ├─ Adds auth header
   ├─ Adds timeout
   │
   ▼
Fetch API
   │
   │  HTTP GET /api/products
   │
   ▼
Backend Server
   │
   │  Queries database
   │
   ▼
Database
   │
   │  Returns products
   │
   ▼
Response
   │
   │  JSON { data: [...] }
   │
   ▼
apiClient
   │
   ├─ Checks response status
   ├─ Parses JSON
   │
   ▼
productService
   │
   │  Returns data
   │
   ▼
Component
   │
   │  setState(data)
   │
   ▼
Render
   │
   └─ User sees products
```

---

## 📦 State Management Architecture

```
┌─────────────────────────────────────────────────┐
│         GLOBAL STATE (Root Level)               │
├─────────────────────────────────────────────────┤
│                                                 │
│  AuthContext                CartContext         │
│  ┌──────────────────┐  ┌──────────────────┐   │
│  │ user: User       │  │ items: CartItem[]│   │
│  │ isLoading: bool  │  │ totalItems: num  │   │
│  │ login()          │  │ totalPrice: num  │   │
│  │ logout()         │  │ addItem()        │   │
│  │ signup()         │  │ removeItem()     │   │
│  └──────────────────┘  └──────────────────┘   │
│  ▲                     ▲                        │
│  │                     │                        │
│  └─ useAuth()          └─ useCart()             │
│     (from any component)  (from any component)  │
│                                                 │
└─────────────────────────────────────────────────┘
          ▲                           ▲
          │                           │
    ┌─────┴───────┬───────┬───────────┴────────┐
    │             │       │                    │
    ▼             ▼       ▼                    ▼
 Navbar      ProductCard CartPage         UserMenu

┌──────────────────────────────────────────────────┐
│      LOCAL STATE (Component Level)               │
├──────────────────────────────────────────────────┤
│                                                  │
│ ProductFilter              Modal                │
│ ┌──────────────────┐  ┌──────────────────┐    │
│ │selectedCategory  │  │isOpen: bool      │    │
│ │setSelectedCat()  │  │setIsOpen()       │    │
│ └──────────────────┘  └──────────────────┘    │
│  (only used here)      (only used here)        │
│                                                  │
│ Use useState()         Use useState()          │
│ NOT context            NOT context             │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## 🎯 Feature Module Structure

```
features/product-catalog/
│
├── 📁 components/
│   ├── ProductGrid.jsx
│   ├── ProductCard.jsx
│   └── ProductFilter.jsx
│
├── 📁 hooks/
│   ├── useProducts.js       ← Handles data fetching
│   ├── useProductFilter.js  ← Handles filtering logic
│   └── useProductSearch.js  ← Handles search logic
│
├── 📁 services/
│   ├── productService.js    ← API calls
│   └── filterService.js     ← Business logic
│
├── 📁 context/
│   └── ProductCatalogContext.jsx ← Feature-specific state
│
├── types.ts                 ← Feature types
│
├── constants.ts             ← Feature constants
│
└── index.js                 ← ⭐ Barrel export
    ├─ ProductGrid
    ├─ ProductCard
    ├─ useProducts
    ├─ useProductFilter
    └─ productService
```

---

## 📤 Barrel Export Chain

```
Component needs Button
│
│ import { Button } from '@/components'
│
▼
src/components/index.js
│ export { Button, Card, Input, Modal } from './ui'
│ export { Navbar } from './shared'
│
▼
src/components/ui/index.js
│ export { Button } from './button'
│ export { Card } from './card'
│ export { Input } from './input'
│ export { Modal } from './modal'
│
▼
src/components/ui/button/index.js
│ export { default as Button } from './Button'
│
▼
src/components/ui/button/Button.jsx
│ The actual component code
```

---

## 🎨 Responsive Design Architecture

```
Desktop (1024px+)          Tablet (768px-1023px)   Mobile (<768px)
┌──────────────────┐      ┌──────────────────┐     ┌─────────┐
│     Navbar       │      │     Navbar       │     │ Navbar  │
│ ┌──────────────┐ │      │ ┌──────────────┐ │     │ ┌─────┐ │
│ │ Logo Search  │ │      │ │ Logo Search  │ │     │ │Logo │ │
│ │ Cart Wishlist│ │      │ │ Cart Search▼ │ │     │ │Menu □ │
│ │ Account Menu │ │      │ │ Wishlist     │ │     │ │  □    │
│ └──────────────┘ │      │ └──────────────┘ │     │ └─────┘ │
├──────────────────┤      ├──────────────────┤     ├─────────┤
│   Nav Links      │      │   Nav Links      │     │ Search  │
│ Home Products    │      │ Home Products    │     │ [toggle]│
│ Gaming Ultrabook │      │ Gaming Ultrabook │     ├─────────┤
└──────────────────┘      └──────────────────┘     │NavLinks │
│                         │                        │[dropdown]
Main Content             Main Content              └─────────┘
```

---

**These visualizations help understand the architecture at a glance.**

For detailed explanations, see [ARCHITECTURE.md](./ARCHITECTURE.md)

Last Updated: June 5, 2024
