import { Router } from "express";
import { EventController } from "../controllers/event.controller";
import { validateRequest } from "../middleware/validateRequest";
import { authMiddleware } from "../middleware/authMiddleware";
import { 
  EventParamsSchema, 
  EventQuerySchema, 
  EventSchema,
  EventUpdateSchema,
  EventZoneQuerySchema 
} from "../types/event.types";

const router = Router();

// List events (with query validation)
router.get("/", validateRequest.query(EventQuerySchema), EventController.list);

// Get events in zone (with query validation)
router.get("/zone", validateRequest.query(EventZoneQuerySchema), EventController.findInZone);

// Get event in GeoJSON format
router.get("/:id/geojson", 
  validateRequest.params(EventParamsSchema),
  EventController.getGeoJson
);

// Get event by ID
router.get("/:id", validateRequest.params(EventParamsSchema), EventController.getById);

// Create event
router.post("/", 
  // authMiddleware,
   validateRequest.body(EventSchema), EventController.create);

// Update event (PATCH)
router.patch("/:id", 
  // authMiddleware,
  validateRequest.params(EventParamsSchema),
  validateRequest.body(EventUpdateSchema),
  EventController.update
);

// Replace event (PUT)
router.put("/:id", 
  // authMiddleware,
  validateRequest.params(EventParamsSchema),
  validateRequest.body(EventSchema),
  EventController.replace
);

// Delete event
router.delete("/:id",
  // authMiddleware,
  validateRequest.params(EventParamsSchema),
  EventController.delete
);

export default router; 