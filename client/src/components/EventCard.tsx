import { Event } from '@/types/events';

interface EventCardProps {
  eventInfo: Event;
}

const EventCard = ({ eventInfo }: EventCardProps) => {
  return (
    <div className="flex flex-col">
      <h3 className="font-bold">{eventInfo.title}</h3>
      <p>{eventInfo.artist}</p>
      <p>venueId: {eventInfo.venueId}</p>
    </div>
  );
};

export default EventCard;
