import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { UserResponse } from "../types/user.types";
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
}
