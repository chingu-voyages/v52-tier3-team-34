import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Building2, Mail, Phone, Globe, MapPin, Image as ImageIcon, Loader2, Wand2 } from 'lucide-react';
import { generateExampleVenue } from '@/utils';
import { createVenue } from '@/api/venues';
import { VenueFormData, venueSchema } from '@/types/venues';
import { useUsers } from '@/hooks/useUsers';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/_protect/dashboard/register-venue')({
  component: RegisterVenueForm
});

function RegisterVenueForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<VenueFormData>({
    resolver: zodResolver(venueSchema),
    defaultValues: {
      contact: { email: '', phone: '' },
      coordinates: { lat: 0, lng: 0 },
      images: ['']
    }
  });

  const [firstUserId, setFirstUserId] = useState<String>('1');
  const { data } = useUsers();
  const users = data?.data;

  useEffect(() => {
    if (users) {
      const fisrtUserId = users[0].id.toString();
      setFirstUserId(fisrtUserId);
    }
  }, [data]);

  const handleFillExample = () => {
    const exampleData = generateExampleVenue();
    reset(exampleData);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createVenue,
    onSuccess: () => {
      console.log('Success');

      queryClient.invalidateQueries({ queryKey: ['venues'] });
      navigate({ to: '/dashboard' });
    }
  });

  const onSubmit = (data: VenueFormData) => {
    const userId = Number(firstUserId);
    const venueData = { ...data, userId };
    console.log('Venue data submitted: ', venueData);

    mutation.mutate(venueData);
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
          <Building2 size={24} />
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Register New Venue</h1>
          <h2 className="bg-yellow-300 text-red-600 w-fit px-2">
            Active userId: <span className="font-bold">{firstUserId}</span>
          </h2>
        </div>
      </div>

      <button
        type="button"
        onClick={handleFillExample}
        className="flex items-center gap-2 mb-5 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
      >
        <Wand2 size={20} />
        Fill Example Data
      </button>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Venue Name</label>
            <input
              {...register('name')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter venue name"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              {...register('description')}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter venue description"
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                {...register('address')}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter venue address"
              />
            </div>
            {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Contact Information</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                {...register('contact.email')}
                type="email"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter contact email"
              />
            </div>
            {errors.contact?.email && <p className="mt-1 text-sm text-red-600">{errors.contact.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                {...register('contact.phone')}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter contact phone"
              />
            </div>
            {errors.contact?.phone && <p className="mt-1 text-sm text-red-600">{errors.contact.phone.message}</p>}
          </div>

          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <div className="relative">
              <Globe className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                {...register('contact.website')}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter website URL"
              />
            </div>
            {errors.contact?.website && <p className="mt-1 text-sm text-red-600">{errors.contact.website.message}</p>}
          </div> */}
        </div>

        {/* Coordinates */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Location Coordinates</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
              <input
                {...register('coordinates.lat', { valueAsNumber: true })}
                type="number"
                step="any"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter latitude"
              />
              {errors.coordinates?.lat && <p className="mt-1 text-sm text-red-600">{errors.coordinates.lat.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
              <input
                {...register('coordinates.lng', { valueAsNumber: true })}
                type="number"
                step="any"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter longitude"
              />
              {errors.coordinates?.lng && <p className="mt-1 text-sm text-red-600">{errors.coordinates.lng.message}</p>}
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Venue Images</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <div className="relative">
              <ImageIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                {...register('images.0')}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter image URL"
              />
            </div>
            {errors.images && <p className="mt-1 text-sm text-red-600">{errors.images.message}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Registering...
            </>
          ) : (
            'Register Venue'
          )}
        </button>

        {mutation.isError && (
          <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm">
            Failed to register venue. Please try again.
          </div>
        )}
      </form>
    </div>
  );
}
