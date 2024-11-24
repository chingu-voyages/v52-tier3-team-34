import { Request, Response } from "express";
import { EventService } from "../services/event.service";
import {
  EventQuery,
  EventInput,
  EventUpdateInput,
  EventParams,
  EventGeoJSONFeature,
  EventZoneQuery,
  EventZoneResponse,
  EventZoneQueryCoerced
} from "../types/event.types";
import { ApiResponse, ApiErrorResponse } from "../types/api.types";
import { Event, Venue } from "@prisma/client";

// Only used for endpoints that need venue data
type EventWithVenue = Event & {
  venue: (Venue & {
    coordinates: { lng: number; lat: number }
  }) | null;
};

export class EventController {
  static async getById(req: Request<EventParams>, res: Response) {
    try {
      const id = Number(req.params.id);
      const event = await EventService.findById(id);

      const response: ApiResponse<EventWithVenue> = {
        status: "success",
        data: event as EventWithVenue,
        timestamp: new Date().toISOString(),
      };

      res.json(response);
    } catch (error) {
      const response: ApiErrorResponse = {
        status: "error",
        error: {
          code: "EVENT_NOT_FOUND",
          message: error instanceof Error ? error.message : "Event not found",
          details: { id: req.params.id }
        },
        timestamp: new Date().toISOString()
      };

      res.status(404).json(response);
    }
  }

  static async list(req: Request<{}, {}, {}, EventQuery>, res: Response) {
    try {
      const result = await EventService.findAll(req.query);

      const response: ApiResponse<EventWithVenue[]> = {
        status: "success",
        data: result.events as EventWithVenue[],
        meta: {
          pagination: {
            page: result.pagination.currentPage,
            limit: result.pagination.itemsPerPage,
            total: result.pagination.totalItems,
            totalPages: result.pagination.totalPages,
            hasNext: result.pagination.hasNextPage,
            hasPrevious: result.pagination.hasPreviousPage
          },
          filters: result.meta.filters,
          sort: result.meta.sort,
          fields: result.meta.fields,
          includes: result.meta.includes || []
        },
        timestamp: new Date().toISOString(),
      };

      res.json(response);
    } catch (error) {
      const response: ApiErrorResponse = {
        status: "error",
        error: {
          code: "EVENT_LIST_ERROR",
          message: error instanceof Error ? error.message : "Failed to fetch events",
          details: { query: req.query }
        },
        timestamp: new Date().toISOString()
      };

      res.status(400).json(response);
    }
  }

  static async create(req: Request<{}, {}, EventInput>, res: Response) {
    try {
      const event = await EventService.create(req.body);

      const response: ApiResponse<EventWithVenue> = {
        status: "success",
        data: event as EventWithVenue,
        timestamp: new Date().toISOString(),
      };

      res.status(201).json(response);
    } catch (error) {
      const response: ApiErrorResponse = {
        status: "error",
        error: {
          code: "EVENT_CREATE_ERROR",
          message: error instanceof Error ? error.message : "Failed to create event",
          details: { ...req.body }
        },
        timestamp: new Date().toISOString()
      };

      res.status(400).json(response);
    }
  }

  static async update(
    req: Request<EventParams, {}, EventUpdateInput>,
    res: Response
  ) {
    try {
      const event = await EventService.update(req.params.id, req.body);

      const response: ApiResponse<EventWithVenue> = {
        status: "success",
        data: event as EventWithVenue,
        timestamp: new Date().toISOString(),
      };

      res.json(response);
    } catch (error) {
      const response: ApiErrorResponse = {
        status: "error",
        error: {
          code: "EVENT_UPDATE_ERROR",
          message: error instanceof Error ? error.message : "Failed to update event",
          details: { id: req.params.id, ...req.body }
        },
        timestamp: new Date().toISOString()
      };

      const statusCode = error instanceof Error && error.message === "Event not found"
        ? 404
        : 400;
      res.status(statusCode).json(response);
    }
  }

