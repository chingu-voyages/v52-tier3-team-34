import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { validateRequest } from "../middleware/validateRequest";
import { UserParamsSchema, UserQuerySchema } from "../types/user.types";

const router = Router();

// List users (with query validation)
router.get("/", validateRequest.query(UserQuerySchema), UserController.list);

// Get user by ID (existing route)
router.get("/:id", validateRequest.params(UserParamsSchema), UserController.getById);

export default router;
