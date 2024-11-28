import { serverBaseUrl } from '@/config';
import { UsersResponse } from '@/types/user';

export const fetchUsers = async (): Promise<UsersResponse> => {
  const response = await fetch(`${serverBaseUrl}/users`);

  if (!response.ok) {
    throw new Error('Error fetching users');
  }
  const data = await response.json();
  return data;
};
