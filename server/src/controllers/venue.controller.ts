import { Request, Response } from "express";
import { VenueService } from "../services/venue.service";
import {
  VenueResponse,
  VenueQuery,
  VenueInput,
  VenueUpdateInput,
  VenueParams,
} from "../types/venue.types";
import { ApiResponse } from "../types/api.types";

export class VenueController {
  static async getById(req: Request<VenueParams>, res: Response) {
    try {
      const id = Number(req.params.id);
      const venue = await VenueService.findById(id);

      const response: ApiResponse<VenueResponse> = {
        status: "success",
        data: {
          id: venue.id,
          name: venue.name,
          description: venue.description,
          address: venue.address,
          contact: venue.contact as VenueResponse["contact"],
          images: venue.images,
          createdAt: venue.createdAt.toISOString(),
          updatedAt: venue.updatedAt.toISOString(),
        },
        timestamp: new Date().toISOString(),
      };

      res.json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        status: "error",
        message: error instanceof Error ? error.message : "Venue not found",
        timestamp: new Date().toISOString(),
      };

      res.status(404).json(response);
    }
  }

  static async list(req: Request<{}, {}, {}, VenueQuery>, res: Response) {
    try {
      const result = await VenueService.findAll(req.query);

      const response: ApiResponse<VenueResponse[]> = {
        status: "success",
        data: result.venues.map(venue => ({
          id: venue.id,
          name: venue.name,
          description: venue.description,
          address: venue.address,
          contact: venue.contact as VenueResponse["contact"],
          images: venue.images,
          createdAt: venue.createdAt.toISOString(),
          updatedAt: venue.updatedAt.toISOString(),
        })),
        pagination: result.pagination,
        timestamp: new Date().toISOString(),
      };

      res.json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to fetch venues",
        timestamp: new Date().toISOString(),
      };

      res.status(500).json(response);
    }
  }

  static async create(req: Request<{}, {}, VenueInput>, res: Response) {
    try {
      const venue = await VenueService.create(req.body);

      const response: ApiResponse<VenueResponse> = {
        status: "success",
        data: {
          id: venue.id,
          name: venue.name,
          description: venue.description,
          address: venue.address,
          contact: venue.contact as VenueResponse["contact"],
          images: venue.images,
          createdAt: venue.createdAt.toISOString(),
          updatedAt: venue.updatedAt.toISOString(),
        },
        timestamp: new Date().toISOString(),
      };

      res.status(201).json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to create venue",
        timestamp: new Date().toISOString(),
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

      const response: ApiResponse<VenueResponse> = {
        status: "success",
        data: {
          id: venue.id,
          name: venue.name,
          description: venue.description,
          address: venue.address,
          contact: venue.contact as VenueResponse["contact"],
          images: venue.images,
          createdAt: venue.createdAt.toISOString(),
          updatedAt: venue.updatedAt.toISOString(),
        },
        timestamp: new Date().toISOString(),
      };

      res.json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to update venue",
        timestamp: new Date().toISOString(),
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

      const response: ApiResponse<VenueResponse> = {
        status: "success",
        data: {
          id: venue.id,
          name: venue.name,
          description: venue.description,
          address: venue.address,
          contact: venue.contact as VenueResponse["contact"],
          images: venue.images,
          createdAt: venue.createdAt.toISOString(),
          updatedAt: venue.updatedAt.toISOString(),
        },
        timestamp: new Date().toISOString(),
      };

      res.json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to replace venue",
        timestamp: new Date().toISOString(),
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
        message: "Venue deleted successfully",
        timestamp: new Date().toISOString(),
      };

      res.json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to delete venue",
        timestamp: new Date().toISOString(),
      };

      const statusCode = error instanceof Error && error.message === "Venue not found"
        ? 404
        : 400;
      res.status(statusCode).json(response);
    }
  }
} 