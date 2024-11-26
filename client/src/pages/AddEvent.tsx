import { Wand2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EventFormData, eventSchema, EventSubmissionData } from '../validations/eventValidation';
import { convertToISO8601 } from '../utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEvent } from '../../api/events';
import { Navigate } from '@tanstack/react-router';

const AddEvent: React.FC = () => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      duration: {
        days: '0',
        hours: '1',
        minutes: '0'
      },
      image: 'https://images.pexels.com/photos/9419374/pexels-photo-9419374.jpeg',
      venueId: 1
    }
  });

  const [calculatedEndDate, setCalculatedEndDate] = useState<string | null>(null);

  // Watch the relevant fields
  const startDate = useWatch({
    control,
    name: 'startDate'
  });

  const duration = useWatch({
    control,
    name: 'duration'
  });

  useEffect(() => {
    // Only calculate if we have both startDate and duration
    if (startDate && duration) {
      const endDate = calculateEndDate();
      if (endDate) {
        setCalculatedEndDate(endDate);
        setValue('endDate', endDate);
      }
    }
  }, [startDate, duration, setValue]);

  const onSubmit = (formData: EventFormData) => {
    const submissionData: EventSubmissionData = {
      title: formData.title,
      description: formData.description,
      startDate: convertToISO8601(formData.startDate),
      endDate: calculatedEndDate!,
      artist: formData.artist,
      genre: formData.genre,
      price: Number(formData.price),
      venueId: formData.venueId,
      image: formData.image
    };

    mutation.mutate(submissionData);
  };

  const mutation = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      // Invalidate and refetch the events query
      queryClient.invalidateQueries({ queryKey: ['events'] });
      return <Navigate to="/" />;
    },
  });

  const autofillExampleData = () => {
    setValue('title', faker.lorem.words(3));
    setValue('description', faker.lorem.paragraph());
    setValue('startDate', faker.date.future().toISOString().slice(0, 16));
    setValue('duration', {
      days: faker.number.int({ min: 0, max: 1 }).toString(),
      hours: faker.number.int({ min: 0, max: 5 }).toString(),
      minutes: faker.helpers.arrayElement(['0', '15', '30', '45'])
    });
    setValue('artist', faker.person.fullName());
    setValue('genre', faker.helpers.arrayElements(['rock', 'pop', 'jazz', 'classical', 'blues'], 2));
    setValue('price', faker.number.int({ min: 0, max: 50 }));
    setValue('venueId', 1);
    setValue('image', 'https://images.pexels.com/photos/9419374/pexels-photo-9419374.jpeg');
    setValue('terms', true);
  };

  const calculateEndDate = () => {
    if (!startDate || !duration) return null;

    try {
      const isoStartDate = convertToISO8601(startDate);

      const { days, hours, minutes } = duration;

      const durationDays = parseInt(days || '0', 10);
      const durationHours = parseInt(hours || '0', 10);
      const durationMinutes = parseInt(minutes || '0', 10);

      const endDate = new Date(isoStartDate);
      endDate.setUTCDate(endDate.getUTCDate() + durationDays);
      endDate.setUTCHours(endDate.getUTCHours() + durationHours);
      endDate.setUTCMinutes(endDate.getUTCMinutes() + durationMinutes);

      return endDate.toISOString();
    } catch (error) {
      console.error('Error calculating end date:', error);
      return null;
    }
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Event Title:
          </label>
          <input
            type="text"
            id="title"
            {...register('title')} // Registering the field
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Event Description:
          </label>
          <textarea
            id="description"
            {...register('description')} // Registering the field
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
        </div>

        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Start Date and Time:
          </label>
          <input
            type="datetime-local"
            id="startDate"
            {...register('startDate')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.startDate && <p className="text-red-500 text-xs">{errors.startDate.message}</p>}
        </div>

        <div className="flex space-x-4">
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
              Duration:
            </label>
            <div className="flex space-x-2">
              <select
                {...register('duration.days')}
                className="block w-32 px-6 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="0">0 Days</option>
                <option value="1">1 Day</option>
                <option value="2">2 Days</option>
                <option value="3">3 Days</option>
                <option value="4">4 Days</option>
              </select>
              <select
                {...register('duration.hours')}
                className="block w-32 px-6 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="0">0 Hours</option>
                <option value="1">1 Hour</option>
                <option value="2">2 Hours</option>
                <option value="3">3 Hours</option>
                <option value="4">4 Hours</option>
              </select>
              <select
                {...register('duration.minutes')}
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
            {...register('artist')} // Registering the field
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.artist && <p className="text-red-500 text-xs">{errors.artist.message}</p>}
        </div>

        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
            Genre:
          </label>
          <select
            multiple
            {...register('genre')} // Registering the field
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="rock">Rock</option>
            <option value="pop">Pop</option>
            <option value="jazz">Jazz</option>
            <option value="classical">Classical</option>
            <option value="blues">Blues</option>
          </select>
          {errors.genre && <p className="text-red-500 text-xs">{errors.genre.message}</p>}
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price:
          </label>
          <input
            type="number"
            id="price"
            {...register('price')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.price && <p className="text-red-500 text-xs">{errors.price.message}</p>}
        </div>

        <div>
          <label htmlFor="venueId" className="block text-sm font-medium text-gray-700">
            Venue ID:
          </label>
          <input
            type="text"
            id="venueId"
            {...register('venueId')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.venueId && <p className="text-red-500 text-xs">{errors.venueId.message}</p>}
        </div>

        {/* Image URL Input */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Event Image URL:
          </label>
          <input
            type="url"
            id="image"
            placeholder="Enter image URL"
            {...register('image')}
            className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.image && <p className="text-red-500 text-xs">{errors.image.message}</p>}
        </div>

        <div className="flex flex-col space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-start space-x-3">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                id="terms"
                {...register('terms')}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors cursor-pointer"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="terms" className="text-sm font-medium text-gray-700 cursor-pointer">
                Terms and Conditions
              </label>
              <p className="text-xs text-gray-500 mt-1">
                By checking this box, you agree to our{' '}
                <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
          {errors.terms && (
            <div className="flex items-center space-x-2 text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span className="text-xs font-medium">{errors.terms?.message}</span>
            </div>
          )}
        </div>

        <button type="submit" className="w-full px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
