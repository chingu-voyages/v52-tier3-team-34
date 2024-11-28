import { useQuery } from '@tanstack/react-query';
import { FetchVenuesOptions } from '@/types/venues';
import { fetchVenues } from '@/api/venues';

export const useVenues = (options: FetchVenuesOptions = {}) => {
  return useQuery({
    queryKey: ['venues', options] as const,
    queryFn: fetchVenues
  });
};
