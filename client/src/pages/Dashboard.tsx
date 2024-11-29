import EventCard from '@/components/EventCard';
import VenueCard from '@/components/VenueCard';
import { useEvents } from '@/hooks/useEvents';
import { useUsers } from '@/hooks/useUsers';
import { useVenues } from '@/hooks/useVenues';
import { Event } from '@/types/events';
import { Venue } from '@/types/venues';
import { Link } from '@tanstack/react-router';
import { CirclePlus } from 'lucide-react';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [firstUserId, setFirstUserId] = useState<string>('1');
  const [selectedVenueIds, setSelectedVenueIds] = useState<number[]>([]);
  const { data } = useUsers();
  const users = data?.data;

  useEffect(() => {
    if (users) {
      const firstUserId = users[0].id.toString();
      setFirstUserId(firstUserId);
    }
  }, [data]);

  const venuesData = useVenues({
    sort: 'createdAt:desc',
    limit: 100,
    filter: { userId: firstUserId }
  });

  const eventsData = useEvents({
    /* TODO: filter events by user */
    limit: 20,
    page: 1
  });

  const venues: Venue[] = venuesData.data?.data || [];
  const events: Event[] = eventsData.data?.data || [];

  // All events for venues owned by the user
  const venueEvents = events.filter((event) => venues.some((venue) => venue.id === event.venueId));

  // Events filtered by selected venues
  const filteredEvents =
    selectedVenueIds.length > 0 ? venueEvents.filter((event) => selectedVenueIds.includes(event.venueId)) : venueEvents;

  function filterEventsByVenueIds(venueId: number) {
    setSelectedVenueIds((prev) => (prev.includes(venueId) ? prev.filter((id) => id !== venueId) : [...prev, venueId]));
  }

  // console.log('Events data: ', eventsData.data?.data);
  //  console.log('Venue data: ', venuesData.data?.data);

  return (
    <>
      <h1 className="text-2xl font-bold p-3">Dashboard | Active userId: {firstUserId}</h1>
      <div className="flex border-t-[1px]">
        <div className="w-1/2 lg:w-1/3 min-h-screen border-r-[1px] p-3">
          <div className="flex gap-3 items-end mb-3">
            <h2 className="text-2xl font-bold">Venues ({venues.length})</h2>
            <Link to="/dashboard/register-venue">
              <button className="h-full flex">
                <CirclePlus />
              </button>
            </Link>
          </div>
          {venuesData.isLoading && <p>Loading venues... </p>}
          {venuesData.error && <p className="text-red-600">Error loading venue data: {venuesData.error.message}</p>}
          <div className="flex flex-col gap-3">
            {venues.map((venue) => (
              <VenueCard
                isSelected={selectedVenueIds.includes(venue.id)}
                filterEventsByVenueId={filterEventsByVenueIds}
                venueInfo={venue}
                key={venue.id}
              />
            ))}
          </div>
        </div>
        <div className="w-1/2 lg:w-1/3 p-3">
          <div className="flex gap-3 items-end mb-3">
            <h2 className="text-2xl font-bold">Upcoming events ({filteredEvents.length})</h2>
            <Link to="/dashboard/add-event">
              <button className="flex">
                <CirclePlus />
              </button>
            </Link>
          </div>
          {eventsData.isLoading && <p>Loading events... </p>}
          {eventsData.error && <p className="text-red-600">Error loading venue data: {eventsData.error.message}</p>}
          <div className="flex flex-col gap-3">
            {filteredEvents.map((event) => (
              <EventCard eventInfo={event} key={event.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
