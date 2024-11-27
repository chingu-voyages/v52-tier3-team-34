import { createFileRoute } from '@tanstack/react-router';
import { useVenues } from '../../hooks/useVenues';
import { Venue } from '../types/venues';
import { useState } from 'react';
import { ArrowRight, ArrowLeft, MapPin, Phone } from 'lucide-react';

export const Route = createFileRoute('/')({
  component: HomeComponent
});

function HomeComponent() {
  // Set the initial page to 1
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error, isError } = useVenues({
    page: currentPage,
    limit: 5,
    orderBy: 'createdAt',
    order: 'desc'
  });

  const totalPages: number = data?.meta.pagination.totalPages ?? 0;

  const venues: Venue[] = data?.data || [];

  // Function to handle next page click
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Function to handle back page click
  const handleBackPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="p-2 min-h-screen flex flex-col gap-3 justify-center items-center">
        <h3 className="text-2xl font-bold">Home page</h3>
        <p>Loading venues...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-2 min-h-screen flex flex-col gap-3 justify-center items-center">
        <h3 className="text-2xl font-bold">Home page</h3>
        <p>Error loading venues: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-neutral-900 border-2 border-neutral-700 rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.1)]">
        <div className="bg-neutral-800 p-6 flex items-center justify-between">
          <div>
            <h3 className="text-4xl font-bold tracking-tight text-white uppercase">Venues</h3>
            <p className="text-neutral-400 mt-2 text-sm">LOUD. RAW. UNFILTERED.</p>
          </div>
          <div className="flex space-x-3">
            {/* Back Button */}
            <button
              onClick={handleBackPage}
              disabled={currentPage === 1}
              className={`
                px-3 pl-5 py-3 rounded-md uppercase font-bold tracking-wider transition-colors
                ${
                  currentPage === 1
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }
              `}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`
                px-3 pr-5 py-3 rounded-md uppercase font-bold tracking-wider transition-colors
                ${
                  currentPage === totalPages
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }
              `}
            >
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {venues && venues.length > 0 ? (
            <div className="space-y-4">
              {venues.map((venue) => (
                <div
                  key={venue.id}
                  className="bg-neutral-800 border  border-neutral-700 rounded-md p-4 hover:border-red-600 transition-all duration-300"
                >
                  <h5 className="text-2xl font-bold text-white mb-2">{venue.name}</h5>
                  <p className="text-neutral-400 mb-3">{venue.description}</p>
                  <div className="flex items-center text-neutral-300 space-x-2 mb-1">
                    <MapPin className="w-5 h-5 text-red-600" />
                    <span>{venue.address}</span>
                  </div>
                  <div className="flex items-center text-neutral-300 space-x-2">
                    <Phone className="w-5 h-5 text-red-600" />
                    <span>{venue.contact.phone}</span>
                  </div>
                  <div className="mt-3">
                    <a href={venue.contact.website} className="mt-3 underline" target="_blank">
                      Visit Website
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-neutral-500 text-center">NO VENUES FOUND</p>
          )}
        </div>
      </div>
    </div>
  );
}
