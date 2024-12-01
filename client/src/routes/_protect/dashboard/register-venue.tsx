import AddVenue from '@/pages/AddVenue';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protect/dashboard/register-venue')({
  component: RouteComponent
});

function RouteComponent() {
  return <AddVenue />;
}
