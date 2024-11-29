import { ZoneResponse } from '../src/types/zones';
import axios, { AxiosError } from 'axios';
import { QueryFunctionContext } from '@tanstack/react-query';

const apiClient = axios.create({
  baseURL: 'https://v52-tier3-team-34.onrender.com/api/v1'
});

export const fetchZones = ({ queryKey }: QueryFunctionContext): Promise<ZoneResponse> => {
  const [, { lat, lng, radius }] = queryKey as [string, { lat: number; lng: number; radius: number }];
  console.log('Params in fetchZones:', lat, lng, radius);

  const params = new URLSearchParams({
    lat: lat.toString(),
    lng: lng.toString(),
    radius: radius.toString()
  });

  return apiClient
    .get<ZoneResponse>(`events/zone?${params.toString()}`)
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message || 'Error fetching zones');
      }
      throw new Error('Unknown error');
    });
};
