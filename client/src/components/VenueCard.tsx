import { Venue } from '@/types/venues';
import { Link } from '@tanstack/react-router';

interface VenueCardProps {
  venueInfo: Venue;
  filterEventsByVenueId: (venueId: number) => void;
  isSelected?: boolean;
}
const VenueCard = ({ venueInfo, filterEventsByVenueId, isSelected = false }: VenueCardProps) => {
  return (
    <div
      className={`
      cursor-pointer 
      p-3 
      border-[0.5px]
      border-white/30
      rounded-md 
      transition-all 
      ${isSelected ? 'bg-white/30  shadow-xl' : 'hover:bg-white/10'}
    `}
      onClick={() => filterEventsByVenueId(venueInfo.id)}
    >
      <p>Id: {venueInfo.id}</p>
      <h3>{venueInfo.name}</h3>
      <Link to="/dashboard/venue/$venueId" params={{ venueId: venueInfo.id.toString() }} className="mt-3 underline">
        Details
      </Link>
    </div>
  );
};

export default VenueCard;
