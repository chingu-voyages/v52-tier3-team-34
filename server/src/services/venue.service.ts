import prisma from "../config/database";
import { VenueInput, VenueUpdateInput, VenueQuery } from "../types/venue.types";
import { Prisma } from "@prisma/client";

export class VenueService {
  static async findById(id: number, include?: string) {
    const includeOptions: Prisma.VenueInclude = {};
    
    if (include) {
      const relations = include.split(',').map(i => i.trim());
      if (relations.includes('events')) {
        includeOptions.events = true;
      }
      if (relations.includes('user')) {
        includeOptions.user = {
          select: {
            id: true,
            email: true,
            name: true,
            profileImage: true,
            createdAt: true
          }
        };
      }
    }

    const venue = await prisma.venue.findUnique({
      where: { id },
      include: Object.keys(includeOptions).length > 0 ? includeOptions : undefined
    });

    if (!venue) {
      throw new Error("Venue not found");
    }

    return venue;
  }

  static async findAll(query: VenueQuery) {
    const { page = 1, limit = 10, sort, fields, include, filter } = query;
    const skip = (page - 1) * limit;

    // Parse sort parameter
    let orderBy: Prisma.VenueOrderByWithRelationInput | undefined;
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
    const queryOptions: Prisma.VenueFindManyArgs = {
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
          name: true,
          description: true,
          address: true,
          contact: true,
          coordinates: true,
          userId: true,
          createdAt: true,
          updatedAt: true,
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

    const [venues, total] = await Promise.all([
      prisma.venue.findMany(queryOptions),
      prisma.venue.count({ where })
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
      meta: {
        filters: filter || {},
        sort: sort ? {
          field: sort.split(':')[0],
          direction: sort.split(':')[1].toLowerCase() as 'asc' | 'desc'
        } : undefined,
        fields: fields?.split(',').map(f => f.trim()),
        includes: include?.split(',').map(i => i.trim()) || []
      }
    };
  }

  static async create(data: VenueInput) {
    try {
      const venue = await prisma.venue.create({
        data: {
          ...data,
          contact: data.contact as Prisma.InputJsonValue,
          coordinates: data.coordinates as Prisma.InputJsonValue
        },
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
        },
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
        },
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

  static async findInZone(lat: number, lng: number, radius: number) {
    // Convert radius from kilometers to degrees (approximate)
    const radiusInDegrees = radius / 111.32;

    const venues = await prisma.venue.findMany({
      where: {
        AND: [
          {
            coordinates: {
              path: ['lat'],
              gte: lat - radiusInDegrees,
              lte: lat + radiusInDegrees,
            },
          },
          {
            coordinates: {
              path: ['lng'],
              gte: lng - radiusInDegrees,
              lte: lng + radiusInDegrees,
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        description: true,
        address: true,
        contact: true,
        coordinates: true,
        images: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return venues.map(venue => ({
      ...venue,
      coordinates: venue.coordinates as { lat: number; lng: number }
    }));
  }
}