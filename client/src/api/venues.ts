import { serverBaseUrl } from '@/config';
import { FetchVenuesOptions, VenueResponse, VenuesResponse } from '@/types/venues';
import { VenueFormData } from '@/validations/venueValidation';

// GET ALL venues
export async function fetchVenues({
  queryKey: [, options]
}: {
  queryKey: readonly ['venues', FetchVenuesOptions];
}): Promise<VenuesResponse> {
  const { page = 1, limit = 10, sort = 'createdAt:desc', include = '', filter = {} } = options;

  // Initialize query parameters
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sort
  });

  // Add 'include' if it's not empty
  if (include) {
    params.append('include', include);
  }

  // Add filters dynamically if they exist
  Object.entries(filter).forEach(([key, value]) => {
    if (value) {
      params.append(`filter[${key}]`, value.toString());
    }
  });

  const response = await fetch(`${serverBaseUrl}/venues?${params.toString()}`);

  if (!response.ok) {
    throw new Error('Error fetching venues');
  }

  const data = await response.json();
  return data;
}

// POST a venue
export async function createVenue(data: VenueFormData) {
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
}

// GET ONE venue
export async function fetchVenue(venueId: string): Promise<VenueResponse> {
  try {
    const url = `${serverBaseUrl}/venues/${venueId}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Check for a successful response
    if (!response.ok) {
      throw new Error(`Error fetching events: ${response.statusText}`);
    }

    // Parse the response as JSON
    const data: VenueResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch Venue:', error);
    throw error;
  }
}

// DELETE a venue
export async function deleteVenue(venueId: string): Promise<void> {
  try {
    const url = `${serverBaseUrl}/venues/${venueId}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to delete venue: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error deleting venue:', error);
    throw error;
  }
}
