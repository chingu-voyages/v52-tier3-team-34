import { config } from '../config';
import { ApiClient } from '../utils/apiClient';
import { TestAssertions } from '../utils/testAssertions';

interface HealthResponse {
  status: 'up';
}

interface ErrorResponse {
  status: 'error';
  error: {
    code: string;
    message: string;
  };
}

// Create API client instance
const api = new ApiClient();

describe('Health Check API', () => {
  describe('Basic Health Check', () => {
    it('should return 200 OK with status up', async () => {
      const response = await api.get<HealthResponse>(config.api.endpoints.health);
      
      // Test HTTP layer
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toMatch(/application\/json/);
      
      // Test response structure
      expect(response.data).toEqual({
        status: 'up'
      });
    });
  });

  describe('Error Handling', () => {
    it('should return 404 for invalid HTTP method', async () => {
      await expect(api.post<ErrorResponse>(config.api.endpoints.health, {}))
        .rejects.toMatchObject({
          status: 404,
          data: {
            status: 'error',
            error: {
              code: 'METHOD_NOT_ALLOWED',
              message: expect.any(String)
            }
          }
        });
    });

    it('should return 404 for non-existent path', async () => {
      await expect(api.get('/health/invalid'))
        .rejects.toMatchObject({
          status: 404,
          data: {
            status: 'error',
            error: {
              code: 'NOT_FOUND',
              message: expect.any(String)
            }
          }
        });
    });
  });
});
