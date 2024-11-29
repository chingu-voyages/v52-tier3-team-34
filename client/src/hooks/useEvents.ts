import { useQuery } from '@tanstack/react-query';
import { FetchEventsOptions } from '@/types/events';
import { fetchEvents } from '@/api/events';

export const useEvents = (options: FetchEventsOptions = {}) => {
  return useQuery({
    queryKey: ['events', options] as const,
    queryFn: fetchEvents
  });
};
