import { Link } from '@tanstack/react-router';
import { ChevronLeftCircle, ChevronRightCircle, CirclePlus } from 'lucide-react';
import { useEffect, useState } from 'react';

import EventCard from '@/components/EventCard';
import VenueCard from '@/components/VenueCard';
import { useUserEvents } from '@/hooks/useUserEvents';
import { useUsers } from '@/hooks/useUsers';
import { useVenues } from '@/hooks/useVenues';
import { Event } from '@/types/events';
import { Venue } from '@/types/venues';

const Dashboard = () => {
  // TODO: Update id to dynamic from Auth
  const [firstUserId, setFirstUserId] = useState<string>('1');
  const [selectedVenueIds, setSelectedVenueIds] = useState<number[]>([]);
  const [currentEventPage, setCurrentEventPage] = useState(1);
  const { data } = useUsers();
  // TODO: Update id to dynamic from Auth
  const userEventsResponse = useUserEvents('1', currentEventPage, 10);
  const pagination = userEventsResponse.data?.data.pagination;

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

  const venues: Venue[] = venuesData.data?.data || [];
  const userEvents: Event[] = userEventsResponse.data?.data.events || [];

  // Events filtered by selected venues
  const filteredEvents =
    selectedVenueIds.length > 0 ? userEvents.filter((event) => selectedVenueIds.includes(event.venueId)) : userEvents;

  function filterEventsByVenueIds(venueId: number) {
    setSelectedVenueIds((prev) => (prev.includes(venueId) ? prev.filter((id) => id !== venueId) : [...prev, venueId]));
  }

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= (pagination?.pages || 1)) {
      setCurrentEventPage(newPage);
    }
  };

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
            <h2 className="text-2xl font-bold">Events ({pagination?.total || '0'})</h2>
            {/* Pagination Controls */}
            {pagination && pagination.pages > 1 && (
              <div className="flex justify-center items-center mt-4 gap-4">
                <button
                  onClick={() => handlePageChange(currentEventPage - 1)}
                  disabled={currentEventPage === 1}
                  className="disabled:opacity-50"
                >
                  <ChevronLeftCircle />
                </button>
                <span>
                  Page {currentEventPage} of {pagination.pages}
                </span>
                <button
                  onClick={() => handlePageChange(currentEventPage + 1)}
                  disabled={currentEventPage === pagination.pages}
                  className="disabled:opacity-50"
                >
                  <ChevronRightCircle />
                </button>
              </div>
            )}
            <Link to="/dashboard/add-event">
              <CirclePlus />
            </Link>
          </div>
          {userEventsResponse.isLoading && <p>Loading events... </p>}
          {userEventsResponse.error && (
            <p className="text-red-600">Error loading venue data: {userEventsResponse.error.message}</p>
          )}
          <div className="flex flex-col gap-3">
            {filteredEvents.map((event) => (
              <EventCard eventInfo={event} key={event.id} />
            ))}
          </div>
          {filteredEvents.length < 1 && <p>No events found.</p>}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
