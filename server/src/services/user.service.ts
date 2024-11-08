import prisma from '../config/database';
import { GoogleUserInput } from '../types/user.types';

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

  static async findById(id: string) {
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
} 