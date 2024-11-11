# Server Application

This is the backend REST API built with Node.js, Express, TypeScript, Prisma, SQLite/PostgreSQL, and Zod.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: SQLite/PostgreSQL
- **Validation**: Zod

## Quick Start (SQLite)

💡 **Recommended Way to Start Development**

📝 **Note about commands**:
Commands shown use Unix-style syntax (Linux/macOS).
For Windows users:

- Use `\` instead of `/` for paths
- Use `copy` instead of `cp`
- Use `mkdir folder\subfolder` instead of `mkdir -p folder/subfolder`
- Or use Git Bash/WSL on Windows for Unix-style commands

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Initial Setup

1. Clone and install:

```bash
git clone https://github.com/chingu-voyages/v52-tier3-team-34.git
cd v52-tier3-team-34/server
npm install
```

2. Set up environment:

```bash
cp .env.example .env
# Default SQLite configuration is ready to use
```

3. Initialize database:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. Start development server:

```bash
npm run dev
# API running at http://localhost:3000
```

5. Test the API:

```bash
curl http://localhost:3000/api/health
# or visit in your browser: http://localhost:3000/api/health
```

You should see a response like this:

```json
{
  "status": "success",
  "message": "Server is running",
  "timestamp": "2024-03-11T10:30:00.000Z"
}
```

This confirms that:

- Server is running correctly
- Express is handling requests
- JSON responses are working
- Timestamps are being generated

## Database Configuration

### 🟢 SQLite (Local Development)

Recommended for:

- Individual development
- Testing schema changes
- Quick setup and experiments

Setup and usage covered in Quick Start above.

### 🟡 PostgreSQL (Personal Instance)

Use when you need:

- Production-like environment
- Testing with real PostgreSQL features

Setup:

```bash
# 1. Update .env with your PostgreSQL URL
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# 2. Initialize database
npx prisma generate
npx prisma migrate dev
```

### 🔴 PostgreSQL (Team Shared)

⚠️ **SPECIAL SAFETY RULES APPLY**

This is our shared development database. Be extremely careful!

Setup:

```bash
# 1. Get shared database URL from team DB Admin
# 2. Update your .env
# 3. ONLY generate client
npx prisma generate
```

## Team Workflows

### When Pulling Changes

1. Always pull latest code:

```bash
git pull origin development
```

2. If using SQLite:

```bash
npx prisma migrate dev  # Safe for local database
```

3. If using shared PostgreSQL:

```bash
npx prisma generate    # ONLY generate client
```

### When Making Schema Changes

1. Test locally with SQLite first
2. Create PR with:
   - Schema changes
   - Migration files
   - Code updates

### Important: Shared Database Safety

⚠️ When using a shared database, follow these rules:

1. NEVER RUN these dangerous commands:

   ```bash
   npx prisma migrate dev
   npx prisma migrate reset
   ```

   These commands can modify or destroy the shared database!

2. ONLY the team member implementing schema changes should:

   ```bash
   npx prisma migrate deploy
   ```

3. ALL team members should run this after pulling changes:
   ```bash
   npx prisma generate
   ```

Remember: Schema changes should be tested locally with SQLite before applying to shared database.

### What's in Source Control

✅ MUST be committed:

- `prisma/schema.prisma` - Database schema
- `prisma/migrations/*` - All migration files
- `.env.example` - Template with both DB options

❌ MUST NOT be committed:

- `.env` - Contains actual database credentials
- `*.db` - SQLite database files
- `node_modules/@prisma` - Generated Prisma client

### Best Practices

1. **Local Development**:

   - Start with SQLite for quick setup
   - Use personal PostgreSQL when needed
   - Always run `migrate dev` for schema changes

2. **Team Development**:

   - Use `migrate deploy` on shared databases
   - Never modify applied migrations
   - Create new migrations for changes

3. **Migration Safety**:

   - Always backup before migrations
   - Test migrations locally first
   - Review migration files before commit

4. **Environment Management**:
   - Keep different .env files:
     - `.env.development` - SQLite/local PostgreSQL
     - `.env.team` - Shared PostgreSQL
     - `.env.production` - Production database

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

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server

## Appendix: Project Initialization Steps

For reference, these were the steps used to create this project:

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

## API Testing with Postman

The `postman/` directory contains everything needed to test the API endpoints:

1. Collection file with all endpoints and examples
2. Environment configuration for local development
3. Detailed documentation on how to use the collection

See `postman/README.md` for detailed instructions on:

- How to import the collection
- How to set up environments
- How to run tests
- Available endpoints and examples
