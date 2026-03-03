# Tinker-JS

<img width="1860" height="582" alt="Tinker" src="https://github.com/user-attachments/assets/aba1c992-13ca-4a15-9c98-052900b6bcf6" />

A Node.js CLI-based No-Code / Low-Code platform for rapid full-stack application development.

---

## Overview

Tinker-JS accelerates application development by generating full CRUD pages, API routes, and navigation entries from a single schema definition file (`erd.json`). It produces a working Nuxt 3 frontend and an Express.js backend wired to MongoDB — with authentication, role-based menus, and a polished UI component library — all without writing repetitive boilerplate.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| CLI | Commander.js (Node.js) |
| Frontend | Nuxt 3 / Vue 3 (SPA mode, `ssr: false`) |
| Backend | Express.js (ESM) |
| Database | MongoDB with Mongoose ODM (schema-less CRUD) |
| Styling | TailwindCSS |
| State | Pinia |
| HTTP | Axios |

---

## Project Structure

```
tinker-js/
├── commander/                  # CLI — run commands from here
│   ├── tinker.js               # Main CLI entry point (Commander.js)
│   └── scaffold.js             # Scaffold generator logic
│
└── tinker/                     # Application root
    ├── nuxt.config.ts          # Nuxt configuration (ssr:false, port 3000)
    ├── erd.json                # Schema + seed data definitions
    │
    ├── assets/css/             # Global TailwindCSS styles
    ├── components/             # Reusable Vue components
    │   ├── DataTable.vue       # Full CRUD table with modal, search, pagination
    │   ├── Modal.vue           # Pure-Vue animated modal (no tw-elements)
    │   ├── Input.vue           # Styled text input
    │   ├── Select.vue          # Styled select / dropdown
    │   ├── Textarea.vue        # Styled textarea
    │   ├── TagInput.vue        # Multi-value tag input
    │   ├── InputAutocomplete.vue
    │   ├── Card.vue / CardSmall.vue / CardImage.vue
    │   ├── LayoutNavbar.vue    # Top navigation, user menu, change password
    │   └── LayoutSidebar.vue   # Side navigation (driven by appcfg.menu)
    │
    ├── middleware/
    │   └── auth.global.js      # Route guard — redirect unauthenticated users
    │
    ├── pages/
    │   ├── index.vue           # Dashboard / home
    │   ├── main/login.vue      # Login page
    │   ├── config/
    │   │   ├── user.vue        # User management (CRUD)
    │   │   └── role.vue        # Role management (CRUD)
    │   └── master/
    │       └── branch.vue      # Branch management (CRUD)
    │
    ├── server/
    │   ├── middleware/auth.js  # Server-side auth header check
    │   └── api/
    │       ├── main/login.post.js
    │       ├── createdb.post.js        # ERD-based DB seeder
    │       ├── setting/chgpass/        # Change password routes
    │       ├── config/user/            # REST: GET, POST, PATCH, DELETE
    │       ├── config/role/
    │       └── master/branch/
    │
    ├── stores/mystore.js       # Pinia store (nav title, etc.)
    │
    ├── utils/                  # Auto-imported globally by Nuxt
    │   ├── appcfg.js           # App config: name, API URL, menus, constants
    │   ├── app_helper.js       # getSess, setSess, delSess, loading, dataForm, …
    │   ├── call.js             # Axios HTTP client with role-based auth guard
    │   ├── alert.js            # Self-contained toast notification system
    │   └── datatable.js        # DataTable helper utilities
    │
    └── tinker_api/             # Express.js backend (runs on port 3001)
        ├── index.mjs           # Server entry point
        ├── model/crud.mjs      # Schema-less dynamic MongoDB CRUD module
        └── controller/
            ├── main/login.mjs
            ├── config/user.mjs
            ├── config/role.mjs
            └── master/branch.mjs
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### 1 — Install dependencies

```bash
# CLI dependencies
cd tinker-js/commander
npm install

# Frontend (Nuxt)
cd ../tinker
npm install

# Backend (Express API)
cd tinker_api
npm install
```

### 2 — Configure environment

**`tinker/.env`**
```env
APP_NAME=Tinker
MONGODB_URI=mongodb://localhost:27017/tinker
```

**`tinker/tinker_api/.env`**
```env
APP_NAME=Tinker API
APP_PORT=3001
DB_URI=mongodb://localhost:27017/tinker
```

### 3 — Seed the database

```bash
# With the Nuxt dev server running (step 4 below), seed from erd.json:
cd tinker-js/commander
node tinker.js seeddb
```

### 4 — Start the application

The frontend and backend are **two separate processes**:

```bash
# Terminal 1 — Nuxt frontend (port 3000)
cd tinker-js/tinker
npm run dev

