import { createFileRoute, ErrorComponent, ErrorComponentProps } from '@tanstack/react-router';

import { fetchVenue } from '@/api/venues';
import VenueDetails from '@/pages/VenueDetails';
import { VenueResponse } from '@/types/venues';

export const Route = createFileRoute('/_protect/dashboard/venue/$venueId')({
  loader: async ({ params: { venueId } }) => fetchVenue(venueId),
  errorComponent: VenueErrorComponent,
  notFoundComponent: () => {
    return <p>Venue not found</p>;
  },
  component: VenueComponent
});

export function VenueErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />;
}

function VenueComponent() {
  const venueResponse: VenueResponse = Route.useLoaderData();
  return <VenueDetails venueResponse={venueResponse} />;
}
