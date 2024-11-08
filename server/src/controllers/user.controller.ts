import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { UserResponse, UserQuery, GoogleUserInput } from "../types/user.types";
import { ApiResponse } from "../types/api.types";

export class UserController {
  static async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const user: UserResponse = await UserService.findById(id);

      const response: ApiResponse<UserResponse> = {
        status: "success",
        data: user,
        timestamp: new Date().toISOString()
      };

      res.json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        status: "error",
        message: error instanceof Error ? error.message : "User not found",
        timestamp: new Date().toISOString()
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
        pagination: result.pagination,
        timestamp: new Date().toISOString()
      };

      res.json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to fetch users",
        timestamp: new Date().toISOString()
      };

      res.status(500).json(response);
    }
  }

  static async create(req: Request<{}, {}, GoogleUserInput>, res: Response) {
    try {
      const user: UserResponse = await UserService.create(req.body);

      const response: ApiResponse<UserResponse> = {
        status: "success",
        data: user,
        timestamp: new Date().toISOString()
      };

      res.status(201).json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to create user",
        timestamp: new Date().toISOString()
      };

      res.status(400).json(response);
    }
  }
}
