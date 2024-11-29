import { Venue } from '@/types/venues';

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
      border 
      rounded-md 
      transition-all 
      ${isSelected ? 'bg-neutral-200 border-neutral-600 shadow-xl' : 'hover:bg-gray-50'}
    `}
      onClick={() => filterEventsByVenueId(venueInfo.id)}
    >
      <p>Id: {venueInfo.id}</p>
      <h3>{venueInfo.name}</h3>
    </div>
  );
};

export default VenueCard;
