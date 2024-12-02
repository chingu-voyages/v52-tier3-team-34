import { serverBaseUrl } from '@/config';
import { UserEventsResponse } from '@/types/userEvents';

export const fetchUserEvents = async (userId: string): Promise<UserEventsResponse> => {
  const response = await fetch(`${serverBaseUrl}/users/${userId}/events`);

  if (!response.ok) {
    throw new Error('Error fetching users');
  }
  const data = await response.json();
  return data;
};
