import { config } from '../config';
import { ApiClient } from '../utils/apiClient';

// Create API client instance
const api = new ApiClient();

describe('Health Check API', () => {
  describe('Basic Health Check', () => {
    it('should return 200 OK with success status', async () => {
      const response = await api.get(config.api.endpoints.health);
      
      // Test HTTP layer
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toMatch(/application\/json/);
      
      // Test response structure
      expect(response.data).toMatchObject({
        status: 'success',
        timestamp: expect.any(String)
      });
    });
  });

  describe('Error Handling', () => {
    it('should return 404 for invalid HTTP method', async () => {
      await expect(api.post(config.api.endpoints.health, {}))
        .rejects.toMatchObject({
          status: 404,
          data: {
            status: 'error',
            error: {
              code: 'ERR_BAD_REQUEST',
              message: expect.any(String)
            }
          }
        });
    });
  });
});
