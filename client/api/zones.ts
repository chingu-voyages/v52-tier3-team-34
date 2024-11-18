import { ZoneResponse } from '../types/zones';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://v52-tier3-team-34.onrender.com/api'
});

export const fetchZones = ({
  queryKey
}: {
  queryKey: readonly ['zones', { lat: number; lng: number; radius: number }];
}): Promise<ZoneResponse> => {
  const [, { lat, lng, radius }] = queryKey;

  const params = new URLSearchParams({
    lat: lat.toString(),
    lng: lng.toString(),
    radius: radius.toString()
  });

  return apiClient
    .get<ZoneResponse>(`events/zone?${params.toString()}`)
    .then((response) => response.data)
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Error fetching zones');
      }
      throw new Error('Unknown error');
    });
};
