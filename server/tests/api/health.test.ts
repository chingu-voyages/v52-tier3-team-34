import { config } from '../config';
import { ApiClient } from '../utils/apiClient';

interface HealthResponse {
  status: 'up';
}

// Create API client instance
const api = new ApiClient();

describe('Health Check API', () => {
  it('should return 200 OK with status up', async () => {
    const response = await api.get<HealthResponse>(config.api.endpoints.health);
    
    // Test HTTP layer - this is what infrastructure tools care about most
    expect(response.status).toBe(200);
    
    // Test minimal response body
    expect(response.data.status).toBe('up');
  });

  it('should return 404 for invalid HTTP method', async () => {
    try {
      await api.post<HealthResponse>(config.api.endpoints.health, {});
      fail('Expected request to fail');
    } catch (error: any) {
      expect(error.status).toBe(404);
      expect(error.data.status).toBe('error');
    }
  });
});
