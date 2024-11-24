import { Wand2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface FormData {
  title: string;
  description: string;
  startDate: string;
  duration: {
    days: string;
    hours: string;
    minutes: string;
  };
  artist: string;
  genre: string[]; // Correcting to string[] for multiple genres
  price: number;
  venueId: string;
  image: File | null; // Correcting to File | null
  terms: boolean;
}

const AddEvent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    startDate: '',
    duration: { days: '', hours: '1', minutes: '' },
    artist: '',
    genre: [],
    price: 0,
    venueId: '1',
    image: null,
    terms: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      duration: {
        ...prev.duration,
        [name]: value // Update the specific part of the duration object
      }
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        image: files[0]
      }));
    }
  };

  // Function to calculate the end date
  // Function to calculate the end date
  // Function to calculate the end date
  const calculateEndDate = () => {
    if (!formData.startDate) return null;

    // Parse the start date to ensure it's a Date object
    const startDate = new Date(formData.startDate); // Parse startDate as a Date object
    if (isNaN(startDate.getTime())) {
      // Handle invalid date if necessary
      return null;
    }

    const { days, hours, minutes } = formData.duration;

    // Ensure that the duration values are numbers
    const durationDays = parseInt(days || '0', 10);
    const durationHours = parseInt(hours || '0', 10);
    const durationMinutes = parseInt(minutes || '0', 10);

    // Create a new date for endDate
    const endDate = new Date(startDate); // Clone the start date into endDate
    endDate.setUTCDate(endDate.getUTCDate() + durationDays);
    endDate.setUTCHours(endDate.getUTCHours() + durationHours);
    endDate.setUTCMinutes(endDate.getUTCMinutes() + durationMinutes);

    return endDate.toISOString(); // Return the end date in ISO 8601 format (UTC)
  };

  // Effect to log the calculated end date whenever relevant fields change
  useEffect(() => {
    const endDate = calculateEndDate();
    if (endDate) {
      const localEndDate = new Date(endDate); // Convert to Date object
      const localEndDateString = localEndDate.toLocaleString('en-US', {
        timeZoneName: 'short' // This will include the timezone abbreviation (e.g. UTC, PST, etc.)
      });

      console.log('Calculated End Date (UTC):', endDate);
      console.log('Calculated End Date (Local Time):', localEndDateString);
    }
  }, [formData.startDate, formData.duration]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Calculate the end date
    const endDate = calculateEndDate();

    // Adjust form data to send only the endDate
    const eventData = { ...formData, endDate };

    // Log or submit the eventData with the formatted endDate
    console.log(eventData);
  };

  const autofillExampleData = () => {
    setFormData({
      title: 'Example Event',
      description: 'This is a description of the example event.',
      startDate: '2024-12-01T14:00',
      duration: { days: '0', hours: '2', minutes: '30' },
      artist: 'Example Artist',
      genre: ['rock', 'pop'],
      price: 25,
      venueId: '2',
      image: null,
      terms: true
    });
  };

  return (
    <div className="max-w-lg p-6 mx-auto">
      <h1 className="my-3 text-xl font-bold">Create event</h1>
      <button
        type="button"
        onClick={autofillExampleData}
        className="flex items-center gap-2 mb-5 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
      >
        <Wand2 size={20} />
        Fill Example Data
      </button>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Event Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Event Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Start Date and Time:
          </label>
          <input
            type="datetime-local"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="flex space-x-4">
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
              Duration:
            </label>
            <div className="flex space-x-2">
              <select
                name="days"
                value={formData.duration.days}
                onChange={handleDurationChange}
                required
                className="block  w-32 px-6 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="0">0 Days</option>
                <option value="1">1 Day</option>
                <option value="2">2 Days</option>
                <option value="3">3 Days</option>
                <option value="4">4 Days</option>
              </select>
              <select
                name="hours"
                value={formData.duration.hours}
                onChange={handleDurationChange}
                required
                className="block w-32 px-6 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="0">0 Hours</option>
                <option value="1">1 Hour</option>
                <option value="2">2 Hours</option>
                <option value="3">3 Hours</option>
                <option value="4">4 Hours</option>
              </select>
              <select
                name="minutes"
                value={formData.duration.minutes}
                onChange={handleDurationChange}
                required
                className="block px-6 w-32 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="0">0 Minutes</option>
                <option value="15">15 Minutes</option>
                <option value="30">30 Minutes</option>
                <option value="45">45 Minutes</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="artist" className="block text-sm font-medium text-gray-700">
            Artist:
          </label>
          <input
            type="text"
            id="artist"
            name="artist"
            value={formData.artist}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
            Genre: <span className="opacity-50">( hold ctrl to choose more than one )</span>
          </label>
          <select
            name="genre"
            multiple
            required
            value={formData.genre}
            onChange={(e) => {
              const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
              setFormData((prev) => ({
                ...prev,
                genre: selectedOptions
              }));
            }}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="blues">Blues</option>
            <option value="jazz">Jazz</option>
            <option value="rock">Rock</option>
            <option value="pop">Pop</option>
          </select>
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price (EUR):
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="venueId" className="block text-sm font-medium text-gray-700">
            Select Venue:
          </label>
          <select
            name="venueId"
            value={formData.venueId}
            onChange={handleSelectChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="1">Venue with id:1</option>
            <option value="2">Venue with id:2</option>
            <option value="3">Venue with id:3</option>
            <option value="4">Venue with id:4</option>
          </select>
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Event Image:
          </label>
          <input
            disabled
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  terms: e.target.checked
                }))
              }
              required
              className="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-700">I accept the terms and conditions</span>
          </label>
        </div>

        <div>
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
