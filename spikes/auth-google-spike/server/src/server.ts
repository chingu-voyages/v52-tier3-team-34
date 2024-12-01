import express from 'express';
import cors from 'cors';
import { config } from './config/env';
import authRoutes from './routes/auth.routes';
import healthRoutes from './routes/health.routes';

const app = express();

// CORS configuration
app.use(cors({
  origin: config.CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());

// API Routes (v1)
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/health', healthRoutes);

// Basic error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Start server
const port = config.PORT;
app.listen(port, () => {
  console.log(`
Server running on port ${port}

Available endpoints:
 Public:
   GET http://localhost:${port}/api/v1/health

 Protected:
   All /api/v1/auth/* endpoints
`);
});
