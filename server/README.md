# Server Application

This is the backend application of our project.

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn
- Database (e.g., PostgreSQL, MongoDB)

### Installation
1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Then edit `.env` with your configuration.

### Development
To start the development server:
```bash
npm run dev
# or
yarn dev
```

### Production
To start the production server:
```bash
npm start
# or
yarn start
```

### Testing
To run tests:
```bash
npm test
# or
yarn test
```

## Project Structure
```
server/
├── src/
│   ├── config/     # Configuration files
│   ├── controllers/# Route controllers
│   ├── middleware/ # Custom middleware
│   ├── models/     # Database models
│   ├── routes/     # API routes