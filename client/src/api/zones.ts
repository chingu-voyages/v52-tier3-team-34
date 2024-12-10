import { QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';

import { serverBaseUrl } from '@/config';
import { ZoneResponse } from '@/types/zones';

const apiClient = axios.create({
  baseURL: serverBaseUrl
});

export async function fetchZones({ queryKey }: QueryFunctionContext): Promise<ZoneResponse> {
  const [, { lat, lng, radius }] = queryKey as [string, { lat: number; lng: number; radius: number }];

  const params = new URLSearchParams({
    lat: lat.toString(),
    lng: lng.toString(),
    radius: radius.toString()
  });

  try {
    const response = await apiClient.get<ZoneResponse>(`events/zone?${params.toString()}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message || 'Error fetching zones');
    }
    throw new Error('Unknown error');
  }
}
