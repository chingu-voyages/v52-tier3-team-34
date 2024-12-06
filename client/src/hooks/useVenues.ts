import { useQuery } from '@tanstack/react-query';

import { fetchVenues } from '@/api/venues';
import { FetchVenuesOptions } from '@/types/venues';

export const useVenues = (options: FetchVenuesOptions = {}) => {
  return useQuery({
    queryKey: ['venues', options] as const,
    queryFn: fetchVenues
  });
};
