## Getting Started

### Node.js version >= v18.17.0 is required

### testing .env

NEXT_PUBLIC_API_URL=https://jsonplaceholder.typicode.com

Look at `src/constants/temporary.ts` or local storage to see the credentials

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Build and start with bun:

```bash
bun run build
bun start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Also, configure this preference in settings.json to autoformat on paste and save

```
{
    "editor.formatOnSave": true,
    "editor.formatOnPaste": true,
    "editor.codeActionsOnSave": {
        "source.fixAll": "always",
        "source.fixAll.eslint": "always"
    },
    "eslint.validate": ["javascript", "typescript"],
    "prettier.requireConfig": true
}
```

Please, comment output: 'standalone' in `next.config.mjs` when you want to build and start in local.

**IMPORTANT!!!** Minimize the use of arbitrary values in Tailwind as much as possible. When necessary, define new custom
values in `tailwind.config.ts`. Alternatively, use inline CSS if the style is intended just for a specific
element—unless the style requires breakpoints for responsive behavior.

# 📁 Directory Structure for this project

This project uses a modular, scalable directory structure in a **Next.js** environment. Each directory has a clear
purpose and supports separation of concerns across the codebase. Please add index.ts file in each components and
functions folder and import all components and functions into it to simplify the imports from parents. You can see the
example in `src/components/common/index.ts`

## 📂 Root Directories

### `app`

- Main directory for routing in Next.js App Router architecture.
- Each file or folder corresponds to a route.
- **IMPORTANT!** => Please read [the documentation](https://nextjs.org/docs/app/getting-started/project-structure) to
  learn how to organize the folder and file inside the app directory.

### `assets`

- Stores static resources like images, fonts, and icons.

### `components`

Reusable UI components used across multiple pages.

- **`common/`**: Contains global UI components such as buttons, modals, inputs, etc.
- **`layout/`**: Contains components related to the application's layout such as `Header`, `Footer`, `Sidebar`, etc.
- **`main/`**: Components specific to the `/` (home) page.
- **Other folders**: Named according to the corresponding page they belong to. For example, components for `/pricing`
  live in `components/pricing/`.

### `constants`

- Contains static data and constant values used throughout the app (e.g., enum values, default settings, text content).

### `features`

Organizes code by features or pages.

- Each folder is named after a corresponding page or feature (e.g., `home`, `pricing`, `dashboard`).
- If a feature requires data fetching:
  - `actions/`: Contains functions for fetching or mutating data via API calls.
  - `components/`: Contains JSX components specifically for that feature.
- If a feature does **not** require **actions (API interaction with methods other than "GET")**:
  - It only contains the feature-specific component file(s).

### `hooks`

- Contains custom React hooks to encapsulate reusable logic (e.g., `useDebounce`, `useAuth`).

### `services`

- Defines functions that interact with external APIs or backend services with **GET METHODS**.

### `types`

- Stores global TypeScript type definitions and interfaces.

### `utils`

- Contains utility/helper functions that can be shared across the project (e.g., formatting functions, validation,
  parsers).

---

By organizing files in this way, the project encourages modularity, maintainability, and a clear separation of concerns.
