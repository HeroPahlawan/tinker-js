# Tinker-JS

A Node.js CLI-based No-Code / Low-Code solution for rapid application development.

## Overview

Tinker-JS is a command-line tool that enables developers and non-developers alike to build applications without writing extensive code. It provides an intuitive CLI interface for scaffolding, configuring, and deploying full-stack applications.

## Vision

Tinker-JS aims to democratize application development by providing:

- **Zero-to-Production Pipeline** - Go from idea to deployed application with minimal manual coding
- **Template-Based Scaffolding** - Pre-built templates for common application patterns
- **Interactive CLI Wizards** - Step-by-step guided setup for complex configurations
- **Plugin Architecture** - Extensible system for adding custom functionality

## Planned Features

### Core CLI Commands

| Command | Description |
|---------|-------------|
| `tinker init` | Initialize a new project with interactive setup |
| `tinker generate` | Generate components, models, APIs from templates |
| `tinker serve` | Start development server with hot-reload |
| `tinker build` | Build production-ready application |
| `tinker deploy` | Deploy to supported platforms |

### Application Types

- **Web Applications** - Full-stack web apps with frontend and backend
- **REST APIs** - Backend API services with auto-generated documentation
- **CRUD Applications** - Data-driven apps with automatic CRUD operations
- **E-commerce** - Online store templates with inventory and checkout

### No-Code Capabilities

- Visual schema builder for database models
- Drag-and-drop UI component configuration
- Auto-generated API endpoints from data models
- Built-in authentication and authorization
- Role-based access control configuration

### Low-Code Extensions

- Custom logic through simple configuration files
- Plugin hooks for advanced customization
- Template overrides for fine-tuned control

## Tech Stack

- **Runtime**: Node.js
- **CLI Framework**: Commander.js / Inquirer.js
- **Frontend**: Nuxt 3 / Vue 3
- **Backend**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Styling**: TailwindCSS

## Features In Development

### Dynamic Database Auto-Generation

A core low-code feature in development at `tinker_api/model/crud.mjs`. This module provides schema-less, dynamic MongoDB model generation.

**How it works:**

```javascript
model: (table) => {
  const dataSchema = new mongoose.Schema({}, {strict:false});
  dataSchema.plugin(paginate);
  let model = mongoose.models[`${table}-model`] || mongoose.model(`${table}-model`, dataSchema, table);
  return model
}
```

**Key characteristics:**
- **Schema-less Design** - Uses `{strict: false}` to accept any fields without predefinition
- **On-the-fly Generation** - Models created dynamically when first accessed
- **Built-in Pagination** - Automatic pagination support via mongoose-paginate-v2
- **Model Caching** - Prevents duplicate model registration

**Available CRUD Methods:**

| Method | Description |
|--------|-------------|
| `crud.model(table)` | Get/create dynamic model for any collection |
| `crud.getOne(table, id)` | Fetch single record by ID |
| `crud.getAll(table, params)` | Fetch with pagination, sorting, filtering |
| `crud.insert(table, data)` | Insert new record |
| `crud.update(table, data, params)` | Update record by ID |
| `crud.put(table, data, params)` | Push data to array fields |
| `crud.delete(table, params)` | Delete record by ID |

**Query Features:**
- Wildcard filtering: `*text` (ends with), `text*` (starts with), `*text*` (contains)
- Configurable sorting (default: `createDate` descending)
- Pagination with customizable page size

**Usage Example:**

```javascript
import crud from "./model/crud.mjs";

// No schema definition needed - just use any collection name
const users = await crud.getAll('users', { page: 1, limit: 10 });
const product = await crud.getOne('products', '507f1f77bcf86cd799439011');
await crud.insert('orders', { item: 'Widget', qty: 5, price: 99.99 });
```

**Collections Currently Using Auto-Generation:**

| Type | Collections |
|------|-------------|
| Config | `c_user`, `c_role` |
| Master | `m_company`, `m_branches`, `m_employee`, `m_promotions`, `m_categories` |
| Transaction | `t_inventory`, `t_cart`, `t_purchases` |

---

### ERD-Based Schema Generation

A complementary feature in development for typed database initialization using JSON schema definitions.

**Schema Definition File:** `tinker/erd.json`

```json
{
  "c_user": {
    "structure": {
      "username": "String",
      "password": "String",
      "name": "String",
      "email": "String"
    },
    "data": [
      { "username": "root", "password": "...", "name": "SuperUser", "email": "it@ias.id" }
    ]
  },
  "m_branch": {
    "structure": {
      "branch_code": "String",
      "region": "String",
      "lob": "String",
      "name": "String",
      "email": "String",
      "phone": "Number"
    },
    "data": [...]
  }
}
```

