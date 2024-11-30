import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import AddEvent from '@/pages/AddEvent';

export const Route = createFileRoute('/_protect/dashboard/add-event')({
  component: RouteComponent
});

function RouteComponent() {
  return <AddEvent />;
}
