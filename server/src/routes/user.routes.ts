import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { validateRequest } from "../middleware/validateRequest";
import { UserParamsSchema, UserQuerySchema, GoogleUserSchema } from "../types/user.types";

const router = Router();

// Create user
router.post("/", validateRequest.body(GoogleUserSchema), UserController.create);

// List users (with query validation)
router.get("/", validateRequest.query(UserQuerySchema), UserController.list);

// Get user by ID (existing route)
router.get("/:id", validateRequest.params(UserParamsSchema), UserController.getById);

export default router;
