import { ApiClient } from '../utils/apiClient';
import { config } from '../config';
import { 
    CreateUserTest, 
    UserTest, 
    UserFiltersTest,
    ApiResponse,
    UserResponse,
    UserListResponse
} from '../types/users.tests.types';
import { TestResponse } from '../types/test';
import { generateTestEmail, generateUniqueId, trackTestData } from '../utils/testData';

// Create API client instance
const api = new ApiClient();

describe('User Management API', () => {
    describe('User Creation', () => {
        it('should create a new user with valid data', async () => {
            const userData: CreateUserTest = {
                email: generateTestEmail(),
                name: 'Test User',
                googleId: generateUniqueId(),
                profileImage: 'https://example.com/profile.jpg'
            };

            const response = await api.post<UserResponse>(
                config.api.endpoints.users,
                userData
            );

            // Track created user for cleanup
            trackTestData('users', response.data.data);

            expect(response.status).toBe(201);
            expect(response.data.status).toBe('success');
            expect(response.data.data).toMatchObject({
                id: expect.any(Number),
                email: userData.email,
                name: userData.name,
                profileImage: userData.profileImage,
                createdAt: expect.any(String)
            });
        });

        it('should validate required fields', async () => {
            const invalidData = {
                name: 'Test User'
                // Missing required email and googleId
            };

            await expect(api.post(config.api.endpoints.users, invalidData))
                .rejects.toMatchObject({
                    status: 400,
                    data: {
                        status: 'error',
                        error: {
                            code: 'VALIDATION_ERROR',
                            message: expect.stringMatching(/required/i)
                        }
                    }
                });
        });

        it('should prevent duplicate email registration', async () => {
            const email = generateTestEmail();
            
            // Create first user
            const userData1: CreateUserTest = {
                email,
                name: 'Test User 1',
                googleId: generateUniqueId(),
                profileImage: 'https://example.com/profile1.jpg'
            };

            const response1 = await api.post<UserResponse>(
                config.api.endpoints.users,
                userData1
            );
            trackTestData('users', response1.data.data);

            // Attempt to create second user with same email
            const userData2: CreateUserTest = {
                email, // Same email as userData1
                name: 'Test User 2',
                googleId: generateUniqueId(),
                profileImage: 'https://example.com/profile2.jpg'
            };

            await expect(api.post(config.api.endpoints.users, userData2))
                .rejects.toMatchObject({
                    status: 400,
                    data: {
                        status: 'error',
                        error: {
                            code: 'VALIDATION_ERROR',
                            message: expect.stringMatching(/email.*exists/i)
                        }
                    }
                });
        });

        it('should prevent duplicate googleId registration', async () => {
            const googleId = generateUniqueId();
            
            // Create first user
            const userData1: CreateUserTest = {
                email: generateTestEmail(),
                name: 'Test User 1',
                googleId,
                profileImage: 'https://example.com/profile1.jpg'
            };

            const response1 = await api.post<UserResponse>(
                config.api.endpoints.users,
                userData1
            );
            trackTestData('users', response1.data.data);

            // Attempt to create second user with same googleId
            const userData2: CreateUserTest = {
                email: generateTestEmail(),
                name: 'Test User 2',
                googleId, // Same googleId as userData1
                profileImage: 'https://example.com/profile2.jpg'
            };

            await expect(api.post(config.api.endpoints.users, userData2))
                .rejects.toMatchObject({
                    status: 400,
                    data: {
                        status: 'error',
                        error: {
                            code: 'VALIDATION_ERROR',
                            message: expect.stringMatching(/googleId.*exists/i)
                        }
                    }
                });
        });
    });

    describe('User Retrieval', () => {
        let testUser: UserTest;

        beforeAll(async () => {
            const userData: CreateUserTest = {
                email: generateTestEmail(),
                name: 'Test User',
                googleId: generateUniqueId(),
                profileImage: 'https://example.com/profile.jpg'
            };

            const response = await api.post<UserResponse>(
                config.api.endpoints.users,
                userData
            );
            testUser = response.data.data;
            trackTestData('users', response.data.data);
        });

        it('should retrieve a user by ID', async () => {
            const response = await api.get<UserResponse>(
                `${config.api.endpoints.users}/${testUser.id}`
            );

            expect(response.status).toBe(200);
            expect(response.data.status).toBe('success');
            expect(response.data.data).toMatchObject({
                id: testUser.id,
                email: testUser.email,
                name: testUser.name,
                profileImage: testUser.profileImage,
                createdAt: expect.any(String)
            });
        });

        it('should handle non-existent user ID', async () => {
            await expect(api.get(`${config.api.endpoints.users}/999999`))
                .rejects.toMatchObject({
                    status: 404,
                    data: {
                        status: 'error',
                        error: {
                            code: 'NOT_FOUND',
                            message: expect.stringMatching(/user.*not found/i)
                        }
                    }
                });
        });

        it('should filter users by email', async () => {
            const filters: UserFiltersTest = {
                email: testUser.email
            };

            const response = await api.get<UserListResponse>(
                `${config.api.endpoints.users}?${new URLSearchParams(filters as Record<string, string>)}`
            );

            expect(response.status).toBe(200);
            expect(response.data.status).toBe('success');
            expect(response.data.data).toHaveLength(1);
            expect(response.data.data[0]).toMatchObject({
                id: testUser.id,
                email: testUser.email,
                name: testUser.name,
                profileImage: testUser.profileImage
            });
        });

        it('should return empty array for non-matching filters', async () => {
            const filters: UserFiltersTest = {
                email: 'nonexistent@example.com'
            };

            const response = await api.get<UserListResponse>(
                `${config.api.endpoints.users}?${new URLSearchParams(filters as Record<string, string>)}`
            );

            expect(response.status).toBe(200);
            expect(response.data.status).toBe('success');
            expect(response.data.data).toHaveLength(0);
            expect(response.data.meta?.pagination?.total).toBe(0);
        });
    });

    describe('User Listing', () => {
        beforeAll(async () => {
            // Create test users for pagination tests
            for (let i = 0; i < 5; i++) {
                const userData: CreateUserTest = {
                    email: generateTestEmail(),
                    name: `Test User ${i + 1}`,
                    googleId: generateUniqueId(),
                    profileImage: `https://example.com/profile${i + 1}.jpg`
                };
                const response = await api.post<UserResponse>(
                    config.api.endpoints.users,
                    userData
                );
                trackTestData('users', response.data.data);
            }
        });

        it('should return paginated users with metadata', async () => {
            const page = 1;
            const limit = 2;
            const response = await api.get<UserListResponse>(
                `${config.api.endpoints.users}?page=${page}&limit=${limit}`
            );

            expect(response.status).toBe(200);
            expect(response.data.status).toBe('success');
            expect(response.data.data).toHaveLength(limit);

            // Validate pagination metadata
            expect(response.data.meta.pagination).toMatchObject({
                page,
                limit,
                total: expect.any(Number),
                totalPages: expect.any(Number),
                hasNext: expect.any(Boolean),
                hasPrevious: expect.any(Boolean)
            });

            // Validate each user in the response
            response.data.data.forEach(user => {
                expect(user).toMatchObject({
                    id: expect.any(Number),
                    email: expect.any(String),
                    name: expect.any(String),
                    profileImage: expect.any(String),
                    createdAt: expect.any(String)
                });
            });
        });

        it('should handle out of range page number', async () => {
            const response = await api.get<UserListResponse>(
                `${config.api.endpoints.users}?page=999`
            );

            expect(response.status).toBe(200);
            expect(response.data.status).toBe('success');
            expect(response.data.data).toHaveLength(0);
            expect(response.data.meta.pagination.hasNext).toBe(false);
        });

        it('should respect custom page size limits', async () => {
            const response = await api.get<UserListResponse>(
                `${config.api.endpoints.users}?limit=3`
            );

            expect(response.status).toBe(200);
            expect(response.data.status).toBe('success');
            expect(response.data.data).toHaveLength(3);
            expect(response.data.meta.pagination.limit).toBe(3);
        });
    });
});
