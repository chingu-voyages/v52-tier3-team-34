import { serverBaseUrl } from '@/config';
import { HealthResponse } from '@/types/health';

export async function fetchHealth(): Promise<HealthResponse> {
  const response = await fetch(`${serverBaseUrl}/health`);

  if (!response.ok) {
    throw new Error('Error fetching users');
  }
  const data = await response.json();
  return data;
}
