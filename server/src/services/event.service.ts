import prisma from "../config/database";
import { EventInput, EventUpdateInput, EventQuery } from "../types/event.types";
import { Prisma } from "@prisma/client";

// Utility function for Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI/180);
}

export class EventService {
  static async findById(id: number) {
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        venue: true
      }
    });

    if (!event) {
      throw new Error("Event not found");
    }

    return event;
  }

  static async findAll(query: EventQuery) {
    const { page = 1, limit = 10, status, orderBy, order } = query;
    const skip = (page - 1) * limit;

    const where = status ? { status } : {};

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        skip,
        take: limit,
        orderBy: orderBy ? { [orderBy]: order || 'asc' } : undefined,
        include: {
          venue: true
        }
      }),
      prisma.event.count({ where }),
    ]);

    return {
      events,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit,
        hasNextPage: skip + events.length < total,
        hasPreviousPage: page > 1,
      },
    };
  }

  static async create(data: EventInput) {
    try {
      const event = await prisma.event.create({
        data: {
          ...data,
          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate),
        },
        include: {
          venue: true
        }
      });

      return event;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2003") {
          throw new Error("Venue not found");
        }
        throw new Error(`Failed to create event: ${error.message}`);
      }
      throw error;
    }
  }

  static async update(id: string, data: EventUpdateInput) {
    try {
      const eventId = Number(id);
      if (isNaN(eventId)) throw new Error('Invalid event ID');

      const event = await prisma.event.update({
        where: { id: eventId },
        data: {
          ...data,
          startDate: data.startDate ? new Date(data.startDate) : undefined,
          endDate: data.endDate ? new Date(data.endDate) : undefined,
        },
        include: {
          venue: true
        }
      });

      return event;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new Error("Event not found");
        }
        if (error.code === "P2003") {
          throw new Error("Venue not found");
        }
        throw new Error(`Failed to update event: ${error.message}`);
      }
      throw error;
    }
  }

  static async replace(id: string, data: EventInput) {
    try {
      const eventId = Number(id);
      if (isNaN(eventId)) throw new Error('Invalid event ID');

      const event = await prisma.event.update({
        where: { id: eventId },
        data: {
          ...data,
          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate),
        },
        include: {
          venue: true
        }
      });

      return event;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new Error("Event not found");
        }
        if (error.code === "P2003") {
          throw new Error("Venue not found");
        }
        throw new Error(`Failed to replace event: ${error.message}`);
      }
      throw error;
    }
  }

  static async delete(id: string) {
    try {
      const eventId = Number(id);
      if (isNaN(eventId)) throw new Error('Invalid event ID');

      await prisma.event.delete({
        where: { id: eventId }
      });

      return true;  // Successfully deleted
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new Error("Event not found");
        }
        throw new Error(`Failed to delete event: ${error.message}`);
      }
      throw error;
    }
  }

  static async findInZone(lat: number, lng: number, radius: number) {
    // Get all events with their venues
    const events = await prisma.event.findMany({
      include: {
        venue: true
      }
    });

    // Filter events by distance and map to GeoJSON
    const eventsInZone = events
      .filter(event => {
        if (!event.venue?.coordinates) return false;
        const venueCoords = event.venue.coordinates as { lat: number; lng: number };
        const distance = calculateDistance(lat, lng, venueCoords.lat, venueCoords.lng);
        return distance <= radius;
      })
      .map(event => {
        const venueCoords = event.venue!.coordinates as { lat: number; lng: number };
        const distance = calculateDistance(lat, lng, venueCoords.lat, venueCoords.lng);
        return { event, distance };
      })
      .sort((a, b) => a.distance - b.distance);

    return eventsInZone;
  }
} 