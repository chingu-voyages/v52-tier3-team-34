// each zone feature in the array is composed of:
export interface ZoneFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: [number, number]; // [longitude, latitude]
  };
  properties: Event;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  distance: number;
  venue: Venue;
  createdAt: string;
  updatedAt: string;
}

// venue displays:
export interface Venue {
  id: number;
  name: string;
  address: string;
}

// zone center coordinates
export interface Center {
  type: string;
  coordinates: [number, number];
}

//  zone contains an array of features (events), a center and a radius that defines how big this zone is
export interface Zone {
  type: string;
  features: ZoneFeature[];
  center: Center;
  radius: number; //in kilometres
}

// response from database
export interface ZoneResponse {
  status: string; // success or error

  data: {
    type: string;
    features: ZoneFeature[];
    center: Center;
    radius: number;
  };
  timestamp: string;
}
