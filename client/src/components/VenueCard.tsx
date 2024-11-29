import { Venue } from '@/types/venues';

interface VenueCardProps {
  venueInfo: Venue;
}
const VenueCard = ({ venueInfo }: VenueCardProps) => {
  return (
    <div className="border-2 p-1">
      <h3>{venueInfo.name}</h3>
    </div>
  );
};

export default VenueCard;
