import { createFileRoute } from '@tanstack/react-router';

import AddVenue from '@/pages/AddVenue';

export const Route = createFileRoute('/_protect/dashboard/register-venue')({
  component: RouteComponent
});

function RouteComponent() {
  return <AddVenue />;
}
