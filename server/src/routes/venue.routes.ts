import { Router } from "express";
import { VenueController } from "../controllers/venue.controller";
import { validateRequest } from "../middleware/validateRequest";
import { 
  VenueParamsSchema, 
  VenueQuerySchema, 
  VenueSchema,
  VenueUpdateSchema 
} from "../types/venue.types";

const router = Router();

// List venues (with query validation)
router.get("/", validateRequest.query(VenueQuerySchema), VenueController.list);

// Get venue by ID
router.get("/:id", validateRequest.params(VenueParamsSchema), VenueController.getById);

// Create venue
router.post("/", validateRequest.body(VenueSchema), VenueController.create);

// Update venue (PATCH)
router.patch("/:id", 
  validateRequest.params(VenueParamsSchema),
  validateRequest.body(VenueUpdateSchema),
  VenueController.update
);

// Replace venue (PUT)
router.put("/:id", 
  validateRequest.params(VenueParamsSchema),
  validateRequest.body(VenueSchema),
  VenueController.replace
);

// Delete venue
router.delete("/:id",
  validateRequest.params(VenueParamsSchema),
  VenueController.delete
);

export default router; 