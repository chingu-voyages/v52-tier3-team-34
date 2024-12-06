import { useQuery } from '@tanstack/react-query';

import { fetchEvents } from '@/api/events';
import { FetchEventsOptions } from '@/types/events';

export const useEvents = (options: FetchEventsOptions = {}) => {
  return useQuery({
    queryKey: ['events', options] as const,
    queryFn: fetchEvents
  });
};
