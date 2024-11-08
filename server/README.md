# Server Application

This is the backend application built with Node.js, Express, TypeScript, Prisma, SQLite/PostgreSQL, and Zod.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: SQLite/PostgreSQL
- **Validation**: Zod

## Project Initialization Steps

1. Create project directory and initialize npm:
```bash
mkdir server
cd server
npm init -y
```

2. Install TypeScript and required dependencies:
```bash
npm install -D typescript @types/node @types/express ts-node-dev
npm install express
```

3. Initialize TypeScript configuration:
```bash
npx tsc --init
```

4. Install Prisma:
```bash
npm install prisma --save-dev
npm install @prisma/client
npx prisma init --datasource-provider sqlite
```

5. Install Zod for validation:
```bash
npm install zod
```

6. Update package.json scripts:
```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}
```

7. Configure tsconfig.json:
```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

8. Create initial project structure:
```bash
mkdir -p src/{config,controllers,middleware,routes,services,utils}
```

## Project Structure
```
server/
├── src/
│   ├── config/     # Configuration files
│   ├── controllers/# Route controllers
│   ├── middleware/ # Custom middleware
│   ├── routes/     # API routes
│   ├── services/   # Business logic
│   ├── utils/      # Utility functions
│   └── server.ts   # Entry point
├── prisma/
│   └── schema.prisma  # Database schema
├── .env            # Environment variables
├── package.json    # Project dependencies
└── tsconfig.json   # TypeScript configuration
```

## Development
1. Start the development server:
```bash
npm run dev
```

2. Access the API at `http://localhost:3000`

## Database Management
- Generate Prisma Client:
```bash
npx prisma generate
```

- Create and apply migrations:
```bash
npx prisma migrate dev --name init
```

- View database with Prisma Studio:
```bash
npx prisma studio
```

## Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL="file:./dev.db"
PORT=3000
```

## Next Steps
1. Set up Express application
2. Configure Prisma schema
3. Create initial routes
4. Add middleware
5. Implement controllers
6. Add validation with Zod