import { faker } from "@faker-js/faker";

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
      phone: formattedPhone,
      website: `https://www.${faker.internet.domainWord()}.com`
    },
    coordinates: {
      lat: faker.location.latitude({ min: 25, max: 49 }),
      lng: faker.location.longitude({ min: -125, max: -67 })
    },
    images: [`https://source.unsplash.com/800x600/?${encodeURIComponent(venueType.toLowerCase())}`]
  };
}