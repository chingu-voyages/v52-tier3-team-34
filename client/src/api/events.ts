import { serverBaseUrl } from '@/config';
import { EventResponse, EventsResponse, FetchEventsOptions } from '@/types/events';
import { EventSubmissionData } from '@/validations/eventValidation';

// POST
export const createEvent = async (data: EventSubmissionData) => {
  console.log('Creating event with: ', data);

  const response = await fetch(`${serverBaseUrl}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Failed to create event');
  }

  return response.json();
};

export const fetchEvents = async ({
  queryKey: [, options]
}: {
  queryKey: readonly ['events', FetchEventsOptions];
}): Promise<EventsResponse> => {
  const { status, sort = 'startDate:asc', fields, include = '', page = 1, limit = 20, filter = {} } = options;

  // Initialize query parameters
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sort
  });

  // Add 'status' if it's provided
  if (status) {
    params.append('status', status);
  }

  // Add 'fields' if it's provided
  if (fields) {
    params.append('fields', fields);
  }

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

  try {
    const url = `${serverBaseUrl}/events?${params.toString()}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
        // Add any necessary headers (e.g., authorization tokens)
      }
    });

    // Check for a successful response
    if (!response.ok) {
      throw new Error(`Error fetching events: ${response.statusText}`);
    }

    // Parse the response as JSON
    const data: EventsResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch events:', error);
    throw error; // Optionally, handle the error in a user-friendly way
  }
};

export async function fetchEvent(eventId: string): Promise<EventResponse> {
  try {
    const url = `${serverBaseUrl}/events/${eventId}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
        // Add any necessary headers (e.g., authorization tokens)
      }
    });

    // Check for a successful response
    if (!response.ok) {
      throw new Error(`Error fetching events: ${response.statusText}`);
    }

    // Parse the response as JSON
    const data: EventResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch Event:', error);
    throw error;
  }
}
