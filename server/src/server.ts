import express from 'express';
import { errorHandler } from './middleware/errorHandler';
import router from './routes';

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Mount all routes under /api
app.use('/api', router);

// Error handling middleware should be last
app.use(errorHandler);

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
