import * as React from 'react';
import { createFileRoute, ErrorComponent, ErrorComponentProps } from '@tanstack/react-router';
import { fetchEvent } from '@/api/events';
import EventDetails from '@/pages/EventDetails';
import { EventResponse } from '@/types/events';

export const Route = createFileRoute('/_protect/dashboard/event/$eventId')({
  loader: async ({ params: { eventId } }) => fetchEvent(eventId),
  errorComponent: EventErrorComponent,
  notFoundComponent: () => {
    return <p>Event not found</p>;
  },
  component: EventComponent
});

export function EventErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />;
}

function EventComponent() {
  const eventResponse: EventResponse = Route.useLoaderData();
  return <EventDetails eventResponse={eventResponse} />;
}