# Terminal 2 — Express API (port 3001)
cd tinker-js/tinker/tinker_api
npm run dev
```

Then open **http://localhost:3000**

Default login: `root` / (set in your `erd.json` seed data)

---

## CLI Commands

All commands are run from the `commander/` directory:

```bash
cd tinker-js/commander
node tinker.js <command>
```

| Command | Description |
|---------|-------------|
| `node tinker.js generate <projectName>` | Clone the Tinker template into `~/Documents/<projectName>` |
| `node tinker.js scaffold <table>` | Generate CRUD page + API routes + menu entry for one table |
| `node tinker.js scaffold --all` | Scaffold every non-system table defined in `erd.json` |
| `node tinker.js scaffold <table> --project <path>` | Scaffold against a non-default project path |
| `node tinker.js seeddb` | POST to `/api/createdb` to seed MongoDB from `erd.json` |
| `node tinker.js seeddb --host <url>` | Seed against a custom host |
| `node tinker.js createdb <name> <values>` | *(legacy)* — prefer `seeddb` |

### `scaffold` — What It Generates

Running `node tinker.js scaffold m_branch` for example creates:

| Artifact | Path |
|----------|------|
| Vue CRUD page | `tinker/pages/master/branch.vue` |
| Nuxt server routes | `tinker/server/api/master/branch/index.get.js` `.post.js` `[id].get.js` `.patch.js` `.delete.js` |
| Express controller | `tinker/tinker_api/controller/master/branch.mjs` |
| Menu entries | Injected into `appcfg.js` (sidebar) and `index.mjs` (Express router) |

The generated page uses the `DataTable` component for instant, working CRUD with no additional code.

---

## Architecture

### Dual-Server Design

```
Browser (port 3000)
    │
    ├─► Nuxt SPA  (port 3000, ssr:false)
    │       └─► server/api/**  (Nuxt server routes — auth proxy)
    │                 │
    │                 └─► tinker_api  (Express, port 3001)
    │                           └─► MongoDB
    │
    └─► All localStorage / session operations — client-side only
```

Nuxt server routes act as a **thin authenticated proxy** — they validate the realm header and forward requests to the Express API. The browser never calls the Express API directly.

### Authentication Flow

1. User submits credentials on `/main/login`
2. `server/api/main/login.post.js` forwards to tinker_api `/main/login`
3. tinker_api validates against MongoDB `c_user` collection
4. On success, session object is XOR-encrypted and stored in `localStorage` (`xsss` key)
5. `middleware/auth.global.js` redirects unauthenticated navigation to `/main/login`
6. Every API call in `call.js` reads the session, base64-encodes it, and sends it as the `350pr3a1m` realm header

### Schema-Less CRUD (`crud.mjs`)

```javascript
// No schema definition needed — just use any collection name
const users  = await crud.getAll('c_user', { page: 1, limit: 20, sort: 'createDate' });
const record = await crud.getOne('m_branch', id);
await crud.insert('m_branch', { code: 'JKT', name: 'Jakarta' });
await crud.update('m_branch', data, { _id: id });
await crud.delete('m_branch', { _id: id });
```

**Query features:**
- Wildcard text search: `*text` (ends with), `text*` (starts with), `*text*` (contains)
- Pagination via `mongoose-paginate-v2`
- Configurable sort (default: `createDate` descending)

---

## Component Library

### `DataTable`

Full-featured CRUD table. Handles data fetching, search, pagination, add/edit modal, and delete — all driven by props.

```vue
<DataTable
  ref="xdt"
  title="Manage Branch"
  url="/api/master/branch/"
  :columns="columns"
  modal-title="Branch"
  modal-icon="fa-solid fa-code-branch"
  @save="onSave"
  @delete="onDelete"
>
  <template #form>
    <!-- form fields -->
  </template>
</DataTable>
```

### `Modal`

Pure-Vue animated modal. Controlled via Vue `ref` — no tw-elements dependency.

```vue
<Modal ref="myModal" title="Edit Item" icon="fa-solid fa-pen" size="lg">
  <!-- slot content -->
</Modal>

<!-- Trigger from script: -->
this.$refs.myModal.toggle()
this.$refs.myModal.open()
this.$refs.myModal.close()
```

Sizes: `sm` (400px) | `md` (580px, default) | `lg` (760px) | `xl` (980px)

### `alert()` — Toast Notifications

Auto-imported. Synchronous — no `await` needed.

```javascript
const myAlert = alert();

myAlert.success('Record saved');     // auto-dismisses in 4 s
myAlert.info('Informational note');  // auto-dismisses in 5 s
myAlert.error('Something failed');   // persists until closed
myAlert.warning('Be careful');       // persists until closed
```

Toasts appear top-right, above all other UI (z-index 9999), with slide-in animation, coloured left accent, icon badge, progress bar, and a close button. No external CSS dependency — styles are injected once on first call.

### `call` — HTTP Client

Auto-imported. Role-based authorization is checked before every request.

```javascript
await call.get('/api/master/branch')
await call.getbyparams('/api/master/branch', { code: 'JKT' })
await call.post('/api/master/branch', data)
await call.patch('/api/master/branch/' + id, data)
await call.put('/api/master/branch/' + id, data)        // multipart/form-data
await call.delete('/api/master/branch/' + id)
await call.getwoauth('/api/public/endpoint')            // no auth check
await call.postwoauth('/api/public/endpoint', data)
```

---

## Implemented Modules

| Group | Module | Page | API Routes |
|-------|--------|------|------------|
| Config | User | `/config/user` | `server/api/config/user/` |
| Config | Role | `/config/role` | `server/api/config/role/` |
| Master | Branch | `/master/branch` | `server/api/master/branch/` |
| Setting | Change Password | *(navbar modal)* | `server/api/setting/chgpass/` |

---

## Database Schema (`erd.json`)

Defines collections, field types, and seed data for `tinker createdb` / `tinker seeddb`:

```json
{
  "c_user": {
    "structure": {
      "username": "String",
      "password": "String",
      "name":     "String",
      "email":    "String",
      "role":     "String"
    },
    "data": [
      { "username": "root", "password": "...", "name": "SuperUser", "role": "super" }
    ]
  }
}
```

**Supported field types:** `String`, `Number`, `Boolean`, `Date`, `ObjectId`, `Mixed`

Tables prefixed `c_` (config) and `c_user` / `c_role` are treated as system tables and skipped by `scaffold --all`.

---

## Configuration (`utils/appcfg.js`)

Central config for the frontend — menus, API URL, constants, and local data sources:

```javascript
const config = {
  appName:  'Tinker',
  apiUrl:   'http://localhost:3001',
  realm:    '350pr3a1m',        // auth header name
  menu:     [...],              // sidebar navigation
  roleMenu: [...],              // role-management permission tree
  freeMenu: ['chgpass'],        // routes exempt from auth check
  freeLink: ['main/login'],     // pages accessible without login
  localData: {                  // cached reference data (pre-loaded on login)
    role:   { url: '/api/config/role',    key: 'code', value: 'name' },
    branch: { url: '/api/master/branch/', key: 'code', value: 'name' },
  },
};
```

The `[TINKER:SUBMENU:*]` and `[TINKER:MENU:END]` comment markers are used by `scaffold.js` to inject new menu entries automatically.

---

## Roadmap

- [x] CLI foundation (Commander.js) — `generate`, `scaffold`, `seeddb`
- [x] Schema-less dynamic CRUD module (`crud.mjs`)
- [x] ERD-based schema + seed data (`erd.json` → `createdb`)
- [x] Nuxt server API proxy routes (auth, CRUD)
- [x] Scaffold command — full page + API + menu + controller generation
- [x] Auth middleware (global route guard + server-side header check)
- [x] Component library — DataTable, Modal, Input, Select, Textarea, TagInput
- [x] Toast notification system (self-contained, no external CSS)
- [x] Change password flow (navbar modal)
- [x] Role-based menu access
- [ ] Interactive project initialization wizard
- [ ] `tinker generate` — update template to current Tinker structure
- [ ] Multi-tenant / business-unit support
- [ ] File upload support (S3 / local)
- [ ] Reporting module (PDF / Excel export)
- [ ] Deployment integrations (Docker, AWS EKS)
- [ ] Plugin architecture

---

## Contributing

Contributions are welcome! Please read the contributing guidelines before submitting pull requests.

## License

MIT License — See [LICENSE](LICENSE) for details.

---

Built with passion for simplifying development workflows.
