import prisma from "../config/database";
import { VenueInput, VenueUpdateInput, VenueQuery } from "../types/venue.types";
import { Prisma } from "@prisma/client";

export class VenueService {
  static async findById(id: number) {
    const venue = await prisma.venue.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    if (!venue) {
      throw new Error("Venue not found");
    }

    return venue;
  }

  static async findAll(query: VenueQuery) {
    const { page = 1, limit = 10, orderBy, order } = query;
    const skip = (page - 1) * limit;

    const [venues, total] = await Promise.all([
      prisma.venue.findMany({
        skip,
        take: limit,
        orderBy: orderBy ? { [orderBy]: order || 'asc' } : undefined,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      }),
      prisma.venue.count()
    ]);

    return {
      venues,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit,
        hasNextPage: skip + venues.length < total,
        hasPreviousPage: page > 1,
      },
    };
  }

  static async create(data: VenueInput) {
    try {
      const venue = await prisma.venue.create({
        data: {
          ...data,
          contact: data.contact as Prisma.InputJsonValue,
          coordinates: data.coordinates as Prisma.InputJsonValue
        }
      });

      return venue;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Failed to create venue: ${error.message}`);
      }
      throw error;
    }
  }

  static async update(id: string, data: VenueUpdateInput) {
    try {
      const venueId = Number(id);
      if (isNaN(venueId)) throw new Error('Invalid venue ID');

      const venue = await prisma.venue.update({
        where: { id: venueId },
        data: {
          ...data,
          contact: data.contact ? data.contact as Prisma.InputJsonValue : undefined,
          coordinates: data.coordinates ? data.coordinates as Prisma.InputJsonValue : undefined
        }
      });

      return venue;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new Error("Venue not found");
        }
        throw new Error(`Failed to update venue: ${error.message}`);
      }
      throw error;
    }
  }

  static async replace(id: string, data: VenueInput) {
    try {
      const venueId = Number(id);
      if (isNaN(venueId)) throw new Error('Invalid venue ID');

      const venue = await prisma.venue.update({
        where: { id: venueId },
        data: {
          ...data,
          contact: data.contact as Prisma.InputJsonValue,
          coordinates: data.coordinates as Prisma.InputJsonValue
        }
      });

      return venue;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new Error("Venue not found");
        }
        throw new Error(`Failed to replace venue: ${error.message}`);
      }
      throw error;
    }
  }

  static async delete(id: string) {
    try {
      const venueId = Number(id);
      if (isNaN(venueId)) throw new Error('Invalid venue ID');

      await prisma.venue.delete({
        where: { id: venueId }
      });

      return true;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new Error("Venue not found");
        }
        throw new Error(`Failed to delete venue: ${error.message}`);
      }
      throw error;
    }
  }
}