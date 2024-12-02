import { fetchUserEvents } from '@/api/userEvents';
import { useQuery } from '@tanstack/react-query';

export const useUserEvents = (userId: string, page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ['userEvents', userId, page, limit],
    queryFn: () => fetchUserEvents(userId, page, limit)
  });
};
