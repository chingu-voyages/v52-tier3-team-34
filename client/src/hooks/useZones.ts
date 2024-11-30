import { useQuery } from '@tanstack/react-query';
import { fetchZones } from '@/api/zones';
import { ZoneResponse } from '@/types/zones';

export const useZones = (lat: number | undefined, lng: number | undefined, radius: number | undefined) => {
  console.log('Params in useZones:', lat, lng, radius);
  return useQuery<ZoneResponse, Error>({
    queryKey: ['zones', { lat, lng, radius }] as const,
    queryFn: fetchZones
  });
};
