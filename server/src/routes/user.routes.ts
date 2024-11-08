import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { validateRequest } from "../middleware/validateRequest";
import { 
  UserParamsSchema, 
  UserQuerySchema, 
  GoogleUserSchema,
  GoogleUserUpdateSchema 
} from "../types/user.types";

const router = Router();

// Create user
router.post("/", validateRequest.body(GoogleUserSchema), UserController.create);

// List users (with query validation)
router.get("/", validateRequest.query(UserQuerySchema), UserController.list);

// Get user by ID
router.get("/:id", validateRequest.params(UserParamsSchema), UserController.getById);

// Update user
router.patch("/:id", 
  validateRequest.params(UserParamsSchema),
  validateRequest.body(GoogleUserUpdateSchema),
  UserController.update
);

// Replace user (PUT)
router.put("/:id", 
  validateRequest.params(UserParamsSchema),
  validateRequest.body(GoogleUserSchema),
  UserController.replace
);

// Delete user
router.delete("/:id",
  validateRequest.params(UserParamsSchema),
  UserController.delete
);

export default router;
