import { useQuery } from '@tanstack/react-query';
import { fetchZones } from '@/api/zones';
import { ZoneResponse } from '@/types/zones';

export const useZones = (lat: number, lng: number, radius: number) => {
  console.log('Params in useZones:', lat, lng, radius);
  return useQuery<ZoneResponse, Error>({
    queryKey: ['zones', { lat, lng, radius }] as const,
    queryFn: fetchZones
  });
};
