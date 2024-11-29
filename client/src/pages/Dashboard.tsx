import VenueCard from '@/components/VenueCard';
import { useUsers } from '@/hooks/useUsers';
import { useVenues } from '@/hooks/useVenues';
import { Venue } from '@/types/venues';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [firstUserId, setFirstUserId] = useState<string>('1');
  const { data } = useUsers();
  const users = data?.data;

  useEffect(() => {
    if (users) {
      const fisrtUserId = users[0].id.toString();
      setFirstUserId(fisrtUserId);
    }
  }, [data]);

  const venuesData = useVenues({
    sort: 'createdAt:desc',
    limit: 3,
    filter: { firstUserId }
  });

  const venues: Venue[] = venuesData.data?.data || [];

  return (
    <>
      <h1 className="text-2xl font-bold p-3">Dashboard | Active userId: {firstUserId}</h1>
      <div className="flex border-t-[1px]">
        <div className="w-1/2 lg:w-1/3 min-h-screen border-r-[1px] p-3">
          <h2 className="text-2xl font-bold mb-3">Venues</h2>
          {venuesData.isLoading && <p>Loading venues... </p>}
          {venuesData.error && <p className="text-red-600">Error loading venue data: {venuesData.error.message}</p>}
          <div className="flex flex-col gap-3">
            {venues.map((venue) => (
              <VenueCard venueInfo={venue} key={venue.id} />
            ))}
          </div>
        </div>
        <div className="w-1/2 lg:w-1/3 p-3">
          <h2 className="text-2xl font-bold mb-3">Upcoming events</h2>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
