import prisma from '../config/database';
import { GoogleUserInput, UserQuery } from '../types/user.types';

export class UserService {
  static async findOrCreateFromGoogle(data: GoogleUserInput) {
    const user = await prisma.user.upsert({
      where: { 
        googleId: data.googleId 
      },
      update: {
        name: data.name,
        email: data.email,
        profileImage: data.profileImage
      },
      create: {
        ...data
      },
      select: {
        id: true,
        email: true,
        name: true,
        profileImage: true,
        createdAt: true
      }
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
        createdAt: true
      }
    });

    if (!user) {
      throw new Error('User not found');
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
      orderBy: query.orderBy ? {
        [query.orderBy]: query.order || 'asc'
      } : undefined,
      select: {
        id: true,
        email: true,
        name: true,
        profileImage: true,
        createdAt: true
      }
    });

    return {
      users,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit,
        hasNextPage: skip + users.length < total,
        hasPreviousPage: page > 1
      }
    };
  }
} 