import { Request, Response } from "express";
import { VenueService } from "../services/venue.service";
import {
  VenueQuery,
  VenueInput,
  VenueUpdateInput,
  VenueParams,
  GeoJSONFeature,
  VenueProperties
} from "../types/venue.types";
import { ApiResponse, ApiErrorResponse } from "../types/api.types";
import { Venue, User } from "@prisma/client";

// Only used for endpoints that need user data
type VenueWithUser = Venue & {
  user: Pick<User, 'id' | 'name' | 'email'> | null;
  coordinates: { lng: number; lat: number };
};

export class VenueController {
  static async getById(req: Request<VenueParams>, res: Response) {
    try {
      const id = Number(req.params.id);
      const venue = await VenueService.findById(id);

      const response: ApiResponse<VenueWithUser> = {
        status: "success",
        data: venue as VenueWithUser,
        timestamp: new Date().toISOString(),
      };

      res.json(response);
    } catch (error) {
      const response: ApiErrorResponse = {
        status: "error",
        error: {
          code: "VENUE_NOT_FOUND",
          message: error instanceof Error ? error.message : "Venue not found",
          details: { id: req.params.id }
        },
        timestamp: new Date().toISOString()
      };

      const statusCode = error instanceof Error && error.message === "Venue not found"
        ? 404
        : 400;
      res.status(statusCode).json(response);
    }
  }

  static async list(req: Request<{}, {}, {}, VenueQuery>, res: Response) {
    try {
      const result = await VenueService.findAll(req.query);

      const response: ApiResponse<VenueWithUser[]> = {
        status: "success",
        data: result.venues as VenueWithUser[],
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
          includes: result.meta.includes
        },
        timestamp: new Date().toISOString()
      };

      res.json(response);
    } catch (error) {
      const response: ApiErrorResponse = {
        status: "error",
        error: {
          code: "VENUE_LIST_ERROR",
          message: error instanceof Error ? error.message : "Failed to retrieve venues",
          details: { query: req.query }
        },
        timestamp: new Date().toISOString()
      };

      res.status(400).json(response);
    }
  }

  static async create(req: Request<{}, {}, VenueInput>, res: Response) {
    try {
      const venue = await VenueService.create(req.body);
      const response: ApiResponse<VenueWithUser> = {
        status: "success",
        data: venue as VenueWithUser,
        timestamp: new Date().toISOString(),
      };

      res.status(201).json(response);
    } catch (error) {
      const response: ApiErrorResponse = {
        status: "error",
        error: {
          code: "VENUE_CREATE_ERROR",
          message: error instanceof Error ? error.message : "Failed to create venue",
          details: { ...req.body }
        },
        timestamp: new Date().toISOString()
      };

      res.status(400).json(response);
    }
  }

  static async update(
    req: Request<VenueParams, {}, VenueUpdateInput>,
    res: Response
  ) {
    try {
      const venue = await VenueService.update(req.params.id, req.body);
      const response: ApiResponse<VenueWithUser> = {
        status: "success",
        data: venue as VenueWithUser,
        timestamp: new Date().toISOString(),
      };

      res.json(response);
    } catch (error) {
      const response: ApiErrorResponse = {
        status: "error",
        error: {
          code: "VENUE_UPDATE_ERROR",
          message: error instanceof Error ? error.message : "Failed to update venue",
          details: { id: req.params.id, ...req.body }
        },
        timestamp: new Date().toISOString()
      };

      const statusCode = error instanceof Error && error.message === "Venue not found"
        ? 404
        : 400;
      res.status(statusCode).json(response);
    }
  }

  static async replace(
    req: Request<VenueParams, {}, VenueInput>,
    res: Response
  ) {
    try {
      const venue = await VenueService.replace(req.params.id, req.body);
      const response: ApiResponse<VenueWithUser> = {
        status: "success",
        data: venue as VenueWithUser,
        timestamp: new Date().toISOString(),
      };

      res.json(response);
    } catch (error) {
      const response: ApiErrorResponse = {
        status: "error",
        error: {
          code: "VENUE_REPLACE_ERROR",
          message: error instanceof Error ? error.message : "Failed to replace venue",
          details: { id: req.params.id, ...req.body }
        },
        timestamp: new Date().toISOString()
      };

      const statusCode = error instanceof Error && error.message === "Venue not found"
        ? 404
        : 400;
      res.status(statusCode).json(response);
    }
  }

  static async delete(req: Request<VenueParams>, res: Response) {
    try {
      await VenueService.delete(req.params.id);

      const response: ApiResponse<null> = {
        status: "success",
        data: null,
        timestamp: new Date().toISOString(),
      };

      res.json(response);
    } catch (error) {
      const response: ApiErrorResponse = {
        status: "error",
        error: {
          code: "VENUE_DELETE_ERROR",
          message: error instanceof Error ? error.message : "Failed to delete venue",
          details: { id: req.params.id }
        },
        timestamp: new Date().toISOString()
      };

      const statusCode = error instanceof Error && error.message === "Venue not found"
        ? 404
        : 400;
      res.status(statusCode).json(response);
    }
  }

  static async getGeoJson(req: Request<VenueParams>, res: Response) {
    try {
      const id = Number(req.params.id);
      const venue = await VenueService.findById(id);

      if (!venue.coordinates) {
        throw new Error("Venue coordinates not found");
      }

      const geoJsonResponse: ApiResponse<GeoJSONFeature> = {
        status: "success",
        data: {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [
              (venue as VenueWithUser).coordinates.lng,
              (venue as VenueWithUser).coordinates.lat
            ]
          },
          properties: {
            id: venue.id,
            name: venue.name,
            description: venue.description,
            address: venue.address,
            contact: venue.contact as VenueProperties["contact"],
            images: venue.images,
            createdAt: venue.createdAt.toISOString(),
            updatedAt: venue.updatedAt.toISOString()
          }
        },
        timestamp: new Date().toISOString()
      };

      res.json(geoJsonResponse);
    } catch (error) {
      const response: ApiErrorResponse = {
        status: "error",
        error: {
          code: "VENUE_GEOJSON_ERROR",
          message: error instanceof Error ? error.message : "Failed to retrieve venue GeoJSON",
          details: { id: req.params.id }
        },
        timestamp: new Date().toISOString()
      };

      const statusCode = error instanceof Error && error.message === "Venue not found"
        ? 404
        : 400;
      res.status(statusCode).json(response);
    }
  }
}