  static async replace(
    req: Request<EventParams, {}, EventInput>,
    res: Response
  ) {
    try {
      const event = await EventService.replace(req.params.id, req.body);

      const response: ApiResponse<EventWithVenue> = {
        status: "success",
        data: event as EventWithVenue,
        timestamp: new Date().toISOString(),
      };

      res.json(response);
    } catch (error) {
      const response: ApiErrorResponse = {
        status: "error",
        error: {
          code: "EVENT_REPLACE_ERROR",
          message: error instanceof Error ? error.message : "Failed to replace event",
          details: { id: req.params.id, ...req.body }
        },
        timestamp: new Date().toISOString()
      };

      const statusCode = error instanceof Error && error.message === "Event not found"
        ? 404
        : 400;
      res.status(statusCode).json(response);
    }
  }

  static async delete(req: Request<EventParams>, res: Response) {
    try {
      const event = await EventService.delete(req.params.id);

      const response: ApiResponse<boolean> = {
        status: "success",
        data: event,
        timestamp: new Date().toISOString(),
      };

      res.json(response);
    } catch (error) {
      const response: ApiErrorResponse = {
        status: "error",
        error: {
          code: "EVENT_DELETE_ERROR",
          message: error instanceof Error ? error.message : "Failed to delete event",
          details: { id: req.params.id }
        },
        timestamp: new Date().toISOString()
      };

      const statusCode = error instanceof Error && error.message === "Event not found"
        ? 404
        : 400;
      res.status(statusCode).json(response);
    }
  }

  static async getGeoJson(req: Request<EventParams>, res: Response) {
    try {
      const id = Number(req.params.id);
      const event = await EventService.findById(id) as EventWithVenue;

      if (!event.venue) {
        throw new Error("Event venue not found");
      }

      const geoJsonResponse: ApiResponse<EventGeoJSONFeature> = {
        status: "success",
        data: {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [
              event.venue.coordinates.lng,
              event.venue.coordinates.lat
            ]
          },
          properties: {
            id: event.id,
            title: event.title,
            description: event.description,
            startDate: event.startDate.toISOString(),
            endDate: event.endDate.toISOString(),
            status: event.status.toUpperCase() as "DRAFT" | "PUBLISHED" | "CANCELLED",
            venue: {
              id: event.venue.id,
              name: event.venue.name,
              address: event.venue.address
            },
            createdAt: event.createdAt.toISOString(),
            updatedAt: event.updatedAt.toISOString()
          }
        },
        timestamp: new Date().toISOString()
      };

      res.json(geoJsonResponse);
    } catch (error) {
      const response: ApiErrorResponse = {
        status: "error",
        error: {
          code: "EVENT_GEOJSON_ERROR",
          message: error instanceof Error ? error.message : "Failed to retrieve event GeoJSON",
          details: { id: req.params.id }
        },
        timestamp: new Date().toISOString()
      };

      const statusCode = error instanceof Error && error.message === "Event not found"
        ? 404
        : 400;
      res.status(statusCode).json(response);
    }
  }

  static async findInZone(
    req: Request<{}, {}, {}, EventZoneQueryCoerced>,
    res: Response
  ) {
    try {
      const { lat, lng, radius, startDate, status } = req.query;
      const events = await EventService.findInZone(
        Number(lat),
        Number(lng),
        Number(radius)
      );

      // Filter by startDate and status if provided
      const filteredEvents = events
        .filter(({ event }) => {
          if (startDate && event.startDate < new Date(startDate)) return false;
          if (status && event.status !== status) return false;
          return true;
        })
        .map(({ event, distance }) => ({
          event: event as EventWithVenue,
          distance: Math.round(distance * 100) / 100 // Round to 2 decimal places
        }));

      const response: ApiResponse<Array<{ event: EventWithVenue; distance: number }>> = {
        status: "success",
        data: filteredEvents,
        meta: {
          filters: {
            lat: Number(lat),
            lng: Number(lng),
            radius: Number(radius),
            startDate,
            status
          }
        },
        timestamp: new Date().toISOString()
      };

      res.json(response);
    } catch (error) {
      const response: ApiErrorResponse = {
        status: "error",
        error: {
          code: "EVENT_ZONE_SEARCH_ERROR",
          message: error instanceof Error ? error.message : "Failed to find events in zone",
          details: { ...req.query }
        },
        timestamp: new Date().toISOString()
      };

      res.status(400).json(response);
    }
  }
}
