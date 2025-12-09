# GAS Vue TypeScript Project

A Google Apps Script (GAS) project with a Vue.js frontend, built with TypeScript and modern tooling.

## How to Start Development

### Prerequisites

- Node.js (v20 or higher recommended)
- pnpm (package manager)
- A Google Apps Script project (create one at [script.google.com](https://script.google.com))

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gas-vue-ts
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure clasp**
   - Copy `.clasp.example.json` to `.clasp.json`
   - Replace `YOUR_SCRIPT_ID_HERE` with your actual Google Apps Script project ID
   ```bash
   cp .clasp.example.json .clasp.json
   # Edit .clasp.json with your script ID
   ```

4. **Login to clasp** (if not already logged in)
   ```bash
   clasp login
   ```

### Development Workflow

#### Option 1: Full Watch Mode (Recommended)
This will watch for changes, rebuild both client and server, and automatically push to GAS:
```bash
pnpm run dev:watch
```

#### Option 2: Separate Builds
Build client and server separately:
```bash
# Build client (Vue app)
pnpm run build:client

# Build server (GAS functions)
pnpm run build:server

# Build both
pnpm run build
```

#### Option 3: Watch Individual Components
```bash
# Watch client only
pnpm run build:client:watch

# Watch server only
pnpm run build:server:watch

# Watch both (without auto-push)
pnpm run build:watch
```

#### Manual Deployment
After building, manually push to GAS:
```bash
pnpm run push
```

### Development Server (Local Preview)
For local development of the Vue frontend (without GAS):
```bash
pnpm run dev
```

This starts a Vite dev server at `http://localhost:5173` for local testing.

## Libraries

### Core Dependencies
- **Vue 2.7.16** - Progressive JavaScript framework for building user interfaces
- **Vuetify 2.7.2** - Material Design component framework for Vue.js

### Build Tools
- **TypeScript ~5.9.3** - Typed superset of JavaScript
- **Vite ^7.2.4** - Next-generation frontend build tool
  - `@vitejs/plugin-vue2` - Vue 2 support for Vite
  - `vite-plugin-singlefile` - Bundles the entire app into a single HTML file (required for GAS)
- **Rolldown 1.0.0-beta.52** - Fast Rust-based bundler for server-side code
  - `rolldown-plugin-remove-export` - Removes export statements from server code
- **esbuild ^0.27.0** - Fast JavaScript bundler (used in backup build script)

### Development Tools
- **@biomejs/biome 2.3.8** - Fast formatter and linter
- **concurrently ^9.2.1** - Run multiple commands concurrently
- **chokidar-cli ^3.0.0** - File watcher for auto-push functionality
- **tsx ^4.21.0** - TypeScript execution engine
- **@google/clasp** - Command-line tool for Google Apps Script development

### Type Definitions
- `@types/google-apps-script ^2.0.8` - TypeScript definitions for Google Apps Script APIs
- `@types/node ^24.10.1` - TypeScript definitions for Node.js

## Architecture Decisions

### Client-Server Separation

The project follows a clear separation between client and server code:

- **Client (`src/`)**: Vue.js application that runs in the browser
  - Built with Vite and bundled into a single HTML file
  - Uses Vuetify for UI components
  - Communicates with GAS server functions via `google.script.run`

- **Server (`server/`)**: Google Apps Script functions
  - Built with Rolldown, bundling TypeScript into `main.js`
  - Exported functions from `server/main.ts` are automatically exposed to GAS
  - Functions can be called from the client using `google.script.run`

### Build Architecture

1. **Client Build Process**:
   - Vite bundles Vue components and assets
   - `vite-plugin-singlefile` creates a single HTML file containing all JavaScript and CSS
   - Output: `dist/src/index.html` (single file that GAS can serve)

2. **Server Build Process**:
   - Rolldown bundles TypeScript server code starting from `server/main.ts`
   - `rolldown-plugin-remove-export` removes export statements (GAS doesn't need them)
   - Output: `dist/main.js` (contains all server functions)

3. **Deployment**:
   - `clasp push` uploads files from `dist/` to Google Apps Script
   - `appsscript.json` is included for GAS project configuration

### Why Single File for Client?

Google Apps Script's `HtmlService` has limitations with multiple JavaScript files. The `vite-plugin-singlefile` plugin bundles everything into a single HTML file, ensuring all assets are available when GAS serves the page.

### Why Rolldown for Server?

Rolldown provides fast bundling with ESM support, which is ideal for the server-side TypeScript code. The build process:
- Bundles all server modules into a single file
- Removes export statements (not needed in GAS runtime)
- Maintains proper module resolution with alias support (`~` for root)

### Project Structure

```
gas-test/
├── src/                    # Client-side Vue application
│   ├── components/         # Vue components
│   ├── pages/             # Page components
│   ├── plugins/           # Vue plugins (Vuetify)
│   ├── services/          # Client-side services
│   ├── utils/             # Utility functions
│   └── main.ts            # Vue app entry point
├── server/                # Server-side GAS functions
│   ├── main.ts            # Server entry point (exports GAS functions)
│   ├── modules/           # Server modules
│   └── serverFunction.ts  # Example server function
├── dist/                  # Build output (deployed to GAS)
├── scripts/               # Build scripts
└── rolldown.config.ts     # Rolldown configuration
```

### Type Safety

- TypeScript is used throughout for type safety
- `@types/google-apps-script` provides type definitions for GAS APIs
- Client and server share the same TypeScript configuration

## TODOs

### In Progress / Planned
- [x] Investigate feasibility of fetching data in client-side using GAS
  - It's impossible because of CORS.
- [ ] Setup Husky, Lint-staged
- [ ] Set running script when cloning repo
  - [ ] copy appscript.json once
  - [ ] init husky
- [ ] Setup vitest
- [ ] Setup Validation library such as VeeValidate
- [ ] Investigate [openapi code generator](https://github.com/mahaker/openapi-generator-gas)
- [ ] Setup [gasnuki](https://github.com/luthpg/gasnuki) for type safe interface
- [ ] Prod build error handling using [vite-plugin](https://github.com/luthpg/vite-plugin-google-apps-script) if needed

## Additional Notes

- The project uses `pnpm` as the package manager
- Biome is configured for code formatting and linting
- The build process outputs to `dist/` directory, which is the root for `clasp push`
- Server functions must be exported from `server/main.ts` to be accessible in GAS
