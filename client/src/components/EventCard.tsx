import { Link } from '@tanstack/react-router';

import { Event } from '@/types/events';

interface EventCardProps {
  eventInfo: Event;
}

function EventCard({ eventInfo }: EventCardProps) {
  return (
    <Link
      to="/dashboard/event/$eventId"
      params={{ eventId: eventInfo.id.toString() }}
      className="flex flex-col hover:bg-white/10 p-3"
    >
      <h3 className="font-bold">{eventInfo.title}</h3>
      <p>{eventInfo.artist}</p>
      <p>venueId: {eventInfo.venueId}</p>
    </Link>
  );
}

export default EventCard;
