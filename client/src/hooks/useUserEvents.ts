import { fetchUserEvents } from '@/api/userEvents';
import { useQuery } from '@tanstack/react-query';

export const useUserEvents = (userId: string) => {
  return useQuery({
    queryKey: ['userEvents'],
    queryFn: () => fetchUserEvents(userId)
  });
};
