import { Venue, VenueResponse } from '@/types/venues';
import { VenueFormData } from '@/validations/venueValidation';

interface VenuetDetailsProps {
  venueResponse: VenueResponse;
  onDelete?: () => void;
  onSave?: (updatedVenue: VenueFormData) => void;
}

const VenueDetails = ({ venueResponse }: VenuetDetailsProps) => {
  const venueDetails: Venue = venueResponse.data;

  return (
    <div className="p-6">
      <div className="font-bold text-xl">{venueDetails.name}</div>
      <div>{venueDetails.address}</div>
      <div>{venueDetails.description}</div>
    </div>
  );
};

export default VenueDetails;