**Generator Endpoint:** `tinker/server/api/createdb.post.js`

**How it works:**

1. Reads `erd.json` schema definition file
2. Maps string types to Mongoose types (`String`, `Number`, `Boolean`, `Date`, `ObjectId`, `Mixed`)
3. Creates typed Mongoose schemas with `timestamps: true`
4. Registers models and inserts seed data

**Supported Field Types:**

| Type | Mongoose Mapping |
|------|------------------|
| `String` | `String` |
| `Number` | `Number` |
| `Boolean` | `Boolean` |
| `Date` | `Date` |
| `ObjectId` | `mongoose.Schema.Types.ObjectId` |
| `Mixed` | `mongoose.Schema.Types.Mixed` |

**Usage:**

```bash
# Initialize database with schema and seed data
curl -X POST http://localhost:3000/api/createdb
```

**Two Approaches Comparison:**

| Feature | Dynamic CRUD (`crud.mjs`) | ERD-Based (`erd.json`) |
|---------|---------------------------|------------------------|
| Schema | Schema-less (`strict: false`) | Typed schemas |
| Use Case | Runtime operations | Initial setup / seeding |
| Fields | Any fields accepted | Predefined structure |
| Location | `tinker_api/model/` | `tinker/server/api/` |

---

### CLI Commands (Commander.js) ✓

The CLI foundation is implemented in `commander/tinker.js` using Commander.js.

**Current Version:** `0.8.0`

**Implemented Commands:**

| Command | Description |
|---------|-------------|
| `tinker generate <projectName>` | Scaffold a new Nuxt+Express project |
| `tinker createdb <dbname> <values>` | Create MongoDB database via API |

**`tinker generate` - Project Scaffolding:**

```bash
# Generate a new project called "my-app"
tinker generate my-app
```

What it does:
1. Clones the Nuxt+Express template from GitHub
2. Copies project to user's Documents folder
3. Ready-to-use full-stack application

**`tinker createdb` - Database Creation:**

```bash
# Create a new database with values
tinker createdb myDatabase "values"
```

What it does:
1. Sends POST request to `/api/createdb` endpoint
2. Creates MongoDB collections based on ERD schema
3. Seeds initial data

**CLI Source:** `commander/tinker.js`

```javascript
const program = new Command();

program
  .name('tinker')
  .description('Your tinker developer at your service')
  .version('0.8.0');
```

---

## Project Status

**Current Phase**: Early Development

Core features in progress. CLI foundation established, database auto-generation and ERD schema generation are under active development.

## Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/tinker-js.git

# Navigate to project directory
cd tinker-js

# Install dependencies
npm install

# Run development mode
npm run dev
```

## Project Structure

```
tinker-js/
├── commander/              # CLI implementation
│   └── tinker.js           # Main CLI entry point (Commander.js)
│
├── tinker/                 # Frontend - Nuxt 3 application (template)
│   ├── components/         # Vue 3 reusable components
│   ├── pages/              # Application pages/routes
│   ├── server/
│   │   └── api/
│   │       └── createdb.post.js  # ERD-based DB generator endpoint
│   ├── stores/             # Pinia state management
│   ├── utils/              # Helper functions
│   ├── erd.json            # Database schema definitions
│   └── nuxt.config.ts      # Nuxt configuration
│
├── tinker_api/             # Backend - Express.js API
│   ├── controller/         # Route handlers by module
│   │   ├── config/         # User & Role management
│   │   ├── master/         # Master data endpoints
│   │   ├── transaction/    # Transaction endpoints
│   │   └── main/           # Auth & catalogue
│   ├── model/
│   │   └── crud.mjs        # Dynamic schema-less CRUD module
│   ├── helper/             # Utility helpers
│   └── index.mjs           # Express server entry point
│
├── package.json
└── README.md
```

## Roadmap

- [x] **CLI foundation** - Commander.js setup with `generate` and `createdb` commands
- [x] **Template system** - Project scaffolding from Git repository
- [ ] **Database auto-generation** - Dynamic schema-less CRUD module *(in progress)*
- [ ] **ERD schema generation** - JSON-based typed schema with seed data *(in progress)*
- [ ] **API auto-generation** - REST endpoints with dynamic models *(in progress)*
- [ ] Project initialization wizard (interactive prompts)
- [ ] Additional code generators (components, models, routes)
- [ ] Authentication module
- [ ] Deployment integrations
- [ ] Plugin architecture
- [ ] Documentation and examples

## Contributing

Contributions are welcome! Please read the contributing guidelines before submitting pull requests.

## License

MIT License - See [LICENSE](LICENSE) for details.

---

Built with passion for simplifying development workflows.
