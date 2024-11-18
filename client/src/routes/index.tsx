import { createFileRoute } from '@tanstack/react-router';
import { useVenues } from '../../hooks/useVenues'; // Make sure the path is correct
import { Venue } from '../../types/venues';

export const Route = createFileRoute('/')({
  component: HomeComponent
});

function HomeComponent() {
  const { data, isLoading, error, isError } = useVenues({
    page: 1,
    limit: 5,
    orderBy: 'createdAt',
    order: 'desc'
  });

  const venues: Venue[] = data?.data || [];

  if (isLoading) {
    return (
      <div className="p-2 min-h-screen flex flex-col gap-3 justify-center items-center">
        <h3 className="text-2xl font-bold">Home page</h3>
        <p>Loading venues...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-2 min-h-screen flex flex-col gap-3 justify-center items-center">
        <h3 className="text-2xl font-bold">Home page</h3>
        <p>Error loading venues: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-2 min-h-screen flex flex-col gap-3 justify-center items-center">
      <h3 className="text-2xl font-bold">Home page</h3>
      <p>This page is under development</p>

      {/* List of venues */}
      <div className="mt-5">
        <h4 className="text-xl font-semibold">Venues</h4>
        {venues && venues.length > 0 ? (
          <ul>
            {venues.map((venue) => (
              <li key={venue.id} className="border-b p-2">
                <h5 className="font-semibold">{venue.name}</h5>
                <p>{venue.description}</p>
                <p>{venue.address}</p>
                <p>{venue.contact.phone}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No venues found</p>
        )}
      </div>
    </div>
  );
}
