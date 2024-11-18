import { serverBaseUrl } from '../config';
import { FetchVenuesOptions, VenuesResponse } from '../types/venues';

// Fetch function to get venues
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

  return response.json();
};
