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

  function handleFilterEventsByVenueId() {
    filterEventsByVenueId(venueInfo.id);
  }

  function openDeleteModal(event: React.MouseEvent) {
    event.stopPropagation(); // Prevent triggering the parent `onClick`
    setIsDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  /**
   * Confirms the deletion of the venue and handles the API mutation.
   */
  function confirmDeleteVenue() {
    deleteVenueMutation.mutate(venueInfo.id.toString(), {
      onSuccess: function () {
        console.log('Venue deleted successfully');
        setIsDeleteModalOpen(false);
      },
      onError: function (error) {
        console.error('Error deleting venue:', error);
        setIsDeleteModalOpen(false);
      }
    });
  }

  return (
    <div
      className={`cursor-pointer p-3 border-[0.5px] border-white/30 rounded-md transition-all ${
        isSelected ? 'bg-white/30 shadow-xl' : 'hover:bg-white/10'
      }`}
      onClick={handleFilterEventsByVenueId}
    >
      <p>Id: {venueInfo.id}</p>
      <h3>{venueInfo.name}</h3>
      <div className="flex justify-between items-end">
        <Link to="/dashboard/venue/$venueId" params={{ venueId: venueInfo.id.toString() }} className="mt-3 underline">
          Details
        </Link>
        <Trash2 onClick={openDeleteModal} className="opacity-50 hover:opacity-100" />
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDeleteVenue}
        title="Confirm Delete"
        message="Are you sure you want to delete this venue?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}

export default VenueCard;
