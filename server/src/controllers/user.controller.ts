import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import {
  UserResponse,
  UserQuery,
  GoogleUserInput,
  GoogleUserUpdateInput,
  UserParams,
} from "../types/user.types";
import { ApiResponse, ApiErrorResponse } from "../types/api.types";

export class UserController {
  static async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const include = req.query.include as string;
      const user: UserResponse = await UserService.findById(id, include);

      const response: ApiResponse<UserResponse> = {
        status: "success",
        data: user,
        timestamp: new Date().toISOString(),
      };

      res.json(response);
    } catch (error) {
      const response: ApiErrorResponse = {
        status: "error",
        error: {
          code: "USER_NOT_FOUND",
          message: error instanceof Error ? error.message : "User not found",
          details: { id: req.params.id }
        },
        timestamp: new Date().toISOString(),
      };

      res.status(404).json(response);
    }
  }

  static async list(req: Request<{}, {}, {}, UserQuery>, res: Response) {
    try {
      const result = await UserService.findAll(req.query);

      const response: ApiResponse<UserResponse[]> = {
        status: "success",
        data: result.users,
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
          code: "USER_LIST_ERROR",
          message: error instanceof Error ? error.message : "Failed to list users",
          details: { query: req.query }
        },
        timestamp: new Date().toISOString()
      };

      res.status(400).json(response);
    }
  }

  static async create(req: Request<{}, {}, GoogleUserInput>, res: Response) {
    try {
      const user: UserResponse = await UserService.create(req.body);

      const response: ApiResponse<UserResponse> = {
        status: "success",
        data: user,
        timestamp: new Date().toISOString(),
      };

      res.status(201).json(response);
    } catch (error) {
      const response: ApiErrorResponse = {
        status: "error",
        error: {
          code: "USER_CREATE_ERROR",
          message: error instanceof Error ? error.message : "Failed to create user",
          details: req.body
        },
        timestamp: new Date().toISOString(),
      };

      res.status(400).json(response);
    }
  }

  static async update(
    req: Request<UserParams, {}, GoogleUserUpdateInput>,
    res: Response
  ) {
    try {
      const userId = req.params.id;
      const user: UserResponse = await UserService.update(userId, req.body);

      const response: ApiResponse<UserResponse> = {
        status: "success",
        data: user,
        timestamp: new Date().toISOString(),
      };

      res.json(response);
    } catch (error) {
      const response: ApiErrorResponse = {
        status: "error",
        error: {
          code: error instanceof Error && error.message === "User not found" 
            ? "USER_NOT_FOUND" 
            : "USER_UPDATE_ERROR",
          message: error instanceof Error ? error.message : "Failed to update user",
          details: { id: req.params.id, ...req.body }
        },
        timestamp: new Date().toISOString(),
      };

      const statusCode = error instanceof Error && error.message === "User not found"
        ? 404
        : 400;
      res.status(statusCode).json(response);
    }
  }

  static async replace(
    req: Request<UserParams, {}, GoogleUserInput>,
    res: Response
  ) {
    try {
      const userId = req.params.id;
      const user: UserResponse = await UserService.replace(userId, req.body);

      const response: ApiResponse<UserResponse> = {
        status: "success",
        data: user,
        timestamp: new Date().toISOString()
      };

      res.json(response);
    } catch (error) {
      const response: ApiErrorResponse = {
        status: "error",
        error: {
          code: error instanceof Error && error.message === "User not found" 
            ? "USER_NOT_FOUND" 
            : "USER_REPLACE_ERROR",
          message: error instanceof Error ? error.message : "Failed to replace user",
          details: { id: req.params.id, ...req.body }
        },
        timestamp: new Date().toISOString()
      };

      const statusCode = error instanceof Error && error.message === "User not found"
        ? 404
        : 400;
      res.status(statusCode).json(response);
    }
  }

  static async delete(
    req: Request<UserParams>,
    res: Response
  ) {
    try {
      const userId = req.params.id;
      const success = await UserService.delete(userId);

      const response: ApiResponse<boolean> = {
        status: "success",
        data: success,
        timestamp: new Date().toISOString()
      };

      res.json(response);
    } catch (error) {
      const response: ApiErrorResponse = {
        status: "error",
        error: {
          code: error instanceof Error && error.message === "User not found" 
            ? "USER_NOT_FOUND" 
            : "USER_DELETE_ERROR",
          message: error instanceof Error ? error.message : "Failed to delete user",
          details: { id: req.params.id }
        },
        timestamp: new Date().toISOString()
      };

      const statusCode = error instanceof Error && error.message === "User not found"
        ? 404
        : 400;
      res.status(statusCode).json(response);
    }
  }
}
