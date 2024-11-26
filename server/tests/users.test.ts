import axios, { AxiosError } from 'axios';
import { UserResponse } from '../src/types/user.types';

const API_URL = 'http://localhost:3000/api/v1';

describe('Users API', () => {
  let testUserId: number;
  
  // Create a test user before running tests
  beforeAll(async () => {
    const timestamp = Date.now();
    const userData = {
      email: `test${timestamp}@example.com`,
      name: 'Test User',
      googleId: `test${timestamp}`,
      profileImage: 'https://example.com/image.jpg'
    };

    const response = await axios.post(`${API_URL}/users`, userData);
    testUserId = response.data.data.id;
  });

  // Clean up after all tests
  afterAll(async () => {
    if (testUserId) {
      await axios.delete(`${API_URL}/users/${testUserId}`);
    }
  });

  describe('POST /users', () => {
    test('success: creates new user with valid data', async () => {
      const timestamp = Date.now();
      const userData = {
        email: `test${timestamp}@example.com`,
        name: 'Test User',
        googleId: `test${timestamp}`,
        profileImage: 'https://example.com/image.jpg'
      };

      try {
        const response = await axios.post(`${API_URL}/users`, userData);
        expect(response.status).toBe(201);
        expect(response.data).toHaveProperty('data.id');
        expect(response.data.data.email).toBe(userData.email);

        // Clean up - delete the created user
        if (response.data.data.id) {
          await axios.delete(`${API_URL}/users/${response.data.data.id}`);
        }
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          console.log('Error Response:', error.response.data);
        }
        throw error;
      }
    });

    test('error: rejects duplicate email', async () => {
      const timestamp = Date.now();
      const userData = {
        email: `duplicate${timestamp}@example.com`,
        name: 'Test User',
        googleId: `test${timestamp}`,
        profileImage: 'https://example.com/image.jpg'
      };

      await axios.post(`${API_URL}/users`, userData);

      try {
        await axios.post(`${API_URL}/users`, {
          ...userData,
          googleId: 'different-id'
        });
        fail('Expected 400 error');
      } catch (error) {
        if (error instanceof AxiosError) {
          expect(error.response?.status).toBe(400);
          expect(error.response?.data.error.code).toBe('USER_CREATE_ERROR');
          expect(error.response?.data.error.message).toContain('email already exists');
        }
      }
    });

    test('error: rejects malformed email', async () => {
      const userData = {
        email: 'not-an-email',
        name: 'Test User',
        googleId: 'test123',
        profileImage: 'https://example.com/image.jpg'
      };

      try {
        await axios.post(`${API_URL}/users`, userData);
        fail('Expected validation error');
      } catch (error) {
        if (error instanceof AxiosError) {
          expect(error.response?.status).toBe(400);
          expect(error.response?.data.error).toEqual({
            code: 'USER_CREATE_ERROR',
            message: 'Invalid email',
            details: [{
              code: 'invalid_string',
              message: 'Invalid email',
              path: ['email'],
              validation: 'email'
            }]
          });
        }
      }
    });

    test('error: rejects missing required fields', async () => {
      const incompleteData = {
        email: 'test@example.com'
        // missing name and googleId
      };

      try {
        await axios.post(`${API_URL}/users`, incompleteData);
        fail('Expected validation error');
      } catch (error) {
        if (error instanceof AxiosError) {
          expect(error.response?.status).toBe(400);
          expect(error.response?.data.error).toEqual({
            code: 'USER_CREATE_ERROR',
            message: 'Required',
            details: [
              {
                code: 'invalid_type',
                expected: 'string',
                message: 'Required',
                path: ['name'],
                received: 'undefined'
              },
              {
                code: 'invalid_type',
                expected: 'string',
                message: 'Required',
                path: ['googleId'],
                received: 'undefined'
              }
            ]
          });
        }
      }
    });
  });

  describe('GET /users', () => {
    test('success: returns list of users', async () => {
      const response = await axios.get(`${API_URL}/users`);
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data.data)).toBe(true);
    });

    test('success: supports pagination', async () => {
      // Create a few test users
      const timestamp = Date.now();
      const testUsers: number[] = [];
      for (let i = 0; i < 3; i++) {
        const userData = {
          email: `test${timestamp}_${i}@example.com`,
          name: `Test User ${i}`,
          googleId: `test${timestamp}_${i}`,
          profileImage: 'https://example.com/image.jpg'
        };
        const response = await axios.post(`${API_URL}/users`, userData);
        testUsers.push(response.data.data.id);
      }

      try {
        const response = await axios.get(`${API_URL}/users?page=1&limit=2`);
        
        expect(response.status).toBe(200);
        expect(response.data.data.length).toBeLessThanOrEqual(2);
        expect(response.data.meta.pagination).toEqual(
          expect.objectContaining({
            page: 1,
            limit: 2,
            hasNext: expect.any(Boolean)
          })
        );
      } finally {
        // Clean up test users
        for (const userId of testUsers) {
          await axios.delete(`${API_URL}/users/${userId}`);
        }
      }
    });

    test('success: supports sorting by name', async () => {
      // Test ascending sort
      const ascResponse = await axios.get(`${API_URL}/users?sort=name:asc`);
      expect(ascResponse.status).toBe(200);
      
      // Verify ascending order
      const ascNames = ascResponse.data.data.map((user: UserResponse) => user.name);
      const sortedAscNames = [...ascNames].sort();
      expect(ascNames).toEqual(sortedAscNames);

      // Test descending sort
      const descResponse = await axios.get(`${API_URL}/users?sort=name:desc`);
      expect(descResponse.status).toBe(200);
      
      // Verify descending order
      const descNames = descResponse.data.data.map((user: UserResponse) => user.name);
      const sortedDescNames = [...descNames].sort().reverse();
      expect(descNames).toEqual(sortedDescNames);
    });

    test('success: supports sorting by email', async () => {
      // Test ascending sort
      const ascResponse = await axios.get(`${API_URL}/users?sort=email:asc`);
      expect(ascResponse.status).toBe(200);
      
      // Verify ascending order
      const ascEmails = ascResponse.data.data.map((user: UserResponse) => user.email);
      const sortedAscEmails = [...ascEmails].sort();
      expect(ascEmails).toEqual(sortedAscEmails);

      // Test descending sort
      const descResponse = await axios.get(`${API_URL}/users?sort=email:desc`);
      expect(descResponse.status).toBe(200);
      
      // Verify descending order
      const descEmails = descResponse.data.data.map((user: UserResponse) => user.email);
      const sortedDescEmails = [...descEmails].sort().reverse();
      expect(descEmails).toEqual(sortedDescEmails);
    });

    test('success: supports filtering by email', async () => {
      // Create two test users with different emails
      const timestamp = Date.now();
      const testUsers = [
        {
          email: `test1.${timestamp}@example.com`,
          name: 'Test User 1',
          googleId: `test1${timestamp}`,
          profileImage: 'https://example.com/image1.jpg'
        },
        {
          email: `test2.${timestamp}@example.com`,
          name: 'Test User 2',
          googleId: `test2${timestamp}`,
          profileImage: 'https://example.com/image2.jpg'
        }
      ];

      const createdUserIds = [];
      for (const userData of testUsers) {
        const response = await axios.post(`${API_URL}/users`, userData);
        createdUserIds.push(response.data.data.id);
      }

      try {
        // Get all users first to verify filter reduces results
        const allUsersResponse = await axios.get(`${API_URL}/users`);
        
        // Filter by exact email of first test user
        const response = await axios.get(`${API_URL}/users?filter[email]=${encodeURIComponent(testUsers[0].email)}`);
        
        expect(response.status).toBe(200);
        expect(response.data.status).toBe('success');
        expect(Array.isArray(response.data.data)).toBe(true);
        
        // Should return fewer results than total users
        expect(response.data.data.length).toBeLessThan(allUsersResponse.data.data.length);
        // Should return exactly one user
        expect(response.data.data.length).toBe(1);
        // Should be the user with the exact email
        expect(response.data.data[0].email).toBe(testUsers[0].email);
      } finally {
        // Clean up test users
        for (const id of createdUserIds) {
          await axios.delete(`${API_URL}/users/${id}`);
        }
      }
    });

    test('success: supports filtering by name', async () => {
      // Create two test users with different names
      const timestamp = Date.now();
      const testUsers = [
        {
          email: `test1.${timestamp}@example.com`,
          name: 'Unique Test Name One',
          googleId: `test1${timestamp}`,
          profileImage: 'https://example.com/image1.jpg'
        },
        {
          email: `test2.${timestamp}@example.com`,
          name: 'Unique Test Name Two',
          googleId: `test2${timestamp}`,
          profileImage: 'https://example.com/image2.jpg'
        }
      ];

      const createdUserIds = [];
      for (const userData of testUsers) {
        const response = await axios.post(`${API_URL}/users`, userData);
        createdUserIds.push(response.data.data.id);
      }

      try {
        // Get all users first to verify filter reduces results
        const allUsersResponse = await axios.get(`${API_URL}/users`);
        
        // Filter by exact name of first test user
        const response = await axios.get(`${API_URL}/users?filter[name]=${encodeURIComponent(testUsers[0].name)}`);
        
        expect(response.status).toBe(200);
        expect(response.data.status).toBe('success');
        expect(Array.isArray(response.data.data)).toBe(true);
        
        // Should return fewer results than total users
        expect(response.data.data.length).toBeLessThan(allUsersResponse.data.data.length);
        // Should return exactly one user
        expect(response.data.data.length).toBe(1);
        // Should be the user with the exact name
        expect(response.data.data[0].name).toBe(testUsers[0].name);
      } finally {
        // Clean up test users
        for (const id of createdUserIds) {
          await axios.delete(`${API_URL}/users/${id}`);
        }
      }
    });

    test('error: rejects invalid sort parameters', async () => {
      // Test invalid sort field
      try {
        await axios.get(`${API_URL}/users?sort=nonexistentfield:asc`);
        fail('Expected error for invalid sort field');
      } catch (error) {
        if (error instanceof AxiosError) {
          expect(error.response?.status).toBe(400);
          expect(error.response?.data.error.code).toBe('USER_LIST_ERROR');
          expect(error.response?.data.error.message).toContain('Unknown argument');
        }
      }

      // Test invalid sort direction
      try {
        await axios.get(`${API_URL}/users?sort=name:invalid`);
        fail('Expected error for invalid sort direction');
      } catch (error) {
        if (error instanceof AxiosError) {
          expect(error.response?.status).toBe(400);
          expect(error.response?.data.error.code).toBe('USER_CREATE_ERROR');
          expect(error.response?.data.error.message).toBe('Invalid query parameters');
          expect(error.response?.data.error.details[0].message).toBe('Sort must be in format: field:direction');
        }
      }

      // Test malformed sort parameter
      try {
        await axios.get(`${API_URL}/users?sort=invalid`);
        fail('Expected error for malformed sort parameter');
      } catch (error) {
        if (error instanceof AxiosError) {
          expect(error.response?.status).toBe(400);
          expect(error.response?.data.error.code).toBe('USER_CREATE_ERROR');
          expect(error.response?.data.error.message).toBe('Invalid query parameters');
          expect(error.response?.data.error.details[0].message).toBe('Sort must be in format: field:direction');
        }
      }
    });
  });

  describe('GET /users/:id', () => {
    test('success: returns user by ID', async () => {
      const response = await axios.get(`${API_URL}/users/${testUserId}`);
      
      expect(response.status).toBe(200);
      expect(response.data.data.id).toBe(testUserId);
    });

    test('error: returns 404 for non-existent user', async () => {
      const nonExistentId = 99999;

      try {
        await axios.get(`${API_URL}/users/${nonExistentId}`);
        fail('Expected 404 error');
      } catch (error) {
        if (error instanceof AxiosError) {
          expect(error.response?.status).toBe(404);
          expect(error.response?.data.error.code).toBe('USER_NOT_FOUND');
        }
      }
    });
  });

  describe('PATCH /users/:id', () => {
    test('success: updates user partially', async () => {
      const updateData = {
        name: 'Updated Test User'
      };

      const response = await axios.patch(`${API_URL}/users/${testUserId}`, updateData);
      
      expect(response.status).toBe(200);
      expect(response.data.data.name).toBe(updateData.name);
    });
  });

  describe('PUT /users/:id', () => {
    test('success: replaces entire user', async () => {
      const timestamp = Date.now();
      const userData = {
        email: `test${timestamp}@example.com`,
        name: 'Replaced Test User',
        googleId: `test${timestamp}`,
        profileImage: 'https://example.com/new-image.jpg'
      };

      const response = await axios.put(`${API_URL}/users/${testUserId}`, userData);
      
      expect(response.status).toBe(200);
      expect(response.data.data.name).toBe(userData.name);
      expect(response.data.data.email).toBe(userData.email);
    });
  });

  describe('DELETE /users/:id', () => {
    test('success: deletes user', async () => {
      // Create a user to delete
      const timestamp = Date.now();
      const createResponse = await axios.post(`${API_URL}/users`, {
        email: `test${timestamp}@example.com`,
        name: 'User To Delete',
        googleId: `test${timestamp}`,
        profileImage: 'https://example.com/image.jpg'
      });
      
      const userIdToDelete = createResponse.data.data.id;

      // Delete the user
      const deleteResponse = await axios.delete(`${API_URL}/users/${userIdToDelete}`);
      expect(deleteResponse.status).toBe(200);
      expect(deleteResponse.data.data).toBe(true);

      // Verify user is deleted
      try {
        await axios.get(`${API_URL}/users/${userIdToDelete}`);
        fail('Expected 404 error');
      } catch (error) {
        if (error instanceof AxiosError) {
          expect(error.response?.status).toBe(404);
        }
      }
    });
  });
});
