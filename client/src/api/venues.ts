import { serverBaseUrl } from '@/config';
import { FetchVenuesOptions, VenueFormData, VenuesResponse } from '@/types/venues';

// GET ALL
export const fetchVenues = async ({
  queryKey: [, options]
}: {
  queryKey: readonly ['venues', FetchVenuesOptions];
}): Promise<VenuesResponse> => {
  const { page = 1, limit = 10, orderBy = 'name', order = 'asc' } = options;

  // Build query string
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    orderBy,
    order
  });

  const response = await fetch(`${serverBaseUrl}/venues?${params.toString()}`);

  if (!response.ok) {
    throw new Error('Error fetching venues');
  }
  const data = await response.json();
  return data;
};

// POST
export const createVenue = async (data: VenueFormData) => {
  const response = await fetch(`${serverBaseUrl}/venues`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error('Failed to create venue');
  }
  return response.json();
};
