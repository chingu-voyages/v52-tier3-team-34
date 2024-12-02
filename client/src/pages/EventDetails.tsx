import React, { useState } from 'react';
import { Clock, MapPin, Ticket, Music, Edit, Trash2, Save, X } from 'lucide-react';
import { EventResponse } from '@/types/events';
import { Venue } from '@/types/venues'; // Assuming you have a Venue type

interface EventDetailsProps {
  eventResponse: EventResponse;
  onDelete?: () => void;
  onSave?: (updatedEvent: any) => void;
}

const EventDetails = ({ eventResponse, onDelete, onSave }: EventDetailsProps) => {
  const [eventDetails, setEventDetails] = useState(eventResponse.data);
  const [isEditing, setIsEditing] = useState(false);

  // Helper function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Typed handler for different input changes
  const handleInputChange = <K extends keyof typeof eventDetails>(field: K, value: (typeof eventDetails)[K]) => {
    setEventDetails((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // Specific handler for nested venue updates
  const handleVenueChange = <K extends keyof Venue>(field: K, value: Venue[K]) => {
    setEventDetails((prev) => ({
      ...prev,
      venue: {
        ...prev.venue,
        [field]: value
      }
    }));
  };

  // Handle save
  const handleSave = () => {
    if (onSave) {
      onSave(eventDetails);
      setIsEditing(false);
    }
  };

  // Render view mode
  const renderViewMode = () => (
    <>
      <div className="flex justify-between items-center my-6">
        <h2 className="text-2xl font-bold">{eventDetails.title}</h2>
        <div className="flex space-x-3">
          <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:text-blue-600">
            <Edit className="w-5 h-5" />
          </button>
          {onDelete && (
            <button onClick={onDelete} className="text-red-500 hover:text-red-600">
              <Trash2 className="w-5 h-5" />
            </button>
          )}
          <div>{eventDetails.status}</div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Music className="w-5 h-5 text-blue-500" />
          <span className="font-medium">{eventDetails.artist}</span>
          <span className="text-sm">({eventDetails.genre})</span>
        </div>

        <div className="flex items-center space-x-3">
          <Clock className="w-5 h-5 text-blue-500" />
          <div>
            <div className="text-sm">
              <strong>Starts:</strong> {formatDate(eventDetails.startDate)}
            </div>
            <div className="text-sm">
              <strong>Ends:</strong> {formatDate(eventDetails.endDate)}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <MapPin className="w-5 h-5 text-blue-500" />
          <div>
            <span className="font-medium">{eventDetails.venue.name}</span>
            <p className="text-sm">{eventDetails.venue.address}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Ticket className="w-5 h-5 text-blue-500" />
          <span className="text-xl font-bold text-green-600">${eventDetails.price.toFixed(2)}</span>
        </div>

        {eventDetails.description && <div className="text-sm italic">"{eventDetails.description}"</div>}
      </div>
    </>
  );

  // Render edit mode
  const renderEditMode = () => (
    <>
      <div className="flex justify-between items-center my-6">
        <input
          type="text"
          value={eventDetails.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className="text-2xl font-bold bg-transparent border-b border-white w-full"
        />
        <div className="flex space-x-3">
          <button onClick={handleSave} className="text-green-500 hover:text-green-600">
            <Save className="w-5 h-5" />
          </button>
          <button onClick={() => setIsEditing(false)} className="text-red-500 hover:text-red-600">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Music className="w-5 h-5 text-blue-500" />
          <input
            type="text"
            value={eventDetails.artist}
            onChange={(e) => handleInputChange('artist', e.target.value)}
            className="font-medium bg-transparent border-b border-white w-full"
          />
          <input
            type="text"
            value={eventDetails.genre.join(', ')} // Join the array into a string for display
            onChange={(e) =>
              handleInputChange(
                'genre',
                e.target.value.split(',').map((g) => g.trim())
              )
            } // Split and trim the input into an array
            className="text-sm bg-transparent border-b border-white w-1/4"
          />
        </div>

        <div className="flex items-center space-x-3">
          <Clock className="w-5 h-5 text-blue-500" />
          <div>
            <div className="text-sm">
              <strong>Starts:</strong>
              <input
                type="datetime-local"
                value={eventDetails.startDate.slice(0, 16)}
                onChange={(e) => handleInputChange('startDate', new Date(e.target.value).toISOString())}
                className="bg-transparent border-b border-white ml-2"
              />
            </div>
            <div className="text-sm">
              <strong>Ends:</strong>
              <input
                type="datetime-local"
                value={eventDetails.endDate.slice(0, 16)}
                onChange={(e) => handleInputChange('endDate', new Date(e.target.value).toISOString())}
                className="bg-transparent border-b border-white ml-2"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <MapPin className="w-5 h-5 text-blue-500" />
          <div>
            <input
              type="text"
              value={eventDetails.venue.name}
              onChange={(e) => handleVenueChange('name', e.target.value)}
              className="font-medium bg-transparent border-b border-white w-full"
            />
            <input
              type="text"
              value={eventDetails.venue.address}
              onChange={(e) => handleVenueChange('address', e.target.value)}
              className="text-sm bg-transparent border-b border-white w-full"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Ticket className="w-5 h-5 text-blue-500" />
          <input
            type="number"
            value={eventDetails.price}
            onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
            className="text-xl font-bold text-green-600 bg-transparent border-b border-white w-full"
            step="0.01"
          />
        </div>

        <div>
          <textarea
            value={eventDetails.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="text-sm italic bg-transparent border-b border-white w-full"
            placeholder="Add description..."
          />
        </div>
      </div>
    </>
  );

  return (
    <div className="max-w-7xl mx-auto border-t-[1px] p-6 text-white min-h-screen">
      {isEditing ? renderEditMode() : renderViewMode()}
    </div>
  );
};

export default EventDetails;
