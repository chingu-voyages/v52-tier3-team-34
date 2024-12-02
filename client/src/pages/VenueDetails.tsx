import { Venue, VenueResponse } from '@/types/venues';
import React, { useState } from 'react';

interface VenuetDetailsProps {
  venueResponse: VenueResponse;
  onDelete?: () => void;
  onSave?: (updatedVenue: any) => void;
}

const VenueDetails = ({ venueResponse }: VenuetDetailsProps) => {
  const [venueDetails, setVenueDetails] = useState<Venue>(venueResponse.data);
  return (
    <div className="p-6">
      <div className="font-bold text-xl">{venueDetails.name}</div>
      <div>{venueDetails.address}</div>
      <div>{venueDetails.description}</div>
    </div>
  );
};

export default VenueDetails;
