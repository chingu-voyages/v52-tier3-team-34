import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { validateRequest } from "../middleware/validateRequest";
import { UserParamsSchema } from "../types/user.types";

const router = Router();

router.get("/:id", validateRequest.params(UserParamsSchema), UserController.getById);

export default router;
