import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";
import router from "./routes";
import { config } from "./config/env";

const app = express();
const port = config.PORT;

// CORS middleware - allow all origins
app.use(cors({
  origin: config.CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Mount all routes under /api/v1
// Example: /api/v1/users, /api/v1/events, /api/v1/venues
app.use("/api/v1", router);

// Error handling middleware should be last
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`API endpoints available at: http://localhost:${port}/api/v1/`);
});
