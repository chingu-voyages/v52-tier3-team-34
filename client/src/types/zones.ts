export interface ZoneResponse {
  status: string; // success or error
  data: ZoneFeature[]; // Array of features containing event and venue data
  meta: {
    filters: {
      lat: number;
      lng: number;
      radius: number;
    };
  };
  timestamp: string;
}

export interface ZoneFeature {
  event: Event; // Event details
  venue: Venue; // Venue details
  distance: number; // Distance from the center
}

export interface Event {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  artist: string;
  genre: string[];
  price: number;
  venueId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Venue {
  id: number;
  name: string;
  description: string;
  address: string;
  contact: {
    email: string;
    phone: string;
    website: string;
  };
  images: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  userId: number;
  createdAt: string;
  updatedAt: string;
}

// response from database

// zone center coordinates
// export interface Center {
//   type: string;
//   coordinates: [number, number];
// }

//  zone contains an array of features (events), a center and a radius that defines how big this zone is
// export interface Zone {
//   type: string;
//   features: ZoneFeature[];
//   center: Center;
//   radius: number; //in kilometres
// }
