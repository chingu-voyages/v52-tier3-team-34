import prisma from '../config/database';
import { GoogleUserInput, GoogleUserUpdateInput } from '../types/user.types';
import { Prisma } from '@prisma/client';

export class UserService {
  // Find or create user from Google data
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

  // Find user by ID
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
      throw new Error('User not found');
    }

    return user;
  }

  // Find user by Google ID
  static async findByGoogleId(googleId: string) {
    const user = await prisma.user.findUnique({
      where: { googleId },
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

  // Update user
  static async update(id: number, data: GoogleUserUpdateInput) {
    try {
      const user = await prisma.user.update({
        where: { id },
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
        error.code === 'P2025'
      ) {
        throw new Error('User not found');
      }
      throw error;
    }
  }
}
