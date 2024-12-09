import { serverBaseUrl } from '@/config';
import { UserEventsResponse } from '@/types/userEvents';

export async function fetchUserEvents(
  userId: string,
  page: number = 1,
  limit: number = 10
): Promise<UserEventsResponse> {
  const response = await fetch(`${serverBaseUrl}/users/${userId}/events?page=${page}&limit=${limit}`);

  if (!response.ok) {
    throw new Error('Error fetching user events');
  }

  const data = await response.json();
  return data;
}
