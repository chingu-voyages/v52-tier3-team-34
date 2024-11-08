import prisma from "../config/database";
import { GoogleUserInput, GoogleUserUpdateInput, UserQuery } from "../types/user.types";
import { Prisma } from "@prisma/client";

export class UserService {
  static async findOrCreateFromGoogle(data: GoogleUserInput) {
    const user = await prisma.user.upsert({
      where: {
        googleId: data.googleId,
      },
      update: {
        name: data.name,
        email: data.email,
        profileImage: data.profileImage,
      },
      create: {
        ...data,
      },
      select: {
        id: true,
        email: true,
        name: true,
        profileImage: true,
        createdAt: true,
      },
    });

    return user;
  }

  static async findById(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        profileImage: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  static async findAll(query: UserQuery) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const total = await prisma.user.count();

    const users = await prisma.user.findMany({
      skip,
      take: limit,
      orderBy: query.orderBy
        ? {
            [query.orderBy]: query.order || "asc",
          }
        : undefined,
      select: {
        id: true,
        email: true,
        name: true,
        profileImage: true,
        createdAt: true,
      },
    });

    return {
      users,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit,
        hasNextPage: skip + users.length < total,
        hasPreviousPage: page > 1,
      },
    };
  }

  static async create(data: GoogleUserInput) {
    try {
      const user = await prisma.user.create({
        data,
        select: {
          id: true,
          email: true,
          name: true,
          profileImage: true,
          createdAt: true,
        },
      });

      return user;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        if (error.meta?.target) {
          const field = Array.isArray(error.meta.target)
            ? error.meta.target[0]
            : "field";
          throw new Error(`User with this ${field} already exists`);
        }

        throw new Error(
          "This user cannot be created due to a unique constraint violation"
        );
      }

      throw error;
    }
  }

  static async update(id: string, data: GoogleUserUpdateInput) {
    try {
      const userId = Number(id);
      if (isNaN(userId)) throw new Error('Invalid user ID');

      const user = await prisma.user.update({
        where: { id: userId },
        data,
        select: {
          id: true,
          email: true,
          name: true,
          profileImage: true,
          createdAt: true,
        },
      });

      return user;
    } catch (error) {
      // Not found error
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new Error("User not found");
      }

      // Unique constraint violation
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        if (error.meta?.target) {
          const field = Array.isArray(error.meta.target)
            ? error.meta.target[0]
            : "field";
          throw new Error(`User with this ${field} already exists`);
        }
        throw new Error("This update violates a unique constraint");
      }

      throw error;
    }
  }

  static async replace(id: string, data: GoogleUserInput) {
    try {
      const userId = Number(id);
      if (isNaN(userId)) throw new Error('Invalid user ID');

      const user = await prisma.user.update({
        where: { id: userId },
        data,
        select: {
          id: true,
          email: true,
          name: true,
          profileImage: true,
          createdAt: true
        }
      });

      return user;
    } catch (error) {
      // Not found error
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        throw new Error("User not found");
      }

      // Unique constraint violation
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        if (error.meta?.target) {
          const field = Array.isArray(error.meta.target) ? error.meta.target[0] : "field";
          throw new Error(`User with this ${field} already exists`);
        }
        throw new Error("This update violates a unique constraint");
      }

      throw error;
    }
  }

  static async delete(id: string) {
    try {
      const userId = Number(id);
      if (isNaN(userId)) throw new Error('Invalid user ID');

      await prisma.user.delete({
        where: { id: userId }
      });

      return true;  // Successfully deleted
    } catch (error) {
      // Not found error
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        throw new Error("User not found");
      }

      throw error;
    }
  }
}
