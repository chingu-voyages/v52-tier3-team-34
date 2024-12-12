import { faker } from '@faker-js/faker';

import { City, SelectCity } from './types/city';

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function generateExampleVenue() {
  const venueName = faker.company.name();
  const venueType = faker.helpers.arrayElement([
    'Jazz Club',
    'Concert Hall',
    'Music Venue',
    'Theater',
    'Cultural Center',
    'Opera House'
  ]);

  // Generate area code and phone numbers
  const areaCode = faker.number.int({ min: 200, max: 999 }).toString();
  const prefix = faker.number.int({ min: 200, max: 999 }).toString();
  const lineNumber = faker.number.int({ min: 1000, max: 9999 }).toString();

  // Format phone number to match validation pattern
  const formattedPhone = `+1-${areaCode}-${prefix}-${lineNumber}`;

  return {
    name: `${venueName} ${venueType}`,
    description: faker.lorem.paragraph(2),
    address:
      faker.location.streetAddress(true) +
      ', ' +
      faker.location.city() +
      ', ' +
      faker.location.state() +
      ' ' +
      faker.location.zipCode(),
    contact: {
      email: faker.internet.email().toLowerCase(),
      phone: formattedPhone
    },
    coordinates: {
      lat: faker.location.latitude({ min: 25, max: 49 }),
      lng: faker.location.longitude({ min: -125, max: -67 })
    },
    images: [`https://source.unsplash.com/800x600/?${encodeURIComponent(venueType.toLowerCase())}`]
  };
}

export function convertToISO8601(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }
  return date.toISOString();
}

export const cities: City[] = [
  { lat: 40.7128, lng: -74.006, label: 'New York' },
  { lat: 34.0522, lng: -118.2437, label: 'Los Angeles' },
  { lat: 48.8566, lng: 2.3522, label: 'Paris' },
  { lat: 35.6895, lng: 139.6917, label: 'Tokyo' },
  { lat: 51.5074, lng: -0.1278, label: 'London' },
  { lat: 41.3851, lng: 2.1734, label: 'Barcelona' },
  { lat: 41.1496, lng: -8.6109, label: 'Porto' },
  { lat: 43.6047, lng: 1.4442, label: 'Toulouse' },
  { lat: 6.5244, lng: 3.3792, label: 'Lagos' }
];

export function formatCitiesForSelect(cities: City[]): SelectCity[] {
  return cities.map((city) => ({
    value: { lat: city.lat, lng: city.lng },
    label: city.label
  }));
}
