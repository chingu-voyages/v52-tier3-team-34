import { Link } from '@tanstack/react-router';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

import ConfirmationModal from './ConfirmationModal';

import { useDeleteVenue } from '@/hooks/useDeleteVenue';
import { Venue } from '@/types/venues';

interface VenueCardProps {
  venueInfo: Venue;
  filterEventsByVenueId: (venueId: number) => void;
  isSelected?: boolean;
}

function VenueCard({ venueInfo, filterEventsByVenueId, isSelected = false }: VenueCardProps) {
  const deleteVenueMutation = useDeleteVenue();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  function handleDelete(venueId: string) {
    deleteVenueMutation.mutate(venueId, {
      onSuccess: () => {
        console.log('Venue deleted successfully');
        setIsDeleteModalOpen(false); // Close the modal
      },
      onError: (error) => {
        console.error('Error deleting venue:', error);
        setIsDeleteModalOpen(false); // Close the modal on error
      }
    });
  }

  return (
    <div
      className={`cursor-pointer p-3 border-[0.5px] border-white/30 rounded-md transition-all ${
        isSelected ? 'bg-white/30 shadow-xl' : 'hover:bg-white/10'
      }`}
      onClick={() => filterEventsByVenueId(venueInfo.id)}
    >
      <p>Id: {venueInfo.id}</p>
      <h3>{venueInfo.name}</h3>
      <div className="flex justify-between items-end">
        <Link to="/dashboard/venue/$venueId" params={{ venueId: venueInfo.id.toString() }} className="mt-3 underline">
          Details
        </Link>
        <Trash2
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the parent `onClick`
            setIsDeleteModalOpen(true); // Open the confirmation modal
          }}
          className="opacity-50 hover:opacity-100"
        />
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => handleDelete(venueInfo.id.toString())}
        title="Confirm Delete"
        message="Are you sure you want to delete this venue?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}

export default VenueCard;
