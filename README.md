<<<<<<< HEAD
# RagaPro - A Modern Carnatic Raga Explorer

This project is a modern, cross-platform application for exploring Carnatic music ragas, built with a focus on a clean user interface and a robust, scalable architecture.

## 🏛️ Project Architecture

This repository is a **Turborepo monorepo** using **pnpm workspaces**. This structure allows for shared code, streamlined dependency management, and efficient build processes across multiple applications and packages.

### Core Technologies

- **UI Framework:** [React](https://reactjs.org/) & [React Native](https://reactnative.dev/)
- **Cross-Platform UI:** [Tamagui](https://tamagui.dev/) for building a shared component library that runs on both web and native platforms.
- **Web Bundler:** [Vite](https://vitejs.dev/) for a fast and modern development experience for the web application.
- **Monorepo Management:** [Turborepo](https://turbo.build/repo) for high-performance builds and task orchestration.
- **Package Manager:** [pnpm](https://pnpm.io/) for efficient dependency management within the monorepo.
- **Routing:** [React Router DOM](https://reactrouter.com/) for web navigation.

### Workspace Breakdown

The monorepo is organized into `apps` and `packages`:

#### `apps/`

This directory contains the final applications that users will interact with.

- **`apps/web`**: The main web application. It consumes the shared `ui` package and is built using Vite. This is the primary focus of the current development.
- **`apps/native`**: The React Native mobile application. It shares the same UI components from the `ui` package, allowing for a consistent experience across platforms.

#### `packages/`

This directory contains shared code and libraries that are consumed by the applications.

- **`packages/ui`**: The core of the application's frontend. This is a shared component library built with Tamagui. All reusable components, such as `Header`, `Footer`, `RagaCard`, and `AudioPlayer`, reside here.
- **`packages/api`**: A placeholder for backend logic, API routes, and server-side functions. (Future development)
- **`packages/utils`**: A shared package for utility functions, constants, or types that can be used across all applications and packages.

---

## 🚀 Getting Started

Follow these instructions to get the web application running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [pnpm](https://pnpm.io/installation) package manager

### 1. Installation

Clone the repository and install all dependencies using `pnpm`. Running this command from the root of the project will install dependencies for all workspaces (`apps` and `packages`).

```sh
pnpm install
```

For a completely fresh installation that removes all existing `node_modules` folders and the lockfile, you can use the custom `clean-install` script:

```sh
pnpm run clean-install
```

### 2. Running the Web Application

To start the web development server, run the following command from the project root:

```sh
pnpm dev
```

This command uses Turborepo to start the `dev` script within the `apps/web` package. The web application will be available at:

**https://localhost:5173/**

The server supports Hot Module Replacement (HMR), so any changes you make to the code in `apps/web` or `packages/ui` will be reflected in your browser instantly.

### 3. Building for Production

To create a production-ready build of all applications and packages, run:

```sh
pnpm build
```

This will generate optimized, static files in the `dist` directory of each application.

### 4. Code Quality

To run the linter across the entire project, use:

```sh
pnpm lint
```
=======
# RagaPro
RagaPro is the UI interface for Raga API collection
>>>>>>> d8e3b10a2210aeb3aff829cd8fa6bb379b9e5e02
