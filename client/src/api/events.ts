import { serverBaseUrl } from '@/config';
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
