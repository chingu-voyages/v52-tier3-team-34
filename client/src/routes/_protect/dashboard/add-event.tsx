import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protect/dashboard/add-event')({
  component: RouteComponent
});

function RouteComponent() {
  return 'Hello /_protect/dashboard/add-event!';
}
