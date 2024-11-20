# Frontend Client

This is the frontend application for our project, built with **React**, **Vite**, and **TanStack Router**. This README provides an overview of how to set up, run, and develop within this project, as well as useful links to the main packages used.

---

## Getting Started

### Prerequisites

Ensure you have the following tools installed:

- **Node.js** (version >= 14)
- **npm** or **yarn** as your package manager

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

To run the app in development mode:

```bash
npm run dev
```

This will start the app on `localhost:3001` by default.

### Additional Scripts

- **Build the App**: To create a production build of the app:
  ```bash
  npm run build
  ```
- **Preview the Build**: Serve the production build locally for testing:
  ```bash
  npm run serve
  ```
- **Run TypeScript Type Checking**:
  ```bash
  npm run typecheck
  ```
- **Format Code with Prettier**:
  ```bash
  npm run format
  ```

## Project Structure

Here is an overview of the important files and folders:

- **src/**: Contains all source code for the frontend.
- **index.css**: Main stylesheet that includes Tailwind CSS directives.
- **main.tsx**: Main entry point for the app.

## Key Dependencies

| Package                                        | Description                                   | Link                                                  |
| ---------------------------------------------- | --------------------------------------------- | ----------------------------------------------------- |
| [React](https://reactjs.org/)                  | UI library for building user interfaces       | [react](https://reactjs.org/)                         |
| [TanStack Router](https://tanstack.com/router) | Routing library for React                     | [@tanstack/react-router](https://tanstack.com/router) |
| [Tailwind CSS](https://tailwindcss.com/)       | Utility-first CSS framework                   | [tailwindcss](https://tailwindcss.com/)               |
| [Vite](https://vitejs.dev/)                    | Frontend tooling for fast builds and HMR      | [vite](https://vitejs.dev/)                           |
| [Prettier](https://prettier.io/)               | Code formatter                                | [prettier](https://prettier.io/)                      |
| [TypeScript](https://www.typescriptlang.org/)  | Superset of JavaScript providing static types | [typescript](https://www.typescriptlang.org/)         |

For a complete list of dependencies, see `package.json`.

## Configuration

### Tailwind CSS

The project uses Tailwind CSS for styling. The configuration is located in `tailwind.config.js`, and Tailwind CSS directives are included in `src/index.css`.

### Prettier

Prettier is set up to format code according to the `.prettierrc` configuration. You can run `npm run format` to format the entire codebase.

## Development Notes

- **Port Configuration**: The Vite server is set to run on port 3001 by default. This can be changed in `vite.config.js` if necessary.
- **Type Checking**: TypeScript is used for type safety, and `npm run typecheck` will run the TypeScript compiler to check types.
- **Router Devtools**: TanStack Router Devtools are included for debugging routes. They will appear at the bottom right corner of the app during development.

---

## Contributing

Please follow the conventional commit messages format for commits. This helps keep our commit history organized and clear.

Example:

```
chore: install Tailwind CSS with postcss and autoprefixer dependencies
```

Happy coding!
