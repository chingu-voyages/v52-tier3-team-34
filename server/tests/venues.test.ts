import axios, { AxiosError } from 'axios';
import { VenueResponse, VenueInput } from '../src/types/venue.types';
import prisma from '../src/config/database';

const API_URL = 'http://localhost:3000/api/v1';

// Disconnect Prisma after all tests are done
afterAll(async () => {
  await prisma.$disconnect();
}, 10000);  // 10 second timeout

describe('Venues API', () => {
  // Test data tracking
  let testVenueId: number;
  let testUserId: number;
  let otherUserId: number;
  let listTestVenueIds: number[] = []; // Specifically for GET /venues tests
  let tempVenueIds: number[] = []; // For temporary venues in individual tests

  // Create base test data
  beforeAll(async () => {
    // 1. Create test users first
    const timestamp = Date.now();
    const [mainUser, otherUser] = await Promise.all([
      axios.post(`${API_URL}/users`, {
        email: `test${timestamp}@example.com`,
        name: 'Test User',
        googleId: `test${timestamp}`,
        profileImage: 'https://example.com/image.jpg'
      }),
      axios.post(`${API_URL}/users`, {
        email: `other${timestamp}@test.com`,
        name: 'Other User',
        googleId: `other${timestamp}`,
        profileImage: 'https://example.com/other-profile.jpg'
      })
    ]);
    
    testUserId = mainUser.data.data.id;
    otherUserId = otherUser.data.data.id;

    // 2. Create main test venue
    const venueData: VenueInput = {
      name: 'Main Test Venue',
      description: 'A test venue for automated testing',
      address: '123 Test Street, Test City, TS 12345',
      contact: {
        phone: '+1234567890',
        email: 'venue@test.com',
        website: 'https://testvenue.com'
      },
      images: ['https://example.com/venue-image.jpg'],
      coordinates: {
        lat: 40.7128,
        lng: -74.0060
      },
      userId: testUserId
    };

    const venueResponse = await axios.post(`${API_URL}/venues`, venueData);
    testVenueId = venueResponse.data.data.id;

    // 3. Create venues for list testing
    const listVenues = [
      {
        name: 'Alpha Venue',
        description: 'First in alphabetical order',
        address: '123 Alpha St',
        contact: {},
        images: ['https://example.com/image.jpg'],
        coordinates: { lat: 40.7128, lng: -74.0060 },
        userId: testUserId
      },
      {
        name: 'Beta Venue',
        description: 'Second in alphabetical order',
        address: '456 Beta St',
        contact: {},
        images: ['https://example.com/image.jpg'],
        coordinates: { lat: 40.7128, lng: -74.0060 },
        userId: otherUserId
      },
      {
        name: 'Gamma Venue',
        description: 'Third in alphabetical order',
        address: '789 Gamma St',
        contact: {},
        images: ['https://example.com/image.jpg'],
        coordinates: { lat: 40.7128, lng: -74.0060 },
        userId: otherUserId
      }
    ];

    const responses = await Promise.all(
      listVenues.map(venue => axios.post(`${API_URL}/venues`, venue))
    );
    listTestVenueIds = responses.map(response => response.data.data.id);
  });

  // Clean up all test data
  afterAll(async () => {
    // 1. Delete all temporary venues from individual tests
    if (tempVenueIds.length > 0) {
      await Promise.all(
        tempVenueIds.map(id => 
          axios.delete(`${API_URL}/venues/${id}`)
            .catch(err => {
              if (err?.response?.status !== 404) {
                throw err; // Only ignore 404s, other errors should fail the test
              }
            })
        )
      );
    }

    // 2. Delete list test venues
    if (listTestVenueIds.length > 0) {
      await Promise.all(
        listTestVenueIds.map(id => 
          axios.delete(`${API_URL}/venues/${id}`)
            .catch(err => {
              if (err?.response?.status !== 404) {
                throw err;
              }
            })
        )
      );
    }

    // 3. Delete main test venue
    if (testVenueId) {
      await axios.delete(`${API_URL}/venues/${testVenueId}`)
        .catch(err => {
          if (err?.response?.status !== 404) {
            throw err;
          }
        });
    }

    // 4. Delete test users last (after all venues are deleted)
    if (otherUserId) {
      await axios.delete(`${API_URL}/users/${otherUserId}`)
        .catch(err => {
          if (err?.response?.status !== 404) {
            throw err;
          }
        });
    }
    if (testUserId) {
      await axios.delete(`${API_URL}/users/${testUserId}`)
        .catch(err => {
          if (err?.response?.status !== 404) {
            throw err;
          }
        });
    }
  });

  describe('POST /venues', () => {
    test('success: creates new venue with valid data', async () => {
      const timestamp = Date.now();
      const venueData: VenueInput = {
        name: `Test Venue ${timestamp}`,
        description: 'A test venue for automated testing',
        address: '123 Test Street, Test City, TS 12345',
        contact: {
          phone: '+1234567890',
          email: 'venue@test.com',
          website: 'https://testvenue.com'
        },
        images: ['https://example.com/venue-image.jpg'],
        coordinates: {
          lat: 40.7128,
          lng: -74.0060
        },
        userId: testUserId
      };

      const response = await axios.post(`${API_URL}/venues`, venueData);
      
      expect(response.status).toBe(201);
      expect(response.data.data).toHaveProperty('id');
      expect(response.data.data.name).toBe(venueData.name);
      expect(response.data.data.coordinates).toEqual(venueData.coordinates);

      // Track this venue for cleanup
      tempVenueIds.push(response.data.data.id);
    });

    test('error: rejects missing required fields', async () => {
      const incompleteData = {
        // Missing name and description
        address: '123 Test Street',
        contact: {},
        images: ['https://example.com/image.jpg'],
        coordinates: {
          lat: 40.7128,
          lng: -74.0060
        },
        userId: testUserId
      };

      try {
        await axios.post(`${API_URL}/venues`, incompleteData);
        fail('Should have thrown an error');
      } catch (error) {
        const axiosError = error as AxiosError;
        expect(axiosError.response?.status).toBe(400);
        expect(axiosError.response?.data).toHaveProperty('error');
      }
    });

    test('error: rejects invalid coordinates', async () => {
      const invalidData: VenueInput = {
        name: 'Test Venue',
        description: 'A test venue',
        address: '123 Test Street',
        contact: {},
        images: ['https://example.com/image.jpg'],
        coordinates: {
          lat: 91, // Invalid latitude (> 90)
          lng: -74.0060
        },
        userId: testUserId
      };

      try {
        await axios.post(`${API_URL}/venues`, invalidData);
        fail('Should have thrown an error');
      } catch (error) {
        const axiosError = error as AxiosError;
        expect(axiosError.response?.status).toBe(400);
        expect(axiosError.response?.data).toHaveProperty('error');
      }
    });

    test('error: rejects invalid user ID', async () => {
      const invalidData: VenueInput = {
        name: 'Test Venue',
        description: 'A test venue',
        address: '123 Test Street',
        contact: {},
        images: ['https://example.com/image.jpg'],
        coordinates: {
          lat: 40.7128,
          lng: -74.0060
        },
        userId: 99999 // Non-existent user ID
      };

      try {
        await axios.post(`${API_URL}/venues`, invalidData);
        fail('Should have thrown an error');
      } catch (error) {
        const axiosError = error as AxiosError;
        expect(axiosError.response?.status).toBe(400);
        expect(axiosError.response?.data).toHaveProperty('error');
      }
    });
  });

  describe('GET /venues/:id', () => {
    test('success: returns venue by ID', async () => {
      const response = await axios.get(`${API_URL}/venues/${testVenueId}`);
      
      expect(response.status).toBe(200);
      expect(response.data.data.id).toBe(testVenueId);
      expect(response.data.data.name).toBe('Main Test Venue');
      expect(response.data.data.coordinates).toBeDefined();
      expect(response.data.data.coordinates.lat).toBeDefined();
      expect(response.data.data.coordinates.lng).toBeDefined();
      expect(response.data.data.userId).toBe(testUserId);
    });

    test('error: returns 404 for non-existent venue', async () => {
      const nonExistentId = 99999;

      try {
        await axios.get(`${API_URL}/venues/${nonExistentId}`);
        fail('Expected 404 error');
      } catch (error) {
        if (error instanceof AxiosError) {
          expect(error.response?.status).toBe(404);
          expect(error.response?.data.error.code).toBe('VENUE_NOT_FOUND');
        }
      }
    });

    test('success: includes user details when requested', async () => {
      const response = await axios.get(`${API_URL}/venues/${testVenueId}?include=user`);
      
      expect(response.status).toBe(200);
      expect(response.data.data.user).toBeDefined();
      expect(response.data.data.user.id).toBe(testUserId);
      expect(response.data.data.user.name).toBeDefined();
      expect(response.data.data.user.email).toBeDefined();
    });

    test('error: rejects invalid include parameter', async () => {
      try {
        await axios.get(`${API_URL}/venues/${testVenueId}?include=invalid`);
        fail('Expected error for invalid include parameter');
      } catch (error) {
        if (error instanceof AxiosError) {
          expect(error.response?.status).toBe(400);
          expect(error.response?.data.error.code).toBe('INVALID_QUERY_PARAMETER');
        }
      }
    });
  });

  describe('GET /venues', () => {
    test('success: returns list of venues', async () => {
      const response = await axios.get(`${API_URL}/venues`);
      
      expect(response.status).toBe(200);
      expect(response.data.status).toBe('success');
      expect(Array.isArray(response.data.data)).toBe(true);
      expect(response.data.data.length).toBeGreaterThanOrEqual(3);
      expect(response.data.meta.pagination).toBeDefined();
      expect(response.data.meta.pagination.total).toBeGreaterThanOrEqual(3);
    });

    test('success: supports pagination', async () => {
      const pageSize = 2;
      const response = await axios.get(`${API_URL}/venues?page=1&limit=${pageSize}`);
      
      expect(response.status).toBe(200);
      expect(response.data.status).toBe('success');
      expect(Array.isArray(response.data.data)).toBe(true);
      expect(response.data.data.length).toBeLessThanOrEqual(pageSize);
      expect(response.data.meta.pagination).toBeDefined();
      expect(response.data.meta.pagination.page).toBe(1);
      expect(response.data.meta.pagination.limit).toBe(pageSize);
      expect(response.data.meta.pagination.total).toBeGreaterThanOrEqual(3);
    });

    test('success: supports sorting by name', async () => {
      const response = await axios.get(`${API_URL}/venues?sort=name:asc`);
      
      expect(response.status).toBe(200);
      expect(response.data.status).toBe('success');
      const venues = response.data.data;
      
      // Verify venues are sorted alphabetically
      for (let i = 1; i < venues.length; i++) {
        expect(venues[i-1].name <= venues[i].name).toBe(true);
      }
    });

    test('error: rejects invalid sort parameters', async () => {
      try {
        await axios.get(`${API_URL}/venues?sort=invalid:direction`);
        fail('Expected error for invalid sort field');
      } catch (error) {
        if (error instanceof AxiosError) {
          expect(error.response?.status).toBe(400);
          expect(error.response?.data.error.message).toBe('Invalid query parameters');
        }
      }
    });

    test('success: supports filtering by userId', async () => {
      // First, get all venues to count total
      const allVenuesResponse = await axios.get(`${API_URL}/venues`);
      
      // Then get venues filtered by our test user
      const response = await axios.get(`${API_URL}/venues?filter[userId]=${testUserId}`);
      
      expect(response.status).toBe(200);
      expect(response.data.status).toBe('success');
      expect(Array.isArray(response.data.data)).toBe(true);
      
      // The filtered response should return fewer venues than the total
      expect(response.data.data.length).toBeLessThan(allVenuesResponse.data.data.length);
      // And should have at least one venue (the ones created with testUserId)
      expect(response.data.data.length).toBeGreaterThan(0);
      
      // All returned venues should belong to testUserId
      response.data.data.forEach((venue: any) => {
        expect(venue.userId).toBe(testUserId);
      });
    });
  });

  describe('GET /venues with geospatial features', () => {
    describe('GET /venues/:id/geojson', () => {
      test('success: returns venue location in GeoJSON format', async () => {
        // Create a venue with known coordinates
        const venueData: VenueInput = {
          name: 'GeoJSON Test Venue',
          description: 'A venue for testing GeoJSON',
          address: 'Central Park, New York',
          contact: {
            phone: '+1234567890',
            email: 'geo@test.com',
            website: 'https://geo.test'
          },
          images: ['https://example.com/geo.jpg'],
          coordinates: {
            lat: 40.7829,
            lng: -73.9654
          },
          userId: testUserId
        };

        const createResponse = await axios.post(`${API_URL}/venues`, venueData);
        const venueId = createResponse.data.data.id;
        tempVenueIds.push(venueId);

        // Get GeoJSON representation
        const response = await axios.get(`${API_URL}/venues/${venueId}/geojson`);
        
        expect(response.status).toBe(200);
        expect(response.data.status).toBe('success');
        
        const geoJson = response.data.data;
        expect(geoJson.type).toBe('Feature');
        expect(geoJson.geometry.type).toBe('Point');
        expect(geoJson.geometry.coordinates).toEqual([
          venueData.coordinates.lng,
          venueData.coordinates.lat
        ]);
        expect(geoJson.properties).toMatchObject({
          name: venueData.name,
          description: venueData.description,
          address: venueData.address
        });
      });

      test('error: returns 404 for non-existent venue', async () => {
        try {
          await axios.get(`${API_URL}/venues/99999/geojson`);
          fail('Expected error for non-existent venue');
        } catch (error) {
          if (error instanceof AxiosError) {
            expect(error.response?.status).toBe(404);
            expect(error.response?.data.error.message).toContain('Venue not found');
          }
        }
      });
    });
  });

  describe('PUT /venues/:id', () => {
    test('success: replaces entire venue', async () => {
      // Create a venue to update
      const timestamp = Date.now();
      const venueData: VenueInput = {
        name: 'Original Venue',
        description: 'Original description',
        address: '123 Original St',
        contact: {
          phone: '+1234567890',
          email: 'original@test.com',
          website: 'https://original.com'
        },
        images: ['https://example.com/original.jpg'],
        coordinates: {
          lat: 40.7128,
          lng: -74.0060
        },
        userId: testUserId
      };

      const createResponse = await axios.post(`${API_URL}/venues`, venueData);
      const venueId = createResponse.data.data.id;
      tempVenueIds.push(venueId);

      try {
        // New data for complete replacement
        const newData: VenueInput = {
          name: 'Updated Venue',
          description: 'Completely new description',
          address: '456 New Street',
          contact: {
            phone: '+9876543210',
            email: 'new@test.com',
            website: 'https://new-venue.com'
          },
          images: ['https://example.com/new1.jpg', 'https://example.com/new2.jpg'],
          coordinates: {
            lat: 34.0522,
            lng: -118.2437
          },
          userId: testUserId
        };

        const response = await axios.put(`${API_URL}/venues/${venueId}`, newData);
        
        expect(response.status).toBe(200);
        expect(response.data.status).toBe('success');
        expect(response.data.data).toMatchObject({
          id: venueId,
          ...newData,
          contact: expect.objectContaining(newData.contact),
          coordinates: expect.objectContaining(newData.coordinates)
        });

      } finally {
        // No need to clean up here, it's handled in afterAll
      }
    });

    test('error: rejects invalid venue ID', async () => {
      const newData: VenueInput = {
        name: 'Test Venue',
        description: 'Test description',
        address: '123 Test St',
        contact: {
          phone: '+1234567890',
          email: 'test@test.com',
          website: 'https://test.com'
        },
        images: ['https://example.com/test.jpg'],
        coordinates: {
          lat: 40.7128,
          lng: -74.0060
        },
        userId: testUserId
      };

      try {
        await axios.put(`${API_URL}/venues/invalid-id`, newData);
        fail('Expected error for invalid venue ID');
      } catch (error) {
        if (error instanceof AxiosError) {
          expect(error.response?.status).toBe(400);
          expect(error.response?.data.error.message).toBe('Invalid parameters');
          expect(error.response?.data.error.details).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                message: 'ID must be a positive integer'
              })
            ])
          );
        }
      }
    });
  });

  describe('PATCH /venues/:id', () => {
    test('success: updates venue partially', async () => {
      // Create a venue to update
      const timestamp = Date.now();
      const venueData: VenueInput = {
        name: 'Original Venue for Patch',
        description: 'Original description',
        address: '123 Original St',
        contact: {
          phone: '+1234567890',
          email: 'original@test.com',
          website: 'https://original.com'
        },
        images: ['https://example.com/original.jpg'],
        coordinates: {
          lat: 40.7128,
          lng: -74.0060
        },
        userId: testUserId
      };

      const createResponse = await axios.post(`${API_URL}/venues`, venueData);
      const venueId = createResponse.data.data.id;
      tempVenueIds.push(venueId);

      try {
        // Update only specific fields
        const updateData = {
          name: 'Updated Name',
          description: 'Updated description',
          contact: {
            phone: venueData.contact.phone, // Keep existing
            website: venueData.contact.website, // Keep existing
            email: 'updated@test.com' // Only update email
          }
        } as const;

        const response = await axios.patch(`${API_URL}/venues/${venueId}`, updateData);
        
        expect(response.status).toBe(200);
        expect(response.data.status).toBe('success');
        
        // Check updated fields
        expect(response.data.data.name).toBe(updateData.name);
        expect(response.data.data.description).toBe(updateData.description);
        expect(response.data.data.contact.email).toBe(updateData.contact.email);
        
        // Verify other fields remain unchanged
        expect(response.data.data.address).toBe(venueData.address);
        expect(response.data.data.coordinates).toEqual(venueData.coordinates);
        expect(response.data.data.images).toEqual(venueData.images);

      } finally {
        // No need to clean up here, it's handled in afterAll
      }
    });

    test('error: rejects invalid coordinates', async () => {
      // Create a venue to update
      const timestamp = Date.now();
      const venueData: VenueInput = {
        name: 'Venue for Invalid Update',
        description: 'This venue will be updated with invalid data',
        address: '123 Test St',
        contact: {
          phone: '+1234567890',
          email: 'test@test.com',
          website: 'https://test.com'
        },
        images: ['https://example.com/test.jpg'],
        coordinates: {
          lat: 40.7128,
          lng: -74.0060
        },
        userId: testUserId
      };

      const createResponse = await axios.post(`${API_URL}/venues`, venueData);
      const venueId = createResponse.data.data.id;
      tempVenueIds.push(venueId);

      try {
        // Try to update with invalid coordinates
        const updateData = {
          coordinates: {
            lat: 91,  // Invalid: latitude must be between -90 and 90
            lng: -74.0060
          }
        };

        await axios.patch(`${API_URL}/venues/${venueId}`, updateData);
        fail('Expected validation error');
      } catch (error) {
        if (error instanceof AxiosError) {
          expect(error.response?.status).toBe(400);
          expect(error.response?.data.error.message).toContain('Latitude must be between -90 and 90');
        }
      }
    });

    test('error: rejects non-existent venue', async () => {
      const updateData = {
        name: 'Updated Name'
      };

      try {
        await axios.patch(`${API_URL}/venues/99999`, updateData);
        fail('Expected error for non-existent venue');
      } catch (error) {
        if (error instanceof AxiosError) {
          expect(error.response?.status).toBe(404);
          expect(error.response?.data.error.message).toContain('Venue not found');
        }
      }
    });
  });

  describe('DELETE /venues/:id', () => {
    test('success: deletes venue', async () => {
      const venueData: VenueInput = {
        name: 'Venue to Delete',
        description: 'This venue will be deleted',
        address: '123 Delete St',
        contact: {
          phone: '+1234567890',
          email: 'delete@test.com',
          website: 'https://delete.com'
        },
        images: ['https://example.com/delete.jpg'],
        coordinates: { lat: 40.7128, lng: -74.0060 },
        userId: testUserId
      };

      const createResponse = await axios.post(`${API_URL}/venues`, venueData);
      const venueId = createResponse.data.data.id;
      tempVenueIds.push(venueId);

      const deleteResponse = await axios.delete(`${API_URL}/venues/${venueId}`);
      expect(deleteResponse.status).toBe(200);
      expect(deleteResponse.data.status).toBe('success');

      try {
        await axios.get(`${API_URL}/venues/${venueId}`);
        fail('Expected venue to be deleted');
      } catch (error) {
        if (error instanceof AxiosError) {
          expect(error.response?.status).toBe(404);
        }
      }
    });

    test('error: rejects invalid venue ID', async () => {
      try {
        await axios.delete(`${API_URL}/venues/invalid-id`);
        fail('Expected error for invalid venue ID');
      } catch (error) {
        if (error instanceof AxiosError) {
          expect(error.response?.status).toBe(400);
          expect(error.response?.data.error.message).toBe('Invalid parameters');
        }
      }
    });

    test('error: rejects non-existent venue', async () => {
      try {
        await axios.delete(`${API_URL}/venues/99999`);
        fail('Expected error for non-existent venue');
      } catch (error) {
        if (error instanceof AxiosError) {
          expect(error.response?.status).toBe(404);
          expect(error.response?.data.error.message).toContain('Venue not found');
        }
      }
    });
  });
});
