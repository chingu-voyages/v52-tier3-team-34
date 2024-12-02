import prisma from "../config/database";
import { GoogleUserInput, GoogleUserUpdateInput, UserQuery, UserEventsQuery } from "../types/user.types";
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

  static async findById(id: number, include?: string) {
    const includeOptions: Prisma.UserInclude = {};
    
    if (include) {
      const relations = include.split(',').map(i => i.trim());
      if (relations.includes('venues')) {
        includeOptions.venues = true;
      }
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        profileImage: true,
        createdAt: true,
        ...(Object.keys(includeOptions).length > 0 ? includeOptions : {})
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  static async findUserEvents(userId: number, query: UserEventsQuery) {
    const { page = 1, limit = 10, sort, include, filter } = query;
    const skip = (page - 1) * limit;

    // First verify if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true }
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Build where clause
    const where: Prisma.EventWhereInput = {
      venue: {
        userId: userId
      },
      ...(filter && {
        ...(filter.startDate && { startDate: { gte: filter.startDate } }),
        ...(filter.endDate && { endDate: { lte: filter.endDate } }),
        ...(filter.status && { status: filter.status })
      })
    };

    // Build query options
    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        skip,
        take: limit,
        orderBy: sort ? {
          [sort.split(':')[0]]: sort.split(':')[1].toLowerCase()
        } : undefined,
        include: {
          venue: true
        }
      }),
      prisma.event.count({ where })
    ]);

    return {
      events,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    };
  }

  static async findAll(query: UserQuery) {
    const { page = 1, limit = 10, sort, fields, include, filter } = query;
    const skip = (page - 1) * limit;

    // Parse sort parameter
    let orderBy: Prisma.UserOrderByWithRelationInput | undefined;
    if (sort) {
      const [field, direction] = sort.split(':');
      if (direction && !['asc', 'desc'].includes(direction.toLowerCase())) {
        throw new Error("Sort direction must be either 'asc' or 'desc'");
      }
      orderBy = { [field]: direction.toLowerCase() };
    }

    // Build where clause from filter
    const where = filter ? 
      Object.entries(filter).reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}) :
      {};

    // Build query options
    const queryOptions: Prisma.UserFindManyArgs = {
      skip,
      take: limit,
      where,
      orderBy,
    };

    // Handle field selection
    const select = fields
      ? Object.fromEntries(fields.split(',').map(field => [field.trim(), true]))
      : {
          id: true,
          email: true,
          name: true,
          profileImage: true,
          createdAt: true,
        };

    // Handle includes/expansions
    if (include) {
      const includes = Object.fromEntries(
        include.split(',').map(relation => [relation.trim(), true])
      );
      
      // Merge select and include
      queryOptions.select = {
        ...select,
        ...includes
      };
    } else {
      queryOptions.select = select;
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany(queryOptions),
      prisma.user.count({ where })
    ]);

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
      meta: {
        filters: filter || {},
        sort: sort ? {
          field: sort.split(':')[0],
          direction: sort.split(':')[1] as 'asc' | 'desc'
        } : undefined,
        fields: fields?.split(',').map(f => f.trim()),
        includes: include?.split(',').map(i => i.trim()) || []
      }
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
