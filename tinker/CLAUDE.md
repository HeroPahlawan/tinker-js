# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

InShopper is a Nuxt 3 e-commerce/retail management application with features for inventory management, transactions, promotions, and multi-tenant support. The application uses a custom API backend (separate repository) hosted at `https://inshopperapi.ias.id` and includes both authenticated admin views and public catalogue views.

## Development Commands

```bash
# Install dependencies
npm install

# Development server (runs on http://localhost:3000)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Deploy with PM2 (uses ecosystem.config.cjs)
pm2 start ecosystem.config.cjs
```

## Architecture

### API Communication

- **API Base URL**: Configured in `nuxt.config.ts` (`runtimeConfig.public.apiUrl`)
  - Production: `https://inshopperapi.ias.id`
  - Local dev: `http://localhost:3001/`
  - Also defined in `utils/appcfg.js` (currently set to localhost)

- **API Wrapper**: `utils/call.js` provides methods for all HTTP operations
  - All requests use custom realm header for authentication: `350pr3a1m`
  - Session token sent as base64-encoded value via realm header
  - Built-in role-based authorization checks before API calls
  - Methods: `get`, `getbyparams`, `post`, `patch`, `put`, `delete`, plus "woauth" (without auth) variants
  - Authorization levels: N (none), R (read=1), W (write=2)

### Authentication & Authorization

- **Session Management**: `utils/app_helper.js`
  - `getSess()`: Get current session (auto-decrypts from localStorage `xsss`)
  - `setSess(item)`: Save session (auto-encrypts to localStorage)
  - `delSess()`: Clear session and master data
  - Sessions encrypted with XOR cipher using key `5ysT3wS3cR3t`

- **Middleware**: `middleware/auth.global.js`
  - Redirects unauthenticated users to `/main/login`
  - Free links (no auth required) defined in `appcfg.freeLink`: `main/catalogue`, `transaction/product`
  - Role-based access control is commented out but exists in code

- **Authorization Flow**: `utils/call.js:authorize()`
  - Checks user role permissions before each API call
  - Compares URL against role options (N/R/W permissions)
  - Free menu items and local data operations bypass authorization

### State Management

- **Pinia Stores**:
  - `stores/mystore.js`: Simple nav title state
  - `stores/cart.js`: Shopping cart with localStorage persistence
    - Methods: `addToCart`, `remFromCart`, `emptyCart`

- **Local Storage**:
  - `xsss`: Encrypted session data
  - `xdump`: Master data cache (roles, employees, branches, companies, categories)
  - `cart`: Shopping cart items (managed by Pinia store)

### Application Configuration

`utils/appcfg.js` contains:
- Application name, API URLs, file storage URL
- Main navigation menu structure
- Role-based menu configuration
- Free menu/link definitions (no auth required)
- Master data endpoints mapping (role, employee, branch, company, categories)
- Dropdown options for payment types, compliance statuses, etc.

### Server API Routes

Nuxt server routes in `server/api/` proxy to backend API:
- **Structure**: `server/api/{module}/{resource}/[id].{method}.js`
- **Modules**:
  - `main`: Login, catalogue
  - `config`: User, role management
  - `master`: Branches, company, categories, promotions, employee
  - `transaction`: Product, purchases, inventory, checkout, upload
  - `report`: Earnings
  - `setting`: Change password

### Layout System

- **Conditional Layouts** (`app.vue`):
  - `LayoutSidebar` + `LayoutNavbar`: Shown when authenticated (except on login page)
  - `LayoutNavCatalogue` + `LayoutFootCatalogue`: Shown on free/public pages
  - Body padding adjusted based on layout

- **No layouts directory**: Uses custom logic in `app.vue` instead of Nuxt layouts

### Pages Structure

- `pages/main/login.vue`: Authentication
- `pages/main/catalogue.vue`: Public product catalogue
- `pages/config/`: User and role management
- `pages/master/`: Branches, company, employee, categories, promotions
- `pages/transaction/`: Product, purchases, inventory
- `pages/report/`: Earnings (commented out in menu)

### Reusable Components

Located in `components/`:
- Form inputs: `Input`, `Select`, `Textarea`, `TagInput`, `InputAutocomplete`
- UI: `Card`, `CardSmall`, `CardImage`, `Modal`
- Layout: `LayoutSidebar`, `LayoutNavbar`, `LayoutNavCatalogue`, `LayoutFootCatalogue`

### Utility Functions

- `utils/app_helper.js`: Session, data storage, currency formatting, transaction helpers
- `utils/call.js`: API wrapper with authorization
- `utils/appcfg.js`: Application configuration
- `utils/datatable.js`: Data table utilities
- `utils/alert.js`: Alert/notification helpers

### Key Helper Functions

- `dataStorage(whichData)`: Get master data from localStorage
- `localData()`: Get all cached master data
- `loading(isShow, text)`: Show/hide loading overlay
- `dataForm(el)`: Extract form data from element ID
- `curr(val)`: Format currency to IDR
- `getTrannbr(branch)`: Generate transaction number
- `getCategories()`, `getBu(id)`: Fetch master data

## Important Notes

- **Runtime Config**: API URL must match between `nuxt.config.ts` and `utils/appcfg.js`
- **Custom Elements**: `downloadexcel` registered as custom element for vue-json-excel3
- **Transpilation**: `@vuepic/vue-datepicker` is transpiled in build config
- **Modules**: Pinia for state, vue3-carousel-nuxt for carousels
- **No Composables**: Project doesn't use composables directory
- **Global Middleware**: Auth middleware runs on all routes

## External Services

- **File Storage**: AWS S3 bucket at `https://inshopper-storage.s3.ap-southeast-3.amazonaws.com/`
- **File Upload API**: `https://wheybhwfga.execute-api.ap-southeast-3.amazonaws.com/dev/inshopper-storage/`

## Styling

- TailwindCSS configured via `tailwind.config.js`
- Custom CSS in `assets/css/main.css`
- tw-elements library for UI components
- FontAwesome icons loaded via public/fontawesome
