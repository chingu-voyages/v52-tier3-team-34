import { Request, Response } from "express";
import { EventService } from "../services/event.service";
import {
  EventResponse,
  EventQuery,
  EventInput,
  EventUpdateInput,
  EventParams,
  EventStatus,
} from "../types/event.types";
import { ApiResponse } from "../types/api.types";

export class EventController {
  static async getById(req: Request<EventParams>, res: Response) {
    try {
      const id = Number(req.params.id);
      const event = await EventService.findById(id);

      const response: ApiResponse<EventResponse> = {
        status: "success",
        data: {
          id: event.id,
          title: event.title,
          description: event.description,
          startDate: event.startDate.toISOString(),
          endDate: event.endDate.toISOString(),
          location: event.location,
          status: event.status as keyof typeof EventStatus,
          createdAt: event.createdAt.toISOString(),
          updatedAt: event.updatedAt.toISOString(),
        },
        timestamp: new Date().toISOString(),
      };

      res.json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        status: "error",
        message: error instanceof Error ? error.message : "Event not found",
        timestamp: new Date().toISOString(),
      };

      res.status(404).json(response);
    }
  }

  static async list(req: Request<{}, {}, {}, EventQuery>, res: Response) {
    try {
      const result = await EventService.findAll(req.query);

      const response: ApiResponse<EventResponse[]> = {
        status: "success",
        data: result.events.map(event => ({
          id: event.id,
          title: event.title,
          description: event.description,
          startDate: event.startDate.toISOString(),
          endDate: event.endDate.toISOString(),
          location: event.location,
          status: event.status as keyof typeof EventStatus,
          createdAt: event.createdAt.toISOString(),
          updatedAt: event.updatedAt.toISOString(),
        })),
        pagination: result.pagination,
        timestamp: new Date().toISOString(),
      };

      res.json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to fetch events",
        timestamp: new Date().toISOString(),
      };

      res.status(500).json(response);
    }
  }

  static async create(req: Request<{}, {}, EventInput>, res: Response) {
    try {
      const event = await EventService.create(req.body);

      const response: ApiResponse<EventResponse> = {
        status: "success",
        data: {
          id: event.id,
          title: event.title,
          description: event.description,
          startDate: event.startDate.toISOString(),
          endDate: event.endDate.toISOString(),
          location: event.location,
          status: event.status as keyof typeof EventStatus,
          createdAt: event.createdAt.toISOString(),
          updatedAt: event.updatedAt.toISOString(),
        },
        timestamp: new Date().toISOString(),
      };

      res.status(201).json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to create event",
        timestamp: new Date().toISOString(),
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

      const response: ApiResponse<EventResponse> = {
        status: "success",
        data: {
          id: event.id,
          title: event.title,
          description: event.description,
          startDate: event.startDate.toISOString(),
          endDate: event.endDate.toISOString(),
          location: event.location,
          status: event.status as keyof typeof EventStatus,
          createdAt: event.createdAt.toISOString(),
          updatedAt: event.updatedAt.toISOString(),
        },
        timestamp: new Date().toISOString(),
      };

      res.json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to update event",
        timestamp: new Date().toISOString(),
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

      const response: ApiResponse<EventResponse> = {
        status: "success",
        data: {
          id: event.id,
          title: event.title,
          description: event.description,
          startDate: event.startDate.toISOString(),
          endDate: event.endDate.toISOString(),
          location: event.location,
          status: event.status as keyof typeof EventStatus,
          createdAt: event.createdAt.toISOString(),
          updatedAt: event.updatedAt.toISOString(),
        },
        timestamp: new Date().toISOString(),
      };

      res.json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to replace event",
        timestamp: new Date().toISOString(),
      };

      const statusCode = error instanceof Error && error.message === "Event not found"
        ? 404
        : 400;
      res.status(statusCode).json(response);
    }
  }

  static async delete(req: Request<EventParams>, res: Response) {
    try {
      await EventService.delete(req.params.id);

      const response: ApiResponse<null> = {
        status: "success",
        message: "Event deleted successfully",
        timestamp: new Date().toISOString(),
      };

      res.json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to delete event",
        timestamp: new Date().toISOString(),
      };

      const statusCode = error instanceof Error && error.message === "Event not found"
        ? 404
        : 400;
      res.status(statusCode).json(response);
    }
  }
}
