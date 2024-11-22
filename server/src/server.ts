import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";
import router from "./routes";

const app = express();
const port = process.env.PORT || 3000;

// CORS middleware - allow all origins
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Mount all routes under /api
// Example: /api/users, /api/events, /api/venues
app.use("/api", router);

// Error handling middleware should be last
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`API endpoints available at: http://localhost:${port}/api/`);
});
