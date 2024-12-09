import { Link } from '@tanstack/react-router';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

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
      {isDeleteModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setIsDeleteModalOpen(false)} // Close the modal if the backdrop is clicked
        >
          <div
            className="bg-white text-black p-5 rounded shadow-lg text-center"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <h2 className="text-lg font-bold">Confirm Delete</h2>
            <p>Are you sure you want to delete this venue?</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(venueInfo.id.toString())}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VenueCard;
