import { useQuery } from '@tanstack/react-query';
import { fetchZones } from '../api/zones';
import { ZoneResponse } from '../types/zones';

export const useZones = () => {
  return useQuery<ZoneResponse>({
    queryKey: ['zones'],
    queryFn: fetchZones
  });
};
