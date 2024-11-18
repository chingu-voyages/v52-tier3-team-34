import { ZoneResponse } from '../types/zones';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://v52-tier3-team-34.onrender.com/api'
});

export const fetchZones = (lat: number, lng: number, radius: number): Promise<ZoneResponse> => {
  return apiClient
    .get<ZoneResponse>('events/zone', {
      params: {
        lat: 40.758,
        lng: -73.9855,
        radius: 20
      }
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Error fetching zones');
      } else {
        throw new Error('Unknown error occurred');
      }
    });
};
