import axios, { AxiosError } from 'axios';
import { VenueResponse, VenueInput } from '../src/types/venue.types';

const API_URL = 'http://localhost:3000/api/v1';

describe('Venues API', () => {
  let testVenueId: number;
  let testUserId: number;  // We'll need a user to create venues
  
  // Create a test user and venue before running tests
  beforeAll(async () => {
    // First create a test user
    const timestamp = Date.now();
    const userData = {
      email: `test${timestamp}@example.com`,
      name: 'Test User',
      googleId: `test${timestamp}`,
      profileImage: 'https://example.com/image.jpg'
    };

    const userResponse = await axios.post(`${API_URL}/users`, userData);
    testUserId = userResponse.data.data.id;

    // Then create a test venue
    const venueData: VenueInput = {
      name: 'Test Venue',
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
  });

  // Clean up after all tests
  afterAll(async () => {
    try {
      if (testVenueId) {
        await axios.delete(`${API_URL}/venues/${testVenueId}`);
      }
      if (testUserId) {
        await axios.delete(`${API_URL}/users/${testUserId}`);
      }
    } catch (error) {
      console.error('Cleanup failed:', error);
    }
  });

  // Placeholder for our first test group
  describe('POST /venues', () => {
    test('placeholder test', () => {
      expect(true).toBe(true);
    });
  });
});
