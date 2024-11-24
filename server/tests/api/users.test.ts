import { describe, expect, it as test, beforeAll, afterAll } from '@jest/globals';
import { ApiClient } from '../utils/apiClient';
import { GoogleUserInput, UserResponse } from '../../src/types/user.types';

const api = new ApiClient();

describe('User API', () => {
  let createdUserId: number;
  
  const testUser: GoogleUserInput = {
    email: 'test@example.com',
    name: 'Test User',
    googleId: '123456789',
    profileImage: 'https://example.com/profile.jpg'
  };

  const updatedUser: Partial<GoogleUserInput> = {
    name: 'Updated Test User',
    profileImage: 'https://example.com/new-profile.jpg'
  };

  // Create user tests
  describe('POST /users', () => {
    test('should create a new user', async () => {
      const response = await api.post<UserResponse>('/users', testUser);
      
      expect(response.status).toBe(201);
      expect(response.data).toMatchObject({
        email: testUser.email,
        name: testUser.name,
        profileImage: testUser.profileImage
      });
      expect(response.data.id).toBeDefined();
      createdUserId = response.data.id;
    });

    test('should return 400 for invalid user data', async () => {
      const invalidUser = {
        email: 'invalid-email',
        name: '',
        googleId: ''
      };
      
      await expect(api.post('/users', invalidUser)).rejects.toMatchObject({
        status: 400
      });
    });
  });

  // Get user tests
  describe('GET /users/:id', () => {
    test('should get user by ID', async () => {
      const response = await api.get<UserResponse>(`/users/${createdUserId}`);
      
      expect(response.status).toBe(200);
      expect(response.data).toMatchObject({
        id: createdUserId,
        email: testUser.email,
        name: testUser.name
      });
    });

    test('should return 404 for non-existent user', async () => {
      await expect(api.get('/users/99999')).rejects.toMatchObject({
        status: 404
      });
    });

    test('should return 400 for invalid ID format', async () => {
      await expect(api.get('/users/invalid-id')).rejects.toMatchObject({
        status: 400
      });
    });
  });

  // List users tests
  describe('GET /users', () => {
    test('should list users with pagination', async () => {
      const response = await api.get<UserResponse[]>('/users?page=1&limit=10');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
      expect(response.data.length).toBeLessThanOrEqual(10);
    });

    test('should filter users', async () => {
      const response = await api.get<UserResponse[]>(`/users?filter[email]=${testUser.email}`);
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
      expect(response.data.some(user => user.email === testUser.email)).toBe(true);
    });

    test('should sort users', async () => {
      const response = await api.get<UserResponse[]>('/users?sort=name:asc');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
    });
  });

  // Update user tests
  describe('PATCH /users/:id', () => {
    test('should partially update user', async () => {
      const response = await api.patch<UserResponse>(`/users/${createdUserId}`, updatedUser);
      
      expect(response.status).toBe(200);
      expect(response.data).toMatchObject({
        id: createdUserId,
        name: updatedUser.name,
        profileImage: updatedUser.profileImage
      });
    });

    test('should return 404 for non-existent user', async () => {
      await expect(api.patch('/users/99999', updatedUser)).rejects.toMatchObject({
        status: 404
      });
    });
  });

  // Replace user tests
  describe('PUT /users/:id', () => {
    test('should replace user completely', async () => {
      const replacementUser: GoogleUserInput = {
        ...testUser,
        name: 'Completely New Name',
        profileImage: 'https://example.com/another-profile.jpg'
      };

      const response = await api.put<UserResponse>(`/users/${createdUserId}`, replacementUser);
      
      expect(response.status).toBe(200);
      expect(response.data).toMatchObject({
        id: createdUserId,
        name: replacementUser.name,
        profileImage: replacementUser.profileImage
      });
    });

    test('should return 404 for non-existent user', async () => {
      await expect(api.put('/users/99999', testUser)).rejects.toMatchObject({
        status: 404
      });
    });
  });

  // Delete user tests
  describe('DELETE /users/:id', () => {
    test('should delete user', async () => {
      const response = await api.delete(`/users/${createdUserId}`);
      expect(response.status).toBe(204);
    });

    test('should return 404 for already deleted user', async () => {
      await expect(api.delete(`/users/${createdUserId}`)).rejects.toMatchObject({
        status: 404
      });
    });
  });
});
